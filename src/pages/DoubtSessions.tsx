
import { useState } from "react"
import { 
  Table, TableBody, TableCaption, TableCell, 
  TableHead, TableHeader, TableRow 
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Dialog, DialogContent, DialogDescription, 
  DialogFooter, DialogHeader, DialogTitle 
} from "@/components/ui/dialog"
import { 
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { 
  MessageSquare, Search, Calendar, Clock, CheckCircle, XCircle,
  MessageCircle, CalendarPlus, FilterX, Plus
} from "lucide-react"
import MainLayout from "@/components/layout/MainLayout"
import { toast } from "@/components/ui/use-toast"

// Sample doubt sessions data for teacher view
const initialTeacherSessions = [
  { 
    id: 1, 
    studentName: "John Doe", 
    grade: "10th",
    subject: "Mathematics",
    topic: "Quadratic Equations",
    date: "2025-04-20",
    time: "15:30",
    status: "pending",
    message: "I'm having trouble understanding how to factor quadratic equations when the coefficient of x² is not 1.",
    createdAt: "2025-04-15"
  },
  { 
    id: 2, 
    studentName: "Emma Wilson", 
    grade: "9th",
    subject: "Physics",
    topic: "Newton's Laws",
    date: "2025-04-22",
    time: "14:00",
    status: "accepted",
    message: "I need help understanding how to apply Newton's second law in problems with multiple forces.",
    createdAt: "2025-04-14"
  },
  { 
    id: 3, 
    studentName: "Michael Brown", 
    grade: "11th",
    subject: "Chemistry",
    topic: "Balancing Equations",
    date: "2025-04-21",
    time: "16:15",
    status: "rejected",
    message: "I'm confused about how to balance redox reactions in acidic and basic solutions.",
    createdAt: "2025-04-16"
  },
  { 
    id: 4, 
    studentName: "Sophia Garcia", 
    grade: "10th",
    subject: "Biology",
    topic: "Cell Division",
    date: "2025-04-23",
    time: "15:00",
    status: "completed",
    message: "I need clarification on the differences between mitosis and meiosis, especially regarding the end results.",
    createdAt: "2025-04-13"
  },
  { 
    id: 5, 
    studentName: "William Martinez", 
    grade: "12th",
    subject: "English",
    topic: "Essay Structure",
    date: "2025-04-25",
    time: "13:30",
    status: "accepted",
    message: "I'm struggling with how to properly structure my argumentative essay and create effective thesis statements.",
    createdAt: "2025-04-17"
  },
]

// Sample doubt sessions data for student view
const initialStudentSessions = [
  { 
    id: 1, 
    teacherName: "Dr. Sarah Johnson", 
    subject: "Mathematics",
    topic: "Quadratic Equations",
    date: "2025-04-20",
    time: "15:30",
    status: "pending",
    message: "I'm having trouble understanding how to factor quadratic equations when the coefficient of x² is not 1.",
    createdAt: "2025-04-15"
  },
  { 
    id: 2, 
    teacherName: "Prof. James Wilson", 
    subject: "Physics",
    topic: "Newton's Laws",
    date: "2025-04-22",
    time: "14:00",
    status: "accepted",
    message: "I need help understanding how to apply Newton's second law in problems with multiple forces.",
    createdAt: "2025-04-14"
  },
  { 
    id: 3, 
    teacherName: "Ms. Emily Parker", 
    subject: "Biology",
    topic: "Cell Division",
    date: "2025-04-23",
    time: "15:00",
    status: "completed",
    message: "I need clarification on the differences between mitosis and meiosis, especially regarding the end results.",
    createdAt: "2025-04-13"
  },
]

// Session interfaces
interface TeacherSession {
  id: number
  studentName: string
  grade: string
  subject: string
  topic: string
  date: string
  time: string
  status: "pending" | "accepted" | "rejected" | "completed"
  message: string
  createdAt: string
}

interface StudentSession {
  id: number
  teacherName: string
  subject: string
  topic: string
  date: string
  time: string
  status: "pending" | "accepted" | "rejected" | "completed"
  message: string
  createdAt: string
}

// New session request interface
interface NewSessionRequest {
  subject: string
  topic: string
  date: string
  time: string
  message: string
  teacherId?: number
}

// Available teachers
const availableTeachers = [
  { id: 1, name: "Dr. Sarah Johnson", subject: "Mathematics" },
  { id: 2, name: "Prof. James Wilson", subject: "Physics" },
  { id: 3, name: "Ms. Emily Parker", subject: "Biology" },
  { id: 4, name: "Mr. David Miller", subject: "Chemistry" },
  { id: 5, name: "Dr. Robert Brown", subject: "English Literature" },
]

const DoubtSessions = () => {
  // State for view mode (teacher or student)
  const [viewMode, setViewMode] = useState<"teacher" | "student">("teacher")
  
  // Teacher view states
  const [teacherSessions, setTeacherSessions] = useState<TeacherSession[]>(initialTeacherSessions)
  const [teacherSearchTerm, setTeacherSearchTerm] = useState("")
  const [teacherStatusFilter, setTeacherStatusFilter] = useState<string>("all")
  
  // Student view states
  const [studentSessions, setStudentSessions] = useState<StudentSession[]>(initialStudentSessions)
  const [studentSearchTerm, setStudentSearchTerm] = useState("")
  const [studentStatusFilter, setStudentStatusFilter] = useState<string>("all")
  
  // Dialog states
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false)
  const [isNewSessionDialogOpen, setIsNewSessionDialogOpen] = useState(false)
  const [currentSessionId, setCurrentSessionId] = useState<number | null>(null)
  
  // New session request state
  const [newSessionRequest, setNewSessionRequest] = useState<NewSessionRequest>({
    subject: "",
    topic: "",
    date: "",
    time: "",
    message: "",
    teacherId: undefined
  })

  // Filter sessions based on search term and status for teacher view
  const filteredTeacherSessions = teacherSessions.filter(session => {
    const matchesSearch = 
      session.studentName.toLowerCase().includes(teacherSearchTerm.toLowerCase()) ||
      session.subject.toLowerCase().includes(teacherSearchTerm.toLowerCase()) ||
      session.topic.toLowerCase().includes(teacherSearchTerm.toLowerCase())
    const matchesStatus = teacherStatusFilter === "all" || session.status === teacherStatusFilter
    return matchesSearch && matchesStatus
  })

  // Filter sessions based on search term and status for student view
  const filteredStudentSessions = studentSessions.filter(session => {
    const matchesSearch = 
      session.teacherName.toLowerCase().includes(studentSearchTerm.toLowerCase()) ||
      session.subject.toLowerCase().includes(studentSearchTerm.toLowerCase()) ||
      session.topic.toLowerCase().includes(studentSearchTerm.toLowerCase())
    const matchesStatus = studentStatusFilter === "all" || session.status === studentStatusFilter
    return matchesSearch && matchesStatus
  })

  // Handle search input change for teacher view
  const handleTeacherSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTeacherSearchTerm(e.target.value)
  }

  // Handle status filter change for teacher view
  const handleTeacherStatusChange = (value: string) => {
    setTeacherStatusFilter(value)
  }

  // Handle search input change for student view
  const handleStudentSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStudentSearchTerm(e.target.value)
  }

  // Handle status filter change for student view
  const handleStudentStatusChange = (value: string) => {
    setStudentStatusFilter(value)
  }

  // Get session status badge
  const getStatusBadge = (status: string) => {
    switch(status) {
      case "pending":
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">Pending</Badge>
      case "accepted":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Accepted</Badge>
      case "rejected":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Rejected</Badge>
      case "completed":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Completed</Badge>
      default:
        return null
    }
  }

  // View session details (both teacher and student)
  const handleViewDetails = (sessionId: number) => {
    setCurrentSessionId(sessionId)
    setIsDetailDialogOpen(true)
  }

  // Accept session request (teacher only)
  const handleAcceptSession = (sessionId: number) => {
    setTeacherSessions(teacherSessions.map(session => 
      session.id === sessionId ? { ...session, status: "accepted" } : session
    ))
    
    toast({
      title: "Session Accepted",
      description: "You have accepted the doubt session request.",
    })
  }

  // Reject session request (teacher only)
  const handleRejectSession = (sessionId: number) => {
    setTeacherSessions(teacherSessions.map(session => 
      session.id === sessionId ? { ...session, status: "rejected" } : session
    ))
    
    toast({
      title: "Session Rejected",
      description: "You have rejected the doubt session request.",
    })
  }

  // Mark session as completed (teacher only)
  const handleCompleteSession = (sessionId: number) => {
    setTeacherSessions(teacherSessions.map(session => 
      session.id === sessionId ? { ...session, status: "completed" } : session
    ))
    
    toast({
      title: "Session Completed",
      description: "You have marked the doubt session as completed.",
    })
  }

  // Reset filters for teacher view
  const resetTeacherFilters = () => {
    setTeacherSearchTerm("")
    setTeacherStatusFilter("all")
  }

  // Reset filters for student view
  const resetStudentFilters = () => {
    setStudentSearchTerm("")
    setStudentStatusFilter("all")
  }

  // Handle new session request field change
  const handleSessionFieldChange = (field: keyof NewSessionRequest, value: any) => {
    setNewSessionRequest({ ...newSessionRequest, [field]: value })
  }

  // Submit new session request (student only)
  const handleSubmitSessionRequest = () => {
    // Validate form
    if (!newSessionRequest.subject || !newSessionRequest.topic || !newSessionRequest.date || 
        !newSessionRequest.time || !newSessionRequest.message) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      })
      return
    }

    // Get teacher name based on selected teacherId
    const teacherName = newSessionRequest.teacherId 
      ? availableTeachers.find(t => t.id === newSessionRequest.teacherId)?.name || ""
      : availableTeachers.find(t => t.subject === newSessionRequest.subject)?.name || ""

    // Create new session request
    const newSession: StudentSession = {
      id: Math.max(...studentSessions.map(s => s.id), 0) + 1,
      teacherName,
      subject: newSessionRequest.subject,
      topic: newSessionRequest.topic,
      date: newSessionRequest.date,
      time: newSessionRequest.time,
      status: "pending",
      message: newSessionRequest.message,
      createdAt: new Date().toISOString().split('T')[0]
    }

    setStudentSessions([...studentSessions, newSession])
    
    // Reset form and close dialog
    setNewSessionRequest({
      subject: "",
      topic: "",
      date: "",
      time: "",
      message: "",
      teacherId: undefined
    })
    
    setIsNewSessionDialogOpen(false)
    
    toast({
      title: "Request Submitted",
      description: "Your doubt session request has been submitted successfully."
    })
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Doubt Sessions</h1>
            <p className="text-muted-foreground">Schedule and manage one-on-one doubt clearing sessions</p>
          </div>
          <div className="flex gap-2">
            {viewMode === "teacher" ? (
              <Button variant="outline" className="gap-1" onClick={resetTeacherFilters}>
                <FilterX className="h-4 w-4" />
                Reset Filters
              </Button>
            ) : (
              <>
                <Button variant="outline" className="gap-1" onClick={resetStudentFilters}>
                  <FilterX className="h-4 w-4" />
                  Reset Filters
                </Button>
                <Button className="gap-1" onClick={() => setIsNewSessionDialogOpen(true)}>
                  <Plus className="h-4 w-4" />
                  Request Session
                </Button>
              </>
            )}
          </div>
        </div>

        <Tabs defaultValue={viewMode} onValueChange={(value) => setViewMode(value as "teacher" | "student")}>
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="teacher">Teacher View</TabsTrigger>
            <TabsTrigger value="student">Student View</TabsTrigger>
          </TabsList>
          
          {/* Teacher View */}
          <TabsContent value="teacher" className="space-y-6">
            <div className="grid gap-4 md:grid-cols-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{teacherSessions.length}</div>
                  <p className="text-xs text-muted-foreground">All doubt sessions</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Pending</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {teacherSessions.filter(session => session.status === "pending").length}
                  </div>
                  <p className="text-xs text-muted-foreground">Awaiting response</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Accepted</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {teacherSessions.filter(session => session.status === "accepted").length}
                  </div>
                  <p className="text-xs text-muted-foreground">Sessions scheduled</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Completed</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {teacherSessions.filter(session => session.status === "completed").length}
                  </div>
                  <p className="text-xs text-muted-foreground">Sessions conducted</p>
                </CardContent>
              </Card>
            </div>

            <div className="flex items-center space-x-2">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search students, subjects, or topics..."
                  className="pl-8"
                  value={teacherSearchTerm}
                  onChange={handleTeacherSearchChange}
                />
              </div>
              <div className="w-[180px]">
                <Select value={teacherStatusFilter} onValueChange={handleTeacherStatusChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Status</SelectLabel>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="accepted">Accepted</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Table>
              <TableCaption>List of doubt session requests from students.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Grade</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Topic</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTeacherSessions.map((session) => (
                  <TableRow key={session.id}>
                    <TableCell className="font-medium">{session.studentName}</TableCell>
                    <TableCell>{session.grade}</TableCell>
                    <TableCell>{session.subject}</TableCell>
                    <TableCell>{session.topic}</TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1 text-muted-foreground" />
                          {session.date}
                        </span>
                        <span className="flex items-center">
                          <Clock className="h-3 w-3 mr-1 text-muted-foreground" />
                          {session.time}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(session.status)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleViewDetails(session.id)}
                        >
                          Details
                        </Button>
                        {session.status === "pending" && (
                          <>
                            <Button 
                              variant="outline" 
                              size="icon" 
                              className="text-green-600" 
                              onClick={() => handleAcceptSession(session.id)}
                            >
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="outline" 
                              size="icon" 
                              className="text-red-600" 
                              onClick={() => handleRejectSession(session.id)}
                            >
                              <XCircle className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                        {session.status === "accepted" && (
                          <Button 
                            variant="outline" 
                            size="icon" 
                            className="text-blue-600" 
                            onClick={() => handleCompleteSession(session.id)}
                          >
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
          
          {/* Student View */}
          <TabsContent value="student" className="space-y-6">
            <div className="grid gap-4 md:grid-cols-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{studentSessions.length}</div>
                  <p className="text-xs text-muted-foreground">All doubt sessions</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Pending</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {studentSessions.filter(session => session.status === "pending").length}
                  </div>
                  <p className="text-xs text-muted-foreground">Awaiting response</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Upcoming</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {studentSessions.filter(session => session.status === "accepted").length}
                  </div>
                  <p className="text-xs text-muted-foreground">Sessions scheduled</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Completed</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {studentSessions.filter(session => session.status === "completed").length}
                  </div>
                  <p className="text-xs text-muted-foreground">Sessions attended</p>
                </CardContent>
              </Card>
            </div>

            <div className="flex items-center space-x-2">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search teachers, subjects, or topics..."
                  className="pl-8"
                  value={studentSearchTerm}
                  onChange={handleStudentSearchChange}
                />
              </div>
              <div className="w-[180px]">
                <Select value={studentStatusFilter} onValueChange={handleStudentStatusChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Status</SelectLabel>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="accepted">Accepted</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Table>
              <TableCaption>List of your doubt session requests.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Teacher</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Topic</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudentSessions.map((session) => (
                  <TableRow key={session.id}>
                    <TableCell className="font-medium">{session.teacherName}</TableCell>
                    <TableCell>{session.subject}</TableCell>
                    <TableCell>{session.topic}</TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1 text-muted-foreground" />
                          {session.date}
                        </span>
                        <span className="flex items-center">
                          <Clock className="h-3 w-3 mr-1 text-muted-foreground" />
                          {session.time}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(session.status)}</TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleViewDetails(session.id)}
                      >
                        Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
        </Tabs>
        
        {/* Session Details Dialog */}
        <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Session Details</DialogTitle>
              <DialogDescription>
                Detailed information about the doubt session
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              {viewMode === "teacher" && currentSessionId && (
                <>
                  {teacherSessions.filter(s => s.id === currentSessionId).map(session => (
                    <div key={session.id} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h3 className="text-sm font-medium text-muted-foreground">Student Name</h3>
                          <p className="text-base">{session.studentName}</p>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-muted-foreground">Grade</h3>
                          <p className="text-base">{session.grade}</p>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-muted-foreground">Subject</h3>
                          <p className="text-base">{session.subject}</p>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-muted-foreground">Topic</h3>
                          <p className="text-base">{session.topic}</p>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-muted-foreground">Date</h3>
                          <p className="text-base">{session.date}</p>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-muted-foreground">Time</h3>
                          <p className="text-base">{session.time}</p>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-muted-foreground">Status</h3>
                          <div className="mt-1">{getStatusBadge(session.status)}</div>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-muted-foreground">Requested On</h3>
                          <p className="text-base">{session.createdAt}</p>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground mb-2">Student's Message</h3>
                        <div className="p-3 bg-muted rounded-md text-sm">
                          {session.message}
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              )}
              
              {viewMode === "student" && currentSessionId && (
                <>
                  {studentSessions.filter(s => s.id === currentSessionId).map(session => (
                    <div key={session.id} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h3 className="text-sm font-medium text-muted-foreground">Teacher Name</h3>
                          <p className="text-base">{session.teacherName}</p>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-muted-foreground">Subject</h3>
                          <p className="text-base">{session.subject}</p>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-muted-foreground">Topic</h3>
                          <p className="text-base">{session.topic}</p>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-muted-foreground">Status</h3>
                          <div className="mt-1">{getStatusBadge(session.status)}</div>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-muted-foreground">Date</h3>
                          <p className="text-base">{session.date}</p>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-muted-foreground">Time</h3>
                          <p className="text-base">{session.time}</p>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground mb-2">Your Message</h3>
                        <div className="p-3 bg-muted rounded-md text-sm">
                          {session.message}
                        </div>
                      </div>
                      
                      {session.status === "accepted" && (
                        <div>
                          <h3 className="text-sm font-medium text-muted-foreground mb-2">Meeting Information</h3>
                          <div className="p-3 bg-blue-50 border border-blue-200 rounded-md text-sm text-blue-800">
                            Your doubt session has been accepted. Please join the session on the scheduled date and time.
                            <div className="mt-2 font-medium">Meeting Link: <a href="#" className="text-blue-600 underline">https://meet.example.com/session/{session.id}</a></div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </>
              )}
            </div>
            <DialogFooter className="gap-2">
              {viewMode === "teacher" && currentSessionId && (
                <>
                  {teacherSessions.find(s => s.id === currentSessionId)?.status === "pending" && (
                    <>
                      <Button 
                        variant="outline" 
                        className="gap-1" 
                        onClick={() => {
                          handleAcceptSession(currentSessionId)
                          setIsDetailDialogOpen(false)
                        }}
                      >
                        <CheckCircle className="h-4 w-4" />
                        Accept
                      </Button>
                      <Button 
                        variant="outline" 
                        className="gap-1" 
                        onClick={() => {
                          handleRejectSession(currentSessionId)
                          setIsDetailDialogOpen(false)
                        }}
                      >
                        <XCircle className="h-4 w-4" />
                        Reject
                      </Button>
                    </>
                  )}
                  {teacherSessions.find(s => s.id === currentSessionId)?.status === "accepted" && (
                    <Button 
                      variant="outline" 
                      className="gap-1" 
                      onClick={() => {
                        handleCompleteSession(currentSessionId)
                        setIsDetailDialogOpen(false)
                      }}
                    >
                      <CheckCircle className="h-4 w-4" />
                      Mark as Completed
                    </Button>
                  )}
                </>
              )}
              <Button onClick={() => setIsDetailDialogOpen(false)}>Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        
        {/* New Session Request Dialog */}
        <Dialog open={isNewSessionDialogOpen} onOpenChange={setIsNewSessionDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Request Doubt Session</DialogTitle>
              <DialogDescription>
                Fill in the details to request a one-on-one doubt clearing session with a teacher
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">Subject</label>
                  <Select 
                    value={newSessionRequest.subject} 
                    onValueChange={(value) => handleSessionFieldChange('subject', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Mathematics">Mathematics</SelectItem>
                      <SelectItem value="Physics">Physics</SelectItem>
                      <SelectItem value="Chemistry">Chemistry</SelectItem>
                      <SelectItem value="Biology">Biology</SelectItem>
                      <SelectItem value="English">English</SelectItem>
                      <SelectItem value="History">History</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="teacher" className="text-sm font-medium">Teacher (Optional)</label>
                  <Select 
                    value={newSessionRequest.teacherId?.toString()} 
                    onValueChange={(value) => handleSessionFieldChange('teacherId', parseInt(value))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select teacher (optional)" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableTeachers.map(teacher => (
                        <SelectItem key={teacher.id} value={teacher.id.toString()}>
                          {teacher.name} ({teacher.subject})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="topic" className="text-sm font-medium">Topic</label>
                  <Input
                    id="topic"
                    value={newSessionRequest.topic}
                    onChange={(e) => handleSessionFieldChange('topic', e.target.value)}
                    placeholder="E.g., Quadratic Equations"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="date" className="text-sm font-medium">Preferred Date</label>
                  <Input
                    id="date"
                    type="date"
                    value={newSessionRequest.date}
                    onChange={(e) => handleSessionFieldChange('date', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="time" className="text-sm font-medium">Preferred Time</label>
                  <Input
                    id="time"
                    type="time"
                    value={newSessionRequest.time}
                    onChange={(e) => handleSessionFieldChange('time', e.target.value)}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">Doubt Details</label>
                <Textarea
                  id="message"
                  value={newSessionRequest.message}
                  onChange={(e) => handleSessionFieldChange('message', e.target.value)}
                  placeholder="Describe your doubt or problem in detail..."
                  rows={4}
                />
              </div>
            </div>
            <DialogFooter className="gap-2">
              <Button variant="outline" onClick={() => setIsNewSessionDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleSubmitSessionRequest}>Submit Request</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </MainLayout>
  )
}

export default DoubtSessions
