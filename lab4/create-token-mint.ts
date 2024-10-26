import "dotenv/config";
import { createMint } from "@solana/spl-token";
import { getKeypairFromEnvironment } from "@solana-developers/helpers";
import { Connection, clusterApiUrl, PublicKey } from "@solana/web3.js";

const DECIMALS = 6;
const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

const user = getKeypairFromEnvironment("SECRET_KEY");
console.log("✅ Loaded user account", user.publicKey.toBase58());

const tokentMint = await createMint(
  connection,
  user,
  user.publicKey,
  null,
  DECIMALS
);

console.log("✅ Mint created", tokentMint.toBase58());
