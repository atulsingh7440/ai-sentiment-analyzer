import { useRef, useState } from 'react'
import './FileUpload.css'

const MAX_FILE_SIZE = 500 * 1024 // 500KB (~ 50 pages of conversation)
const WARN_FILE_SIZE = 200 * 1024 // 200KB (~ 20 pages)

export default function FileUpload({ onUpload, loading }) {
  const fileInputRef = useRef(null)
  const [isDragging, setIsDragging] = useState(false)
  const [fileInfo, setFileInfo] = useState(null)

  const handleFile = (file) => {
    if (!file) return
    
    if (!file.name.endsWith('.txt')) {
      alert('Please select a .txt file')
      return
    }
    
    if (file.size > MAX_FILE_SIZE) {
      alert(`File too large (${(file.size / 1024).toFixed(0)}KB). Maximum size: 500KB (~50 pages)`)
      return
    }
    
    const sizeKB = (file.size / 1024).toFixed(1)
    const estimatedPages = Math.ceil(file.size / 3000) // ~3000 chars per page
    
    setFileInfo({
      name: file.name,
      size: `${sizeKB} KB`,
      pages: `~${estimatedPages} page${estimatedPages !== 1 ? 's' : ''}`,
      large: file.size > WARN_FILE_SIZE
    })
    
    onUpload(file)
  }

  const handleFileChange = (e) => {
    handleFile(e.target.files?.[0])
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    handleFile(e.dataTransfer.files?.[0])
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  return (
    <div className="file-upload">
      <div 
        className={`upload-box ${isDragging ? 'dragging' : ''}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <div className="upload-icon">📁</div>
        <h2>Upload Conversation</h2>
        <p>Drag & drop your .txt file here or click to browse</p>
        <small>Max 500KB (~50 pages) • English • Hindi • Hinglish</small>
        
        <input
          ref={fileInputRef}
          type="file"
          accept=".txt"
          onChange={handleFileChange}
          style={{ display: 'none' }}
          disabled={loading}
        />
        
        <button 
          className="btn-select"
          onClick={() => fileInputRef.current?.click()}
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Select File'}
        </button>

        {fileInfo && (
          <div className="file-info">
            <p className="file-name">📎 {fileInfo.name}</p>
            <p className="file-stats">
              {fileInfo.size} • {fileInfo.pages}
              {fileInfo.large && <span className="warn"> • Large file</span>}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
