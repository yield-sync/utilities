// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;


interface IYieldSyncV1UtilityArray
{
	function quickSort(address[] memory _array)
		external
		returns (address[] memory)
	;

	function removeDuplicates(address[] memory array)
		external
		returns (address[] memory)
	;
}
