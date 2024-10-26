import { Metaplex } from "@metaplex-foundation/js";

export async function createNft(metaplex: Metaplex, uri: string, nftData: any) {
  const nft = await metaplex.nfts().create(
    {
      uri,
      name: nftData.name,
      symbol: nftData.symbol,
      sellerFeeBasisPoints: 500,
    },
    { commitment: "finalized" }
  );

  console.log(
    `✅ Created NFT: https://explorer.solana.com/address/${nft.nft.address.toBase58()}?cluster=devnet`
  );

  return nft;
}
