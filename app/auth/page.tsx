"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, CheckCircle } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { LoginButton } from "./LoginButton"

export default function SignInPage() {
  const router = useRouter()

  const handleGoogleSignIn = () => {
    // Simulate Google sign-in process
    setTimeout(() => {
      router.push("/dashboard")
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-blue-950 dark:via-slate-900 dark:to-green-950">
      {/* Header */}
      <header className="border-b border-blue-100 dark:border-blue-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              HealthDataSov
            </span>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
            HealthDataSov Liquidity Pool
          </h1>

          <p className="text-lg text-slate-600 dark:text-slate-300 mb-12 leading-relaxed">
            Sign in with your Google account to contribute your data to the VANA network. Your data will be encrypted
            and stored in your Google Drive.
          </p>

          <Card className="border-blue-100 dark:border-blue-800 shadow-xl mb-8">
            <CardHeader>
              <CardTitle className="text-xl text-center">How it works:</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3 text-left">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span>Connect your Google account</span>
              </div>
              <div className="flex items-center space-x-3 text-left">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span>Your data is encrypted client-side</span>
              </div>
              <div className="flex items-center space-x-3 text-left">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span>Encrypted data is stored in your Google Drive</span>
              </div>
              <div className="flex items-center space-x-3 text-left">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span>A pointer to your data is registered with VANA</span>
              </div>
            </CardContent>
          </Card>

          {/* <Button
            size="lg"
            className="bg-black hover:bg-gray-800 text-white px-12 py-4 text-lg"
            onClick={handleGoogleSignIn}
          >
            <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Sign in with Google
          </Button> */}
          <LoginButton />
{/* 
          <div className="mt-12 text-center">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              This app demonstrates VANA DLP integration with Google Drive
            </p>
          </div> */}
        </motion.div>
      </div>
    </div>
  )
}
