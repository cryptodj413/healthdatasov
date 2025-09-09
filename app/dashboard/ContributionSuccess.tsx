"use client";

import Link from "next/link";
import { CheckCircle, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContributionSteps } from "./ContributionSteps";
import { ContributionData, DriveInfo, UserInfo } from "./types";
import { getTransactionUrl } from "../../contracts/chains";

type ContributionSuccessProps = {
  contributionData: ContributionData;
  completedSteps: number[];
  shareUrl?: string;
  userInfo: UserInfo;
  driveInfo: DriveInfo;
  onContributeMore: () => void;
};

export function ContributionSuccess({
  contributionData,
  completedSteps,
  shareUrl,
  onContributeMore,
}: ContributionSuccessProps) {
  const fullyCompleted = completedSteps.includes(5);
  const proofCompleted = completedSteps.includes(4);
  const proofRequested = completedSteps.includes(3);

  return (
    <div className="space-y-4">
      {/* Success Banner */}
      <div className="bg-green-50 p-4 rounded-md flex items-center">
        <CheckCircle className="h-6 w-6 text-green-600 mr-3" />
        <div>
          <h3 className="font-medium text-green-800">Contribution Successful!</h3>
          <p className="text-sm text-green-700">
            {fullyCompleted
              ? "Your data has been successfully contributed and your reward has been claimed."
              : proofCompleted
                ? "Your data has been successfully contributed and verified by the TEE."
                : proofRequested
                  ? "Your data has been contributed and proof request has been submitted."
                  : "Your data has been contributed to the blockchain but not fully completed."}
          </p>
        </div>
      </div>

      {/* Contribution Details */}
      <div className="space-y-3 bg-slate-50 p-4 rounded-md text-sm">
        <h3 className="font-medium">Contribution Details</h3>

        {shareUrl && (
          <div className="grid grid-cols-2 gap-2">
            <div className="text-muted-foreground">Share Link</div>
            <div className="font-mono text-xs truncate">
              <a
                href={shareUrl}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 hover:text-blue-800 break-all"
              >
                {shareUrl}
              </a>
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-2">
          <div className="text-muted-foreground">File ID</div>
          <div className="font-mono text-xs truncate">
            {contributionData.fileId || "Processing..."}
          </div>

          <div className="text-muted-foreground">Transaction Hash</div>
          <div className="font-mono text-xs truncate flex items-center">
            <span className="truncate">
              {contributionData.transactionReceipt?.hash || "Pending..."}
            </span>
            {contributionData.transactionReceipt?.hash && (
              <a
                href={getTransactionUrl(contributionData.transactionReceipt.hash)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 ml-1"
              >
                <ExternalLink className="h-3 w-3" />
              </a>
            )}
          </div>

          {proofRequested && (
            <>
              <div className="text-muted-foreground">TEE Job ID</div>
              <div className="font-mono text-xs truncate">
                {contributionData.teeJobId || "Processing..."}
              </div>
            </>
          )}

          {fullyCompleted && (
            <>
              <div className="text-muted-foreground">Reward Transaction</div>
              <div className="font-mono text-xs truncate flex items-center">
                <span className="truncate">
                  {contributionData.rewardTxHash || "Pending..."}
                </span>
                {contributionData.rewardTxHash && (
                  <a
                    href={getTransactionUrl(contributionData.rewardTxHash)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 ml-1"
                  >
                    <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Proof Results */}
      {proofCompleted && contributionData.teeProofData && (
        <div className="space-y-3 bg-slate-50 p-4 rounded-md text-sm">
          <h3 className="font-medium">TEE Proof Results</h3>
          <div className="max-h-48 overflow-y-auto bg-slate-100 p-2 rounded-md font-mono text-xs">
            <pre className="whitespace-pre-wrap">
              {JSON.stringify(contributionData.teeProofData, null, 2)}
            </pre>
          </div>
        </div>
      )}

      {/* Steps */}
      <ContributionSteps currentStep={0} completedSteps={completedSteps} />

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          {fullyCompleted ? (
            <Button
              className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
              onClick={onContributeMore}
            >
              Contribute More Data
            </Button>
          ) : (
            <Button
              variant="destructive"
              className="w-full"
              onClick={onContributeMore}
            >
              Try Again
            </Button>
          )}
        </div>

        <div className="flex-1">
          <Link href="/" className="block w-full">
            <Button variant="outline" className="w-full bg-transparent">
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
