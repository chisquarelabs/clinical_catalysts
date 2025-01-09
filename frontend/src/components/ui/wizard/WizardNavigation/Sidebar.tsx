import React from 'react';
import { cn } from '../../../../lib/utils';
import { useWizard } from '../WizardContext';
import { questionnaire } from '../../../../data/questions';
import { CheckCircle2 } from 'lucide-react';

export function Sidebar() {
  const currentSectionId = useWizard(state => state.currentSectionId);
  const answers = useWizard(state => state.answers);
  const setCurrentSectionId = useWizard(state => state.setCurrentSectionId);

  const isSectionComplete = (sectionId: string) => {
    const section = questionnaire.sections.find(s => s.id === sectionId);
    if (!section) return false;
    
    return section.questions.every(q => 
      !q.required || (q.id in answers && answers[q.id] !== undefined)
    );
  };

  return (
    <div className="w-80 bg-white border-r border-slate-200 h-full overflow-y-auto">
      <div className="p-6">
        <div className="text-lg font-semibold text-slate-800 mb-6 pl-14">
          Progress
        </div>
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[25px] top-0 bottom-0 w-0.5 bg-slate-200" />

          <nav className="relative space-y-6">
            {questionnaire.sections.map((section, index) => {
              const isActive = section.id === currentSectionId;
              const isComplete = isSectionComplete(section.id);
              const stepNumber = index + 1;

              return (
                <button
                  key={section.id}
                  onClick={() => setCurrentSectionId(section.id)}
                  className="w-full text-left flex items-start gap-4 relative hover:bg-slate-50 p-2 rounded-lg transition-colors"
                >
                  {/* Step indicator */}
                  <div className={cn(
                    "z-10 flex items-center justify-center w-9 h-9 rounded-full border-2 shrink-0",
                    isComplete 
                      ? "bg-green-50 border-green-500" 
                      : isActive
                        ? "bg-blue-50 border-blue-500"
                        : "bg-white border-slate-300"
                  )}>
                    {isComplete ? (
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                    ) : (
                      <span className={cn(
                        "text-sm font-semibold",
                        isActive ? "text-blue-600" : "text-slate-500"
                      )}>
                        {stepNumber}
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className={cn(
                      "text-sm font-medium mb-1",
                      isActive ? "text-blue-600" : "text-slate-900"
                    )}>
                      STEP - {stepNumber}
                    </div>
                    <div className={cn(
                      "text-sm font-medium leading-tight",
                      isActive ? "text-blue-900" : "text-slate-600"
                    )}>
                      {section.title}
                    </div>
                  </div>
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
} 