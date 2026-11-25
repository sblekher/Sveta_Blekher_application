import type { PitchLocaleCode } from '../data/cvData';

const DB_NAME = 'sveta_cv_audio_store_v1';
const STORE_NAME = 'locale_audio';

export interface StoredLocaleAudio {
  locale: PitchLocaleCode;
  fileName: string;
  blob: Blob;
  updatedAt: number;
}

function openAudioDb(): Promise<IDBDatabase> {
  if (typeof indexedDB === 'undefined') {
    return Promise.reject(new Error('IndexedDB unavailable'));
  }
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'locale' });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function saveCustomLocaleAudio(
  locale: PitchLocaleCode,
  file: File
): Promise<StoredLocaleAudio> {
  const db = await openAudioDb();
  const record: StoredLocaleAudio = {
    locale,
    fileName: file.name,
    blob: file,
    updatedAt: Date.now(),
  };

  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    tx.objectStore(STORE_NAME).put(record);
    tx.oncomplete = () => resolve(record);
    tx.onerror = () => reject(tx.error);
  });
}

export async function getAllCustomLocaleAudio(): Promise<
  Partial<Record<PitchLocaleCode, StoredLocaleAudio>>
> {
  try {
    const db = await openAudioDb();
    return await new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const req = tx.objectStore(STORE_NAME).getAll();
      req.onsuccess = () => {
        const result: Partial<Record<PitchLocaleCode, StoredLocaleAudio>> = {};
        for (const row of req.result as StoredLocaleAudio[]) {
          result[row.locale] = row;
        }
        resolve(result);
      };
      req.onerror = () => reject(req.error);
    });
  } catch {
    return {};
  }
}

export async function removeCustomLocaleAudio(locale: PitchLocaleCode): Promise<void> {
  const db = await openAudioDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    tx.objectStore(STORE_NAME).delete(locale);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}
