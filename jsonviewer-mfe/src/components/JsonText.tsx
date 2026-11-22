interface Props {
  parsed: unknown
  error: string | null
}

export function JsonText({ parsed, error }: Props) {
  if (error || parsed === null || parsed === undefined) {
    return (
      <div className="flex items-center justify-center h-full text-gray-400 text-sm">
        No valid JSON to display
      </div>
    )
  }

  return (
    <pre className="font-mono text-sm p-4 overflow-auto h-full text-gray-800 whitespace-pre-wrap break-all">
      {JSON.stringify(parsed, null, 2)}
    </pre>
  )
}
