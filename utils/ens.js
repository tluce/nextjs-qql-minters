import { ethers } from "ethers";

// gets an ENS name from an address
export async function lookupAddress(address) {
    const provider = new ethers.providers.JsonRpcProvider(process.env.NEXT_PUBLIC_MAINNET_RPC_URL);
    return provider.lookupAddress(address);
}
