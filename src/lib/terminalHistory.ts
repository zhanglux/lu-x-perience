/**
 * Persists the terminal's command history across full-page navigation so that
 * opening a child page and returning via the breadcrumb restores the session
 * instead of resetting to the initial state.
 *
 * Only the command strings are stored — the rendered views are re-derived on
 * rehydration. State lives in sessionStorage (per-tab, cleared when the tab
 * closes), which survives the full reloads triggered by <a href> navigation.
 */

const OUTPUTS_KEY = 'terminal:outputs';
const ANCHOR_KEY = 'terminal:anchor';

export interface StoredOutput {
  id: string;
  command: string;
}

export function loadOutputs(): StoredOutput[] {
  if (typeof window === 'undefined') {
    return [];
  }
  try {
    const raw = window.sessionStorage.getItem(OUTPUTS_KEY);
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [];
    }
    return parsed.filter(
      (item): item is StoredOutput =>
        typeof item?.id === 'string' && typeof item?.command === 'string',
    );
  } catch {
    return [];
  }
}

export function saveOutputs(outputs: StoredOutput[]): void {
  if (typeof window === 'undefined') {
    return;
  }
  try {
    window.sessionStorage.setItem(OUTPUTS_KEY, JSON.stringify(outputs));
  } catch {
    /* storage unavailable — history simply won't persist */
  }
}

/** Remember which link to scroll back to when the user returns to the homepage. */
export function setReturnAnchor(anchorId: string): void {
  if (typeof window === 'undefined') {
    return;
  }
  try {
    window.sessionStorage.setItem(ANCHOR_KEY, anchorId);
  } catch {
    /* ignore */
  }
}

/** Read and clear the pending return anchor (consume-once). */
export function takeReturnAnchor(): string | null {
  if (typeof window === 'undefined') {
    return null;
  }
  try {
    const value = window.sessionStorage.getItem(ANCHOR_KEY);
    if (value) {
      window.sessionStorage.removeItem(ANCHOR_KEY);
    }
    return value;
  } catch {
    return null;
  }
}

/** Stable DOM id for a child-page link, used as the return scroll anchor. */
export function childLinkAnchorId(outputId: string, childKey: string): string {
  return `child-link-${outputId}-${childKey}`;
}
