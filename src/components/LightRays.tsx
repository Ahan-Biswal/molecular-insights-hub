import { cn } from "@/lib/utils";

interface LightRaysProps {
  className?: string;
}

export function LightRays({ className }: LightRaysProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className
      )}
    >
      {/* Top ambient glow pool matching site accent & teal hues */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-72 w-[750px] rounded-full bg-gradient-to-b from-amber-300/40 via-teal-200/30 to-transparent blur-3xl opacity-80 animate-ray-glow" />

      {/* Light Rays SVG Container with animated sweeping light rays */}
      <div className="absolute inset-0 opacity-85">
        <svg
          className="h-full w-full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1000 400"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="light-ray-amber" x1="50%" y1="0%" x2="25%" y2="100%">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.28" />
              <stop offset="50%" stopColor="#0284c7" stopOpacity="0.1" />
              <stop offset="100%" stopColor="transparent" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="light-ray-teal" x1="50%" y1="0%" x2="75%" y2="100%">
              <stop offset="0%" stopColor="#0d9488" stopOpacity="0.25" />
              <stop offset="50%" stopColor="#d97706" stopOpacity="0.08" />
              <stop offset="100%" stopColor="transparent" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Ray Cone 1 */}
          <polygon
            points="500,0 160,400 320,400"
            fill="url(#light-ray-amber)"
            className="animate-ray-left"
          />

          {/* Ray Cone 2 */}
          <polygon
            points="500,0 680,400 840,400"
            fill="url(#light-ray-teal)"
            className="animate-ray-right"
          />

          {/* Ray Cone 3 Center */}
          <polygon
            points="500,0 420,400 580,400"
            fill="url(#light-ray-amber)"
            className="animate-ray-center"
          />

          {/* Ray Cone 4 Far Left */}
          <polygon
            points="500,0 -20,400 140,400"
            fill="url(#light-ray-teal)"
            className="animate-ray-right"
          />

          {/* Ray Cone 5 Far Right */}
          <polygon
            points="500,0 860,400 1020,400"
            fill="url(#light-ray-amber)"
            className="animate-ray-left"
          />
        </svg>
      </div>

      {/* Grid overlay for scientific aesthetic */}
      <div className="absolute inset-0 grid-paper opacity-60 pointer-events-none" />
    </div>
  );
}

export default LightRays;
