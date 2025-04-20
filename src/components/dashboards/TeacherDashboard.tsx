
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Calendar, Users, FileText, MessageSquare, Clock } from "lucide-react"

export const TeacherDashboard = () => {
  const stats = [
    { title: "Classes Today", value: "4", icon: Calendar },
    { title: "Total Students", value: "156", icon: Users },
    { title: "Pending Assignments", value: "12", icon: FileText },
    { title: "Doubt Sessions", value: "5", icon: MessageSquare, description: "Scheduled this week" },
  ]

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Teacher Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              {stat.description && <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>}
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Today's Schedule</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              <li className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Grade 10 - Mathematics</p>
                  <p className="text-sm text-muted-foreground">Room 201</p>
                </div>
                <p className="text-sm font-medium">9:00 AM - 10:30 AM</p>
              </li>
              <li className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Grade 9 - Mathematics</p>
                  <p className="text-sm text-muted-foreground">Room 105</p>
                </div>
                <p className="text-sm font-medium">11:00 AM - 12:30 PM</p>
              </li>
            </ul>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Assignment Deadlines</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              <li className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Quadratic Equations</p>
                  <p className="text-sm text-muted-foreground">Grade 10 - 36 submissions</p>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 text-destructive mr-1" />
                  <p className="text-xs text-destructive">Due today</p>
                </div>
              </li>
              <li className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Linear Algebra</p>
                  <p className="text-sm text-muted-foreground">Grade 11 - 28 submissions</p>
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
