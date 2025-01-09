import { useWizard } from "./WizardContext";
import { Question } from "./questions/types";
import { questionnaire } from "../../../data/questions";
import { cn } from "../../../lib/utils";
import {
  RadioQuestion,
  CheckboxQuestion,
  TextQuestion,
  NumberQuestion,
  DateQuestion,
  SliderQuestion,
  TextAreaQuestion,
  MultiSelectQuestion,
  StatementQuestion,
  HeadingQuestion,
} from "./questions";
import { RequiredBadge } from "./components/RequiredBadge";

interface QuestionRendererProps {
  question: Question;
}

export function QuestionRenderer({ question }: QuestionRendererProps) {
  const setAnswer = useWizard(state => state.setAnswer);

  const handleAnswerChange = (value: any) => {
    setAnswer(question.id, value);
  };

  const renderQuestion = (q: Question) => {
    switch (q.type) {
      case "heading":
        return <HeadingQuestion question={q} />;
      case "radio":
        return <RadioQuestion question={q} onChange={handleAnswerChange} />;
      case "checkbox":
        return <CheckboxQuestion question={q} onChange={handleAnswerChange} />;
      case "text":
        return <TextQuestion question={q} onChange={handleAnswerChange} />;
      case "textarea":
        return <TextAreaQuestion question={q} onChange={handleAnswerChange} />;
      case "number":
        return <NumberQuestion question={q} onChange={handleAnswerChange} />;
      case "date":
        return <DateQuestion question={q} onChange={handleAnswerChange} />;
      case "slider":
        return <SliderQuestion question={q} onChange={handleAnswerChange} />;
      case "multiSelect":
        return (
          <MultiSelectQuestion question={q} onChange={handleAnswerChange} />
        );
      case "statement":
        return <StatementQuestion question={q} onChange={handleAnswerChange} />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <div className="text-base font-medium text-gray-900">
          {question.text}
        </div>
        {question.required && (
          <RequiredBadge className="mt-0.5" />
        )}
      </div>
      {renderQuestion(question)}
    </div>
  );
}
