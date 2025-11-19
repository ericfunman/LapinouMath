import { useState, useEffect } from 'react';
import { Question, GradeLevel, MathDomain, InteractiveQuestion } from '../types';
import { getAllQuestionsAsync } from '../data/questions';
import { updateQuestion } from '../utils/database';
import { GRADE_LEVELS, MATH_DOMAINS } from '../data/constants';
import QuestionsImportExport from './QuestionsImportExport';
import ErrorReportsTab from './ErrorReportsTab';

interface Props {
  onClose: () => void;
}

export default function AdminPanel(props: Readonly<Props>) {
  const { onClose } = props;
  const [questions, setQuestions] = useState<(Question | InteractiveQuestion)[]>([]);
  const [filteredQuestions, setFilteredQuestions] = useState<(Question | InteractiveQuestion)[]>([]);
  const [selectedLevel, setSelectedLevel] = useState<GradeLevel | 'ALL'>('ALL');
  const [selectedDomain, setSelectedDomain] = useState<MathDomain | 'ALL'>('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [editingQuestion, setEditingQuestion] = useState<Question | InteractiveQuestion | null>(null);
  const [showCorrectOnly, setShowCorrectOnly] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [tab, setTab] = useState<'questions' | 'reports'>('questions');

  useEffect(() => {
    getAllQuestionsAsync().then(allQuestions => {
      setQuestions(allQuestions);
      setFilteredQuestions(allQuestions);
    });
  }, []);

  useEffect(() => {
    let filtered = [...questions];

    if (selectedLevel !== 'ALL') {
      filtered = filtered.filter(q => q.level === selectedLevel);
    }

    if (selectedDomain !== 'ALL') {
      filtered = filtered.filter(q => q.domain === selectedDomain);
    }

    if (searchTerm) {
      filtered = filtered.filter(q => 
        q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.options.some(opt => opt.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredQuestions(filtered);
  }, [selectedLevel, selectedDomain, searchTerm, questions]);

  const handleEditQuestion = (question: Question | InteractiveQuestion) => {
    setEditingQuestion({ ...question });
  };

  const handleSaveEdit = async () => {
    if (!editingQuestion) return;
    
    setIsSaving(true);
    try {
      await updateQuestion(editingQuestion);
      
      const updatedQuestions = questions.map(q => 
        q.id === editingQuestion.id ? editingQuestion : q
      );
      setQuestions(updatedQuestions);
      setEditingQuestion(null);
      
      alert('✅ Question sauvegardée avec succès en base de données!');
    } catch (error) {
      console.error('Erreur sauvegarde:', error);
      alert('❌ Erreur lors de la sauvegarde de la question.');
    } finally {
      setIsSaving(false);
    }
  };

  const stats = {
    total: questions.length,
    byLevel: GRADE_LEVELS.reduce((acc, level) => {
      acc[level] = questions.filter(q => q.level === level).length;
      return acc;
    }, {} as Record<GradeLevel, number>),
    byDomain: MATH_DOMAINS.reduce((acc, domain) => {
      acc[domain] = questions.filter(q => q.domain === domain).length;
      return acc;
    }, {} as Record<MathDomain, number>)
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-orange-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-3xl shadow-2xl p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <span className="text-5xl">⚙️</span>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Panel Admin</h1>
                <p className="text-gray-600">Gestion des questions et rapports d'erreurs</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="bg-red-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-red-600"
            >
              ❌ Fermer
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-4 border-b border-gray-200">
            <button
              onClick={() => setTab('questions')}
              className={`px-6 py-3 font-bold rounded-t-xl transition ${
                tab === 'questions'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
              }`}
            >
              📚 Questions
            </button>
            <button
              onClick={() => setTab('reports')}
              className={`px-6 py-3 font-bold rounded-t-xl transition ${
                tab === 'reports'
                  ? 'bg-red-500 text-white'
                  : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
              }`}
            >
              ⚠️ Rapports d'erreurs
            </button>
          </div>
        </div>

        {/* Content based on tab */}
        {tab === 'reports' ? (
          <ErrorReportsTab />
        ) : (
          <>
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-blue-50 p-4 rounded-xl">
                <p className="text-sm text-gray-600">Total</p>
                <p className="text-2xl font-bold text-blue-600">{stats.total}</p>
              </div>
              {GRADE_LEVELS.map(level => (
                <div key={level} className="bg-green-50 p-4 rounded-xl">
                  <p className="text-sm text-gray-600">{level}</p>
                  <p className="text-2xl font-bold text-green-600">{stats.byLevel[level]}</p>
                </div>
              ))}
            </div>

            {/* Import/Export Section */}
            <div className="my-6">
              <QuestionsImportExport
                allQuestions={questions}
                onImportComplete={() => {
                  getAllQuestionsAsync().then(q => {
                    setQuestions(q);
                    setFilteredQuestions(q);
                  });
                }}
              />
            </div>

            {/* Filtres */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value as GradeLevel | 'ALL')}
                className="px-4 py-2 rounded-xl border-2 border-gray-300 focus:border-primary focus:outline-none"
              >
                <option value="ALL">Tous les niveaux</option>
                {GRADE_LEVELS.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>

              <select
                value={selectedDomain}
                onChange={(e) => setSelectedDomain(e.target.value as MathDomain | 'ALL')}
                className="px-4 py-2 rounded-xl border-2 border-gray-300 focus:border-primary focus:outline-none"
              >
                <option value="ALL">Tous les domaines</option>
                {MATH_DOMAINS.map(domain => (
                  <option key={domain} value={domain}>{domain}</option>
                ))}
              </select>

              <input
                type="text"
                placeholder="🔍 Rechercher..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-4 py-2 rounded-xl border-2 border-gray-300 focus:border-primary focus:outline-none"
              />

              <label className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-xl cursor-pointer">
                <input
                  type="checkbox"
                  checked={showCorrectOnly}
                  onChange={(e) => setShowCorrectOnly(e.target.checked)}
                  className="w-5 h-5"
                />
                <span>Afficher réponses</span>
              </label>
            </div>

            {/* Liste des questions */}
            <div className="space-y-4">
              {filteredQuestions.map((question) => (
                <div key={question.id} className="bg-white rounded-2xl shadow-xl p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-lg text-sm font-bold">
                          {question.level}
                        </span>
                        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-lg text-sm font-bold">
                          {question.domain}
                        </span>
                        <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-lg text-sm font-bold">
                          Difficulté {question.difficulty}/3
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-800 mb-3">{question.question}</h3>
                      
                      {/* Options */}
                      <div className="grid grid-cols-2 gap-2 mb-3">
                        {question.options.map((option, idx) => (
                          <div
                            key={`option-${question.id}-${idx}`}
                            className={`p-3 rounded-lg border-2 ${
                              idx === question.correctAnswer
                                ? 'bg-green-100 border-green-500 font-bold'
                                : 'bg-gray-50 border-gray-300'
                            }`}
                          >
                            {idx === question.correctAnswer && '✅ '}
                            {option}
                          </div>
                        ))}
                      </div>

                      {/* Explication */}
                      {showCorrectOnly && (
                        <div className="bg-blue-50 p-3 rounded-lg">
                          <p className="text-sm text-gray-700"><strong>Explication:</strong> {question.explanation}</p>
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => handleEditQuestion(question)}
                      className="ml-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 font-bold"
                    >
                      ✏️ Éditer
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {filteredQuestions.length === 0 && (
              <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
                <p className="text-2xl text-gray-500">Aucune question trouvée</p>
              </div>
            )}
          </>
        )}
      </div>

      {/* Modal d'édition */}
      {editingQuestion && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-6 z-50">
          <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-6">✏️ Éditer la question</h2>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="question-input" className="block text-sm font-bold mb-2">Question</label>
                <textarea
                  id="question-input"
                  value={editingQuestion.question}
                  onChange={(e) => setEditingQuestion({...editingQuestion, question: e.target.value})}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none"
                  rows={3}
                />
              </div>

              {editingQuestion.options.map((option, idx) => (
                <div key={`edit-option-${editingQuestion.id}-${idx}`}>
                  <label className="block text-sm font-bold mb-2">
                    Option {idx + 1} {idx === editingQuestion.correctAnswer && '✅ (Correcte)'}
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={option}
                      onChange={(e) => {
                        const newOptions = [...editingQuestion.options];
                        newOptions[idx] = e.target.value;
                        setEditingQuestion({...editingQuestion, options: newOptions});
                      }}
                      className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none"
                    />
                    <button
                      onClick={() => setEditingQuestion({...editingQuestion, correctAnswer: idx})}
                      className={`px-4 py-2 rounded-lg font-bold ${
                        idx === editingQuestion.correctAnswer
                          ? 'bg-green-500 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      {idx === editingQuestion.correctAnswer ? '✅' : 'Marquer'}
                    </button>
                  </div>
                </div>
              ))}

              <div>
                <label htmlFor="explication-input" className="block text-sm font-bold mb-2">Explication</label>
                <textarea
                  id="explication-input"
                  value={editingQuestion.explanation}
                  onChange={(e) => setEditingQuestion({...editingQuestion, explanation: e.target.value})}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none"
                  rows={2}
                />
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handleSaveEdit}
                  disabled={isSaving}
                  className={`flex-1 ${isSaving ? 'bg-gray-400' : 'bg-green-500 hover:bg-green-600'} text-white py-3 rounded-xl font-bold`}
                >
                  {isSaving ? '⏳ Sauvegarde...' : '💾 Sauvegarder en BDD'}
                </button>
                <button
                  onClick={() => setEditingQuestion(null)}
                  className="flex-1 bg-gray-500 text-white py-3 rounded-xl font-bold hover:bg-gray-600"
                >
                  ❌ Annuler
                </button>
              </div>

              <p className="text-sm text-green-600 bg-green-50 p-3 rounded-lg">
                ✅ Les modifications seront sauvegardées dans IndexedDB de façon permanente.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
