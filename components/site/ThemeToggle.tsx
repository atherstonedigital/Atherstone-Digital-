'use client';

import { cn } from '@/lib/utils';
import { THEME_ATTRIBUTE, THEME_STORAGE_KEY, type Theme } from '@/lib/theme';

/**
 * A text button labelled with the theme it switches to: "Dark theme" while light shows, "Light theme" while dark
 * shows. The page follows the system setting until the visitor presses it; the choice is then stored under ad-theme
 * and applied before paint on the next load by the head script in app/layout.tsx.
 *
 * The label is chosen in CSS through the dark: variant, which reads the same rule as the tokens (data-theme first,
 * then the system setting), so the server render is already right and a system change needs no listener. The hidden
 * label is display: none, so the accessible name is always the visible one.
 */
export function ThemeToggle({ className }: { className?: string }) {
  function toggle() {
    const root = document.documentElement;
    const chosen = root.getAttribute(THEME_ATTRIBUTE);
    const showingDark = chosen ? chosen === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
    const next: Theme = showingDark ? 'light' : 'dark';
    root.setAttribute(THEME_ATTRIBUTE, next);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Storage can be blocked (private windows, cleared site data): the theme still applies for this visit.
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className={cn(
        'button inline-flex min-h-touch-target cursor-pointer items-center whitespace-nowrap bg-transparent p-0 font-medium text-ink',
        'underline decoration-transparent decoration-1 underline-offset-[6px] hover:decoration-current',
        // The press, as the Button's link form (Phase 3 review): 0.98 over 80ms on pointer-down, at once under reduced
        // motion, so a tap answers on touch, where there is no hover.
        '[transition:text-decoration-color_var(--duration-colour)_ease-out,transform_var(--duration-press)_ease-out]',
        'active:scale-[0.98] motion-reduce:transition-none [-webkit-tap-highlight-color:transparent]',
        className,
      )}
    >
      <span className="dark:hidden">Dark theme</span>
      <span className="hidden dark:inline">Light theme</span>
    </button>
  );
}
