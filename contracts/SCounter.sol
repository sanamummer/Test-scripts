// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SCounter {
    uint256 public count;
    address payable owner;

    constructor() {
        owner = payable(msg.sender);
    }

    function incrementCounter() public {
        count += 1;
    }

    // Function to receive Ether
    receive() external payable {}

    // Function to check the contract's balance
    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

    // Self-destruct function to send Ether to the contract owner
    function kill() public {
        require(msg.sender == owner, "Only the owner can call this function.");
        selfdestruct(owner);
    }
}
