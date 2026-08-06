import { useEffect, useRef, useState } from "react";
import { Maximize2, RotateCcw, Loader2 } from "lucide-react";
import { loadMolstar, type MolstarViewer } from "@/lib/chem-loaders";
import { cn } from "@/lib/utils";

type Props = {
  /** PDB ID, or UniProt accession when predicted is true. */
  structureId?: string;
  predicted?: boolean;
  /** Optional docked-pose file (mmCIF / PDB / SDF) to load instead. */
  fileUrl?: string;
  fileFormat?: string;
  className?: string;
  label?: string;
};

export function MolstarViewerPanel({
  structureId,
  predicted = false,
  fileUrl,
  fileFormat = "pdb",
  className,
  label,
}: Props) {
  const hostRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<MolstarViewer | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [spinning, setSpinning] = useState(false);

  useEffect(() => {
    let disposed = false;
    let viewer: MolstarViewer | null = null;
    setStatus("loading");

    (async () => {
      try {
        const molstar = await loadMolstar();
        if (disposed || !hostRef.current) return;
        hostRef.current.innerHTML = "";
        viewer = await molstar.Viewer.create(hostRef.current, {
          layoutIsExpanded: false,
          layoutShowControls: false,
          layoutShowRemoteState: false,
          layoutShowSequence: false,
          layoutShowLog: false,
          layoutShowLeftPanel: false,
          viewportShowExpand: false,
          viewportShowSelectionMode: false,
          viewportShowAnimation: false,
          pdbProvider: "rcsb",
          emdbProvider: "rcsb",
        });
        if (disposed) {
          viewer.dispose();
          return;
        }
        viewerRef.current = viewer;

        if (fileUrl) {
          await viewer.loadStructureFromUrl(fileUrl, fileFormat);
        } else if (predicted && structureId) {
          if (viewer.loadAlphaFoldDb) {
            await viewer.loadAlphaFoldDb(structureId);
          } else {
            await viewer.loadStructureFromUrl(
              `https://alphafold.ebi.ac.uk/files/AF-${structureId}-F1-model_v4.cif`,
              "mmcif",
            );
          }
        } else if (structureId) {
          await viewer.loadPdb(structureId.toLowerCase());
        }
        if (!disposed) setStatus("ready");
      } catch {
        if (!disposed) setStatus("error");
      }
    })();

    return () => {
      disposed = true;
      try {
        viewerRef.current?.dispose();
      } catch {
        /* ignore */
      }
      viewerRef.current = null;
    };
  }, [structureId, predicted, fileUrl, fileFormat]);

  const toggleSpin = () => {
    const canvas = viewerRef.current?.plugin.canvas3d;
    if (!canvas) return;
    const next = !spinning;
    canvas.setProps({
      trackball: {
        animate: next
          ? { name: "spin", params: { speed: 0.6 } }
          : { name: "off", params: {} },
      },
    });
    setSpinning(next);
  };

  return (
    <div
      ref={wrapRef}
      className={cn(
        "glass-panel relative overflow-hidden rounded-xl",
        "h-[340px] sm:h-[420px] lg:h-[480px]",
        className,
      )}
    >
      <div ref={hostRef} className="absolute inset-0 [&_canvas]:touch-none" />

      {status !== "ready" && (
        <div className="absolute inset-0 grid place-items-center bg-card/80 text-center text-sm text-muted-foreground">
          {status === "loading" ? (
            <span className="inline-flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
              Loading structure…
            </span>
          ) : (
            <span className="px-6">
              Structure could not be loaded. Check your connection or the identifier.
            </span>
          )}
        </div>
      )}

      <div className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between gap-2 p-2">
        {label ? (
          <span className="glass-chip pointer-events-auto max-w-[60%] truncate text-[11px] tracking-wide uppercase">
            {label}
          </span>
        ) : (
          <span />
        )}
        <div className="pointer-events-auto flex shrink-0 gap-1">
          <button
            type="button"
            onClick={() => viewerRef.current?.plugin.managers.camera.reset()}
            title="Reset camera"
            aria-label="Reset camera"
            className="glass-chip hover:text-accent"
          >
            <RotateCcw className="h-3.5 w-3.5" aria-hidden />
          </button>
          <button
            type="button"
            onClick={toggleSpin}
            title={spinning ? "Stop rotation" : "Auto-rotate"}
            aria-label={spinning ? "Stop rotation" : "Auto-rotate"}
            className={cn("glass-chip hover:text-accent", spinning && "text-accent")}
          >
            <span className="text-[11px] font-semibold">SPIN</span>
          </button>
          <button
            type="button"
            onClick={() => {
              const el = wrapRef.current;
              if (!el) return;
              if (document.fullscreenElement) void document.exitFullscreen();
              else void el.requestFullscreen?.();
            }}
            title="Fullscreen"
            aria-label="Fullscreen"
            className="glass-chip hover:text-accent"
          >
            <Maximize2 className="h-3.5 w-3.5" aria-hidden />
          </button>
        </div>
      </div>
    </div>
  );
}
