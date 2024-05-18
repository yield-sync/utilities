const { ethers } = require("hardhat");


import { expect } from "chai";
import { Contract, ContractFactory } from "ethers";


const stageContracts = async () => {
	const YieldSyncUtilityV1Array: ContractFactory = await ethers.getContractFactory("YieldSyncUtilityV1Array");

	const yieldSyncUtilityV1Array: Contract = await (await YieldSyncUtilityV1Array.deploy()).deployed();

	return {
		yieldSyncUtilityV1Array
	};
}


describe("YieldSyncUtilityV1Array.sol - Main", async () => {
	let yieldSyncUtilityV1Array: Contract;


	beforeEach("[beforeEach] Set up contracts..", async () => {
		const stagedContracts = await stageContracts();

		yieldSyncUtilityV1Array = stagedContracts.yieldSyncUtilityV1Array
	});


	describe("function sort()", async () => {
		it(
			"Should sort an unordered array..",
			async () => {
				const [ADDR_1, ADDR_2] = await ethers.getSigners();

				const ADDR_1_IN_BASE_10 = parseInt(ADDR_1.address, 16)
				const ADDR_2_IN_BASE_10 = parseInt(ADDR_2.address, 16)

				// Simple
				let result = await yieldSyncUtilityV1Array.sort(
					[ADDR_1.address, ADDR_1.address, ethers.constants.AddressZero]
				);

				expect(result[0]).to.be.equal(ethers.constants.AddressZero);
				expect(result[1]).to.be.equal(ADDR_1.address);
				expect(result[2]).to.be.equal(ADDR_1.address);
				
				// With multiple addresses
				let result2 = await yieldSyncUtilityV1Array.sort(
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

				await yieldSyncUtilityV1Array.containsDuplicates([ADDR_1.address, ADDR_1.address]);

				expect(await yieldSyncUtilityV1Array.duplicateFound()).to.be.equal(true);
			}
		);

		it(
			"Should return false if duplicates NOT in array..",
			async () => {
				const [ADDR_1, ADDR_2] = await ethers.getSigners();

				await yieldSyncUtilityV1Array.containsDuplicates([ADDR_1.address, ADDR_2.address]);

				expect(await yieldSyncUtilityV1Array.duplicateFound()).to.be.equal(false);
			}
		);

		it(
			"Should clear seen mapping after utilzing..",
			async () => {
				const [ADDR_1, ADDR_2] = await ethers.getSigners();

				await yieldSyncUtilityV1Array.containsDuplicates([ADDR_1.address, ADDR_2.address]);

				expect(await yieldSyncUtilityV1Array.duplicateFound()).to.be.equal(false);
				
				expect(await yieldSyncUtilityV1Array.seen(ADDR_1.address)).to.be.equal(false);
				
				expect(await yieldSyncUtilityV1Array.seen(ADDR_2.address)).to.be.equal(false);
			}
		);

	});

	describe("function removeDuplicates()", async () => {
		it(
			"Should remove duplicates from an array..",
			async () => {
				const [ADDR_1] = await ethers.getSigners();

				await yieldSyncUtilityV1Array.removeDuplicates([ADDR_1.address, ADDR_1.address]);

				let result = await yieldSyncUtilityV1Array.uniqueAddresses();				

				expect(result.length).to.be.equal(1);
				expect(result[0]).to.be.equal(ADDR_1.address);
			}
		);
	});
});
