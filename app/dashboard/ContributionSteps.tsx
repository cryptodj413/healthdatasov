import React from "react";
import {
  CheckCircle,
  Loader2,
  LockKeyhole,
  BlocksIcon,
  Server,
  Award,
  XCircle,
} from "lucide-react";

export type Step = {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  statusMessage: string;
  signingMessage?: string;
};

export type StepStatus = "pending" | "current" | "complete" | "error";

export const contributionSteps: Step[] = [
  {
    id: 1,
    title: "Encrypt & Upload Data",
    description: "Encrypting and securely storing your data",
    icon: <LockKeyhole className="h-5 w-5" />,
    statusMessage: "Uploading to Google Drive...",
    signingMessage: "Signing message...",
  },
  {
    id: 2,
    title: "Register on Blockchain",
    description: "Recording encrypted data on the VANA network",
    icon: <BlocksIcon className="h-5 w-5" />,
    statusMessage: "Adding to blockchain...",
  },
  {
    id: 3,
    title: "Request Validation",
    description: "Submitting job to validation nodes",
    icon: <Server className="h-5 w-5" />,
    statusMessage: "Requesting validation from Satya node...",
  },
  {
    id: 4,
    title: "Validate Contribution",
    description: "Running proof-of-contribution in trusted environment",
    icon: <Server className="h-5 w-5" />,
    statusMessage: "Running proof-of-contribution...",
  },
  {
    id: 5,
    title: "Receive Attestation",
    description: "Recording validation proof on-chain",
    icon: <Award className="h-5 w-5" />,
    statusMessage: "Recording proof on-chain...",
  },
];

interface ContributionStepsProps {
  currentStep: number;
  completedSteps: number[];
  hasError?: boolean;
}

export function ContributionSteps({
  currentStep,
  completedSteps,
  hasError = false,
}: ContributionStepsProps) {
  const getStepStatus = (stepId: number): StepStatus => {
    if (completedSteps.includes(stepId)) return "complete";
    if (currentStep === stepId) return hasError ? "error" : "current";
    return "pending";
  };

  const renderStatusIcon = (status: StepStatus, stepId: number) => {
    switch (status) {
      case "complete":
        return <CheckCircle className="h-4 w-4 text-white" />;
      case "current":
        return <Loader2 className="h-4 w-4 text-white animate-spin" />;
      case "error":
        return <XCircle className="h-4 w-4 text-white" />;
      case "pending":
      default:
        return <span className="text-white text-sm font-bold">{stepId}</span>;
    }
  };

  return (
    <div className="py-4 space-y-4">
      {contributionSteps.map((step, i) => {
        const status = getStepStatus(step.id);
        const isLast = i === contributionSteps.length - 1;

        const bgColor =
          status === "complete"
            ? "bg-green-50 dark:bg-green-950/20"
            : status === "current"
            ? "bg-blue-50 dark:bg-blue-950/20"
            : status === "error"
            ? "bg-red-50 dark:bg-red-950/20"
            : "bg-gray-50 dark:bg-gray-950/20";

        const circleColor =
          status === "complete"
            ? "bg-green-500"
            : status === "current"
            ? "bg-blue-500"
            : status === "error"
            ? "bg-red-500"
            : "bg-gray-300";

        return (
          <div
            key={step.id}
            className={`flex items-start p-3 rounded-lg ${bgColor}`}
          >
            <div className="flex flex-col items-center mr-4">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${circleColor}`}
              >
                {renderStatusIcon(status, step.id)}
              </div>
              {!isLast && (
                <div className="w-px flex-1 bg-gray-200 mt-1 mb-1"></div>
              )}
            </div>

            <div className="flex-1">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                {step.title}
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-300">
                {step.description}
              </p>

              {status === "current" && (
                <p className="text-xs text-blue-600 dark:text-blue-400 mt-1 flex items-center">
                  <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                  {step.statusMessage}
                </p>
              )}
              {status === "error" && (
                <p className="text-xs text-red-600 dark:text-red-400 mt-1 flex items-center">
                  <XCircle className="h-3 w-3 mr-1" />
                  Failed
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function getStepMessage(stepId: number, isSigning = false): string {
  const step = contributionSteps.find((s) => s.id === stepId);
  if (!step) return "Processing...";
  return isSigning && step.signingMessage
    ? step.signingMessage
    : step.statusMessage;
}

export function getStepById(stepId: number): Step | undefined {
  return contributionSteps.find((s) => s.id === stepId);
}
