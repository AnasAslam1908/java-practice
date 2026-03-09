import { useState, useRef, useEffect } from "react";
import { Search, X } from "lucide-react";
import { topics, type Topic, type Section } from "@/data/topics";

interface SearchResult {
  topicId: string;
  topicLabel: string;
  sectionIndex: number;
  sectionTitle: string;
  tag: string;
}

interface SearchBarProps {
  onSelect: (topicId: string, sectionIndex: number) => void;
}

export default function SearchBar({ onSelect }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(true);
      }
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  const results: SearchResult[] = query.trim().length < 2
    ? []
    : topics.flatMap((t: Topic) =>
        t.sections
          .map((s: Section, i: number) => ({ topicId: t.id, topicLabel: t.label, sectionIndex: i, sectionTitle: s.title, tag: s.tag }))
          .filter(
            (r) =>
              r.sectionTitle.toLowerCase().includes(query.toLowerCase()) ||
              r.tag.toLowerCase().includes(query.toLowerCase()) ||
              r.topicLabel.toLowerCase().includes(query.toLowerCase())
          )
      );

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 px-3 py-1.5 text-sm text-muted-foreground border border-border rounded-lg hover:bg-accent transition-colors w-full sm:w-56"
      >
        <Search className="h-3.5 w-3.5" />
        <span className="flex-1 text-left">Search...</span>
        <kbd className="hidden sm:inline text-[10px] font-mono bg-muted px-1.5 py-0.5 rounded text-muted-foreground">⌘K</kbd>
      </button>

      {open && (
        <div className="absolute top-full mt-2 left-0 right-0 sm:w-96 bg-card border border-border rounded-xl shadow-2xl z-50 overflow-hidden">
          <div className="flex items-center gap-2 px-3 py-2 border-b border-border">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search topics, sections..."
              className="flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
            />
            {query && (
              <button onClick={() => setQuery("")} className="text-muted-foreground hover:text-foreground">
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
          <div className="max-h-72 overflow-y-auto scrollbar-thin">
            {results.length === 0 && query.length >= 2 && (
              <div className="p-4 text-sm text-muted-foreground text-center">No results found</div>
            )}
            {results.map((r, i) => (
              <button
                key={i}
                onClick={() => {
                  onSelect(r.topicId, r.sectionIndex);
                  setOpen(false);
                  setQuery("");
                }}
                className="w-full text-left px-4 py-2.5 hover:bg-accent transition-colors flex items-center gap-3 border-b border-border/50 last:border-0"
              >
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-foreground truncate">{r.sectionTitle}</div>
                  <div className="text-xs text-muted-foreground">{r.topicLabel}</div>
                </div>
                <span className="text-[10px] font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full whitespace-nowrap">
                  {r.tag}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
