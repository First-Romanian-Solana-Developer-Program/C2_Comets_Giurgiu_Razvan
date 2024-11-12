import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Transaction, SystemProgram, PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useState } from "react";
import { PingButton } from "./PingButton";

export function SendSolanaForm() {
  const [address, setAddress] = useState<string | null>(null);
  const [amount, setAmount] = useState<number>(0);

  const { connection } = useConnection();
  const { publicKey, signTransaction, sendTransaction } = useWallet();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!address || !amount) return;

    console.log({ address, amount });

    const tx = new Transaction();
    const blockhash = await connection.getLatestBlockhash();
    tx.recentBlockhash = blockhash.blockhash;
    tx.feePayer = publicKey;
    const instruction = SystemProgram.transfer({
      fromPubkey: publicKey,
      toPubkey: new PublicKey(address),
      lamports: amount * LAMPORTS_PER_SOL,
    });

    tx.add(instruction);

    const signedTx = await signTransaction(tx);
    const txHash = await sendTransaction(signedTx, connection);
    console.log(`Transaction sent: ${txHash}`);
  };

  const handleSetAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
  };

  const handleSetAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.valueAsNumber);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Public Key" value={address ?? ""} onChange={handleSetAddress} />
        <input type="number" placeholder="Amount" value={amount} onChange={handleSetAmount} />
        <button type="submit">Send SOL</button>
      </form>
      <PingButton />
    </div>
  );
}
