import { useState } from 'react'

interface Row {
  name: string | number
  value: string
  type: string
}

function getType(v: unknown): string {
  if (v === null) return 'null'
  if (Array.isArray(v)) return 'array'
  return typeof v
}

function getValueDisplay(v: unknown, type: string): string {
  if (type === 'null') return 'null'
  if (type === 'object') return '{...}'
  if (type === 'array') return `[${(v as unknown[]).length}]`
  if (type === 'string') return `"${v}"`
  return String(v)
}

function valueColor(type: string): string {
  const map: Record<string, string> = {
    string: 'text-red-700',
    number: 'text-blue-700',
    boolean: 'text-purple-700',
    null: 'text-gray-400',
    object: 'text-blue-600',
    array: 'text-blue-600',
  }
  return map[type] ?? 'text-gray-700'
}

function buildRows(value: unknown): Row[] {
  if (value === null || value === undefined) return []
  const type = getType(value)
  if (type !== 'object' && type !== 'array') return []

  const entries = type === 'object'
    ? Object.entries(value as Record<string, unknown>)
    : (value as unknown[]).map((v, i) => [i, v] as [number | string, unknown])

  return entries.map(([k, v]) => {
    const t = getType(v)
    return { name: k, value: getValueDisplay(v, t), type: t }
  })
}

function CopyBtn({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(text)
        setCopied(true)
        setTimeout(() => setCopied(false), 1200)
      }}
      className="ml-1 opacity-0 group-hover:opacity-100 text-[10px] text-gray-400 hover:text-blue-500 transition-opacity flex-shrink-0"
      title="Copy value"
    >
      {copied ? '✓' : '⎘'}
    </button>
  )
}

interface Props {
  selected: unknown
}

export function JsonTable({ selected }: Props) {
  const [allCopied, setAllCopied] = useState(false)
  const rows = buildRows(selected)

  const copyAll = () => {
    const text = rows.map(r => `${r.name}\t${r.value}`).join('\n')
    navigator.clipboard.writeText(text)
    setAllCopied(true)
    setTimeout(() => setAllCopied(false), 1500)
  }

  if (rows.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-gray-400 text-xs">
        Click an object or array node in the tree
      </div>
    )
  }

  return (
    <div className="overflow-auto h-full flex flex-col">
      <table className="w-full text-xs border-collapse flex-1">
        <thead className="sticky top-0 bg-gray-100 z-10">
          <tr>
            {['Name', 'Value'].map(col => (
              <th
                key={col}
                className="text-left px-2 py-1 border border-gray-300 font-semibold text-gray-700 whitespace-nowrap"
              >
                {col}
              </th>
            ))}
            <th className="px-2 py-1 border border-gray-300 text-right whitespace-nowrap">
              <button
                onClick={copyAll}
                className="text-[10px] text-gray-500 hover:text-blue-600 font-normal transition-colors"
                title="Copy all as TSV"
              >
                {allCopied ? '✓ Copied' : '⎘ Copy all'}
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className={`group ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-50`}>
              <td className="px-2 py-0.5 border border-gray-200 text-gray-800 font-mono whitespace-nowrap">
                <div className="flex items-center">
                  <span className="flex-1">{row.name}</span>
                  <CopyBtn text={String(row.name)} />
                </div>
              </td>
              <td className={`px-2 py-0.5 border border-gray-200 font-mono whitespace-nowrap ${valueColor(row.type)}`}>
                <div className="flex items-center">
                  <span className="flex-1">{row.value}</span>
                  <CopyBtn text={row.value} />
                </div>
              </td>
              <td className="border border-gray-200" />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
