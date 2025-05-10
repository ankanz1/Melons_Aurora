"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CheckCircle2, MapPin } from "lucide-react"
import { cn } from "@/lib/utils"

// Mock data for blood requests
const bloodRequests = [
  {
    id: 1,
    patientName: "Name",
    bloodType: "O-",
    hospital: "City General Hospital",
    location: "Downtown",
    urgency: "High",
    unitsNeeded: 3,
    requestDate: "May 10, 2025",
    status: "Active",
    contact: "(555) 123-4567",
    notes: "Patient requires blood for emergency surgery.",
  },
  {
    id: 2,
    patientName: "Name",
    bloodType: "AB+",
    hospital: "Memorial Hospital",
    location: "Midtown",
    urgency: "Medium",
    unitsNeeded: 2,
    requestDate: "May 12, 2025",
    status: "Active",
    contact: "(555) 987-6543",
    notes: "Patient requires blood for scheduled surgery.",
  },
  {
    id: 3,
    patientName: "Name",
    bloodType: "B+",
    hospital: "University Medical Center",
    location: "University District",
    urgency: "Low",
    unitsNeeded: 1,
    requestDate: "May 15, 2025",
    status: "Fulfilled",
    contact: "(555) 456-7890",
    notes: "Patient requires blood for transfusion.",
  },
]

export default function RequestsPage() {
  const [activeTab, setActiveTab] = useState("view")
  const [formData, setFormData] = useState({
    patientName: "",
    bloodType: "",
    hospital: "",
    location: "",
    urgency: "",
    unitsNeeded: "",
    contact: "",
    notes: "",
  })
  const [submitted, setSubmitted] = useState(false)
  const [filteredRequests, setFilteredRequests] = useState(bloodRequests)
  const [filterBloodType, setFilterBloodType] = useState("")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would send this data to your backend
    console.log("Form submitted:", formData)
    setSubmitted(true)
  }

  const handleFilterChange = (value: string) => {
    setFilterBloodType(value)
    if (value === "all") {
      setFilteredRequests(bloodRequests)
    } else {
      setFilteredRequests(bloodRequests.filter((request) => request.bloodType === value))
    }
  }

  return (
    <div className="container py-10">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Blood Requests</h1>
          <p className="text-muted-foreground">
            View active blood requests or create a new request for blood donation.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="view">View Requests</TabsTrigger>
            <TabsTrigger value="create">Create Request</TabsTrigger>
          </TabsList>

          <TabsContent value="view">
            <Card>
              <CardHeader>
                <CardTitle>Active Blood Requests</CardTitle>
                <CardDescription>Browse current requests for blood donation.</CardDescription>
              </CardHeader>

              <CardContent>
                <div className="mb-6">
                  <Label htmlFor="filterBloodType">Filter by Blood Type</Label>
                  <Select value={filterBloodType} onValueChange={handleFilterChange}>
                    <SelectTrigger id="filterBloodType">
                      <SelectValue placeholder="All Blood Types" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Blood Types</SelectItem>
                      <SelectItem value="A+">A+</SelectItem>
                      <SelectItem value="A-">A-</SelectItem>
                      <SelectItem value="B+">B+</SelectItem>
                      <SelectItem value="B-">B-</SelectItem>
                      <SelectItem value="AB+">AB+</SelectItem>
                      <SelectItem value="AB-">AB-</SelectItem>
                      <SelectItem value="O+">O+</SelectItem>
                      <SelectItem value="O-">O-</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4">
                  {filteredRequests.length > 0 ? (
                    filteredRequests.map((request) => (
                      <div key={request.id} className="border rounded-lg p-4 space-y-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">{request.patientName}</h3>
                            <p className="text-sm text-muted-foreground flex items-center gap-1">
                              <MapPin className="h-3.5 w-3.5" />
                              {request.hospital}, {request.location}
                            </p>
                          </div>
                          <Badge className={cn(request.status === "Active" ? "bg-green-500" : "bg-blue-500")}>
                            {request.status}
                          </Badge>
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <span className="text-muted-foreground">Blood Type:</span>{" "}
                            <Badge variant="outline" className="font-bold">
                              {request.bloodType}
                            </Badge>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Units Needed:</span> {request.unitsNeeded}
                          </div>
                          <div>
                            <span className="text-muted-foreground">Urgency:</span>{" "}
                            <span
                              className={cn(
                                request.urgency === "High" && "text-red-500",
                                request.urgency === "Medium" && "text-amber-500",
                                request.urgency === "Low" && "text-green-500",
                              )}
                            >
                              {request.urgency}
                            </span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Date:</span> {request.requestDate}
                          </div>
                        </div>

                        {request.notes && (
                          <>
                            <Separator />
                            <p className="text-sm">{request.notes}</p>
                          </>
                        )}

                        <div className="flex justify-end pt-2">
                          <Button
                            disabled={request.status !== "Active"}
                            className={request.status !== "Active" ? "opacity-50" : ""}
                          >
                            Respond to Request
                          </Button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-10">
                      <p className="text-muted-foreground">No blood requests found matching your criteria.</p>
                    </div>
                  )}
                </div>
              </CardContent>

              <CardFooter className="flex justify-center">
                <Button variant="outline" onClick={() => setActiveTab("create")}>
                  Create New Request
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="create">
            {submitted ? (
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center justify-center text-center py-10">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <CheckCircle2 className="h-8 w-8 text-primary" />
                    </div>
                    <h2 className="text-2xl font-bold mb-2">Request Submitted!</h2>
                    <p className="text-muted-foreground mb-6 max-w-md">
                      Your blood request has been submitted successfully. Donors will be notified based on matching
                      criteria.
                    </p>
                    <div className="flex gap-4">
                      <Button
                        onClick={() => {
                          setSubmitted(false)
                          setFormData({
                            patientName: "",
                            bloodType: "",
                            hospital: "",
                            location: "",
                            urgency: "",
                            unitsNeeded: "",
                            contact: "",
                            notes: "",
                          })
                        }}
                      >
                        Create Another Request
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setActiveTab("view")
                          setSubmitted(false)
                        }}
                      >
                        View All Requests
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Create Blood Request</CardTitle>
                  <CardDescription>Fill out the form to create a new blood donation request.</CardDescription>
                </CardHeader>

                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="patientName">Patient Name</Label>
                        <Input
                          id="patientName"
                          name="patientName"
                          placeholder="Enter patient name"
                          value={formData.patientName}
                          onChange={handleInputChange}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="bloodType">Blood Type Needed</Label>
                        <Select
                          value={formData.bloodType}
                          onValueChange={(value) => setFormData((prev) => ({ ...prev, bloodType: value }))}
                          required
                        >
                          <SelectTrigger id="bloodType">
                            <SelectValue placeholder="Select blood type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="A+">A+</SelectItem>
                            <SelectItem value="A-">A-</SelectItem>
                            <SelectItem value="B+">B+</SelectItem>
                            <SelectItem value="B-">B-</SelectItem>
                            <SelectItem value="AB+">AB+</SelectItem>
                            <SelectItem value="AB-">AB-</SelectItem>
                            <SelectItem value="O+">O+</SelectItem>
                            <SelectItem value="O-">O-</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="hospital">Hospital</Label>
                        <Input
                          id="hospital"
                          name="hospital"
                          placeholder="Enter hospital name"
                          value={formData.hospital}
                          onChange={handleInputChange}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          name="location"
                          placeholder="Enter location"
                          value={formData.location}
                          onChange={handleInputChange}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="urgency">Urgency</Label>
                        <Select
                          value={formData.urgency}
                          onValueChange={(value) => setFormData((prev) => ({ ...prev, urgency: value }))}
                          required
                        >
                          <SelectTrigger id="urgency">
                            <SelectValue placeholder="Select urgency level" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="High">High</SelectItem>
                            <SelectItem value="Medium">Medium</SelectItem>
                            <SelectItem value="Low">Low</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="unitsNeeded">Units Needed</Label>
                        <Input
                          id="unitsNeeded"
                          name="unitsNeeded"
                          type="number"
                          min="1"
                          placeholder="Enter number of units"
                          value={formData.unitsNeeded}
                          onChange={handleInputChange}
                          required
                        />
                      </div>

                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="contact">Contact Information</Label>
                        <Input
                          id="contact"
                          name="contact"
                          placeholder="Enter contact information"
                          value={formData.contact}
                          onChange={handleInputChange}
                          required
                        />
                      </div>

                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="notes">Additional Notes</Label>
                        <Textarea
                          id="notes"
                          name="notes"
                          placeholder="Enter any additional information"
                          value={formData.notes}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </form>
                </CardContent>

                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={() => setActiveTab("view")}>
                    Cancel
                  </Button>
                  <Button onClick={handleSubmit}>Submit Request</Button>
                </CardFooter>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
