import { useState } from "react"
import { 
  Table, TableBody, TableCaption, TableCell, 
  TableHead, TableHeader, TableRow 
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { 
  Dialog, DialogContent, DialogDescription, 
  DialogFooter, DialogHeader, DialogTitle
} from "@/components/ui/dialog"
import { 
  Card, CardContent, CardDescription, 
  CardFooter, CardHeader, CardTitle 
} from "@/components/ui/card"
import {
  Tabs, TabsContent, TabsList, TabsTrigger
} from "@/components/ui/tabs"
import { Plus, Clock, FileText, Upload, CheckCircle, Calendar, Search } from "lucide-react"
import MainLayout from "@/components/layout/MainLayout"

// Sample assignment data
const initialAssignments = [
  { 
    id: 1, 
    title: "Quadratic Equations", 
    subject: "Mathematics", 
    grade: "10", 
    dueDate: "2025-04-25", 
    description: "Solve problems 1-15 from Chapter 8. Show all work and steps.",
    submissions: 36,
    maxSubmissions: 45,
    status: "active"
  },
  { 
    id: 2, 
    title: "Newton's Laws Lab Report", 
    subject: "Physics", 
    grade: "11", 
    dueDate: "2025-04-30", 
    description: "Write a detailed lab report on the Newton's Laws experiment conducted in class.",
    submissions: 28,
    maxSubmissions: 40,
    status: "active"
  },
  { 
    id: 3, 
    title: "Essay on Hamlet", 
    subject: "English", 
    grade: "12", 
    dueDate: "2025-05-05", 
    description: "Write a 1500-word essay analyzing the character development of Hamlet.",
    submissions: 12,
    maxSubmissions: 35,
    status: "active"
  },
  { 
    id: 4, 
    title: "Chemical Reactions Worksheet", 
    subject: "Chemistry", 
    grade: "10", 
    dueDate: "2025-04-20", 
    description: "Complete the chemical reactions worksheet provided in class.",
    submissions: 42,
    maxSubmissions: 45,
    status: "active"
  },
  { 
    id: 5, 
    title: "History Timeline Project", 
    subject: "History", 
    grade: "9", 
    dueDate: "2025-04-15", 
    description: "Create a detailed timeline of the major events from 1900-1950.",
    submissions: 38,
    maxSubmissions: 38,
    status: "completed"
  },
]

// Sample student assignment data (submissions view)
const studentAssignments = [
  { 
    id: 1, 
    title: "Quadratic Equations", 
    subject: "Mathematics", 
    teacher: "Dr. Sarah Johnson",
    dueDate: "2025-04-25", 
    description: "Solve problems 1-15 from Chapter 8. Show all work and steps.",
    status: "pending"
  },
  { 
    id: 2, 
    title: "Newton's Laws Lab Report", 
    subject: "Physics", 
    teacher: "Prof. James Wilson",
    dueDate: "2025-04-30", 
    description: "Write a detailed lab report on the Newton's Laws experiment conducted in class.",
    status: "pending"
  },
  { 
    id: 3, 
    title: "Essay on Hamlet", 
    subject: "English", 
    teacher: "Mr. Robert Brown",
    dueDate: "2025-05-05", 
    description: "Write a 1500-word essay analyzing the character development of Hamlet.",
    status: "pending"
  },
  { 
    id: 4, 
    title: "Chemical Reactions Worksheet", 
    subject: "Chemistry", 
    teacher: "Mr. David Miller",
    dueDate: "2025-04-20", 
    description: "Complete the chemical reactions worksheet provided in class.",
    status: "pending"
  },
  { 
    id: 5, 
    title: "History Timeline Project", 
    subject: "History", 
    teacher: "Ms. Jessica Taylor",
    dueDate: "2025-04-15", 
    description: "Create a detailed timeline of the major events from 1900-1950.",
    status: "submitted",
    submissionDate: "2025-04-12"
  },
]

// Form interfaces
interface AssignmentForm {
  id?: number
  title: string
  subject: string
  grade: string
  dueDate: string
  description: string
}

// For file upload UI
interface SubmissionForm {
  assignmentId: number
  file?: File | null
  comment: string
}

const Assignments = () => {
  const [userRole, setUserRole] = useState("teacher") // would come from auth context
  const [assignments, setAssignments] = useState(initialAssignments)
  const [searchTerm, setSearchTerm] = useState("")
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isSubmitOpen, setIsSubmitOpen] = useState(false)
  const [isViewOpen, setIsViewOpen] = useState(false)
  const [selectedAssignment, setSelectedAssignment] = useState<any>(null)
  
  const [formData, setFormData] = useState<AssignmentForm>({
    title: "",
    subject: "",
    grade: "",
    dueDate: "",
    description: ""
  })
  
  const [submissionForm, setSubmissionForm] = useState<SubmissionForm>({
    assignmentId: 0,
    file: null,
    comment: ""
  })

  // Filter assignments based on search term
  const filteredAssignments = userRole === "teacher"
    ? assignments.filter(assignment => 
        assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        assignment.subject.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : studentAssignments.filter(assignment => 
        assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        assignment.subject.toLowerCase().includes(searchTerm.toLowerCase())
      )

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  // Handle form input changes for assignment creation
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  // Handle submission form changes
  const handleSubmissionChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setSubmissionForm({
      ...submissionForm,
      [name]: value
    })
  }

  // Handle file input change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setSubmissionForm({
      ...submissionForm,
      file
    })
  }

  // Handle add new assignment
  const handleAddAssignment = () => {
    setFormData({
      title: "",
      subject: "",
      grade: "",
      dueDate: "",
      description: ""
    })
    setIsFormOpen(true)
  }

  // Handle form submission for new assignment
  const handleSaveAssignment = () => {
    if (formData.id) {
      // Update existing assignment
      setAssignments(assignments.map(assignment => 
        assignment.id === formData.id 
          ? { 
              ...assignment, 
              title: formData.title,
              subject: formData.subject,
              grade: formData.grade,
              dueDate: formData.dueDate,
              description: formData.description 
            } 
          : assignment
      ))
    } else {
      // Add new assignment
      const newAssignment = {
        ...formData,
        id: Math.max(...assignments.map(a => a.id)) + 1,
        submissions: 0,
        maxSubmissions: 45, // assuming a class size
        status: "active"
      }
      setAssignments([...assignments, newAssignment])
    }
    
    setIsFormOpen(false)
  }

  // Handle opening submission dialog
  const handleSubmit = (assignment: any) => {
    setSelectedAssignment(assignment)
    setSubmissionForm({
      assignmentId: assignment.id,
      file: null,
      comment: ""
    })
    setIsSubmitOpen(true)
  }

  // Handle saving submission
  const handleSaveSubmission = () => {
    // In a real app, we would upload the file and save the submission
    // Here we just update the UI state for demo purposes
    
    if (userRole === "student") {
      // Update the status of the assignment to submitted
      const updatedAssignments = studentAssignments.map(assignment => 
        assignment.id === submissionForm.assignmentId
          ? { 
              ...assignment, 
              status: "submitted",
              submissionDate: new Date().toISOString().split('T')[0]
            }
          : assignment
      )
      
      // Note: In a real app, this would be connecting to an API
      // For demo purposes, we're not actually updating the state here
    }
    
    setIsSubmitOpen(false)
  }

  // Handle view assignment details
  const handleViewAssignment = (assignment: any) => {
    setSelectedAssignment(assignment)
    setIsViewOpen(true)
  }

  // Format due date to show days remaining
  const formatDueDate = (dueDate: string) => {
    const today = new Date()
    const due = new Date(dueDate)
    const diffTime = due.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays < 0) {
      return <span className="text-destructive">Overdue</span>
    } else if (diffDays === 0) {
      return <span className="text-destructive">Due today</span>
    } else if (diffDays === 1) {
      return <span className="text-amber-600">Due tomorrow</span>
    } else if (diffDays <= 3) {
      return <span className="text-amber-600">Due in {diffDays} days</span>
    } else {
      return <span>Due in {diffDays} days</span>
    }
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Assignments</h1>
          {userRole === "teacher" && (
            <Button onClick={handleAddAssignment}>
              <Plus className="h-4 w-4 mr-2" />
              Create Assignment
            </Button>
          )}
        </div>

        <Tabs defaultValue={userRole} onValueChange={setUserRole} className="space-y-6">
          <TabsList className="grid w-full md:w-fit grid-cols-2">
            <TabsTrigger value="teacher">Teacher View</TabsTrigger>
            <TabsTrigger value="student">Student View</TabsTrigger>
          </TabsList>
          
          <TabsContent value="teacher">
            <div className="space-y-6">
              <div className="flex items-center space-x-2">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search assignments..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                </div>
              </div>

              <Table>
                <TableCaption>List of assignments created by you.</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Grade</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Submissions</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAssignments.map((assignment) => (
                    <TableRow key={assignment.id}>
                      <TableCell className="font-medium">{assignment.title}</TableCell>
                      <TableCell>{assignment.subject}</TableCell>
                      <TableCell>{assignment.grade}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>{assignment.dueDate}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <span>{assignment.submissions}/{assignment.maxSubmissions}</span>
                          <div className="w-20 h-2 bg-gray-200 rounded-full ml-2">
                            <div 
                              className="h-full bg-primary rounded-full" 
                              style={{ width: `${(assignment.submissions / assignment.maxSubmissions) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span 
                          className={`px-2 py-1 rounded text-xs font-semibold ${
                            assignment.status === 'active' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {assignment.status === 'active' ? 'Active' : 'Completed'}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleViewAssignment(assignment)}
                        >
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          
          <TabsContent value="student">
            <div className="space-y-6">
              <div className="flex items-center space-x-2">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search assignments..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredAssignments.map((assignment) => (
                  <Card key={assignment.id} className="overflow-hidden">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-xl">{assignment.title}</CardTitle>
                      <CardDescription>
                        {assignment.subject} | {assignment.teacher}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          {formatDueDate(assignment.dueDate)}
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-3">
                          {assignment.description}
                        </p>
                      </div>
                    </CardContent>
                    <CardFooter className="border-t bg-muted/50 px-6 py-3">
                      <div className="flex justify-between items-center w-full">
                        <div>
                          {assignment.status === 'submitted' ? (
                            <div className="flex items-center text-sm text-green-600">
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Submitted
                            </div>
                          ) : (
                            <div className="text-sm text-muted-foreground">
                              Pending
                            </div>
                          )}
                        </div>
                        {assignment.status === 'submitted' ? (
                          <Button variant="outline" size="sm" onClick={() => handleViewAssignment(assignment)}>
                            View
                          </Button>
                        ) : (
                          <Button size="sm" onClick={() => handleSubmit(assignment)}>
                            <Upload className="h-4 w-4 mr-1" />
                            Submit
                          </Button>
                        )}
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Assignment creation dialog */}
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Create New Assignment</DialogTitle>
              <DialogDescription>
                Fill in the details to create a new assignment for your students.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <label htmlFor="title" className="text-sm font-medium">Title</label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Assignment title"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">Subject</label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="Subject"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="grade" className="text-sm font-medium">Grade</label>
                  <Input
                    id="grade"
                    name="grade"
                    value={formData.grade}
                    onChange={handleInputChange}
                    placeholder="Grade/Class"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="dueDate" className="text-sm font-medium">Due Date</label>
                <Input
                  id="dueDate"
                  name="dueDate"
                  type="date"
                  value={formData.dueDate}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="description" className="text-sm font-medium">Description</label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Assignment description and instructions"
                  rows={4}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsFormOpen(false)}>Cancel</Button>
              <Button onClick={handleSaveAssignment}>Save Assignment</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Assignment submission dialog */}
        <Dialog open={isSubmitOpen} onOpenChange={setIsSubmitOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Submit Assignment</DialogTitle>
              <DialogDescription>
                Upload your work for {selectedAssignment?.title}.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Assignment Details</label>
                <div className="bg-muted p-3 rounded-md text-sm">
                  <p className="font-medium">{selectedAssignment?.title}</p>
                  <p className="text-muted-foreground mt-1">{selectedAssignment?.description}</p>
                  <p className="text-xs mt-2 flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    Due: {selectedAssignment?.dueDate}
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="file" className="text-sm font-medium">Upload File</label>
                <Input
                  id="file"
                  name="file"
                  type="file"
                  onChange={handleFileChange}
                />
                <p className="text-xs text-muted-foreground">Accepted file types: PDF, DOC, DOCX, PPT, PPTX (Max: 10MB)</p>
              </div>
              <div className="space-y-2">
                <label htmlFor="comment" className="text-sm font-medium">Comments (Optional)</label>
                <Textarea
                  id="comment"
                  name="comment"
                  value={submissionForm.comment}
                  onChange={handleSubmissionChange}
                  placeholder="Add any comments about your submission"
                  rows={3}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsSubmitOpen(false)}>Cancel</Button>
              <Button onClick={handleSaveSubmission}>Submit Assignment</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Assignment view dialog */}
        <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Assignment Details</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold">{selectedAssignment?.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {selectedAssignment?.subject} | {userRole === "student" ? selectedAssignment?.teacher : `Grade ${selectedAssignment?.grade}`}
                </p>
              </div>
              
              <div className="bg-muted p-4 rounded-md">
                <div className="flex justify-between mb-3">
                  <span className="text-sm font-medium">Due Date</span>
                  <span className="text-sm">{selectedAssignment?.dueDate}</span>
                </div>
                
                {userRole === "teacher" && (
                  <div className="flex justify-between mb-3">
                    <span className="text-sm font-medium">Submissions</span>
                    <span className="text-sm">{selectedAssignment?.submissions}/{selectedAssignment?.maxSubmissions}</span>
                  </div>
                )}
                
                {userRole === "student" && selectedAssignment?.status === "submitted" && (
                  <div className="flex justify-between mb-3">
                    <span className="text-sm font-medium">Submitted On</span>
                    <span className="text-sm">{selectedAssignment?.submissionDate}</span>
                  </div>
                )}
                
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Status</span>
                  <span 
                    className={`px-2 py-0.5 rounded text-xs font-semibold ${
                      (selectedAssignment?.status === 'active' || selectedAssignment?.status === 'pending') 
                        ? 'bg-amber-100 text-amber-800' 
                        : 'bg-green-100 text-green-800'
                    }`}
                  >
                    {userRole === "teacher" 
                      ? (selectedAssignment?.status === 'active' ? 'Active' : 'Completed')
                      : (selectedAssignment?.status === 'submitted' ? 'Submitted' : 'Pending')}
                  </span>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-2">Description</h4>
                <p className="text-sm whitespace-pre-line">{selectedAssignment?.description}</p>
              </div>
              
              {userRole === "student" && selectedAssignment?.status === "submitted" && (
                <div>
                  <h4 className="text-sm font-medium mb-2">Your Submission</h4>
                  <div className="flex items-center gap-2 bg-slate-100 p-3 rounded">
                    <FileText className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm font-medium">Assignment_Submission.pdf</p>
                      <p className="text-xs text-muted-foreground">Submitted on {selectedAssignment?.submissionDate}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <DialogFooter>
              {userRole === "student" && selectedAssignment?.status !== "submitted" && (
                <Button onClick={() => {
                  setIsViewOpen(false);
                  handleSubmit(selectedAssignment);
                }}>
                  Submit Assignment
                </Button>
              )}
              {userRole === "teacher" && (
                <Button variant="outline" onClick={() => setIsViewOpen(false)}>
                  Close
                </Button>
              )}
              {userRole === "student" && selectedAssignment?.status === "submitted" && (
                <Button variant="outline" onClick={() => setIsViewOpen(false)}>
                  Close
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </MainLayout>
  )
}

export default Assignments
