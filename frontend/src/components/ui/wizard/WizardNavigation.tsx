import React from 'react';
import { useWizard } from './WizardContext';
import { questionnaire } from '../../../data/questions';
import { cn } from '../../../lib/utils';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export function WizardNavigation() {
  const navigate = useNavigate();
  const nextSection = useWizard(state => state.nextSection);
  const prevSection = useWizard(state => state.prevSection);
  const currentSectionId = useWizard(state => state.currentSectionId);
  const answers = useWizard(state => state.answers);
  
  const currentIndex = questionnaire.sections.findIndex(s => s.id === currentSectionId);
  const currentSection = questionnaire.sections[currentIndex];
  const isFirstSection = currentIndex === 0;
  const isLastSection = currentIndex === questionnaire.sections.length - 1;

  const isSectionValid = React.useMemo(() => {
    if (!currentSection) return false;
    
    const requiredQuestions = currentSection.questions.filter(q => q.required);
    if (requiredQuestions.length === 0) return true;

    return requiredQuestions.every(q => {
      const answer = answers[q.id];
      return answer?.value !== undefined && answer?.value !== '';
    });
  }, [currentSection, answers]);

  const handleFinish = async () => {
    // Process and log answers
    const processedAnswers = Object.entries(answers).reduce((acc, [questionId, answer]) => {
      // Find question details from questionnaire
      const question = questionnaire.sections
        .flatMap(s => s.questions)
        .find(q => q.id === questionId);

      acc[questionId] = {
        question: question?.text || 'Unknown Question',
        answer: answer.value,
        timestamp: new Date(answer.timestamp).toLocaleString(),
        category: question?.category || 'uncategorized'
      };
      return acc;
    }, {} as Record<string, any>);

    console.group('Questionnaire Answers');
    console.log('Raw Answers:', answers);
    console.log('Processed Answers:', processedAnswers);
    console.groupEnd();
    
    // Axios call to host
    const response = await axios.post('http://localhost:8080/answers', {
      answers,
      userId: "PAT001"
    });
    console.log("Resposnse", response);

    // Navigate to summary
    navigate('/summary', { 
      state: { 
        answers: processedAnswers
      }
    });
  };

  return (
    <div className="flex justify-between items-center">
      <button
        onClick={prevSection}
        disabled={isFirstSection}
        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
      >
        Previous Section
      </button>
      
      <div className="text-sm text-gray-500">
        Section {currentIndex + 1} of {questionnaire.sections.length}
      </div>

      {isLastSection ? (
        <button
          onClick={handleFinish}
          disabled={!isSectionValid}
          className={cn(
            "px-4 py-2 text-sm font-medium rounded-md",
            isSectionValid
              ? "text-white bg-green-600 hover:bg-green-700"
              : "text-gray-400 bg-gray-200 cursor-not-allowed"
          )}
        >
          Finish
        </button>
      ) : (
        <button
          onClick={nextSection}
          disabled={!isSectionValid}
          className={cn(
            "px-4 py-2 text-sm font-medium rounded-md",
            isSectionValid
              ? "text-white bg-blue-600 hover:bg-blue-700"
              : "text-gray-400 bg-gray-200 cursor-not-allowed"
          )}
        >
          Next Section
        </button>
      )}
    </div>
  );
}