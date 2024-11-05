import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Favorites } from "../target/types/favorites";
import { assert } from "chai";

describe("favorites", () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const user = (provider.wallet as anchor.Wallet).payer;
  const program = anchor.workspace.Favorites as Program<Favorites>;

  before(async () => {
    const balance = await provider.connection.getBalance(user.publicKey);
    const balanceInSol = balance / anchor.web3.LAMPORTS_PER_SOL;
    const formattedBalance = new Intl.NumberFormat().format(balanceInSol);
    console.log(
      `Balance of account ${user.publicKey}: ${formattedBalance} SOL`
    );
  });

  it("Save a user's favorites to chain!", async () => {
    const favoriteNumber = new anchor.BN(23);
    const favoriteColor = "blue";
    const favoriteHobbies = ["reading", "coding", "swimming"];

    const txHash = await program.methods
      .setFavorites(favoriteNumber, favoriteColor, favoriteHobbies)
      .signers([user])
      .rpc();

    console.log("txHash", txHash);

    const [favoritesPda, favoritesBump] =
      anchor.web3.PublicKey.findProgramAddressSync(
        [Buffer.from("favorites"), user.publicKey.toBuffer()],
        program.programId
      );

    const favoritesAccount = await program.account.favorites.fetch(
      favoritesPda
    );

    assert.equal(favoritesAccount.number.toString(), favoriteNumber.toString());
    assert.equal(favoritesAccount.color, favoriteColor);
    assert.deepEqual(favoritesAccount.hobbies, favoriteHobbies);
  });

  // TODO: Add test for error case
});
