// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract RewardToken is ERC20 {
    constructor() ERC20("Safe Token", "SAFE") {
        _mint(msg.sender, 1000000 * 10**18);
    }
}

// Verified contract: https://goerli.etherscan.io/address/0x6f539e5b5a6677fe5bda2f3c71e5c057544ce5f4#code