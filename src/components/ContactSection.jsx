import { motion } from 'framer-motion'

const revealProps = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.6 },
}

export default function ContactSection({ contact }) {
  return (
    <motion.footer {...revealProps} className="invitation-panel px-7 py-10 text-center sm:px-10">
      <p className="font-headline text-3xl italic text-[color:var(--secondary-color)]">Ardi &amp; Citra</p>
      <p className="mx-auto mt-4 max-w-2xl text-sm text-[color:var(--on-surface-variant-color)]">
        Untuk informasi tambahan, silakan hubungi keluarga kami melalui WhatsApp.
      </p>

      <a
        href={contact.whatsappUrl}
        target="_blank"
        rel="noreferrer"
        className="mt-6 inline-flex items-center rounded-full border border-[color:var(--outline-variant-color)] bg-[color:var(--surface-color)] px-6 py-3 text-xs font-semibold uppercase tracking-[0.17em] text-[color:var(--primary-color)] transition hover:border-[color:var(--primary-color)]/50 hover:shadow-sm"
      >
        Chat via WhatsApp ({contact.name})
      </a>

      <p className="mt-7 text-[11px] uppercase tracking-[0.18em] text-[color:var(--muted-color)]">
        © 2026 Made with love · Modern Heirloom Style
      </p>
    </motion.footer>
  )
}
