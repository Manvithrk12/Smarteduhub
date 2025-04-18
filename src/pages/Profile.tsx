
import { useState } from "react"
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  User, Mail, Phone, MapPin, Pencil, 
  School, GraduationCap, BookOpen
} from "lucide-react"
import MainLayout from "@/components/layout/MainLayout"

// Demo user profile data
const initialProfile = {
  name: "Alex Johnson",
  email: "alex.johnson@example.com",
  phone: "123-456-7890",
  address: "123 School Street, Education City, ED 12345",
  role: "teacher", // admin, principal, teacher, student
  subject: "Mathematics",
  bio: "Experienced mathematics teacher with over 10 years of teaching experience. Specializes in calculus and algebra. Passionate about making mathematics accessible and enjoyable for all students.",
  jobTitle: "Senior Mathematics Teacher",
  education: "M.Ed in Mathematics Education, State University",
  joined: "2018-05-15"
}

const Profile = () => {
  const [profile, setProfile] = useState(initialProfile)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState(profile)
  
  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }
  
  // Handle form submission
  const handleSubmit = () => {
    setProfile(formData)
    setIsEditing(false)
  }
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">My Profile</h1>
        
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Your personal and contact details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="h-32 w-32 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                <User className="h-16 w-16 text-primary" />
              </div>
              
              {!isEditing ? (
                <div className="space-y-4">
                  <div className="space-y-1">
                    <h3 className="font-semibold text-lg">{profile.name}</h3>
                    <p className="text-sm text-muted-foreground">{profile.jobTitle}</p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Email</p>
                        <p className="text-sm text-muted-foreground">{profile.email}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Phone</p>
                        <p className="text-sm text-muted-foreground">{profile.phone}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Address</p>
                        <p className="text-sm text-muted-foreground">{profile.address}</p>
                      </div>
                    </div>
                    
                    {profile.role === "teacher" && (
                      <div className="flex items-start gap-2">
                        <BookOpen className="h-4 w-4 text-muted-foreground mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">Subject</p>
                          <p className="text-sm text-muted-foreground">{profile.subject}</p>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex items-start gap-2">
                      <GraduationCap className="h-4 w-4 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Education</p>
                        <p className="text-sm text-muted-foreground">{profile.education}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-2">
                      <School className="h-4 w-4 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Joined</p>
                        <p className="text-sm text-muted-foreground">{new Date(profile.joined).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">Full Name</label>
                    <Input 
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="jobTitle" className="text-sm font-medium">Job Title</label>
                    <Input 
                      id="jobTitle"
                      name="jobTitle"
                      value={formData.jobTitle}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">Email</label>
                    <Input 
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-medium">Phone</label>
                    <Input 
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="address" className="text-sm font-medium">Address</label>
                    <Input 
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                    />
                  </div>
                  
                  {profile.role === "teacher" && (
                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-sm font-medium">Subject</label>
                      <Input 
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                      />
                    </div>
                  )}
                  
                  <div className="space-y-2">
                    <label htmlFor="education" className="text-sm font-medium">Education</label>
                    <Input 
                      id="education"
                      name="education"
                      value={formData.education}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter>
              {!isEditing ? (
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => setIsEditing(true)}
                >
                  <Pencil className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              ) : (
                <div className="flex w-full gap-2">
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => {
                      setFormData(profile)
                      setIsEditing(false)
                    }}
                  >
                    Cancel
                  </Button>
                  <Button 
                    className="flex-1"
                    onClick={handleSubmit}
                  >
                    Save Changes
                  </Button>
                </div>
              )}
            </CardFooter>
          </Card>
          
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Account Details</CardTitle>
              <CardDescription>Manage your account information and settings</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="bio" className="space-y-4">
                <TabsList>
                  <TabsTrigger value="bio">Bio</TabsTrigger>
                  <TabsTrigger value="security">Security</TabsTrigger>
                  <TabsTrigger value="preferences">Preferences</TabsTrigger>
                </TabsList>
                
                <TabsContent value="bio" className="space-y-4">
                  <h3 className="text-md font-medium">Professional Bio</h3>
                  {!isEditing ? (
                    <p className="text-sm text-muted-foreground whitespace-pre-line">
                      {profile.bio}
                    </p>
                  ) : (
                    <div className="space-y-2">
                      <Textarea
                        name="bio"
                        value={formData.bio}
                        onChange={handleChange}
                        rows={6}
                      />
                      <p className="text-xs text-muted-foreground">
                        Write a brief description about your professional background and expertise.
                      </p>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="security" className="space-y-4">
                  <h3 className="text-md font-medium">Password</h3>
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <label htmlFor="currentPassword" className="text-sm font-medium">Current Password</label>
                      <Input
                        id="currentPassword"
                        type="password"
                        placeholder="••••••••"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="newPassword" className="text-sm font-medium">New Password</label>
                      <Input
                        id="newPassword"
                        type="password"
                        placeholder="••••••••"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="confirmPassword" className="text-sm font-medium">Confirm New Password</label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        placeholder="••••••••"
                      />
                    </div>
                    <Button className="w-full md:w-auto">Change Password</Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="preferences" className="space-y-4">
                  <h3 className="text-md font-medium">Notification Settings</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <h4 className="text-sm font-medium">Email Notifications</h4>
                        <p className="text-xs text-muted-foreground">Receive notifications via email</p>
                      </div>
                      <input
                        type="checkbox"
                        className="h-4 w-8 rounded-full bg-input"
                        defaultChecked
                      />
                    </div>
                    <Separator className="my-2" />
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <h4 className="text-sm font-medium">Assignment Reminders</h4>
                        <p className="text-xs text-muted-foreground">Get reminders about upcoming assignments</p>
                      </div>
                      <input
                        type="checkbox"
                        className="h-4 w-8 rounded-full bg-input"
                        defaultChecked
                      />
                    </div>
                    <Separator className="my-2" />
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <h4 className="text-sm font-medium">System Updates</h4>
                        <p className="text-xs text-muted-foreground">Notifications about system changes</p>
                      </div>
                      <input
                        type="checkbox"
                        className="h-4 w-8 rounded-full bg-input"
                        defaultChecked
                      />
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  )
}

export default Profile

// Make sure to define the Separator component if it's not already available
import { Separator } from "@/components/ui/separator"
