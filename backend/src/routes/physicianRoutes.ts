import express from "express";
import  { saveNotes , saveAppointment, getPatientList, getUpcomingAppointments, getScore }  from "../controllers/physicianController";
import { validateToken } from '../middleware/validateToken';

const router = express.Router();

router.use(validateToken); 

router.post("/saveNotes", saveNotes);
router.post("/saveAppointment", saveAppointment);
router.get("/userList/:physician_id", getPatientList);
router.get("/upcomingAppointment/:physician_id", getUpcomingAppointments);
router.get("/getScore/:user_id", getScore);

export default router;