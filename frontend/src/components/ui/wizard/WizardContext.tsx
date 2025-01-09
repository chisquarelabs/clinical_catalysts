import { createContext, useContext, useCallback } from "react";
import { create } from "zustand";
import { questionnaire } from "../../../data/questions";

export interface Answer {
  value: string;
  timestamp: number;
}

interface WizardState {
  currentSectionId: string;
  answers: Record<string, Answer>;
  setAnswer: (questionId: string, value: string) => void;
  nextSection: () => void;
  prevSection: () => void;
  setCurrentSectionId: (sectionId: string) => void;
}

const checkConditions = (currentSectionId: string, answers: Record<string, Answer>) => {
  const currentSection = questionnaire.sections.find(s => s.id === currentSectionId);
  if (!currentSection?.nextQuestion?.conditions) {
    return currentSection?.nextQuestion?.nextQuestionId || "end";
  }

  for (const condition of currentSection.nextQuestion.conditions) {
    if (condition.default) continue;

    const matches = condition.value && Object.entries(condition.value).every(
      ([key, value]) => answers[key]?.value === value
    );

    if (matches) {
      return condition.nextQuestionId;
    }
  }

  // Return default path if no conditions match
  const defaultCondition = currentSection.nextQuestion.conditions.find(c => c.default);
  return defaultCondition?.nextQuestionId || "end";
};

export const useWizardStore = create<WizardState>((set, get) => ({
  currentSectionId: questionnaire.sections[0].id,
  answers: {},
  setAnswer: (questionId: string, value: string) =>
    set((state) => ({
      answers: {
        ...state.answers,
        [questionId]: { value, timestamp: Date.now() },
      },
    })),
  nextSection: () => {
    const { currentSectionId, answers } = get();
    const nextSectionId = checkConditions(currentSectionId, answers);
    
    if (nextSectionId) {
      set({ currentSectionId: nextSectionId });
    }
  },
  prevSection: () =>
    set((state) => {
      const currentIndex = questionnaire.sections.findIndex(
        (s) => s.id === state.currentSectionId
      );
      const prevSection = questionnaire.sections[currentIndex - 1];
      return prevSection ? { currentSectionId: prevSection.id } : state;
    }),
  setCurrentSectionId: (sectionId: string) => set({ currentSectionId: sectionId }),
}));

export const useWizard = useWizardStore;

export const useWizardAnswer = (questionId: string) => 
  useWizard(state => state.answers[questionId]);
