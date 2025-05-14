import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Activity, Droplet, Shield, Calendar, Building, FileText } from "lucide-react"
import { FeedbackSection } from "@/components/feedback-section"

export default function Home() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      {/* Full Screen Grid Pattern */}
      <div className="fixed inset-0 bg-grid-pattern-light dark:bg-grid-pattern-dark opacity-10 pointer-events-none" />

      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 w-full bg-gradient-to-br from-purple-500/10 to-cyan-400/10 dark:from-purple-500/5 dark:to-cyan-400/5" />

        <div className="container relative z-10 flex flex-col items-center text-center">
          <div className="relative w-24 h-24 mb-8">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-cyan-400 blur-xl opacity-70 animate-pulse" />
            <div className="relative w-24 h-24 rounded-full bg-gradient-to-r from-purple-500 to-cyan-400 flex items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-background flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-cyan-400 animate-pulse" />
              </div>
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-cyan-400">Aurora</span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mb-8">
            AI-powered Early Detection & Smart Blood Donation Network
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="group">
              <Link href="/detection">
                AI Detection
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/donate">Become a Donor</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-purple-500/10 to-cyan-400/10 dark:from-purple-500/5 dark:to-cyan-400/5">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">Revolutionizing Healthcare with AI</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-background">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Activity className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Early Detection</h3>
                <p className="text-muted-foreground">
                  Advanced AI algorithms to detect early-stage blood cancer with high accuracy.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-background">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Droplet className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Blood Donation</h3>
                <p className="text-muted-foreground">
                  Seamless platform connecting donors with recipients and blood banks.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-background">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Privacy & Security</h3>
                <p className="text-muted-foreground">
                  Enterprise-grade security with role-based access and encrypted data.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-4">Our Services</h2>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">
            Aurora provides a comprehensive suite of services to support both patients and donors
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="group hover:shadow-md transition-all">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Activity className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">AI Detection</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Early detection of blood cancer using advanced AI algorithms.
                </p>
                <Link href="/detection" className="text-primary text-sm font-medium flex items-center">
                  Learn more
                  <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-md transition-all">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Building className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Blood Banks</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Find nearby blood banks with real-time availability information.
                </p>
                <Link href="/banks" className="text-primary text-sm font-medium flex items-center">
                  Learn more
                  <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-md transition-all">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Blood Requests</h3>
                <p className="text-sm text-muted-foreground mb-4">Request specific blood types for patients in need.</p>
                <Link href="/requests" className="text-primary text-sm font-medium flex items-center">
                  Learn more
                  <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-md transition-all">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Host a Camp</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Organizations can register to host blood donation camps.
                </p>
                <Link href="/host" className="text-primary text-sm font-medium flex items-center">
                  Learn more
                  <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-purple-500/10 to-cyan-400/10 dark:from-purple-500/5 dark:to-cyan-400/5">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="text-4xl font-bold mb-2">10,000+</div>
              <div className="text-muted-foreground">Registered Donors</div>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="text-4xl font-bold mb-2">5,000+</div>
              <div className="text-muted-foreground">Lives Saved</div>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-muted-foreground">Blood Banks</div>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="text-4xl font-bold mb-2">95%</div>
              <div className="text-muted-foreground">Detection Accuracy</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container">
          <div className="bg-gradient-to-r from-purple-500 to-cyan-400 rounded-xl p-8 md:p-12 flex flex-col items-center text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Ready to Make a Difference?</h2>
            <p className="text-white/90 max-w-2xl mb-8">
              Join our community of donors and help save lives. Register today to become a donor or host a blood
              donation camp.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" variant="secondary">
                <Link href="/donate">Become a Donor</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="bg-transparent text-white border-white hover:bg-white/10"
              >
                <Link href="/host">Host a Camp</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Feedback Section */}
      <FeedbackSection />

      {/* Footer */}
      <footer className="py-12 bg-muted/50 border-t">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between gap-8">
            <div className="md:w-1/3">
              <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight mb-4">
                <div className="relative w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-cyan-400 flex items-center justify-center">
                  <div className="w-4 h-4 rounded-full bg-background flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-cyan-400" />
                  </div>
                </div>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-cyan-400">
                  Aurora
                </span>
              </Link>
              <p className="text-sm text-muted-foreground mb-4">
                Aurora is a premium health-tech platform focused on AI-powered blood cancer detection and smart blood
                donation network.
              </p>
              <div className="flex gap-4">
                <Link href="#" className="text-muted-foreground hover:text-primary">
                  <span className="sr-only">Twitter</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  </svg>
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-primary">
                  <span className="sr-only">Facebook</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-primary">
                  <span className="sr-only">Instagram</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-primary">
                  <span className="sr-only">LinkedIn</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h3 className="font-medium mb-3">Services</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="/detection" className="text-sm text-muted-foreground hover:text-primary">
                      AI Detection
                    </Link>
                  </li>
                  <li>
                    <Link href="/donate" className="text-sm text-muted-foreground hover:text-primary">
                      Donate Blood
                    </Link>
                  </li>
                  <li>
                    <Link href="/banks" className="text-sm text-muted-foreground hover:text-primary">
                      Blood Banks
                    </Link>
                  </li>
                  <li>
                    <Link href="/requests" className="text-sm text-muted-foreground hover:text-primary">
                      Blood Requests
                    </Link>
                  </li>
                  <li>
                    <Link href="/host" className="text-sm text-muted-foreground hover:text-primary">
                      Host a Camp
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium mb-3">Company</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
                      Our Team
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
                      Careers
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
                      Contact Us
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium mb-3">Legal</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
                      Terms of Service
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
                      Cookie Policy
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-muted-foreground mb-4 md:mb-0">
              © 2025 Aurora Health Technologies. All rights reserved.
            </div>
            <div className="flex gap-4">
              <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
                Privacy
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
                Terms
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
