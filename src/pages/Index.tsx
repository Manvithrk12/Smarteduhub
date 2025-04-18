
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { UserSquare2, Users, GraduationCap, Calendar } from "lucide-react"
import MainLayout from "@/components/layout/MainLayout"

const DashboardCard = ({ title, value, icon: Icon }: { title: string; value: string; icon: any }) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
      <Icon className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
    </CardContent>
  </Card>
)

const Index = () => {
  const stats = [
    { title: "Total Students", value: "1,234", icon: Users },
    { title: "Total Teachers", value: "89", icon: UserSquare2 },
    { title: "Total Principals", value: "12", icon: GraduationCap },
    { title: "Active Classes", value: "45", icon: Calendar },
  ]

  return (
    <MainLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <DashboardCard key={stat.title} {...stat} />
          ))}
        </div>
      </div>
    </MainLayout>
  )
}

export default Index
