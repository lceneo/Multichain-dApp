"use client";
import { useState } from "react";
import { parseGwei } from "viem";
import { ConnectWalletClient } from "./client";
export default function TransactionComponent() {
    const [amount, setAmount] = useState("");
    const [recipient, setRecipient] = useState("");
    const setValue = (setter:any) => (evt:any) => setter(evt.target.value);
    async function handleClick() {
        try {
            const walletClient = await ConnectWalletClient();
            const addresses = await walletClient.getAddresses();
            const address = addresses[0];
            const hash = await walletClient.sendTransaction({
                account: address,
                to: recipient,
                value: parseGwei(amount), // GWei
            });
            alert(`Transaction successful. Transaction Hash: ${hash}`);
        } catch (error) {
            alert(`Transaction failed: ${error}`);
        }
    }
    return (
        <div className="card">
            <label>
                Amount:
                <input
                    placeholder="GWei"
                    value={amount}
                    onChange={setValue(setAmount)}
                ></input>
            </label>
            <br />
            <label>
                Recipient:
                <input
                    placeholder="Address"
                    value={recipient}
                    onChange={setValue(setRecipient)}
                ></input>
            </label>
            <button
                className="px-8 py-2 rounded-md flex flex-row items-center justify-center border border-[#1e2124] hover:border hover:border-indigo-600 shadow-md shadow-indigo-500/10"
                onClick={handleClick}>
                Send Transaction
            </button>
        </div>
    );
}
