const { ethers } = require('hardhat');
const wavaxAbi = require('../abi/wavax.json');
// Deploy function
async function MintWavax() {
    [account, account2] = await ethers.getSigners();

    //wavax created at 820 block
    const wavax = new ethers.Contract('0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7', wavaxAbi, account);
    const wavaxAmount = ethers.utils.parseEther('1000');
    const mint = await wavax.deposit({ value: wavaxAmount });
    await mint.wait();
    console.log('minted wavax');
    const wavaxBalance = await wavax.balanceOf(account.address);
    console.log('wavax balance', wavaxBalance.toString());

}

MintWavax()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
