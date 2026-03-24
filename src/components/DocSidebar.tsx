import { topics, type Topic } from "@/data/topics";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";

interface DocSidebarProps {
  activeTopic: string;
  onTopicSelect: (topicId: string) => void;
  onSectionSelect: (topicId: string, sectionIndex: number) => void;
}

export default function DocSidebar({
  activeTopic,
  onTopicSelect,
  onSectionSelect,
}: DocSidebarProps) {
  const [expandedTopics, setExpandedTopics] = useState<Set<string>>(
    new Set([activeTopic]),
  );

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
    <nav className="py-5 px-3">
      <div className="px-2 mb-4">
        <h2 className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
          Documentation
        </h2>
      </div>
      <div className="space-y-0.5">
        {topics.map((topic: Topic) => {
          const isActive = activeTopic === topic.id;
          const isExpanded = expandedTopics.has(topic.id);

          return (
            <div key={topic.id}>
              <button
                onClick={() => {
                  if (isActive) {
                    toggleExpand(topic.id);
                    return;
                  }
                  handleTopicClick(topic.id);
                }}
                className={`w-full flex items-center gap-2.5 px-2.5 py-[7px] text-[13px] rounded-md transition-colors ${
                  isActive
                    ? "text-primary font-medium bg-primary/8"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                }`}
              >
                <span className="text-sm flex-shrink-0">{topic.icon}</span>
                <span className="flex-1 text-left truncate">{topic.label}</span>
                {isExpanded ? (
                  <ChevronDown className="h-3 w-3 opacity-50" />
                ) : (
                  <ChevronRight className="h-3 w-3 opacity-50" />
                )}
              </button>

              {isExpanded && (
                <div className="ml-[18px] pl-3 border-l border-border space-y-px py-1 my-0.5">
                  {topic.sections.map((section, idx) => (
                    <button
                      key={idx}
                      onClick={() => onSectionSelect(topic.id, idx)}
                      className="w-full text-left px-2.5 py-[5px] text-[12px] text-muted-foreground hover:text-foreground rounded-md transition-colors truncate"
                    >
                      {section.title}
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </nav>
  );
}
