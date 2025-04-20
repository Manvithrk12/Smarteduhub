
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Calendar, UserSquare2, FileText, BookOpen, CheckCircle, AlertCircle } from "lucide-react"

export const PrincipalDashboard = () => {
  const stats = [
    { title: "Average Attendance", value: "87%", icon: Calendar },
    { title: "Teachers", value: "89", icon: UserSquare2 },
    { title: "Pending Feedback", value: "23", icon: FileText },
    { title: "Academic Performance", value: "76%", icon: BookOpen },
  ]

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Principal Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Teacher Performance Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            <li className="flex justify-between items-center">
              <div>
                <p className="font-medium">Dr. Sarah Johnson</p>
                <p className="text-sm text-muted-foreground">Mathematics</p>
              </div>
              <div className="flex items-center">
                <span className="font-medium text-green-600 mr-2">92%</span>
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
            </li>
            <li className="flex justify-between items-center">
              <div>
                <p className="font-medium">Prof. James Wilson</p>
                <p className="text-sm text-muted-foreground">Physics</p>
              </div>
              <div className="flex items-center">
                <span className="font-medium text-green-600 mr-2">88%</span>
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
