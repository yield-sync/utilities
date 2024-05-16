const { ethers } = require("hardhat");


import { expect } from "chai";
import { Contract, ContractFactory } from "ethers";


const stageContracts = async () => {
	const YieldSyncV1UtilityArray: ContractFactory = await ethers.getContractFactory("YieldSyncV1UtilityArray");

	const yieldSyncV1UtilityArray: Contract = await (await YieldSyncV1UtilityArray.deploy()).deployed();

	return {
		yieldSyncV1UtilityArray
	};
}


describe("YieldSyncV1UtilityArray.sol - Main", async () => {
	let yieldSyncV1UtilityArray: Contract;


	beforeEach("[beforeEach] Set up contracts..", async () => {
		const stagedContracts = await stageContracts();

		yieldSyncV1UtilityArray = stagedContracts.yieldSyncV1UtilityArray
	});


	describe("function quickSort()", async () => {
		it(
			"Should sort an unordered array..",
			async () => {
				const [ADDR_1, ADDR_2] = await ethers.getSigners();

				const ADDR_1_IN_BASE_10 = parseInt(ADDR_1.address, 16)
				const ADDR_2_IN_BASE_10 = parseInt(ADDR_2.address, 16)

				// Simple
				let result = await yieldSyncV1UtilityArray.quickSort(
					[ADDR_1.address, ADDR_1.address, ethers.constants.AddressZero]
				);

				expect(result[0]).to.be.equal(ethers.constants.AddressZero);
				expect(result[1]).to.be.equal(ADDR_1.address);
				expect(result[2]).to.be.equal(ADDR_1.address);
				
				// With multiple addresses
				let result2 = await yieldSyncV1UtilityArray.quickSort(
					[ADDR_2.address, ADDR_1.address, ethers.constants.AddressZero]
				);

				expect(result2[0]).to.be.equal(ethers.constants.AddressZero);

				if (ADDR_1_IN_BASE_10 > ADDR_2_IN_BASE_10)
				{
					expect(result2[1]).to.be.equal(ADDR_2.address);
					expect(result2[2]).to.be.equal(ADDR_1.address);
				}
				else
				{
					expect(result2[1]).to.be.equal(ADDR_1.address);
					expect(result2[2]).to.be.equal(ADDR_2.address);
				}
			}
		);
	});

	describe("function containsDuplicates()", async () => {
		it(
			"Should return true if duplicates are in array..",
			async () => {
				const [ADDR_1] = await ethers.getSigners();

				await yieldSyncV1UtilityArray.containsDuplicates([ADDR_1.address, ADDR_1.address]);

				expect(await yieldSyncV1UtilityArray.duplicateFound()).to.be.equal(true);
			}
		);

		it(
			"Should return false if duplicates NOT in array..",
			async () => {
				const [ADDR_1, ADDR_2] = await ethers.getSigners();

				await yieldSyncV1UtilityArray.containsDuplicates([ADDR_1.address, ADDR_2.address]);

				expect(await yieldSyncV1UtilityArray.duplicateFound()).to.be.equal(false);
			}
		);
	});

	describe("function removeDuplicates()", async () => {
		it(
			"Should remove duplicates from an array..",
			async () => {
				const [ADDR_1] = await ethers.getSigners();

				await yieldSyncV1UtilityArray.removeDuplicates([ADDR_1.address, ADDR_1.address]);

				let result = await yieldSyncV1UtilityArray.uniqueAddresses();				

				expect(result.length).to.be.equal(1);
				expect(result[0]).to.be.equal(ADDR_1.address);
			}
		);
	});
});
