import WalletComponent from "./walletComponent";
import TransactionComponent from "@/app/transactionComponent";
import NftComponent from "@/app/nftComponent";
import TokenComponent from "@/app/tokenComponent";
import BondInviteOnlyComponent from "@/app/nftComponent";
export default function Home() {
  return (
      <main className="min-h-screen">
        <div className="flex flex-col items-center justify-center h-screen ">
          <NftComponent/>
        </div>
      </main>
  );
}
