
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { AlertCircle, CheckCircle, Users, UserSquare2, GraduationCap, Calendar } from "lucide-react"

export const AdminDashboard = () => {
  const stats = [
    { title: "Total Students", value: "1,234", icon: Users },
    { title: "Total Teachers", value: "89", icon: UserSquare2 },
    { title: "Total Principals", value: "12", icon: GraduationCap },
    { title: "Active Classes", value: "45", icon: Calendar },
  ]

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
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
      
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Low Attendance Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              <li className="flex justify-between items-center">
                <div>
                  <p className="font-medium">John Doe</p>
                  <p className="text-sm text-muted-foreground">Mathematics - 65%</p>
                </div>
                <AlertCircle className="h-5 w-5 text-destructive" />
              </li>
              <li className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Emma Wilson</p>
                  <p className="text-sm text-muted-foreground">Physics - 68%</p>
                </div>
                <AlertCircle className="h-5 w-5 text-destructive" />
              </li>
            </ul>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Recent User Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              <li className="flex justify-between items-center">
                <div>
                  <p className="font-medium">New Teacher Added</p>
                  <p className="text-sm text-muted-foreground">Dr. Sarah Johnson</p>
                </div>
                <p className="text-xs text-muted-foreground">Today, 10:30 AM</p>
              </li>
              <li className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Class Schedule Updated</p>
                  <p className="text-sm text-muted-foreground">Grade 10 - Science</p>
                </div>
                <p className="text-xs text-muted-foreground">Yesterday, 3:15 PM</p>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
