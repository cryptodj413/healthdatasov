"use client"

import type React from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Wallet } from "lucide-react"
import { useAccount, useDisconnect } from "wagmi";
import { useAuthModal } from "../auth/AuthModal";
import { AuthModal } from "../auth/AuthModal";

export default function UserProfileCard() {
  const { isOpen, openModal, closeModal } = useAuthModal();
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  const truncateAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  return (
    <>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <Card className="border-blue-100 dark:border-blue-800">
          <CardHeader className="text-center pb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Wallet className="w-8 h-8 text-white" />
            </div>
            <CardTitle className={`text-sm font-normal mb-2 ${isConnected ? "text-slate-500" : "text-yellow-600"}`}>
              {isConnected ?
                "Connected Wallet" : "No Wallet Connected"
              }
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {address ? (
              <div className="text-center">
                <div className="bg-blue-50 dark:bg-blue-950/30 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
                  <p className="text-2xl font-mono font-bold text-blue-700 dark:text-blue-300">
                    {truncateAddress(address)}
                  </p>
                </div>

                <Button
                  onClick={() => disconnect()}
                  className="w-full bg-red-500 mt-4"
                >
                  <Wallet className="w-4 h-4 mr-2" />
                  Disconnect
                </Button>
              </div>
            ) : (
              <div className="text-center space-y-4">
                <Button
                  onClick={openModal}
                  className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
                >
                  <Wallet className="w-4 h-4 mr-2" />
                  Connect Wallet
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
      <AuthModal isOpen={isOpen} onClose={closeModal} />
    </>
  )
}
