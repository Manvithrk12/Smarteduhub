
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
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Bell, Check, Search, Send, X } from "lucide-react"
import MainLayout from "@/components/layout/MainLayout"
import { toast } from "@/components/ui/use-toast"

// Attendance notice interface
interface AttendanceNotice {
  id: number
  studentName: string
  studentId: string
  grade: string
  subject: string
  attendancePercentage: number
  lastAttendance: string
  status: "pending" | "sent" | "resolved"
  createdAt: string
}

// Sample attendance notices data
const initialNotices: AttendanceNotice[] = [
  { 
    id: 1, 
    studentName: "John Doe", 
    studentId: "S1001",
    grade: "10th",
    subject: "Mathematics",
    attendancePercentage: 65,
    lastAttendance: "2025-04-10",
    status: "pending",
    createdAt: "2025-04-15"
  },
  { 
    id: 2, 
    studentName: "Emma Wilson", 
    studentId: "S1002",
    grade: "9th",
    subject: "Physics",
    attendancePercentage: 68,
    lastAttendance: "2025-04-12",
    status: "sent",
    createdAt: "2025-04-14"
  },
  { 
    id: 3, 
    studentName: "Michael Brown", 
    studentId: "S1003",
    grade: "11th",
    subject: "Chemistry",
    attendancePercentage: 62,
    lastAttendance: "2025-04-11",
    status: "resolved",
    createdAt: "2025-04-13"
  },
  { 
    id: 4, 
    studentName: "Sophia Garcia", 
    studentId: "S1004",
    grade: "10th",
    subject: "Biology",
    attendancePercentage: 60,
    lastAttendance: "2025-04-09",
    status: "pending",
    createdAt: "2025-04-16"
  },
  { 
    id: 5, 
    studentName: "William Martinez", 
    studentId: "S1005",
    grade: "12th",
    subject: "English",
    attendancePercentage: 67,
    lastAttendance: "2025-04-08",
    status: "sent",
    createdAt: "2025-04-15"
  },
]

const AttendanceNotices = () => {
  const [notices, setNotices] = useState<AttendanceNotice[]>(initialNotices)
  const [searchTerm, setSearchTerm] = useState("")
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false)
  const [currentNotice, setCurrentNotice] = useState<AttendanceNotice | null>(null)

  // Filter notices based on search term
  const filteredNotices = notices.filter(notice => 
    notice.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    notice.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    notice.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    notice.grade.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  // Handle opening details dialog
  const handleViewDetails = (notice: AttendanceNotice) => {
    setCurrentNotice(notice)
    setIsDetailsDialogOpen(true)
  }

  // Handle sending notice
  const handleSendNotice = (id: number) => {
    setNotices(notices.map(notice => 
      notice.id === id ? { ...notice, status: "sent" } : notice
    ))
    toast({
      title: "Notice Sent",
      description: "The attendance notice has been sent successfully.",
    })
  }

  // Handle resolving notice
  const handleResolveNotice = (id: number) => {
    setNotices(notices.map(notice => 
      notice.id === id ? { ...notice, status: "resolved" } : notice
    ))
    toast({
      title: "Notice Resolved",
      description: "The attendance notice has been marked as resolved.",
    })
  }

  // Return badge color based on status
  const getStatusBadge = (status: string) => {
    switch(status) {
      case "pending":
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-600 border-yellow-300">Pending</Badge>
      case "sent":
        return <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-300">Sent</Badge>
      case "resolved":
        return <Badge variant="outline" className="bg-green-50 text-green-600 border-green-300">Resolved</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  // Get color class based on attendance percentage
  const getAttendanceColorClass = (percentage: number) => {
    if (percentage < 65) return "text-red-600"
    if (percentage < 75) return "text-amber-600"
    return "text-green-600"
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-3xl font-bold">Attendance Notices</h1>
            <div className="ml-4 bg-red-50 text-red-600 border border-red-200 px-3 py-1 rounded-full text-sm font-medium flex items-center">
              <AlertTriangle className="h-4 w-4 mr-1" />
              <span>Low Attendance Alerts</span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search by name, ID, subject, or grade..."
              className="pl-8"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
        </div>

        <Table>
          <TableCaption>A list of students with low attendance.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Student</TableHead>
              <TableHead>Grade</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Attendance</TableHead>
              <TableHead>Last Attendance</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredNotices.map((notice) => (
              <TableRow key={notice.id}>
                <TableCell>
                  <div>
                    <p className="font-medium">{notice.studentName}</p>
                    <p className="text-sm text-muted-foreground">{notice.studentId}</p>
                  </div>
                </TableCell>
                <TableCell>{notice.grade}</TableCell>
                <TableCell>{notice.subject}</TableCell>
                <TableCell>
                  <span className={getAttendanceColorClass(notice.attendancePercentage)}>
                    {notice.attendancePercentage}%
                  </span>
                </TableCell>
                <TableCell>{notice.lastAttendance}</TableCell>
                <TableCell>{getStatusBadge(notice.status)}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleViewDetails(notice)}
                    >
                      Details
                    </Button>
                    {notice.status === "pending" && (
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="text-blue-600" 
                        onClick={() => handleSendNotice(notice.id)}
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    )}
                    {notice.status !== "resolved" && (
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="text-green-600" 
                        onClick={() => handleResolveNotice(notice.id)}
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {currentNotice && (
          <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Attendance Notice Details</DialogTitle>
                <DialogDescription>
                  Detailed information about the attendance notice
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Student Name</h3>
                    <p className="text-base">{currentNotice.studentName}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Student ID</h3>
                    <p className="text-base">{currentNotice.studentId}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Grade</h3>
                    <p className="text-base">{currentNotice.grade}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Subject</h3>
                    <p className="text-base">{currentNotice.subject}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Attendance</h3>
                    <p className={`text-base ${getAttendanceColorClass(currentNotice.attendancePercentage)}`}>
                      {currentNotice.attendancePercentage}%
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Last Attendance</h3>
                    <p className="text-base">{currentNotice.lastAttendance}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Status</h3>
                    <div className="mt-1">{getStatusBadge(currentNotice.status)}</div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Created On</h3>
                    <p className="text-base">{currentNotice.createdAt}</p>
                  </div>
                </div>

                <div className="pt-2">
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Recommended Action</h3>
                  <p className="text-sm bg-orange-50 border border-orange-200 p-3 rounded-md text-orange-800">
                    Student has missed multiple classes and attendance percentage is below the minimum requirement of 75%. 
                    It is recommended to contact the student's parents and arrange a meeting with the class teacher.
                  </p>
                </div>
              </div>
              <DialogFooter className="gap-2">
                {currentNotice.status === "pending" && (
                  <Button 
                    variant="outline" 
                    className="gap-1" 
                    onClick={() => {
                      handleSendNotice(currentNotice.id)
                      setIsDetailsDialogOpen(false)
                    }}
                  >
                    <Send className="h-4 w-4" />
                    Send Notice
                  </Button>
                )}
                {currentNotice.status !== "resolved" && (
                  <Button 
                    variant="outline" 
                    className="gap-1" 
                    onClick={() => {
                      handleResolveNotice(currentNotice.id)
                      setIsDetailsDialogOpen(false)
                    }}
                  >
                    <Check className="h-4 w-4" />
                    Mark Resolved
                  </Button>
                )}
                <Button onClick={() => setIsDetailsDialogOpen(false)}>Close</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </MainLayout>
  )
}

export default AttendanceNotices
