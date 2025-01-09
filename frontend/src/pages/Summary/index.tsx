import { useLocation } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { questionnaire } from "../../data/questions";

interface SummaryProps {
  answers: {
    [key: string]: {
      question: string;
      answer: string;
      category: string;
      timestamp: string;
    };
  };
}

const Summary = () => {
  const location = useLocation();
  const { answers } = location.state as SummaryProps;
  console.log(answers);

  const groupedAnswers = Object.entries(answers).reduce((acc, [id, data]) => {
    const section = questionnaire.sections.find(s => 
      s.questions.some(q => q.id === id)
    );
    if (!section) return acc;

    if (!acc[section.title]) {
      acc[section.title] = [];
    }
    acc[section.title].push({ id, ...data });
    return acc;
  }, {} as Record<string, any[]>);

  const getAnswerStyle = (answer: string) => {
    if (answer === "yes") {
      return "text-red-600 font-medium";
    }
    if (answer === "no") {
      return "text-green-600 font-medium";
    }
    return "text-slate-600";
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-2xl font-bold text-slate-900 mb-6">
          Assessment Summary
        </h1>

        <div className="space-y-6">
          {Object.entries(groupedAnswers).map(([section, sectionAnswers]) => (
            <Card key={section}>
              <CardHeader>
                <CardTitle>{section}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {sectionAnswers.map((answer) => (
                    <div
                      key={answer.id}
                      className="flex justify-between items-start py-2 border-b border-slate-100 last:border-0"
                    >
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-slate-900">
                          {answer.question}
                        </p>
                        {/* <p className="text-xs text-slate-500">
                          Answered on {answer.timestamp}
                        </p> */}
                      </div>
                      <div className={`text-sm ${getAnswerStyle(answer.answer)}`}>
                        {answer.answer}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Risk Assessment</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {Object.entries(groupedAnswers).map(([section, answers]) => {
                  const riskAnswers = answers.filter(a => a.answer === "yes");
                  if (riskAnswers.length === 0) return null;

                  return (
                    <div key={section} className="text-sm">
                      <p className="font-medium text-slate-900">{section}</p>
                      <ul className="mt-1 space-y-1 text-red-600">
                        {riskAnswers.map(a => (
                          <li key={a.id}>{a.question}</li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Summary;
