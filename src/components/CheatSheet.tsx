import { cheatSheetItems } from "@/data/topics";

export default function CheatSheet() {
  return (
    <div>
      <h3 className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-4 flex items-center gap-2">
        ⚡ Quick Reference
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {cheatSheetItems.map((item) => (
          <div
            key={item.term}
            className="rounded-md border border-border bg-card p-3 border-l-2"
            style={{ borderLeftColor: `hsl(var(--${item.colorClass}))` }}
          >
            <div className="text-[12px] font-semibold text-foreground mb-0.5">{item.term}</div>
            <div className="text-[11px] text-muted-foreground leading-snug">{item.def}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
