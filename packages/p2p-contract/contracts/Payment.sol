// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@thirdweb-dev/contracts/base/ERC20Base.sol";

contract Payment is ERC20Base {
    struct TransactionInfo {
        address sender;
        address reciever;
        uint256 amount;
        uint256 timestamp;
    }

    mapping (uint256=>TransactionInfo) private _payment;

    constructor(
        address _defaultAdmin,
        string memory _name,
        string memory _symbol
    )
        ERC20Base(
            _defaultAdmin,
            _name,
            _symbol
        )
    {
        _defaultAdmin = _defaultAdmin;
        _name = _name;
        _symbol = _symbol;
    }

    // function sendTokens(address payable _from, address payable _to) public payable {
    //     _transfer(_from, _to, msg.value);
    // }
    function storeTransaction(address from, address to, uint256 amount, uint256 timestamp) internal {
        _payment[timestamp] = TransactionInfo(from, to, amount, timestamp);
    }

    function mintTokens(address payable _address) public payable {
        _address.transfer(msg.value);
        storeTransaction(msg.sender, _address, msg.value, block.timestamp);
        emit Transfer(msg.sender, _address, msg.value);
    }

    function getTransaction(uint256 snowflake) public view returns (TransactionInfo memory) {
        return _payment[snowflake];
    }
}
