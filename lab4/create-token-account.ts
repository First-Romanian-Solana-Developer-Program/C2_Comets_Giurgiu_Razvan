import "dotenv/config";
import {
  createMint,
  getOrCreateAssociatedTokenAccount,
} from "@solana/spl-token";
import {
  getKeypairFromEnvironment,
  getExplorerLink,
} from "@solana-developers/helpers";
import { Connection, clusterApiUrl, PublicKey } from "@solana/web3.js";

const DECIMALS = 6;
const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

const user = getKeypairFromEnvironment("SECRET_KEY");
console.log("✅ Loaded user account", user.publicKey.toBase58());

const tokenMint = new PublicKey("2CQvGNga35frQCZwS6HqLV1TzUkubofdN8pnHYZEexD5");
const destPubkey = new PublicKey(
  "83ic4T8K3oebTbMh4hFE91HQjRCNw5DMH4w4EWUAju5Z"
);

const destTokenAccount = await getOrCreateAssociatedTokenAccount(
  connection,
  user,
  tokenMint,
  destPubkey
);

console.log("✅ Associated token account", destTokenAccount.address.toBase58());
