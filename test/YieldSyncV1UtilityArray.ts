const { ethers } = require("hardhat");


import { expect } from "chai";
import { Contract, ContractFactory } from "ethers";


const stageContracts = async () => {
	const YieldSyncV1UtilityArray: ContractFactory = await ethers.getContractFactory("YieldSyncV1UtilityArray");

	const yieldSyncV1UtilityArray: Contract = await (await YieldSyncV1UtilityArray.deploy()).deployed();

	return {
		yieldSyncV1UtilityArray,
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
				const [ADDR_1] = await ethers.getSigners();

				let result = await yieldSyncV1UtilityArray.quickSort(
					[ADDR_1.address, ethers.constants.AddressZero]
				);

				expect(result[0]).to.be.equal(ethers.constants.AddressZero);
				expect(result[1]).to.be.equal(ADDR_1.address);
			}
		);
	});

	describe("function containsDuplicates()", async () => {
		it(
			"Should return true if duplicates are in array..",
			async () => {
				const [ADDR_1] = await ethers.getSigners();

				await yieldSyncV1UtilityArray.containsDuplicates(
					[ADDR_1.address, ADDR_1.address]
				);

				expect(await yieldSyncV1UtilityArray.duplicateFound()).to.be.equal(true);
			}
		);
	});
	
	describe("function removeDuplicates()", async () => {
		it(
			"Should remove duplicates from an array..",
			async () => {
				const [ADDR_1] = await ethers.getSigners();

				await yieldSyncV1UtilityArray.removeDuplicates(
					[ADDR_1.address, ADDR_1.address]
				);

				let result = await yieldSyncV1UtilityArray.uniqueAddresses();				

				expect(result.length).to.be.equal(1);
				expect(result[0]).to.be.equal(ADDR_1.address);
			}
		);
	});
});
