import React from "react";
import { Wizard } from "../../components/ui/wizard/Wizard";
import { WizardSection } from "../../components/ui/wizard/WizardSection";
import { WizardNavigation } from "../../components/ui/wizard/WizardNavigation";
import { Sidebar } from "../../components/ui/wizard/WizardNavigation/Sidebar";
import { Header } from "../../components/ui/dashboard/Header";
import { useWizard } from "../../components/ui/wizard/WizardContext";
import type { Answer } from "../../components/ui/wizard/WizardContext";
import { questionnaire } from "../../data/questions";

const getMotivationalMessage = (
  sectionId: string,
  hasNegativeAnswers: boolean
) => {
  const messages = {
    demographics: "Every detail helps us understand you better! 🌟",
    social: hasNegativeAnswers
      ? "You're not alone in this journey 💝"
      : "Your social connections make you stronger! 🤝",
    medical: hasNegativeAnswers
      ? "Taking care of your health is the first step 💪"
      : "Your health is your wealth! 🌟",
    functional: hasNegativeAnswers
      ? "Small steps lead to big progress 🌱"
      : "You're doing great! Keep it up! ⭐",
    behavioral: hasNegativeAnswers
      ? "Every day is a new beginning 🌅"
      : "Your positive attitude shines through! ✨",
    cognition: hasNegativeAnswers
      ? "Your mind is stronger than you think 🧠"
      : "Your mind is amazing! 🌟",
  };

  return (
    messages[sectionId as keyof typeof messages] || "You're doing great! 🌟"
  );
};

const getNegativeQuestions = (answers: Record<string, Answer>) => {
  const negativeQuestions = [
    "behavioral_suicide_attempt",
    "behavioral_suicidal_thoughts",
    "behavioral_runaway",
    "behavioral_scammed",
    "behavioral_depression",
    "behavioral_anxiety",
    "behavioral_disturbed_sleep",
    "cognitive_memory_problems",
    "cognitive_short_term",
    "cognitive_long_term",
    "medical_hospitalization",
    "medical_cancer",
    "medical_stroke",
  ];

  return negativeQuestions.some((qId) => answers[qId]?.value === "yes");
};

const getEmojiForAnswer = (questionId: string, answer: Answer) => {
  const emojiMap: Record<string, { yes: string; no: string }> = {
    // Behavioral Questions
    behavioral_suicide_attempt: { yes: "😢", no: "😊" },
    behavioral_suicidal_thoughts: { yes: "😰", no: "😌" },
    behavioral_runaway: { yes: "😨", no: "🏡" },
    behavioral_scammed: { yes: "😟", no: "🛡️" },
    behavioral_sleep_pattern: { yes: "😴", no: "😫" },
    behavioral_dragging_feet: { yes: "🦶", no: "🚶" },
    behavioral_disturbed_sleep: { yes: "😩", no: "💤" },
    behavioral_depression: { yes: "😔", no: "😃" },
    behavioral_anxiety: { yes: "😰", no: "😌" },
    behavioral_irritation: { yes: "😠", no: "😊" },

    // Cognitive Questions
    cognitive_memory_problems: { yes: "🤔", no: "🧠" },
    cognitive_short_term: { yes: "😕", no: "📝" },
    cognitive_long_term: { yes: "😟", no: "💭" },
    cognitive_progression: { yes: "📉", no: "📈" },
    cognitive_memory_aids: { yes: "📱", no: "🤸" },
    cognitive_focus: { yes: "😵", no: "🎯" },
    cognitive_speech: { yes: "😶", no: "🗣️" },
    cognitive_expression: { yes: "😕", no: "🗨️" },
    cognitive_word_finding: { yes: "🔍", no: "📚" },
    cognitive_repetition: { yes: "🔄", no: "💬" },

    // Medical Questions
    medical_hospitalization: { yes: "🏥", no: "🏡" },
    medical_diabetic: { yes: "💉", no: "💪" },
    medical_thyroid: { yes: "🤒", no: "😊" },
    medical_cancer: { yes: "🎗️", no: "💪" },
    medical_stroke: { yes: "🧠", no: "💪" },
    medical_cardiac: { yes: "❤️‍🩹", no: "❤️" },
    medical_head_injuries: { yes: "🤕", no: "🧠" },
  };

  return answer?.value === "yes"
    ? emojiMap[questionId]?.yes
    : emojiMap[questionId]?.no;
};

const EmojiDisplay = () => {
  const currentSectionId = useWizard((state) => state.currentSectionId);
  const answers = useWizard((state) => state.answers);

  const hasNegativeAnswers = getNegativeQuestions(answers);

  // Get the most recently answered question in current section
  const getCurrentEmoji = () => {
    const currentSectionQuestions =
      questionnaire.sections.find((s) => s.id === currentSectionId)
        ?.questions || [];

    const answeredQuestions = currentSectionQuestions
      .filter((q) => answers[q.id])
      .map((q) => ({
        question: q,
        answer: answers[q.id],
        timestamp: answers[q.id].timestamp,
      }))
      .sort((a, b) => b.timestamp - a.timestamp);

    const lastAnswered = answeredQuestions[0];
    if (lastAnswered) {
      const emoji = getEmojiForAnswer(
        lastAnswered.question.id,
        lastAnswered.answer
      );
      if (emoji) return emoji;
    }

    // Default emoji if no answers or no emoji mapping
    const defaultEmojis = {
      demographics: "👤",
      social: "👥",
      medical: "⚕️",
      functional: "🔧",
      behavioral: "🧠",
      cognition: "💭",
    };

    return (
      defaultEmojis[currentSectionId as keyof typeof defaultEmojis] || "📝"
    );
  };

  return (
    <div className="w-72 p-6 bg-white border-l border-slate-200">
      <div className="sticky top-[5.5rem]">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div
            className="text-8xl animate-bounce-slow transition-all duration-500"
            role="img"
          >
            {getCurrentEmoji()}
          </div>
          <p className="text-base font-medium text-slate-600 text-center leading-relaxed">
            {getMotivationalMessage(currentSectionId, hasNegativeAnswers)}
          </p>
        </div>
      </div>
    </div>
  );
};

const Questionnaire = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="fixed top-0 left-0 right-0 z-10">
        <Header />
      </div>

      <div className="flex pt-[64px]">
        <div className="fixed left-0 top-[64px] bottom-0">
          <Sidebar />
        </div>

        <main className="flex flex-1 ml-80">
          <div className="flex-1 bg-slate-50 min-h-[calc(100vh-4rem)]">
            <div className="max-w-4xl mx-auto px-6 py-8">
              <Wizard>
                <div className="bg-white rounded-xl shadow-sm border border-slate-200">
                  <WizardSection />
                  <div className="px-6 py-4 border-t border-slate-200">
                    <WizardNavigation />
                  </div>
                </div>
              </Wizard>
            </div>
          </div>
          <EmojiDisplay />
        </main>
      </div>
    </div>
  );
};

export default Questionnaire;
