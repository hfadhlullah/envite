export default function ThemeSelector({ options, selectedThemeId, onThemeChange }) {
  return (
    <div className="fixed right-4 top-4 z-30 rounded-2xl border border-[color:var(--border-color)] bg-[color:var(--surface-color)]/88 p-2 shadow-lg backdrop-blur-md">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[color:var(--muted-color)]">
        Style
      </p>
      <div className="flex flex-col gap-2 sm:flex-row">
        {options.map((option) => {
          const isActive = option.id === selectedThemeId

          return (
            <button
              key={option.id}
              type="button"
              onClick={() => onThemeChange(option.id)}
              className={`rounded-xl px-3 py-2 text-xs font-semibold transition ${
                isActive
                  ? 'bg-[color:var(--accent-color)] text-white shadow-md'
                  : 'bg-[color:var(--accent-soft-color)] text-[color:var(--text-color)] hover:opacity-80'
              }`}
            >
              {option.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
