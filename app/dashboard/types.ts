export type UserInfo = {
  id?: string;
  name: string;
  email: string;
  locale?: string;
};

export type ContributionData = {
  contributionId: string;
  encryptedUrl: string;
  transactionReceipt: {
    hash: string;
    blockNumber?: number;
  };
  fileId?: number;
  teeProofData?: Record<string, unknown>;
  teeJobId?: number;
  rewardTxHash?: string;
};

export type DriveInfo = {
  percentUsed: number;
};
