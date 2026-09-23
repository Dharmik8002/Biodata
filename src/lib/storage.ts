import { BiodataData } from '../types/biodata';

const STORAGE_KEY = 'vivahbio_saved_draft_v1';
const AUTO_SAVE_KEY = 'vivahbio_autosave_enabled';

export function saveDraftToStorage(data: BiodataData): boolean {
  try {
    const serialized = JSON.stringify(data);
    localStorage.setItem(STORAGE_KEY, serialized);
    localStorage.setItem('vivahbio_last_saved', new Date().toISOString());
    return true;
  } catch (error) {
    console.error('Failed to save biodata draft to localStorage:', error);
    return false;
  }
}

export function getDraftFromStorage(): BiodataData | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as BiodataData;
  } catch (error) {
    console.error('Failed to parse saved draft:', error);
    return null;
  }
}

export function hasSavedDraft(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) !== null;
  } catch {
    return false;
  }
}

export function clearDraftFromStorage(): boolean {
  try {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem('vivahbio_last_saved');
    return true;
  } catch {
    return false;
  }
}

export function getLastSavedTime(): string | null {
  try {
    return localStorage.getItem('vivahbio_last_saved');
  } catch {
    return null;
  }
}

export function isAutoSaveEnabled(): boolean {
  try {
    return localStorage.getItem(AUTO_SAVE_KEY) !== 'false';
  } catch {
    return true;
  }
}

export function setAutoSaveEnabled(enabled: boolean): void {
  try {
    localStorage.setItem(AUTO_SAVE_KEY, enabled ? 'true' : 'false');
  } catch {}
}

export function deleteAllUserData(): boolean {
  try {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem('vivahbio_last_saved');
    localStorage.removeItem(AUTO_SAVE_KEY);
    localStorage.removeItem('vivahbio_ui_lang');
    return true;
  } catch {
    return false;
  }
}
