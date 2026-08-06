import { useState } from "react";
import { Search, ChevronRight } from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { ShineBorder } from "@/components/ShineBorder";
import { organisms, type Organism } from "@/lib/dataset";

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
      <ShineBorder
        borderRadius={9999}
        borderWidth={1.5}
        duration={12}
        shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
        className="p-0 overflow-hidden rounded-full shadow-lg"
      >
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="glass-panel group flex w-full items-center gap-3 rounded-full px-5 py-4 text-left transition-colors hover:border-accent/50"
          aria-label="Search genus"
        >
          <Search className="h-4 w-4 shrink-0 text-accent" aria-hidden />
          <span className="min-w-0 flex-1 truncate text-sm text-muted-foreground">
            {selected ? (
              <span className="font-medium text-foreground">
                {selected.genus} ({selected.species})
              </span>
            ) : (
              "Search a genus — Escherichia (E. coli), Klebsiella (K. pneumoniae), Klebsiella (K. oxytoca)…"
            )}
          </span>
          <span className="hidden shrink-0 items-center gap-1 text-xs text-muted-foreground sm:flex">
            {organisms.length} species targets
            <ChevronRight className="h-3.5 w-3.5" aria-hidden />
          </span>
        </button>
      </ShineBorder>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a genus or species (e.g. Klebsiella, K. oxytoca)…" />
        <CommandList>
          <CommandEmpty>No target found in this dataset.</CommandEmpty>
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
              <span className="font-medium text-foreground">
                {o.genus} <span className="text-muted-foreground font-normal">({o.species})</span>
              </span>
              <span className="shrink-0 font-mono text-xs text-muted-foreground">
                {o.structureId}
                {o.predicted ? " · predicted" : ""}
              </span>
            </CommandItem>
          ))}
        </CommandList>
      </CommandDialog>
    </>
  );
}
