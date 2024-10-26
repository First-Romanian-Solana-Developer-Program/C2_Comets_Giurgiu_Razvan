import "dotenv/config";
import {
  createMint,
  getOrCreateAssociatedTokenAccount,
  transfer,
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

const tokenMint = new PublicKey("GZgv7stmB9QH9zyhMZMBSABRYAqcQFVNUUwXUkmdv4DM");
const destPubkey = new PublicKey(
  "9j3uYxDQdgZxncwHrtroGPwo9qw9RhbBJpnhcbkNsafT"
);

const sourceTokenAccount = await getOrCreateAssociatedTokenAccount(
  connection,
  user,
  tokenMint,
  user.publicKey
);

const destTokenAccount = await getOrCreateAssociatedTokenAccount(
  connection,
  user,
  tokenMint,
  destPubkey
);

console.log("✅ Associated token account", destTokenAccount.address.toBase58());

const signature = await transfer(
  connection,
  user,
  sourceTokenAccount.address,
  destTokenAccount.address,
  user,
  5 * 10 ** DECIMALS
);

const link = getExplorerLink("tx", signature, "devnet");
console.log("✅ Transfer complete");
console.log("Explorer:", link);
