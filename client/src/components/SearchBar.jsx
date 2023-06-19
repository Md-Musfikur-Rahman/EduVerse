import React, { useEffect, useState } from "react";
import { InputBase, IconButton } from "@mui/material";
import { Search } from "@mui/icons-material";

const SearchBar = ({ style }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [allNames, setAllNames] = useState([]);

  useEffect(() => {
    const fetchNames = async () => {
      try {
        const response = await fetch("http://localhost:3001/users/");
        const data = await response.json();

        const fullNames = data.users.map(
          (user) => `${user.firstName} ${user.lastName}`
        );
        setAllNames(fullNames);
      } catch (error) {
        console.log("Error fetching names:", error);
      }
    };
    fetchNames();
  }, []);

  const handleSearch = (event) => {
    const term = event.target.value;
    setSearchTerm(term);

    const filteredNames = allNames.filter((name) =>
      name.toLowerCase().includes(term.toLowerCase())
    );
    setSearchResults(filteredNames);
  };

  return (
    <div style={style}>
      <InputBase
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearch}
        sx={{
          ...style?.sx,
        }}
      />
      <IconButton>
        <Search />
      </IconButton>
      {searchTerm &&
        searchResults.map((name, index) => <div key={index}>{name}</div>)}
    </div>
  );
};

export default SearchBar;
