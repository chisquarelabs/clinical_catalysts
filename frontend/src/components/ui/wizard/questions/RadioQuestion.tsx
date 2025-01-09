import React from "react";
import { BaseQuestionLayout, BaseQuestionProps } from "./BaseQuestion";
import { cn } from "../../../../lib/utils";
import { useWizard } from "../WizardContext";
import { Check, X, ThumbsUp, ThumbsDown, Clock, Calendar, Briefcase, GraduationCap, Heart, Activity, Minus, Star, Coffee, Moon, UserX, Sun, AlertCircle } from 'lucide-react';

const getOptionIcon = (value: string, type: string) => {
  // For Yes/No questions
  if (value === "yes") return (
    <div className="p-1.5 rounded-full bg-green-50">
      <ThumbsUp className="w-5 h-5 text-green-600" />
    </div>
  );
  if (value === "no") return (
    <div className="p-1.5 rounded-full bg-red-50">
      <ThumbsDown className="w-5 h-5 text-red-600" />
    </div>
  );

  // For other common options
  switch (value) {
    // Time related
    case "morning": return (
      <div className="p-1.5 rounded-full bg-amber-50">
        <Sun className="w-5 h-5 text-amber-600" />
      </div>
    );
    case "afternoon": return (
      <div className="p-1.5 rounded-full bg-orange-50">
        <Sun className="w-5 h-5 text-orange-600" />
      </div>
    );
    case "evening": return (
      <div className="p-1.5 rounded-full bg-indigo-50">
        <Moon className="w-5 h-5 text-indigo-600" />
      </div>
    );
    
    // Education
    case "entry":
    case "level1-3":
    case "level4-5": return (
      <div className="p-1.5 rounded-full bg-blue-50">
        <GraduationCap className="w-5 h-5 text-blue-600" />
      </div>
    );
    
    // Occupation
    case "employed": return (
      <div className="p-1.5 rounded-full bg-emerald-50">
        <Briefcase className="w-5 h-5 text-emerald-600" />
      </div>
    );
    case "unemployed": return (
      <div className="p-1.5 rounded-full bg-gray-50">
        <UserX className="w-5 h-5 text-gray-600" />
      </div>
    );
    case "retired": return (
      <div className="p-1.5 rounded-full bg-purple-50">
        <Coffee className="w-5 h-5 text-purple-600" />
      </div>
    );
    
    // Health
    case "excellent": return (
      <div className="p-1.5 rounded-full bg-yellow-50">
        <Star className="w-5 h-5 text-yellow-600" />
      </div>
    );
    case "good": return (
      <div className="p-1.5 rounded-full bg-green-50">
        <ThumbsUp className="w-5 h-5 text-green-600" />
      </div>
    );
    case "fair": return (
      <div className="p-1.5 rounded-full bg-orange-50">
        <Minus className="w-5 h-5 text-orange-600" />
      </div>
    );
    case "poor": return (
      <div className="p-1.5 rounded-full bg-red-50">
        <AlertCircle className="w-5 h-5 text-red-600" />
      </div>
    );

    default: return null;
  }
};

export function RadioQuestion({ question, onChange }: BaseQuestionProps) {
  const answer = useWizard(state => state.answers[question.id]?.value) ?? "";
  const isYesNo = question.options?.length === 2 && 
    question.options[0].value === "yes" && 
    question.options[1].value === "no";

  return (
    <BaseQuestionLayout question={question} onChange={onChange}>
      <div className={cn(
        "grid",
        isYesNo ? "grid-cols-2 gap-4" : "grid-cols-1 gap-2"
      )}>
        {question.options?.map((option) => {
          const icon = getOptionIcon(option.value, question.type);
          
          return (
            <label
              key={option.value}
              className={cn(
                "relative flex items-center",
                isYesNo 
                  ? cn(
                      "justify-center py-3 px-4 border-2 rounded-md cursor-pointer transition-all",
                      answer === option.value 
                        ? "border-blue-500 bg-blue-50 text-blue-700 ring-2 ring-blue-500 ring-offset-2" 
                        : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                    )
                  : cn(
                      "p-4 border-2 rounded-lg cursor-pointer transition-all",
                      answer === option.value
                        ? "border-blue-500 bg-blue-50 text-blue-700"
                        : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                    )
              )}
            >
              {!isYesNo && (
                <input
                  type="radio"
                  name={question.id}
                  value={option.value}
                  checked={answer === option.value}
                  onChange={(e) => onChange?.(e.target.value)}
                  className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
              )}
              <div className={cn(
                "flex items-center gap-2",
                !isYesNo ? "ml-3" : ""
              )}>
                {icon && (
                  <span className={cn(
                    "transition-colors duration-200",
                    answer === option.value ? "opacity-100" : "opacity-70 hover:opacity-100"
                  )}>
                    {icon}
                  </span>
                )}
                <span className={cn(
                  "font-medium",
                  isYesNo ? "text-base" : "text-sm",
                  answer === option.value ? "text-blue-700" : "text-gray-900"
                )}>
                  {option.label}
                </span>
              </div>
              {isYesNo && (
                <input
                  type="radio"
                  name={question.id}
                  value={option.value}
                  checked={answer === option.value}
                  onChange={(e) => onChange?.(e.target.value)}
                  className="sr-only"
                />
              )}
            </label>
          );
        })}
      </div>
    </BaseQuestionLayout>
  );
}
