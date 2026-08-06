import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ClientOnly } from "@tanstack/react-router";
import { ExternalLink, Dna } from "lucide-react";
import { GenusSearch } from "@/components/GenusSearch";
import { LigandCard } from "@/components/LigandCard";
import { MolstarViewerPanel } from "@/components/MolstarViewerPanel";
import { GenusOverviewCard } from "@/components/GenusOverviewCard";
import { AnimatedRays } from "@/components/AnimatedRays";
import { AnimatedThemeToggler } from "@/components/AnimatedThemeToggler";
import { getInteractionPoseUrl } from "@/lib/interactionPoses";
import { fetchStructureMeta } from "@/lib/chem-api";
import { genera, organisms, records, recordsFor, type Organism } from "@/lib/dataset";

const TITLE =
  "Molecular Docking studies of Enterobacteriaceae outer membrane with common antibiotics and dyes";
const DESCRIPTION =
  "Interactive docking database: 112 binding affinities across 15 Enterobacteriaceae genera, with live 3D outer-membrane structures, 2D ligand structures and efflux-pump dye probes.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Molecular Docking of Enterobacteriaceae Outer Membrane Proteins" },
      { name: "description", content: DESCRIPTION },
      {
        property: "og:title",
        content: "Molecular Docking of Enterobacteriaceae Outer Membrane Proteins",
      },
      { property: "og:description", content: DESCRIPTION },
      {
        name: "twitter:title",
        content: "Molecular Docking of Enterobacteriaceae Outer Membrane Proteins",
      },
      { name: "twitter:description", content: DESCRIPTION },
    ],
  }),
  component: Index,
});

function StructurePanel({ organism }: { organism: Organism }) {
  const { data, isLoading } = useQuery({
    queryKey: ["structure", organism.structureId, organism.predicted],
    queryFn: () => fetchStructureMeta(organism.structureId, organism.predicted),
    staleTime: 24 * 60 * 60 * 1000,
    retry: 1,
  });

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,340px)]">
      <ClientOnly
        fallback={
          <div className="glass-panel h-[340px] rounded-xl sm:h-[420px] lg:h-[480px]" />
        }
      >
        <MolstarViewerPanel
          structureId={organism.structureId}
          predicted={organism.predicted}
          label={organism.structureId}
        />
      </ClientOnly>

      <div className="flex min-w-0 flex-col gap-4">
        <div>
          <p className="text-xs tracking-wide text-muted-foreground uppercase">
            {organism.predicted ? "Predicted model" : "Experimental structure"}
          </p>
          <h3 className="mt-1 text-xl leading-snug text-foreground">
            {isLoading ? "Loading structure metadata…" : (data?.title ?? organism.structureId)}
          </h3>
        </div>

        <dl className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
          <div>
            <dt className="text-xs text-muted-foreground">Identifier</dt>
            <dd className="font-mono text-foreground">{organism.structureId}</dd>
          </div>
          <div>
            <dt className="text-xs text-muted-foreground">Genus & Species</dt>
            <dd className="font-medium text-foreground">
              {organism.genus} ({organism.species})
            </dd>
          </div>
          <div>
            <dt className="text-xs text-muted-foreground">Method</dt>
            <dd className="text-foreground">{data?.method ?? "—"}</dd>
          </div>
          <div>
            <dt className="text-xs text-muted-foreground">Resolution</dt>
            <dd className="tabular-nums text-foreground">
              {data?.resolution ? `${data.resolution.toFixed(2)} Å` : "—"}
            </dd>
          </div>
          <div>
            <dt className="text-xs text-muted-foreground">Released</dt>
            <dd className="tabular-nums text-foreground">{data?.released ?? "—"}</dd>
          </div>
          <div>
            <dt className="text-xs text-muted-foreground">Ligands docked</dt>
            <dd className="tabular-nums text-foreground">{recordsFor(organism).length}</dd>
          </div>
        </dl>

        {data?.polymerNames.length ? (
          <p className="text-xs leading-relaxed text-muted-foreground">
            Chain 1: {data.polymerNames.join(", ")}
          </p>
        ) : null}

        {organism.predicted && (
          <p className="rounded-lg border border-accent/40 bg-accent/10 p-3 text-xs leading-relaxed text-foreground">
            The dataset lists <span className="font-mono">{organism.structureId}</span>, a UniProt
            accession rather than a PDB entry, so the viewer shows the AlphaFold predicted model.
            Confidence varies along the chain.
          </p>
        )}

        {data && (
          <a
            href={data.sourceUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-sm text-accent hover:underline"
          >
            {organism.predicted ? "View on UniProt" : "View on RCSB PDB"}
            <ExternalLink className="h-3.5 w-3.5" aria-hidden />
          </a>
        )}
      </div>
    </div>
  );
}

function Index() {
  const [selected, setSelected] = useState<Organism | null>(null);
  const ligands = useMemo(() => {
    if (!selected) return [];
    const list = recordsFor(selected);
    return [...list].sort((a, b) => a.affinity - b.affinity);
  }, [selected]);
  const minAffinity = useMemo(
    () => (ligands.length > 0 ? ligands[0]!.affinity : null),
    [ligands]
  );

  return (
    <main className="min-h-screen">
      <AnimatedRays className="border-b border-border py-2 sm:py-4">
        <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
          <header className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 sm:flex sm:justify-between">
            <div className="flex min-w-0 items-center gap-2.5">
              <Dna className="h-5 w-5 shrink-0 text-accent" aria-hidden />
              <span className="truncate text-sm tracking-wide text-muted-foreground uppercase">
                Doctoral research · Molecular docking
              </span>
            </div>
            <ClientOnly fallback={<span />}>
              <AnimatedThemeToggler />
            </ClientOnly>
          </header>

          <h1 className="mt-8 max-w-4xl text-3xl leading-tight sm:text-4xl lg:text-5xl">
            {TITLE}
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            {records.length} docking results across {genera.length} genera and{" "}
            {organisms.length} species. Each outer-membrane target is paired with clinically used
            antibiotics and cationic dyes that probe AcrB-mediated efflux, rendered from live PDB,
            PubChem and AlphaFold data.
          </p>

          <div className="mt-8 max-w-2xl mx-auto text-center">
            <GenusSearch selected={selected} onSelect={setSelected} />
            <p className="mt-2 px-2 text-xs text-muted-foreground">
              Click the bar to browse every genus in the dataset.
            </p>
          </div>
        </div>
      </AnimatedRays>

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        {selected ? (
          <div className="flex flex-col gap-14">
            <section aria-labelledby="overview-heading">
              <GenusOverviewCard organism={selected} />
            </section>

            <section aria-labelledby="structure-heading">
              <h2 id="structure-heading" className="text-2xl">
                {selected.genus} <span className="text-accent">({selected.species})</span> — target structure
              </h2>
              <p className="mt-1 mb-6 text-sm text-muted-foreground">
                Drag to rotate, scroll to zoom, right-drag to pan.
              </p>
              <StructurePanel organism={selected} />
            </section>

            <section aria-labelledby="ligands-heading">
              <h2 id="ligands-heading" className="text-2xl">
                Ligands and binding affinities
              </h2>
              <p className="mt-1 mb-6 text-sm text-muted-foreground">
                {ligands.length} compounds docked against {selected.structureId} ({selected.genus} {selected.species}), sorted by binding affinity (strongest bound pose first).
              </p>
              <div className="flex flex-col gap-5">
                {ligands.map((r) => {
                  const isStrongest = r.affinity === minAffinity;
                  return (
                    <LigandCard
                      key={r.ligand}
                      record={r}
                      isStrongest={isStrongest}
                      poseUrl={isStrongest ? getInteractionPoseUrl(r.genus, r.ligand) : undefined}
                    />
                  );
                })}
              </div>
            </section>
          </div>
        ) : null}

        <section className={selected ? "mt-16" : ""} aria-labelledby="methods-heading">
          <h2 id="methods-heading" className="text-2xl">
            Methods and sources
          </h2>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <div className="glass-panel rounded-xl p-5">
              <h3 className="text-lg">Approach</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Outer-membrane proteins and porins of each genus were docked against clinically
                relevant antibiotics and four cationic dyes used as efflux-pump substrates. Binding
                affinity is reported as ΔG in kcal/mol; more negative values indicate a stronger
                predicted interaction. Per-complex interaction diagrams are being finalised and will
                be published alongside each pose.
              </p>
            </div>
            <div className="glass-panel rounded-xl p-5">
              <h3 className="text-lg">Data sources</h3>
              <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
                {[
                  ["RCSB Protein Data Bank", "https://www.rcsb.org"],
                  ["PubChem, NCBI", "https://pubchem.ncbi.nlm.nih.gov"],
                  ["AlphaFold Protein Structure Database", "https://alphafold.ebi.ac.uk"],
                  ["UniProt", "https://www.uniprot.org"],
                  ["Mol* structure viewer", "https://molstar.org"],
                  ["RDKit cheminformatics toolkit", "https://www.rdkit.org"],
                  ["CARD antibiotic resistance database", "https://card.mcmaster.ca"],
                  ["WHO bacterial priority pathogens list", "https://www.who.int/publications/i/item/9789240093461"],
                ].map(([label, href]) => (
                  <li key={href}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 hover:text-accent"
                    >
                      {label}
                      <ExternalLink className="h-3 w-3" aria-hidden />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </div>

      <footer className="border-t border-border">
        <div className="mx-auto max-w-6xl px-4 py-8 text-xs text-muted-foreground sm:px-6">
          Computational predictions for research use only; not clinical guidance. Structures and
          chemical data retrieved live from RCSB PDB, PubChem and AlphaFold DB.
        </div>
      </footer>
    </main>
  );
}
