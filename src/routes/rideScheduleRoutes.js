import express from 'express';
import RideScheduleController from '../controllers/rideScheduleController.js';

const router = express.Router();

router.get('/all', RideScheduleController.getRideSchedules);
router.post('/create', RideScheduleController.createRideSchedule);
router.put('/:id', RideScheduleController.updateRideSchedule);
router.delete('/:id', RideScheduleController.deleteRideSchedule);

export default router;
