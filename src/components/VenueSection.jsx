import { motion } from 'framer-motion'

const revealProps = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.6 },
}

export default function VenueSection({ venue }) {
  return (
    <motion.section {...revealProps} className="group relative min-h-[340px] overflow-hidden rounded-[1.5rem]">
      <div className="absolute inset-0 bg-gradient-to-br from-[color:var(--surface-container-color)] via-[color:var(--surface-container-low-color)] to-[color:var(--accent-soft-color)]" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[color:var(--primary-color)]/18 blur-3xl transition-transform duration-700 group-hover:scale-110" />

      <div className="relative flex h-full flex-col justify-end p-7 text-left text-white sm:p-8">
        <p className="font-label text-[11px] uppercase tracking-[0.2em] text-white/80">The Ceremony</p>
        <h3 className="mt-3 font-headline text-3xl leading-tight sm:text-4xl">{venue.name}</h3>
        <p className="mt-3 max-w-md text-sm text-white/80">{venue.address}</p>

        <a
          href={venue.mapsUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-7 inline-flex w-fit items-center rounded-full border border-white/45 bg-white/20 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-white/30"
        >
          Open Maps
        </a>
      </div>
    </motion.section>
  )
}
