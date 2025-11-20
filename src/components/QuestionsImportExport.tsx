/**
 * Questions Import/Export Component
 * Allows bulk export of questions to Excel and import from Excel files
 */

import { useState, useRef } from 'react';
import { Question, InteractiveQuestion, type GradeLevel, type MathDomain } from '../types';
import { exportQuestionsToExcel, generateQuestionsCSV } from '../utils/excelExport';
import { saveQuestions } from '../utils/database';
import ExcelJS from 'exceljs';

/**
 * Safely convert unknown value to string with type checking
 */
function safeString(value: unknown, fallback = ''): string {
  if (typeof value === 'string') return value;
  if (typeof value === 'number') return String(value);
  if (typeof value === 'boolean') return String(value);
  return fallback;
}

interface Props {
  allQuestions: (Question | InteractiveQuestion)[];
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
  const handleExportExcel = async () => {
    try {
      const { headers, rows } = exportQuestionsToExcel(allQuestions);
      
      // Create workbook and worksheet with ExcelJS
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Questions');
      
      // Add headers
      worksheet.addRow(headers);
      
      // Add data rows
      rows.forEach(row => {
        worksheet.addRow(row);
      });
      
      // Set column widths
      worksheet.columns = [
        { width: 15 },  // ID
        { width: 12 },  // Level
        { width: 18 },  // Domain
        { width: 35 },  // Question
        { width: 20 },  // Option 1
        { width: 20 },  // Option 2
        { width: 20 },  // Option 3
        { width: 20 },  // Option 4
        { width: 8 },   // Correct Answer
        { width: 30 },  // Explanation
        { width: 8 },   // Difficulty
      ];
      
      // Style header row
      worksheet.getRow(1).font = { bold: true };
      worksheet.getRow(1).fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFE0E0E0' }
      };

      // Generate filename with date
      const date = new Date().toISOString().split('T')[0];
      
      // Write to browser
      const buffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `LapinouMath_Questions_${date}.xlsx`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
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

    try {
      // Read file with ExcelJS
      const buffer = await file.arrayBuffer();
      const workbook = new ExcelJS.Workbook();
      await workbook.xlsx.load(buffer);
      
      const worksheet = workbook.getWorksheet(1);
      if (!worksheet) {
        setImportStatus('error');
        setImportMessage('❌ Aucune feuille trouvée dans le fichier');
        return;
      }

      const parsedData: unknown[] = [];
      
      // Skip header row (row 1) and iterate through data rows
      worksheet.eachRow((row, rowNumber) => {
        if (rowNumber === 1) return; // Skip header
        
        const values = row.values as unknown[];
        // ExcelJS rows are 1-indexed and first element is undefined
        const rowData = {
          id: values[1]?.toString() || '',
          level: values[2]?.toString() || '',
          domain: values[3]?.toString() || '',
          question: values[4]?.toString() || '',
          option1: values[5]?.toString() || '',
          option2: values[6]?.toString() || '',
          option3: values[7]?.toString() || '',
          option4: values[8]?.toString() || '',
          correctAnswer: values[9]?.toString() || '',
          explanation: values[10]?.toString() || '',
          difficulty: values[11]?.toString() || '2'
        };
        
        parsedData.push(rowData);
      });

      const validQuestions = parsedData.filter(q => q && typeof q === 'object');

      if (validQuestions.length > 0) {
        const importedQuestions = validQuestions.map((q: unknown) => {
          if (typeof q !== 'object' || q === null) throw new Error('Invalid question');
          
          const question = q as Record<string, unknown>;
          const steps = [
            safeString(question.lessonStep1),
            safeString(question.lessonStep2),
            safeString(question.lessonStep3)
          ].filter(Boolean);

          return {
            id: safeString(question.id, crypto.randomUUID()),
            level: safeString(question.level, 'CM1') as GradeLevel,
            domain: safeString(question.domain, 'Calcul') as MathDomain,
            question: safeString(question.question),
            options: [
              safeString(question.option1),
              safeString(question.option2),
              safeString(question.option3),
              safeString(question.option4)
            ],
            correctAnswer: Number.parseInt(safeString(question.correctAnswer, '0'), 10) || 0,
            explanation: safeString(question.explanation),
            lesson: {
              title: safeString(question.lessonTitle),
              steps
            },
            difficulty: (Number.parseInt(safeString(question.difficulty, '2'), 10) || 2) as 1 | 2 | 3
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

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl p-6 mb-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">📊 Import/Export des Questions</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-6">
        {/* Export buttons */}
        <div>
          <button
            onClick={handleExportExcel}
            className="w-full bg-green-500 hover:bg-green-600 text-white text-sm py-2 px-3 rounded transition-colors"
          >
            📊 Excel
          </button>
        </div>

        <div>
          <button
            onClick={handleExportCSV}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white text-sm py-2 px-3 rounded transition-colors"
          >
            📄 CSV
          </button>
        </div>

        {/* Import button */}
        <div>
          <button
            onClick={handleImportClick}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white text-sm py-2 px-3 rounded transition-colors"
          >
            📁 Importer
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".xlsx,.csv"
            onChange={handleFileChange}
            className="hidden"
          />
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
