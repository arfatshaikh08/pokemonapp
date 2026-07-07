import React from "react";

function PokemonCard({ name, image, types }) {
  return (
    <div className="PokemonCard">
      <p>{name}</p>
      <img src={image} alt={name}></img>
      <div>
        {types.map((type) => (
          <span className={`TypeBadge ${type}`} key={type}>
            {type}
          </span>
        ))}
      </div>
    </div>
  );
}

export default PokemonCard;
