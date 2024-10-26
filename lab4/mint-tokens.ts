import "dotenv/config";
import {
  createMint,
  getOrCreateAssociatedTokenAccount,
  mintTo,
} from "@solana/spl-token";
import {
  getKeypairFromEnvironment,
  getExplorerLink,
} from "@solana-developers/helpers";
import { Connection, clusterApiUrl, PublicKey } from "@solana/web3.js";

const DECIMALS = 6;
const AMOUNT = 100;
const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

const user = getKeypairFromEnvironment("SECRET_KEY");
console.log("✅ Loaded user account", user.publicKey.toBase58());

const tokenMint = new PublicKey("2CQvGNga35frQCZwS6HqLV1TzUkubofdN8pnHYZEexD5");
const destTokenAccount = new PublicKey(
  "GZgv7stmB9QH9zyhMZMBSABRYAqcQFVNUUwXUkmdv4DM"
);

const sig = await mintTo(
  connection,
  user,
  tokenMint,
  destTokenAccount,
  user,
  AMOUNT * 10 ** DECIMALS
);

const link = getExplorerLink("tx", sig, "devnet");
console.log("✅ Minted", AMOUNT, "tokens to", destTokenAccount.toBase58());
console.log("Explorer:", link);
