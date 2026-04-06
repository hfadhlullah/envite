import EnvelopeIntro from './EnvelopeIntro'

export default function CoverScreen({ guestName, onOpen, data }) {
  const shortCoupleName = `${data.groomName.split(' ')[0]} & ${data.brideName.split(' ')[0]}`

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[color:var(--surface-low-color)] px-4 pb-20 pt-28 sm:px-6">
      <div className="hero-floral hero-floral-top" />
      <div className="hero-floral hero-floral-bottom" />

      <div className="relative z-10 mx-auto w-full max-w-5xl text-center">
        <p className="mb-6 font-label text-xs uppercase tracking-[0.38em] text-[color:var(--secondary-color)] sm:text-sm">
          {data.celebrationLabel}
        </p>

        <h1 className="font-headline text-[2.8rem] leading-[1.05] text-[color:var(--primary-color)] sm:text-[4.1rem] md:text-[5.2rem]">
          {data.groomName.split(' ')[0]}
          <span className="mx-2 inline-block font-normal italic text-[color:var(--secondary-color)]">&amp;</span>
          {data.brideName.split(' ')[0]}
        </h1>

        <p className="mt-4 font-headline text-lg italic text-[color:var(--on-surface-variant-color)] sm:text-xl">
          {data.eventDateDisplay}
        </p>

        <div className="mt-8 inline-flex items-center rounded-full border border-[color:var(--outline-variant-color)]/70 bg-[color:var(--surface-color)]/75 px-6 py-3 shadow-sm backdrop-blur-sm">
          <span className="font-label text-[11px] uppercase tracking-[0.22em] text-[color:var(--secondary-color)]">Untuk:</span>
          <span className="ml-3 font-semibold text-[color:var(--on-surface-color)]">{guestName}</span>
        </div>

        <div className="mx-auto mt-8 max-w-[570px]">
          <EnvelopeIntro
            onOpen={onOpen}
            names={shortCoupleName}
            venueName={data.venue.name}
          />
        </div>
      </div>
    </section>
  )
}
