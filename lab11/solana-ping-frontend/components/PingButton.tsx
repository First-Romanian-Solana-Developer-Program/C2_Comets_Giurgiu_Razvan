import { FC } from "react";
import styles from "../styles/PingButton.module.css";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { PublicKey, Transaction, TransactionInstruction } from "@solana/web3.js";

export const PingButton: FC = () => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const pingProgramId = new PublicKey("ChT1B39WKLS8qUrkLvFDXMhEJ4F1XZzwUNHUt4AU9aVa");

  const onClick = async () => {
    try {
      if (!connection || !publicKey) {
        alert("Please connect your wallet first!");
        return;
      }

      const transaction = new Transaction();
      const instruction = new TransactionInstruction({
        keys: [{ pubkey: publicKey, isSigner: true, isWritable: false }],
        programId: pingProgramId,
      });

      const latestBlockhash = await connection.getLatestBlockhash();
      transaction.add(instruction);
      transaction.recentBlockhash = latestBlockhash.blockhash;
      transaction.feePayer = publicKey;

      const signature = await sendTransaction(transaction, connection);
      await connection.confirmTransaction(signature);
      console.log(`Transaction confirmed: ${signature}`);
    } catch (error) {
      console.error("Error:", error);
      alert(`Transaction failed: ${error.message}`);
    }
  };

  return (
    <div className={styles.buttonContainer}>
      <button className={styles.button} onClick={onClick}>
        Ping!
      </button>
    </div>
  );
};
