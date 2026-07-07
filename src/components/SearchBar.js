import React, { useState, useEffect } from "react";

export default function SearchBar({ search, setSearch, searchPokemon }) {
  useEffect(() => {
    console.log({ search });
  }, [search]);

  return (
    <div className="SearchContainer">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={(event) => (event.key === "Enter" ? searchPokemon() : null)}
      ></input>
    </div>
  );
}
