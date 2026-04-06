import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function MusicPlayer({ url, isOpened }) {
  const audioRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)

  useEffect(() => {
    if (isOpened && audioRef.current) {
      const playPromise = audioRef.current.play()
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch((error) => {
            console.log('Autoplay blocked by browser. User interaction needed.', error)
          })
      }
    }
  }, [isOpened])

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const isVideo = url?.endsWith('.mp4')

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isVideo ? (
        <video ref={audioRef} src={url} loop playsInline className="hidden" />
      ) : (
        <audio ref={audioRef} src={url} loop className="hidden" />
      )}

      <AnimatePresence>
        {isOpened && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={togglePlay}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-[color:var(--primary-color)] text-white shadow-lg backdrop-blur-md transition-colors hover:bg-[color:var(--secondary-color)]"
            aria-label={isPlaying ? 'Pause Music' : 'Play Music'}
          >
            {isPlaying ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                className="flex items-center justify-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 18V5l12-2v13" />
                  <circle cx="6" cy="18" r="3" />
                  <circle cx="18" cy="16" r="3" />
                </svg>
              </motion.div>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
            )}
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}
