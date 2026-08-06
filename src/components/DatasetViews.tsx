import { useMemo, useState } from "react";
import { ArrowUpDown } from "lucide-react";
import { affinityRange, ligandMeta, ligandNames, organisms, records } from "@/lib/dataset";
import { cn } from "@/lib/utils";

type SortKey = "genus" | "ligand" | "affinity";

export function DatasetExplorer() {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<{ key: SortKey; dir: 1 | -1 }>({
    key: "affinity",
    dir: 1,
  });

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = records.filter((r) =>
      q
        ? `${r.genus} ${r.species} ${r.structureId} ${ligandMeta(r.ligand).label}`
            .toLowerCase()
            .includes(q)
        : true,
    );
    return [...filtered].sort((a, b) => {
      if (sort.key === "affinity") return (a.affinity - b.affinity) * sort.dir;
      if (sort.key === "ligand")
        return ligandMeta(a.ligand).label.localeCompare(ligandMeta(b.ligand).label) * sort.dir;
      return `${a.genus}${a.species}`.localeCompare(`${b.genus}${b.species}`) * sort.dir;
    });
  }, [query, sort]);

  const toggle = (key: SortKey) =>
    setSort((s) => (s.key === key ? { key, dir: s.dir === 1 ? -1 : 1 } : { key, dir: 1 }));

  return (
    <div className="flex flex-col gap-4">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Filter all 112 records — genus, PDB ID or ligand"
        aria-label="Filter docking records"
        className="w-full rounded-full border border-border bg-card px-4 py-2.5 text-sm outline-none placeholder:text-muted-foreground focus:border-accent/60"
      />

      <div className="glass-panel max-h-[460px] overflow-auto rounded-xl">
        <table className="w-full min-w-[560px] border-collapse text-sm">
          <thead className="sticky top-0 z-10 bg-card/95 backdrop-blur">
            <tr className="text-left text-xs tracking-wide text-muted-foreground uppercase">
              <th className="px-4 py-3 font-medium">
                <button
                  type="button"
                  onClick={() => toggle("genus")}
                  className="inline-flex items-center gap-1 hover:text-accent"
                >
                  Organism <ArrowUpDown className="h-3 w-3" aria-hidden />
                </button>
              </th>
              <th className="px-4 py-3 font-medium">Structure</th>
              <th className="px-4 py-3 font-medium">
                <button
                  type="button"
                  onClick={() => toggle("ligand")}
                  className="inline-flex items-center gap-1 hover:text-accent"
                >
                  Ligand <ArrowUpDown className="h-3 w-3" aria-hidden />
                </button>
              </th>
              <th className="px-4 py-3 text-right font-medium">
                <button
                  type="button"
                  onClick={() => toggle("affinity")}
                  className="inline-flex items-center gap-1 hover:text-accent"
                >
                  ΔG <ArrowUpDown className="h-3 w-3" aria-hidden />
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr
                key={`${r.genus}-${r.species}-${r.ligand}-${i}`}
                className="border-t border-border/60"
              >
                <td className="px-4 py-2.5">
                  <span className="text-foreground">{r.genus}</span>
                  <span className="text-muted-foreground italic"> {r.species}</span>
                </td>
                <td className="px-4 py-2.5 font-mono text-xs text-muted-foreground">
                  {r.structureId}
                </td>
                <td className="px-4 py-2.5">{ligandMeta(r.ligand).label}</td>
                <td className="px-4 py-2.5 text-right font-mono tabular-nums">
                  {r.affinity.toFixed(1)}
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-muted-foreground">
                  No records match that filter.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-muted-foreground">
        ΔG in kcal/mol; more negative values indicate stronger predicted binding.
      </p>
    </div>
  );
}

export function AffinityHeatmap() {
  const byKey = useMemo(() => {
    const m = new Map<string, number>();
    for (const r of records) m.set(`${r.genus}|${r.species}|${r.ligand}`, r.affinity);
    return m;
  }, []);

  const shade = (v: number) => {
    const t = (v - affinityRange.max) / (affinityRange.min - affinityRange.max);
    return 0.08 + t * 0.82;
  };

  return (
    <div className="glass-panel overflow-auto rounded-xl">
      <table className="border-collapse text-xs">
        <thead>
          <tr>
            <th className="sticky left-0 z-10 bg-card px-3 py-2 text-left font-medium text-muted-foreground">
              Organism
            </th>
            {ligandNames.map((l) => (
              <th
                key={l}
                className="h-28 px-1 align-bottom font-medium text-muted-foreground"
                title={ligandMeta(l).label}
              >
                <span className="block w-6 origin-bottom-left translate-x-2 -rotate-60 whitespace-nowrap">
                  {ligandMeta(l).label}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {organisms.map((o) => (
            <tr key={o.key}>
              <th className="sticky left-0 z-10 bg-card px-3 py-1 text-left font-normal whitespace-nowrap">
                <span className="text-foreground">{o.genus}</span>{" "}
                <span className="text-muted-foreground italic">{o.species}</span>
              </th>
              {ligandNames.map((l) => {
                const v = byKey.get(`${o.genus}|${o.species}|${l}`);
                return (
                  <td key={l} className="p-0.5">
                    <div
                      className={cn(
                        "grid h-7 w-9 place-items-center rounded-[3px] font-mono tabular-nums",
                        v === undefined && "bg-muted/40",
                      )}
                      style={
                        v === undefined
                          ? undefined
                          : {
                              backgroundColor: `color-mix(in oklab, var(--accent) ${shade(v) * 100}%, transparent)`,
                            }
                      }
                      title={v === undefined ? "not tested" : `${o.species} · ${ligandMeta(l).label}: ${v} kcal/mol`}
                    >
                      {v === undefined ? "" : v.toFixed(1)}
                    </div>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
