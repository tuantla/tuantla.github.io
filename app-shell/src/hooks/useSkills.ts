import { useEffect, useState } from 'react'

export interface Skill {
  title: string
  icon: string
  category?: string
  level?: number
}

export function useSkills() {
  const [skills, setSkills] = useState<Skill[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const controller = new AbortController()
    fetch(`${import.meta.env.BASE_URL}data/skills.json`, { signal: controller.signal })
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json() as Promise<Skill[]>
      })
      .then(setSkills)
      .catch(e => {
        if (e.name !== 'AbortError') setError(String(e.message ?? e))
      })
      .finally(() => setLoading(false))
    return () => controller.abort()
  }, [])

  return { skills, error, loading }
}
