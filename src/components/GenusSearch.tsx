import { useState } from "react";
import { Search, ChevronRight } from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { genera, type Organism } from "@/lib/dataset";

export function GenusSearch({
  selected,
  onSelect,
}: {
  selected: Organism | null;
  onSelect: (o: Organism) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="glass-panel group flex w-full items-center gap-3 rounded-full px-5 py-4 text-left transition-colors hover:border-accent/50"
        aria-label="Search genus"
      >
        <Search className="h-4 w-4 shrink-0 text-accent" aria-hidden />
        <span className="min-w-0 flex-1 truncate text-sm text-muted-foreground">
          {selected ? (
            <span className="text-foreground">
              <span className="font-medium">{selected.genus}</span>
              <span className="text-muted-foreground"> · {selected.species}</span>
            </span>
          ) : (
            "Search a genus — Escherichia, Klebsiella, Salmonella…"
          )}
        </span>
        <span className="hidden shrink-0 items-center gap-1 text-xs text-muted-foreground sm:flex">
          {genera.length} genera
          <ChevronRight className="h-3.5 w-3.5" aria-hidden />
        </span>
      </button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a genus or species…" />
        <CommandList>
          <CommandEmpty>No genus found in this dataset.</CommandEmpty>
          {genera.map(({ genus, organisms }) => (
            <CommandGroup key={genus} heading={genus}>
              {organisms.map((o) => (
                <CommandItem
                  key={o.key}
                  value={`${o.genus} ${o.species} ${o.structureId}`}
                  onSelect={() => {
                    onSelect(o);
                    setOpen(false);
                  }}
                  className="flex items-center justify-between gap-3"
                >
                  <span className="min-w-0 truncate italic">{o.species}</span>
                  <span className="shrink-0 font-mono text-xs text-muted-foreground">
                    {o.structureId}
                    {o.predicted ? " · predicted" : ""}
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>
          ))}
        </CommandList>
      </CommandDialog>
    </>
  );
}
