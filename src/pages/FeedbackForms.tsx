
import { useState } from "react"
import { 
  Table, TableBody, TableCaption, TableCell, 
  TableHead, TableHeader, TableRow 
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Dialog, DialogContent, DialogDescription, 
  DialogFooter, DialogHeader, DialogTitle,
  DialogTrigger 
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
  ClipboardCheck, Check, Search, Star, StarHalf, MessageSquare, Eye, Pencil, Plus, FilterX 
} from "lucide-react"
import MainLayout from "@/components/layout/MainLayout"
import { toast } from "@/components/ui/use-toast"

// Feedback form interface
interface FeedbackForm {
  id: number
  title: string
  type: "teacher" | "course" | "infrastructure" | "exam" | "parent"
  dueDate: string
  status: "active" | "completed" | "draft"
  submissions: number
  totalRecipients: number
  lastUpdated: string
}

// Sample feedback forms data
const initialFeedbackForms: FeedbackForm[] = [
  { 
    id: 1, 
    title: "Teacher Performance Evaluation", 
    type: "teacher",
    dueDate: "2025-04-25",
    status: "active",
    submissions: 24,
    totalRecipients: 45,
    lastUpdated: "2025-04-15"
  },
  { 
    id: 2, 
    title: "Course Content Feedback", 
    type: "course",
    dueDate: "2025-04-20",
    status: "active",
    submissions: 32,
    totalRecipients: 40,
    lastUpdated: "2025-04-10"
  },
  { 
    id: 3, 
    title: "School Infrastructure Assessment", 
    type: "infrastructure",
    dueDate: "2025-04-28",
    status: "active",
    submissions: 15,
    totalRecipients: 50,
    lastUpdated: "2025-04-16"
  },
  { 
    id: 4, 
    title: "Exam Difficulty Survey", 
    type: "exam",
    dueDate: "2025-04-15",
    status: "completed",
    submissions: 38,
    totalRecipients: 38,
    lastUpdated: "2025-04-15"
  },
  { 
    id: 5, 
    title: "Parent Satisfaction Survey", 
    type: "parent",
    dueDate: "2025-05-10",
    status: "draft",
    submissions: 0,
    totalRecipients: 0,
    lastUpdated: "2025-04-14"
  },
]

// Sample teacher list for feedback assignment
const teachersList = [
  { id: 1, name: "Dr. Sarah Johnson", subject: "Mathematics" },
  { id: 2, name: "Prof. James Wilson", subject: "Physics" },
  { id: 3, name: "Ms. Emily Parker", subject: "Biology" },
  { id: 4, name: "Mr. David Miller", subject: "Chemistry" },
  { id: 5, name: "Dr. Robert Brown", subject: "English Literature" },
]

// Feedback form interface
interface FeedbackForm {
  id: number
  title: string
  type: "teacher" | "course" | "infrastructure" | "exam" | "parent"
  dueDate: string
  status: "active" | "completed" | "draft"
  submissions: number
  totalRecipients: number
  lastUpdated: string
}

// New form state interface
interface NewFormState {
  title: string
  type: "teacher" | "course" | "infrastructure" | "exam" | "parent"
  dueDate: string
  questions: string[]
  assignTo: number[]
}

const FeedbackForms = () => {
  const [feedbackForms, setFeedbackForms] = useState<FeedbackForm[]>(initialFeedbackForms)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false)
  const [isNewFormDialogOpen, setIsNewFormDialogOpen] = useState(false)
  const [currentFormId, setCurrentFormId] = useState<number | null>(null)
  
  // New form state
  const [newForm, setNewForm] = useState<NewFormState>({
    title: "",
    type: "teacher",
    dueDate: "",
    questions: ["", "", ""],
    assignTo: []
  })

  // Filter forms based on search term and status
  const filteredForms = feedbackForms.filter(form => {
    const matchesSearch = form.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || form.status === statusFilter
    return matchesSearch && matchesStatus
  })

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  // Handle status filter change
  const handleStatusChange = (value: string) => {
    setStatusFilter(value)
  }

  // Get feedback form status badge
  const getStatusBadge = (status: string) => {
    switch(status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>
      case "completed":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Completed</Badge>
      case "draft":
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Draft</Badge>
      default:
        return null
    }
  }

  // Calculate completion percentage
  const calculateCompletion = (submissions: number, total: number) => {
    if (total === 0) return 0
    return Math.round((submissions / total) * 100)
  }

  // Handle clicking on view form
  const handleViewForm = (formId: number) => {
    setCurrentFormId(formId)
    setIsDetailDialogOpen(true)
  }

  // Reset filters
  const resetFilters = () => {
    setSearchTerm("")
    setStatusFilter("all")
  }

  // Update question in new form
  const updateQuestion = (index: number, value: string) => {
    const updatedQuestions = [...newForm.questions]
    updatedQuestions[index] = value
    setNewForm({ ...newForm, questions: updatedQuestions })
  }

  // Add new question field
  const addQuestionField = () => {
    setNewForm({ ...newForm, questions: [...newForm.questions, ""] })
  }

  // Handle form field change
  const handleFormFieldChange = (field: keyof NewFormState, value: any) => {
    setNewForm({ ...newForm, [field]: value })
  }

  // Handle teacher selection in multi-select
  const handleTeacherSelection = (teacherId: number) => {
    const currentSelection = [...newForm.assignTo]
    
    if (currentSelection.includes(teacherId)) {
      // Remove if already selected
      const updatedSelection = currentSelection.filter(id => id !== teacherId)
      setNewForm({ ...newForm, assignTo: updatedSelection })
    } else {
      // Add if not selected
      setNewForm({ ...newForm, assignTo: [...currentSelection, teacherId] })
    }
  }

  // Create new form
  const handleCreateForm = () => {
    // Validate form
    if (!newForm.title || !newForm.type || !newForm.dueDate) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      })
      return
    }

    if (newForm.questions.some(q => !q)) {
      toast({
        title: "Incomplete Questions",
        description: "Please fill in all questions or remove empty ones.",
        variant: "destructive"
      })
      return
    }

    // Create new form
    const newFeedbackForm: FeedbackForm = {
      id: Math.max(...feedbackForms.map(f => f.id), 0) + 1,
      title: newForm.title,
      type: newForm.type,
      dueDate: newForm.dueDate,
      status: "draft",
      submissions: 0,
      totalRecipients: newForm.assignTo.length,
      lastUpdated: new Date().toISOString().split('T')[0]
    }

    setFeedbackForms([...feedbackForms, newFeedbackForm])
    
    // Reset form and close dialog
    setNewForm({
      title: "",
      type: "teacher",
      dueDate: "",
      questions: ["", "", ""],
      assignTo: []
    })
    
    setIsNewFormDialogOpen(false)
    
    toast({
      title: "Form Created",
      description: "Your feedback form has been created as a draft."
    })
  }

  // Publish form
  const handlePublishForm = (formId: number) => {
    setFeedbackForms(feedbackForms.map(form => 
      form.id === formId ? { ...form, status: "active" } : form
    ))
    
    toast({
      title: "Form Published",
      description: "Your feedback form is now live and has been sent to recipients."
    })
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Feedback Forms</h1>
            <p className="text-muted-foreground">Create and manage feedback surveys</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-1" onClick={resetFilters}>
              <FilterX className="h-4 w-4" />
              Reset Filters
            </Button>
            <Button className="gap-1" onClick={() => setIsNewFormDialogOpen(true)}>
              <Plus className="h-4 w-4" />
              New Form
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Forms</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{feedbackForms.length}</div>
              <p className="text-xs text-muted-foreground">All feedback forms</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Active Forms</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {feedbackForms.filter(form => form.status === "active").length}
              </div>
              <p className="text-xs text-muted-foreground">Currently collecting responses</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Completed Forms</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {feedbackForms.filter(form => form.status === "completed").length}
              </div>
              <p className="text-xs text-muted-foreground">Responses collected</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Submissions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {feedbackForms.reduce((sum, form) => sum + form.submissions, 0)}
              </div>
              <p className="text-xs text-muted-foreground">Feedback responses received</p>
            </CardContent>
          </Card>
        </div>

        <div className="flex items-center space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search forms..."
              className="pl-8"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          <div className="w-[180px]">
            <Select value={statusFilter} onValueChange={handleStatusChange}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Status</SelectLabel>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Table>
          <TableCaption>List of feedback forms and surveys.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Completion</TableHead>
              <TableHead>Last Updated</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredForms.map((form) => (
              <TableRow key={form.id}>
                <TableCell className="font-medium">{form.title}</TableCell>
                <TableCell className="capitalize">{form.type}</TableCell>
                <TableCell>{form.dueDate}</TableCell>
                <TableCell>{getStatusBadge(form.status)}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-24 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary rounded-full" 
                        style={{ 
                          width: `${calculateCompletion(form.submissions, form.totalRecipients)}%` 
                        }}
                      ></div>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {form.submissions}/{form.totalRecipients}
                    </span>
                  </div>
                </TableCell>
                <TableCell>{form.lastUpdated}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="text-blue-600" 
                      onClick={() => handleViewForm(form.id)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    {form.status === "draft" && (
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="text-green-600" 
                        onClick={() => handlePublishForm(form.id)}
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                    )}
                    {form.status === "draft" && (
                      <Button 
                        variant="outline" 
                        size="icon"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
        {/* Form Details Dialog */}
        <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Form Details</DialogTitle>
              <DialogDescription>
                View details and responses for this feedback form
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6">
              {currentFormId && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Form Title</h3>
                      <p className="text-base font-medium">
                        {feedbackForms.find(f => f.id === currentFormId)?.title}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Type</h3>
                      <p className="text-base capitalize">
                        {feedbackForms.find(f => f.id === currentFormId)?.type}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Due Date</h3>
                      <p className="text-base">
                        {feedbackForms.find(f => f.id === currentFormId)?.dueDate}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Status</h3>
                      <div className="mt-1">
                        {getStatusBadge(feedbackForms.find(f => f.id === currentFormId)?.status || "")}
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Response Summary</h3>
                    <Card>
                      <CardContent className="pt-6">
                        <div className="grid grid-cols-3 gap-4">
                          <div className="text-center">
                            <p className="text-4xl font-bold text-primary">
                              {feedbackForms.find(f => f.id === currentFormId)?.submissions}
                            </p>
                            <p className="text-sm text-muted-foreground">Total Responses</p>
                          </div>
                          <div className="text-center">
                            <p className="text-4xl font-bold text-primary">
                              {calculateCompletion(
                                feedbackForms.find(f => f.id === currentFormId)?.submissions || 0,
                                feedbackForms.find(f => f.id === currentFormId)?.totalRecipients || 0
                              )}%
                            </p>
                            <p className="text-sm text-muted-foreground">Completion Rate</p>
                          </div>
                          <div className="text-center">
                            <div className="flex justify-center text-4xl font-bold text-primary">
                              <Star className="h-8 w-8 fill-primary text-primary" />
                              <span>4.2</span>
                            </div>
                            <p className="text-sm text-muted-foreground">Average Rating</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Sample Questions</h3>
                    <div className="space-y-3">
                      <div className="p-3 bg-muted rounded-md">
                        <p className="font-medium">How would you rate the overall teaching quality?</p>
                        <div className="flex mt-1 text-primary">
                          <Star className="h-5 w-5 fill-primary" />
                          <Star className="h-5 w-5 fill-primary" />
                          <Star className="h-5 w-5 fill-primary" />
                          <Star className="h-5 w-5 fill-primary" />
                          <StarHalf className="h-5 w-5 fill-primary" />
                        </div>
                      </div>
                      <div className="p-3 bg-muted rounded-md">
                        <p className="font-medium">Were the course materials helpful for your learning?</p>
                        <div className="flex mt-1 text-primary">
                          <Star className="h-5 w-5 fill-primary" />
                          <Star className="h-5 w-5 fill-primary" />
                          <Star className="h-5 w-5 fill-primary" />
                          <Star className="h-5 w-5 fill-primary" />
                          <Star className="h-5 w-5" />
                        </div>
                      </div>
                      <div className="p-3 bg-muted rounded-md">
                        <p className="font-medium">How clear was the teacher's explanation of the material?</p>
                        <div className="flex mt-1 text-primary">
                          <Star className="h-5 w-5 fill-primary" />
                          <Star className="h-5 w-5 fill-primary" />
                          <Star className="h-5 w-5 fill-primary" />
                          <Star className="h-5 w-5" />
                          <Star className="h-5 w-5" />
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
            <DialogFooter>
              <Button onClick={() => setIsDetailDialogOpen(false)}>Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        
        {/* New Form Dialog */}
        <Dialog open={isNewFormDialogOpen} onOpenChange={setIsNewFormDialogOpen}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Create New Feedback Form</DialogTitle>
              <DialogDescription>
                Design a new feedback form to collect responses
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="title" className="text-sm font-medium">Form Title</label>
                  <Input
                    id="title"
                    value={newForm.title}
                    onChange={(e) => handleFormFieldChange('title', e.target.value)}
                    placeholder="E.g., Teacher Performance Evaluation"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="type" className="text-sm font-medium">Form Type</label>
                  <Select 
                    value={newForm.type} 
                    onValueChange={(value) => handleFormFieldChange('type', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select form type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="teacher">Teacher Evaluation</SelectItem>
                      <SelectItem value="course">Course Feedback</SelectItem>
                      <SelectItem value="infrastructure">Infrastructure Assessment</SelectItem>
                      <SelectItem value="exam">Exam Feedback</SelectItem>
                      <SelectItem value="parent">Parent Survey</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="dueDate" className="text-sm font-medium">Due Date</label>
                  <Input
                    id="dueDate"
                    type="date"
                    value={newForm.dueDate}
                    onChange={(e) => handleFormFieldChange('dueDate', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Assign To</label>
                  <div className="border p-3 rounded-md max-h-32 overflow-y-auto">
                    {teachersList.map(teacher => (
                      <div key={teacher.id} className="flex items-center mb-2 last:mb-0">
                        <input
                          type="checkbox"
                          id={`teacher-${teacher.id}`}
                          className="mr-2"
                          checked={newForm.assignTo.includes(teacher.id)}
                          onChange={() => handleTeacherSelection(teacher.id)}
                        />
                        <label htmlFor={`teacher-${teacher.id}`} className="text-sm flex-1">
                          {teacher.name}
                          <span className="text-xs text-muted-foreground ml-1">
                            ({teacher.subject})
                          </span>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-medium">Questions</label>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="gap-1"
                    onClick={addQuestionField}
                  >
                    <Plus className="h-3 w-3" />
                    Add Question
                  </Button>
                </div>
                <div className="space-y-3">
                  {newForm.questions.map((question, index) => (
                    <div key={index} className="flex gap-2">
                      <Textarea
                        value={question}
                        onChange={(e) => updateQuestion(index, e.target.value)}
                        placeholder={`Question ${index + 1}`}
                        className="min-h-10"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <DialogFooter className="gap-2">
              <Button variant="outline" onClick={() => setIsNewFormDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleCreateForm}>Create Form</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </MainLayout>
  )
}

export default FeedbackForms
