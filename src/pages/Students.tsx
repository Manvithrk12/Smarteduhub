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

// Sample student data
const initialStudents = [
    { id: 11, name: "Rahul Sharma", class: "BCA", rollNo: "1301", email: "rahul.sharma@example.com", phone: "987-654-3201" },
    { id: 12, name: "Priya Verma", class: "BCA", rollNo: "1302", email: "priya.verma@example.com", phone: "987-654-3202" },
    { id: 13, name: "Amit Kumar", class: "BCA", rollNo: "1303", email: "amit.kumar@example.com", phone: "987-654-3203" },
    { id: 14, name: "Neha Singh", class: "BCA", rollNo: "1304", email: "neha.singh@example.com", phone: "987-654-3204" },
    { id: 15, name: "Rohit Mehta", class: "BBA", rollNo: "1305", email: "rohit.mehta@example.com", phone: "987-654-3205" },
    { id: 16, name: "Anjali Patil", class: "BBA", rollNo: "1306", email: "anjali.patil@example.com", phone: "987-654-3206" },
    { id: 17, name: "Vikram Rao", class: "BBA", rollNo: "1307", email: "vikram.rao@example.com", phone: "987-654-3207" },
    { id: 18, name: "Sneha Iyer", class: "BBA", rollNo: "1308", email: "sneha.iyer@example.com", phone: "987-654-3208" },
]

// Updated Student form interface with id as required
interface StudentForm {
  id: number
  name: string
  class: string
  rollNo: string
  email: string
  phone: string
}

const Students = () => {
  const [students, setStudents] = useState<StudentForm[]>(initialStudents)
  const [searchTerm, setSearchTerm] = useState("")
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [currentStudent, setCurrentStudent] = useState<StudentForm>({
    id: 0,
    name: "",
    class: "",
    rollNo: "",
    email: "",
    phone: ""
  })

  // Filter students based on search term
  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.rollNo.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  // Handle opening edit dialog
  const handleEditClick = (student: StudentForm) => {
    setCurrentStudent(student)
    setIsEditDialogOpen(true)
  }

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCurrentStudent({
      ...currentStudent,
      [name]: value
    })
  }

  // Handle form submission
  const handleSubmit = () => {
    if (currentStudent.id) {
      // Update existing student
      setStudents(students.map(student => 
        student.id === currentStudent.id ? currentStudent : student
      ))
    } else {
      // Add new student
      const newStudent = {
        ...currentStudent,
        id: Math.max(...students.map(s => s.id), 0) + 1
      }
      setStudents([...students, newStudent])
    }
    
    // Reset form and close dialog
    setIsEditDialogOpen(false)
    setCurrentStudent({
      id: 0,
      name: "",
      class: "",
      rollNo: "",
      email: "",
      phone: ""
    })
  }

  // Handle student deletion
  const handleDelete = (id: number) => {
    setStudents(students.filter(student => student.id !== id))
  }

  // Handle adding new student
  const handleAddNew = () => {
    setCurrentStudent({
      id: 0,  // Make sure to include the id property here
      name: "",
      class: "",
      rollNo: "",
      email: "",
      phone: ""
    })
    setIsEditDialogOpen(true)
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Students</h1>
          <Button onClick={handleAddNew}>
            <Plus className="h-4 w-4 mr-2" />
            Add Student
          </Button>
        </div>

        <div className="flex items-center space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search students..."
              className="pl-8"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
        </div>

        <Table>
          <TableCaption>A list of all students in the system.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Class</TableHead>
              <TableHead>Roll No</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStudents.map((student) => (
              <TableRow key={student.id}>
                <TableCell className="font-medium">{student.name}</TableCell>
                <TableCell>{student.class}</TableCell>
                <TableCell>{student.rollNo}</TableCell>
                <TableCell>{student.email}</TableCell>
                <TableCell>{student.phone}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" size="icon" onClick={() => handleEditClick(student)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" className="text-destructive" onClick={() => handleDelete(student.id)}>
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
              <DialogTitle>{currentStudent.id ? "Edit Student" : "Add New Student"}</DialogTitle>
              <DialogDescription>
                {currentStudent.id 
                  ? "Update student information below." 
                  : "Fill in the details to add a new student."}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">Full Name</label>
                  <Input
                    id="name"
                    name="name"
                    value={currentStudent.name}
                    onChange={handleInputChange}
                    placeholder="Enter full name"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="grade" className="text-sm font-medium">Grade</label>
                  <Input
                    id="grade"
                    name="grade"
                    value={currentStudent.class}
                    onChange={handleInputChange}
                    placeholder="Enter grade"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="rollNo" className="text-sm font-medium">Roll Number</label>
                  <Input
                    id="rollNo"
                    name="rollNo"
                    value={currentStudent.rollNo}
                    onChange={handleInputChange}
                    placeholder="Enter roll number"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">Email</label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={currentStudent.email}
                    onChange={handleInputChange}
                    placeholder="Enter email address"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium">Phone</label>
                  <Input
                    id="phone"
                    name="phone"
                    value={currentStudent.phone}
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

export default Students