const { ethers } = require("hardhat");

async function main() {
  // Impersonate the Pancake Swap's USDC-WETH Pair Address
  const pairAddress = "0x2E8135bE71230c6B1B4045696d41C09Db0414226";
  await ethers.provider.send("hardhat_impersonateAccount", [pairAddress]);
  const gasLimit = 51000; 

  const sender = await ethers.getSigner();
  await sender.sendTransaction({
    to: pairAddress,
    value: ethers.utils.parseEther("1") ,
    gasLimit: gasLimit
  });

  const pairSigner = await ethers.getSigner(pairAddress);
 

  const recipientAddress = "0x9682a637de158dcf31d19368cBb23188DFf6374B";
  const usdcAddress = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"; 

  const erc20Abi = [
    "function approve(address spender, uint256 value) external returns (bool)",
    "function transferFrom(address sender, address recipient, uint256 amount) external returns (bool)",
    "function balanceOf(address account) view returns (uint256)" 
  ];


  const usdcContract = new ethers.Contract(usdcAddress,erc20Abi, pairSigner);
  await usdcContract.approve(pairAddress, ethers.constants.MaxUint256);
  
   // Check and log initial USDC balance
   const initialUsdcBalance = await usdcContract.balanceOf(pairAddress);
   console.log(`Initial USDC balance: ${ethers.utils.formatUnits(initialUsdcBalance, 6)} USDC`);

  console.log("Transferring USDC...");
  await usdcContract.transferFrom(pairAddress, recipientAddress, ethers.utils.parseUnits("100000", 6)); // Transfers 1000 USDC

  console.log("Transactions completed.");
 
    // Check and log final USDC balance 
    const finalUsdcBalance = await usdcContract.balanceOf(recipientAddress);
    console.log(`Final USDC balance: ${ethers.utils.formatUnits(finalUsdcBalance, 6)} USDC`);
  
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
