import React from 'react';
import { useWizard } from './WizardContext';
import { questionnaire } from '../../../data/questions';

interface WizardProps {
  children: React.ReactNode;
}

export function Wizard({ children }: WizardProps) {
  const currentSectionId = useWizard(state => state.currentSectionId);
  const currentSection = questionnaire.sections.find(s => s.id === currentSectionId);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">{currentSection?.title}</h1>
        <p className="mt-1 text-sm text-gray-500">{questionnaire.description}</p>
      </div>
      {children}
    </div>
  );
}
