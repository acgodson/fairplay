// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/cryptography/MessageHashUtils.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

contract FairPlay is Ownable(msg.sender) {
    using ECDSA for bytes32;

    struct Campaign {
        uint256 id;
        bytes32 cid;
        address merchant;
        address rewardToken;
        bool isNFT;
        uint256 endTime;
        uint256 value;
        bool isActive;
    }

    uint256 public campaignCounter;
    mapping(uint256 => Campaign) public campaigns; // Campaigns by campaign ID
    mapping(bytes32 => uint256[]) public campaignIdsByShop; // Campaign IDs by shop hash
    mapping(bytes32 => bool) public nullifiers; // Nullifiers for reward claiming
    mapping(uint256 => mapping(bytes32 => bool)) public beneficiaries; // Beneficiaries for each campaignID

    event CampaignCreated(
        uint256 campaignId,
        address merchant,
        address rewardToken,
        bool isNFT,
        uint256 endTime
    );
    event CampaignClosed(
        uint256 campaignId,
        address merchant,
        address rewardToken,
        bool isNFT,
        uint256 endTime
    );
    event RewardClaimed(uint256 campaignId, bytes32 customerHash);

    function startCampaign(
        bytes32 shop,
        bytes32 cid,
        address rewardToken,
        bool isNFT,
        uint256 value,
        uint256 duration
    ) external onlyOwner {
        uint256 campaignId = ++campaignCounter;
        campaigns[campaignId] = Campaign({
            id: campaignId,
            cid: cid,
            merchant: msg.sender,
            rewardToken: rewardToken,
            isNFT: isNFT,
            endTime: block.timestamp + duration,
            value: value,
            isActive: true
        });
        campaignIdsByShop[shop].push(campaignId);
        emit CampaignCreated(
            campaignId,
            msg.sender,
            rewardToken,
            isNFT,
            block.timestamp + duration
        );
    }

    function closeCampaign(
        uint256 campaignId,
        bytes32[] calldata customerHashes
    ) external onlyOwner {
        require(campaigns[campaignId].isActive, "Campaign is not active");
        campaigns[campaignId].isActive = false;

        for (uint256 i = 0; i < customerHashes.length; i++) {
            beneficiaries[campaignId][customerHashes[i]] = true;
        }

        // Calculate the total amount needed
        uint256 totalAmount = campaigns[campaignId].value *
            customerHashes.length;

        // Transfer the required amount of tokens to the contract
        if (!campaigns[campaignId].isNFT) {
            IERC20(campaigns[campaignId].rewardToken).transferFrom(
                campaigns[campaignId].merchant,
                address(this),
                totalAmount
            );
        } else {
            uint256 totalAmount = campaigns[campaignId].value *
                customerHashes.length;
            IERC20(campaigns[campaignId].rewardToken).transferFrom(
                campaigns[campaignId].merchant,
                address(this),
                totalAmount
            );
        }

        emit CampaignClosed(
            campaignId,
            campaigns[campaignId].merchant,
            campaigns[campaignId].rewardToken,
            campaigns[campaignId].isNFT,
            campaigns[campaignId].endTime
        );
    }

    function claimReward(
        bytes32 nullifier,
        uint256 campaignId,
        bytes memory signature
    ) external {
        require(
            beneficiaries[campaignId][nullifier],
            "Customer not eligible for reward"
        );
        require(!campaigns[campaignId].isActive, "Campaign is still active");

        bytes32 messageHash = keccak256(
            abi.encodePacked(campaignId, nullifier)
        );

        bytes32 msgHash = MessageHashUtils.toEthSignedMessageHash(messageHash);
        address recovered = ECDSA.recover(msgHash, signature);
        require(
            recovered == campaigns[campaignId].merchant,
            "Invalid signature"
        );
        beneficiaries[campaignId][nullifier] = false;

        //TODO handle Token transfer
        if (campaigns[campaignId].isNFT) {
            IERC721(campaigns[campaignId].rewardToken).safeTransferFrom(
                address(this),
                msg.sender,
                campaignId
            );
        } else {
            IERC20(campaigns[campaignId].rewardToken).transfer(
                msg.sender,
                campaigns[campaignId].value
            ); // Assuming 1 token as reward which is fixed for this demo
        }

        emit RewardClaimed(campaignId, nullifier);
    }
}
