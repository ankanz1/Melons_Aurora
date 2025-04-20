"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon, CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { useToast } from "@/components/ui/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function HostPage() {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    organizationName: "",
    organizationType: "",
    contactName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    campDate: null as Date | null,
    startTime: "",
    endTime: "",
    expectedDonors: "",
    facilities: "",
    additionalInfo: "",
    agreeTerms: false,
  })
  const [submitted, setSubmitted] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    setSubmitted(true)
    toast({
      title: "Camp Registration Successful",
      description: "Your blood donation camp has been registered successfully.",
    })
  }

  return (
    <div className="container py-10">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Host a Blood Donation Camp</h1>
          <p className="text-muted-foreground">
            Register your organization to host a blood donation camp and help save lives in your community.
          </p>
        </div>

        <Tabs defaultValue="register" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="register">Register a Camp</TabsTrigger>
            <TabsTrigger value="info">Camp Information</TabsTrigger>
            <TabsTrigger value="requirements">Requirements</TabsTrigger>
          </TabsList>

          <TabsContent value="register">
            {submitted ? (
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center justify-center text-center py-10">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <CheckCircle2 className="h-8 w-8 text-primary" />
                    </div>
                    <h2 className="text-2xl font-bold mb-2">Registration Successful!</h2>
                    <p className="text-muted-foreground mb-6 max-w-md">
                      Thank you for registering to host a blood donation camp. Our team will review your application and
                      contact you within 2 business days.
                    </p>
                    <div className="space-y-4 max-w-md">
                      <p className="text-sm">
                        You will receive a confirmation email with details about next steps. If you have any questions,
                        please contact our support team.
                      </p>
                      <div className="flex flex-col sm:flex-row gap-4">
                        <Button onClick={() => setSubmitted(false)}>Register Another Camp</Button>
                        <Button variant="outline" asChild>
                          <a href="/banks">View Blood Banks</a>
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Camp Registration</CardTitle>
                  <CardDescription>Fill out the form below to register your blood donation camp.</CardDescription>
                </CardHeader>

                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Organization Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="organizationName">Organization Name</Label>
                          <Input
                            id="organizationName"
                            name="organizationName"
                            placeholder="Enter organization name"
                            value={formData.organizationName}
                            onChange={handleInputChange}
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="organizationType">Organization Type</Label>
                          <Select
                            value={formData.organizationType}
                            onValueChange={(value) => setFormData((prev) => ({ ...prev, organizationType: value }))}
                            required
                          >
                            <SelectTrigger id="organizationType">
                              <SelectValue placeholder="Select organization type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="hospital">Hospital</SelectItem>
                              <SelectItem value="corporate">Corporate</SelectItem>
                              <SelectItem value="educational">Educational Institution</SelectItem>
                              <SelectItem value="ngo">NGO</SelectItem>
                              <SelectItem value="government">Government</SelectItem>
                              <SelectItem value="religious">Religious Organization</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Contact Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="contactName">Contact Person Name</Label>
                          <Input
                            id="contactName"
                            name="contactName"
                            placeholder="Enter contact person name"
                            value={formData.contactName}
                            onChange={handleInputChange}
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Enter email address"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input
                            id="phone"
                            name="phone"
                            placeholder="Enter phone number"
                            value={formData.phone}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Camp Location</h3>
                      <div className="space-y-2">
                        <Label htmlFor="address">Address</Label>
                        <Textarea
                          id="address"
                          name="address"
                          placeholder="Enter street address"
                          value={formData.address}
                          onChange={handleInputChange}
                          required
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="city">City</Label>
                          <Input
                            id="city"
                            name="city"
                            placeholder="Enter city"
                            value={formData.city}
                            onChange={handleInputChange}
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="state">State</Label>
                          <Input
                            id="state"
                            name="state"
                            placeholder="Enter state"
                            value={formData.state}
                            onChange={handleInputChange}
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="zipCode">Zip Code</Label>
                          <Input
                            id="zipCode"
                            name="zipCode"
                            placeholder="Enter zip code"
                            value={formData.zipCode}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Camp Details</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="campDate">Camp Date</Label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className={cn(
                                  "w-full justify-start text-left font-normal",
                                  !formData.campDate && "text-muted-foreground",
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {formData.campDate ? format(formData.campDate, "PPP") : <span>Select date</span>}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                              <Calendar
                                mode="single"
                                selected={formData.campDate}
                                onSelect={(date) => setFormData((prev) => ({ ...prev, campDate: date }))}
                                initialFocus
                                disabled={(date) => date < new Date()}
                              />
                            </PopoverContent>
                          </Popover>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="startTime">Start Time</Label>
                          <Input
                            id="startTime"
                            name="startTime"
                            type="time"
                            value={formData.startTime}
                            onChange={handleInputChange}
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="endTime">End Time</Label>
                          <Input
                            id="endTime"
                            name="endTime"
                            type="time"
                            value={formData.endTime}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="expectedDonors">Expected Number of Donors</Label>
                        <Input
                          id="expectedDonors"
                          name="expectedDonors"
                          type="number"
                          min="1"
                          placeholder="Enter expected number of donors"
                          value={formData.expectedDonors}
                          onChange={handleInputChange}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="facilities">Available Facilities</Label>
                        <Textarea
                          id="facilities"
                          name="facilities"
                          placeholder="Describe available facilities (e.g., air conditioning, restrooms, waiting area)"
                          value={formData.facilities}
                          onChange={handleInputChange}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="additionalInfo">Additional Information (Optional)</Label>
                        <Textarea
                          id="additionalInfo"
                          name="additionalInfo"
                          placeholder="Any additional information or special requirements"
                          value={formData.additionalInfo}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>

                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="agreeTerms"
                        checked={formData.agreeTerms}
                        onCheckedChange={(checked) =>
                          setFormData((prev) => ({ ...prev, agreeTerms: checked as boolean }))
                        }
                        required
                      />
                      <div className="grid gap-1.5 leading-none">
                        <Label
                          htmlFor="agreeTerms"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          I agree to the Terms and Conditions
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          By registering, you agree to follow all blood donation guidelines and safety protocols.
                        </p>
                      </div>
                    </div>
                  </form>
                </CardContent>

                <CardFooter>
                  <Button onClick={handleSubmit} className="w-full" disabled={!formData.agreeTerms}>
                    Register Camp
                  </Button>
                </CardFooter>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="info">
            <Card>
              <CardHeader>
                <CardTitle>Camp Information</CardTitle>
                <CardDescription>Learn about hosting a successful blood donation camp.</CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">Benefits of Hosting a Camp</h3>
                  <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                    <li>Make a significant impact on your community's health and emergency preparedness</li>
                    <li>Strengthen your organization's corporate social responsibility initiatives</li>
                    <li>Build team spirit and camaraderie among employees or members</li>
                    <li>Receive recognition as a community health partner</li>
                    <li>Educate your community about the importance of blood donation</li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">What We Provide</h3>
                  <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                    <li>Professional medical staff and equipment</li>
                    <li>Pre-camp promotion materials and digital assets</li>
                    <li>Donor recruitment and scheduling assistance</li>
                    <li>Refreshments for donors</li>
                    <li>Post-donation care and monitoring</li>
                    <li>Comprehensive camp report with impact metrics</li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">Camp Timeline</h3>
                  <ol className="list-decimal pl-6 text-muted-foreground space-y-2">
                    <li>
                      <span className="font-medium text-foreground">Registration (4-6 weeks before)</span>
                      <p className="text-sm">Complete the registration form with all required details.</p>
                    </li>
                    <li>
                      <span className="font-medium text-foreground">Planning (3-4 weeks before)</span>
                      <p className="text-sm">
                        Our team will contact you to discuss logistics, space requirements, and promotional strategy.
                      </p>
                    </li>
                    <li>
                      <span className="font-medium text-foreground">Promotion (2-3 weeks before)</span>
                      <p className="text-sm">
                        Begin promoting the camp using our provided materials and your communication channels.
                      </p>
                    </li>
                    <li>
                      <span className="font-medium text-foreground">Preparation (1 week before)</span>
                      <p className="text-sm">
                        Confirm all arrangements and finalize the donor schedule and volunteer assignments.
                      </p>
                    </li>
                    <li>
                      <span className="font-medium text-foreground">Camp Day</span>
                      <p className="text-sm">
                        Our team arrives 1-2 hours before the start time to set up equipment and prepare the space.
                      </p>
                    </li>
                    <li>
                      <span className="font-medium text-foreground">Follow-up (1 week after)</span>
                      <p className="text-sm">
                        Receive a comprehensive report on the camp's impact and donor participation.
                      </p>
                    </li>
                  </ol>
                </div>
              </CardContent>

              <CardFooter>
                <Button onClick={() => document.querySelector('[data-value="register"]')?.click()} className="w-full">
                  Register a Camp
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="requirements">
            <Card>
              <CardHeader>
                <CardTitle>Camp Requirements</CardTitle>
                <CardDescription>Essential requirements for hosting a blood donation camp.</CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">Space Requirements</h3>
                  <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                    <li>Minimum area of 1,000 square feet (approximately 93 square meters)</li>
                    <li>Clean, well-lit, and air-conditioned or well-ventilated space</li>
                    <li>Accessible location with elevator access if not on ground floor</li>
                    <li>Adequate restroom facilities nearby</li>
                    <li>Separate areas for registration, screening, donation, and refreshments</li>
                    <li>Electrical outlets for medical equipment</li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">Timing Requirements</h3>
                  <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                    <li>Minimum duration of 4 hours</li>
                    <li>Weekday camps: Preferably between 9:00 AM and 5:00 PM</li>
                    <li>Weekend camps: Flexible timing based on expected donor turnout</li>
                    <li>Setup time: 1-2 hours before the camp starts</li>
                    <li>Teardown time: 1 hour after the camp ends</li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">Organizational Support</h3>
                  <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                    <li>Designated coordinator from your organization to liaise with our team</li>
                    <li>Assistance with local promotion and donor recruitment</li>
                    <li>2-3 volunteers to help with registration and donor flow management</li>
                    <li>Provision of tables and chairs as per the layout plan provided</li>
                    <li>Basic refreshments for donors (we can supplement if needed)</li>
                  </ul>
                </div>

                <div className="bg-muted p-4 rounded-lg">
                  <p className="text-sm">
                    <span className="font-medium">Note:</span> These are general requirements and can be adjusted based
                    on your specific circumstances. Our team will work with you to ensure a successful camp even if you
                    cannot meet all requirements. Please mention any limitations in the registration form.
                  </p>
                </div>
              </CardContent>

              <CardFooter>
                <Button onClick={() => document.querySelector('[data-value="register"]')?.click()} className="w-full">
                  Register a Camp
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
