
import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { 
  UserSquare2, Users, GraduationCap, Calendar, BookOpen,
  CheckCircle, Clock, AlertCircle, FileText, MessageSquare
} from "lucide-react"
import MainLayout from "@/components/layout/MainLayout"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Reusable dashboard card component
const DashboardCard = ({ title, value, icon: Icon, description = "" }: { 
  title: string; 
  value: string; 
  icon: any;
  description?: string;
}) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
      <Icon className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
    </CardContent>
  </Card>
)

// Admin dashboard content
const AdminDashboard = () => {
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
          <DashboardCard key={stat.title} {...stat} />
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
              <li className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Michael Brown</p>
                  <p className="text-sm text-muted-foreground">Chemistry - 62%</p>
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
              <li className="flex justify-between items-center">
                <div>
                  <p className="font-medium">New Student Enrolled</p>
                  <p className="text-sm text-muted-foreground">Robert Miller</p>
                </div>
                <p className="text-xs text-muted-foreground">Yesterday, 11:45 AM</p>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// Principal dashboard content
const PrincipalDashboard = () => {
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
          <DashboardCard key={stat.title} {...stat} />
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
            <li className="flex justify-between items-center">
              <div>
                <p className="font-medium">Ms. Emily Parker</p>
                <p className="text-sm text-muted-foreground">Biology</p>
              </div>
              <div className="flex items-center">
                <span className="font-medium text-amber-600 mr-2">74%</span>
                <AlertCircle className="h-5 w-5 text-amber-600" />
              </div>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

// Teacher dashboard content
const TeacherDashboard = () => {
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
          <DashboardCard key={stat.title} {...stat} />
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
              <li className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Grade 11 - Advanced Math</p>
                  <p className="text-sm text-muted-foreground">Room 304</p>
                </div>
                <p className="text-sm font-medium">2:00 PM - 3:30 PM</p>
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
              <li className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Basic Arithmetic</p>
                  <p className="text-sm text-muted-foreground">Grade 9 - 42 submissions</p>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 text-muted-foreground mr-1" />
                  <p className="text-xs text-muted-foreground">Due in 5 days</p>
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// Student dashboard content
const StudentDashboard = () => {
  const stats = [
    { title: "Attendance", value: "92%", icon: Calendar, description: "Overall attendance rate" },
    { title: "Assignments", value: "5", icon: FileText, description: "Pending submissions" },
    { title: "Upcoming Tests", value: "3", icon: BookOpen, description: "Next 7 days" },
    { title: "Feedback Forms", value: "2", icon: MessageSquare, description: "Need your response" },
  ]

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Student Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <DashboardCard key={stat.title} {...stat} />
        ))}
      </div>
      
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
              <li className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Chemistry</p>
                  <div className="w-32 h-2 bg-gray-200 rounded-full">
                    <div className="h-full bg-amber-600 rounded-full" style={{ width: '78%' }}></div>
                  </div>
                </div>
                <p className="text-sm font-medium text-amber-600">78%</p>
              </li>
              <li className="flex justify-between items-center">
                <div>
                  <p className="font-medium">English</p>
                  <div className="w-32 h-2 bg-gray-200 rounded-full">
                    <div className="h-full bg-destructive rounded-full" style={{ width: '65%' }}></div>
                  </div>
                </div>
                <p className="text-sm font-medium text-destructive">65%</p>
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
              <li className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Essay on Hamlet - English</p>
                  <p className="text-sm text-muted-foreground">1500 words</p>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 text-muted-foreground mr-1" />
                  <p className="text-xs text-muted-foreground">Due in 5 days</p>
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

const Index = () => {
  // In a real app, this would come from an authentication context
  const [userRole, setUserRole] = useState("admin") // Default to admin view

  return (
    <MainLayout>
      <Tabs defaultValue={userRole} onValueChange={setUserRole} className="space-y-6">
        <TabsList className="grid w-full md:w-fit grid-cols-4">
          <TabsTrigger value="admin">Admin</TabsTrigger>
          <TabsTrigger value="principal">Principal</TabsTrigger>
          <TabsTrigger value="teacher">Teacher</TabsTrigger>
          <TabsTrigger value="student">Student</TabsTrigger>
        </TabsList>
        
        <TabsContent value="admin">
          <AdminDashboard />
        </TabsContent>
        
        <TabsContent value="principal">
          <PrincipalDashboard />
        </TabsContent>
        
        <TabsContent value="teacher">
          <TeacherDashboard />
        </TabsContent>
        
        <TabsContent value="student">
          <StudentDashboard />
        </TabsContent>
      </Tabs>
    </MainLayout>
  )
}

export default Index
