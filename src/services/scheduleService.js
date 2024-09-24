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

    const candidateSchedules =
      await ScheduleRepository.findSchedulesWithinBoundsAndType(
        userId,
        scheduleTypeToSearch,
        departureBounds,
        destinationBounds
      );

    let matchedSchedules = [];

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
            overlapScore: routeOverlap.score,
          });
        }
      }
    }

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
        return timeDiffA - timeDiffB;
      }
      return b.overlapScore - a.overlapScore;
    });

    return matchedSchedules;
  },
};

export default ScheduleService;
