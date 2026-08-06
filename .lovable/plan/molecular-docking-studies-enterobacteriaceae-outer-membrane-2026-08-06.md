# Molecular Docking Studies — Enterobacteriaceae Outer Membrane

A single-page research showcase site (mobile + desktop) built from your Excel database, with live 3D structures from PDB, 2D ligand structures from PubChem, and docking scores.

## What the data contains

- 112 docking records, 16 organisms across 15 genera (Klebsiella has 2 species)
- 7 ligands per organism: antibiotics + 4 efflux-pump dyes (Rhodamine B, Rhodamine 6G, Safranine, Crystal violet)
- Binding affinities from -3.3 to -13.0 kcal/mol
- A second sheet on efflux-pump substrates, used as reference notes for the 4 dyes

One data issue: **Yersinia pestis is listed as `P0A2D0`, which is a UniProt accession, not a PDB ID.** For that entry the viewer will load the AlphaFold predicted model and label it clearly as "predicted structure (AlphaFold)". If you have a real PDB ID for it, send it and I'll swap it in.

## User flow

1. Hero with the full title and a short scope line.
2. **Search bar** — clicking it opens a dialog listing all 15 unique genera (deduplicated), typeable/filterable. Selecting a genus with two species asks which species.
3. **Structure section** — protein ID from the sheet, fetched from the RCSB API. Interactive Mol* viewer (rotate/zoom, cartoon/surface/spacefill toggles, reset). Beside it: protein title, organism, method, resolution, release year, and a link to the RCSB entry.
4. **Ligand + docking section** — one card per ligand for the selected organism:
   - 2D structure from PubChem (PUG-REST image by name), with a client-side RDKit-WASM fallback that renders from SMILES when PubChem has no match (crystal violet's long chemical name is the likely case)
   - PubChem identity data: formula, molecular weight, canonical SMILES, CID link
   - Binding affinity as a number plus a comparative bar, so strong vs weak binders read at a glance
   - Dyes get an "efflux-pump substrate" badge with the note text from sheet 2
5. **Interaction viewer** — a second Mol* panel per ligand, sized and wired for your docked-pose files. Until you supply them it shows a clear "pose data coming soon" state; the PDFs/pose files drop in later without restructuring.
6. **Comparison view** — sortable table of all 112 records (genus, species, PDB, ligand, affinity) with filtering, plus a heatmap-style overview of genus vs ligand affinities. This is the part that makes the dataset actually readable for a thesis audience.
7. **Methods & sources** — docking method summary and cited links to RCSB PDB, PubChem, UniProt/AlphaFold, and CARD/WHO AMR references.

## Design direction

Not blue-and-white. Proposal: a deep ink-teal base with warm amber as the single accent for affinity emphasis, on off-white light mode with a true dark mode toggle. Restrained glassmorphism — frosted panels only on the viewer chrome and the search dialog, never on body text (it hurts readability and print). Typography: a scientific-serif display face for headings paired with a clean grotesque for data, tabular figures for all numbers. Dense, lab-notebook layout rather than marketing-landing spacing.

If you'd prefer to see rendered options before I build, say so and I'll generate three directions.

## Technical notes

- Excel is converted to a typed JSON dataset in the repo — no backend or database needed, and it stays fast and cheap. If you want to edit records from the site later, that's when we add Lovable Cloud.
- APIs called client-side with TanStack Query caching: RCSB (`data.rcsb.org` metadata + `files.rcsb.org` mmCIF), PubChem PUG-REST (CID, properties, 2D PNG), AlphaFold for the UniProt entry.
- Mol* via `molstar` npm package, loaded client-only (dynamic import behind a hydration gate) since it needs the browser.
- RDKit fallback via `@rdkit/rdkit` WASM, loaded lazily only when PubChem lookup fails, with a small curated SMILES map for the 29 ligands.
- Responsive: single-column stack on mobile with viewers at reduced height and touch gestures enabled; two-column protein/ligand split from `lg` up.
- SEO: unique title/description/OG tags, semantic headings, JSON-LD `Dataset` + `ScholarlyArticle` markup.

## Out of scope for this pass

Docking-pose files and interaction PDFs (you'll supply later), and any citation of specific numeric results beyond your own dataset.
