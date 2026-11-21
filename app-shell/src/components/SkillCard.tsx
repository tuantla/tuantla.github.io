import type { Skill } from '../hooks/useSkills'

export function SkillCard({ skill }: { skill: Skill }) {
  return (
    <div className="flex flex-col items-center gap-2 p-4 bg-white border border-gray-300 rounded hover:border-blue-400 transition-colors">
      <img src={skill.icon} alt={skill.title} className="w-12 h-12 object-contain" />
      <div className="text-sm font-semibold">{skill.title}</div>
      {skill.category && (
        <div className="text-[11px] text-gray-500 uppercase tracking-wide">{skill.category}</div>
      )}
      {skill.level !== undefined && (
        <div className="flex gap-0.5" aria-label={`Level ${skill.level} of 5`}>
          {Array.from({ length: 5 }, (_, i) => (
            <span
              key={i}
              className={`w-3 h-1 rounded-sm ${i < skill.level! ? 'bg-blue-500' : 'bg-gray-200'}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
