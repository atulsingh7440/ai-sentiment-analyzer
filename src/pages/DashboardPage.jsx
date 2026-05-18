import { useState } from 'react'
import FileUpload from '../components/FileUpload'
import ResultsDashboard from '../components/ResultsDashboard'
import './DashboardPage.css'

export default function DashboardPage({ onLogout }) {
  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleFileUpload = async (file) => {
    if (!file) return

    setLoading(true)
    setError('')
    setResults(null)
    
    try {
      const text = await file.text()
      
      const webhookUrl = import.meta.env.VITE_N8N_WEBHOOK_URL
      
      if (!webhookUrl) {
        throw new Error('n8n webhook URL not configured. Check .env file.')
      }
      
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
      })

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}: ${response.statusText}`)
      }

      const data = await response.json()
      setResults(data)
    } catch (err) {
      const errorMsg = err.message || 'Failed to analyze conversation'
      setError(errorMsg)
      console.error('Analysis error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>📊 Sentiment Analyzer</h1>
        <button className="btn-logout" onClick={onLogout}>Logout</button>
      </header>

      <div className="container">
        <FileUpload onUpload={handleFileUpload} loading={loading} />

        {loading && (
          <div className="loading-card">
            <div className="spinner"></div>
            <p>Analyzing conversation with AI...</p>
          </div>
        )}

        {error && (
          <div className="error-card">
            <strong>⚠️ Error:</strong> {error}
            <div className="error-hint">
              Make sure n8n workflow is running and Groq API key is configured.
            </div>
          </div>
        )}

        {results && !loading && (
          <ResultsDashboard results={results} />
        )}

        {!results && !loading && !error && (
          <div className="empty-state">
            <div className="empty-icon">📄</div>
            <h2>Ready to Analyze</h2>
            <p>Upload a conversation file (.txt) to begin analysis</p>
            <small>Supports English, Hindi, and Hinglish conversations</small>
          </div>
        )}
      </div>
    </div>
  )
}
