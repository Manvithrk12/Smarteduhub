
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
import { Pencil, Plus, Trash2, Search } from "lucide-react"
import MainLayout from "@/components/layout/MainLayout"

// Sample principal data
const initialPrincipals = [
  { id: 1, name: "Mrs. Jennifer Davis", college: "Westview Global college", employeeId: "P1002", email: "jennifer.davis@example.com", phone: "943-456-7891" },
]

// Principal form interface
interface PrincipalForm {
  id: number
  name: string
  college: string
  employeeId: string
  email: string
  phone: string
}

const Principals = () => {
  const [principals, setPrincipals] = useState<PrincipalForm[]>(initialPrincipals)
  const [searchTerm, setSearchTerm] = useState("")
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [currentPrincipal, setCurrentPrincipal] = useState<PrincipalForm>({
    id: 0,
    name: "",
    college: "",
    employeeId: "",
    email: "",
    phone: ""
  })

  // Filter principals based on search term
  const filteredPrincipals = principals.filter(principal => 
    principal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    principal.college.toLowerCase().includes(searchTerm.toLowerCase()) ||
    principal.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  // Handle opening edit dialog
  const handleEditClick = (principal: PrincipalForm) => {
    setCurrentPrincipal(principal)
    setIsEditDialogOpen(true)
  }

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCurrentPrincipal({
      ...currentPrincipal,
      [name]: value
    })
  }

  // Handle form submission
  const handleSubmit = () => {
    if (currentPrincipal.id) {
      // Update existing principal
      setPrincipals(principals.map(principal => 
        principal.id === currentPrincipal.id ? currentPrincipal : principal
      ))
    } else {
      // Add new principal
      const newPrincipal = {
        ...currentPrincipal,
        id: Math.max(...principals.map(p => p.id), 0) + 1
      }
      setPrincipals([...principals, newPrincipal])
    }
    
    // Reset form and close dialog
    setIsEditDialogOpen(false)
    setCurrentPrincipal({
      id: 0,
      name: "",
      college: "",
      employeeId: "",
      email: "",
      phone: ""
    })
  }

  // Handle principal deletion
  const handleDelete = (id: number) => {
    setPrincipals(principals.filter(principal => principal.id !== id))
  }

  // Handle adding new principal
  const handleAddNew = () => {
    setCurrentPrincipal({
      id: 0,
      name: "",
      college: "",
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
          <h1 className="text-3xl font-bold">Principal</h1>
          <Button onClick={handleAddNew}>
            <Plus className="h-4 w-4 mr-2" />
            Add Principal
          </Button>
        </div>

        <div className="flex items-center space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search principals..."
              className="pl-8"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
        </div>

        <Table>
          <TableCaption>A list of all principals in the system.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>College</TableHead>
              <TableHead>Employee ID</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPrincipals.map((principal) => (
              <TableRow key={principal.id}>
                <TableCell className="font-medium">{principal.name}</TableCell>
                <TableCell>{principal.college}</TableCell>
                <TableCell>{principal.employeeId}</TableCell>
                <TableCell>{principal.email}</TableCell>
                <TableCell>{principal.phone}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" size="icon" onClick={() => handleEditClick(principal)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" className="text-destructive" onClick={() => handleDelete(principal.id)}>
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
              <DialogTitle>{currentPrincipal.id ? "Edit Principal" : "Add New Principal"}</DialogTitle>
              <DialogDescription>
                {currentPrincipal.id 
                  ? "Update principal information below." 
                  : "Fill in the details to add a new principal."}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">Full Name</label>
                  <Input
                    id="name"
                    name="name"
                    value={currentPrincipal.name}
                    onChange={handleInputChange}
                    placeholder="Enter full name"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="school" className="text-sm font-medium">School</label>
                  <Input
                    id="school"
                    name="school"
                    value={currentPrincipal.college}
                    onChange={handleInputChange}
                    placeholder="Enter school name"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="employeeId" className="text-sm font-medium">Employee ID</label>
                  <Input
                    id="employeeId"
                    name="employeeId"
                    value={currentPrincipal.employeeId}
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
                    value={currentPrincipal.email}
                    onChange={handleInputChange}
                    placeholder="Enter email address"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium">Phone</label>
                  <Input
                    id="phone"
                    name="phone"
                    value={currentPrincipal.phone}
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

export default Principals
