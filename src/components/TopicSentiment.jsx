import './TopicSentiment.css'

export default function TopicSentiment({ results }) {
  const topics = results.topics || {}
  const topicEntries = Object.entries(topics)

  return (
    <div className="result-card">
      <h3>📌 Topics & Sentiment</h3>
      {topicEntries.length > 0 ? (
        <div className="topics-list">
          {topicEntries.map(([topic, data]) => (
            <div key={topic} className={`topic-item topic-${(data.sentiment || 'neutral').toLowerCase()}`}>
              <div className="topic-info">
                <div className="topic-name">{topic.replace(/_/g, ' ')}</div>
                <div className="topic-mentions">{data.mentions} mention{data.mentions !== 1 ? 's' : ''}</div>
              </div>
              <span className={`sentiment-tag tag-${(data.sentiment || 'neutral').toLowerCase()}`}>
                {data.sentiment}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-data">No topics identified</p>
      )}
    </div>
  )
}
