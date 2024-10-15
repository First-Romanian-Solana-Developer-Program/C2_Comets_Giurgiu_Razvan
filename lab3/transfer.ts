import "dotenv/config";

import { getKeypairFromEnvironment } from '@solana-developers/helpers';
import { Connection, LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction, clusterApiUrl, sendAndConfirmTransaction } from "@solana/web3.js";
import { createMemoInstruction } from "@solana/spl-memo";

const sender = getKeypairFromEnvironment("SECRET_KEY");
const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

console.log("Sender public key:", sender.publicKey.toString());

const receiver = new PublicKey("83ic4T8K3oebTbMh4hFE91HQjRCNw5DMH4w4EWUAju5Z");

const transaction = new Transaction();
const amount = 0.001;

const transferInstruction = SystemProgram.transfer({
    fromPubkey: sender.publicKey,
    toPubkey: receiver,
    lamports: amount * LAMPORTS_PER_SOL,
});

transaction.add(transferInstruction);

const createMemo = createMemoInstruction("Hello, Solana!");
transaction.add(createMemo);

const signature = await sendAndConfirmTransaction(connection, transaction, [sender]);
console.log("Transaction sent with signature:", signature);

console.log("✅ Done");