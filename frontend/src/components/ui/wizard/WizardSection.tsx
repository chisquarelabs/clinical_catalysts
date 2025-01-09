import React from "react";
import { useWizard } from "./WizardContext";
import { questionnaire } from "../../../data/questions";
import { QuestionRenderer } from "./QuestionRenderer";
import { RequiredBadge } from "./components/RequiredBadge";

const getSectionEmoji = (sectionId: string) => {
  switch (sectionId) {
    case 'demographics':
      return '👤';
    case 'social':
      return '👥';
    case 'medical':
      return '🏥';
    case 'functional':
      return '🔧';
    case 'behavioral':
      return '🧠';
    case 'cognition':
      return '💭';
    default:
      return '📝';
  }
};

export function WizardSection() {
  const currentSectionId = useWizard(state => state.currentSectionId);
  const currentSection = questionnaire.sections.find(s => s.id === currentSectionId);

  if (!currentSection) return null;

  return (
    <div>
      {/* <div className="px-6 py-4 bg-white border-b flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-semibold text-slate-900">
            {currentSection.title}
          </h2>
          <RequiredBadge />
        </div>
        <div className="text-3xl" role="img" aria-label={currentSection.title}>
          {getSectionEmoji(currentSection.id)}
        </div>
      </div> */}
      <div className="divide-y divide-gray-200">
        {currentSection.questions.map((question) => (
          <div key={question.id} className="px-6 py-4">
            <QuestionRenderer question={question} />
          </div>
        ))}
      </div>
    </div>
  );
} 