import { useState } from 'react'
import './SentenceBreakdown.css'

const SENTIMENT_EMOJI = {
  POSITIVE: '😊',
  NEGATIVE: '😞',
  NEUTRAL: '😐'
}

const ITEMS_PER_PAGE = 25

export default function SentenceBreakdown({ results }) {
  const sentences = results.sentences || []
  const [currentPage, setCurrentPage] = useState(1)
  const [filter, setFilter] = useState('ALL')

  const filteredSentences = filter === 'ALL' 
    ? sentences 
    : sentences.filter(s => (s.sentiment || '').toUpperCase() === filter)

  const totalPages = Math.ceil(filteredSentences.length / ITEMS_PER_PAGE)
  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE
  const visibleSentences = filteredSentences.slice(startIdx, startIdx + ITEMS_PER_PAGE)

  const counts = sentences.reduce((acc, s) => {
    const sent = (s.sentiment || 'NEUTRAL').toUpperCase()
    acc[sent] = (acc[sent] || 0) + 1
    return acc
  }, {})

  const handleFilter = (newFilter) => {
    setFilter(newFilter)
    setCurrentPage(1)
  }

  return (
    <div className="result-card">
      <div className="breakdown-header">
        <h3>📝 Sentence-by-Sentence Analysis</h3>
        <div className="filter-tabs">
          <button 
            className={`filter-tab ${filter === 'ALL' ? 'active' : ''}`}
            onClick={() => handleFilter('ALL')}
          >
            All ({sentences.length})
          </button>
          <button 
            className={`filter-tab tab-positive ${filter === 'POSITIVE' ? 'active' : ''}`}
            onClick={() => handleFilter('POSITIVE')}
          >
            😊 {counts.POSITIVE || 0}
          </button>
          <button 
            className={`filter-tab tab-negative ${filter === 'NEGATIVE' ? 'active' : ''}`}
            onClick={() => handleFilter('NEGATIVE')}
          >
            😞 {counts.NEGATIVE || 0}
          </button>
          <button 
            className={`filter-tab tab-neutral ${filter === 'NEUTRAL' ? 'active' : ''}`}
            onClick={() => handleFilter('NEUTRAL')}
          >
            😐 {counts.NEUTRAL || 0}
          </button>
        </div>
      </div>
      
      {filteredSentences.length > 0 ? (
        <>
          <div className="sentences-table">
            <div className="table-header">
              <div className="col-num">#</div>
              <div className="col-text">Sentence</div>
              <div className="col-sentiment">Sentiment</div>
              <div className="col-confidence">Confidence</div>
            </div>
            <div className="table-body">
              {visibleSentences.map((sentence, idx) => {
                const sentiment = (sentence.sentiment || 'NEUTRAL').toUpperCase()
                const actualIdx = startIdx + idx + 1
                return (
                  <div key={actualIdx} className={`table-row row-${sentiment.toLowerCase()}`}>
                    <div className="col-num">{actualIdx}</div>
                    <div className="col-text">{sentence.text}</div>
                    <div className="col-sentiment">
                      <span className={`sentiment-tag tag-${sentiment.toLowerCase()}`}>
                        {SENTIMENT_EMOJI[sentiment]} {sentiment}
                      </span>
                    </div>
                    <div className="col-confidence">
                      {sentence.confidence ? `${Math.round(sentence.confidence * 100)}%` : '-'}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {totalPages > 1 && (
            <div className="pagination">
              <button 
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="page-btn"
              >
                ← Prev
              </button>
              <span className="page-info">
                Page {currentPage} of {totalPages} ({filteredSentences.length} total)
              </span>
              <button 
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="page-btn"
              >
                Next →
              </button>
            </div>
          )}
        </>
      ) : (
        <p className="no-data">No sentences match this filter</p>
      )}
    </div>
  )
}
