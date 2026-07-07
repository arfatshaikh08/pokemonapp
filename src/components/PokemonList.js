import React from "react";
import PokemonCard from "./PokemonCard";

function PokemonList({ pokemon }) {
  return (
    <div className="PokemonList">
      {pokemon.map((p) => (
        <div key={p.name}>
          <PokemonCard name={p.name} image={p.image} types={p.type} />
        </div>
      ))}
    </div>
  );
}

export default PokemonList;
