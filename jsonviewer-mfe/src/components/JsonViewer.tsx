import { JsonNode } from './JsonNode'

interface Props {
  parsed: unknown
  onSelect?: (value: unknown, path: string) => void
}

export function JsonViewer({ parsed, onSelect }: Props) {
  if (parsed === null || parsed === undefined) {
    return (
      <div className="flex items-center justify-center h-full text-gray-400 text-sm">
        Paste JSON on the left to view it here
      </div>
    )
  }

  return (
    <div className="font-mono text-xs p-2 overflow-auto h-full">
      <JsonNode value={parsed} onSelect={onSelect} depth={0} path="" />
    </div>
  )
}
