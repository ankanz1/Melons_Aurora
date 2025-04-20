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
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon, CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { useToast } from "@/components/ui/use-toast"

export default function DonatePage() {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    bloodGroup: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    medicalHistory: "",
    lastDonation: null as Date | null,
    consent: false,
    notifications: false,
  })
  const [submitted, setSubmitted] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would send this data to your backend
    console.log("Form submitted:", formData)
    setSubmitted(true)
    toast({
      title: "Registration Successful",
      description: "Thank you for registering as a blood donor!",
    })
  }

  return (
    <div className="container py-10">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Become a Blood Donor</h1>
          <p className="text-muted-foreground">Register as a blood donor and help save lives in your community.</p>
        </div>

        <Tabs defaultValue="register" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="register">Register as Donor</TabsTrigger>
            <TabsTrigger value="info">Donation Information</TabsTrigger>
            <TabsTrigger value="eligibility">Eligibility</TabsTrigger>
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
                      Thank you for registering as a blood donor. Your information has been submitted successfully.
                    </p>
                    <div className="space-y-4 max-w-md">
                      <p className="text-sm">
                        We'll notify you about upcoming blood donation camps and urgent blood needs in your area. You
                        can also schedule a donation appointment at any time.
                      </p>
                      <div className="flex flex-col sm:flex-row gap-4">
                        <Button onClick={() => setSubmitted(false)}>Register Another Donor</Button>
                        <Button variant="outline" asChild>
                          <a href="/banks">Find Donation Centers</a>
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Donor Registration</CardTitle>
                  <CardDescription>Fill out the form below to register as a blood donor.</CardDescription>
                </CardHeader>

                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          name="name"
                          placeholder="Enter your full name"
                          value={formData.name}
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
                          placeholder="Enter your email"
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
                          placeholder="Enter your phone number"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="bloodGroup">Blood Group</Label>
                        <Select
                          value={formData.bloodGroup}
                          onValueChange={(value) => setFormData((prev) => ({ ...prev, bloodGroup: value }))}
                          required
                        >
                          <SelectTrigger id="bloodGroup">
                            <SelectValue placeholder="Select your blood group" />
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
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <Textarea
                        id="address"
                        name="address"
                        placeholder="Enter your street address"
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
                          placeholder="Enter your city"
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
                          placeholder="Enter your state"
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
                          placeholder="Enter your zip code"
                          value={formData.zipCode}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="medicalHistory">Medical History (Optional)</Label>
                      <Textarea
                        id="medicalHistory"
                        name="medicalHistory"
                        placeholder="Any relevant medical history or conditions"
                        value={formData.medicalHistory}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="lastDonation">Last Donation Date (if applicable)</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !formData.lastDonation && "text-muted-foreground",
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {formData.lastDonation ? format(formData.lastDonation, "PPP") : <span>Pick a date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={formData.lastDonation}
                            onSelect={(date) => setFormData((prev) => ({ ...prev, lastDonation: date }))}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-start space-x-2">
                        <Checkbox
                          id="consent"
                          checked={formData.consent}
                          onCheckedChange={(checked) =>
                            setFormData((prev) => ({ ...prev, consent: checked as boolean }))
                          }
                          required
                        />
                        <div className="grid gap-1.5 leading-none">
                          <Label
                            htmlFor="consent"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            I consent to be contacted for blood donation
                          </Label>
                          <p className="text-sm text-muted-foreground">You can unsubscribe at any time.</p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-2">
                        <Checkbox
                          id="notifications"
                          checked={formData.notifications}
                          onCheckedChange={(checked) =>
                            setFormData((prev) => ({ ...prev, notifications: checked as boolean }))
                          }
                        />
                        <div className="grid gap-1.5 leading-none">
                          <Label
                            htmlFor="notifications"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            I want to receive notifications about urgent blood needs
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            We'll notify you when your blood type is urgently needed.
                          </p>
                        </div>
                      </div>
                    </div>
                  </form>
                </CardContent>

                <CardFooter>
                  <Button onClick={handleSubmit} className="w-full">
                    Register as Donor
                  </Button>
                </CardFooter>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="info">
            <Card>
              <CardHeader>
                <CardTitle>Blood Donation Information</CardTitle>
                <CardDescription>Learn about the blood donation process and requirements.</CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">The Donation Process</h3>
                  <ol className="list-decimal pl-6 text-muted-foreground space-y-2">
                    <li>
                      <span className="font-medium text-foreground">Registration and Health History</span>
                      <p className="text-sm">
                        You'll complete a confidential health questionnaire and have a mini health check.
                      </p>
                    </li>
                    <li>
                      <span className="font-medium text-foreground">Mini-Physical</span>
                      <p className="text-sm">
                        We'll check your temperature, blood pressure, pulse, and hemoglobin levels.
                      </p>
                    </li>
                    <li>
                      <span className="font-medium text-foreground">The Donation</span>
                      <p className="text-sm">
                        The actual donation takes about 8-10 minutes. You'll donate approximately one pint of blood.
                      </p>
                    </li>
                    <li>
                      <span className="font-medium text-foreground">Refreshments and Recovery</span>
                      <p className="text-sm">
                        After donating, you'll rest and enjoy refreshments for 15 minutes before leaving.
                      </p>
                    </li>
                  </ol>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">Benefits of Donating Blood</h3>
                  <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                    <li>Save up to three lives with one donation</li>
                    <li>Free mini health screening</li>
                    <li>Reduced risk of heart disease</li>
                    <li>Stimulates blood cell production</li>
                    <li>Burns calories (up to 650 calories per donation)</li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">Preparing for Donation</h3>
                  <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                    <li>Eat a healthy meal before donating</li>
                    <li>Drink plenty of fluids (an extra 16 oz) before your appointment</li>
                    <li>Wear comfortable clothing with sleeves that can be rolled up</li>
                    <li>Bring ID and list of medications you're taking</li>
                    <li>Get a good night's sleep before donation day</li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">After Donation Care</h3>
                  <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                    <li>Drink extra fluids for the next 48 hours</li>
                    <li>Avoid strenuous physical activity for 24 hours</li>
                    <li>Keep the bandage on for at least 4 hours</li>
                    <li>If you feel dizzy, lie down with your feet elevated</li>
                    <li>Eat iron-rich foods to help replenish iron stores</li>
                  </ul>
                </div>
              </CardContent>

              <CardFooter>
                <Button onClick={() => document.querySelector('[data-value="register"]')?.click()} className="w-full">
                  Register as Donor
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="eligibility">
            <Card>
              <CardHeader>
                <CardTitle>Donor Eligibility</CardTitle>
                <CardDescription>Check if you're eligible to donate blood.</CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">Basic Requirements</h3>
                  <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                    <li>Be at least 17 years old (16 with parental consent in some states)</li>
                    <li>Weigh at least 110 pounds</li>
                    <li>Be in good general health and feeling well</li>
                    <li>Have not donated whole blood in the last 56 days</li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">Temporary Deferrals</h3>
                  <p className="text-sm text-muted-foreground mb-2">You may need to wait to donate if you:</p>
                  <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                    <li>Have a cold, flu, or other illness (wait until symptoms are gone)</li>
                    <li>Recently received certain vaccinations</li>
                    <li>Recently traveled to certain countries</li>
                    <li>Are pregnant or recently gave birth (wait 6 weeks after delivery)</li>
                    <li>Recently had surgery or dental work</li>
                    <li>Have low iron levels</li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">Permanent Deferrals</h3>
                  <p className="text-sm text-muted-foreground mb-2">You may not be eligible to donate if you:</p>
                  <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                    <li>Have certain chronic illnesses like HIV/AIDS or hepatitis</li>
                    <li>Have had certain types of cancer</li>
                    <li>Have certain heart conditions</li>
                    <li>Have received a blood transfusion in the UK between 1980-1996</li>
                    <li>Have used intravenous drugs not prescribed by a doctor</li>
                  </ul>
                </div>

                <div className="bg-muted p-4 rounded-lg">
                  <p className="text-sm">
                    <span className="font-medium">Note:</span> This is not a complete list of eligibility criteria. The
                    final determination will be made by health professionals at the donation site based on your health
                    history and current health status.
                  </p>
                </div>
              </CardContent>

              <CardFooter>
                <Button onClick={() => document.querySelector('[data-value="register"]')?.click()} className="w-full">
                  Register as Donor
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
