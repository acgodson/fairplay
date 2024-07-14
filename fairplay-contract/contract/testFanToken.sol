

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract TestFanToken is ERC20 {
    constructor(uint256 initialSupply) ERC20("Test FanToken", "TFanToken") {
        _mint(msg.sender, initialSupply);
    }

    function mint( uint256 amount) external {
        _mint(msg.sender, amount);
    }
}