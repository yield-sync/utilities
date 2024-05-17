// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;


import { IYieldSyncV1UtilityArray } from "./interface/IYieldSyncV1UtilityArray.sol";


contract YieldSyncV1UtilityArray is
	IYieldSyncV1UtilityArray
{
	address[] internal _uniqueAddresses;

	/// @inheritdoc IYieldSyncV1UtilityArray
	bool public override duplicateFound;

	mapping(address => bool) internal _seen;


	constructor ()
	{
		duplicateFound = false;
	}


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


	/// @inheritdoc IYieldSyncV1UtilityArray
	function sort(address[] memory _array)
		public
		pure
		override
		returns (address[] memory)
	{
		_quickSort(_array, 0, uint256(_array.length - 1));

		return _array;
	}


	/// @inheritdoc IYieldSyncV1UtilityArray
	function uniqueAddresses()
		public
		view
		override
		returns (address[] memory)
	{
		return _uniqueAddresses;
	}


	/// @inheritdoc IYieldSyncV1UtilityArray
	function containsDuplicates(address[] memory _array)
		public
		override
		returns (bool)
	{
		duplicateFound = false;

		for (uint256 i = 0; i < _array.length; i++)
		{
			if (!_seen[_array[i]])
			{
				_seen[_array[i]] = true;
			}
			else
			{
				duplicateFound = true;
			}
		}

		for (uint256 i = 0; i < _uniqueAddresses.length; i++)
		{
			_seen[_uniqueAddresses[i]] = false;
		}

		return duplicateFound;
	}

	/// @inheritdoc IYieldSyncV1UtilityArray
	function removeDuplicates(address[] memory _array)
		public
		override
		returns (address[] memory)
	{
		delete _uniqueAddresses;

		for (uint256 i = 0; i < _array.length; i++)
		{
			if (!_seen[_array[i]])
			{
				_seen[_array[i]] = true;

				_uniqueAddresses.push(_array[i]);
			}
		}

		for (uint256 i = 0; i < _uniqueAddresses.length; i++)
		{
			_seen[_uniqueAddresses[i]] = false;
		}

		return _uniqueAddresses;
	}
}
