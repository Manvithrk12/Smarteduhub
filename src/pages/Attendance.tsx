
import { useState } from "react"
import { 
  Table, TableBody, TableCaption, TableCell, 
  TableHead, TableHeader, TableRow 
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Search, Save, Calendar } from "lucide-react"
import MainLayout from "@/components/layout/MainLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Sample attendance data
const initialStudents = [
  { id: 1, name: "John Doe", rollNo: "1001", attendance: { "2025-04-18": true, "2025-04-17": true, "2025-04-16": false } },
  { id: 2, name: "Emma Wilson", rollNo: "1002", attendance: { "2025-04-18": false, "2025-04-17": true, "2025-04-16": true } },
  { id: 3, name: "Michael Brown", rollNo: "1101", attendance: { "2025-04-18": true, "2025-04-17": true, "2025-04-16": true } },
  { id: 4, name: "Sophia Martinez", rollNo: "901", attendance: { "2025-04-18": true, "2025-04-17": false, "2025-04-16": false } },
  { id: 5, name: "William Johnson", rollNo: "1201", attendance: { "2025-04-18": true, "2025-04-17": true, "2025-04-16": true } },
  { id: 6, name: "Olivia Davis", rollNo: "1003", attendance: { "2025-04-18": false, "2025-04-17": true, "2025-04-16": true } },
  { id: 7, name: "James Miller", rollNo: "1102", attendance: { "2025-04-18": true, "2025-04-17": true, "2025-04-16": false } },
  { id: 8, name: "Ava Wilson", rollNo: "902", attendance: { "2025-04-18": true, "2025-04-17": false, "2025-04-16": true } },
]

// Class options
const classOptions = [
  { value: "10a", label: "Grade 10 - Section A" },
  { value: "10b", label: "Grade 10 - Section B" },
  { value: "11a", label: "Grade 11 - Section A" },
  { value: "9a", label: "Grade 9 - Section A" },
]

// Subject options
const subjectOptions = [
  { value: "mathematics", label: "Mathematics" },
  { value: "physics", label: "Physics" },
  { value: "chemistry", label: "Chemistry" },
  { value: "biology", label: "Biology" },
  { value: "english", label: "English" },
  { value: "history", label: "History" },
]

const Attendance = () => {
  const today = new Date().toISOString().split('T')[0]
  const [students, setStudents] = useState(initialStudents)
  const [selectedDate, setSelectedDate] = useState(today)
  const [selectedClass, setSelectedClass] = useState("10a")
  const [selectedSubject, setSelectedSubject] = useState("mathematics")
  const [searchTerm, setSearchTerm] = useState("")
  const [attendanceStatus, setAttendanceStatus] = useState<Record<number, boolean>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  // Initialize attendance status from the students data
  useState(() => {
    const initialStatus: Record<number, boolean> = {}
    students.forEach(student => {
      initialStatus[student.id] = student.attendance[selectedDate] || false
    })
    setAttendanceStatus(initialStatus)
  })

  // Filter students based on search term
  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.rollNo.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  // Handle date change
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = e.target.value
    setSelectedDate(newDate)
    
    // Update attendance status based on the new date
    const newStatus: Record<number, boolean> = {}
    students.forEach(student => {
      newStatus[student.id] = student.attendance[newDate] || false
    })
    setAttendanceStatus(newStatus)
  }

  // Toggle attendance status
  const toggleAttendance = (id: number) => {
    setAttendanceStatus(prev => ({
      ...prev,
      [id]: !prev[id]
    }))
  }

  // Save attendance
  const saveAttendance = () => {
    setIsSubmitting(true)
    
    // Simulate API call delay
    setTimeout(() => {
      // Update students with new attendance data
      const updatedStudents = students.map(student => {
        const newAttendance = {
          ...student.attendance,
          [selectedDate]: attendanceStatus[student.id] || false
        }
        
        return {
          ...student,
          attendance: newAttendance
        }
      })
      
      setStudents(updatedStudents)
      setIsSubmitting(false)
    }, 1000)
  }

  // Calculate attendance statistics
  const calculateStats = () => {
    const total = students.length
    const present = Object.values(attendanceStatus).filter(status => status).length
    const absent = total - present
    const presentPercentage = total > 0 ? (present / total) * 100 : 0
    
    return { total, present, absent, presentPercentage }
  }

  const stats = calculateStats()

  return (
    <MainLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Attendance Management</h1>
        
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Students</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Present</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.present}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Absent</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive">{stats.absent}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Attendance Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.presentPercentage.toFixed(1)}%</div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid gap-4 md:grid-cols-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Date</label>
            <div className="relative">
              <Calendar className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="date"
                className="pl-8"
                value={selectedDate}
                onChange={handleDateChange}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Class</label>
            <Select
              value={selectedClass}
              onValueChange={setSelectedClass}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select class" />
              </SelectTrigger>
              <SelectContent>
                {classOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Subject</label>
            <Select
              value={selectedSubject}
              onValueChange={setSelectedSubject}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select subject" />
              </SelectTrigger>
              <SelectContent>
                {subjectOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Search</label>
            <div className="relative">
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
        </div>
        
        <Table>
          <TableCaption>Attendance for {selectedDate} | {classOptions.find(c => c.value === selectedClass)?.label} | {subjectOptions.find(s => s.value === selectedSubject)?.label}</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Roll No</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStudents.map((student) => (
              <TableRow key={student.id}>
                <TableCell>{student.rollNo}</TableCell>
                <TableCell className="font-medium">{student.name}</TableCell>
                <TableCell>
                  <span 
                    className={`px-2 py-1 rounded text-xs font-semibold ${
                      attendanceStatus[student.id] ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {attendanceStatus[student.id] ? 'Present' : 'Absent'}
                  </span>
                </TableCell>
                <TableCell>
                  <Button 
                    variant={attendanceStatus[student.id] ? "destructive" : "default"}
                    size="sm"
                    onClick={() => toggleAttendance(student.id)}
                  >
                    {attendanceStatus[student.id] ? 'Mark Absent' : 'Mark Present'}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
        <div className="flex justify-end">
          <Button 
            onClick={saveAttendance} 
            disabled={isSubmitting}
            className="px-6"
          >
            <Save className="h-4 w-4 mr-2" />
            {isSubmitting ? 'Saving...' : 'Save Attendance'}
          </Button>
        </div>
      </div>
    </MainLayout>
  )
}

export default Attendance
