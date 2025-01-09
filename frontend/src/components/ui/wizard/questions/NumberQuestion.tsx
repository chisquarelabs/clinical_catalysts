import { BaseQuestionLayout, BaseQuestionProps } from "./BaseQuestion";
import { useWizard } from "../WizardContext";

export function NumberQuestion({ question, onChange }: BaseQuestionProps) {
  const answer = useWizard(state => state.answers[question.id]?.value) ?? "";

  return (
    <BaseQuestionLayout question={question} onChange={onChange}>
      <input
        type="number"
        value={answer}
        onChange={(e) => onChange?.(Number(e.target.value))}
        className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label={question.text}
        title={question.text}
      />
    </BaseQuestionLayout>
  );
}
