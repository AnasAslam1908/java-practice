import { topics, type Topic } from "@/data/topics";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";

interface DocSidebarProps {
  activeTopic: string;
  onTopicSelect: (topicId: string) => void;
  onSectionSelect: (topicId: string, sectionIndex: number) => void;
}

export default function DocSidebar({ activeTopic, onTopicSelect, onSectionSelect }: DocSidebarProps) {
  const [expandedTopics, setExpandedTopics] = useState<Set<string>>(new Set([activeTopic]));

  const toggleExpand = (topicId: string) => {
    setExpandedTopics((prev) => {
      const next = new Set(prev);
      if (next.has(topicId)) next.delete(topicId);
      else next.add(topicId);
      return next;
    });
  };

  const handleTopicClick = (topicId: string) => {
    onTopicSelect(topicId);
    setExpandedTopics((prev) => new Set(prev).add(topicId));
  };

  return (
    <nav className="py-4 space-y-1">
      <div className="px-4 mb-3">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Topics</h2>
      </div>
      {topics.map((topic: Topic) => {
        const isActive = activeTopic === topic.id;
        const isExpanded = expandedTopics.has(topic.id);

        return (
          <div key={topic.id}>
            <button
              onClick={() => {
                handleTopicClick(topic.id);
                toggleExpand(topic.id);
              }}
              className={`w-full flex items-center gap-2.5 px-4 py-2 text-sm transition-colors ${
                isActive
                  ? "text-primary font-semibold bg-primary/5"
                  : "text-foreground/70 hover:text-foreground hover:bg-accent"
              }`}
            >
              <span className="text-base flex-shrink-0">{topic.icon}</span>
              <span className="flex-1 text-left">{topic.label}</span>
              {isExpanded ? (
                <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
              ) : (
                <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
              )}
            </button>

            {isExpanded && (
              <div className="ml-4 pl-4 border-l border-border/50 space-y-0.5 py-1">
                {topic.sections.map((section, idx) => (
                  <button
                    key={idx}
                    onClick={() => onSectionSelect(topic.id, idx)}
                    className="w-full text-left px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground hover:bg-accent/50 rounded-md transition-colors truncate"
                  >
                    {section.title}
                  </button>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
}
