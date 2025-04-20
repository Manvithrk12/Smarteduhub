
import { StatsCard } from "./StatsCard"
import { LucideIcon } from "lucide-react"

interface StatItem {
  title: string
  value: string
  icon: LucideIcon
  description?: string
}

interface StatsGridProps {
  stats: StatItem[]
}

export const StatsGrid = ({ stats }: StatsGridProps) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <StatsCard key={stat.title} {...stat} />
      ))}
    </div>
  )
}
