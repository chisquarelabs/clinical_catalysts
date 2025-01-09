import { Request, Response } from "express";
import  { saveNotesData, saveAppointmentData, getPatientsListData, getUpcomingAppointmentsData , getScoreData }  from "../service/physicianService";

export const saveNotes = async (req: Request, res: Response) => {
    const note = req.body;
    const users = saveNotesData(note);
    res.status(200).json(users);
};

export const saveAppointment = async (req: Request, res: Response) => {
    const appointment = req.body;
    const response = saveAppointmentData(appointment);
    res.status(200).json(response);
};

export const getPatientList = async (req: Request, res: Response) => {
    const { physician_id } = req.params;
    const response = await getPatientsListData(physician_id);
    res.status(200).json(response);
};

export const getUpcomingAppointments = async (req: Request, res: Response) => {
    const { physician_id } = req.params;
    const response = await getUpcomingAppointmentsData(physician_id);
    res.status(200).json(response);
};

export const getScore = async (req: Request, res: Response) => {
    const { user_id } = req.params;
    const response = await getScoreData(user_id);
    res.status(200).json(response);
};
