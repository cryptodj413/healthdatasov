"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Heart, User, LogOut, CheckCircle, Coins, Trophy } from "lucide-react"
import Link from "next/link"

export default function SuccessPage() {
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
          <Button variant="outline" className="flex items-center space-x-2 bg-transparent">
            <LogOut className="w-4 h-4" />
            <span>Sign out</span>
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* User Profile Card */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Card className="border-blue-100 dark:border-blue-800">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-pink-400 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl">endless comprehension</CardTitle>
                <p className="text-sm text-slate-500">endless.comprehension@gmail.com</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Google Drive Storage</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Used:</span>
                      <span className="font-medium">10.43 MB</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Total:</span>
                      <span className="font-medium">15 GB</span>
                    </div>
                    <Progress value={0.07} className="h-2" />
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-700">
                  <h4 className="font-medium mb-3">Account Information</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Google ID:</span>
                      <span className="font-mono text-xs">109591558518707634394</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Locale:</span>
                      <span>en-US</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Success Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <Card className="border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/20">
              <CardHeader className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <Trophy className="w-10 h-10 text-white" />
                </motion.div>
                <CardTitle className="text-2xl text-green-700 dark:text-green-300">Contribution Successful!</CardTitle>
                <p className="text-green-600 dark:text-green-400">
                  Your EMR data has been successfully contributed to the VANA network
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Completed Steps */}
                <div className="space-y-3">
                  {[
                    "Encrypt & Upload Data",
                    "Register on Blockchain",
                    "Request Validation",
                    "Validate Contribution",
                    "Receive Attestation",
                  ].map((step, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                      className="flex items-center space-x-3 p-2 rounded-lg bg-green-100 dark:bg-green-900/30"
                    >
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-green-700 dark:text-green-300">{step}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Rewards Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.2 }}
                  className="bg-gradient-to-r from-blue-100 to-green-100 dark:from-blue-900/30 dark:to-green-900/30 rounded-lg p-6 text-center"
                >
                  <Coins className="w-12 h-12 text-yellow-500 mx-auto mb-3" />
                  <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-2">Rewards Earned</h3>
                  <p className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">+2.5 VANA</p>
                  <p className="text-sm text-slate-600 dark:text-slate-300">
                    Tokens will be distributed to your connected wallet within 24 hours
                  </p>
                </motion.div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/dashboard" className="flex-1">
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700">
                      Contribute More Data
                    </Button>
                  </Link>
                  <Link href="/" className="flex-1">
                    <Button variant="outline" className="w-full bg-transparent">
                      Back to Home
                    </Button>
                  </Link>
                </div>

                <div className="bg-blue-50 dark:bg-blue-950/30 rounded-lg p-4">
                  <p className="text-sm text-blue-600 dark:text-blue-300">
                    Your data contribution helps advance medical AI research while maintaining your privacy and data
                    sovereignty.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Footer */}
        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.5 }}
          className="mt-8"
        >
          <Card className="border-slate-100 dark:border-slate-800">
            <CardContent className="p-6 text-center">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                This app demonstrates VANA DLP integration with Google Drive
              </p>
            </CardContent>
          </Card>
        </motion.div> */}
      </div>
    </div>
  )
}
