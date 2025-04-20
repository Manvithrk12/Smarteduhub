
import { Calendar, FileText, BookOpen, MessageSquare, Clock } from "lucide-react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { StatsGrid } from "./components/StatsGrid"

export const StudentDashboard = () => {
  const stats = [
    { title: "Attendance", value: "92%", icon: Calendar, description: "Overall attendance rate" },
    { title: "Assignments", value: "5", icon: FileText, description: "Pending submissions" },
    { title: "Upcoming Tests", value: "3", icon: BookOpen, description: "Next 7 days" },
    { title: "Feedback Forms", value: "2", icon: MessageSquare, description: "Need your response" },
  ]

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Student Dashboard</h1>
      <StatsGrid stats={stats} />
      
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Subject-wise Attendance</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              <li className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Mathematics</p>
                  <div className="w-32 h-2 bg-gray-200 rounded-full">
                    <div className="h-full bg-green-600 rounded-full" style={{ width: '94%' }}></div>
                  </div>
                </div>
                <p className="text-sm font-medium text-green-600">94%</p>
              </li>
              <li className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Physics</p>
                  <div className="w-32 h-2 bg-gray-200 rounded-full">
                    <div className="h-full bg-green-600 rounded-full" style={{ width: '90%' }}></div>
                  </div>
                </div>
                <p className="text-sm font-medium text-green-600">90%</p>
              </li>
            </ul>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Assignments</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              <li className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Quadratic Equations - Mathematics</p>
                  <p className="text-sm text-muted-foreground">Problem set 1-15</p>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 text-destructive mr-1" />
                  <p className="text-xs text-destructive">Due today</p>
                </div>
              </li>
              <li className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Newton's Laws - Physics</p>
                  <p className="text-sm text-muted-foreground">Lab report</p>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 text-amber-600 mr-1" />
                  <p className="text-xs text-amber-600">Due in 2 days</p>
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
