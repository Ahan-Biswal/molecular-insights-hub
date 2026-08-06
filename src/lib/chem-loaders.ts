/* Browser-only loaders for the Mol* viewer bundle and the RDKit WASM module.
   Both ship as static assets in /public so they never enter the SSR bundle. */

type MolstarGlobal = {
  Viewer: {
    create(target: HTMLElement, options: Record<string, unknown>): Promise<MolstarViewer>;
  };
};

export type MolstarViewer = {
  loadPdb(id: string): Promise<void>;
  loadAlphaFoldDb?(id: string): Promise<void>;
  loadStructureFromUrl(url: string, format: string, isBinary?: boolean): Promise<void>;
  dispose(): void;
  plugin: {
    managers: { camera: { reset(): void } };
    canvas3d?: { setProps(props: Record<string, unknown>): void } | null;
  };
};

let molstarPromise: Promise<MolstarGlobal> | null = null;

export function loadMolstar(): Promise<MolstarGlobal> {
  if (molstarPromise) return molstarPromise;
  molstarPromise = new Promise((resolve, reject) => {
    if (!document.querySelector("link[data-molstar]")) {
      const css = document.createElement("link");
      css.rel = "stylesheet";
      css.href = "/molstar/molstar.css";
      css.dataset["molstar"] = "true";
      document.head.appendChild(css);
    }
    const script = document.createElement("script");
    script.src = "/molstar/molstar.js";
    script.async = true;
    script.onload = () => {
      const g = (window as unknown as { molstar?: MolstarGlobal }).molstar;
      if (g) resolve(g);
      else reject(new Error("Mol* failed to initialise"));
    };
    script.onerror = () => reject(new Error("Mol* failed to load"));
    document.head.appendChild(script);
  });
  return molstarPromise;
}

type RDKitModule = {
  get_mol(smiles: string): { get_svg(w?: number, h?: number): string; delete(): void } | null;
};

let rdkitPromise: Promise<RDKitModule> | null = null;

export function loadRDKit(): Promise<RDKitModule> {
  if (rdkitPromise) return rdkitPromise;
  rdkitPromise = new Promise((resolve, reject) => {
    const init = () => {
      const initFn = (
        window as unknown as {
          initRDKitModule?: (opts: Record<string, unknown>) => Promise<RDKitModule>;
        }
      ).initRDKitModule;
      if (!initFn) return reject(new Error("RDKit failed to initialise"));
      initFn({ locateFile: () => "/rdkit/RDKit_minimal.wasm" }).then(resolve, reject);
    };
    if ((window as unknown as { initRDKitModule?: unknown }).initRDKitModule) return init();
    const script = document.createElement("script");
    script.src = "/rdkit/RDKit_minimal.js";
    script.async = true;
    script.onload = init;
    script.onerror = () => reject(new Error("RDKit failed to load"));
    document.head.appendChild(script);
  });
  return rdkitPromise;
}

export async function renderSmilesSvg(smiles: string, size = 300): Promise<string | null> {
  try {
    const rdkit = await loadRDKit();
    const mol = rdkit.get_mol(smiles);
    if (!mol) return null;
    const svg = mol.get_svg(size, size);
    mol.delete();
    return svg;
  } catch {
    return null;
  }
}
