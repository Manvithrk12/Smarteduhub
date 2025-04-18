
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
import { TrendingDown, TrendingUp, Search, BarChart2, ChevronDown, FilterX } from "lucide-react"
import MainLayout from "@/components/layout/MainLayout"

// Performance data interface
interface SubjectPerformance {
  score: number
  trend: "up" | "down" | "stable"
}

interface StudentPerformanceData {
  id: number
  name: string
  grade: string
  avgScore: number
  attendance: number
  subjects: {
    mathematics: SubjectPerformance
    physics: SubjectPerformance
    chemistry: SubjectPerformance
    biology: SubjectPerformance
    english: SubjectPerformance
  }
}

// Sample student performance data
const initialPerformanceData: StudentPerformanceData[] = [
  { 
    id: 1, 
    name: "John Doe", 
    grade: "10th", 
    avgScore: 85, 
    attendance: 92, 
    subjects: {
      mathematics: { score: 78, trend: "down" },
      physics: { score: 82, trend: "up" },
      chemistry: { score: 90, trend: "up" },
      biology: { score: 88, trend: "up" },
      english: { score: 85, trend: "stable" }
    } 
  },
  { 
    id: 2, 
    name: "Emma Wilson", 
    grade: "10th", 
    avgScore: 92, 
    attendance: 95, 
    subjects: {
      mathematics: { score: 94, trend: "up" },
      physics: { score: 90, trend: "up" },
      chemistry: { score: 88, trend: "down" },
      biology: { score: 93, trend: "up" },
      english: { score: 95, trend: "up" }
    } 
  },
  { 
    id: 3, 
    name: "Michael Brown", 
    grade: "11th", 
    avgScore: 75, 
    attendance: 80, 
    subjects: {
      mathematics: { score: 68, trend: "down" },
      physics: { score: 72, trend: "up" },
      chemistry: { score: 80, trend: "stable" },
      biology: { score: 77, trend: "down" },
      english: { score: 78, trend: "up" }
    } 
  },
  { 
    id: 4, 
    name: "Sophia Garcia", 
    grade: "9th", 
    avgScore: 88, 
    attendance: 90, 
    subjects: {
      mathematics: { score: 85, trend: "up" },
      physics: { score: 87, trend: "up" },
      chemistry: { score: 89, trend: "up" },
      biology: { score: 90, trend: "stable" },
      english: { score: 88, trend: "down" }
    } 
  },
  { 
    id: 5, 
    name: "William Martinez", 
    grade: "12th", 
    avgScore: 79, 
    attendance: 85, 
    subjects: {
      mathematics: { score: 76, trend: "up" },
      physics: { score: 74, trend: "down" },
      chemistry: { score: 82, trend: "up" },
      biology: { score: 79, trend: "stable" },
      english: { score: 84, trend: "up" }
    } 
  },
]

// Stats calculation helper function
const calculateStats = (data: StudentPerformanceData[]) => {
  const avgScore = data.reduce((sum, student) => sum + student.avgScore, 0) / data.length
  const avgAttendance = data.reduce((sum, student) => sum + student.attendance, 0) / data.length
  
  const highPerformers = data.filter(student => student.avgScore >= 85).length
  const lowPerformers = data.filter(student => student.avgScore < 70).length

  return {
    avgScore: avgScore.toFixed(1),
    avgAttendance: avgAttendance.toFixed(1),
    highPerformers,
    lowPerformers
  }
}

const StudentPerformance = () => {
  const [performanceData, setPerformanceData] = useState<StudentPerformanceData[]>(initialPerformanceData)
  const [searchTerm, setSearchTerm] = useState("")
  const [gradeFilter, setGradeFilter] = useState<string>("all")
  
  // Filter performance data based on search term and grade
  const filteredData = performanceData.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesGrade = gradeFilter === "all" || student.grade.includes(gradeFilter)
    return matchesSearch && matchesGrade
  })

  // Calculate stats from filtered data
  const stats = calculateStats(filteredData)

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  // Handle grade filter change
  const handleGradeChange = (value: string) => {
    setGradeFilter(value)
  }

  // Helper to render trend icon
  const renderTrendIcon = (trend: string) => {
    if (trend === "up") {
      return <TrendingUp className="h-4 w-4 text-green-600" />
    } else if (trend === "down") {
      return <TrendingDown className="h-4 w-4 text-red-600" />
    }
    return null
  }

  // Helper to get score color class
  const getScoreColorClass = (score: number) => {
    if (score >= 85) return "text-green-600 font-medium"
    if (score >= 70) return "text-amber-600 font-medium"
    return "text-red-600 font-medium"
  }

  // Reset filters
  const resetFilters = () => {
    setSearchTerm("")
    setGradeFilter("all")
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Student Performance</h1>
            <p className="text-muted-foreground">Monitor and track academic progress</p>
          </div>
          <Button variant="outline" className="gap-1" onClick={resetFilters}>
            <FilterX className="h-4 w-4" />
            Reset Filters
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Average Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.avgScore}%</div>
              <p className="text-xs text-muted-foreground">Across all subjects</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Average Attendance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.avgAttendance}%</div>
              <p className="text-xs text-muted-foreground">Overall average</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">High Performers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.highPerformers}</div>
              <p className="text-xs text-muted-foreground">Students with 85%+ avg score</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Low Performers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.lowPerformers}</div>
              <p className="text-xs text-muted-foreground">Students below 70% avg score</p>
            </CardContent>
          </Card>
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
          <div className="w-[180px]">
            <Select value={gradeFilter} onValueChange={handleGradeChange}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by grade" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Grades</SelectLabel>
                  <SelectItem value="all">All Grades</SelectItem>
                  <SelectItem value="9th">9th Grade</SelectItem>
                  <SelectItem value="10th">10th Grade</SelectItem>
                  <SelectItem value="11th">11th Grade</SelectItem>
                  <SelectItem value="12th">12th Grade</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Table>
          <TableCaption>Student performance data across subjects.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Student</TableHead>
              <TableHead>Grade</TableHead>
              <TableHead>Mathematics</TableHead>
              <TableHead>Physics</TableHead>
              <TableHead>Chemistry</TableHead>
              <TableHead>Biology</TableHead>
              <TableHead>English</TableHead>
              <TableHead>Average</TableHead>
              <TableHead>Attendance</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((student) => (
              <TableRow key={student.id}>
                <TableCell className="font-medium">{student.name}</TableCell>
                <TableCell>{student.grade}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <span className={getScoreColorClass(student.subjects.mathematics.score)}>
                      {student.subjects.mathematics.score}%
                    </span>
                    <span className="ml-1">
                      {renderTrendIcon(student.subjects.mathematics.trend)}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <span className={getScoreColorClass(student.subjects.physics.score)}>
                      {student.subjects.physics.score}%
                    </span>
                    <span className="ml-1">
                      {renderTrendIcon(student.subjects.physics.trend)}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <span className={getScoreColorClass(student.subjects.chemistry.score)}>
                      {student.subjects.chemistry.score}%
                    </span>
                    <span className="ml-1">
                      {renderTrendIcon(student.subjects.chemistry.trend)}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <span className={getScoreColorClass(student.subjects.biology.score)}>
                      {student.subjects.biology.score}%
                    </span>
                    <span className="ml-1">
                      {renderTrendIcon(student.subjects.biology.trend)}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <span className={getScoreColorClass(student.subjects.english.score)}>
                      {student.subjects.english.score}%
                    </span>
                    <span className="ml-1">
                      {renderTrendIcon(student.subjects.english.trend)}
                    </span>
                  </div>
                </TableCell>
                <TableCell className={getScoreColorClass(student.avgScore)}>
                  {student.avgScore}%
                </TableCell>
                <TableCell className={student.attendance >= 85 ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
                  {student.attendance}%
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </MainLayout>
  )
}

export default StudentPerformance
