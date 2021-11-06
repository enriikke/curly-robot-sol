const anchor = require('@project-serum/anchor');

describe('gif-collector', () => {
  console.log("🚀 Starting test...")

  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.Provider.env());

  it('Is initialized!', async () => {
    const program = anchor.workspace.GifCollector;
    const tx = await program.rpc.initialize();
    console.log("📝 Your transaction signature", tx);
  });
});
