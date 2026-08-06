import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { TwistingRibbon } from "@/components/TwistingRibbon";

interface AnimatedRaysProps {
  /** Additional CSS classes */
  className?: string;
  /** Optional children to render over the background */
  children?: React.ReactNode;
}

export function AnimatedRays({
  className = "",
  children,
}: AnimatedRaysProps) {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkDark = () => document.documentElement.classList.contains("dark");
    setIsDark(checkDark());

    const observer = new MutationObserver(() => setIsDark(checkDark()));
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  const stripes = `repeating-linear-gradient(
    100deg,
    var(--stripe-color, rgba(255, 255, 255, 0.15)) 0%,
    var(--stripe-color, rgba(255, 255, 255, 0.15)) 7%,
    transparent 10%,
    transparent 12%,
    var(--stripe-color, rgba(255, 255, 255, 0.15)) 16%
  )`;

  const rainbow = `repeating-linear-gradient(
    100deg,
    #60a5fa 10%,
    #e879f9 15%,
    #60a5fa 20%,
    #5eead4 25%,
    #60a5fa 30%
  )`;

  if (!mounted) {
    return (
      <section className={cn("relative w-full overflow-hidden bg-background", className)}>
        <div className="relative z-10 w-full">{children}</div>
      </section>
    );
  }

  return (
    <section className={cn("relative w-full overflow-hidden bg-background", className)}>
      {isDark ? (
        /* Dark Mode: Original Animated Rays with exact colors & difference blend mode */
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `${stripes}, ${rainbow}`,
            backgroundSize: "300% 300%, 200% 200%",
            filter: "blur(10px) opacity(50%) saturate(200%)",
            maskImage: "radial-gradient(ellipse at 100% 0%, black 40%, transparent 70%)",
            WebkitMaskImage: "radial-gradient(ellipse at 100% 0%, black 40%, transparent 70%)",
          }}
        >
          <div
            className="absolute inset-0 animate-aurora-bg pointer-events-none"
            style={{
              backgroundImage: `${stripes}, ${rainbow}`,
              backgroundSize: "200% 200%, 100% 100%",
              mixBlendMode: "difference",
            }}
          />
        </div>
      ) : (
        /* Light Mode: TwistingRibbon component without grid lines */
        <div className="absolute inset-0 pointer-events-none opacity-60">
          <TwistingRibbon className="w-full h-full rounded-none" />
        </div>
      )}

      {children && (
        <div className="relative z-10 w-full">
          {children}
        </div>
      )}
    </section>
  );
}

export default AnimatedRays;
