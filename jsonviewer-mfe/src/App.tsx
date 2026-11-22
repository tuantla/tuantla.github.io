import { useCallback, useRef, useState } from 'react'
import { JsonTable } from './components/JsonTable'
import { JsonViewer } from './components/JsonViewer'
import { StatusBar } from './components/StatusBar'
import { Toolbar } from './components/Toolbar'
import { useJsonParser } from './hooks/useJsonParser'

const SAMPLE = `{
  "activityHistories": [
    {
      "productType": "INTRA_TRANSFER_BY_ACCOUNT",
      "transactionType": "WITHDRAW",
      "narrative": "To: L. PHAM",
      "refNumber": "ITR260916103106001",
      "amount": 45,
      "status": "SUCCESSFUL",
      "requestDate": 1789554667462,
      "activityDetail": {
        "commonInfo": {
          "totalAmount": 45,
          "amount": 45,
          "from": {
            "bankCode": "GOTYPHM2XXX",
            "accountName": "Everyday Deposit",
            "accountType": "CURRENT_ACCOUNT",
            "bankName": "GoTyme Bank",
            "accountNumber": "010954732941",
            "customerName": "T. Vu"
          },
          "to": {
            "bankCode": "GOTYPHM2XXX",
            "accountName": "Everyday Deposit",
            "accountType": "CURRENT_ACCOUNT",
            "bankName": "GoTyme Bank",
            "accountNumber": "017277435485",
            "customerName": "L. PHAM"
          },
          "title": "Transferred",
          "processingFee": 0,
          "providerInfo": {
            "note": "Instant",
            "providerName": "GoTyme"
          }
        },
        "nextActionInfo": {
          "bankCode": "GOTYPHM2XXX",
          "accountNumber": "017277435485"
        },
        "extraInfo": {
          "from": {
            "displayCustomerName": "T. Vu",
            "displayAccountNumber": "••••••••2941"
          },
          "to": {
            "displayCustomerName": "L. PHAM",
            "displayAccountNumber": "••••••••5485"
          }
        }
      },
      "fromAccount": {
        "accountNumber": "010954732941",
        "accountName": "Everyday Deposit"
      },
      "toAccount": {
        "accountNumber": "017277435485",
        "accountType": "CURRENT_ACCOUNT",
        "accountName": "Everyday Deposit",
        "bankName": "GoTyme Bank"
      },
      "actions": [
        {
          "actionType": "RETRY",
          "label": "Repeat"
        },
        {
          "actionType": "SHARE",
          "label": "Share"
        }
      ]
    }
  ]
}`

function flattenJson(obj: unknown, prefix = ''): Record<string, unknown> {
  const result: Record<string, unknown> = {}
  if (obj === null || typeof obj !== 'object') {
    if (prefix) result[prefix] = obj
    return result
  }
  if (Array.isArray(obj)) {
    (obj as unknown[]).forEach((value, i) => {
      const newKey = `${prefix}[${i}]`
      if (value !== null && typeof value === 'object') {
        Object.assign(result, flattenJson(value, newKey))
      } else {
        result[newKey] = value
      }
    })
  } else {
    for (const [key, value] of Object.entries(obj as Record<string, unknown>)) {
      const newKey = prefix ? `${prefix}.${key}` : key
      if (value !== null && typeof value === 'object') {
        Object.assign(result, flattenJson(value, newKey))
      } else {
        result[newKey] = value
      }
    }
  }
  return result
}

export default function App() {
  const [raw, setRaw] = useState(SAMPLE)
  const [selected, setSelected] = useState<unknown>(null)
  const [selectedPath, setSelectedPath] = useState('')
  const { parsed, error } = useJsonParser(raw)

  // Panel widths in percent: [input, viewer, properties]
  const [widths, setWidths] = useState([30, 42, 28])
  const containerRef = useRef<HTMLDivElement>(null)

  const startResize = useCallback((dividerIdx: number) => (e: React.MouseEvent) => {
    e.preventDefault()
    const startX = e.clientX
    const startWidths = [...widths]

    const onMove = (ev: MouseEvent) => {
      const containerWidth = containerRef.current?.offsetWidth ?? 1
      const delta = ((ev.clientX - startX) / containerWidth) * 100
      setWidths(prev => {
        const next = [...prev]
        const left = dividerIdx
        const right = dividerIdx + 1
        const newLeft = Math.max(15, Math.min(70, startWidths[left] + delta))
        const diff = newLeft - startWidths[left]
        const newRight = Math.max(10, Math.min(70, startWidths[right] - diff))
        next[left] = newLeft
        next[right] = newRight
        // clamp third panel
        const used = next[0] + next[1]
        next[2] = Math.max(10, 100 - used)
        return next
      })
    }

    const onUp = () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseup', onUp)
    }
    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseup', onUp)
  }, [widths])

  const handleSelect = (value: unknown, path: string) => {
    setSelectedPath(path)
    const type = value === null ? 'null' : Array.isArray(value) ? 'array' : typeof value
    if (type === 'object' || type === 'array') setSelected(value)
  }

  const effectiveSelected = selected ?? parsed

  const format = () => {
    try { setRaw(JSON.stringify(JSON.parse(raw), null, 2)) } catch {}
  }
  const minify = () => {
    try { setRaw(JSON.stringify(JSON.parse(raw))) } catch {}
  }
  const flatten = () => {
    try {
      const flat = flattenJson(JSON.parse(raw))
      setRaw(JSON.stringify(flat, null, 2))
      setSelected(null)
      setSelectedPath('')
    } catch {}
  }

  return (
    <div className="flex flex-col h-screen bg-white text-gray-900 overflow-hidden">
      <Toolbar
        onFormat={format}
        onMinify={minify}
        onFlatten={flatten}
        onClear={() => { setRaw(''); setSelected(null); setSelectedPath('') }}
        onSample={() => { setRaw(SAMPLE); setSelected(null); setSelectedPath('') }}
        hasError={!!error && raw.trim().length > 0}
        isValid={!error && parsed !== null && raw.trim().length > 0}
      />

      <div ref={containerRef} className="flex flex-1 overflow-hidden select-none">
        {/* Input panel */}
        <div
          className="flex flex-col border-r border-gray-300 overflow-hidden"
          style={{ width: `${widths[0]}%` }}
        >
          <div className="px-2 py-1 bg-gray-100 border-b border-gray-300 text-[11px] font-semibold text-gray-500 uppercase tracking-wide flex-shrink-0">
            Input
          </div>
          <textarea
            className={`flex-1 font-mono text-xs p-3 resize-none outline-none leading-5 overflow-auto
              ${error && raw.trim() ? 'bg-red-50' : 'bg-white'}`}
            value={raw}
            onChange={e => setRaw(e.target.value)}
            placeholder="Paste or type JSON here..."
            spellCheck={false}
          />
        </div>

        {/* Divider 0 */}
        <div
          className="w-1 bg-gray-200 hover:bg-blue-400 cursor-col-resize flex-shrink-0 transition-colors"
          onMouseDown={startResize(0)}
        />

        {/* Viewer panel */}
        <div
          className="flex flex-col overflow-hidden"
          style={{ width: `${widths[1]}%` }}
        >
          <div className="px-2 py-1 bg-gray-100 border-b border-gray-300 text-[11px] font-semibold text-gray-500 uppercase tracking-wide flex-shrink-0">
            Viewer
          </div>
          <div className="flex-1 overflow-auto">
            <JsonViewer parsed={parsed} onSelect={handleSelect} />
          </div>
        </div>

        {/* Divider 1 */}
        <div
          className="w-1 bg-gray-200 hover:bg-blue-400 cursor-col-resize flex-shrink-0 transition-colors"
          onMouseDown={startResize(1)}
        />

        {/* Properties panel */}
        <div
          className="flex flex-col overflow-hidden border-l border-gray-300"
          style={{ width: `${widths[2]}%` }}
        >
          <div className="px-2 py-1 bg-gray-100 border-b border-gray-300 text-[11px] font-semibold text-gray-500 uppercase tracking-wide flex-shrink-0">
            Properties
          </div>
          <div className="flex-1 overflow-auto">
            <JsonTable selected={effectiveSelected} />
          </div>
        </div>
      </div>

      <StatusBar
        error={error}
        charCount={raw.length}
        selectedPath={selectedPath}
      />
    </div>
  )
}
