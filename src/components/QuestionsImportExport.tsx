/**
 * Questions Import/Export Component
 * Allows bulk export of questions to Excel and import from Excel files
 */

import { useState, useRef } from 'react';
import { Question } from '../types';
import { exportQuestionsToExcel, generateQuestionsCSV } from '../utils/excelExport';
import { saveQuestions } from '../utils/database';
import * as XLSX from 'xlsx';

interface Props {
  allQuestions: Question[];
  onImportComplete: (importedCount: number, duplicates: number) => void;
}

export default function QuestionsImportExport(props: Readonly<Props>) {
  const { allQuestions } = props;
  const [showImportModal, setShowImportModal] = useState(false);
  const [importStatus, setImportStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [importMessage, setImportMessage] = useState('');
  const [importErrors, setImportErrors] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const getStatusButtonClass = (status: typeof importStatus) => {
    switch (status) {
      case 'success':
        return 'bg-green-500 hover:bg-green-600';
      case 'error':
        return 'bg-red-500 hover:bg-red-600';
      default:
        return 'bg-yellow-500 hover:bg-yellow-600';
    }
  };

  // Export to Excel/CSV
  const handleExportExcel = () => {
    try {
      const { headers, rows } = exportQuestionsToExcel(allQuestions);
      
      // Create workbook and worksheet
      const ws = XLSX.utils.aoa_to_sheet([headers, ...rows]);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Questions');
      
      // Set column widths
      ws['!cols'] = [
        { wch: 15 },  // ID
        { wch: 12 },  // Level
        { wch: 18 },  // Domain
        { wch: 35 },  // Question
        { wch: 20 },  // Option 1
        { wch: 20 },  // Option 2
        { wch: 20 },  // Option 3
        { wch: 20 },  // Option 4
        { wch: 8 },   // Correct Answer
        { wch: 30 },  // Explanation
        { wch: 8 },   // Difficulty
      ];

      // Generate filename with date
      const date = new Date().toISOString().split('T')[0];
      XLSX.writeFile(wb, `LapinouMath_Questions_${date}.xlsx`);
    } catch (err) {
      alert(`Erreur lors de l'export: ${err instanceof Error ? err.message : 'Erreur inconnue'}`);
    }
  };

  // Export to CSV (fallback)
  const handleExportCSV = () => {
    try {
      const csv = generateQuestionsCSV(allQuestions);
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `LapinouMath_Questions_${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      alert(`Erreur lors de l'export CSV: ${err instanceof Error ? err.message : 'Erreur inconnue'}`);
    }
  };

  // Import from Excel
  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImportStatus('processing');
    setImportMessage('Traitement du fichier...');
    setImportErrors([]);

    // Use Blob.arrayBuffer() instead of FileReader
    const processBuffer = async (buffer: ArrayBuffer) => {
      try {
        const data = new Uint8Array(buffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const parsedData = XLSX.utils.sheet_to_json(worksheet);

        const validQuestions = parsedData.filter(q => q && typeof q === 'object');

        if (validQuestions.length > 0) {
          const importedQuestions = validQuestions.map((q: any) => {
            const steps = [
              q.lessonStep1?.toString() || '',
              q.lessonStep2?.toString() || '',
              q.lessonStep3?.toString() || ''
            ].filter(Boolean);

            return {
              id: q.id || crypto.randomUUID(),
              level: q.level?.toString() || 'CM1',
              domain: q.domain?.toString() || 'Calcul',
              question: q.question?.toString() || '',
              options: [
                q.option1?.toString() || '',
                q.option2?.toString() || '',
                q.option3?.toString() || '',
                q.option4?.toString() || ''
              ],
              correctAnswer: Number.parseInt(q.correctAnswer?.toString() || '0', 10) || 0,
              explanation: q.explanation?.toString() || '',
              lesson: {
                title: q.lessonTitle?.toString() || '',
                steps
              },
              difficulty: 2 as 1 | 2 | 3
            };
          });

          await saveQuestions(importedQuestions);
          setImportStatus('success');
          setImportMessage(`✅ ${importedQuestions.length} questions importées!`);
        } else {
          setImportStatus('error');
          setImportMessage('❌ Aucune donnée valide trouvée');
        }
      } catch (err) {
        setImportStatus('error');
        setImportMessage(`Erreur: ${err instanceof Error ? err.message : 'Erreur inconnue'}`);
      }
    };

    file.arrayBuffer().then(processBuffer).catch(() => {
      setImportStatus('error');
      setImportMessage('Erreur lors de la lecture du fichier');
    });

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl p-6 mb-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">📊 Import/Export des Questions</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* Export buttons */}
        <div>
          <h3 className="font-semibold text-gray-700 mb-3">📥 Exporter</h3>
          <div className="space-y-2">
            <button
              onClick={handleExportExcel}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-xl transition-colors"
            >
              📊 Exporter en Excel ({allQuestions.length} questions)
            </button>
            <button
              onClick={handleExportCSV}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-xl transition-colors"
            >
              📄 Exporter en CSV
            </button>
            <p className="text-sm text-gray-600">
              Crée un fichier avec toutes les questions actuelles, réponses et explications.
            </p>
          </div>
        </div>

        {/* Import button */}
        <div>
          <h3 className="font-semibold text-gray-700 mb-3">📤 Importer</h3>
          <button
            onClick={handleImportClick}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-xl transition-colors mb-2"
          >
            📁 Importer un fichier Excel
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".xlsx,.csv"
            onChange={handleFileChange}
            className="hidden"
          />
          <p className="text-sm text-gray-600">
            Accepte les fichiers Excel (.xlsx) ou CSV au format spécifié.
          </p>
        </div>
      </div>

      {/* Format information */}
      <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6 rounded">
        <h4 className="font-semibold text-blue-900 mb-2">📋 Format attendu (Excel/CSV)</h4>
        <div className="text-sm text-blue-800 space-y-1">
          <p><strong>Colonnes (dans cet ordre):</strong></p>
          <ol className="list-decimal list-inside ml-2 space-y-1">
            <li>ID (identifiant unique)</li>
            <li>Level (CE1, CE2, CM1, CM2, 6ème, 5ème, 4ème)</li>
            <li>Domain (Calcul mental, Arithmétique, etc.)</li>
            <li>Question (le texte de la question)</li>
            <li>Option 1</li>
            <li>Option 2</li>
            <li>Option 3</li>
            <li>Option 4</li>
            <li>Correct Answer (index 0-3 de la bonne réponse)</li>
            <li>Explanation (explication de la réponse)</li>
            <li>Difficulty (1=Facile, 2=Moyen, 3=Difficile)</li>
          </ol>
        </div>
      </div>

      {/* Import Modal */}
      {showImportModal && (
        <div className="bg-gray-100 border-l-4 border-orange-400 p-4 rounded mb-6">
          <div className="space-y-3">
            <p className="text-gray-700 whitespace-pre-line">{importMessage}</p>
            {importErrors.length > 0 && (
              <div className="bg-red-50 border border-red-200 rounded p-3">
                <p className="font-semibold text-red-900 mb-2">Erreurs détectées:</p>
                <ul className="text-sm text-red-800 space-y-1">
                  {importErrors.slice(0, 10).map((err) => (
                    <li key={`error-${err.substring(0, 20)}`}>• {err}</li>
                  ))}
                  {importErrors.length > 10 && <li>... et {importErrors.length - 10} autres erreurs</li>}
                </ul>
              </div>
            )}
            <button
              onClick={() => {
                setShowImportModal(false);
                setImportStatus('idle');
                setImportErrors([]);
              }}
              className="w-full bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
            >
              Fermer
            </button>
          </div>
        </div>
      )}

      {/* Status messages */}
      {importStatus !== 'idle' && (
        <button
          onClick={() => setShowImportModal(!showImportModal)}
          className={`w-full py-3 px-4 rounded-xl font-bold text-white transition-colors ${getStatusButtonClass(importStatus)}`}
        >
          {importStatus === 'processing' && '⏳ Traitement en cours...'}
          {importStatus === 'success' && '✅ Import réussi - Voir les détails'}
          {importStatus === 'error' && '❌ Erreur d\'import - Voir les détails'}
        </button>
      )}
    </div>
  );
}
