// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;


interface IYieldSyncV1UtilityArray
{
	function duplicateFound()
		external
		view
		returns (bool)
	;

	function uniqueAddresses()
		external
		view
		returns (address[] memory)
	;

	function quickSort(address[] memory _array)
		external
		returns (address[] memory)
	;

	function containsDuplicates(address[] memory _array)
		external
		returns (bool duplicateFound_)
	;

	function removeDuplicates(address[] memory array)
		external
		returns (address[] memory)
	;
}
