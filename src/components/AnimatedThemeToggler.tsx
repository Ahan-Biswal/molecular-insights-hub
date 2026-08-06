import { useEffect, useState, useRef } from "react";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

export function AnimatedThemeToggler({ className }: { className?: string }) {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

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

  const toggleTheme = (e: React.MouseEvent<HTMLButtonElement>) => {
    const nextDark = !isDark;

    if (typeof document === "undefined" || !("startViewTransition" in document)) {
      document.documentElement.classList.toggle("dark", nextDark);
      setIsDark(nextDark);
      return;
    }

    const x = e.clientX;
    const y = e.clientY;
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    const transition = (document as any).startViewTransition(() => {
      document.documentElement.classList.toggle("dark", nextDark);
      setIsDark(nextDark);
    });

    transition.ready.then(() => {
      const clipPath = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${endRadius}px at ${x}px ${y}px)`,
      ];
      document.documentElement.animate(
        {
          clipPath: isDark ? [...clipPath].reverse() : clipPath,
        },
        {
          duration: 450,
          easing: "cubic-bezier(0.4, 0, 0.2, 1)",
          pseudoElement: isDark
            ? "::view-transition-old(root)"
            : "::view-transition-new(root)",
        }
      );
    });
  };

  if (!mounted) {
    return (
      <div className={cn("glass-chip h-8 w-16 opacity-50", className)} />
    );
  }

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={toggleTheme}
      className={cn(
        "glass-chip group relative flex items-center gap-2 px-3 py-1.5 transition-all duration-300 hover:border-accent/60 hover:text-accent hover:shadow-md cursor-pointer",
        className
      )}
      aria-label="Toggle theme"
    >
      <div className="relative h-4 w-4 overflow-hidden">
        <Sun
          className={cn(
            "absolute inset-0 h-4 w-4 transform transition-all duration-500",
            isDark
              ? "rotate-90 scale-0 opacity-0"
              : "rotate-0 scale-100 opacity-100 text-amber-500"
          )}
          aria-hidden
        />
        <Moon
          className={cn(
            "absolute inset-0 h-4 w-4 transform transition-all duration-500",
            isDark
              ? "rotate-0 scale-100 opacity-100 text-sky-400"
              : "-rotate-90 scale-0 opacity-0"
          )}
          aria-hidden
        />
      </div>
      <span className="text-xs font-medium tracking-wide text-foreground group-hover:text-accent">
        {isDark ? "Dark" : "Light"}
      </span>
    </button>
  );
}
