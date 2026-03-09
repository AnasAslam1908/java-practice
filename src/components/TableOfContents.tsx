import { useEffect, useState } from "react";
import { type Section } from "@/data/topics";

interface TableOfContentsProps {
  sections: Section[];
  activeSection: number;
  onSectionClick: (index: number) => void;
}

export default function TableOfContents({ sections, activeSection, onSectionClick }: TableOfContentsProps) {
  return (
    <nav className="py-4">
      <h3 className="px-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
        On This Page
      </h3>
      <div className="space-y-0.5">
        {sections.map((section, idx) => (
          <button
            key={idx}
            onClick={() => onSectionClick(idx)}
            className={`w-full text-left px-4 py-1.5 text-xs transition-colors border-l-2 ${
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
