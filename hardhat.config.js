/**
 * @type import('hardhat/config').HardhatUserConfig
 */

require('@nomiclabs/hardhat-ethers');
require('@nomicfoundation/hardhat-verify');


module.exports = {
  solidity: "0.8.4",
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      // chainId: 1,
      forking: {
        url: "https://bsc-mainnet.infura.io/v3/2KlwTlHCZLxd6M52cJV2ICy1R70"
      //   //hardhat node
      //   //anvil
          
      },
      buildbear: {
        url:"https://rpc.buildbear.io/sanam",
        account:["148333348a161dda4fdfff100827edb32758b07dbef2d732ccb1fc06c8fbb469"]
      },
      infura: {
        url: "https://mainnet.infura.io/v3/879c5343f56a412a8c27c071023a8440"
         //"https://mainnet.infura.io/v3/999f7b04821a4e28acbe1c5ddcf43baf"
      },
     
    },
  
  }

  
}