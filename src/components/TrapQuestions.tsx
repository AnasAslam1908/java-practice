import { type TrapQuestion } from "@/data/topics";

interface TrapQuestionsProps {
  questions: TrapQuestion[];
}

export default function TrapQuestions({ questions }: TrapQuestionsProps) {
  return (
    <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-5">
      <h3 className="text-xs font-bold uppercase tracking-widest text-destructive mb-4 flex items-center gap-2">
        🎯 Trap Questions
      </h3>
      <div className="space-y-4">
        {questions.map((q, i) => (
          <div key={i} className={i < questions.length - 1 ? "pb-4 border-b border-border" : ""}>
            <div className="text-sm font-semibold text-primary mb-1">Q: {q.question}</div>
            <div className="text-sm text-muted-foreground leading-relaxed">→ {q.answer}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
