"use client";
import { getContract, Address } from "viem";
import { contractAbi } from "./abi";
import { ConnectWalletClient } from "./client";
import { useState } from "react";
export default function TokenComponent() {
    const [contractAddress, setContractAddress] = useState("");
    const [tokenId, setTokenId] = useState();
    const setValue = (setter:any) => (evt:any) => setter(evt.target.value);
    const walletClient = ConnectWalletClient();
    async function buttonClick() {
        const checkedAddress = contractAddress as Address;
        const contract = getContract({
            address: checkedAddress,
            abi: contractAbi,
            client: await walletClient,
        });
        console.log("Connected to Contract: ", contract);
        const name = await contract.read.name();
        const symbol = await contract.read.symbol();
        console.log(`Symbol: ${symbol}\nName: ${name}\n`);
        const token_id = BigInt(tokenId);
        const owner = await contract.read.ownerOf([token_id]);
        alert(`Symbol: ${symbol}\nName: ${name}\nOwner of token_id = ${token_id} is ${owner}`);
    }
    return (
        <div className="card">
            <label>
                Address:
                <input
                    placeholder="Smart Contract Instance"
                    value={contractAddress}
                    onChange={setValue(setContractAddress)}
                ></input>

            </label>
            <br />
            <label>Token Id:
                <input placeholder="1" value={tokenId} onChange={setValue(setTokenId)} />
            </label>
            <button
                className="px-8 py-2 rounded-md flex flex-row items-center justify-center border border-[#1e2124] hover:border hover:border-indigo-600 shadow-md shadow-indigo-500/10"
                onClick={ buttonClick }>
                <h1 className="text-center">Token Info</h1>
            </button>
        </div>
    );
}
