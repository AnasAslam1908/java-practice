import { type Section } from "@/data/topics";

interface TableOfContentsProps {
  sections: Section[];
  activeSection: number;
  onSectionClick: (index: number) => void;
}

export default function TableOfContents({ sections, activeSection, onSectionClick }: TableOfContentsProps) {
  return (
    <nav className="py-5 pr-4">
      <h3 className="px-4 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-4">
        On this page
      </h3>
      <div className="space-y-px">
        {sections.map((section, idx) => (
          <button
            key={idx}
            onClick={() => onSectionClick(idx)}
            className={`w-full text-left px-4 py-1.5 text-[12px] leading-relaxed transition-all border-l-[1.5px] ${
              activeSection === idx
                ? "border-primary text-primary font-medium"
                : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
            }`}
          >
            {section.title}
          </button>
        ))}
      </div>
    </nav>
  );
}
