import SentimentBadge from './SentimentBadge'
import SentenceBreakdown from './SentenceBreakdown'
import TopicSentiment from './TopicSentiment'
import EmotionDetection from './EmotionDetection'
import Charts from './Charts'
import ConversationSummary from './ConversationSummary'
import './ResultsDashboard.css'

export default function ResultsDashboard({ results }) {
  if (!results) return null

  return (
    <div className="results-container">
      <SentimentBadge results={results} />
      
      <ConversationSummary results={results} />

      <div className="grid grid-cols-2">
        <TopicSentiment results={results} />
        <EmotionDetection results={results} />
      </div>

      <Charts results={results} />

      <SentenceBreakdown results={results} />
    </div>
  )
}
