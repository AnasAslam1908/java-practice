import { cheatSheetItems } from "@/data/topics";

export default function CheatSheet() {
  return (
    <div className="rounded-lg border border-border bg-card p-5">
      <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4 flex items-center gap-2">
        ⚡ Quick Cheat Sheet
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
        {cheatSheetItems.map((item) => (
          <div
            key={item.term}
            className="rounded-md border border-border bg-background p-3 border-l-[3px]"
            style={{ borderLeftColor: `hsl(var(--${item.colorClass}))` }}
          >
            <div className="text-xs font-bold text-foreground mb-0.5">{item.term}</div>
            <div className="text-[11px] text-muted-foreground leading-snug">{item.def}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
