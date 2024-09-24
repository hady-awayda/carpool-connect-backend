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
    let userSchedule;

    if (scheduleId) {
      userSchedule = await userScheduleService.getUserScheduleById(scheduleId);
    } else {
      userSchedule = await userScheduleService.getDefaultUserSchedule(userId);
    }

    if (!userSchedule) {
      throw new Error("User schedule not found.");
    }

    console.log("Step 1 done:", userSchedule);

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

    // console.log("Step 2 done:", departureBounds, destinationBounds);

    let scheduleTypeToSearch;

    switch (userSchedule.scheduleType) {
      case "passenger":
        scheduleTypeToSearch = "rider";
        break;
      case "rider":
        scheduleTypeToSearch = "passenger";
        break;
      case "partnership":
        scheduleTypeToSearch = "partnership";
        break;
      default:
        throw new Error("Unsupported schedule type");
    }

    // Step 4: Fetch schedules within the bounds and matching the schedule type (departure + destination filtering)
    const candidateSchedules =
      await ScheduleRepository.findSchedulesWithinBoundsAndType(
        userId,
        scheduleTypeToSearch,
        departureBounds,
        destinationBounds
      );

    console.log(
      "Step 4 done:",
      candidateSchedules.filter((s) => s.scheduleType === scheduleTypeToSearch)
        .length
    );

    let matchedSchedules = [];

    // Step 5: Process each candidate schedule
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

      console.log(
        calculateTimeDifference(
          userSchedule.departureTime,
          schedule.departureTime
        ),
        departureTimeFlexibility,
        calculateTimeDifference(userSchedule.arrivalTime, schedule.arrivalTime),
        destinationTimeFlexibility
      );

      if (departureTimeMatch && destinationTimeMatch) {
        console.log(schedule);
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

    console.log("Step 5 done:", matchedSchedules.length);

    // Step 6: Sort the schedules based on overlap score and time proximity
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

    // console.log("Step 6 done:", matchedSchedules);

    // Step 7: Return the top 10 best matches
    return matchedSchedules.slice(0, 10);
  },
};

export default ScheduleService;
