import { motion } from 'framer-motion'
import { useCountdown } from '../hooks/useCountdown'

const revealProps = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.6 },
}

function TimeItem({ label, value }) {
  return (
    <div className="flex flex-col items-center">
      <p className="font-headline text-4xl leading-none sm:text-5xl">{value}</p>
      <p className="mt-2 text-[10px] uppercase tracking-[0.18em] opacity-70">{label}</p>
    </div>
  )
}

export default function CountdownSection({ targetDate }) {
  const { days, hours, minutes, seconds, isComplete } = useCountdown(targetDate)

  return (
    <motion.section
      {...revealProps}
      className="flex h-full flex-col items-center justify-center rounded-[1.5rem] bg-[color:var(--primary-color)] px-6 py-8 text-center text-white sm:px-7"
    >
      <p className="font-label text-[11px] uppercase tracking-[0.22em] opacity-75">Counting Down the Days</p>

      {isComplete ? (
        <p className="mt-8 font-headline text-2xl italic">Hari bahagia telah tiba.</p>
      ) : (
        <div className="mt-8 grid w-full grid-cols-2 gap-y-7">
          <TimeItem label="Days" value={days} />
          <TimeItem label="Hours" value={hours} />
          <TimeItem label="Minutes" value={minutes} />
          <TimeItem label="Seconds" value={seconds} />
        </div>
      )}

      <div className="mt-8 h-px w-full bg-white/25" />
      <p className="mt-6 font-headline text-lg italic">See you soon!</p>
    </motion.section>
  )
}
