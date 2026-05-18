import { useState } from 'react'
import './LoginPage.css'

export default function LoginPage({ onLogin }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onLogin(username, password)
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>📊 Sentiment Analyzer</h1>
        <p className="subtitle">AI-powered Conversation Sentiment Analysis Platform</p>
        <p className="languages">Supports: English • Hindi • Hinglish</p>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              autoComplete="username"
            />
          </div>
          
          <div className="form-group">
            <label>Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              autoComplete="current-password"
            />
          </div>
          
          <button type="submit" className="btn-login">Sign In</button>
        </form>
        
        
      </div>
    </div>
  )
}
