"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

type Theme = "light" | "dark";

const ThemeContext = createContext<{
  theme: Theme;
  mounted: boolean;
  toggle: () => void;
} | null>(null);

/** Inline script string — runs before paint to set the theme with no flash. */
const themeScript = `(function(){try{var t=localStorage.getItem('theme');var d=t?t==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;document.documentElement.classList.toggle('dark',d);}catch(e){}})();`;

/**
 * Renders the no-flash script so it executes during SSR HTML parsing (hard
 * loads) but is inert on the client — `text/plain` on hydration avoids React's
 * dev warning about inline scripts. Pattern from the Next.js flash-prevention
 * guide. Place it early in <body>.
 */
export function ThemeScript() {
  return (
    <script
      type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: themeScript }}
    />
  );
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Start "light" on both server and first client render (no hydration
  // mismatch); the effect reconciles with what the inline script already set.
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Reconcile React state with what the inline no-flash script already set.
    // Deliberately does NOT write localStorage, so an unset preference keeps
    // following the system setting on future visits.
    setTheme(
      document.documentElement.classList.contains("dark") ? "dark" : "light"
    );
    setMounted(true);
  }, []);

  // Side effects live in the handler (not inside a setState updater), so
  // StrictMode's double-invoked updaters can't double-toggle the class.
  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    document.documentElement.classList.toggle("dark", next === "dark");
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* ignore */
    }
    setTheme(next);
  };

  return (
    <ThemeContext.Provider value={{ theme, mounted, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    return { theme: "light" as Theme, mounted: false, toggle: () => {} };
  }
  return ctx;
}

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, mounted, toggle } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={`flex h-11 w-11 cursor-pointer items-center justify-center rounded-full text-muted transition-colors hover:bg-surface-2 hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand ${className ?? ""}`}
    >
      {/* Render deterministically until mounted to avoid an icon flash */}
      <Sun
        className={`h-5 w-5 ${mounted && isDark ? "block" : "hidden"}`}
        aria-hidden="true"
      />
      <Moon
        className={`h-5 w-5 ${mounted && isDark ? "hidden" : "block"}`}
        aria-hidden="true"
      />
    </button>
  );
}
