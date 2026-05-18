import { 
  PieChart, Pie, Cell, 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, 
  LineChart, Line 
} from 'recharts'
import './Charts.css'

const COLORS = {
  positive: '#11998e',
  negative: '#ee0979',
  neutral: '#667eea'
}

export default function Charts({ results }) {
  const sentences = results.sentences || []
  const topics = results.topics || {}

  // 1. Sentiment Distribution (Pie Chart)
  const sentimentCounts = sentences.reduce((acc, s) => {
    const sentiment = (s.sentiment || 'NEUTRAL').toUpperCase()
    if (sentiment === 'POSITIVE') acc.positive++
    else if (sentiment === 'NEGATIVE') acc.negative++
    else acc.neutral++
    return acc
  }, { positive: 0, negative: 0, neutral: 0 })

  const pieData = [
    { name: 'Positive', value: sentimentCounts.positive, fill: COLORS.positive },
    { name: 'Negative', value: sentimentCounts.negative, fill: COLORS.negative },
    { name: 'Neutral', value: sentimentCounts.neutral, fill: COLORS.neutral }
  ].filter(d => d.value > 0)

  // 2. Topic Sentiment (Bar Chart)
  const topicData = Object.entries(topics).map(([topic, data]) => ({
    topic: topic.replace(/_/g, ' '),
    mentions: data.mentions || 0,
    sentiment: data.sentiment
  }))

  // 3. Sentiment Trend (Line Chart)
  const trendData = sentences.map((s, idx) => ({
    sentence: `S${idx + 1}`,
    score: s.sentiment === 'POSITIVE' ? 1 : (s.sentiment === 'NEGATIVE' ? -1 : 0)
  }))

  const hasData = pieData.length > 0 || topicData.length > 0

  if (!hasData) return null

  return (
    <div className="result-card">
      <h3>📊 Visualizations</h3>
      
      <div className="charts-grid">
        {pieData.length > 0 && (
          <div className="chart-container">
            <h4>Sentiment Distribution</h4>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={80}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={index} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}

        {topicData.length > 0 && (
          <div className="chart-container">
            <h4>Topic Mentions</h4>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={topicData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="topic" angle={-30} textAnchor="end" height={70} style={{ fontSize: 11 }} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="mentions" fill="#667eea" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {trendData.length > 0 && (
          <div className="chart-container chart-full-width">
            <h4>Sentiment Trend</h4>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="sentence" />
                <YAxis 
                  domain={[-1.5, 1.5]} 
                  ticks={[-1, 0, 1]}
                  tickFormatter={(v) => v === 1 ? 'Pos' : v === -1 ? 'Neg' : 'Neu'}
                />
                <Tooltip 
                  formatter={(value) => value === 1 ? 'Positive' : value === -1 ? 'Negative' : 'Neutral'}
                />
                <Line 
                  type="monotone" 
                  dataKey="score" 
                  stroke="#667eea" 
                  strokeWidth={2}
                  dot={{ fill: '#667eea', r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  )
}
