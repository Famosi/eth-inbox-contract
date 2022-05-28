// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.4.17;

// Memory = Copy
// CallData = Read-Only ==> const
// Storage = Reference

/**
Functions can be:
- public
- private
- view: returns data and do not modify contract's data
- pure: do no modify or access constract's data
- payable: there is exchange of "money"
*/

// Class
contract Inbox 
{
    string public message;
  
    constructor(string initialMessage) public{
        message = initialMessage;
    }
    
    function setMessage(string newMessage) public {
        message = newMessage;
    }
} 