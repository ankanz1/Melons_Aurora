"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import {
  Home,
  Activity,
  Droplet,
  Building,
  FileText,
  Calendar,
  ShieldCheck,
  Menu,
  X,
  Bell,
  User,
  Settings,
  LogOut,
  MapPin,
  History,
  Heart,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
  DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

const navItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "AI Detection", href: "/detection", icon: Activity },
  { name: "Donate", href: "/donate", icon: Droplet },
  { name: "Blood Banks", href: "/banks", icon: Building },
  { name: "Nearby Camps", href: "/nearby", icon: MapPin },
  { name: "Requests", href: "/requests", icon: FileText },
  { name: "Host a Camp", href: "/host", icon: Calendar },
  { name: "Admin", href: "/admin", icon: ShieldCheck },
]

export function Navigation() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [userInfo, setUserInfo] = useState({
    name: "Your Name",
    email: "your@name.com",
    bloodType: "O+",
    lastDonation: "2025-04-15",
    donationCount: 5,
    isLoggedIn: true,
  })

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-200",
        scrolled ? "bg-background/80 backdrop-blur-md border-b" : "bg-transparent",
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight">
            <div className="relative w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-cyan-400 flex items-center justify-center">
              <div className="absolute w-6 h-6 rounded-full bg-background flex items-center justify-center">
                <div className="w-4 h-4 rounded-full bg-gradient-to-r from-purple-500 to-cyan-400 animate-pulse" />
              </div>
            </div>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-cyan-400">Aurora</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            const Icon = item.icon
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary",
                  isActive ? "text-primary" : "text-muted-foreground hover:text-primary",
                )}
              >
                <Icon className="h-4 w-4" />
                {item.name}
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center">3</Badge>
                <span className="sr-only">Notifications</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="max-h-80 overflow-auto">
                <DropdownMenuItem className="flex flex-col items-start p-3 cursor-pointer">
                  <div className="font-medium">Urgent: O- Blood Needed</div>
                  <div className="text-sm text-muted-foreground">City General Hospital requires O- blood urgently.</div>
                  <div className="text-xs text-muted-foreground mt-1">10 minutes ago</div>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex flex-col items-start p-3 cursor-pointer">
                  <div className="font-medium">Donation Appointment Reminder</div>
                  <div className="text-sm text-muted-foreground">
                    Your appointment is scheduled for tomorrow at 10:00 AM.
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">2 hours ago</div>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex flex-col items-start p-3 cursor-pointer">
                  <div className="font-medium">New Blood Drive Near You</div>
                  <div className="text-sm text-muted-foreground">
                    Community Center is hosting a blood drive this weekend.
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">Yesterday</div>
                </DropdownMenuItem>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-center text-primary cursor-pointer">
                View all notifications
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <ModeToggle />

          {userInfo.isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full h-8 w-8 ml-1">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt={userInfo.name} />
                    <AvatarFallback>{userInfo.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="flex items-center justify-start gap-2 p-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt={userInfo.name} />
                    <AvatarFallback>{userInfo.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col space-y-0.5">
                    <p className="text-sm font-medium">{userInfo.name}</p>
                    <p className="text-xs text-muted-foreground">{userInfo.email}</p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <History className="mr-2 h-4 w-4" />
                    <span>Donation History</span>
                    <Badge className="ml-auto bg-primary">{userInfo.donationCount}</Badge>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Calendar className="mr-2 h-4 w-4" />
                    <span>Appointments</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                      <Heart className="mr-2 h-4 w-4" />
                      <span>Blood Type</span>
                      <Badge variant="outline" className="ml-auto">
                        {userInfo.bloodType}
                      </Badge>
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                      <DropdownMenuSubContent>
                        <div className="p-2">
                          <h4 className="mb-2 text-sm font-medium">Compatible With:</h4>
                          <div className="grid grid-cols-2 gap-1">
                            <Badge variant="outline" className="justify-center">
                              A+
                            </Badge>
                            <Badge variant="outline" className="justify-center">
                              A-
                            </Badge>
                            <Badge variant="outline" className="justify-center">
                              O+
                            </Badge>
                            <Badge variant="outline" className="justify-center">
                              O-
                            </Badge>
                          </div>
                        </div>
                      </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                  </DropdownMenuSub>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-500">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/login">Log in</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/signup">Sign up</Link>
              </Button>
            </div>
          )}

          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden border-t">
          <div className="container py-4 grid gap-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "flex items-center gap-2 p-2 text-sm font-medium rounded-md transition-colors",
                    isActive ? "bg-primary/10 text-primary" : "hover:bg-muted text-muted-foreground hover:text-primary",
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.name}
                </Link>
              )
            })}
          </div>
        </div>
      )}
    </header>
  )
}
