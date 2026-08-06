import * as React from "react";
import { cn } from "@/lib/utils";

type TColorProp = string | string[];

interface ShineBorderProps extends React.HTMLAttributes<HTMLDivElement> {
  borderRadius?: number;
  borderWidth?: number;
  duration?: number;
  color?: TColorProp;
  shineColor?: TColorProp;
  className?: string;
  children?: React.ReactNode;
}

/**
 * @name Shine Border
 * @description An animated background border effect component with customizable colors and duration.
 */
export function ShineBorder({
  borderRadius = 9999,
  borderWidth = 1.5,
  duration = 14,
  color = ["#A07CFE", "#FE8FB5", "#FFBE7B"],
  shineColor,
  className,
  children,
  ...props
}: ShineBorderProps) {
  const activeColor = shineColor ?? color;
  const colors = Array.isArray(activeColor) ? activeColor.join(",") : activeColor;

  return (
    <div
      style={
        {
          "--border-radius": `${borderRadius}px`,
        } as React.CSSProperties
      }
      className={cn(
        "relative grid w-full place-items-center rounded-[var(--border-radius)]",
        className
      )}
      {...props}
    >
      <div
        style={
          {
            "--border-width": `${borderWidth}px`,
            "--border-radius": `${borderRadius}px`,
            "--duration": `${duration}s`,
            "--mask-linear-gradient": `linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)`,
            "--background-radial-gradient": `radial-gradient(transparent,transparent, ${colors},transparent,transparent)`,
          } as React.CSSProperties
        }
        className={cn(
          "pointer-events-none absolute inset-0 size-full rounded-[var(--border-radius)] p-[var(--border-width)] before:absolute before:inset-0 before:size-full before:rounded-[var(--border-radius)] before:p-[var(--border-width)] before:will-change-[background-position] before:content-[''] before:![-webkit-mask-composite:xor] before:![mask-composite:exclude] before:[background-image:var(--background-radial-gradient)] before:[background-size:300%_300%] before:[mask:var(--mask-linear-gradient)] motion-safe:before:animate-shine"
        )}
      />
      {children}
    </div>
  );
}
