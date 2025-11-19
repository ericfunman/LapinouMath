// IndexedDB pour une persistance robuste des données
const DB_NAME = 'LapinouMathDB';
const DB_VERSION = 4;
const PROFILES_STORE = 'profiles';
const QUESTIONS_STORE = 'questions';
const ERROR_REPORTS_STORE = 'errorReports';

let db: IDBDatabase | null = null;

// Vérifier si indexedDB est disponible (pas disponible en Node.js)
const isIndexedDBAvailable = (): boolean => {
  return typeof indexedDB !== 'undefined';
};

export const initDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    if (!isIndexedDBAvailable()) {
      reject(new Error('IndexedDB is not available in this environment'));
      return;
    }

    if (db) {
      resolve(db);
      return;
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => {
      reject(request.error);
    };

    request.onsuccess = () => {
      db = request.result;
      resolve(db);
    };

    request.onupgradeneeded = (event) => {
      const database = (event.target as IDBOpenDBRequest).result;

      // Créer le store pour les profils si n'existe pas
      if (!database.objectStoreNames.contains(PROFILES_STORE)) {
        database.createObjectStore(PROFILES_STORE, { keyPath: 'id' });
      }

      // Créer le store pour les questions si n'existe pas
      if (!database.objectStoreNames.contains(QUESTIONS_STORE)) {
        const questionStore = database.createObjectStore(QUESTIONS_STORE, { keyPath: 'id' });
        // Index pour filtrer par niveau et domaine
        questionStore.createIndex('level', 'level', { unique: false });
        questionStore.createIndex('domain', 'domain', { unique: false });
        questionStore.createIndex('level_domain', ['level', 'domain'], { unique: false });
      }

      // Créer le store pour les rapports d'erreurs
      if (!database.objectStoreNames.contains(ERROR_REPORTS_STORE)) {
        const reportStore = database.createObjectStore(ERROR_REPORTS_STORE, { keyPath: 'id', autoIncrement: true });
        reportStore.createIndex('questionId', 'questionId', { unique: false });
        reportStore.createIndex('timestamp', 'timestamp', { unique: false });
      }
    };
  });
};

export const saveProfiles = async (profiles: any[]): Promise<void> => {
  const database = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = database.transaction([PROFILES_STORE], 'readwrite');
    const store = transaction.objectStore(PROFILES_STORE);

    // Vider le store d'abord
    const clearRequest = store.clear();

    clearRequest.onsuccess = () => {
      // Puis ajouter tous les profils
      profiles.forEach(profile => {
        store.add(profile);
      });
    };

    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error);
  });
};

export const loadProfiles = async (): Promise<any[]> => {
  const database = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = database.transaction([PROFILES_STORE], 'readonly');
    const store = transaction.objectStore(PROFILES_STORE);
    const request = store.getAll();

    request.onsuccess = () => {
      resolve(request.result || []);
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
};

export const deleteProfile = async (profileId: string): Promise<void> => {
  const database = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = database.transaction([PROFILES_STORE], 'readwrite');
    const store = transaction.objectStore(PROFILES_STORE);
    const request = store.delete(profileId);

    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
};

// ========== GESTION DES QUESTIONS ==========

export const saveQuestions = async (questions: any[]): Promise<void> => {
  const database = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = database.transaction([QUESTIONS_STORE], 'readwrite');
    const store = transaction.objectStore(QUESTIONS_STORE);

    // Vider le store d'abord
    const clearRequest = store.clear();

    clearRequest.onsuccess = () => {
      // Puis ajouter toutes les questions
      for (const question of questions) {
        store.add(question);
      }
    };

    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error);
  });
};

export const loadQuestions = async (): Promise<any[]> => {
  const database = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = database.transaction([QUESTIONS_STORE], 'readonly');
    const store = transaction.objectStore(QUESTIONS_STORE);
    const request = store.getAll();

    request.onsuccess = () => {
      resolve(request.result || []);
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
};

export const updateQuestion = async (question: any): Promise<void> => {
  const database = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = database.transaction([QUESTIONS_STORE], 'readwrite');
    const store = transaction.objectStore(QUESTIONS_STORE);
    const request = store.put(question);

    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
};

export const getQuestionsByLevelDomain = async (level: string, domain: string): Promise<any[]> => {
  const database = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = database.transaction([QUESTIONS_STORE], 'readonly');
    const store = transaction.objectStore(QUESTIONS_STORE);
    const index = store.index('level_domain');
    const request = index.getAll([level, domain]);

    request.onsuccess = () => {
      resolve(request.result || []);
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
};

// ========== GESTION DES RAPPORTS D'ERREURS ==========

export interface ErrorReport {
  id?: number;
  questionId: string;
  level: string;
  domain: string;
  questionText: string;
  timestamp?: number;
  userNote?: string;
}

export const reportQuestionError = async (report: ErrorReport): Promise<void> => {
  const database = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = database.transaction([ERROR_REPORTS_STORE], 'readwrite');
    const store = transaction.objectStore(ERROR_REPORTS_STORE);
    const request = store.add({
      ...report,
      timestamp: Date.now()
    });

    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
};

export const getErrorReports = async (): Promise<ErrorReport[]> => {
  const database = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = database.transaction([ERROR_REPORTS_STORE], 'readonly');
    const store = transaction.objectStore(ERROR_REPORTS_STORE);
    const request = store.getAll();

    request.onsuccess = () => {
      resolve(request.result || []);
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
};

export const deleteErrorReport = async (reportId: number): Promise<void> => {
  const database = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = database.transaction([ERROR_REPORTS_STORE], 'readwrite');
    const store = transaction.objectStore(ERROR_REPORTS_STORE);
    const request = store.delete(reportId);

    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
};
