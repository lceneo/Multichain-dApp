"use client";
import { getContract, Address } from "viem";
import { contractAbi } from "./abi";
import { ConnectWalletClient } from "./client";
import { useState } from "react";
export default function TestDragonXComponent() {
    const [accountAddress, setAccountAddress] = useState("");
    const setValue = (setter:any) => (evt:any) => setter(evt.target.value);
    const walletClient = ConnectWalletClient();
    async function buttonClick() {
        const contract = getContract({
            address: '0xc4bE6791b6DA4c3931614dD2cE2ab243f9a9AD2b',
            abi: contractAbi,
            client: await walletClient,
        });
        const balance = await contract.read.balanceOf([accountAddress]);
        alert(`Balance of ${accountAddress} = ${balance}`);
    }
    return (
        <div className="card">
            <label>
                Address:
                <input
                    placeholder="Account address"
                    value={accountAddress}
                    onChange={setValue(setAccountAddress)}
                ></input>

            </label>

            <button
                className="px-8 py-2 rounded-md flex flex-row items-center justify-center border border-[#1e2124] hover:border hover:border-indigo-600 shadow-md shadow-indigo-500/10"
                onClick={buttonClick}>
                <h1 className="text-center">Get account balance</h1>
            </button>
        </div>
    );
}
