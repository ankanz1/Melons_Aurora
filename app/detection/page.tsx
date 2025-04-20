"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Upload, AlertCircle, CheckCircle2 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useToast } from "@/components/ui/use-toast"

export default function DetectionPage() {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    age: "",
    gender: "male",
    hemoglobin: "",
    wbc: "",
    platelets: "",
    rbc: "",
  })
  const [file, setFile] = useState<File | null>(null)
  const [analyzing, setAnalyzing] = useState(false)
  const [result, setResult] = useState<null | {
    riskPercentage: number
    recommendation: string
    riskLevel: "low" | "medium" | "high"
    details: {
      hemoglobinStatus: string
      wbcStatus: string
      plateletsStatus: string
      rbcStatus: string
    }
  }>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
      toast({
        title: "Image uploaded",
        description: "Blood smear image has been uploaded successfully.",
      })
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setAnalyzing(true)

    // Simulate AI analysis with a timeout
    setTimeout(() => {
      // Mock result - in a real app, this would come from an AI model
      const mockRisk = Math.floor(Math.random() * 100)
      let riskLevel: "low" | "medium" | "high" = "low"
      let recommendation = ""

      if (mockRisk < 30) {
        riskLevel = "low"
        recommendation = "No immediate action required. Continue regular check-ups every 6 months."
      } else if (mockRisk < 70) {
        riskLevel = "medium"
        recommendation = "Consult with a hematologist for further evaluation within the next 2 weeks."
      } else {
        riskLevel = "high"
        recommendation = "Urgent consultation with an oncologist is recommended within 48 hours."
      }

      setResult({
        riskPercentage: mockRisk,
        recommendation,
        riskLevel,
        details: {
          hemoglobinStatus: getRandomStatus(),
          wbcStatus: getRandomStatus(),
          plateletsStatus: getRandomStatus(),
          rbcStatus: getRandomStatus(),
        },
      })
      setAnalyzing(false)

      // Show toast notification
      toast({
        title: "Analysis Complete",
        description: "Your blood parameters have been analyzed successfully.",
      })
    }, 3000)
  }

  const getRandomStatus = () => {
    const statuses = ["Normal", "Slightly Elevated", "Elevated", "Low", "Slightly Low"]
    return statuses[Math.floor(Math.random() * statuses.length)]
  }

  const resetForm = () => {
    setFormData({
      age: "",
      gender: "male",
      hemoglobin: "",
      wbc: "",
      platelets: "",
      rbc: "",
    })
    setFile(null)
    setResult(null)
    toast({
      title: "Form Reset",
      description: "All input fields have been cleared.",
    })
  }

  return (
    <div className="container py-10">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">AI Blood Cancer Detection</h1>
          <p className="text-muted-foreground">
            Our advanced AI analyzes your blood parameters to detect early signs of blood cancer.
          </p>
        </div>

        <Tabs defaultValue="form" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="form">Input Parameters</TabsTrigger>
            <TabsTrigger value="results" disabled={!result}>
              Analysis Results
            </TabsTrigger>
          </TabsList>

          <TabsContent value="form">
            <Card>
              <CardHeader>
                <CardTitle>Blood Parameters</CardTitle>
                <CardDescription>
                  Enter your blood test results and demographic information for analysis.
                </CardDescription>
              </CardHeader>

              <CardContent>
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="age">Age</Label>
                      <Input
                        id="age"
                        name="age"
                        type="number"
                        placeholder="Enter your age"
                        value={formData.age}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Gender</Label>
                      <RadioGroup
                        name="gender"
                        value={formData.gender}
                        onValueChange={(value) => setFormData((prev) => ({ ...prev, gender: value }))}
                        className="flex gap-4"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="male" id="male" />
                          <Label htmlFor="male">Male</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="female" id="female" />
                          <Label htmlFor="female">Female</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="hemoglobin">Hemoglobin (g/dL)</Label>
                      <Input
                        id="hemoglobin"
                        name="hemoglobin"
                        type="number"
                        step="0.1"
                        placeholder="e.g., 14.5"
                        value={formData.hemoglobin}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="wbc">White Blood Cells (×10³/μL)</Label>
                      <Input
                        id="wbc"
                        name="wbc"
                        type="number"
                        step="0.1"
                        placeholder="e.g., 7.5"
                        value={formData.wbc}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="platelets">Platelets (×10³/μL)</Label>
                      <Input
                        id="platelets"
                        name="platelets"
                        type="number"
                        placeholder="e.g., 250"
                        value={formData.platelets}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="rbc">Red Blood Cells (×10⁶/μL)</Label>
                      <Input
                        id="rbc"
                        name="rbc"
                        type="number"
                        step="0.1"
                        placeholder="e.g., 5.0"
                        value={formData.rbc}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="mt-6 space-y-2">
                    <Label htmlFor="image">Upload Blood Smear Image (Optional)</Label>
                    <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center bg-muted/50">
                      <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground mb-2">Drag and drop or click to upload</p>
                      <Input id="image" type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                      <Button type="button" variant="outline" onClick={() => document.getElementById("image")?.click()}>
                        Select File
                      </Button>
                      {file && <p className="text-sm mt-2">Selected: {file.name}</p>}
                    </div>
                  </div>
                </form>
              </CardContent>

              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={resetForm}>
                  Reset
                </Button>
                <Button onClick={handleSubmit} disabled={analyzing} className="relative">
                  {analyzing ? (
                    <>
                      <span className="opacity-0">Analyze</span>
                      <span className="absolute inset-0 flex items-center justify-center">
                        <div className="h-4 w-4 rounded-full border-2 border-current border-r-transparent animate-spin" />
                      </span>
                    </>
                  ) : (
                    "Analyze"
                  )}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="results">
            {result && (
              <Card>
                <CardHeader>
                  <CardTitle>Analysis Results</CardTitle>
                  <CardDescription>AI-powered assessment based on your blood parameters</CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label>Risk Assessment</Label>
                      <span className="text-sm font-medium">{result.riskPercentage}%</span>
                    </div>
                    <Progress
                      value={result.riskPercentage}
                      className={
                        result.riskLevel === "low"
                          ? "bg-green-100 dark:bg-green-950"
                          : result.riskLevel === "medium"
                            ? "bg-amber-100 dark:bg-amber-950"
                            : "bg-red-100 dark:bg-red-950"
                      }
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Low Risk</span>
                      <span>Medium Risk</span>
                      <span>High Risk</span>
                    </div>
                  </div>

                  <Alert
                    className={
                      result.riskLevel === "low"
                        ? "border-green-500 bg-green-500/10"
                        : result.riskLevel === "medium"
                          ? "border-amber-500 bg-amber-500/10"
                          : "border-red-500 bg-red-500/10"
                    }
                  >
                    <div className="flex items-start gap-3">
                      {result.riskLevel === "low" ? (
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                      ) : (
                        <AlertCircle
                          className={result.riskLevel === "medium" ? "h-5 w-5 text-amber-500" : "h-5 w-5 text-red-500"}
                        />
                      )}
                      <div>
                        <AlertTitle
                          className={
                            result.riskLevel === "low"
                              ? "text-green-500"
                              : result.riskLevel === "medium"
                                ? "text-amber-500"
                                : "text-red-500"
                          }
                        >
                          {result.riskLevel === "low"
                            ? "Low Risk Detected"
                            : result.riskLevel === "medium"
                              ? "Medium Risk Detected"
                              : "High Risk Detected"}
                        </AlertTitle>
                        <AlertDescription>{result.recommendation}</AlertDescription>
                      </div>
                    </div>
                  </Alert>

                  <div className="space-y-2">
                    <Label>Parameter Analysis</Label>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Hemoglobin</p>
                        <p className="text-sm text-muted-foreground">{formData.hemoglobin} g/dL</p>
                        <p className="text-xs text-muted-foreground">Status: {result.details.hemoglobinStatus}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium">White Blood Cells</p>
                        <p className="text-sm text-muted-foreground">{formData.wbc} ×10³/μL</p>
                        <p className="text-xs text-muted-foreground">Status: {result.details.wbcStatus}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Platelets</p>
                        <p className="text-sm text-muted-foreground">{formData.platelets} ×10³/μL</p>
                        <p className="text-xs text-muted-foreground">Status: {result.details.plateletsStatus}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Red Blood Cells</p>
                        <p className="text-sm text-muted-foreground">{formData.rbc} ×10⁶/μL</p>
                        <p className="text-xs text-muted-foreground">Status: {result.details.rbcStatus}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Next Steps</Label>
                    <div className="bg-muted p-4 rounded-lg">
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                          <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-xs">1</span>
                          </div>
                          <span>
                            {result.riskLevel === "low"
                              ? "Continue with regular health check-ups"
                              : result.riskLevel === "medium"
                                ? "Schedule an appointment with a hematologist"
                                : "Contact an oncologist immediately"}
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-xs">2</span>
                          </div>
                          <span>
                            {result.riskLevel === "low"
                              ? "Maintain a healthy lifestyle with proper diet and exercise"
                              : result.riskLevel === "medium"
                                ? "Prepare for additional blood tests and possibly a bone marrow biopsy"
                                : "Prepare for comprehensive diagnostic tests including bone marrow biopsy"}
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-xs">3</span>
                          </div>
                          <span>
                            {result.riskLevel === "low"
                              ? "Repeat blood tests in 6 months"
                              : result.riskLevel === "medium"
                                ? "Follow up with your doctor in 2 weeks with new test results"
                                : "Begin treatment planning with your oncology team"}
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={() => document.querySelector('[data-value="form"]')?.click()}>
                    Back to Form
                  </Button>
                  <Button>Download Report</Button>
                </CardFooter>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
