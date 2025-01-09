import { BaseQuestionLayout, BaseQuestionProps } from "./BaseQuestion";

export function StatementQuestion({ question }: BaseQuestionProps) {
  return (
    <BaseQuestionLayout question={question} onChange={() => {}}>
      <div className="text-center py-12 bg-[#E6F3FF] rounded-xl">
        <h2 className="text-3xl font-semibold text-[#2C3E50] mb-6">
          {question.text}
        </h2>
        <p className="text-[#596775] text-xl">
          Click the Finish button below to submit your responses.
        </p>
      </div>
    </BaseQuestionLayout>
  );
}
