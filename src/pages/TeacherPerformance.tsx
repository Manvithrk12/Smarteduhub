
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
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, AlertCircle, Search, BarChart2, FilterX } from "lucide-react"
import MainLayout from "@/components/layout/MainLayout"

// Performance data interface
interface TeacherPerformanceData {
  id: number
  name: string
  subject: string
  rating: number
  studentPassRate: number
  attendanceRate: number
  feedbackScore: number
  classesCompleted: number
  performanceLevel: "excellent" | "good" | "average" | "poor"
}

// Sample teacher performance data
const initialPerformanceData: TeacherPerformanceData[] = [
  { 
    id: 1, 
    name: "Dr. Sarah Johnson", 
    subject: "Mathematics", 
    rating: 4.8, 
    studentPassRate: 92, 
    attendanceRate: 95,
    feedbackScore: 4.5,
    classesCompleted: 45,
    performanceLevel: "excellent"
  },
  { 
    id: 2, 
    name: "Prof. James Wilson", 
    subject: "Physics", 
    rating: 4.5, 
    studentPassRate: 88, 
    attendanceRate: 96,
    feedbackScore: 4.3,
    classesCompleted: 42,
    performanceLevel: "good"
  },
  { 
    id: 3, 
    name: "Ms. Emily Parker", 
    subject: "Biology", 
    rating: 3.9, 
    studentPassRate: 74, 
    attendanceRate: 90,
    feedbackScore: 3.7,
    classesCompleted: 38,
    performanceLevel: "average"
  },
  { 
    id: 4, 
    name: "Mr. David Miller", 
    subject: "Chemistry", 
    rating: 4.2, 
    studentPassRate: 82, 
    attendanceRate: 93,
    feedbackScore: 4.0,
    classesCompleted: 40,
    performanceLevel: "good"
  },
  { 
    id: 5, 
    name: "Dr. Robert Brown", 
    subject: "English Literature", 
    rating: 4.6, 
    studentPassRate: 90, 
    attendanceRate: 97,
    feedbackScore: 4.4,
    classesCompleted: 44,
    performanceLevel: "excellent"
  },
  { 
    id: 6, 
    name: "Ms. Jessica Taylor", 
    subject: "History", 
    rating: 3.8, 
    studentPassRate: 78, 
    attendanceRate: 92,
    feedbackScore: 3.9,
    classesCompleted: 39,
    performanceLevel: "average"
  },
]

// Stats calculation helper function
const calculateStats = (data: TeacherPerformanceData[]) => {
  const avgRating = data.reduce((sum, teacher) => sum + teacher.rating, 0) / data.length
  const avgPassRate = data.reduce((sum, teacher) => sum + teacher.studentPassRate, 0) / data.length
  
  const excellentPerformers = data.filter(teacher => teacher.performanceLevel === "excellent").length
  const poorPerformers = data.filter(teacher => teacher.performanceLevel === "poor").length

  return {
    avgRating: avgRating.toFixed(1),
    avgPassRate: avgPassRate.toFixed(1),
    excellentPerformers,
    poorPerformers
  }
}

const TeacherPerformance = () => {
  const [performanceData, setPerformanceData] = useState<TeacherPerformanceData[]>(initialPerformanceData)
  const [searchTerm, setSearchTerm] = useState("")
  const [subjectFilter, setSubjectFilter] = useState<string>("all")
  
  // Filter performance data based on search term and subject
  const filteredData = performanceData.filter(teacher => {
    const matchesSearch = teacher.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSubject = subjectFilter === "all" || teacher.subject.toLowerCase() === subjectFilter.toLowerCase()
    return matchesSearch && matchesSubject
  })

  // Calculate stats from filtered data
  const stats = calculateStats(filteredData)

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  // Handle subject filter change
  const handleSubjectChange = (value: string) => {
    setSubjectFilter(value)
  }

  // Get unique subjects
  const subjects = ["all", ...new Set(performanceData.map(teacher => teacher.subject.toLowerCase()))]

  // Helper to get performance badge
  const getPerformanceBadge = (level: string) => {
    switch(level) {
      case "excellent":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Excellent</Badge>
      case "good":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Good</Badge>
      case "average":
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">Average</Badge>
      case "poor":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Poor</Badge>
      default:
        return null
    }
  }

  // Helper to get rating color class
  const getRatingColorClass = (rating: number) => {
    if (rating >= 4.5) return "text-green-600 font-medium"
    if (rating >= 4.0) return "text-blue-600 font-medium"
    if (rating >= 3.5) return "text-amber-600 font-medium"
    return "text-red-600 font-medium"
  }

  // Reset filters
  const resetFilters = () => {
    setSearchTerm("")
    setSubjectFilter("all")
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Teacher Performance</h1>
            <p className="text-muted-foreground">Monitor and evaluate teaching effectiveness</p>
          </div>
          <Button variant="outline" className="gap-1" onClick={resetFilters}>
            <FilterX className="h-4 w-4" />
            Reset Filters
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.avgRating}</div>
              <p className="text-xs text-muted-foreground">Out of 5.0</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Average Pass Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.avgPassRate}%</div>
              <p className="text-xs text-muted-foreground">Student success rate</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Excellent Performers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.excellentPerformers}</div>
              <p className="text-xs text-muted-foreground">Top rated teachers</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Poor Performers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.poorPerformers}</div>
              <p className="text-xs text-muted-foreground">Need improvement</p>
            </CardContent>
          </Card>
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
          <div className="w-[180px]">
            <Select value={subjectFilter} onValueChange={handleSubjectChange}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Subjects</SelectLabel>
                  {subjects.map((subject) => (
                    <SelectItem 
                      key={subject} 
                      value={subject}
                    >
                      {subject === "all" ? "All Subjects" : subject.charAt(0).toUpperCase() + subject.slice(1)}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Table>
          <TableCaption>Teacher performance metrics across different parameters.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Teacher</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Student Pass Rate</TableHead>
              <TableHead>Attendance Rate</TableHead>
              <TableHead>Feedback Score</TableHead>
              <TableHead>Classes Completed</TableHead>
              <TableHead>Performance Level</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((teacher) => (
              <TableRow key={teacher.id}>
                <TableCell className="font-medium">{teacher.name}</TableCell>
                <TableCell>{teacher.subject}</TableCell>
                <TableCell className={getRatingColorClass(teacher.rating)}>
                  {teacher.rating.toFixed(1)}
                </TableCell>
                <TableCell className={teacher.studentPassRate >= 85 ? "text-green-600 font-medium" : "text-amber-600 font-medium"}>
                  {teacher.studentPassRate}%
                </TableCell>
                <TableCell className={teacher.attendanceRate >= 90 ? "text-green-600 font-medium" : "text-amber-600 font-medium"}>
                  {teacher.attendanceRate}%
                </TableCell>
                <TableCell className={getRatingColorClass(teacher.feedbackScore)}>
                  {teacher.feedbackScore.toFixed(1)}
                </TableCell>
                <TableCell>{teacher.classesCompleted}</TableCell>
                <TableCell>{getPerformanceBadge(teacher.performanceLevel)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </MainLayout>
  )
}

export default TeacherPerformance
