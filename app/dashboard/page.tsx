"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, Database, Upload, LogOut, Loader2, AlertCircle, AlertTriangle } from "lucide-react"
import Link from "next/link"
import { signOut, useSession } from "next-auth/react";
import { useAccount } from "wagmi";
import { useAuthModal } from "../auth/AuthModal";
import { ConnectWalletButton } from "./ConnectWalletButton";
import { useContributionFlow } from "./hooks/useContributionFlow";
import { useUserData } from "../profile/hooks/useUserData";
import { ContributionSteps } from "./ContributionSteps";
import { ContributionSuccess } from "./ContributionSuccess";
import { ContributionSummary } from "./ContributionSummary"
import { DriveInfo, UserInfo } from "./types";
import UserProfileCard from "../profile/UserProfile"

export default function Dashboard() {
  const [jsonData, setJsonData] = useState<any | null>(null);
  const [stringData, setStringData] = useState<string | null>(null);

  const {
    isSuccess,
    error,
    currentStep,
    completedSteps,
    contributionData,
    shareUrl,
    isLoading,
    isSigningMessage,
    handleContributeData,
    resetFlow,
  } = useContributionFlow();

  const { data: session } = useSession();
  const { userInfo, driveInfo } = useUserData();

  // Para connection
  const { isConnected } = useAccount();
  const { isOpen, openModal, closeModal } = useAuthModal();

  const handleContribute = async () => {

    if (!session?.user) {
      return;
    }

    if (stringData == null) return;

    if (!userInfo || !driveInfo) {
      return;
    }

    // Reset the flow before starting a new contribution
    resetFlow();
    await handleContributeData(userInfo, driveInfo, isConnected, stringData);
  };

  const handleSignOut = () => {
    signOut({ callbackUrl: "/" });
  };

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
          {session && (
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-1"
              onClick={handleSignOut}
            >
              <LogOut className="h-4 w-4" />
              <span>Sign out</span>
            </Button>
          )}
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* User Profile Card */}
          <UserProfileCard />

          {/* Data Contribution Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <Card className="border-blue-100 dark:border-blue-800">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Database className="w-5 h-5 text-blue-600" />
                  <span>Contribute to Data Liquidity Pools</span>
                </CardTitle>
                <p className="text-slate-600 dark:text-slate-300">
                  Share your EMR data to earn rewards from VANA Data Liquidity Pools
                </p>
              </CardHeader>
              <CardContent className="space-y-4">


                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                {isSuccess && contributionData ? (
                  <ContributionSuccess
                    contributionData={contributionData}
                    completedSteps={completedSteps}
                    shareUrl={shareUrl}
                    userInfo={userInfo as UserInfo}
                    driveInfo={driveInfo as DriveInfo}
                  />
                ) : (
                  <div className="space-y-4">
                    {currentStep > 0 && (
                      <ContributionSteps
                        currentStep={currentStep}
                        completedSteps={completedSteps}
                        hasError={!!error}
                      />
                    )}

                    {/* Display user data summary */}
                    {/* {userInfo && (
                      <ContributionSummary
                        userInfo={userInfo as UserInfo}
                        driveInfo={driveInfo as DriveInfo}
                        isEncrypted={false}
                      />
                    )} */}

                    <div className="border-2 border-dashed border-blue-200 dark:border-blue-700 rounded-lg p-8 text-center">
                      <Upload className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                      <div className="space-y-4">

                        <input
                          type="file"
                          accept="application/json"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (!file) return;

                            const reader = new FileReader();
                            reader.onload = (event) => {
                              try {
                                const rawText = event.target?.result as string;
                                console.log("**** rawText: ", rawText);
                                const parsed = JSON.parse(rawText);
                                console.log("**** parsed: ", parsed);
                                setJsonData(parsed);
                                console.log("**** stringData: ", JSON.stringify(parsed, null, 2));
                                setStringData(JSON.stringify(parsed, null, 2))
                              } catch (err) {
                                console.error("Invalid JSON file:", err);
                                setJsonData(null);
                                setStringData(null);
                              }
                            };
                            reader.readAsText(file);
                          }}
                          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        />

                        {stringData && (
                          <div className="mt-2 max-h-48 overflow-y-auto rounded bg-gray-100 p-2 text-xs whitespace-pre-wrap border text-left">
                            <pre>{stringData}</pre>
                          </div>
                        )}

                        <Button
                          onClick={handleContribute}
                          disabled={isLoading || !isConnected || !userInfo}
                          className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
                        >
                          {isLoading ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              {currentStep === 1
                                ? "Uploading to Google Drive..."
                                : currentStep === 2
                                  ? isSigningMessage
                                    ? "Signing message..."
                                    : "Adding to blockchain..."
                                  : currentStep === 3
                                    ? "Requesting TEE proof..."
                                    : currentStep === 4
                                      ? "Processing proof..."
                                      : currentStep === 5
                                        ? "Claiming reward..."
                                        : "Processing..."}
                            </>
                          ) : (
                            <>
                              <Upload className="mr-2 h-4 w-4" />
                              Contribute Google Data
                            </>
                          )}
                        </Button>
                      </div>
                    </div>

                    {error && (
                      <div className="flex flex-col sm:flex-row gap-4">
                        <Button className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 flex-1">
                          Try again
                        </Button>
                        <Link href="/" className="flex-1">
                          <Button variant="outline" className="w-full bg-transparent">
                            Back to Home
                          </Button>
                        </Link>
                      </div>
                    )}

                    {!isConnected && (
                      <ConnectWalletButton
                        isOpen={isOpen}
                        openModal={openModal}
                        closeModal={closeModal}
                      />
                    )}

                    {!userInfo && (
                      <div className="flex items-center bg-yellow-50 text-yellow-800 border border-yellow-200 p-2 text-xs rounded mt-2">
                        <AlertTriangle className="w-4 h-4 mr-2 text-yellow-600" />
                        Sign in with Google to contribute your data
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
