import { motion } from 'framer-motion'
import { useState } from 'react'

export default function WishesSection({ wishes, onAddWish }) {
  const [newWish, setNewWish] = useState({ name: '', message: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!newWish.name || !newWish.message) return
    
    onAddWish(newWish)
    setNewWish({ name: '', message: '' })
  }

  return (
    <section className="rounded-2xl bg-[color:var(--surface-color)] p-6 shadow-sm ring-1 ring-[color:var(--border-color)]/20">
      <h2 className="mb-8 text-center font-headline text-2xl text-[color:var(--primary-color)]">Doa &amp; Ucapan</h2>
      
      <form onSubmit={handleSubmit} className="mb-10 space-y-4">
        <div>
          <label htmlFor="name" className="mb-1 block font-label text-[10px] uppercase tracking-wider text-[color:var(--secondary-color)]">Nama</label>
          <input
            id="name"
            type="text"
            value={newWish.name}
            onChange={(e) => setNewWish({ ...newWish, name: e.target.value })}
            className="w-full rounded-lg border border-[color:var(--outline-variant-color)] bg-[color:var(--surface-low-color)] px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[color:var(--primary-color)]"
            placeholder="Tulis namamu..."
            required
          />
        </div>
        <div>
          <label htmlFor="message" className="mb-1 block font-label text-[10px] uppercase tracking-wider text-[color:var(--secondary-color)]">Ucapan</label>
          <textarea
            id="message"
            value={newWish.message}
            onChange={(e) => setNewWish({ ...newWish, message: e.target.value })}
            className="w-full rounded-lg border border-[color:var(--outline-variant-color)] bg-[color:var(--surface-low-color)] px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[color:var(--primary-color)]"
            placeholder="Kirim ucapan dan doa..."
            rows="3"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full rounded-lg bg-[color:var(--primary-color)] py-2 text-sm font-semibold text-white transition-colors hover:bg-[color:var(--secondary-color)]"
        >
          Kirim Ucapan
        </button>
      </form>

      <div className="max-h-[400px] space-y-4 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-[color:var(--primary-color)]/20">
        {wishes.map((wish, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="rounded-xl bg-[color:var(--surface-container-low-color)] p-4 shadow-sm"
          >
            <div className="mb-2 flex items-center justify-between">
              <h4 className="font-semibold text-[color:var(--primary-color)]">{wish.name}</h4>
              <span className="text-[10px] text-[color:var(--muted-color)]">{wish.date}</span>
            </div>
            <p className="text-sm leading-relaxed text-[color:var(--on-surface-variant-color)]">{wish.message}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
