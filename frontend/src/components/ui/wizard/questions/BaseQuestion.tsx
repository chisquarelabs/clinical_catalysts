import { Question } from "./types";

export interface BaseQuestionProps {
  question: Question;
  onChange?: (value: any) => void;
  error?: string;
}

export function BaseQuestionLayout({
  question,
  children,
  error,
}: BaseQuestionProps & { children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <div className="mt-2">{children}</div>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
