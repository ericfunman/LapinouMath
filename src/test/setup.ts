import { expect, afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';

expect.extend(matchers);

afterEach(() => {
  cleanup();
});

// Mock IndexedDB pour les tests (jsdom fourni IndexedDB, mais certains tests en ont besoin)
if (typeof indexedDB === 'undefined') {
  class MockIDBRequest {
    result: any;
    onsuccess: ((event: any) => void) | null = null;
    onerror: ((event: any) => void) | null = null;
    
    constructor(result?: any) {
      this.result = result;
      // Déclencher le callback success asynchronement
      setTimeout(() => {
        if (this.onsuccess) {
          this.onsuccess({ target: this });
        }
      }, 0);
    }
  }

  class MockIDBTransaction {
    oncomplete: ((event: any) => void) | null = null;
    onerror: ((event: any) => void) | null = null;
    error: any;

    objectStore(_name: string) {
      return new MockIDBObjectStore();
    }

    constructor() {
      setTimeout(() => {
        if (this.oncomplete) {
          this.oncomplete({ target: this });
        }
      }, 0);
    }
  }

  class MockIDBObjectStore {
    clear() {
      return new MockIDBRequest();
    }

    add(value: any) {
      return new MockIDBRequest(value);
    }

    getAll() {
      return new MockIDBRequest([]);
    }

    put(value: any) {
      return new MockIDBRequest(value);
    }

    delete(_key: string) {
      return new MockIDBRequest();
    }
  }

  class MockIDBDatabase {
    objectStoreNames = { contains: () => true };

    transaction(_storeNames: string | string[], _mode: string) {
      return new MockIDBTransaction();
    }
  }

  const mockIndexedDB: any = {
    open: vi.fn((_name: string, _version: number) => {
      return new MockIDBRequest(new MockIDBDatabase());
    }),
  };

  (globalThis as any).indexedDB = mockIndexedDB;
}
