"use client";

import { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertCircle, Loader2, Upload } from "lucide-react";
import { useSession } from "next-auth/react";
import { useAccount } from "wagmi";
import { useAuthModal } from "../auth/AuthModal";
import { useUserData } from "../profile/hooks/useUserData";
import { ConnectWalletButton } from "./ConnectWalletButton";
import { ContributionSteps } from "./ContributionSteps";
import { ContributionSuccess } from "./ContributionSuccess";
import { ContributionSummary } from "./ContributionSummary";
import { useContributionFlow } from "../dashboard/hooks/useContributionFlow";
import { DriveInfo, UserInfo } from "./types";

/**
 * VanaDlpIntegration component for users to contribute data to VANA's Data Liquidity Pools
 */
export function VanaDlpIntegration() {
  const { data: session } = useSession();
  const { userInfo, driveInfo } = useUserData();

  const [jsonData, setJsonData] = useState<any | null>(null);
  const [stringData, setStringData] = useState<string | null>(null);

  // Para connection
  const { isConnected } = useAccount();
  const { isOpen, openModal, closeModal } = useAuthModal();

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

  const handleContribute = async () => {
    if (!session?.user) {
      return;
    }

    if(stringData ==  null) return;

    if (!userInfo || !driveInfo) {
      return;
    }

    // Reset the flow before starting a new contribution
    resetFlow();

    await handleContributeData(userInfo, driveInfo, isConnected, stringData);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Contribute to Data Liquidity Pools</CardTitle>
        <CardDescription>
          Share your EMR data to earn rewards from VANA Data
          Liquidity Pools
        </CardDescription>
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

            <div className="space-y-2">
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
                      const parsed = JSON.parse(rawText);
                      setJsonData(parsed);
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
                <div className="mt-2 max-h-48 overflow-y-auto rounded bg-gray-100 p-2 text-xs whitespace-pre-wrap border">
                  <pre>{stringData}</pre>
                </div>
              )}
            </div>

            <Button
              onClick={handleContribute}
              disabled={isLoading || !isConnected || !userInfo}
              className="w-full"
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

            {!isConnected && (
              <ConnectWalletButton
                isOpen={isOpen}
                openModal={openModal}
                closeModal={closeModal}
              />
            )}

            {!userInfo && (
              <div className="bg-yellow-50 text-yellow-800 p-2 text-xs rounded mt-2">
                Sign in with Google to contribute your data
              </div>
            )}
          </div>
        )}
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground">
        Your data is encrypted and securely stored in your Google Drive. You
        maintain control over who can access it.
      </CardFooter>
    </Card>
  );
}
