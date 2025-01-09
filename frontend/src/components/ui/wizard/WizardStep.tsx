import { useWizard } from "./WizardContext";
import { cn } from "../../../lib/utils";
import { QuestionRenderer } from "./QuestionRenderer";
import { questionnaire } from "../../../data/questions";

interface WizardStepProps {
  className?: string;
}

export function WizardStep({ className }: WizardStepProps) {
  const currentSectionId = useWizard(state => state.currentSectionId);
  const currentSection = questionnaire.sections.find(s => s.id === currentSectionId);

  if (!currentSection) return null;

  return (
    <div className={cn("transition-all duration-300 ease-in-out", className)}>
      {currentSection.questions.map(question => (
        <QuestionRenderer key={question.id} question={question} />
      ))}
    </div>
  );
}
