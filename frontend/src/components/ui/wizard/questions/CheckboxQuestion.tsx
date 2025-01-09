import { BaseQuestionLayout, BaseQuestionProps } from "./BaseQuestion";
import { cn } from "../../../../lib/utils";
import { useWizardAnswer } from "../WizardContext";

export function CheckboxQuestion({ question, onChange }: BaseQuestionProps) {
  const answer = useWizardAnswer(question.id);
  const values = (answer?.value || []) as string[];

  const handleChange = (value: string) => {
    const currentValues = (answer?.value || []) as string[];
    const newAnswer = currentValues.includes(value)
      ? currentValues.filter(v => v !== value)
      : [...currentValues, value];
    
    onChange?.(newAnswer);
  };

  return (
    <BaseQuestionLayout question={question} onChange={onChange}>
      <div className="space-y-2">
        {question.options?.map((option) => (
          <label
            key={option.value}
            className={cn(
              "flex items-center space-x-3 p-3 rounded-lg border cursor-pointer",
              "transition-colors duration-200",
              values.includes(option.value)
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200 hover:bg-gray-50"
            )}
          >
            <input
              type="checkbox"
              value={option.value}
              checked={values.includes(option.value)}
              onChange={(e) => handleChange(e.target.value)}
              className="h-4 w-4 text-blue-600 rounded"
            />
            <span className="text-sm font-medium text-gray-900">
              {option.label}
            </span>
          </label>
        ))}
      </div>
    </BaseQuestionLayout>
  );
}
