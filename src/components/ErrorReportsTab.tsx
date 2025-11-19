import { useState, useEffect } from 'react';
import { getErrorReports, deleteErrorReport, ErrorReport } from '../utils/database';
import emailjs from '@emailjs/browser';
import '../styles/ErrorReportsTab.css';

export default function ErrorReportsTab() {
  const [reports, setReports] = useState<ErrorReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [selectedReports, setSelectedReports] = useState<Set<number>>(new Set());
  const [sendStatus, setSendStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  useEffect(() => {
    loadReports();
  }, []);

  const loadReports = async () => {
    try {
      setLoading(true);
      const data = await getErrorReports();
      // Sort by timestamp, newest first
      const sorted = [...data].sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
      setReports(sorted);
    } catch (error) {
      console.error('Erreur lors du chargement des rapports:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleReportSelection = (index: number) => {
    const newSelected = new Set(selectedReports);
    if (newSelected.has(index)) {
      newSelected.delete(index);
    } else {
      newSelected.add(index);
    }
    setSelectedReports(newSelected);
  };

  const toggleAllReports = () => {
    if (selectedReports.size === reports.length) {
      setSelectedReports(new Set());
    } else {
      setSelectedReports(new Set(reports.map((_, i) => i)));
    }
  };

  const deleteSelectedReports = async () => {
    if (selectedReports.size === 0) return;
    
    try {
      // Delete reports by index (reverse order to avoid index shifting)
      const indicesToDelete = Array.from(selectedReports).sort((a, b) => b - a);
      
      for (const index of indicesToDelete) {
        const report = reports[index];
        if (report.id) {
          await deleteErrorReport(report.id);
        }
      }

      // Reload reports
      await loadReports();
      setSelectedReports(new Set());
      setStatusMessage('Rapports supprimés');
      setSendStatus('success');
      setTimeout(() => setSendStatus('idle'), 2000);
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
      setStatusMessage('Erreur lors de la suppression');
      setSendStatus('error');
    }
  };

  const sendReportsViaEmail = async () => {
    if (selectedReports.size === 0) {
      setStatusMessage('Veuillez sélectionner au moins un rapport');
      setSendStatus('error');
      return;
    }

    try {
      setSending(true);
      const reportsToSend = Array.from(selectedReports).map(index => reports[index]);

      // Format the reports for email
      const reportText = reportsToSend.map((r, i) => `
Rapport ${i + 1}:
- Niveau: ${r.level}
- Domaine: ${r.domain}
- Question: ${r.questionText}
- Note: ${r.userNote}
- Date: ${new Date(r.timestamp || 0).toLocaleString()}
      `).join('\n---\n');

      // Initialize EmailJS
      emailjs.init({
        publicKey: 'YOUR_PUBLIC_KEY_HERE', // User will need to configure this
      });

      // Send email
      await emailjs.send(
        'service_lapinoumath',
        'template_error_report',
        {
          to_email: 'your-email@example.com', // Configure this
          reports_count: reportsToSend.length,
          reports_text: reportText,
        }
      );

      setStatusMessage(`${reportsToSend.length} rapport(s) envoyé(s) avec succès`);
      setSendStatus('success');
      
      // Delete sent reports
      await deleteSelectedReports();
      setSelectedReports(new Set());
    } catch (error) {
      console.error('Erreur lors de l\'envoi:', error);
      setStatusMessage('Erreur: EmailJS non configuré. Veuillez configurer vos credentials EmailJS.');
      setSendStatus('error');
    } finally {
      setSending(false);
      setTimeout(() => setSendStatus('idle'), 3000);
    }
  };

  const exportReportsAsJSON = () => {
    const reportsToExport = Array.from(selectedReports).length > 0
      ? Array.from(selectedReports).map(index => reports[index])
      : reports;

    const dataStr = JSON.stringify(reportsToExport, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `error-reports-${Date.now()}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return <div className="error-reports-tab">Chargement des rapports...</div>;
  }

  return (
    <div className="error-reports-tab">
      <div className="reports-header">
        <h2>Rapports d'erreurs signalées</h2>
        <p className="reports-count">Total: {reports.length} rapport(s)</p>
      </div>

      {reports.length === 0 ? (
        <div className="no-reports">Aucun rapport d'erreur signalé</div>
      ) : (
        <>
          <div className="reports-actions">
            <button 
              className="checkbox-btn"
              onClick={toggleAllReports}
            >
              {selectedReports.size === reports.length ? '✓ Tout désélectionner' : '☐ Tout sélectionner'}
            </button>
            
            <div className="action-buttons">
              <button
                className="btn btn-export"
                onClick={exportReportsAsJSON}
                disabled={reports.length === 0}
              >
                📥 Exporter JSON
              </button>

              <button
                className="btn btn-email"
                onClick={sendReportsViaEmail}
                disabled={selectedReports.size === 0 || sending}
              >
                {sending ? '⏳ Envoi...' : '📧 Envoyer par email'}
              </button>

              <button
                className="btn btn-delete"
                onClick={deleteSelectedReports}
                disabled={selectedReports.size === 0}
              >
                🗑️ Supprimer sélectionnés ({selectedReports.size})
              </button>
            </div>
          </div>

          {sendStatus !== 'idle' && (
            <div className={`status-message ${sendStatus}`}>
              {sendStatus === 'success' ? '✓' : '✗'} {statusMessage}
            </div>
          )}

          <div className="reports-list">
            {reports.map((report, index) => (
              <div 
                key={index} 
                className={`report-item ${selectedReports.has(index) ? 'selected' : ''}`}
              >
                <input
                  type="checkbox"
                  checked={selectedReports.has(index)}
                  onChange={() => toggleReportSelection(index)}
                  className="report-checkbox"
                />
                
                <div className="report-content">
                  <div className="report-meta">
                    <span className="badge level">{report.level}</span>
                    <span className="badge domain">{report.domain}</span>
                    <span className="timestamp">
                      {new Date(report.timestamp || 0).toLocaleString('fr-FR')}
                    </span>
                  </div>
                  
                  <div className="report-question">
                    <strong>Question:</strong> {report.questionText}
                  </div>
                  
                  <div className="report-note">
                    <strong>Note:</strong> {report.userNote}
                  </div>

                  <div className="report-id">
                    ID: {report.questionId}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
