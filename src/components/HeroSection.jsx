import { motion } from 'framer-motion'

const revealProps = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.35 },
  transition: { duration: 0.6 },
}

export default function HeroSection({ data }) {
  return (
    <motion.section {...revealProps} className="invitation-panel px-7 py-12 text-center sm:px-12">
      <div className="mx-auto flex max-w-2xl items-center justify-center gap-4 text-[color:var(--secondary-color)]">
        <span className="h-px w-8 bg-current/50" />
        <span className="text-sm">♡</span>
        <span className="h-px w-8 bg-current/50" />
      </div>

      <h2 className="mt-7 font-headline text-3xl text-[color:var(--on-surface-color)] sm:text-4xl">{data.storyTitle}</h2>
      <p className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-[color:var(--on-surface-variant-color)] sm:text-lg">
        {data.ceremonyNote}
      </p>
      <p className="mx-auto mt-5 max-w-3xl text-sm leading-relaxed text-[color:var(--muted-color)]">{data.storyDescription}</p>
    </motion.section>
  )
}
