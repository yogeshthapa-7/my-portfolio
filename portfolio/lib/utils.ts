
import { twMerge } from "tailwind-merge";

type ClassValue = string | number | null | undefined | boolean | Record<string, boolean> | ClassValue[];

function clsx(...inputs: ClassValue[]): string {
  const classes: string[] = [];

  const walk = (val: ClassValue): void => {
    if (!val) return;
    if (typeof val === "string" || typeof val === "number") {
      classes.push(String(val));
      return;
    }
    if (Array.isArray(val)) {
      for (const v of val) walk(v);
      return;
    }
    if (typeof val === "object") {
      for (const [k, v] of Object.entries(val as Record<string, boolean>)) {
        if (v) classes.push(k);
      }
    }
  };

  for (const input of inputs) walk(input);

  // Note: We intentionally don't try to implement full tailwind-merge behavior.
  // For this project, this is sufficient to fix module resolution.
  return classes.join(" ").replace(/\s+/g, " ").trim();
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}


