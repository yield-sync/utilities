const { ethers } = require("hardhat");


import { expect } from "chai";
import { Contract, ContractFactory } from "ethers";


describe("[0.0] YieldSyncV1EMPRegistry.sol - Setup", async () => {
	let yieldSyncGovernance: Contract;
	let yieldSyncV1EMPRegistry: Contract;


	beforeEach("[beforeEach] Set up contracts..", async () => {
		const [OWNER, MANAGER, TREASURY] = await ethers.getSigners();
	});

	describe("function yieldSyncV1EMPDeployerUpdate()", async () => {
		it(
			"[auth] Should revert when unauthorized msg.sender calls..",
			async () => {
				
			}
		);
	});
});
