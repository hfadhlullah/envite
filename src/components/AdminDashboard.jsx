import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function AdminDashboard({ wishes, onDeleteWish }) {
  const [password, setPassword] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = (e) => {
    e.preventDefault()
    if (password === 'admin123') { // Simple placeholder password
      setIsAuthenticated(true)
      setError('')
    } else {
      setError('Invalid password')
    }
  }

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this wish?')) {
      onDeleteWish(id)
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[color:var(--bg-color)] px-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md rounded-2xl bg-[color:var(--surface-color)] p-8 shadow-xl ring-1 ring-[color:var(--border-color)]/20"
        >
          <h2 className="mb-6 text-center font-headline text-3xl text-[color:var(--primary-color)]">Admin Login</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="mb-1 block font-label text-xs uppercase tracking-widest text-[color:var(--secondary-color)]">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-[color:var(--outline-variant-color)] bg-[color:var(--surface-low-color)] px-4 py-2 focus:outline-none focus:ring-1 focus:ring-[color:var(--primary-color)]"
                placeholder="Enter admin password"
                required
              />
              {error && <p className="mt-2 text-xs text-red-500">{error}</p>}
            </div>
            <button
              type="submit"
              className="w-full rounded-lg bg-[color:var(--primary-color)] py-2 font-semibold text-white transition-colors hover:bg-[color:var(--secondary-color)]"
            >
              Login
            </button>
          </form>
          <p className="mt-6 text-center text-xs text-[color:var(--muted-color)]">
            Default password: <code className="bg-[color:var(--surface-container-low-color)] px-1">admin123</code>
          </p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[color:var(--bg-color)] p-6 sm:p-10">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 flex items-center justify-between">
          <h2 className="font-headline text-4xl text-[color:var(--primary-color)]">Manage Wishes</h2>
          <button 
            onClick={() => setIsAuthenticated(false)}
            className="rounded-lg border border-[color:var(--outline-variant-color)] px-4 py-2 text-sm text-[color:var(--muted-color)] hover:bg-[color:var(--surface-container-low-color)]"
          >
            Logout
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {wishes.map((wish, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="group relative flex flex-col justify-between rounded-xl bg-[color:var(--surface-color)] p-5 shadow-sm ring-1 ring-[color:var(--border-color)]/20 hover:shadow-md"
            >
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <h4 className="font-semibold text-[color:var(--primary-color)]">{wish.name}</h4>
                  <span className="text-[10px] text-[color:var(--muted-color)]">{wish.date}</span>
                </div>
                <p className="text-sm leading-relaxed text-[color:var(--on-surface-variant-color)]">{wish.message}</p>
              </div>
              
              <div className="mt-4 flex items-center justify-end border-t border-[color:var(--border-color)]/10 pt-3">
                <button
                  onClick={() => handleDelete(wish.id)}
                  className="rounded-md p-1.5 text-red-400 transition-colors hover:bg-red-50 hover:text-red-600"
                  title="Delete Wish"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
                </button>
              </div>
            </motion.div>
          ))}
          
          {wishes.length === 0 && (
            <div className="col-span-full py-20 text-center">
              <p className="text-[color:var(--muted-color)]">No wishes found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
