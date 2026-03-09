import { forwardRef } from "react";
import { MessageSquareQuote } from "lucide-react";
import CodeBlock from "./CodeBlock";
import { type Section } from "@/data/topics";

interface SectionCardProps {
  section: Section;
  index: number;
}

const SectionCard = forwardRef<HTMLDivElement, SectionCardProps>(({ section, index }, ref) => {
  return (
    <div ref={ref} className="animate-fade-in" style={{ animationDelay: `${index * 50}ms` }}>
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <h2 className="text-xl font-bold text-foreground">{section.title}</h2>
        <span className="text-[11px] font-medium text-primary bg-primary/10 px-2.5 py-0.5 rounded-full">
          {section.tag}
        </span>
      </div>

      {/* Key Points */}
      {section.keyPoints && section.keyPoints.length > 0 && (
        <ul className="mb-5 space-y-1.5">
          {section.keyPoints.map((point, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-foreground/80">
              <span className="text-primary mt-1 text-xs">●</span>
              <span>{point}</span>
            </li>
          ))}
        </ul>
      )}

      {/* Interview Answer */}
      <div className="mb-5 rounded-lg bg-interview-bg border border-interview-border/30 p-4">
        <div className="flex items-center gap-2 mb-2">
          <MessageSquareQuote className="h-4 w-4 text-primary" />
          <span className="text-[11px] font-semibold uppercase tracking-wider text-primary">
            Say this in the interview
          </span>
        </div>
        <p className="text-sm text-foreground/80 leading-relaxed italic">
          {section.interview}
        </p>
      </div>

      {/* Code */}
      <CodeBlock code={section.code} />
    </div>
  );
});

SectionCard.displayName = "SectionCard";
export default SectionCard;
