import React, { useState } from "react";

const Search = ({ searchMovies }) => {
  const [searchValue, setSearchValue] = useState("");

  const handleSearchInputChanges = (e) => {
    setSearchValue(e.target.value);
  };

  const resetInputField = () => {
    setSearchValue("");
  };

  const callSearchFunction = (e) => {
    e.preventDefault();
    searchMovies(searchValue);
    resetInputField();
  };

  return (
    <form className="flex items-center">
      <input
        className="border rounded-l py-2 px-4 w-64 focus:outline-none focus:border-blue-500 text-black"
        value={searchValue}
        onChange={handleSearchInputChanges}
        type="text"
        placeholder="Search your movie"
      />
      <button
        className="bg-yellow-500 text-gray-700 py-2 px-4 rounded-r"
        onClick={callSearchFunction}
      >
        Search
      </button>
    </form>
  );
};

export default Search;
