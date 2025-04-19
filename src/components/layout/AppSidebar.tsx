import { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import { 
  School, Users, UserCog, GraduationCap, Settings, 
  BookOpen, CalendarCheck, FileText, MessageSquare, 
  AlertTriangle, PieChart, ClipboardCheck, UserCircle,
  LogOut
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useAuth } from "@/contexts/AuthContext"
import { Button } from "@/components/ui/button"

// Define menu items for each role
const adminMenuItems = [
  { title: "Dashboard", icon: School, url: "/" },
  { title: "Students", icon: Users, url: "/students" },
  { title: "Teachers", icon: UserCog, url: "/teachers" },
  { title: "Principals", icon: GraduationCap, url: "/principals" },
  { title: "Attendance Notices", icon: AlertTriangle, url: "/attendance-notices" },
  { title: "Profile", icon: UserCircle, url: "/profile" },
  { title: "Settings", icon: Settings, url: "/settings" },
]

const principalMenuItems = [
  { title: "Dashboard", icon: School, url: "/" },
  { title: "Student Performance", icon: PieChart, url: "/student-performance" },
  { title: "Teacher Performance", icon: PieChart, url: "/teacher-performance" },
  { title: "Feedback Forms", icon: ClipboardCheck, url: "/feedback-forms" },
  { title: "Profile", icon: UserCircle, url: "/profile" },
]

const teacherMenuItems = [
  { title: "Dashboard", icon: School, url: "/" },
  { title: "Attendance", icon: CalendarCheck, url: "/attendance" },
  { title: "Assignments", icon: FileText, url: "/assignments" },
  { title: "Doubt Sessions", icon: MessageSquare, url: "/doubt-sessions" },
  { title: "Profile", icon: UserCircle, url: "/profile" },
]

const studentMenuItems = [
  { title: "Dashboard", icon: School, url: "/" },
  { title: "Attendance", icon: CalendarCheck, url: "/attendance" },
  { title: "Assignments", icon: FileText, url: "/assignments" },
  { title: "Feedback Forms", icon: ClipboardCheck, url: "/feedback-forms" },
  { title: "Profile", icon: UserCircle, url: "/profile" },
]

export function AppSidebar() {
  const { profile, signOut } = useAuth()
  // Use profile role from authentication or default to admin
  const [userRole, setUserRole] = useState(profile?.role || "admin")
  
  // Update role when profile changes
  useEffect(() => {
    if (profile?.role) {
      setUserRole(profile.role)
    }
  }, [profile])
  
  // Select menu items based on user role
  const getMenuItems = () => {
    switch(userRole) {
      case "admin":
        return adminMenuItems
      case "principal":
        return principalMenuItems
      case "teacher":
        return teacherMenuItems
      case "student":
        return studentMenuItems
      default:
        return adminMenuItems
    }
  }

  return (
    <Sidebar>
      <SidebarContent>
        <div className="p-4">
          <h1 className="text-2xl font-bold text-primary">SmartEduHub</h1>
          
          <div className="mt-4 mb-2">
            <p className="text-sm text-muted-foreground">
              Logged in as: <span className="font-medium">{profile?.first_name || 'User'}</span>
            </p>
            <p className="text-xs text-muted-foreground capitalize">
              Role: {userRole}
            </p>
          </div>
          
          <Button
            variant="outline"
            size="sm"
            className="w-full mt-2"
            onClick={signOut}
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>
        
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {getMenuItems().map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      className={({ isActive }) => 
                        `flex items-center gap-2 ${isActive ? 'text-primary font-medium' : ''}`
                      }
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
