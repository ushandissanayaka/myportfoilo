import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/theme-provider";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  // Determine the effective theme (resolve "system" to actual theme)
  const getEffectiveTheme = () => {
    if (theme === "system") {
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
    return theme;
  };

  const effectiveTheme = getEffectiveTheme();
  const isDark = effectiveTheme === "dark";

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <button
      onClick={toggleTheme}
      className="relative w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 ease-in-out hover:scale-110 focus:outline-none"
      style={{
        background: isDark
          ? 'linear-gradient(135deg, #1e293b, #334155)'
          : 'linear-gradient(135deg, #fbbf24, #f59e0b)',
        boxShadow: isDark
          ? '0 0 15px rgba(148, 163, 184, 0.3), inset 0 0 8px rgba(0,0,0,0.3)'
          : '0 0 15px rgba(251, 191, 36, 0.4), inset 0 0 8px rgba(255,255,255,0.3)',
      }}
      aria-label="Toggle theme"
    >
      {/* Sun Icon - shown in light mode */}
      <Sun
        className="absolute transition-all duration-500 ease-in-out"
        style={{
          width: '1.5rem',
          height: '1.5rem',
          color: '#fff',
          opacity: isDark ? 0 : 1,
          transform: isDark ? 'rotate(90deg) scale(0)' : 'rotate(0deg) scale(1)',
        }}
      />
      {/* Moon Icon - shown in dark mode */}
      <Moon
        className="absolute transition-all duration-500 ease-in-out"
        style={{
          width: '1.5rem',
          height: '1.5rem',
          color: '#e2e8f0',
          opacity: isDark ? 1 : 0,
          transform: isDark ? 'rotate(0deg) scale(1)' : 'rotate(-90deg) scale(0)',
        }}
      />
    </button>
  );
}