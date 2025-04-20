"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePicker } from "@/components/date-picker"
import { useToast } from "@/components/ui/use-toast"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { MapPin, Calendar, Clock, Locate, Search } from "lucide-react"
import { cn } from "@/lib/utils"
import dynamic from "next/dynamic"

// Dynamically import the Map component with no SSR
const MapComponent = dynamic(() => import("@/components/map-component"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[500px] bg-muted rounded-md flex items-center justify-center">
      <div className="animate-pulse text-muted-foreground">Loading map...</div>
    </div>
  ),
})

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
  {
    id: 6,
    name: "Downtown Plaza Blood Drive",
    address: "789 Main Street, Downtown",
    date: "2025-05-25",
    time: "9:00 AM - 3:00 PM",
    organizer: "City Health Department",
    distance: "2.1",
    lat: 40.7128,
    lng: -74.006,
  },
  {
    id: 7,
    name: "Riverside Park Blood Drive",
    address: "321 Riverside Drive, Riverside",
    date: "2025-06-08",
    time: "10:00 AM - 4:00 PM",
    organizer: "Community Health Network",
    distance: "3.8",
    lat: 40.7278,
    lng: -73.9808,
  },
  {
    id: 8,
    name: "Central Hospital Blood Drive",
    address: "456 Medical Center Blvd, Midtown",
    date: "2025-06-15",
    time: "8:00 AM - 6:00 PM",
    organizer: "Central Hospital",
    distance: "4.2",
    lat: 40.7168,
    lng: -73.9873,
  },
]

export default function NearbyPage() {
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredCamps, setFilteredCamps] = useState(donationCamps)
  const [sortBy, setSortBy] = useState("distance")
  const [bloodTypeFilter, setBloodTypeFilter] = useState("all")
  const [appointmentData, setAppointmentData] = useState({
    name: "",
    phone: "",
    email: "",
    bloodType: "",
  })
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [locationRadius, setLocationRadius] = useState(10)
  const [dateFilter, setDateFilter] = useState<Date | undefined>(undefined)
  const [selectedLocation, setSelectedLocation] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(false)

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

    // Update distances for donation camps
    const updatedCamps = donationCamps.map((camp) => ({
      ...camp,
      distance: calculateDistance(location.lat, location.lng, camp.lat, camp.lng),
    }))

    return updatedCamps
  }

  // Update the getUserLocation function to handle permission errors better and provide a fallback
  const getUserLocation = () => {
    setIsLoading(true)

    if (navigator.geolocation) {
      try {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const location = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            }
            setUserLocation(location)

            // Calculate distances based on user location
            const updatedCamps = calculateDistances(location)

            // Update the state with the new distances
            setFilteredCamps(updatedCamps)
            setIsLoading(false)

            toast({
              title: "Location Found",
              description: "Using your current location to find nearby blood donation camps.",
            })
          },
          (error) => {
            console.error("Error getting location:", error)
            setIsLoading(false)

            // Use a fallback location (New York City center)
            const fallbackLocation = { lat: 40.7128, lng: -74.006 }
            setUserLocation(fallbackLocation)

            // Calculate distances based on fallback location
            const updatedCamps = calculateDistances(fallbackLocation)
            setFilteredCamps(updatedCamps)

            toast({
              title: "Using Default Location",
              description:
                "Unable to access your location. Using a default location instead. You can still explore camps on the map.",
            })
          },
          { timeout: 10000, enableHighAccuracy: false },
        )
      } catch (error) {
        console.error("Geolocation error:", error)
        handleGeolocationFallback()
      }
    } else {
      handleGeolocationFallback()
    }
  }

  // Add a new helper function to handle fallback
  const handleGeolocationFallback = () => {
    setIsLoading(false)

    // Use a fallback location (New York City center)
    const fallbackLocation = { lat: 40.7128, lng: -74.006 }
    setUserLocation(fallbackLocation)

    // Calculate distances based on fallback location
    const updatedCamps = calculateDistances(fallbackLocation)
    setFilteredCamps(updatedCamps)

    toast({
      title: "Location Services Unavailable",
      description: "Geolocation is not available. Using a default location instead.",
    })
  }

  // Update the useEffect to handle potential errors during auto-detection
  useEffect(() => {
    try {
      getUserLocation()
    } catch (error) {
      console.error("Initial geolocation error:", error)
      handleGeolocationFallback()
    }
  }, [])

  useEffect(() => {
    // Apply filters when user location, radius, or date filter changes
    if (userLocation) {
      applyFilters()
    }
  }, [userLocation, locationRadius, dateFilter, bloodTypeFilter, searchTerm, sortBy])

  const applyFilters = () => {
    // Start with the original data or the distance-updated data
    let camps = userLocation
      ? donationCamps.map((camp) => ({
          ...camp,
          distance: calculateDistances(userLocation).find((c) => c.id === camp.id)?.distance || camp.distance,
        }))
      : [...donationCamps]

    // Apply search term filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      camps = camps.filter(
        (camp) =>
          camp.name.toLowerCase().includes(term) ||
          camp.address.toLowerCase().includes(term) ||
          camp.organizer.toLowerCase().includes(term),
      )
    }

    // Apply blood type filter (for future implementation of blood type specific camps)
    if (bloodTypeFilter !== "all") {
      // In a real app, you would filter based on available blood types at each camp
      // For now, we'll just keep all camps since we don't have that data
    }

    // Apply location radius filter
    if (userLocation) {
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
      camps.sort((a, b) => Number.parseFloat(a.distance) - Number.parseFloat(b.distance))
    } else if (sortBy === "name") {
      camps.sort((a, b) => a.name.localeCompare(b.name))
    } else if (sortBy === "date") {
      camps.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    }

    setFilteredCamps(camps)
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const handleSortChange = (value: string) => {
    setSortBy(value)
  }

  const handleBloodTypeFilterChange = (value: string) => {
    setBloodTypeFilter(value)
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
    // Scroll to the corresponding card
    const element = document.getElementById(`camp-${id}`)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="container py-10">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Nearby Blood Donation Camps</h1>
          <p className="text-muted-foreground">Find and schedule appointments at blood donation camps near you.</p>
        </div>

        <div className="mb-6">
          <Card>
            <CardContent className="p-0 overflow-hidden">
              <div className="w-full h-[500px]">
                {isLoading ? (
                  <div className="w-full h-full flex items-center justify-center bg-muted">
                    <div className="animate-pulse text-muted-foreground">Locating nearby camps...</div>
                  </div>
                ) : (
                  <>
                    <MapComponent
                      locations={filteredCamps}
                      userLocation={userLocation}
                      selectedLocation={selectedLocation}
                      onMarkerClick={handleMarkerClick}
                      locationType="camp"
                    />
                    {userLocation && (
                      <div className="absolute bottom-4 left-4 z-10 bg-background/80 backdrop-blur-sm p-2 rounded-md shadow-md text-xs">
                        {userLocation.lat === 40.7128 && userLocation.lng === -74.006 ? (
                          <div className="flex items-center gap-1 text-amber-500">
                            <MapPin className="h-3 w-3" />
                            <span>Using default location (NYC)</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1 text-green-500">
                            <MapPin className="h-3 w-3" />
                            <span>Using your current location</span>
                          </div>
                        )}
                      </div>
                    )}
                  </>
                )}
              </div>
            </CardContent>
          </Card>
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

          <Button variant="outline" onClick={getUserLocation} className="flex items-center gap-1" disabled={isLoading}>
            <Locate className="h-4 w-4" />
            {isLoading ? "Locating..." : "Refresh Location"}
          </Button>
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
                <SelectItem value="date">Date</SelectItem>
                <SelectItem value="name">Name</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Date</Label>
            <DatePicker date={dateFilter} setDate={handleDateFilterChange} />
          </div>
        </div>

        <div className="space-y-4">
          {filteredCamps.length > 0 ? (
            filteredCamps.map((camp) => (
              <Card
                key={camp.id}
                id={`camp-${camp.id}`}
                className={cn(selectedLocation === camp.id && "ring-2 ring-primary", "transition-all hover:shadow-md")}
                onClick={() => setSelectedLocation(camp.id)}
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
      </div>
    </div>
  )
}
