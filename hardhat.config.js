/** @type import('hardhat/config').HardhatUserConfig */

const { network } = require('hardhat');

require("@nomiclabs/hardhat-waffle");
module.exports = {
  solidity: "0.8.28",
  network: {
    hardhat: {
      chainId: 31337
    },
  },
};
