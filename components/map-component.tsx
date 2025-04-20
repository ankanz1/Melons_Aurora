"use client"

import { useEffect, useRef } from "react"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

// Define the types for our locations
type Location = {
  id: number
  name: string
  address: string
  lat: number
  lng: number
  distance: string
  [key: string]: any // Allow for other properties
}

type MapComponentProps = {
  locations: Location[]
  userLocation: { lat: number; lng: number } | null
  selectedLocation: number | null
  onMarkerClick: (id: number) => void
  locationType: "bank" | "camp"
}

// Custom icon for blood banks
const createBloodBankIcon = () => {
  return L.divIcon({
    html: `<div class="flex items-center justify-center w-8 h-8 bg-red-500 text-white rounded-full border-2 border-white shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2v7a2 2 0 0 0 2 2h7a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h7Z"></path>
              <path d="M12 2v7a2 2 0 0 0 2 2h7"></path>
            </svg>
          </div>`,
    className: "",
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  })
}

// Custom icon for donation camps
const createDonationCampIcon = () => {
  return L.divIcon({
    html: `<div class="flex items-center justify-center w-8 h-8 bg-purple-500 text-white rounded-full border-2 border-white shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 9V6a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v3"></path>
              <path d="M3 11v5a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v2H7v-2a2 2 0 0 0-4 0Z"></path>
              <path d="M5 18v2"></path>
              <path d="M19 18v2"></path>
            </svg>
          </div>`,
    className: "",
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  })
}

// Custom icon for selected location
const createSelectedIcon = () => {
  return L.divIcon({
    html: `<div class="flex items-center justify-center w-10 h-10 bg-primary text-white rounded-full border-2 border-white shadow-lg animate-pulse">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
          </div>`,
    className: "",
    iconSize: [40, 40],
    iconAnchor: [20, 20],
  })
}

// Custom icon for user location
const createUserLocationIcon = () => {
  return L.divIcon({
    html: `<div class="flex items-center justify-center w-8 h-8 bg-blue-500 text-white rounded-full border-2 border-white shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <circle cx="12" cy="12" r="4"></circle>
            </svg>
          </div>`,
    className: "",
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  })
}

export default function MapComponent({
  locations,
  userLocation,
  selectedLocation,
  onMarkerClick,
  locationType,
}: MapComponentProps) {
  const mapRef = useRef<L.Map | null>(null)
  const markersRef = useRef<{ [key: number]: L.Marker }>({})

  useEffect(() => {
    // Initialize map if it doesn't exist
    if (!mapRef.current) {
      // Default to New York City coordinates if no user location
      const initialLat = userLocation?.lat || 40.7128
      const initialLng = userLocation?.lng || -74.006

      mapRef.current = L.map("map").setView([initialLat, initialLng], 13)

      // Add tile layer (OpenStreetMap)
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapRef.current)
    }

    // Clear existing markers
    Object.values(markersRef.current).forEach((marker) => {
      marker.remove()
    })
    markersRef.current = {}

    // Add user location marker if available
    if (userLocation && mapRef.current) {
      const userMarker = L.marker([userLocation.lat, userLocation.lng], {
        icon: createUserLocationIcon(),
      }).addTo(mapRef.current)

      userMarker.bindPopup("<strong>Your Location</strong>")

      // Center map on user location
      mapRef.current.setView([userLocation.lat, userLocation.lng], 12)
    }

    // Add location markers
    if (mapRef.current) {
      locations.forEach((location) => {
        const isSelected = selectedLocation === location.id

        // Choose icon based on location type and selection state
        let icon
        if (isSelected) {
          icon = createSelectedIcon()
        } else if (locationType === "bank") {
          icon = createBloodBankIcon()
        } else {
          icon = createDonationCampIcon()
        }

        // Create marker
        const marker = L.marker([location.lat, location.lng], {
          icon: icon,
        }).addTo(mapRef.current!)

        // Create popup content
        let popupContent = `
          <div class="p-1">
            <strong>${location.name}</strong><br>
            <small>${location.address}</small><br>
            <small>Distance: ${location.distance} miles</small>
        `

        // Add type-specific information
        if (locationType === "bank") {
          popupContent += `
            <br><small>Hours: ${location.hours}</small>
            <br><small>Phone: ${location.phone}</small>
          `
        } else {
          popupContent += `
            <br><small>Date: ${new Date(location.date).toLocaleDateString()}</small>
            <br><small>Time: ${location.time}</small>
            <br><small>Organizer: ${location.organizer}</small>
          `
        }

        popupContent += `</div>`

        // Bind popup to marker
        marker.bindPopup(popupContent)

        // Add click event
        marker.on("click", () => {
          onMarkerClick(location.id)
        })

        // Store marker reference
        markersRef.current[location.id] = marker

        // If this is the selected location, open its popup
        if (isSelected) {
          marker.openPopup()
          mapRef.current!.setView([location.lat, location.lng], 14)
        }
      })

      // If no user location and no selected location, fit bounds to all markers
      if (!userLocation && !selectedLocation && locations.length > 0) {
        const bounds = L.latLngBounds(locations.map((loc) => [loc.lat, loc.lng]))
        mapRef.current.fitBounds(bounds, { padding: [50, 50] })
      }
    }

    // Cleanup function
    return () => {
      // We don't destroy the map here to prevent re-initialization
      // Just clear the markers
    }
  }, [locations, userLocation, selectedLocation, locationType, onMarkerClick])

  // Update map when selected location changes
  useEffect(() => {
    if (selectedLocation && markersRef.current[selectedLocation] && mapRef.current) {
      const marker = markersRef.current[selectedLocation]
      const position = marker.getLatLng()

      // Update marker icon
      marker.setIcon(createSelectedIcon())
      marker.openPopup()

      // Center map on selected marker
      mapRef.current.setView(position, 14)

      // Update other markers to normal icons
      Object.entries(markersRef.current).forEach(([id, m]) => {
        if (Number(id) !== selectedLocation) {
          m.setIcon(locationType === "bank" ? createBloodBankIcon() : createDonationCampIcon())
        }
      })
    }
  }, [selectedLocation, locationType])

  return <div id="map" className="w-full h-full z-0"></div>
}
