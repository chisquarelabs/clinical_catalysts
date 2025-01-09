import { Notes } from "../entities/Notes";
import { Appointment } from "../entities/Appointment";
import { User } from "../entities/User";
import { PatientsScore } from "../entities/PatientsScore";

import { dataSource } from "../index";
import { Answers } from "../entities/Answers";

interface PatientData {
  user_id: string;
  f_name: string;
  l_name: string;
  appointment_date: Date;
}

interface AppointmentData {
  userId: string;
  encounderType: string;
  noteCategory: string;
  date: Date;
  physicianId: string;
}

interface ScoreData {
  userId: string;
  questionId: string;
  subSectionId: string;
  score: number;
}

export const saveNotesData = async (
  answers: Partial<Notes>
): Promise<Notes> => {
  const notesRepository = dataSource.getRepository(Notes);
  const data = notesRepository.create(answers);
  return notesRepository.save(data);
};

export const saveAppointmentData = async (
  appointment: Partial<Appointment>
): Promise<Appointment> => {
  const appointmentRepository = dataSource.getRepository(Appointment);
  const data = appointmentRepository.create(appointment);
  return appointmentRepository.save(data);
};
export const getPatientsListData = async (
  physician_id: string
): Promise<PatientData[]> => {
  const usersRepository = dataSource.getRepository(User);
  const appointmentRepository = dataSource.getRepository(Appointment);
  const data = await usersRepository.find({
    where: { physician_id, role: "patient" },
  });
  // return data.map(user => ({
  //     const appointmentdetails = await appointmentRepository.findOne({ where: { userId: user.user_id } });
  //     user_id: user.user_id,
  //     f_name: user.f_name,
  //     l_name: user.l_name,
  // } as PatientData));
  const patientsData = await Promise.all(
    data.map(async (user) => {
      const appointmentDetails = await appointmentRepository.findOne({
        where: { userId: user.user_id },
        order: { date: "DESC" },
      });
      return {
        user_id: user.user_id,
        f_name: user.f_name,
        l_name: user.l_name,
        appointment_date: appointmentDetails?.date,
      } as PatientData;
    })
  );
  return patientsData;
};
export const getUpcomingAppointmentsData = async (
  physicianId: string
): Promise<AppointmentData[]> => {
  const appointmentRepository = dataSource.getRepository(Appointment);
  const data = await appointmentRepository.find({ where: { physicianId } });
  return data.map(
    (appointment) =>
      ({
        userId: appointment.userId,
        encounderType: appointment.encounderType,
        noteCategory: appointment.noteCategory,
        date: appointment.date,
        physicianId: appointment.physicianId,
      } as AppointmentData)
  );
};
export const getScoreData = async (userId: string): Promise<ScoreData[]> => {
  const patientScoreRepository = dataSource.getRepository(PatientsScore);
  const data = await patientScoreRepository.find({ where: { userId } });
  return data.map(
    (score) =>
      ({
        userId: score.userId,
        questionId: score.questionId,
        subSectionId: score.subSectionId,
        score: score.score,
      } as ScoreData)
  );
};

export const getPatientAssessmentsData = async (
  patient_id: string
): Promise<Answers[]> => {
  const answers = await dataSource
    .getRepository(Answers)
    .find({ where: { userId: patient_id } });
  return answers;
};
