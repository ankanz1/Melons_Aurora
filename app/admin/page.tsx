"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  MoreHorizontal,
  Search,
  Users,
  Droplet,
  Building,
  FileText,
  AlertCircle,
  CheckCircle2,
  XCircle,
} from "lucide-react"
import { cn } from "@/lib/utils"

// Mock data for users
const users = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "Donor",
    bloodType: "O+",
    lastDonation: "2025-04-15",
    status: "Active",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "Recipient",
    bloodType: "AB-",
    lastRequest: "2025-05-01",
    status: "Active",
  },
  { id: 3, name: "Robert Johnson", email: "robert@example.com", role: "Admin", status: "Active" },
  {
    id: 4,
    name: "Emily Davis",
    email: "emily@example.com",
    role: "Donor",
    bloodType: "A+",
    lastDonation: "2025-03-22",
    status: "Inactive",
  },
  {
    id: 5,
    name: "Michael Wilson",
    email: "michael@example.com",
    role: "Hospital Staff",
    hospital: "City General",
    status: "Active",
  },
]

// Mock data for donations
const donations = [
  {
    id: 1,
    donor: "John Doe",
    bloodType: "O+",
    date: "2025-04-15",
    location: "City General Hospital",
    status: "Completed",
  },
  {
    id: 2,
    name: "Emily Davis",
    bloodType: "A+",
    date: "2025-03-22",
    location: "Memorial Blood Center",
    status: "Completed",
  },
  {
    id: 3,
    name: "Sarah Johnson",
    bloodType: "B-",
    date: "2025-05-05",
    location: "University Medical Center",
    status: "Scheduled",
  },
  {
    id: 4,
    name: "David Miller",
    bloodType: "AB+",
    date: "2025-05-10",
    location: "Community Center Blood Drive",
    status: "Scheduled",
  },
  {
    id: 5,
    name: "Lisa Brown",
    bloodType: "O-",
    date: "2025-04-28",
    location: "Mobile Blood Drive",
    status: "Cancelled",
  },
]

// Mock data for requests
const requests = [
  {
    id: 1,
    patient: "Jane Smith",
    bloodType: "AB-",
    date: "2025-05-01",
    hospital: "Memorial Hospital",
    urgency: "High",
    status: "Active",
  },
  {
    id: 2,
    patient: "Thomas Anderson",
    bloodType: "O+",
    date: "2025-04-29",
    hospital: "City General Hospital",
    urgency: "Medium",
    status: "Fulfilled",
  },
  {
    id: 3,
    patient: "Maria Garcia",
    bloodType: "B+",
    date: "2025-05-07",
    hospital: "University Medical Center",
    urgency: "High",
    status: "Active",
  },
  {
    id: 4,
    patient: "James Wilson",
    bloodType: "A-",
    date: "2025-05-12",
    hospital: "Children's Hospital",
    urgency: "Low",
    status: "Active",
  },
  {
    id: 5,
    patient: "Patricia Moore",
    bloodType: "O-",
    date: "2025-04-25",
    hospital: "Veterans Hospital",
    urgency: "Medium",
    status: "Cancelled",
  },
]

// Mock data for blood inventory
const inventory = [
  { bloodType: "A+", units: 45, lastUpdated: "2025-05-02" },
  { bloodType: "A-", units: 12, lastUpdated: "2025-05-02" },
  { bloodType: "B+", units: 28, lastUpdated: "2025-05-02" },
  { bloodType: "B-", units: 8, lastUpdated: "2025-05-02" },
  { bloodType: "AB+", units: 15, lastUpdated: "2025-05-02" },
  { bloodType: "AB-", units: 5, lastUpdated: "2025-05-02" },
  { bloodType: "O+", units: 52, lastUpdated: "2025-05-02" },
  { bloodType: "O-", units: 18, lastUpdated: "2025-05-02" },
]

export default function AdminPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(users);
  const [filteredDonations, setFilteredDonations] = useState(donations);
  const [filteredRequests, setFilteredRequests] = useState(requests);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    
    const filteredUsers = users.filter(
      (user) =>
        user.name.toLowerCase().includes(term) ||
        user.email.toLowerCase().includes(term) ||
        user.role.toLowerCase().includes(term)
    );
    
    const filteredDonations = donations.filter(
      (donation) =>
        donation.donor?.toLowerCase().includes(term) ||
        donation.location.toLowerCase().includes(term) ||
        donation.bloodType.toLowerCase().includes(term)
    );
    
    const filteredRequests = requests.filter(
      (request) =>
        request.patient.toLowerCase().includes(term) ||
        request.hospital.toLowerCase().includes(term) ||
        request.bloodType.toLowerCase().includes(term)
    );
    
    setFilteredUsers(filteredUsers);
    setFilteredDonations(filteredDonations);
    setFilteredRequests(filteredRequests);
  };

  return (
    <div className="container py-10">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Manage users, donations, requests, and blood inventory.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Users</p>
                  <p className="text-2xl font-bold">{users.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Droplet className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Donations</p>
                  <p className="text-2xl font-bold">{donations.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Active Requests</p>
                  <p className="text-2xl font-bold">
                    {requests.filter(r => r.status === "Active").length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Building className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Blood Units</p>
                  <p className="text-2xl font-bold">
                    {inventory.reduce((acc, item) => acc + item.units, 0)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search users, donations, or requests..."
            className="pl-10"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>

        <Tabs defaultValue="users" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="donations">Donations</TabsTrigger>
            <TabsTrigger value="requests">Requests</TabsTrigger>
            <TabsTrigger value="inventory">Inventory</TabsTrigger>
          </TabsList>
          
          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>
                  View and manage all users in the system.
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{user.role}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={cn(
                              user.status === "Active" 
                                ? "border-green-500 text-green-500" 
                                : "border-red-500 text-red-500"
                            )}
                          >
                            {user.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Open menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>View Details</DropdownMenuItem>
                              <DropdownMenuItem>Edit User</DropdownMenuItem>
                              <DropdownMenuItem className="text-red-500">
                                {user.status === "Active" ? "Deactivate" : "Activate"}
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
              
              <CardFooter className="flex justify-between">
                <div className="text-sm text-muted-foreground">
                  Showing {filteredUsers.length} of {users.length} users
                </div>
                <Button>Add New User</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="donations">
            <Card>
              <CardHeader>
                <CardTitle>Donation Management</CardTitle>
                <CardDescription>
                  View and manage all blood donations.
                </CardDescription>
              
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Donor</TableHead>
                      <TableHead>Blood Type</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredDonations.map((donation) => (
                      <TableRow key={donation.id}>
                        <TableCell className="font-medium">{donation.donor || donation.name}</TableCell>
                        <TableCell>{donation.bloodType}</TableCell>
                        <TableCell>{donation.date}</TableCell>
                        <TableCell>{donation.location}</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={cn(
                              donation.status === "Completed" && "border-green-500 text-green-500",
                              donation.status === "Scheduled" && "border-blue-500 text-blue-500",
                              donation.status === "Cancelled" && "border-red-500 text-red-500"
                            )}
                          >
                            {donation.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Open menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>View Details</DropdownMenuItem>
                              <DropdownMenuItem>Edit Donation</DropdownMenuItem>
                              <DropdownMenuItem className="text-red-500">
                                {donation.status === "Scheduled" ? "Cancel Donation" : "Delete Record"}
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
              
              <CardFooter className="flex justify-between">
                <div className="text-sm text-muted-foreground">
                  Showing {filteredDonations.length} of {donations.length} donations
                </div>
                <Button>Schedule New Donation</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="requests">
            <Card>
              <CardHeader>
                <CardTitle>Request Management</CardTitle>
                <CardDescription>
                  View and manage all blood requests.
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Patient</TableHead>
                      <TableHead>Blood Type</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Hospital</TableHead>
                      <TableHead>Urgency</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredRequests.map((request) => (
                      <TableRow key={request.id}>
                        <TableCell className="font-medium">{request.patient}</TableCell>
                        <TableCell>{request.bloodType}</TableCell>
                        <TableCell>{request.date}</TableCell>
                        <TableCell>{request.hospital}</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={cn(
                              request.urgency === "High" && "border-red-500 text-red-500",
                              request.urgency === "Medium" && "border-amber-500 text-amber-500",
                              request.urgency === "Low" && "border-green-500 text-green-500"
                            )}
                          >
                            {request.urgency}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={cn(
                              request.status === "Active" && "border-blue-500 text-blue-500",
                              request.status === "Fulfilled" && "border-green-500 text-green-500",
                              request.status === "Cancelled" && "border-red-500 text-red-500"
                            )}
                          >
                            {request.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Open menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>View Details</DropdownMenuItem>
                              <DropdownMenuItem>Edit Request</DropdownMenuItem>
                              <DropdownMenuItem>Mark as Fulfilled</DropdownMenuItem>
                              <DropdownMenuItem className="text-red-500">
                                Cancel Request
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
              
              <CardFooter className="flex justify-between">
                <div className="text-sm text-muted-foreground">
                  Showing {filteredRequests.length} of {requests.length} requests
                </div>
                <Button>Create New Request</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="inventory">
            <Card>
              <CardHeader>
                <CardTitle>Blood Inventory</CardTitle>
                <CardDescription>
                  View and manage blood inventory levels.
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  {inventory.map((item) => (
                    <Card key={item.bloodType}>
                      <CardContent className="pt-6">
                        <div className="flex flex-col items-center text-center">
                          <Badge
                            className="text-lg px-3 py-1 mb-2"
                            variant="outline"
                          >
                            {item.bloodType}
                          </Badge>
                          <p className="text-3xl font-bold">{item.units}</p>
                          <p className="text-sm text-muted-foreground">Units Available</p>
                          <p className="text-xs text-muted-foreground mt-2">
                            Last updated: {item.lastUpdated}
                          </p>
                          <div className="mt-4 flex gap-2">
                            <Button size="sm" variant="outline">
                              Update
                            </Button>
                            <Button size="sm">
                              Add Units
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold">Inventory Status</h3>
                    <div className="flex gap-4">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        <span className="text-sm">Sufficient: A+, B+, O+</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <AlertCircle className="h-4 w-4 text-amber-500" />
                        <span className="text-sm">Low: AB+, A-</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <XCircle className="h-4 w-4 text-red-500" />
                        <span className="text-sm">Critical: B-, AB-, O-</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <Button>Generate Report</Button>
                  </div>
                </div>
              </CardContent>
              
              <CardFooter>
                <div className="w-full flex justify-between items-center">
                  <div className="text-sm text-muted-foreground">
                    Last inventory check: May 2, 2025
                  </div>
                  <Button variant="outline">Update All Inventory</Button>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
