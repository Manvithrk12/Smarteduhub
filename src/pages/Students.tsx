import { useState } from "react"
import { 
  Table, TableBody, TableCaption, TableCell, 
  TableHead, TableHeader, TableRow 
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog, DialogContent, DialogDescription,
  DialogFooter, DialogHeader, DialogTitle, DialogTrigger
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, MessageSquare, Star } from "lucide-react"
import MainLayout from "@/components/layout/MainLayout"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { BellRing } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { toast } from "@/components/ui/use-toast"

// Types for our data
interface FeedbackFormToFill {
  id: number
  title: string
  type: "teacher" | "course" | "infrastructure" | "exam" | "parent"
  questions: string[]
  teacherName: string
  dueDate: string
}

interface AttendanceAlert {
  id: number
  message: string
  date: string
  subject: string
  attendancePercentage: number
}

interface Assignment {
  id: number
  subject: string
  title: string
  dueDate: string
  status: "pending" | "submitted"
}

interface DoubtSession {
  id: number
  subject: string
  teacherName: string
  status: "available" | "busy"
}

interface Feedback {
  id: number
  date: string
  subject: string
  teacherName: string
  message: string
}

// Sample data
const pendingFeedbackForms: FeedbackFormToFill[] = [
  {
    id: 1,
    title: "Mathematics Teaching Feedback",
    type: "teacher",
    teacherName: "Mr. Smith",
    questions: [
      "How would you rate the teaching methods?",
      "Is the pace of teaching appropriate?",
      "How clear are the explanations?",
    ],
    dueDate: "2025-04-25"
  }
]

const attendanceAlerts: AttendanceAlert[] = [
  {
    id: 1,
    message: "Your attendance is below required percentage in Mathematics",
    date: "2025-04-19",
    subject: "Mathematics",
    attendancePercentage: 75
  }
]

const sampleAssignments: Assignment[] = [
  {
    id: 1,
    subject: "Mathematics",
    title: "Algebra Exercise Set 1",
    dueDate: "2025-04-25",
    status: "pending"
  },
  {
    id: 2,
    subject: "Physics",
    title: "Force and Motion Problems",
    dueDate: "2025-04-23",
    status: "submitted"
  }
]

const sampleDoubtSessions: DoubtSession[] = [
  {
    id: 1,
    subject: "Mathematics",
    teacherName: "Mr. Smith",
    status: "available"
  },
  {
    id: 2,
    subject: "Physics",
    teacherName: "Mrs. Johnson",
    status: "busy"
  }
]

const sampleFeedback: Feedback[] = [
  {
    id: 1,
    date: "2025-04-18",
    subject: "Mathematics",
    teacherName: "Mr. Smith",
    message: "Excellent progress in problem-solving skills"
  }
]

export default function Students() {
  const [activeTab, setActiveTab] = useState("assignments")
  const [showDoubtDialog, setShowDoubtDialog] = useState(false)
  const [selectedTeacher, setSelectedTeacher] = useState<DoubtSession | null>(null)
  const [activeFeedbackForm, setActiveFeedbackForm] = useState<FeedbackFormToFill | null>(null)
  const [answers, setAnswers] = useState<string[]>([])
  const navigate = useNavigate()

  const requestDoubtSession = (teacher: DoubtSession) => {
    setSelectedTeacher(teacher)
    setShowDoubtDialog(true)
  }

  const handleFeedbackSubmit = (formId: number) => {
    // Here you would typically send the feedback to your backend
    toast({
      title: "Feedback Submitted",
      description: "Thank you for your feedback!",
    })
    setActiveFeedbackForm(null)
    // Redirect to principal's page after submission
    navigate("/principals")
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Student Dashboard</h1>

        {/* Attendance Alerts Section */}
        <div className="space-y-4">
          {attendanceAlerts.map((alert) => (
            <Alert key={alert.id}>
              <BellRing className="h-4 w-4" />
              <AlertTitle className="font-medium">
                Attendance Alert for {alert.subject}
              </AlertTitle>
              <AlertDescription>
                {alert.message} - Current attendance: {alert.attendancePercentage}%
              </AlertDescription>
            </Alert>
          ))}
        </div>

        {/* Pending Feedback Forms Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Pending Feedback Forms</h2>
          <Table>
            <TableCaption>List of feedback forms to be filled</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Teacher</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pendingFeedbackForms.map((form) => (
                <TableRow key={form.id}>
                  <TableCell>{form.title}</TableCell>
                  <TableCell>{form.teacherName}</TableCell>
                  <TableCell>{form.dueDate}</TableCell>
                  <TableCell>
                    <Button 
                      variant="outline"
                      onClick={() => setActiveFeedbackForm(form)}
                    >
                      Fill Feedback
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Feedback Form Dialog */}
        <Dialog 
          open={!!activeFeedbackForm} 
          onOpenChange={() => setActiveFeedbackForm(null)}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{activeFeedbackForm?.title}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              {activeFeedbackForm?.questions.map((question, index) => (
                <div key={index} className="space-y-2">
                  <label className="text-sm font-medium">{question}</label>
                  <textarea
                    className="w-full min-h-[100px] p-2 border rounded-md"
                    value={answers[index] || ""}
                    onChange={(e) => {
                      const newAnswers = [...answers]
                      newAnswers[index] = e.target.value
                      setAnswers(newAnswers)
                    }}
                  />
                </div>
              ))}
              <div className="flex justify-end space-x-2">
                <Button 
                  variant="outline" 
                  onClick={() => setActiveFeedbackForm(null)}
                >
                  Cancel
                </Button>
                <Button 
                  onClick={() => activeFeedbackForm && handleFeedbackSubmit(activeFeedbackForm.id)}
                >
                  Submit Feedback
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Rest of the student dashboard content */}
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="assignments">
              <FileText className="w-4 h-4 mr-2" />
              Assignments
            </TabsTrigger>
            <TabsTrigger value="doubt-sessions">
              <MessageSquare className="w-4 h-4 mr-2" />
              Doubt Sessions
            </TabsTrigger>
            <TabsTrigger value="feedback">
              <Star className="w-4 h-4 mr-2" />
              Feedback
            </TabsTrigger>
          </TabsList>

          <TabsContent value="assignments" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Current Assignments</CardTitle>
                <CardDescription>View and manage your assignments</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Subject</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sampleAssignments.map((assignment) => (
                      <TableRow key={assignment.id}>
                        <TableCell>{assignment.subject}</TableCell>
                        <TableCell>{assignment.title}</TableCell>
                        <TableCell>{assignment.dueDate}</TableCell>
                        <TableCell>{assignment.status}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="doubt-sessions" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Available Teachers</CardTitle>
                <CardDescription>Request a doubt clearing session</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Subject</TableHead>
                      <TableHead>Teacher</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sampleDoubtSessions.map((session) => (
                      <TableRow key={session.id}>
                        <TableCell>{session.subject}</TableCell>
                        <TableCell>{session.teacherName}</TableCell>
                        <TableCell>{session.status}</TableCell>
                        <TableCell>
                          <Button
                            variant="outline"
                            disabled={session.status === "busy"}
                            onClick={() => requestDoubtSession(session)}
                          >
                            Request Session
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="feedback" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Teacher Feedback</CardTitle>
                <CardDescription>View feedback from your teachers</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Subject</TableHead>
                      <TableHead>Teacher</TableHead>
                      <TableHead>Feedback</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sampleFeedback.map((feedback) => (
                      <TableRow key={feedback.id}>
                        <TableCell>{feedback.date}</TableCell>
                        <TableCell>{feedback.subject}</TableCell>
                        <TableCell>{feedback.teacherName}</TableCell>
                        <TableCell>{feedback.message}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Dialog open={showDoubtDialog} onOpenChange={setShowDoubtDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Request Doubt Session</DialogTitle>
              <DialogDescription>
                Request a doubt clearing session with {selectedTeacher?.teacherName} for {selectedTeacher?.subject}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <Input placeholder="Enter your doubt or question" />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowDoubtDialog(false)}>Cancel</Button>
              <Button onClick={() => setShowDoubtDialog(false)}>Send Request</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </MainLayout>
  )
}
