
import { useState } from "react"
import { NavLink } from "react-router-dom"
import { 
  School, Users, UserCog, GraduationCap, 
  BookOpen, CalendarCheck, FileText, MessageSquare, 
  AlertTriangle, PieChart, ClipboardCheck, UserCircle,
  icons
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
import Edulogo from "../assets/Smarteduhub1.png"
import { title } from "process"
import { url } from "inspector"

// Define menu items for each role
const adminMenuItems = [
  { title: "Dashboard", icon: School, url: "/" },
  { title: "Students", icon: Users, url: "/students" },
  { title: "Teachers", icon: UserCog, url: "/teachers" },
  { title: "Principal", icon: GraduationCap, url: "/principals" },
  { title: "Attendance Notices", icon: AlertTriangle, url: "/attendance-notices" },
  { title: "Profile", icon: UserCircle, url: "/profile" },
  
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
  {title: "Alerts", icon:AlertTriangle, url:"/studentalert"},
  { title: "Profile", icon: UserCircle, url: "/profile" },
]

export function AppSidebar() {
  // In a real application, this would come from an authentication context
  const [userRole, setUserRole] = useState("admin") // Default to admin for now
  
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
  
  // Role switcher for demo purposes (would be removed in production)
  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUserRole(e.target.value)
  }

  return (
    <Sidebar>
      <SidebarContent>
        <div className="p-4">
          <img src={Edulogo} alt="Smartedu logo" className="w-200 h-500" />
          
          {/* Role switcher (for demo only) */}
          <div className="mt-4">
            <select 
              value={userRole} 
              onChange={handleRoleChange}
              className="w-full p-2 border rounded bg-background text-sm"
            >
              <option value="admin">Admin View</option>
              <option value="principal">Principal View</option>
              <option value="teacher">Teacher View</option>
              <option value="student">Student View</option>
            </select>
          </div>
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
