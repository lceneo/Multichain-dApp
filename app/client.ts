import { createWalletClient, createPublicClient, custom, http } from "viem";
import { sepolia } from "viem/chains";
import "viem/window";
export function ConnectPublicClient() {
    let transport;
    if (window.ethereum) {
        transport = custom(window.ethereum);
    } else {
        transport = http();
    }
    const publicClient = createPublicClient({
        chain: sepolia,
        transport: transport,
    });
    return publicClient;
}
export async function ConnectWalletClient() {
    let transport;
    if (window.ethereum) {
// EIP-1193 Ethereum Provider JavaScript API
        transport = custom(window.ethereum);
// or transport = http("https://eth.web3gate.ru:32443/e6c02775...")
    } else {
        const errorMessage ="Web3 wallet is not installed. Please install one to proceed.";
        throw new Error(errorMessage);
    }
    await window.ethereum.enable();
    const walletClient = createWalletClient({
        chain: sepolia,
        transport: transport,
    });
    return walletClient;
}
