
import { Calendar, UserSquare2, FileText, BookOpen } from "lucide-react"
import { StatsGrid } from "./components/StatsGrid"
import { PerformanceList } from "./components/PerformanceList"

export const PrincipalDashboard = () => {
  const stats = [
    { title: "Average Attendance", value: "87%", icon: Calendar },
    { title: "Teachers", value: "89", icon: UserSquare2 },
    { title: "Pending Feedback", value: "23", icon: FileText },
    { title: "Academic Performance", value: "76%", icon: BookOpen },
  ]

  const teacherPerformance = [
    { name: "Dr. Sarah Johnson", subject: "Mathematics", performance: 92 },
    { name: "Prof. James Wilson", subject: "Physics", performance: 88 },
  ]

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Principal Dashboard</h1>
      <StatsGrid stats={stats} />
      <PerformanceList title="Teacher Performance Overview" items={teacherPerformance} />
    </div>
  )
}
