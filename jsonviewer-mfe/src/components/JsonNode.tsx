import { useState } from 'react'

interface Props {
  keyName?: string | number
  value: unknown
  depth?: number
  isLast?: boolean
  onSelect?: (value: unknown, path: string) => void
  path?: string
}

function getType(value: unknown): string {
  if (value === null) return 'null'
  if (Array.isArray(value)) return 'array'
  return typeof value
}

function primitiveDisplay(value: unknown, type: string): string {
  if (type === 'string') return `"${value}"`
  if (type === 'null') return 'null'
  return String(value)
}

function primitiveColor(type: string): string {
  if (type === 'string') return 'text-red-700'
  if (type === 'number') return 'text-blue-700'
  if (type === 'boolean') return 'text-purple-700'
  return 'text-gray-400'
}

export function JsonNode({ keyName, value, depth = 0, onSelect, path = '' }: Props) {
  const [collapsed, setCollapsed] = useState(depth > 0)
  const type = getType(value)
  const isComplex = type === 'object' || type === 'array'

  const nodePath = path && keyName !== undefined
    ? `${path}.${keyName}`
    : keyName !== undefined
      ? String(keyName)
      : path

  const keyLabel = keyName !== undefined ? (
    <span className="text-gray-900 text-xs">{keyName}</span>
  ) : null

  if (isComplex) {
    const entries = type === 'object'
      ? Object.entries(value as Record<string, unknown>)
      : (value as unknown[]).map((v, i) => [i, v] as [number | string, unknown])
    const icon = type === 'object' ? '{}' : '[]'

    return (
      <div>
        <div
          className="flex items-center gap-1 py-px hover:bg-blue-50 cursor-pointer select-none"
          onClick={() => {
            setCollapsed(c => !c)
            onSelect?.(value, nodePath)
          }}
        >
          <span className="inline-flex items-center justify-center w-[14px] h-[14px] border border-gray-500 text-gray-600 text-[10px] leading-none flex-shrink-0 font-mono">
            {collapsed ? '+' : '-'}
          </span>
          <span className="text-blue-700 font-bold text-xs flex-shrink-0">{icon}</span>
          {keyLabel}
          {collapsed && (
            <span className="text-gray-400 text-xs">({entries.length})</span>
          )}
        </div>

        {!collapsed && (
          <div className="ml-[18px] border-l border-gray-300 pl-2">
            {entries.map(([k, v], i) => (
              <JsonNode
                key={k}
                keyName={k}
                value={v}
                depth={depth + 1}
                isLast={i === entries.length - 1}
                onSelect={onSelect}
                path={nodePath}
              />
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div
      className="flex items-center gap-1 py-px hover:bg-blue-50 cursor-pointer select-none"
      onClick={() => onSelect?.(value, nodePath)}
    >
      <span className="inline-block w-[8px] h-[8px] bg-[#00008b] flex-shrink-0 ml-[3px]" />
      {keyLabel}
      {keyName !== undefined && (
        <span className="text-gray-500 text-xs">:</span>
      )}
      <span className={`text-xs ${primitiveColor(type)}`}>
        {primitiveDisplay(value, type)}
      </span>
    </div>
  )
}
