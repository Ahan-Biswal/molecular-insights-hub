export type GenusOverview = {
  genus: string;
  introduction: string;
  keyFeatures: {
    title: string;
    description: string;
  }[];
};

export const GENUS_OVERVIEWS: Record<string, GenusOverview> = {
  Citrobacter: {
    genus: "Citrobacter",
    introduction:
      "Citrobacter is a genus of Gram-negative coliform bacteria found in soil, water, and human intestinal tracts. They are opportunistic pathogens frequently associated with hospital-acquired urinary tract infections, neonatal meningitis, and bacteremia.",
    keyFeatures: [
      {
        title: "Microbiology",
        description: "Gram-negative facultatively anaerobic bacilli, citrate-utilizing coliforms.",
      },
      {
        title: "Outer Membrane Porins",
        description: "Expresses OmpC and OmpF orthologs governing hydrophilic drug permeation.",
      },
      {
        title: "Efflux Mechanisms",
        description: "High expression of RND-family AcrAB-TolC efflux pumps extruding dyes and antibiotics.",
      },
      {
        title: "Resistance Profile",
        description: "Chromosomal AmpC beta-lactamase production in C. freundii confers resistance to cephalosporins.",
      },
    ],
  },
  Cronobacter: {
    genus: "Cronobacter",
    introduction:
      "Cronobacter (formerly Enterobacter sakazakii) is a genus of opportunistic Gram-negative bacteria notorious for extreme desiccation tolerance. It poses severe threats to neonates, causing necrotizing enterocolitis, sepsis, and infant meningitis.",
    keyFeatures: [
      {
        title: "Environmental Adaptations",
        description: "Exceptional resistance to dry environments and infant formula processing conditions.",
      },
      {
        title: "Virulence Determinants",
        description: "OmpA surface protein facilitates blood-brain barrier passage during neonatal meningitis.",
      },
      {
        title: "Membrane Permeability",
        description: "Selective outer-membrane porin barrier controlling antimicrobial diffusion.",
      },
      {
        title: "Active Efflux",
        description: "RND efflux transporters pump out sanitizers, cationic dyes, and fluoroquinolones.",
      },
    ],
  },
  Edwardsiella: {
    genus: "Edwardsiella",
    introduction:
      "Edwardsiella is a genus of motile, hydrogen-sulfide-producing Gram-negative bacilli. Primarily aquatic pathogens in fish culture, they occasionally cause severe opportunistic gastroenteritis and bacteremia in humans.",
    keyFeatures: [
      {
        title: "Biochemical Signature",
        description: "Characterized by hydrogen sulfide (H2S) production and indole positivity.",
      },
      {
        title: "Pathogenicity Systems",
        description: "Employs Type III and Type VI secretion systems for macrophage intracellular survival.",
      },
      {
        title: "Outer Membrane Barrier",
        description: "Osmolarity-responsive porin expression adapted to freshwater and marine environments.",
      },
      {
        title: "Drug Susceptibility",
        description: "Intrinsic resistance to macrolides driven by membrane extrusion pumps.",
      },
    ],
  },
  Enterobacter: {
    genus: "Enterobacter",
    introduction:
      "Enterobacter (notably E. cloacae complex) is a major priority ESKAPE pathogen responsible for severe hospital-acquired infections including pneumonia, catheter-associated UTI, and sepsis.",
    keyFeatures: [
      {
        title: "ESKAPE Priority Status",
        description: "High-priority WHO antibiotic resistance pathogen in clinical settings.",
      },
      {
        title: "AmpC Beta-Lactamase",
        description: "Inducible chromosomal AmpC enzyme causing resistance to broad-spectrum cephalosporins.",
      },
      {
        title: "Efflux Overexpression",
        description: "Upregulated AcrAB-TolC efflux machinery extrudes carbapenems and fluoroquinolones.",
      },
      {
        title: "Porin Downregulation",
        description: "Mutational loss of OmpF/OmpC porin channels restricts beta-lactam influx.",
      },
    ],
  },
  Escherichia: {
    genus: "Escherichia",
    introduction:
      "Escherichia includes the model bacterium E. coli as well as major diarrheagenic and uropathogenic (UPEC) strains. Its outer-membrane porins and efflux systems serve as the structural standard for Gram-negative envelope physiology.",
    keyFeatures: [
      {
        title: "Prototypical Envelope",
        description: "Model outer membrane architecture containing classic OmpA, OmpC, OmpF, and PhoE porins.",
      },
      {
        title: "AcrAB-TolC Archetype",
        description: "Benchmark RND efflux pump mechanism extruding lipophilic dyes, bile salts, and drugs.",
      },
      {
        title: "Global Regulation",
        description: "MarA, SoxS, and Rob regulons coordinate multi-antibiotic resistance responses.",
      },
      {
        title: "Pathogenic Diversity",
        description: "Ranges from beneficial intestinal commensals to virulent uropathogens and EHEC strains.",
      },
    ],
  },
  Hafnia: {
    genus: "Hafnia",
    introduction:
      "Hafnia (H. alvei) is an opportunistic intestinal and environmental Gram-negative bacterium. It causes nosocomial bacteremia and respiratory tract infections in immunocompromised patients.",
    keyFeatures: [
      {
        title: "Metabolic Profile",
        description: "Psychrotolerant bacterium found in gut flora, soil, and dairy product ecosystems.",
      },
      {
        title: "Cephalosporinase",
        description: "Carries inducible ACC-family cephalosporinases conferring penicillin resistance.",
      },
      {
        title: "LPS Barrier",
        description: "Outer-membrane lipopolysaccharide sheath providing selective permeability to hydrophobic agents.",
      },
      {
        title: "Multidrug Transport",
        description: "Active efflux pumps extrude triphenylmethane dyes and fluoroquinolone molecules.",
      },
    ],
  },
  Klebsiella: {
    genus: "Klebsiella",
    introduction:
      "Klebsiella (notably K. pneumoniae) is a critical WHO priority ESKAPE pathogen. Hypervirulent and carbapenem-resistant (CRKP) strains present grave clinical challenges globally.",
    keyFeatures: [
      {
        title: "Hyper-capsulated Surface",
        description: "Prominent polysaccharide capsule hindering phagocytosis and complement access.",
      },
      {
        title: "Carbapenemase Production",
        description: "Frequent plasmid encoding of KPC, NDM, and OXA-48 carbapenem-hydrolyzing enzymes.",
      },
      {
        title: "Porin Deficiency",
        description: "Mutational loss or truncation of OmpK35 and OmpK36 channels reduces antibiotic entry.",
      },
      {
        title: "OqxAB & AcrAB Pumps",
        description: "Dual efflux systems active against fluoroquinolones, chloramphenicol, and cationic probes.",
      },
    ],
  },
  Morganella: {
    genus: "Morganella",
    introduction:
      "Morganella (M. morganii) is an opportunistic pathogen in post-operative wound, urinary tract, and hepatobiliary infections, possessing extensive intrinsic resistance mechanisms.",
    keyFeatures: [
      {
        title: "Intrinsic Resistome",
        description: "Innate resistance to colistin (polymyxins), macrolides, oxazolidinones, and tetracyclines.",
      },
      {
        title: "AmpC Precursors",
        description: "Chromosomal DHA-1 precursor beta-lactamase confers resistance to third-generation cephalosporins.",
      },
      {
        title: "Efflux Transporters",
        description: "Highly active multidrug efflux machinery pumping out cationic dyes and quinolones.",
      },
      {
        title: "Virulence Factors",
        description: "Strong urease production and swarming motility facilitating urinary tract colonization.",
      },
    ],
  },
  Pantoea: {
    genus: "Pantoea",
    introduction:
      "Pantoea (P. agglomerans) comprises plant-associated and opportunistic human pathogens. They are studied both for agricultural bio-control and medical device-associated hospital infections.",
    keyFeatures: [
      {
        title: "Carotenoid Pigmentation",
        description: "Produces distinctive yellow pigment protecting cells against oxidative host defenses.",
      },
      {
        title: "Outer Membrane Porins",
        description: "Possesses general diffusion porins homologous to E. coli OmpC and OmpF.",
      },
      {
        title: "Phyto-Efflux Systems",
        description: "Efflux transporters extrude plant defense phytoalexins as well as antimicrobial drugs.",
      },
      {
        title: "Biofilm Formation",
        description: "Forms sturdy biofilms on plant vascular tissue and medical plastic catheters.",
      },
    ],
  },
  Proteus: {
    genus: "Proteus",
    introduction:
      "Proteus (P. mirabilis, P. vulgaris) is famous for swarming motility and potent urease activity, causing severe kidney stone formation and urinary catheter blockages.",
    keyFeatures: [
      {
        title: "Swarming Differentiation",
        description: "Differentiates into hyper-flagellated swarm cells moving in concentric waves across surfaces.",
      },
      {
        title: "Urease-Induced Stones",
        description: "Rapidly hydrolyzes urea to ammonia, causing struvite stone precipitation in bladder and kidney.",
      },
      {
        title: "Colistin Resistance",
        description: "Constitutive LPS modification conferring total intrinsic resistance to polymyxin antibiotics.",
      },
      {
        title: "Efflux Clearance",
        description: "RND efflux transporters actively eliminate dyes, fluoroquinolones, and disinfectants.",
      },
    ],
  },
  Providencia: {
    genus: "Providencia",
    introduction:
      "Providencia (P. stuartii, P. rettgeri) is a major cause of chronic catheter-associated urinary tract infections and burn wound outbreaks with extensive drug resistance.",
    keyFeatures: [
      {
        title: "Catheter Biofilms",
        description: "High capacity for persistent colonization and crystalline biofilm accretion on catheters.",
      },
      {
        title: "Intrinsic Colistin Resistance",
        description: "Modified lipid A structure rendering polymyxins and colistin completely ineffective.",
      },
      {
        title: "Multidrug Efflux",
        description: "Expresses specialized AAE efflux systems mediating broad-spectrum antimicrobial extrusion.",
      },
      {
        title: "Enzymatic Resistance",
        description: "Harbors AmpC cephalosporinases and aminoglycoside-modifying enzymes.",
      },
    ],
  },
  Salmonella: {
    genus: "Salmonella",
    introduction:
      "Salmonella (S. enterica, including Typhi and Typhimurium) is a leading global foodborne pathogen causing severe gastroenteritis and systemic enteric (typhoid) fever.",
    keyFeatures: [
      {
        title: "Porin Architecture",
        description: "Expresses OmpD, OmpC, and OmpF porin channels for osmolarity-dependent solute diffusion.",
      },
      {
        title: "Intestinal Bile Resistance",
        description: "AcrAB-TolC efflux pump is essential for surviving toxic bile salts in host intestine.",
      },
      {
        title: "Capsular Shielding",
        description: "S. Typhi Vi antigen masks outer-membrane components against neutrophil detection.",
      },
      {
        title: "Genomic Resistance Islands",
        description: "Acquires Salmonella Genomic Island 1 (SGI1) conferring multidrug resistance phenotypes.",
      },
    ],
  },
  Serratia: {
    genus: "Serratia",
    introduction:
      "Serratia (S. marcescens) is an opportunistic Gram-negative pathogen known for producing red prodigiosin pigment and causing difficult-to-treat ICU outbreaks.",
    keyFeatures: [
      {
        title: "Prodigiosin Pigment",
        description: "Synthesizes tripyrrole red pigment with immunosuppressive and antimicrobial properties.",
      },
      {
        title: "SdeAB Efflux Machinery",
        description: "Dedicated SdeAB multidrug efflux pump extrudes fluoroquinolones, cationic dyes, and biocides.",
      },
      {
        title: "Chromosomal Beta-Lactamase",
        description: "Encodes inducible SBR/Sst beta-lactamases conferring penicillin resistance.",
      },
      {
        title: "Secreted Exoenzymes",
        description: "Produces potent extracellular DNases, lipases, and proteases promoting tissue destruction.",
      },
    ],
  },
  Shigella: {
    genus: "Shigella",
    introduction:
      "Shigella (S. dysenteriae, S. flexneri, S. sonnei) causes severe bacillary dysentery (shigellosis), requiring extremely low infectious doses to invade human intestinal mucosa.",
    keyFeatures: [
      {
        title: "E. Coli Lineage",
        description: "Genomically close to E. coli, sharing conserved OmpA, OmpC, and OmpF porin frameworks.",
      },
      {
        title: "T3SS Epithelial Invasion",
        description: "Uses Type III secretion system injectisome to invade gut epithelial cells.",
      },
      {
        title: "Efflux Acid Tolerance",
        description: "AcrAB-TolC pump enables passage through gastric acid and bile salts.",
      },
      {
        title: "Emerging MDR Threats",
        description: "Rapid spread of azithromycin- and fluoroquinolone-resistant epidemic strains.",
      },
    ],
  },
  Yersinia: {
    genus: "Yersinia",
    introduction:
      "Yersinia encompasses Y. pestis (plague agent) and enteropathogenic Y. enterocolitica. They feature sophisticated temperature-dependent outer-membrane regulation.",
    keyFeatures: [
      {
        title: "Thermal Regulation",
        description: "Drastic outer-membrane remodeling between 26°C (environmental/flea) and 37°C (mammalian host).",
      },
      {
        title: "Yop Virulence Secretion",
        description: "Injects Yop effector proteins via Type III secretion to dismantle host immune signaling.",
      },
      {
        title: "Outer Porin Remodeling",
        description: "Modulates OmpF and OmpC expression to alter drug uptake in different hosts.",
      },
      {
        title: "Efflux Substrate Extrusion",
        description: "Multidrug efflux machinery extrudes hydrophobic antibiotics and fluorescent dye probes.",
      },
    ],
  },
};
