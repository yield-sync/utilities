// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;


import { IYieldSyncV1UtilityArray } from "./interface/IYieldSyncV1UtilityArray.sol";


contract YieldSyncV1UtilityArray is
	IYieldSyncV1UtilityArray
{
	address[] public uniqueAddresses;

	// Mapping to store the existence of addresses in uniqueAddresses
	mapping(address => bool) private _seen;


	function _quickSort(address[] memory _array, uint256 _left, uint256 _right)
		internal
		pure
	{
		uint256 i = _left;
		uint256 j = _right;

		if(i == j)
		{
			return;
		}

		address pivot = _array[uint256(_left + (_right - _left) / 2)];

		while (i <= j)
		{
			while (_array[uint256(i)] < pivot)
			{
				i++;

				if (i > _right)
				{
					break;
				}
			}

			while (pivot < _array[uint256(j)])
			{
				if (j == _left)
				{
					break;
				}

				j--;
			}

			if (i <= j)
			{
				(_array[uint256(i)], _array[uint256(j)]) = (_array[uint256(j)], _array[uint256(i)]);
				i++;

				if (i > _right)
				{
					break;
				}

				if (j == _left)
				{
					break;
				}

				j--;
			}
		}

		if (_left < j)
		{
			_quickSort(_array, _left, j);
		}

		if (i < _right)
		{
			_quickSort(_array, i, _right);
		}
	}


	function quickSort(address[] memory _array)
		public
		pure
		returns (address[] memory)
	{
		_quickSort(_array, 0, uint256(_array.length - 1));

		return _array;
	}


	// Function to remove duplicates from an array of addresses and update state
	function removeDuplicates(address[] memory array)
		public
		returns (address[] memory)
	{
		// Clear existing data
		delete uniqueAddresses;

		for (uint256 i = 0; i < array.length; i++)
		{
			if (!_seen[array[i]])
			{
				_seen[array[i]] = true;

				uniqueAddresses.push(array[i]);
			}
		}

		// Reset the seen mapping for the next call
		for (uint256 i = 0; i < uniqueAddresses.length; i++)
		{
			_seen[uniqueAddresses[i]] = false;
		}

		return uniqueAddresses;
	}
}
