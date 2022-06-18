// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

import "hardhat/console.sol";

library SafeMath {
    function add(uint256 x, uint256 y) internal pure returns (uint256 z) {
        require((z = x + y) >= x, "ds-math-add-overflow");
    }

    function sub(uint256 x, uint256 y) internal pure returns (uint256 z) {
        require((z = x - y) <= x, "ds-math-sub-underflow");
    }

    function mul(uint256 x, uint256 y) internal pure returns (uint256 z) {
        require(y == 0 || (z = x * y) / y == x, "ds-math-mul-overflow");
    }
}

contract BlockHash is ReentrancyGuard {
    using SafeMath for uint256;
    using Counters for Counters.Counter;
    Counters.Counter private _blogCount;

    address payable owner;

    constructor() {
        owner = payable(msg.sender);
    }

    struct Blog {
        address clapper;
        uint256 clap;
    }

    mapping(string => Blog[]) private clapperToBlog;

    event Clapped(string blogId, address clapper);

    function doClap(string memory _blogId) external nonReentrant {
        require(bytes(_blogId).length > 0, "blog id not found");
        require(msg.sender != address(0), "Sender Address not found");

        Blog memory blog = Blog({clapper: msg.sender, clap: 1});
        clapperToBlog[_blogId].push(blog);

        emit Clapped(_blogId, msg.sender);
    }

    function getClaps(string memory _blogId)
        public
        view
        returns (Blog[] memory)
    {
        return clapperToBlog[_blogId];
    }
}
