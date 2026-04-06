import { motion } from 'framer-motion'
import { useState } from 'react'

export default function SlideshowSection({ images }) {
  const [index, setIndex] = useState(0)

  const next = () => setIndex((prev) => (prev + 1) % images.length)
  const prev = () => setIndex((prev) => (prev - 1 + images.length) % images.length)

  return (
    <section className="relative overflow-hidden rounded-2xl bg-[color:var(--surface-color)] p-6 shadow-sm ring-1 ring-[color:var(--border-color)]/20">
      <h2 className="mb-8 text-center font-headline text-2xl text-[color:var(--primary-color)]">Moments Together</h2>
      
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-[color:var(--surface-low-color)] sm:aspect-[16/9]">
        <motion.img
          key={index}
          src={images[index].url}
          alt={images[index].caption}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 h-full w-full object-cover"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        
        <div className="absolute bottom-4 left-4 right-4 text-center text-white">
          <p className="font-label text-sm uppercase tracking-widest">{images[index].caption}</p>
        </div>

        {/* Navigation */}
        <button 
          onClick={prev}
          className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-2 text-white backdrop-blur-sm transition-colors hover:bg-white/40"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        </button>
        <button 
          onClick={next}
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-2 text-white backdrop-blur-sm transition-colors hover:bg-white/40"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
        </button>
      </div>

      <div className="mt-4 flex justify-center gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-1.5 rounded-full transition-all ${i === index ? 'w-6 bg-[color:var(--primary-color)]' : 'w-1.5 bg-[color:var(--border-color)]'}`}
          />
        ))}
      </div>
    </section>
  )
}
