import { Toaster } from "@/components/ui/toaster"
import { Toaster as Sonner } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter, Routes, Route } from "react-router-dom"

// Page imports
import AdminDashboard from "./pages/admin/Dashboard"
import PrincipalDashboard from "./pages/principal/Dashboard"
import TeacherDashboard from "./pages/teacher/Dashboard"
import StudentDashboard from "./pages/student/Dashboard"
import Teachers from "./pages/Teachers"
import Principals from "./pages/Principals"
import Attendance from "./pages/Attendance"
import AttendanceNotices from "./pages/AttendanceNotices"
import Assignments from "./pages/Assignments"
import StudentPerformance from "./pages/StudentPerformance"
import TeacherPerformance from "./pages/TeacherPerformance"
import FeedbackForms from "./pages/FeedbackForms"
import DoubtSessions from "./pages/DoubtSessions"
import Profile from "./pages/Profile"
import NotFound from "./pages/NotFound"
import Studentalert from "./pages/Studentalert"
import Students from "./pages/Students"

const queryClient = new QueryClient()

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Role-specific dashboards */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/principal" element={<PrincipalDashboard />} />
          <Route path="/teacher" element={<TeacherDashboard />} />
          <Route path="/student" element={<StudentDashboard />} />
          
          {/* Other routes */}
          <Route path="/students" element={<Students />} />
          <Route path="/teachers" element={<Teachers />} />
          <Route path="/principals" element={<Principals />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/attendance-notices" element={<AttendanceNotices />} />
          <Route path="/assignments" element={<Assignments />} />
          <Route path="/student-performance" element={<StudentPerformance />} />
          <Route path="/teacher-performance" element={<TeacherPerformance />} />
          <Route path="/feedback-forms" element={<FeedbackForms />} />
          <Route path="/doubt-sessions" element={<DoubtSessions />} />
          <Route path="/studentalert" element={<Studentalert />} />
          <Route path="/profile" element={<Profile />} />
          
          {/* Redirect root to admin dashboard for now */}
          <Route path="/" element={<AdminDashboard />} />
          
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
)

export default App
