// SearchBar.js
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const SearchBar = ({ entityType, setEntities }) => {
  const [searchprefix, setSearchprefix] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);


  const fetchSearchResults = async (prefix) => {
    try {
      let url = `http://localhost:8081/${entityType}`;
      const params = new URLSearchParams({
        page: currentPage,
        size: pageSize,
      });
  
      if (prefix.trim() !== "" && prefix.trim().length >= 2) {
        url = `${url}/search?prefix=${encodeURIComponent(prefix)}&${params.toString()}`;
      } else {
        url = `${url}?${params.toString()}`;
      }
  
      const response = await fetch(url);
      
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  
      const data = await response.json();
      setEntities(data);
      console.log(data);
    } catch (error) {
      console.error("Error searching entities:", error);
    }
  };
  
  const handleSearchChange = (event) => {
    event.preventDefault();
    const prefix = event.target.value;
    setSearchprefix(prefix);
    console.log(event.target.value)
    if(prefix.trim().length < 2){
     return;
    }
    fetchSearchResults(prefix);
  };

  const handleSearchSubmit = () => {
    if (searchprefix.trim().length < 2) {
      toast.error("Please enter at least 2 characters to search");
    } else {
      fetchSearchResults(searchprefix);
    }
  };

  return (
    <form
      onSubmit={handleSearchSubmit}
      className="flex items-center my-5 w-[40vw] "
    >
      <input
        type="text"
        value={searchprefix}
        onChange={handleSearchChange}
        placeholder="Search..."
        className="w-[75vw] border border-gray-300 px-3 py-2 rounded-md mr-2 focus:outline-none focus:ring focus:border-blue-300"
      />
      <button
        type="submit"
        className="w-[20vw] bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
