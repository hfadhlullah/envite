import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'

const OPEN_DURATION_MS = 920

export default function EnvelopeIntro({ onOpen, names, venueName }) {
  const [isAnimating, setIsAnimating] = useState(false)

  const shortNames = useMemo(
    () =>
      names
        .split('&')
        .map((name) => name.trim().split(' ')[0])
        .filter(Boolean)
        .join(' & '),
    [names],
  )

  const monogram = useMemo(() => {
    const initials = names
      .split('&')
      .map((part) => part.trim()[0])
      .filter(Boolean)
      .join('&')
      .toUpperCase()

    return initials || 'W'
  }, [names])

  const handleOpen = () => {
    if (isAnimating) return

    setIsAnimating(true)
    window.setTimeout(() => onOpen(), OPEN_DURATION_MS)
  }

  return (
    <div className="flex w-full flex-col items-center">
      <motion.button
        type="button"
        onClick={handleOpen}
        whileTap={{ scale: 0.99 }}
        className={`group relative w-full max-w-[540px] cursor-pointer ${isAnimating ? 'is-opening' : ''}`}
      >
        <div className="envelope-wrapper">
          <div className="envelope-shadow" />

          <div className={`envelope ${isAnimating ? 'is-opening' : ''}`}>
            <div className="invitation-card-inner rounded-md">
              <div className="invitation-card-frame">
                <span className="card-note">You are cordially invited</span>
                <div className="card-divider" />
                <h3 className="card-couple">{shortNames}</h3>
                <p className="card-venue">
                  To witness the union of our lives
                  <span>{venueName}</span>
                </p>
                <div className="card-icons" aria-hidden="true">
                  <span>✦</span>
                  <span>⌖</span>
                  <span>♡</span>
                </div>
              </div>
            </div>

            <div className="envelope-front rounded-lg" />
            <div className="envelope-flap rounded-t-lg" />

            <div className="monogram-seal">
              <span>{monogram}</span>
            </div>
          </div>
        </div>

        <div className="interaction-hint mt-14 flex flex-col items-center gap-3">
          <div className="flex items-center gap-4">
            <span className="hint-line" />
            <span className="hint-text">Tap to reveal invitation</span>
            <span className="hint-line" />
          </div>
          <div className="hint-dot">
            <span className="hint-arrow">⌄</span>
          </div>
        </div>
      </motion.button>

      <p className="envelope-hint mt-4">{isAnimating ? 'Membuka undangan...' : 'Sentuh amplop untuk membuka'}</p>
    </div>
  )
}
