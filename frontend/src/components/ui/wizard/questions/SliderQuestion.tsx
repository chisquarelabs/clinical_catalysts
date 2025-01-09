import { BaseQuestionLayout, BaseQuestionProps } from "./BaseQuestion";
import { useWizard } from "../WizardContext";

export function SliderQuestion({ question, onChange }: BaseQuestionProps) {
  const answer = useWizard(state => state.answers[question.id]?.value) ?? "";

  return (
    <BaseQuestionLayout question={question} onChange={onChange}>
      <input
        type="range"
        value={answer}
        onChange={(e) => onChange?.(Number(e.target.value))}
        className="w-full"
        aria-label={question.text}
        title={question.text}
      />
    </BaseQuestionLayout>
  );
}
