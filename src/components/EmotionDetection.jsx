import './EmotionDetection.css'

const EMOTION_EMOJIS = {
  joy: '😊',
  anger: '😠',
  frustration: '😤',
  satisfaction: '😌',
  sadness: '😢',
  fear: '😨'
}

export default function EmotionDetection({ results }) {
  const emotions = results.emotions || {}

  const sortedEmotions = Object.entries(emotions)
    .map(([name, score]) => ({
      name,
      score: Math.round((score || 0) * 100),
      emoji: EMOTION_EMOJIS[name.toLowerCase()] || '😐'
    }))
    .sort((a, b) => b.score - a.score)

  return (
    <div className="result-card">
      <h3>💭 Emotion Detection</h3>
      {sortedEmotions.length > 0 ? (
        <div className="emotions-list">
          {sortedEmotions.map(({ name, score, emoji }) => (
            <div key={name} className="emotion-item">
              <div className="emotion-row">
                <span className="emotion-label">
                  <span className="emotion-emoji">{emoji}</span>
                  <span className="emotion-name">{name.charAt(0).toUpperCase() + name.slice(1)}</span>
                </span>
                <span className="emotion-score">{score}%</span>
              </div>
              <div className="emotion-bar">
                <div className="emotion-fill" style={{ width: `${score}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-data">No emotions detected</p>
      )}
    </div>
  )
}
