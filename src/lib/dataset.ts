import raw from "@/data/docking.json";

export type DockingRecord = {
  genus: string;
  species: string;
  structureId: string;
  ligand: string;
  affinity: number;
};

export type EffluxSubstrate = {
  compound: string;
  target: string;
  notes: string;
};

export const records = raw.records as DockingRecord[];
export const effluxSubstrates = raw.effluxSubstrates as EffluxSubstrate[];

export type Organism = {
  key: string;
  genus: string;
  species: string;
  structureId: string;
  /** Structures given as a UniProt accession are predicted models, not experimental PDB entries. */
  predicted: boolean;
};

const PDB_ID = /^[0-9][A-Za-z0-9]{3}$/;

export const organisms: Organism[] = (() => {
  const seen = new Map<string, Organism>();
  for (const r of records) {
    const key = `${r.genus}|${r.species}`;
    if (!seen.has(key)) {
      seen.set(key, {
        key,
        genus: r.genus,
        species: r.species,
        structureId: r.structureId,
        predicted: !PDB_ID.test(r.structureId),
      });
    }
  }
  return [...seen.values()].sort((a, b) => a.genus.localeCompare(b.genus));
})();

export const genera: { genus: string; organisms: Organism[] }[] = (() => {
  const map = new Map<string, Organism[]>();
  for (const o of organisms) {
    const list = map.get(o.genus) ?? [];
    list.push(o);
    map.set(o.genus, list);
  }
  return [...map.entries()]
    .map(([genus, list]) => ({ genus, organisms: list }))
    .sort((a, b) => a.genus.localeCompare(b.genus));
})();

export function recordsFor(organism: Organism) {
  return records.filter((r) => r.genus === organism.genus && r.species === organism.species);
}

export const affinityRange = {
  min: Math.min(...records.map((r) => r.affinity)),
  max: Math.max(...records.map((r) => r.affinity)),
};

export const ligandNames = [...new Set(records.map((r) => r.ligand))].sort();

/** Cleaned-up query names for PubChem plus fallback SMILES for RDKit rendering. */
export type LigandMeta = {
  label: string;
  /** Name used for the PubChem lookup. */
  query: string | null;
  /** Combination therapies resolve to more than one compound. */
  components?: string[];
  smiles?: string;
  kind: "antibiotic" | "dye" | "class";
};

const META: Record<string, Partial<LigandMeta>> = {
  "hexamethyl pararosaniline chloride(crystal violet)": {
    label: "Crystal violet",
    query: "Crystal violet",
    kind: "dye",
    smiles:
      "CN(C)c1ccc(cc1)C(=C2C=CC(=[N+](C)C)C=C2)c3ccc(cc3)N(C)C.[Cl-]",
  },
  "Rhodamine B": {
    kind: "dye",
    smiles: "CCN(CC)c1ccc2c(c1)oc3cc(=[N+](CC)CC)ccc3c2-c4ccccc4C(=O)[O-]",
  },
  "Rhodamine 6g": {
    label: "Rhodamine 6G",
    query: "Rhodamine 6G",
    kind: "dye",
    smiles:
      "CCNc1cc2oc3cc(NCC)c(C)cc3c(-c4ccccc4C(=O)OCC)c2cc1C.[Cl-]",
  },
  Safranine: {
    label: "Safranin O",
    query: "Safranin O",
    kind: "dye",
    smiles: "Cc1cc2nc3cc(C)c(N)cc3[n+](-c4ccccc4)c2cc1N.[Cl-]",
  },
  "Beta-lactams": { query: null, kind: "class" },
  "Piperacillin-tazobactam": { components: ["Piperacillin", "Tazobactam"] },
  "Trimethoprim-sulfamethoxazole": { components: ["Trimethoprim", "Sulfamethoxazole"] },
  "Griseoluteic acid": { query: "Griseoluteic acid" },
};

export function ligandMeta(name: string): LigandMeta {
  const m = META[name] ?? {};
  return {
    label: m.label ?? name,
    query: m.query !== undefined ? m.query : (m.components?.[0] ?? name),
    ...(m.components ? { components: m.components } : {}),
    ...(m.smiles ? { smiles: m.smiles } : {}),
    kind: m.kind ?? "antibiotic",
  };
}

export function effluxNote(name: string) {
  const label = ligandMeta(name).label.toLowerCase();
  return effluxSubstrates.find((s) => {
    const c = s.compound.toLowerCase();
    return c.includes(label) || label.includes(c.split(" (")[0]!);
  });
}
