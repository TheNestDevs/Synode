// // SPDX-License-Identifier: MIT
// pragma solidity ^0.8.0;

// import "@thirdweb-dev/contracts/base/ERC20Base.sol";
// // import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

// contract Payment is ERC20Base {
//     struct PaymentInfo {
//         address from;
//         address to;
//         uint256 amount;
//         uint256 timestamp;
//     }

//     PaymentInfo[] private _payments;
//     mapping(address => PaymentInfo[]) private _paymentOf;

//     constructor()
//         ERC20Base(
//             _defaultAdmin,
//             _name,
//             _symbol
//         )
//     {
//         _defaultAdmin = _defaultAdmin;
//         _name = _name;
//         _symbol = _symbol;
//     }

//     // function _transfer(address payable _from, address payable _to, uint256 _amount) internal override {
//     //     require(_from != address(0), "Payment: transfer from the zero address");
//     //     require(_to != address(0), "Payment: transfer to the zero address");
//     //     require(_amount > 0, "Payment: transfer amount must be greater than zero");
//     //     require(balanceOf(_from) >= _amount, "Payment: transfer amount exceeds balance");

//     //     PaymentInfo memory pmt = PaymentInfo({
//     //         from: _from,
//     //         to: _to,
//     //         amount: _amount,
//     //         timestamp: block.timestamp
//     //     });

//     //     _paymentOf[_from].push(pmt);
//     //     _paymentOf[_to].push(pmt);
//     //     _payments.push(pmt);
//     // }

//     function sendTokens(address payable _from, address payable _to) public payable {
//         _transfer(_from, _to, msg.value);
//     }

//     function mintTokens(address payable _address) public payable {
//         _address.transfer(msg.value);
//     }

//     function getPayments(address _address) public view returns (PaymentInfo[] memory) {
//         return _paymentOf[_address];
//     }

//     function getBalance(address _address) public view returns (uint256) {
//         return balanceOf(_address);
//     }

//     function showHistory() public view returns (PaymentInfo[] memory) {
//         return _paymentOf[msg.sender];
//     }
// }
