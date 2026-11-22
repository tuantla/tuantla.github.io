interface Props {
  error: string | null
  charCount: number
  selectedPath: string
}

export function StatusBar({ error, charCount, selectedPath }: Props) {
  return (
    <div className="flex items-center justify-between px-4 py-1 bg-gray-100 border-t border-gray-200 text-xs text-gray-500 gap-4">
      <span className="font-mono overflow-x-auto whitespace-nowrap flex-1 mr-4">
        {error ? (
          <span className="text-red-500">{error}</span>
        ) : selectedPath ? (
          <span className="text-blue-600 font-mono">{selectedPath}</span>
        ) : (
          'Ready'
        )}
      </span>
      <span className="flex-shrink-0">{charCount.toLocaleString()} chars</span>
    </div>
  )
}
