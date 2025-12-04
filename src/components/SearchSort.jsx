import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchText, setSortOrder } from "../redux/slices/boardSlice";
import { CiSearch } from "react-icons/ci";

const SearchSort = () => {
  const dispatch = useDispatch();
  const { searchText, sortOrder } = useSelector((state) => state.board);

  return (
    <div className="flex flex-wrap gap-3 items-center">
      <div className="relative flex-1 min-w-[200px]">
        <CiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
        <input
          type="text"
          value={searchText}
          onChange={(e) => dispatch(setSearchText(e.target.value))}
          placeholder="Search task"
          className="pl-10 pr-3 py-2 rounded-lg text-sm focus:outline-none bg-gray-100 focus:ring-2 focus:ring-orange-400 shadow-sm w-full"
        />
      </div>

      <select
        value={sortOrder}
        onChange={(e) => dispatch(setSortOrder(e.target.value))}
        className="px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
      >
        
        <option value="newest">Newest</option>
        <option value="oldest">Oldest</option>
      </select>
    </div>
  );
};

export default SearchSort;
