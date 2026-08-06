import { BookOpen, Info, ShieldAlert, Sparkles } from "lucide-react";
import { GENUS_OVERVIEWS } from "@/data/genusOverview";
import type { Organism } from "@/lib/dataset";

export function GenusOverviewCard({ organism }: { organism: Organism }) {
  const overview = GENUS_OVERVIEWS[organism.genus];

  if (!overview) return null;

  return (
    <article className="glass-panel rounded-xl p-6 sm:p-7">
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-border/60 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="grid h-9 w-9 place-items-center rounded-lg bg-accent/10 text-accent">
            <BookOpen className="h-5 w-5" aria-hidden />
          </div>
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-foreground">
              {organism.genus} <span className="text-accent font-normal">({organism.species})</span> <span className="text-xs font-normal text-muted-foreground">· Genus Overview</span>
            </h2>
            <p className="text-xs text-muted-foreground">
              Microbiological introduction and key membrane features
            </p>
          </div>
        </div>
        <span className="glass-chip text-xs">
          Enterobacteriaceae
        </span>
      </header>

      <div className="mt-5">
        <div className="flex items-start gap-2.5 rounded-lg border border-accent/20 bg-accent/5 p-4 text-sm leading-relaxed text-foreground">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />
          <p>{overview.introduction}</p>
        </div>

        <div className="mt-6">
          <h3 className="flex items-center gap-1.5 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
            <Sparkles className="h-3.5 w-3.5 text-accent" aria-hidden />
            Key Features & Resistance Determinants
          </h3>

          <div className="mt-3 grid gap-3.5 sm:grid-cols-2">
            {overview.keyFeatures.map((kf, i) => (
              <div
                key={i}
                className="group rounded-lg border border-border/80 bg-background/50 p-3.5 transition-all hover:border-accent/40 hover:bg-background/80"
              >
                <div className="flex items-center gap-2">
                  <ShieldAlert className="h-3.5 w-3.5 text-accent shrink-0" aria-hidden />
                  <h4 className="text-xs font-medium text-foreground">
                    {kf.title}
                  </h4>
                </div>
                <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                  {kf.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
