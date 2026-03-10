import { unsafeCSS } from 'lit';

/**
 * Calculates legible text color (black or white) based on background hex.
 */
export function getLegibleTextColor(hexColor: string): string {
  if (!hexColor) return '#000000';
  const hex = hexColor.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  if (isNaN(r) || isNaN(g) || isNaN(b)) return '#000000';
  const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
  return (yiq >= 128) ? '#000000' : '#ffffff';
}

/**
 * Date formatting helpers
 */
export function getStartOfWeek(date: Date): Date {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day;
  return new Date(d.setDate(diff));
}

export function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

/**
 * NEW: Converts a Hex color (#RRGGBB) to RGBA with a specific alpha value (0-1).
 */
export function hexToRgba(hex: string, alpha: number): string {
  if (!hex) return 'rgba(0,0,0,0)';
  
  const h = hex.replace('#', '');
  
  // Handle standard hex strings (e.g., #RRGGBB)
  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);

  // Fallback to safe color if input is invalid
  if (isNaN(r) || isNaN(g) || isNaN(b)) return 'rgba(128,128,128,0.5)';

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}