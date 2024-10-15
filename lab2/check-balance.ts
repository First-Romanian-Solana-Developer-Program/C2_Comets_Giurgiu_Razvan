import 'dotenv/config';

import { airdropIfRequired } from '@solana-developers/helpers';
import { clusterApiUrl, Connection, LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js';

const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');

console.log("Connected to devnet");

const pubkey = new PublicKey('83ic4T8K3oebTbMh4hFE91HQjRCNw5DMH4w4EWUAju5Z');
const balanceInLamports = await connection.getBalance(pubkey);

console.log("Balance in lamports: ", balanceInLamports, "for pubkey: ", pubkey.toBase58());

console.log("Starting airdrop...");
await airdropIfRequired(connection, pubkey, 1 * LAMPORTS_PER_SOL, 0.5 * LAMPORTS_PER_SOL);
console.log("Airdrop done");

const newBalanceInLamports = await connection.getBalance(pubkey);
console.log("New balance in lamports: ", newBalanceInLamports);

console.log("✅ Done");