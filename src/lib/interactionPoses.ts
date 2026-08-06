/**
 * Registry of PDB interaction pose files for strongly bound ligand-protein complexes.
 * Files located in public/interactions/ are served at /interactions/<filename>.pdb
 * Key format: "Genus|Ligand"
 */

export const INTERACTION_POSES: Record<string, string> = {
  // Citrobacter strongly bound pose (Rhodamine B, ΔG = -9.2 kcal/mol)
  "Citrobacter|Rhodamine B": "/interactions/Rhodamine_B_complex_pose_1.pdb",

  // Cronobacter strongly bound pose (Cefotaxime, ΔG = -7.2 kcal/mol)
  "Cronobacter|Cefotaxime": "/interactions/Cefotaxime_complex_pose_1.pdb",

  // Edwardsiella (E. tarda) strongly bound pose (Rhodamine B, ΔG = -7.1 kcal/mol)
  "Edwardsiella|Rhodamine B": "/interactions/E. tarda.pdb",

  // Enterobacter strongly bound pose (Safranine, ΔG = -9.2 kcal/mol)
  "Enterobacter|Safranine": "/interactions/Safranine_complex_pose_1.pdb",

  // Escherichia strongly bound pose (Ceftriaxone, ΔG = -8.0 kcal/mol)
  "Escherichia|Ceftriaxone": "/interactions/Cefotaxime_complex_pose_1.pdb",
  "Escherichia|Cefotaxime": "/interactions/Cefotaxime_complex_pose_1.pdb",

  // Hafnia strongly bound pose (Gentamicin, ΔG = -7.8 kcal/mol)
  "Hafnia|Gentamicin": "/interactions/Gentamicin_complex_pose_1.pdb",

  // Morganella strongly bound pose (Aztreonam, ΔG = -7.3 kcal/mol)
  "Morganella|Aztreonam": "/interactions/Aztreonam_complex_pose_1.pdb",

  // Pantoea strongly bound pose (Rhodamine B, ΔG = -7.7 kcal/mol)
  "Pantoea|Rhodamine B": "/interactions/Rhodamine_B_Pantoea.pdb",

  // Salmonella (S. Typhi) strongly bound pose (Azithromycin, ΔG = -13.0 kcal/mol)
  "Salmonella|Azithromycin": "/interactions/S. Typhi.pdb",

  // Shigella (S. dysenteriae) strongly bound pose (Ceftriaxone, ΔG = -9.5 kcal/mol)
  "Shigella|Ceftriaxone": "/interactions/S. dysenteriae.pdb",

  // Yersinia strongly bound pose (Safranine, ΔG = -7.8 kcal/mol)
  "Yersinia|Safranine": "/interactions/Safranine_Yersinia.pdb",

  // Klebsiella (K. pneumoniae) strongly bound pose (Ceftazidime, ΔG = -8.1 kcal/mol)
  "Klebsiella|Ceftazidime": "/interactions/K. pneumoniae.pdb",

  // Klebsiella (K. oxytoca) strongly bound pose (Tazobactam, ΔG = -8.0 kcal/mol)
  "Klebsiella|Tazobactam": "/interactions/K.Oxytoca.pdb",

  // Proteus (P. mirabilis) strongly bound pose (Ceftriaxone, ΔG = -9.7 kcal/mol)
  "Proteus|Ceftriaxone": "/interactions/P.mirabillis.pdb",

  // Providencia (P. stuartii) strongly bound pose (Safranine, ΔG = -9.1 kcal/mol)
  "Providencia|Safranine": "/interactions/P. stuartii.pdb",
};

/**
 * Retrieve the PDB interaction pose URL for a given genus and ligand.
 */
export function getInteractionPoseUrl(genus: string, ligand: string): string | undefined {
  return INTERACTION_POSES[`${genus}|${ligand}`];
}
