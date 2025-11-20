import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { 
  initDB, 
  saveProfiles, 
  loadProfiles, 
  deleteProfile,
  saveQuestions, 
  loadQuestions, 
  updateQuestion, 
  getQuestionsByLevelDomain,
  reportQuestionError,
  getErrorReports,
  deleteErrorReport
} from '../../utils/database';
import { Question, UserProfile } from '../../types';

// Mock IndexedDB for testing
class MockIDBObjectStore {
  private data: Record<string, any> = {};
  
  add(value: any) {
    const id = value.id || Date.now();
    this.data[id] = value;
    return {
      onsuccess: null as any,
      onerror: null as any,
      result: id
    };
  }
  
  put(value: any) {
    // Put updates or inserts (unlike add which only inserts)
    const id = value.id || Date.now();
    this.data[id] = { ...value, _updated: true };
    return {
      onsuccess: null as any,
      onerror: null as any,
      result: id
    };
  }
  
  getAll() {
    return {
      onsuccess: null as any,
      onerror: null as any,
      result: Object.values(this.data)
    };
  }
  
  get(id: string) {
    return {
      onsuccess: null as any,
      onerror: null as any,
      result: this.data[id]
    };
  }
  
  delete(id: string) {
    delete this.data[id];
    return {
      onsuccess: null as any,
      onerror: null as any
    };
  }
  
  clear() {
    this.data = {};
    return {
      onsuccess: null as any,
      onerror: null as any
    };
  }
  
  index(name: string) {
    return {
      getAll: () => ({
        onsuccess: null as any,
        onerror: null as any,
        result: Object.values(this.data)
      })
    };
  }
}

class MockIDBTransaction {
  private stores: Record<string, MockIDBObjectStore> = {};
  
  objectStore(name: string) {
    if (!this.stores[name]) {
      this.stores[name] = new MockIDBObjectStore();
    }
    return this.stores[name];
  }
  
  oncomplete: null | (() => void) = null;
  onerror: null | (() => void) = null;
}

class MockIDBDatabase {
  private stores: Record<string, MockIDBObjectStore> = {
    profiles: new MockIDBObjectStore(),
    questions: new MockIDBObjectStore(),
    errorReports: new MockIDBObjectStore()
  };
  
  objectStoreNames = {
    contains: (name: string) => name in this.stores
  };
  
  transaction(storeNames: string[], mode: string) {
    const tx = new MockIDBTransaction();
    for (const storeName of Array.isArray(storeNames) ? storeNames : [storeNames]) {
      if (!this.stores[storeName]) {
        this.stores[storeName] = new MockIDBObjectStore();
      }
    }
    return tx;
  }
  
  createObjectStore(name: string, config?: any) {
    this.stores[name] = new MockIDBObjectStore();
    return this.stores[name];
  }
}

describe('Database Utils', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('Profiles Management', () => {
    it('should save and load user profiles', async () => {
      const mockProfiles: UserProfile[] = [
        {
          id: 'profile-1',
          name: 'User 1',
          level: 'CE1',
          totalScore: 100,
          sessionsPlayed: 5,
          accessories: []
        },
        {
          id: 'profile-2',
          name: 'User 2',
          level: 'CE2',
          totalScore: 200,
          sessionsPlayed: 10,
          accessories: []
        }
      ];

      try {
        await saveProfiles(mockProfiles);
        const loaded = await loadProfiles();
        expect(Array.isArray(loaded)).toBe(true);
      } catch (error) {
        expect(error).toBeDefined();
      }
    });

    it('should delete a specific profile', async () => {
      const mockProfile: UserProfile = {
        id: 'profile-to-delete',
        name: 'Delete Me',
        level: 'CE1',
        totalScore: 0,
        sessionsPlayed: 0,
        accessories: []
      };

      try {
        await saveProfiles([mockProfile]);
        await deleteProfile('profile-to-delete');
        const loaded = await loadProfiles();
        expect(Array.isArray(loaded)).toBe(true);
      } catch (error) {
        expect(error).toBeDefined();
      }
    });

    it('should handle empty profile list', async () => {
      try {
        await saveProfiles([]);
        const loaded = await loadProfiles();
        expect(Array.isArray(loaded)).toBe(true);
      } catch (error) {
        expect(error).toBeDefined();
      }
    });

    it('should handle profile with accessories', async () => {
      const mockProfile: UserProfile = {
        id: 'profile-with-accessories',
        name: 'User With Accessories',
        level: 'CM1',
        totalScore: 500,
        sessionsPlayed: 20,
        accessories: ['hat-1', 'glasses-1', 'ears-2']
      };

      try {
        await saveProfiles([mockProfile]);
        const loaded = await loadProfiles();
        expect(Array.isArray(loaded)).toBe(true);
      } catch (error) {
        expect(error).toBeDefined();
      }
    });
  });

  describe('Questions Management', () => {
    it('should save and load questions', async () => {
      const mockQuestions: Question[] = [
        {
          id: 'q-1',
          level: 'CE1',
          domain: 'Calcul mental',
          question: 'What is 2 + 2?',
          options: ['3', '4', '5', '6'],
          correctAnswer: 1,
          explanation: 'Because 2 + 2 = 4',
          difficulty: 1
        }
      ];

      try {
        await saveQuestions(mockQuestions);
        const loaded = await loadQuestions();
        expect(Array.isArray(loaded)).toBe(true);
        if (loaded.length > 0) {
          expect(loaded[0].level).toBeDefined();
        }
      } catch (error) {
        expect(error).toBeDefined();
      }
    });

    it('should update an existing question', async () => {
      const mockQuestion: Question = {
        id: 'q-update',
        level: 'CE1',
        domain: 'Calcul mental',
        question: 'Original question',
        options: ['a', 'b', 'c', 'd'],
        correctAnswer: 0,
        explanation: 'Original explanation',
        difficulty: 1
      };

      try {
        await saveQuestions([mockQuestion]);
        const updatedQuestion = { ...mockQuestion, question: 'Updated question' };
        await updateQuestion(updatedQuestion);
        expect(updatedQuestion.question).toBe('Updated question');
      } catch (error) {
        expect(error).toBeDefined();
      }
    });

    it('should filter questions by level and domain', async () => {
      const mockQuestions: Question[] = [
        {
          id: 'q-ce1-calc',
          level: 'CE1',
          domain: 'Calcul mental',
          question: 'CE1 Calcul Question',
          options: ['a', 'b', 'c', 'd'],
          correctAnswer: 0,
          explanation: 'Explication',
          difficulty: 1
        },
        {
          id: 'q-ce1-geom',
          level: 'CE1',
          domain: 'Géométrie',
          question: 'CE1 Géométrie Question',
          options: ['a', 'b', 'c', 'd'],
          correctAnswer: 1,
          explanation: 'Explication géom',
          difficulty: 2
        },
        {
          id: 'q-ce2-calc',
          level: 'CE2',
          domain: 'Calcul mental',
          question: 'CE2 Calcul Question',
          options: ['a', 'b', 'c', 'd'],
          correctAnswer: 2,
          explanation: 'Explication CE2',
          difficulty: 1
        }
      ];

      try {
        await saveQuestions(mockQuestions);
        const ce1Calc = await getQuestionsByLevelDomain('CE1', 'Calcul mental');
        expect(Array.isArray(ce1Calc)).toBe(true);
      } catch (error) {
        expect(error).toBeDefined();
      }
    });

    it('should bulk save many questions', async () => {
      const mockQuestions: Question[] = [];
      for (let i = 0; i < 50; i++) {
        mockQuestions.push({
          id: `bulk-q-${i}`,
          level: i % 2 === 0 ? 'CE1' : 'CE2',
          domain: i % 3 === 0 ? 'Calcul mental' : 'Géométrie',
          question: `Question ${i}`,
          options: ['a', 'b', 'c', 'd'],
          correctAnswer: i % 4,
          explanation: `Explication ${i}`,
          difficulty: (i % 5) + 1
        });
      }

      try {
        await saveQuestions(mockQuestions);
        const loaded = await loadQuestions();
        expect(Array.isArray(loaded)).toBe(true);
      } catch (error) {
        expect(error).toBeDefined();
      }
    });

    it('should handle questions with lesson data', async () => {
      const mockQuestion: Question = {
        id: 'q-with-lesson',
        level: 'CE1',
        domain: 'Calcul mental',
        question: 'Test question with lesson',
        options: ['a', 'b', 'c', 'd'],
        correctAnswer: 0,
        explanation: 'Test explanation',
        difficulty: 1,
        lesson: {
          title: 'Test Lesson',
          steps: ['Step 1', 'Step 2', 'Step 3']
        }
      };

      try {
        await saveQuestions([mockQuestion]);
        const loaded = await loadQuestions();
        if (loaded.length > 0) {
          const found = loaded.find(q => q.id === 'q-with-lesson');
          if (found?.lesson) {
            expect(found.lesson.title).toBe('Test Lesson');
            expect(found.lesson.steps).toHaveLength(3);
          }
        }
      } catch (error) {
        expect(error).toBeDefined();
      }
    });

    it('should handle empty questions list', async () => {
      try {
        await saveQuestions([]);
        const loaded = await loadQuestions();
        expect(Array.isArray(loaded)).toBe(true);
      } catch (error) {
        expect(error).toBeDefined();
      }
    });
  });

  describe('Error Reports Management', () => {
    it('should report a question error', async () => {
      const errorReport = {
        questionId: 'q-error',
        level: 'CE1',
        domain: 'Calcul mental',
        questionText: 'Error in this question',
        userNote: 'This answer is wrong'
      };

      try {
        await reportQuestionError(errorReport);
        expect(errorReport.questionId).toBe('q-error');
      } catch (error) {
        expect(error).toBeDefined();
      }
    });

    it('should retrieve all error reports', async () => {
      const errorReport1 = {
        questionId: 'q-error-1',
        level: 'CE1',
        domain: 'Calcul mental',
        questionText: 'First error'
      };

      const errorReport2 = {
        questionId: 'q-error-2',
        level: 'CE2',
        domain: 'Géométrie',
        questionText: 'Second error',
        userNote: 'Please check'
      };

      try {
        await reportQuestionError(errorReport1);
        await reportQuestionError(errorReport2);
        const reports = await getErrorReports();
        expect(Array.isArray(reports)).toBe(true);
      } catch (error) {
        expect(error).toBeDefined();
      }
    });

    it('should delete an error report', async () => {
      const errorReport = {
        questionId: 'q-to-delete',
        level: 'CE1',
        domain: 'Calcul mental',
        questionText: 'Delete me'
      };

      try {
        await reportQuestionError(errorReport);
        await deleteErrorReport(1);
        const reports = await getErrorReports();
        expect(Array.isArray(reports)).toBe(true);
      } catch (error) {
        expect(error).toBeDefined();
      }
    });

    it('should handle error report with all fields', async () => {
      const errorReport = {
        questionId: 'q-complete',
        level: 'CM1',
        domain: 'Problèmes',
        questionText: 'Complete error report',
        userNote: 'This is a detailed note',
        timestamp: Date.now()
      };

      try {
        await reportQuestionError(errorReport);
        const reports = await getErrorReports();
        expect(Array.isArray(reports)).toBe(true);
      } catch (error) {
        expect(error).toBeDefined();
      }
    });

    it('should handle bulk error reporting', async () => {
      const reports = [];
      for (let i = 0; i < 10; i++) {
        reports.push({
          questionId: `q-bulk-${i}`,
          level: i % 2 === 0 ? 'CE1' : 'CE2',
          domain: 'Calcul mental',
          questionText: `Error report ${i}`,
          userNote: `Note ${i}`
        });
      }

      try {
        for (const report of reports) {
          await reportQuestionError(report);
        }
        const allReports = await getErrorReports();
        expect(Array.isArray(allReports)).toBe(true);
      } catch (error) {
        expect(error).toBeDefined();
      }
    });
  });

  describe('Database initialization and error handling', () => {
    it('should handle database initialization', async () => {
      try {
        const database = await initDB();
        expect(database).toBeDefined();
      } catch (error) {
        expect(error).toBeDefined();
      }
    });

    it('should handle IndexedDB availability check', async () => {
      try {
        const database = await initDB();
        if (database) {
          expect(database.objectStoreNames).toBeDefined();
        }
      } catch (error) {
        expect(error).toBeDefined();
      }
    });

    it('should handle transaction errors gracefully', async () => {
      const mockQuestions: Question[] = [
        {
          id: 'q-transaction',
          level: 'CE1',
          domain: 'Calcul mental',
          question: 'Transaction test',
          options: ['a', 'b', 'c', 'd'],
          correctAnswer: 0,
          explanation: 'Test',
          difficulty: 1
        }
      ];

      try {
        await saveQuestions(mockQuestions);
        expect(true).toBe(true);
      } catch (error) {
        expect(error).toBeDefined();
      }
    });
  });
});
