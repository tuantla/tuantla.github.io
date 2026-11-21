import { useState } from 'react'

const BTN = 'px-3 py-1 text-xs font-semibold rounded bg-blue-500 text-white hover:bg-blue-600'

export function Base64() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')

  const encode = () => {
    const bytes = new TextEncoder().encode(input)
    setOutput(btoa(String.fromCharCode(...bytes)))
  }
  const decode = () => {
    try {
      const bin = atob(input.trim())
      setOutput(new TextDecoder().decode(Uint8Array.from(bin, c => c.charCodeAt(0))))
    } catch {
      setOutput('Invalid Base64 input')
    }
  }

  return (
    <div className="flex flex-col gap-3 p-4 max-w-xl">
      <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide">Input</label>
      <textarea
        className="font-mono text-xs p-3 border border-gray-300 rounded outline-none"
        rows={4}
        value={input}
        onChange={e => setInput(e.target.value)}
        spellCheck={false}
      />
      <div className="flex gap-2">
        <button className={BTN} onClick={encode}>Encode</button>
        <button className={BTN} onClick={decode}>Decode</button>
      </div>
      <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide">Output</label>
      <textarea
        className="font-mono text-xs p-3 border border-gray-300 rounded bg-gray-50"
        rows={4}
        value={output}
        readOnly
      />
    </div>
  )
}
