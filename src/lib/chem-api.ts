const PUBCHEM = "https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound";

export type PubChemCompound = {
  cid: number;
  formula: string;
  weight: string;
  smiles: string;
  iupacName: string | null;
  imageUrl: string;
  pageUrl: string;
};

export async function fetchPubChem(name: string): Promise<PubChemCompound | null> {
  const url = `${PUBCHEM}/name/${encodeURIComponent(name)}/property/MolecularFormula,MolecularWeight,SMILES,IUPACName/JSON`;
  const res = await fetch(url);
  if (!res.ok) return null;
  const json = (await res.json()) as {
    PropertyTable?: {
      Properties?: {
        CID: number;
        MolecularFormula?: string;
        MolecularWeight?: string;
        SMILES?: string;
        IUPACName?: string;
      }[];
    };
  };
  const p = json.PropertyTable?.Properties?.[0];
  if (!p) return null;
  return {
    cid: p.CID,
    formula: p.MolecularFormula ?? "—",
    weight: p.MolecularWeight ?? "—",
    smiles: p.SMILES ?? "",
    iupacName: p.IUPACName ?? null,
    imageUrl: `${PUBCHEM}/cid/${p.CID}/PNG?record_type=2d&image_size=400x400`,
    pageUrl: `https://pubchem.ncbi.nlm.nih.gov/compound/${p.CID}`,
  };
}

export type StructureMeta = {
  id: string;
  title: string;
  method: string | null;
  resolution: number | null;
  released: string | null;
  organism: string | null;
  polymerNames: string[];
  predicted: boolean;
  sourceUrl: string;
};

export async function fetchStructureMeta(
  id: string,
  predicted: boolean,
): Promise<StructureMeta | null> {
  if (predicted) {
    const res = await fetch(`https://rest.uniprot.org/uniprotkb/${id}.json`);
    if (!res.ok) return null;
    const json = (await res.json()) as {
      proteinDescription?: { recommendedName?: { fullName?: { value?: string } } };
      organism?: { scientificName?: string };
      genes?: { geneName?: { value?: string } }[];
    };
    return {
      id,
      title:
        json.proteinDescription?.recommendedName?.fullName?.value ??
        `UniProt entry ${id}`,
      method: "Predicted model (AlphaFold DB)",
      resolution: null,
      released: null,
      organism: json.organism?.scientificName ?? null,
      polymerNames: (json.genes ?? [])
        .map((g) => g.geneName?.value)
        .filter((v): v is string => Boolean(v)),
      predicted: true,
      sourceUrl: `https://www.uniprot.org/uniprotkb/${id}/entry`,
    };
  }

  const res = await fetch(`https://data.rcsb.org/rest/v1/core/entry/${id}`);
  if (!res.ok) return null;
  const json = (await res.json()) as {
    struct?: { title?: string };
    exptl?: { method?: string }[];
    rcsb_entry_info?: { resolution_combined?: number[] };
    rcsb_accession_info?: { initial_release_date?: string };
    polymer_entities?: unknown;
  };

  let organism: string | null = null;
  let polymerNames: string[] = [];
  try {
    const pe = await fetch(
      `https://data.rcsb.org/rest/v1/core/polymer_entity/${id}/1`,
    );
    if (pe.ok) {
      const p = (await pe.json()) as {
        rcsb_polymer_entity?: { pdbx_description?: string };
        rcsb_entity_source_organism?: { ncbi_scientific_name?: string }[];
      };
      organism = p.rcsb_entity_source_organism?.[0]?.ncbi_scientific_name ?? null;
      if (p.rcsb_polymer_entity?.pdbx_description) {
        polymerNames = [p.rcsb_polymer_entity.pdbx_description];
      }
    }
  } catch {
    /* metadata is optional */
  }

  return {
    id,
    title: json.struct?.title ?? `PDB entry ${id}`,
    method: json.exptl?.[0]?.method ?? null,
    resolution: json.rcsb_entry_info?.resolution_combined?.[0] ?? null,
    released: json.rcsb_accession_info?.initial_release_date?.slice(0, 10) ?? null,
    organism,
    polymerNames,
    predicted: false,
    sourceUrl: `https://www.rcsb.org/structure/${id}`,
  };
}
