import { Notes } from "../entities/Notes";
import { Appointment } from "../entities/Appointment";
import { User } from "../entities/User";

import { dataSource } from '../index';

interface PatientData {
    user_id: string;
    f_name: string;
    l_name: string;
}

interface AppointmentData {
    userId: string;
    encounderType: string;
    noteCategory: string;
    date: Date,
    physicianId: string
}

export const saveNotesData = async (answers: Partial<Notes>): Promise<Notes> => {
    const notesRepository = dataSource.getRepository(Notes);
    const data = notesRepository.create(answers); 
    return notesRepository.save(data);
};

export const saveAppointmentData = async (appointment: Partial<Appointment>): Promise<Appointment> => {
    const appointmentRepository = dataSource.getRepository(Appointment);
    const data = appointmentRepository.create(appointment); 
    return appointmentRepository.save(data);
};
export const getPatientsListData = async (physician_id: string): Promise<PatientData[]> => {
    const usersRepository = dataSource.getRepository(User);
    const data = await usersRepository.find({where: { physician_id, role: "patient"} }); 
    return data.map(user => ({
        user_id: user.user_id,
        f_name: user.f_name,
        l_name: user.l_name,
    } as PatientData));
};
export const getUpcomingAppointmentsData = async (physicianId: string): Promise<AppointmentData[]> => {
    const appointmentRepository = dataSource.getRepository(Appointment);
    const data = await appointmentRepository.find({where: { physicianId } }); 
    return data.map(appointment => ({
        userId: appointment.userId,
        encounderType: appointment.encounderType,
        noteCategory: appointment.noteCategory,
        date: appointment.date,
        physicianId: appointment.physicianId
    } as AppointmentData));
};

