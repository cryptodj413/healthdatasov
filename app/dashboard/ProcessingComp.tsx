"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { CheckCircle, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"

type ProcessStep = {
  id: number
  title: string
  description: string
  status: "pending" | "processing" | "completed"
}

export default function ProcessingComp() {
  const [steps, setSteps] = useState<ProcessStep[]>([
    {
      id: 1,
      title: "Encrypt & Upload Data",
      description: "Encrypting and securely storing your data",
      status: "completed",
    },
    {
      id: 2,
      title: "Register on Blockchain",
      description: "Recording encrypted data on the VANA network",
      status: "processing",
    },
    {
      id: 3,
      title: "Request Validation",
      description: "Submitting job to validation nodes",
      status: "pending",
    },
    {
      id: 4,
      title: "Validate Contribution",
      description: "Running proof-of-contribution in trusted environment",
      status: "pending",
    },
    {
      id: 5,
      title: "Receive Attestation",
      description: "Recording validation proof on-chain",
      status: "pending",
    },
  ])

  const router = useRouter()

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < 5) {
          const newStep = prev + 1
          setSteps((prevSteps) =>
            prevSteps.map((step) => ({
              ...step,
              status: step.id < newStep ? "completed" : step.id === newStep ? "processing" : "pending",
            })),
          )
          return newStep
        } else {
          // All steps completed, redirect to success page
          setTimeout(() => {
            router.push("/success")
          }, 2000)
          return prev
        }
      })
    }, 3000)

    return () => clearInterval(timer)
  }, [router])

  return (        
    <div className="space-y-4">
      {steps.map((step) => (
        <motion.div
          key={step.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: step.id * 0.1 }}
          className={`flex items-center space-x-4 p-3 rounded-lg ${
            step.status === "completed"
              ? "bg-green-50 dark:bg-green-950/20"
              : step.status === "processing"
                ? "bg-blue-50 dark:bg-blue-950/20"
                : "bg-gray-50 dark:bg-gray-950/20"
          }`}
        >
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step.status === "completed"
                ? "bg-green-500"
                : step.status === "processing"
                  ? "bg-blue-500"
                  : "bg-gray-300"
            }`}
          >
            {step.status === "completed" ? (
              <CheckCircle className="w-5 h-5 text-white" />
            ) : step.status === "processing" ? (
              <Loader2 className="w-5 h-5 text-white animate-spin" />
            ) : (
              <span className="text-white text-sm font-bold">{step.id}</span>
            )}
          </div>
          <div className="flex-1">
            <h3 className="font-medium">{step.title}</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300">{step.description}</p>
            {step.status === "processing" && step.id === 2 && (
              <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">
                <Loader2 className="w-3 h-3 inline mr-1 animate-spin" />
                Adding to blockchain...
              </p>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  )
}