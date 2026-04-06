import { motion } from 'framer-motion'

const revealProps = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.6 },
}

export default function RSVPSection({ rsvpUrl, deadline }) {
  return (
    <motion.section
      {...revealProps}
      className="flex h-full flex-col justify-between rounded-[1.5rem] bg-[color:var(--secondary-color)] px-7 py-8 text-[color:var(--surface-color)] sm:px-9"
    >
      <div className="space-y-4">
        <p className="font-label text-[11px] uppercase tracking-[0.2em] text-white/75">RSVP</p>
        <h3 className="font-headline text-4xl leading-tight text-white">Will you join our celebration?</h3>
        <p className="text-sm leading-relaxed text-white/85">
          Kami akan sangat bahagia jika Anda berkenan hadir. Silakan konfirmasi kehadiran melalui tombol di bawah ini.
        </p>
        <p className="text-xs uppercase tracking-[0.16em] text-white/70">{deadline}</p>
      </div>

      <a
        href={rsvpUrl}
        target="_blank"
        rel="noreferrer"
        className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-4 text-xs font-bold uppercase tracking-[0.18em] text-[color:var(--secondary-color)] transition hover:shadow-lg"
      >
        RSVP NOW <span aria-hidden="true">→</span>
      </a>
    </motion.section>
  )
}
