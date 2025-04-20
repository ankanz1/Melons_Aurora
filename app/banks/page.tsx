"use client"

import { DialogTrigger } from "@/components/ui/dialog"
import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Search, MapPin, Phone, Calendar, Clock, MapIcon, Locate } from "lucide-react"
import { cn } from "@/lib/utils"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useToast } from "@/components/ui/use-toast"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { DatePicker } from "@/components/date-picker"
import { useMobile } from "@/hooks/use-mobile"
import dynamic from "next/dynamic"

// Dynamically import the Map component with no SSR
const MapComponent = dynamic(() => import("@/components/map-component"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[400px] bg-muted rounded-md flex items-center justify-center">
      <div className="animate-pulse text-muted-foreground">Loading map...</div>
    </div>
  ),
})

// Mock data for blood banks
const bloodBanks = [
  {
    id: 1,
    name: "City General Hospital Blood Bank",
    address: "123 Main Street, Downtown",
    phone: "(555) 123-4567",
    hours: "8:00 AM - 6:00 PM",
    distance: "2.3",
    lat: 40.7128,
    lng: -74.006,
    availability: {
      "A+": "High",
      "A-": "Medium",
      "B+": "High",
      "B-": "Low",
      "AB+": "Medium",
      "AB-": "Low",
      "O+": "High",
      "O-": "Medium",
    },
  },
  {
    id: 2,
    name: "Memorial Blood Center",
    address: "456 Park Avenue, Midtown",
    phone: "(555) 987-6543",
    hours: "9:00 AM - 7:00 PM",
    distance: "4.1",
    lat: 40.7168,
    lng: -73.9973,
    availability: {
      "A+": "Medium",
      "A-": "Low",
      "B+": "Medium",
      "B-": "Low",
      "AB+": "Low",
      "AB-": "Low",
      "O+": "High",
      "O-": "Low",
    },
  },
  {
    id: 3,
    name: "University Medical Center",
    address: "789 College Road, University District",
    phone: "(555) 456-7890",
    hours: "7:00 AM - 8:00 PM",
    distance: "5.7",
    lat: 40.7308,
    lng: -73.9973,
    availability: {
      "A+": "High",
      "A-": "Medium",
      "B+": "Low",
      "B-": "Low",
      "AB+": "Medium",
      "AB-": "Low",
      "O+": "Medium",
      "O-": "Medium",
    },
  },
  {
    id: 4,
    name: "Eastside Community Blood Bank",
    address: "321 Oak Street, Eastside",
    phone: "(555) 234-5678",
    hours: "8:30 AM - 5:30 PM",
    distance: "3.5",
    lat: 40.7228,
    lng: -73.9868,
    availability: {
      "A+": "High",
      "A-": "High",
      "B+": "Medium",
      "B-": "Medium",
      "AB+": "Low",
      "AB-": "Low",
      "O+": "High",
      "O-": "High",
    },
  },
  {
    id: 5,
    name: "Westside Medical Plaza",
    address: "987 Pine Avenue, Westside",
    phone: "(555) 876-5432",
    hours: "7:30 AM - 6:30 PM",
    distance: "6.2",
    lat: 40.7188,
    lng: -74.0168,
    availability: {
      "A+": "Medium",
      "A-": "Low",
      "B+": "High",
      "B-": "Medium",
      "AB+": "High",
      "AB-": "Medium",
      "O+": "Low",
      "O-": "Low",
    },
  },
]

// Mock data for donation camps
const donationCamps = [
  {
    id: 1,
    name: "Community Center Blood Drive",
    address: "321 Community Lane, Westside",
    date: "2025-05-15",
    time: "10:00 AM - 4:00 PM",
    organizer: "Red Cross",
    distance: "3.2",
    lat: 40.7198,
    lng: -74.0158,
  },
  {
    id: 2,
    name: "Corporate Office Blood Drive",
    address: "555 Business Park, Financial District",
    date: "2025-05-22",
    time: "9:00 AM - 3:00 PM",
    organizer: "Blood Alliance",
    distance: "5.5",
    lat: 40.7068,
    lng: -74.0113,
  },
  {
    id: 3,
    name: "Shopping Mall Blood Drive",
    address: "888 Mall Road, Eastside",
    date: "2025-06-05",
    time: "11:00 AM - 7:00 PM",
    organizer: "National Blood Services",
    distance: "4.8",
    lat: 40.7248,
    lng: -73.9818,
  },
  {
    id: 4,
    name: "University Campus Blood Drive",
    address: "123 University Ave, University District",
    date: "2025-06-12",
    time: "10:00 AM - 5:00 PM",
    organizer: "Student Health Services",
    distance: "6.1",
    lat: 40.7318,
    lng: -73.9953,
  },
  {
    id: 5,
    name: "Tech Park Blood Drive",
    address: "456 Innovation Way, Tech District",
    date: "2025-06-18",
    time: "8:00 AM - 2:00 PM",
    organizer: "Corporate Health Initiative",
    distance: "7.3",
    lat: 40.7158,
    lng: -74.0213,
  },
]

export default function BanksPage() {
  const { toast } = useToast()
  const isMobile = useMobile()
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredBanks, setFilteredBanks] = useState(bloodBanks)
  const [filteredCamps, setFilteredCamps] = useState(donationCamps)
  const [sortBy, setSortBy] = useState("distance")
  const [bloodTypeFilter, setBloodTypeFilter] = useState("all")
  const [appointmentData, setAppointmentData] = useState({
    date: "",
    time: "",
    name: "",
    phone: "",
    email: "",
    bloodType: "",
  })
  const [activeTab, setActiveTab] = useState("banks")
  const [mapView, setMapView] = useState(false)
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [locationRadius, setLocationRadius] = useState(10)
  const [dateFilter, setDateFilter] = useState<Date | undefined>(undefined)
  const [selectedLocation, setSelectedLocation] = useState<number | null>(null)

  // Calculate distances when user location changes
  const calculateDistances = (location: { lat: number; lng: number }) => {
    // Function to calculate distance between two points using Haversine formula
    const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
      const R = 3958.8 // Radius of the Earth in miles
      const dLat = (lat2 - lat1) * (Math.PI / 180)
      const dLon = (lon2 - lon1) * (Math.PI / 180)
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
      const distance = R * c
      return distance.toFixed(1)
    }

    // Update distances for blood banks
    const updatedBanks = bloodBanks.map((bank) => ({
      ...bank,
      distance: calculateDistance(location.lat, location.lng, bank.lat, bank.lng),
    }))

    // Update distances for donation camps
    const updatedCamps = donationCamps.map((camp) => ({
      ...camp,
      distance: calculateDistance(location.lat, location.lng, camp.lat, camp.lng),
    }))

    return { updatedBanks, updatedCamps }
  }

  // Get user's location
  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          }
          setUserLocation(location)

          // Calculate distances based on user location
          const { updatedBanks, updatedCamps } = calculateDistances(location)

          // Update the state with the new distances
          setFilteredBanks(updatedBanks)
          setFilteredCamps(updatedCamps)

          toast({
            title: "Location Found",
            description: "Using your current location to find nearby blood banks and camps.",
          })
        },
        (error) => {
          console.error("Error getting location:", error)
          toast({
            title: "Location Error",
            description: "Unable to get your location. Please enable location services.",
            variant: "destructive",
          })
        },
      )
    } else {
      toast({
        title: "Location Not Supported",
        description: "Geolocation is not supported by your browser.",
        variant: "destructive",
      })
    }
  }

  useEffect(() => {
    // Apply filters when user location, radius, or date filter changes
    if (userLocation) {
      applyFilters()
    }
  }, [userLocation, locationRadius, dateFilter, bloodTypeFilter])

  const applyFilters = () => {
    // Start with the original data or the distance-updated data
    let banks = userLocation
      ? bloodBanks.map((bank) => ({
          ...bank,
          distance:
            calculateDistances(userLocation).updatedBanks.find((b) => b.id === bank.id)?.distance || bank.distance,
        }))
      : [...bloodBanks]

    let camps = userLocation
      ? donationCamps.map((camp) => ({
          ...camp,
          distance:
            calculateDistances(userLocation).updatedCamps.find((c) => c.id === camp.id)?.distance || camp.distance,
        }))
      : [...donationCamps]

    // Apply search term filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      banks = banks.filter(
        (bank) => bank.name.toLowerCase().includes(term) || bank.address.toLowerCase().includes(term),
      )
      camps = camps.filter(
        (camp) =>
          camp.name.toLowerCase().includes(term) ||
          camp.address.toLowerCase().includes(term) ||
          camp.organizer.toLowerCase().includes(term),
      )
    }

    // Apply blood type filter
    if (bloodTypeFilter !== "all") {
      banks = banks.filter((bank) => {
        const availability = bank.availability[bloodTypeFilter as keyof typeof bank.availability]
        return availability && (availability === "High" || availability === "Medium")
      })
    }

    // Apply location radius filter
    if (userLocation) {
      banks = banks.filter((bank) => Number.parseFloat(bank.distance) <= locationRadius)
      camps = camps.filter((camp) => Number.parseFloat(camp.distance) <= locationRadius)
    }

    // Apply date filter for camps
    if (dateFilter) {
      const filterDate = new Date(dateFilter).toISOString().split("T")[0]
      camps = camps.filter((camp) => {
        const campDate = new Date(camp.date).toISOString().split("T")[0]
        return campDate >= filterDate
      })
    }

    // Apply sorting
    if (sortBy === "distance") {
      banks.sort((a, b) => Number.parseFloat(a.distance) - Number.parseFloat(b.distance))
      camps.sort((a, b) => Number.parseFloat(a.distance) - Number.parseFloat(b.distance))
    } else if (sortBy === "name") {
      banks.sort((a, b) => a.name.localeCompare(b.name))
      camps.sort((a, b) => a.name.localeCompare(b.name))
    }

    setFilteredBanks(banks)
    setFilteredCamps(camps)
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
    applyFilters()
  }

  const handleSortChange = (value: string) => {
    setSortBy(value)
    applyFilters()
  }

  const handleBloodTypeFilterChange = (value: string) => {
    setBloodTypeFilter(value)
    applyFilters()
  }

  const handleAppointmentSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Appointment data:", appointmentData)
    toast({
      title: "Appointment Scheduled",
      description: "Your donation appointment has been scheduled successfully.",
    })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setAppointmentData((prev) => ({ ...prev, [name]: value }))
  }

  const handleDateFilterChange = (date: Date | undefined) => {
    setDateFilter(date)
  }

  const handleMarkerClick = (id: number) => {
    setSelectedLocation(id)
    // Scroll to the corresponding card if in list view
    if (!mapView) {
      const element = document.getElementById(`location-${id}`)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    }
  }

  // Get the locations to display on the map based on active tab
  const getMapLocations = () => {
    return activeTab === "banks" ? filteredBanks : filteredCamps
  }

  return (
    <div className="container py-10">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Blood Banks & Donation Camps</h1>
          <p className="text-muted-foreground">Find blood banks and upcoming donation camps in your area.</p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, location, or organizer..."
              className="pl-10"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>

          <div className="flex gap-2">
            <Button variant="outline" onClick={getUserLocation} className="flex items-center gap-1">
              <Locate className="h-4 w-4" />
              {isMobile ? "" : "Use My Location"}
            </Button>
            <Button
              variant={mapView ? "default" : "outline"}
              onClick={() => setMapView(!mapView)}
              className="flex items-center gap-1"
            >
              <MapIcon className="h-4 w-4" />
              {isMobile ? "" : "Map View"}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="space-y-2">
            <Label>Distance (miles)</Label>
            <div className="flex items-center gap-2">
              <Slider
                defaultValue={[10]}
                max={50}
                step={1}
                value={[locationRadius]}
                onValueChange={(value) => setLocationRadius(value[0])}
              />
              <span className="w-12 text-center">{locationRadius}</span>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Blood Type</Label>
            <Select value={bloodTypeFilter} onValueChange={handleBloodTypeFilterChange}>
              <SelectTrigger>
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
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
            <Label>Sort By</Label>
            <Select value={sortBy} onValueChange={handleSortChange}>
              <SelectTrigger>
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="distance">Distance</SelectItem>
                <SelectItem value="name">Name</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Date (Camps)</Label>
            <DatePicker date={dateFilter} setDate={handleDateFilterChange} />
          </div>
        </div>

        {mapView && (
          <div className="mb-6">
            <Card>
              <CardContent className="p-0 overflow-hidden">
                <div className="w-full h-[500px]">
                  <MapComponent
                    locations={getMapLocations()}
                    userLocation={userLocation}
                    selectedLocation={selectedLocation}
                    onMarkerClick={handleMarkerClick}
                    locationType={activeTab === "banks" ? "bank" : "camp"}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="banks">Blood Banks</TabsTrigger>
            <TabsTrigger value="camps">Donation Camps</TabsTrigger>
          </TabsList>

          <TabsContent value="banks">
            <div className="space-y-4">
              {filteredBanks.length > 0 ? (
                filteredBanks.map((bank) => (
                  <Card
                    key={bank.id}
                    id={`location-${bank.id}`}
                    className={cn(
                      selectedLocation === bank.id && "ring-2 ring-primary",
                      "transition-all hover:shadow-md",
                    )}
                  >
                    <CardHeader>
                      <CardTitle>{bank.name}</CardTitle>
                      <CardDescription className="flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5" />
                        {bank.address} ({bank.distance} miles)
                      </CardDescription>
                    </CardHeader>

                    <CardContent>
                      <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <span>{bank.phone}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>{bank.hours}</span>
                        </div>

                        <div className="mt-2">
                          <h4 className="text-sm font-medium mb-2">Blood Availability:</h4>
                          <div className="grid grid-cols-4 gap-2">
                            {Object.entries(bank.availability).map(([type, level]) => (
                              <Badge
                                key={type}
                                variant="outline"
                                className={cn(
                                  "flex items-center justify-between",
                                  level === "High" && "border-green-500 text-green-500",
                                  level === "Medium" && "border-amber-500 text-amber-500",
                                  level === "Low" && "border-red-500 text-red-500",
                                )}
                              >
                                {type}
                                <span className="ml-1 text-xs">
                                  {level === "High" && "●●●"}
                                  {level === "Medium" && "●●○"}
                                  {level === "Low" && "●○○"}
                                </span>
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>

                    <CardFooter className="flex gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button>Schedule Donation</Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Schedule a Donation Appointment</DialogTitle>
                            <DialogDescription>
                              Fill out the form below to schedule your blood donation appointment at {bank.name}.
                            </DialogDescription>
                          </DialogHeader>

                          <form onSubmit={handleAppointmentSubmit} className="space-y-4 py-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="date">Date</Label>
                                <Input
                                  id="date"
                                  name="date"
                                  type="date"
                                  required
                                  value={appointmentData.date}
                                  onChange={handleInputChange}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="time">Time</Label>
                                <Input
                                  id="time"
                                  name="time"
                                  type="time"
                                  required
                                  value={appointmentData.time}
                                  onChange={handleInputChange}
                                />
                              </div>
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="name">Full Name</Label>
                              <Input
                                id="name"
                                name="name"
                                required
                                value={appointmentData.name}
                                onChange={handleInputChange}
                              />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="phone">Phone Number</Label>
                                <Input
                                  id="phone"
                                  name="phone"
                                  required
                                  value={appointmentData.phone}
                                  onChange={handleInputChange}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                  id="email"
                                  name="email"
                                  type="email"
                                  required
                                  value={appointmentData.email}
                                  onChange={handleInputChange}
                                />
                              </div>
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="bloodType">Blood Type</Label>
                              <Select
                                value={appointmentData.bloodType}
                                onValueChange={(value) => setAppointmentData((prev) => ({ ...prev, bloodType: value }))}
                              >
                                <SelectTrigger id="bloodType">
                                  <SelectValue placeholder="Select your blood type" />
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
                          </form>

                          <DialogFooter>
                            <Button type="submit" onClick={handleAppointmentSubmit}>
                              Schedule Appointment
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>

                      <Button
                        variant="outline"
                        className="flex-1"
                        onClick={() => {
                          setSelectedLocation(bank.id)
                          if (!mapView) {
                            setMapView(true)
                          }
                        }}
                      >
                        <MapPin className="h-4 w-4 mr-2" />
                        View on Map
                      </Button>
                    </CardFooter>
                  </Card>
                ))
              ) : (
                <div className="text-center py-10">
                  <p className="text-muted-foreground">No blood banks found matching your search criteria.</p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="camps">
            <div className="space-y-4">
              {filteredCamps.length > 0 ? (
                filteredCamps.map((camp) => (
                  <Card
                    key={camp.id}
                    id={`location-${camp.id}`}
                    className={cn(
                      selectedLocation === camp.id && "ring-2 ring-primary",
                      "transition-all hover:shadow-md",
                    )}
                  >
                    <CardHeader>
                      <CardTitle>{camp.name}</CardTitle>
                      <CardDescription className="flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5" />
                        {camp.address} ({camp.distance} miles)
                      </CardDescription>
                    </CardHeader>

                    <CardContent>
                      <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>
                            {new Date(camp.date).toLocaleDateString("en-US", {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>{camp.time}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{camp.organizer}</Badge>
                        </div>
                      </div>
                    </CardContent>

                    <CardFooter className="flex gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button>Schedule Appointment</Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Schedule a Donation Appointment</DialogTitle>
                            <DialogDescription>
                              Fill out the form below to schedule your blood donation appointment at {camp.name}.
                            </DialogDescription>
                          </DialogHeader>

                          <form onSubmit={handleAppointmentSubmit} className="space-y-4 py-4">
                            <div className="space-y-2">
                              <Label>Event Details</Label>
                              <div className="bg-muted p-3 rounded-md text-sm">
                                <p>
                                  <span className="font-medium">Date:</span> {new Date(camp.date).toLocaleDateString()}
                                </p>
                                <p>
                                  <span className="font-medium">Time:</span> {camp.time}
                                </p>
                                <p>
                                  <span className="font-medium">Location:</span> {camp.address}
                                </p>
                                <p>
                                  <span className="font-medium">Organizer:</span> {camp.organizer}
                                </p>
                              </div>
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="name">Full Name</Label>
                              <Input
                                id="name"
                                name="name"
                                required
                                value={appointmentData.name}
                                onChange={handleInputChange}
                              />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="phone">Phone Number</Label>
                                <Input
                                  id="phone"
                                  name="phone"
                                  required
                                  value={appointmentData.phone}
                                  onChange={handleInputChange}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                  id="email"
                                  name="email"
                                  type="email"
                                  required
                                  value={appointmentData.email}
                                  onChange={handleInputChange}
                                />
                              </div>
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="bloodType">Blood Type</Label>
                              <Select
                                value={appointmentData.bloodType}
                                onValueChange={(value) => setAppointmentData((prev) => ({ ...prev, bloodType: value }))}
                              >
                                <SelectTrigger id="bloodType">
                                  <SelectValue placeholder="Select your blood type" />
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
                          </form>

                          <DialogFooter>
                            <Button type="submit" onClick={handleAppointmentSubmit}>
                              Schedule Appointment
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>

                      <Button
                        variant="outline"
                        className="flex-1"
                        onClick={() => {
                          setSelectedLocation(camp.id)
                          if (!mapView) {
                            setMapView(true)
                          }
                        }}
                      >
                        <MapPin className="h-4 w-4 mr-2" />
                        View on Map
                      </Button>
                    </CardFooter>
                  </Card>
                ))
              ) : (
                <div className="text-center py-10">
                  <p className="text-muted-foreground">No donation camps found matching your search criteria.</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
