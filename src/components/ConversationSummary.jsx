import './ConversationSummary.css'

export default function ConversationSummary({ results }) {
  const summary = results.summary || 'No summary available'
  const urgency = results.urgency_level || 'LOW'
  const trend = results.sentiment_trend || 'Stable'
  const language = (results.language_detected || 'Unknown').toUpperCase()
  const totalSentences = results.sentences?.length || 0

  const urgencyClass = {
    'HIGH': 'urgency-high',
    'MEDIUM': 'urgency-medium',
    'LOW': 'urgency-low'
  }[urgency] || 'urgency-low'

  return (
    <div className="result-card summary-card">
      <h3>📋 Summary & KPIs</h3>
      
      <div className="summary-grid">
        <div className="summary-text">
          <div className="label">Conversation Summary</div>
          <p>{summary}</p>
        </div>

        <div className="kpis">
          <div className={`kpi-card ${urgencyClass}`}>
            <div className="kpi-label">Urgency</div>
            <div className="kpi-value">{urgency}</div>
          </div>

          <div className="kpi-card">
            <div className="kpi-label">Trend</div>
            <div className="kpi-value-small">{trend}</div>
          </div>

          <div className="kpi-card">
            <div className="kpi-label">Language</div>
            <div className="kpi-value">{language}</div>
          </div>

          <div className="kpi-card">
            <div className="kpi-label">Sentences</div>
            <div className="kpi-value">{totalSentences}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
