import { Button } from "@/components/ui/button";
import { Wallet, CheckCircle2, AlertTriangle } from "lucide-react";
import { AuthModal } from "../auth/AuthModal";
import { useAccount } from "wagmi";

type ConnectWalletButtonProps = {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
};

export function ConnectWalletButton({
  isOpen,
  openModal,
  closeModal,
}: ConnectWalletButtonProps) {
  const { address, isConnected } = useAccount();

  return (
    <div className="mt-4">
      <Button
        onClick={openModal}
        variant={isConnected ? "default" : "outline"}
        className={`w-full flex items-center justify-between ${isConnected
          ? "bg-blue-600 hover:bg-blue-700 text-white"
          : "bg-white border-gray-200 text-gray-800 hover:bg-gray-50"
          }`}
      >
        <div className="flex items-center">
          <Wallet
            className={`h-4 w-4 mr-2 ${isConnected ? "text-white" : "text-blue-600"
              }`}
          />
          {isConnected
            ? `${address?.slice(0, 6)}...${address?.slice(-4)}`
            : "Connect Wallet"}
        </div>
        {!isConnected && (
          <span className="text-xs bg-blue-600 text-white px-2 py-0.5 rounded">
            Click to select
          </span>
        )}
      </Button>
      <p
        className={`flex items-center text-sm mt-3 px-3 py-2 rounded-md border
    ${isConnected
            ? "bg-green-50 text-green-700 border-green-200"
            : "bg-yellow-50 text-yellow-800 border-yellow-200"
          }`}
      >
        {isConnected ? (
          <>
            <CheckCircle2 className="w-4 h-4 mr-2 text-green-600" />
            Your wallet is connected and ready to use
          </>
        ) : (
          <>
            <AlertTriangle className="w-4 h-4 mr-2 text-yellow-600" />
            Connect your wallet to register data on the blockchain
          </>
        )}
      </p>
      <AuthModal isOpen={isOpen} onClose={closeModal} />
    </div>
  );
}
