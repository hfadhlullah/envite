import { motion } from 'framer-motion'

const revealProps = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.6 },
}

function EventCard({ event }) {
  return (
    <article className="rounded-2xl border border-[color:var(--outline-variant-color)]/70 bg-white/70 p-4 text-left">
      <p className="text-[11px] uppercase tracking-[0.18em] text-[color:var(--secondary-color)]">{event.title}</p>
      <p className="mt-2 text-sm text-[color:var(--on-surface-variant-color)]">{event.date}</p>
      <p className="mt-1 font-semibold text-[color:var(--primary-color)]">{event.time}</p>
    </article>
  )
}

export default function EventSection({ data }) {
  return (
    <motion.section {...revealProps} className="invitation-panel h-full p-8 sm:p-10">
      <span className="font-label text-xs uppercase tracking-[0.24em] text-[color:var(--secondary-color)]">Our Love Story</span>
      <h3 className="mt-4 font-headline text-4xl leading-tight text-[color:var(--primary-color)] sm:text-5xl">
        From a simple hello to forever
      </h3>
      <p className="mt-6 max-w-2xl text-sm leading-relaxed text-[color:var(--on-surface-variant-color)] sm:text-base">
        {data.greeting}
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <EventCard event={data.akad} />
        <EventCard event={data.reception} />
      </div>
    </motion.section>
  )
}
