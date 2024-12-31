import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'

const AuthForm: React.FC = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { user, login, logout } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (user) {
      logout()
    } else {
      // In a real application, you'd make an API call here
      login(username)
    }
    setUsername('')
    setPassword('')
  }

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      {!user ? (
        <>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="mr-2 p-2 border rounded"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="mr-2 p-2 border rounded"
          />
          <button type="submit" className="p-2 bg-blue-500 text-white rounded">
            Login / Signup
          </button>
        </>
      ) : (
        <>
          <span className="mr-2">Logged in as {user}</span>
          <button type="submit" className="p-2 bg-red-500 text-white rounded">
            Logout
          </button>
        </>
      )}
    </form>
  )
}

export default AuthForm

