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
    <div ref={ref} className="animate-fade-in" style={{ animationDelay: `${index * 40}ms` }}>
      {/* Header */}
      <div className="flex items-baseline gap-3 mb-4">
        <h2 className="text-lg font-semibold text-foreground tracking-tight">{section.title}</h2>
        <span className="text-[10px] font-medium text-primary bg-primary/8 px-2 py-0.5 rounded-full whitespace-nowrap">
          {section.tag}
        </span>
      </div>

      {/* Key Points */}
      {section.keyPoints && section.keyPoints.length > 0 && (
        <ul className="mb-6 space-y-2">
          {section.keyPoints.map((point, i) => (
            <li key={i} className="flex items-start gap-2.5 text-[13px] text-muted-foreground leading-relaxed">
              <span className="text-primary mt-[3px] text-[8px]">●</span>
              <span>{point}</span>
            </li>
          ))}
        </ul>
      )}

      {/* Interview Answer */}
      <div className="mb-6 rounded-lg bg-interview-bg border border-interview-border/20 p-4">
        <div className="flex items-center gap-2 mb-2.5">
          <MessageSquareQuote className="h-3.5 w-3.5 text-primary" />
          <span className="text-[10px] font-semibold uppercase tracking-widest text-primary">
            Interview Answer
          </span>
        </div>
        <p className="text-[13px] text-foreground/70 leading-relaxed italic">
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
