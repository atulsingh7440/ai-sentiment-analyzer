import './SentimentBadge.css'

export default function SentimentBadge({ results }) {
  const sentiment = (results.overall_sentiment || 'NEUTRAL').toUpperCase()
  const confidence = results.confidence ? (results.confidence * 100).toFixed(0) : '0'
  const score = results.satisfaction_score ?? 0

  const sentimentClass = {
    'POSITIVE': 'positive',
    'NEGATIVE': 'negative',
    'NEUTRAL': 'neutral'
  }[sentiment] || 'neutral'

  const sentimentEmoji = {
    'POSITIVE': '😊',
    'NEGATIVE': '😞',
    'NEUTRAL': '😐'
  }[sentiment] || '😐'

  return (
    <div className={`sentiment-badge ${sentimentClass}`}>
      <div className="badge-content">
        <div className="emoji">{sentimentEmoji}</div>
        <div className="sentiment-info">
          <div className="label">OVERALL SENTIMENT</div>
          <div className="sentiment-value">{sentiment}</div>
          <div className="meta">
            <span>Confidence: {confidence}%</span>
            <span className="dot">•</span>
            <span>Satisfaction: {score}/100</span>
          </div>
        </div>
      </div>
    </div>
  )
}
