export interface Patient {
  patientId: string;
  name: string;
  email: string;
}

export interface User {
  id: string;
  role: 'patient' | 'reviewer';
  email: string;
}

export interface QuestionnaireSection {
  id: string;
  title: string;
  questions: Question[];
}

export interface Question {
  id: string;
  text: string;
  type: 'text' | 'radio' | 'checkbox' | 'number';
  options?: string[];
  isRequired: boolean;
  isFlag?: boolean;
} 