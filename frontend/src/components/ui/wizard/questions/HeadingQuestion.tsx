import React from "react";
import { BaseQuestionProps } from "./BaseQuestion";

export function HeadingQuestion({ question }: BaseQuestionProps) {
  return (
    <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-4">
      {question.text}
    </h2>
  );
} 