import { Metaplex, toMetaplexFile } from "@metaplex-foundation/js";
import fs from "fs";

export async function uploadMetadata(metaplex: Metaplex, data: any) {
  const buffer = fs.readFileSync(data.imagePath);

  const file = toMetaplexFile(buffer, data.imagePath);

  const imgUri = await metaplex.storage().upload(file);
  console.log("✅ Uploaded image to", imgUri);

  const { uri } = await metaplex.nfts().uploadMetadata({
    name: data.name,
    symbol: data.symbol,
    description: "This is fine",
    image: imgUri,
  });

  console.log("✅ Uploaded metadata to", uri);
  return uri;
}
