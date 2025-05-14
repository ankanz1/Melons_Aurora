"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

export function FeedbackSection() {
  const { toast } = useToast()
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [feedback, setFeedback] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (rating === 0) {
      toast({
        title: "Rating Required",
        description: "Please select a rating before submitting feedback.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)
    try {
      // TODO: Add actual feedback submission logic here
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API call
      toast({
        title: "Thank You!",
        description: "Your feedback has been submitted successfully.",
      })
      setRating(0)
      setFeedback("")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit feedback. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Share Your Experience
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Help us improve by sharing your thoughts and suggestions
            </p>
          </div>
        </div>
        <div className="mx-auto max-w-3xl mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Your Feedback</CardTitle>
              <CardDescription>
                Tell us what you think about our service
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Rating</label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="focus:outline-none"
                      >
                        <Star
                          className={cn(
                            "h-8 w-8 transition-colors",
                            (hoverRating || rating) >= star
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-muted-foreground"
                          )}
                        />
                      </button>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="feedback" className="text-sm font-medium">
                    Your Feedback
                  </label>
                  <Textarea
                    id="feedback"
                    placeholder="Share your thoughts, suggestions, or concerns..."
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    className="min-h-[100px]"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit Feedback"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
} 