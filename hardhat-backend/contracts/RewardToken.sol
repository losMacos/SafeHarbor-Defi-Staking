// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract RewardToken is ERC20 {
    constructor() ERC20("Safe Token", "SAFE") {
        _mint(msg.sender, 1000000 * 10**18);
    }
}

// Goerli address 11-6-22: 0x49ac9Ef94b363877112d5Ebcc878dBD10012699f
// Verified contract: https://goerli.etherscan.io/address/0x49ac9Ef94b363877112d5Ebcc878dBD10012699f#code

// 2nd verified deployment:  https://goerli.etherscan.io/address/0x0e349469172a2DAeCBFC840b8E4F5368242aB048#code