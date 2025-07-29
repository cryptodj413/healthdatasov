"use client"

import type React from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { User } from "lucide-react"
import { useUserData } from "./hooks/useUserData"


export default function UserProfileCard() {
  const { userInfo, driveInfo } = useUserData();

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
      <Card className="border-blue-100 dark:border-blue-800">
        <CardHeader className="text-center pb-4">
          <div className="w-16 h-16 bg-gradient-to-r from-pink-400 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-xl">{userInfo?.name}</CardTitle>
          <p className="text-sm text-slate-500">{userInfo?.email}</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Google Drive Storage</span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Used:</span>
                <span className="font-medium">{driveInfo?.usedStorageBytes}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Total:</span>
                <span className="font-medium">{driveInfo?.totalStorageBytes}</span>
              </div>
              <Progress value={driveInfo?.percentUsed} className="h-2" />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-700">
            <h4 className="font-medium mb-3">Account Information</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Google ID:</span>
                <span className="font-mono text-xs">{userInfo?.id}</span>
              </div>
              <div className="flex justify-between">
                <span>Locale:</span>
                <span>{userInfo?.locale}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
