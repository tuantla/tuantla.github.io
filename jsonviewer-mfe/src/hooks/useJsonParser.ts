import { useEffect, useState } from 'react'

interface ParseResult {
  parsed: unknown
  error: string | null
}

export function useJsonParser(raw: string): ParseResult {
  const [result, setResult] = useState<ParseResult>({ parsed: null, error: null })

  useEffect(() => {
    if (!raw.trim()) {
      setResult({ parsed: null, error: null })
      return
    }
    const timer = setTimeout(() => {
      try {
        const parsed = JSON.parse(raw)
        setResult({ parsed, error: null })
      } catch (e) {
        setResult({ parsed: null, error: (e as Error).message })
      }
    }, 300)
    return () => clearTimeout(timer)
  }, [raw])

  return result
}
