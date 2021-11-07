const anchor = require('@project-serum/anchor');
const { SystemProgram } = anchor.web3;

describe('gif-collector', () => {
  console.log("🚀 Starting test...")

  // Configure the client to use the local cluster.
  const provider = anchor.Provider.env();
  anchor.setProvider(provider);

  it('Is initialized!', async () => {
    const program = anchor.workspace.GifCollector;
    // Create an account keypair for our program to use.
    const baseAccount = anchor.web3.Keypair.generate();

    let tx = await program.rpc.initialize({
      accounts: {
        baseAccount: baseAccount.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      },
      signers: [baseAccount],
    });

    console.log("📝 Your transaction signature", tx);

    // Fetch data from the account.
    let account = await program.account.baseAccount.fetch(baseAccount.publicKey);
    console.log('👀 GIF Count', account.totalGifs.toString())

    await program.rpc.addGif("https://media.giphy.com/media/8Ry7iAVwKBQpG/giphy.gif", {
      accounts: {
        baseAccount: baseAccount.publicKey,
      },
    });

    // Get the account again to see what changed.
    account = await program.account.baseAccount.fetch(baseAccount.publicKey);
    console.log('👀 GIF Count', account.totalGifs.toString())

    console.log('👀 GIF List', account.gifList)
  });
});
