import ScheduleRepository from "../repositories/scheduleRepository.js";
import {
  calculateLatLngBounds,
  calculateTimeDifference,
} from "../utils/geoUtils.js";
import { getGoogleDirections } from "../utils/googleMapsService.js";
import userScheduleService from "./userScheduleService.js";

const ScheduleService = {
  findSchedules: async (
    userId,
    scheduleId,
    departureTimeFlexibility,
    departureDistanceFlexibility,
    destinationTimeFlexibility,
    destinationDistanceFlexibility
  ) => {
    // Step 1: Get the user's specific schedule by scheduleId, or get the default one if not provided
    let userSchedule;

    if (scheduleId) {
      // Get schedule by ID if provided
      userSchedule = await userScheduleService.getUserScheduleById(scheduleId);
    } else {
      // Fetch the default schedule if no scheduleId is provided
      userSchedule = await userScheduleService.getDefaultUserSchedule(userId);
    }

    if (!userSchedule) {
      throw new Error("User schedule not found.");
    }

    // Step 2: Pre-calculate lat/lng bounds for the flexible proximity
    const departureBounds = calculateLatLngBounds(
      userSchedule.departureLat,
      userSchedule.departureLng,
      departureDistanceFlexibility
    );
    const destinationBounds = calculateLatLngBounds(
      userSchedule.destinationLat,
      userSchedule.destinationLng,
      destinationDistanceFlexibility
    );

    // Step 3: Fetch schedules within the bounds (departure + destination filtering)
    const candidateSchedules =
      await ScheduleRepository.findSchedulesWithinBounds(
        userId,
        departureBounds,
        destinationBounds
      );

    let matchedSchedules = [];

    // Step 4: Process each candidate schedule
    for (const schedule of candidateSchedules) {
      const departureTimeMatch =
        calculateTimeDifference(
          userSchedule.departureTime,
          schedule.departureTime
        ) <= departureTimeFlexibility;
      const destinationTimeMatch =
        calculateTimeDifference(
          userSchedule.arrivalTime,
          schedule.arrivalTime
        ) <= destinationTimeFlexibility;

      if (departureTimeMatch && destinationTimeMatch) {
        const routeOverlap = await getGoogleDirections(
          userSchedule.departureLat,
          userSchedule.departureLng,
          userSchedule.destinationLat,
          userSchedule.destinationLng,
          schedule.departureLat,
          schedule.departureLng,
          schedule.destinationLat,
          schedule.destinationLng
        );

        if (routeOverlap) {
          matchedSchedules.push({
            ...schedule,
            overlapScore: routeOverlap.score, // Assign a score for sorting
          });
        }
      }
    }

    // Step 5: Sort the schedules based on overlap score and time proximity
    matchedSchedules.sort((a, b) => {
      if (a.overlapScore === b.overlapScore) {
        const timeDiffA = calculateTimeDifference(
          a.departureTime,
          userSchedule.departureTime
        );
        const timeDiffB = calculateTimeDifference(
          b.departureTime,
          userSchedule.departureTime
        );
        return timeDiffA - timeDiffB; // Prioritize smaller time differences
      }
      return b.overlapScore - a.overlapScore; // Higher overlap score first
    });

    // Step 6: Return the top 10 best matches
    return matchedSchedules.slice(0, 10);
  },
};

export default ScheduleService;
