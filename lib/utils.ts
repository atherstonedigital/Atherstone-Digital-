import { clsx, type ClassValue } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';
import {
  borderRadius,
  spacing,
  transitionDuration,
  transitionTimingFunction,
  typeStyleNames,
  zIndex,
} from '@/lib/design/tokens';

// tailwind-merge 2.x (the line for Tailwind v3) only knows Tailwind's default scales, so it is taught the token names
// from lib/design/tokens.ts. Without this, cn('p-space-4', 'p-space-6') would keep both classes.
const sizes = Object.keys(spacing);

const twMerge = extendTailwindMerge<'type-style'>({
  extend: {
    theme: {
      spacing: sizes,
      borderRadius: Object.keys(borderRadius),
    },
    classGroups: {
      'max-w': [{ 'max-w': sizes }],
      'min-w': [{ 'min-w': sizes }],
      'min-h': [{ 'min-h': sizes }],
      'max-h': [{ 'max-h': sizes }],
      z: [{ z: Object.keys(zIndex) }],
      duration: [{ duration: Object.keys(transitionDuration) }],
      ease: [{ ease: Object.keys(transitionTimingFunction) }],
      // The type style classes from app/styles/tokens.css (display-1, body, small and the rest): one per element.
      'type-style': [...typeStyleNames],
    },
    // A type style sets family, size, leading, weight and tracking together, so one placed after those utilities
    // replaces them. Utilities placed after a type style still refine it (cn('button', 'font-medium')).
    conflictingClassGroups: {
      'type-style': ['font-family', 'font-size', 'leading', 'font-weight', 'tracking'],
    },
  },
});

/** Joins class names and resolves Tailwind conflicts, the later class winning. The standard shadcn/ui helper. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
