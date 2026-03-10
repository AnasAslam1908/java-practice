import { type TrapQuestion } from "@/data/topics";
import { AlertTriangle } from "lucide-react";

interface TrapQuestionsProps {
  questions: TrapQuestion[];
}

export default function TrapQuestions({ questions }: TrapQuestionsProps) {
  return (
    <div className="rounded-lg border border-destructive/15 bg-destructive/5 p-5">
      <div className="flex items-center gap-2 mb-5">
        <AlertTriangle className="h-4 w-4 text-destructive" />
        <h3 className="text-[11px] font-semibold uppercase tracking-widest text-destructive">
          Common Trap Questions
        </h3>
      </div>
      <div className="space-y-4">
        {questions.map((q, i) => (
          <div key={i} className={i < questions.length - 1 ? "pb-4 border-b border-border/50" : ""}>
            <div className="text-[13px] font-medium text-foreground mb-1.5">{q.question}</div>
            <div className="text-[13px] text-muted-foreground leading-relaxed">{q.answer}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
