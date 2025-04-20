
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Teachers from "./pages/Teachers";
import Principals from "./pages/Principals";
import Attendance from "./pages/Attendance";
import AttendanceNotices from "./pages/AttendanceNotices";
import Assignments from "./pages/Assignments";
import StudentPerformance from "./pages/StudentPerformance";
import TeacherPerformance from "./pages/TeacherPerformance";
import FeedbackForms from "./pages/FeedbackForms";
import DoubtSessions from "./pages/DoubtSessions";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import Studentalert from "./pages/Studentalert";
import Students from "./pages/Students";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
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
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
