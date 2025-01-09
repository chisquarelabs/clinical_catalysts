export type QuestionType =
  | "radio"
  | "checkbox"
  | "text"
  | "textarea"
  | "number"
  | "date"
  | "slider"
  | "multiSelect"
  | "statement"
  | "heading";

export interface Option {
  value: string;
  label: string;
}

export interface ValidationRule {
  pattern?: string;
  message?: string;
  min?: number;
  max?: number;
  step?: number;
}

export interface QuestionCondition {
  value?: string | string[] | { [key: string]: string };
  default?: boolean;
  nextQuestionId: string;
}

export interface QuestionNavigation {
  conditions?: QuestionCondition[];
  nextQuestionId?: string;
}

export interface Question {
  id: string;
  text: string;
  type: QuestionType;
  required?: boolean;
  options?: Option[];
  validation?: ValidationRule;
  nextQuestion?: QuestionNavigation;
  category?: string;
  subCategory?: string;
  scoring?: {
    category: string;
    value: number | { [key: string]: number };
  };
}

export interface SectionScoring {
  maxScore: number;
  scoreMap: {
    [key: string]: number;
  };
}

export interface Section {
  id: string;
  title: string;
  type: 'form' | 'single';
  questions: Question[];
  nextQuestion?: QuestionNavigation;
  scoring?: {
    [category: string]: SectionScoring;
  };
}

export interface Questionnaire {
  id: string;
  title: string;
  description?: string;
  sections: Section[];
  scoring?: {
    [category: string]: {
      label: string;
      maxScore: number;
      weight: number;
    };
  };
}
