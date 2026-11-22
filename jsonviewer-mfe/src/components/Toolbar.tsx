interface Props {
  onFormat: () => void
  onMinify: () => void
  onFlatten: () => void
  onClear: () => void
  onSample: () => void
  hasError: boolean
  isValid: boolean
}

function Btn({
  onClick,
  children,
  variant = 'default',
}: {
  onClick: () => void
  children: React.ReactNode
  variant?: 'default' | 'danger'
}) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 text-sm rounded border font-medium transition-colors
        ${variant === 'danger'
          ? 'border-red-300 text-red-600 hover:bg-red-50'
          : 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50 active:bg-gray-100'
        }`}
    >
      {children}
    </button>
  )
}

export function Toolbar({ onFormat, onMinify, onFlatten, onClear, onSample, hasError, isValid }: Props) {
  return (
    <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 border-b border-gray-200 flex-wrap">
      <a
        href={`${import.meta.env.VITE_APP_SHELL_URL}/`}
        title="Home"
        aria-label="Home"
        className="p-1.5 rounded text-gray-600 hover:bg-gray-200 transition-colors"
      >
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M3 11l9-8 9 8" />
          <path d="M5 10v10h5v-6h4v6h5V10" />
        </svg>
      </a>
      <span className="font-semibold text-gray-700 text-sm mr-2">JSON Viewer</span>
      <div className="h-4 w-px bg-gray-300" />
      <Btn onClick={onFormat}>Format</Btn>
      <Btn onClick={onMinify}>Minify</Btn>
      <Btn onClick={onFlatten}>Flatten</Btn>
      <Btn onClick={onSample}>Sample</Btn>
      <Btn onClick={onClear} variant="danger">Clear</Btn>
      <div className="ml-auto flex items-center gap-2">
        {isValid && (
          <span className="text-green-600 text-xs font-medium flex items-center gap-1">
            <span>✓</span> Valid JSON
          </span>
        )}
        {hasError && (
          <span className="text-red-500 text-xs font-medium flex items-center gap-1">
            <span>✗</span> Invalid JSON
          </span>
        )}
      </div>
    </div>
  )
}
