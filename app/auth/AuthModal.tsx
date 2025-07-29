"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Wallet, ChevronRight } from "lucide-react";
import { useState, useCallback } from "react";
import { useConnect, useAccount, useDisconnect } from "wagmi";

interface AuthModalCustomProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AuthModal({ isOpen, onClose }: AuthModalCustomProps) {
  const { connectors, connect, isPending, error } = useConnect();
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  const handleConnect = (connectorId: string) => {
    const connector = connectors.find((c) => c.id === connectorId);
    if (connector) {
      connect({ connector });
    }
  };

  // If connected, show connected state
  if (isConnected && address) {
    return (
      <Dialog
        open={isOpen}
        onOpenChange={(open: boolean) => !open && onClose()}
      >
        <DialogContent className="sm:max-w-md bg-white text-gray-800 border border-gray-200 shadow-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-gray-800">
              Wallet Connected
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center space-y-4 py-4">
            <div className="bg-blue-50 p-3 rounded-full">
              <Wallet className="h-6 w-6 text-blue-600" />
            </div>
            <p className="text-sm font-mono bg-gray-100 px-2 py-1 rounded text-gray-800">
              {address.slice(0, 6)}...{address.slice(-4)}
            </p>
            <Button
              variant="destructive"
              onClick={() => {
                disconnect();
                onClose();
              }}
              className="mt-4"
            >
              Disconnect
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open: boolean) => !open && onClose()}>
      <DialogContent className="sm:max-w-md bg-white text-gray-800 border border-gray-200 shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold mb-2 text-gray-800">
            Connect Wallet
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col space-y-3 py-4">
          {connectors.map((connector) => {
            return (
              <Button
                key={connector.id}
                variant="outline"
                disabled={isPending}
                onClick={() => handleConnect(connector.id)}
                className="flex justify-between items-center w-full py-6 bg-gray-50 border-gray-200 hover:bg-gray-100 hover:border-gray-300 text-gray-800"
              >
                <div className="flex items-center">
                  <div className="mr-3 w-6 h-6 flex items-center justify-center">
                    <Wallet className="h-6 w-6 text-blue-600" />
                  </div>
                  <span className="font-semibold">{connector.name}</span>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </Button>
            );
          })}
          {error && (
            <p className="text-red-500 text-sm mt-2">{error.message}</p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Export the open modal function to be used in other components
export function useAuthModal() {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  return {
    isOpen,
    openModal,
    closeModal,
  };
}
