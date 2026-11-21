import { SkillCard } from '../components/SkillCard'
import { useSkills } from '../hooks/useSkills'

export function Dashboard() {
  const { skills, error, loading } = useSkills()

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      <div className="px-2 py-1 bg-gray-100 border-b border-gray-300 text-[11px] font-semibold text-gray-500 uppercase tracking-wide flex-shrink-0">
        Skills{!loading && !error && ` (${skills.length})`}
      </div>
      <div className="flex-1 overflow-auto p-4">
        {loading && <div className="text-xs text-gray-500">Loading...</div>}
        {error && <div className="text-xs text-red-600">Failed to load skills: {error}</div>}
        <div className="grid grid-cols-[repeat(auto-fill,minmax(8rem,1fr))] gap-3">
          {skills.map(skill => (
            <SkillCard key={skill.title} skill={skill} />
          ))}
        </div>
      </div>
    </div>
  )
}
