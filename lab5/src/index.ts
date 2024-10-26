import { clusterApiUrl, Connection } from "@solana/web3.js";
import { uploadMetadata } from "./upload-metadata";
import { getKeypairFromEnvironment } from "@solana-developers/helpers";
import {
  Metaplex,
  bundlrStorage,
  keypairIdentity,
} from "@metaplex-foundation/js";
import { createNft } from "./createNft";
import "dotenv/config";

// load image
const nftData = {
  name: "This is fine 🔥",
  symbol: "FINE",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  imagePath: "./src/fine.png",
};

async function main() {
  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
  console.log("✅ Connected to cluster", "devnet");

  const keypair = getKeypairFromEnvironment("SECRET_KEY");
  console.log("✅ Loaded user account", keypair.publicKey.toBase58());

  const metaplex = Metaplex.make(connection)
    .use(keypairIdentity(keypair))
    .use(
      bundlrStorage({
        address: "https://devnet.bundlr.network",
        providerUrl: "https://api.devnet.solana.com", // Updated provider URL
        timeout: 60000,
      })
    );

  try {
    const uri = await uploadMetadata(metaplex, nftData);
    const nft = await createNft(metaplex, uri, nftData);
  } catch (err) {
    console.error("Error during NFT creation:", err);
  }
}

main()
  .then(() => console.log("✅ Done"))
  .catch((err) => console.error("Main process error:", err));
