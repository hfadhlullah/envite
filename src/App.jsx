import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import CoverScreen from './components/CoverScreen'
import ThemeSelector from './components/ThemeSelector'
import HeroSection from './components/HeroSection'
import EventSection from './components/EventSection'
import VenueSection from './components/VenueSection'
import CountdownSection from './components/CountdownSection'
import RSVPSection from './components/RSVPSection'
import ContactSection from './components/ContactSection'
import MusicPlayer from './components/MusicPlayer'
import SlideshowSection from './components/SlideshowSection'
import WishesSection from './components/WishesSection'
import AdminDashboard from './components/AdminDashboard'
import { invitationData } from './data/invitationData'
import { defaultThemeId, themeOptions, themes } from './data/themes'
import { getGuestName, getInitialThemeId } from './utils/queryParams'
import { wishService } from './utils/wishService'

const themeIds = Object.keys(themes)

function InvitationContent({ isOpened, setIsOpened, themeId, setThemeId, wishes, onAddWish }) {
  const guestName = useMemo(() => getGuestName(), [])
  const activeTheme = themes[themeId]

  const appStyles = useMemo(
    () => ({
      '--bg-color': activeTheme.colors.background,
      '--bg-alt-color': activeTheme.colors.backgroundAlt,
      '--surface-color': activeTheme.colors.surface,
      '--surface-low-color': activeTheme.colors.surfaceLow,
      '--surface-container-color': activeTheme.colors.surfaceContainer,
      '--surface-container-low-color': activeTheme.colors.surfaceContainerLow,
      '--text-color': activeTheme.colors.text,
      '--on-surface-color': activeTheme.colors.onSurface,
      '--on-surface-variant-color': activeTheme.colors.onSurfaceVariant,
      '--muted-color': activeTheme.colors.muted,
      '--primary-color': activeTheme.colors.primary,
      '--secondary-color': activeTheme.colors.secondary,
      '--accent-color': activeTheme.colors.accent,
      '--accent-soft-color': activeTheme.colors.accentSoft,
      '--border-color': activeTheme.colors.border,
      '--outline-variant-color': activeTheme.colors.outlineVariant,
      '--envelope-color': activeTheme.colors.envelope,
      '--envelope-flap-color': activeTheme.colors.envelopeFlap,
      '--font-heading': activeTheme.fonts.heading,
      '--font-body': activeTheme.fonts.body,
      color: activeTheme.colors.onSurface,
      fontFamily: activeTheme.fonts.body,
      backgroundImage: `linear-gradient(180deg, ${activeTheme.colors.background} 0%, ${activeTheme.colors.backgroundAlt} 100%)`,
    }),
    [activeTheme],
  )

  return (
    <div className="min-h-screen" style={appStyles}>
      <ThemeSelector options={themeOptions} selectedThemeId={themeId} onThemeChange={setThemeId} />
      <MusicPlayer url={invitationData.audioUrl} isOpened={isOpened} />

      <AnimatePresence mode="wait">
        {!isOpened ? (
          <motion.div
            key="cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.4 }}
          >
            <CoverScreen guestName={guestName} onOpen={() => setIsOpened(true)} data={invitationData} />
          </motion.div>
        ) : (
          <motion.main
            key="invitation"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden px-4 pb-24 pt-28 sm:px-6"
          >
            <div className="floral-layer">
              <div className="floral-corner floral-top-left" />
              <div className="floral-corner floral-top-right" />
              <div className="floral-corner floral-bottom-left" />
              <div className="floral-corner floral-bottom-right" />
            </div>

            <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-6 sm:gap-7">
              <HeroSection data={invitationData} />

              <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
                <div className="md:col-span-8">
                  <EventSection data={invitationData} />
                </div>

                <div className="md:col-span-4">
                  <CountdownSection targetDate={invitationData.countdownTarget} />
                </div>

                <div className="md:col-span-6">
                  <VenueSection venue={invitationData.venue} />
                </div>

                <div className="md:col-span-6">
                  <RSVPSection rsvpUrl={invitationData.rsvpUrl} deadline={invitationData.rsvpDeadline} />
                </div>

                <div className="md:col-span-12">
                  <SlideshowSection images={invitationData.preWeddingImages} />
                </div>

                <div className="md:col-span-12">
                  <WishesSection wishes={wishes} onAddWish={onAddWish} />
                </div>
              </div>

              <ContactSection contact={invitationData.contact} />
            </div>
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  )
}

function App() {
  const [isOpened, setIsOpened] = useState(false)
  const [themeId, setThemeId] = useState(() => getInitialThemeId(themeIds, defaultThemeId))
  const [wishes, setWishes] = useState([])

  useEffect(() => {
    const fetchWishes = async () => {
      const data = await wishService.getWishes()
      setWishes(data)
    }
    fetchWishes()
  }, [])

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    params.set('style', themeId)

    const nextUrl = `${window.location.pathname}?${params.toString()}${window.location.hash}`
    window.history.replaceState({}, '', nextUrl)
  }, [themeId])

  const handleAddWish = async (wish) => {
    try {
      const newWish = await wishService.addWish(wish)
      setWishes((prev) => [newWish, ...prev])
    } catch (e) {
      alert('Gagal mengirim ucapan. Silakan coba lagi.')
    }
  }

  const handleDeleteWish = async (id) => {
    try {
      await wishService.deleteWish(id)
      setWishes((prev) => prev.filter((w) => w.id !== id))
    } catch (e) {
      alert('Gagal menghapus ucapan.')
    }
  }

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={
            <InvitationContent 
              isOpened={isOpened} 
              setIsOpened={setIsOpened} 
              themeId={themeId} 
              setThemeId={setThemeId} 
              wishes={wishes}
              onAddWish={handleAddWish}
            />
          } 
        />
        <Route 
          path="/admin" 
          element={
            <div style={{ '--bg-color': themes[themeId].colors.background }}>
              <AdminDashboard wishes={wishes} onDeleteWish={handleDeleteWish} />
            </div>
          } 
        />
      </Routes>
    </Router>
  )
}

export default App
