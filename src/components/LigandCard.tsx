import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ExternalLink, FlaskConical } from "lucide-react";
import { fetchPubChem } from "@/lib/chem-api";
import { renderSmilesSvg } from "@/lib/chem-loaders";
import { affinityRange, effluxNote, ligandMeta, type DockingRecord } from "@/lib/dataset";
import { MolstarViewerPanel } from "@/components/MolstarViewerPanel";
import { cn } from "@/lib/utils";

function AffinityBar({ value }: { value: number }) {
  // Affinities are negative; stronger binding = more negative.
  const pct =
    ((value - affinityRange.max) / (affinityRange.min - affinityRange.max)) * 100;
  return (
    <div className="flex items-center gap-3">
      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-accent"
          style={{ width: `${Math.max(4, Math.min(100, pct))}%` }}
        />
      </div>
      <span className="shrink-0 font-mono text-sm tabular-nums text-foreground">
        {value.toFixed(1)}
        <span className="ml-1 text-[10px] text-muted-foreground">kcal/mol</span>
      </span>
    </div>
  );
}

function Structure2D({ name }: { name: string }) {
  const meta = ligandMeta(name);
  const [imgFailed, setImgFailed] = useState(false);
  const [svg, setSvg] = useState<string | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ["pubchem", meta.query],
    queryFn: () => (meta.query ? fetchPubChem(meta.query) : Promise.resolve(null)),
    enabled: Boolean(meta.query),
    staleTime: 24 * 60 * 60 * 1000,
    retry: 1,
  });

  const needsFallback = !meta.query || (!isLoading && (!data || imgFailed));

  useEffect(() => {
    if (!needsFallback) return;
    const smiles = meta.smiles ?? data?.smiles;
    if (!smiles) return;
    let alive = true;
    void renderSmilesSvg(smiles).then((s) => {
      if (alive) setSvg(s);
    });
    return () => {
      alive = false;
    };
  }, [needsFallback, meta.smiles, data?.smiles]);

  return (
    <div className="flex flex-col gap-3">
      <div className="grid aspect-square place-items-center rounded-lg border border-border bg-white p-2">
        {!needsFallback && data ? (
          <img
            src={data.imageUrl}
            alt={`2D chemical structure of ${meta.label}`}
            loading="lazy"
            className="h-full w-full object-contain"
            onError={() => setImgFailed(true)}
          />
        ) : svg ? (
          <div
            className="h-full w-full [&>svg]:h-full [&>svg]:w-full"
            aria-label={`2D chemical structure of ${meta.label}, rendered locally`}
            dangerouslySetInnerHTML={{ __html: svg }}
          />
        ) : (
          <p className="px-3 text-center text-xs text-slate-500">
            {meta.kind === "class"
              ? "Antibiotic class — no single chemical structure"
              : isLoading
                ? "Loading 2D structure…"
                : "2D structure unavailable"}
          </p>
        )}
      </div>
      <dl className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs">
        <div>
          <dt className="text-muted-foreground">Formula</dt>
          <dd className="font-mono text-foreground">{data?.formula ?? "—"}</dd>
        </div>
        <div>
          <dt className="text-muted-foreground">Mol. weight</dt>
          <dd className="font-mono tabular-nums text-foreground">
            {data ? `${data.weight} g/mol` : "—"}
          </dd>
        </div>
        <div className="col-span-2 min-w-0">
          <dt className="text-muted-foreground">SMILES</dt>
          <dd className="truncate font-mono text-foreground" title={data?.smiles ?? meta.smiles}>
            {data?.smiles ?? meta.smiles ?? "—"}
          </dd>
        </div>
      </dl>
      {data && (
        <a
          href={data.pageUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 text-xs text-accent hover:underline"
        >
          PubChem CID {data.cid}
          <ExternalLink className="h-3 w-3" aria-hidden />
        </a>
      )}
      {!data && needsFallback && svg && (
        <p className="text-[11px] text-muted-foreground">
          Rendered locally with RDKit (no PubChem match).
        </p>
      )}
    </div>
  );
}

export function LigandCard({
  record,
  poseUrl,
}: {
  record: DockingRecord;
  poseUrl?: string;
}) {
  const meta = ligandMeta(record.ligand);
  const efflux = effluxNote(record.ligand);

  return (
    <article className="glass-panel rounded-xl p-4 sm:p-5">
      <header className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3 sm:flex sm:items-center sm:justify-between">
        <div className="min-w-0">
          <h3 className="truncate font-display text-lg text-foreground">{meta.label}</h3>
          <p className="text-xs text-muted-foreground">
            {meta.kind === "dye"
              ? "Dye / efflux-pump probe"
              : meta.kind === "class"
                ? "Antibiotic class"
                : "Antibiotic"}
            {meta.components ? ` · combination: ${meta.components.join(" + ")}` : ""}
          </p>
        </div>
        {efflux && (
          <span
            className="glass-chip shrink-0 text-[10px] tracking-wide uppercase"
            title={`${efflux.target} — ${efflux.notes}`}
          >
            Efflux substrate
          </span>
        )}
      </header>

      <div className="mt-4 grid gap-5 lg:grid-cols-[minmax(0,280px)_minmax(0,1fr)]">
        <Structure2D name={record.ligand} />

        <div className="flex min-w-0 flex-col gap-4">
          <div>
            <p className="text-xs tracking-wide text-muted-foreground uppercase">
              Binding affinity
            </p>
            <div className="mt-2">
              <AffinityBar value={record.affinity} />
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              Docked against {record.structureId} (<span className="italic">{record.species}</span>
              ).

            </p>
          </div>

          {efflux && (
            <p className="rounded-lg border border-border bg-muted/40 p-3 text-xs leading-relaxed text-muted-foreground">
              <span className="font-medium text-foreground">{efflux.target}. </span>
              {efflux.notes}
            </p>
          )}

          <div>
            <p className="mb-2 text-xs tracking-wide text-muted-foreground uppercase">
              Interaction view
            </p>
            {poseUrl ? (
              <MolstarViewerPanel
                fileUrl={poseUrl}
                label={`${meta.label} pose`}
                className="h-[280px] sm:h-[320px] lg:h-[320px]"
              />
            ) : (
              <div
                className={cn(
                  "grid h-[180px] place-items-center rounded-xl border border-dashed border-border",
                  "bg-muted/30 px-6 text-center",
                )}
              >
                <p className="max-w-sm text-xs text-muted-foreground">
                  <FlaskConical className="mx-auto mb-2 h-4 w-4 text-accent" aria-hidden />
                  Docked-pose data for this complex has not been added yet. Once the pose
                  files are supplied, the interaction viewer appears here.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
