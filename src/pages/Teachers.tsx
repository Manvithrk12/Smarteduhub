
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
import { Pencil, Plus, Trash2, Search } from "lucide-react"
import MainLayout from "@/components/layout/MainLayout"

// Sample teacher data
const initialTeachers = [
  { id: 1, name: "Dr. Sarah Johnson", subject: "Mathematics", employeeId: "T1001", email: "sarah.johnson@example.com", phone: "123-456-7890" },
  { id: 2, name: "Prof. James Wilson", subject: "Physics", employeeId: "T1002", email: "james.wilson@example.com", phone: "123-456-7891" },
  { id: 3, name: "Ms. Emily Parker", subject: "Biology", employeeId: "T1003", email: "emily.parker@example.com", phone: "123-456-7892" },
  { id: 4, name: "Mr. David Miller", subject: "Chemistry", employeeId: "T1004", email: "david.miller@example.com", phone: "123-456-7893" },
  { id: 5, name: "Dr. Robert Brown", subject: "English Literature", employeeId: "T1005", email: "robert.brown@example.com", phone: "123-456-7894" },
  { id: 6, name: "Ms. Jessica Taylor", subject: "History", employeeId: "T1006", email: "jessica.taylor@example.com", phone: "123-456-7895" },
  { id: 7, name: "Mr. Michael Thomas", subject: "Computer Science", employeeId: "T1007", email: "michael.thomas@example.com", phone: "123-456-7896" },
  { id: 8, name: "Dr. Jennifer Adams", subject: "Psychology", employeeId: "T1008", email: "jennifer.adams@example.com", phone: "123-456-7897" },
]

// Teacher form interface
interface TeacherForm {
  id?: number
  name: string
  subject: string
  employeeId: string
  email: string
  phone: string
}

const Teachers = () => {
  const [teachers, setTeachers] = useState(initialTeachers)
  const [searchTerm, setSearchTerm] = useState("")
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [currentTeacher, setCurrentTeacher] = useState<TeacherForm>({
    name: "",
    subject: "",
    employeeId: "",
    email: "",
    phone: ""
  })

  // Filter teachers based on search term
  const filteredTeachers = teachers.filter(teacher => 
    teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  // Handle opening edit dialog
  const handleEditClick = (teacher: TeacherForm) => {
    setCurrentTeacher(teacher)
    setIsEditDialogOpen(true)
  }

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCurrentTeacher({
      ...currentTeacher,
      [name]: value
    })
  }

  // Handle form submission
  const handleSubmit = () => {
    if (currentTeacher.id) {
      // Update existing teacher
      setTeachers(teachers.map(teacher => 
        teacher.id === currentTeacher.id ? currentTeacher : teacher
      ))
    } else {
      // Add new teacher
      const newTeacher = {
        ...currentTeacher,
        id: Math.max(...teachers.map(t => t.id)) + 1
      }
      setTeachers([...teachers, newTeacher])
    }
    
    // Reset form and close dialog
    setIsEditDialogOpen(false)
    setCurrentTeacher({
      name: "",
      subject: "",
      employeeId: "",
      email: "",
      phone: ""
    })
  }

  // Handle teacher deletion
  const handleDelete = (id: number) => {
    setTeachers(teachers.filter(teacher => teacher.id !== id))
  }

  // Handle adding new teacher
  const handleAddNew = () => {
    setCurrentTeacher({
      name: "",
      subject: "",
      employeeId: "",
      email: "",
      phone: ""
    })
    setIsEditDialogOpen(true)
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Teachers</h1>
          <Button onClick={handleAddNew}>
            <Plus className="h-4 w-4 mr-2" />
            Add Teacher
          </Button>
        </div>

        <div className="flex items-center space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search teachers..."
              className="pl-8"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
        </div>

        <Table>
          <TableCaption>A list of all teachers in the system.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Employee ID</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTeachers.map((teacher) => (
              <TableRow key={teacher.id}>
                <TableCell className="font-medium">{teacher.name}</TableCell>
                <TableCell>{teacher.subject}</TableCell>
                <TableCell>{teacher.employeeId}</TableCell>
                <TableCell>{teacher.email}</TableCell>
                <TableCell>{teacher.phone}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" size="icon" onClick={() => handleEditClick(teacher)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" className="text-destructive" onClick={() => handleDelete(teacher.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{currentTeacher.id ? "Edit Teacher" : "Add New Teacher"}</DialogTitle>
              <DialogDescription>
                {currentTeacher.id 
                  ? "Update teacher information below." 
                  : "Fill in the details to add a new teacher."}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">Full Name</label>
                  <Input
                    id="name"
                    name="name"
                    value={currentTeacher.name}
                    onChange={handleInputChange}
                    placeholder="Enter full name"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">Subject</label>
                  <Input
                    id="subject"
                    name="subject"
                    value={currentTeacher.subject}
                    onChange={handleInputChange}
                    placeholder="Enter subject"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="employeeId" className="text-sm font-medium">Employee ID</label>
                  <Input
                    id="employeeId"
                    name="employeeId"
                    value={currentTeacher.employeeId}
                    onChange={handleInputChange}
                    placeholder="Enter employee ID"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">Email</label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={currentTeacher.email}
                    onChange={handleInputChange}
                    placeholder="Enter email address"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium">Phone</label>
                  <Input
                    id="phone"
                    name="phone"
                    value={currentTeacher.phone}
                    onChange={handleInputChange}
                    placeholder="Enter phone number"
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleSubmit}>Save</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </MainLayout>
  )
}

export default Teachers
