"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Shield, Database, Coins, Users, ArrowRight, Heart, Lock, Zap } from "lucide-react"
import Link from "next/link"

function MedicalBubble({
  x,
  y,
  size,
  color,
  icon: Icon,
}: {
  x: number
  y: number
  size: number
  color: string
  icon: any
}) {
  return (
    <motion.div
      className="absolute flex items-center justify-center rounded-full backdrop-blur-sm"
      style={{
        left: x,
        top: y,
        width: size,
        height: size,
        backgroundColor: color,
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0.6, 0.3, 0.6],
        scale: [1, 1.1, 1],
        x: x + Math.random() * 50 - 25,
        y: y + Math.random() * 50 - 25,
      }}
      transition={{
        duration: 8 + Math.random() * 4,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "reverse",
      }}
    >
      <Icon className="w-4 h-4 text-white/80" />
    </motion.div>
  )
}

function FloatingMedicalBubbles() {
  const [bubbles, setBubbles] = useState<
    Array<{
      id: number
      x: number
      y: number
      size: number
      color: string
      icon: any
    }>
  >([])

  const medicalIcons = [Heart, Shield, Database, Lock, Zap]

  useEffect(() => {
    const newBubbles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * (window.innerWidth - 100),
      y: Math.random() * (window.innerHeight - 100),
      size: Math.random() * 40 + 30,
      color: `rgba(${59 + Math.random() * 50}, ${130 + Math.random() * 50}, ${246 + Math.random() * 50}, 0.15)`,
      icon: medicalIcons[Math.floor(Math.random() * medicalIcons.length)],
    }))
    setBubbles(newBubbles)
  }, [])

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {bubbles.map((bubble) => (
        <MedicalBubble key={bubble.id} {...bubble} />
      ))}
    </div>
  )
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-blue-950 dark:via-slate-900 dark:to-green-950">
      <FloatingMedicalBubbles />

      {/* Header */}
      <header className="relative z-10 border-b border-blue-100 dark:border-blue-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              HealthDataSov
            </span>
          </div>
          <Link href="/auth">
            <Button className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700">
              Get Started
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 container mx-auto px-4 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent">
              EMR Data Sovereignty
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-4">
            Realizing The <span className="text-red-500 font-semibold">People's</span> Revenue Stream
          </p>
          <p className="text-lg text-slate-500 dark:text-slate-400 mb-8">with Web3, AI & Vana Blockchain</p>
          <p className="text-lg text-slate-600 dark:text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Empowering patients to become legitimate financial stakeholders in the medical record ecosystem through
            secure EMR data ownership and voluntary participation in de-identified data-for-cryptocurrency exchange.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/auth">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 px-8 py-4 text-lg"
              >
                Start Contributing Data
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: Shield,
              title: "Data Sovereignty",
              description: "Maintain full ownership and control of your medical records with cryptographic security",
            },
            {
              icon: Database,
              title: "Secure Storage",
              description: "Your EMR data is encrypted and securely stored in your personal vault",
            },
            {
              icon: Coins,
              title: "Earn Cryptocurrency",
              description: "Get paid in VANA tokens for contributing de-identified data to AI training",
            },
            {
              icon: Users,
              title: "DAO Participation",
              description: "Join a decentralized community of patients collectively managing data value",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 + index * 0.1 }}
            >
              <Card className="h-full border-blue-100 dark:border-blue-800 hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-slate-800 dark:text-slate-200">{feature.title}</h3>
                  <p className="text-slate-600 dark:text-slate-300">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  )
}
