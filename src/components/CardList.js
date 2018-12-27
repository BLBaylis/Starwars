import React from "react";
import Card from "./Card";

const CardList = ({ characters }) => {
  return (
    <div>
      {characters.map(char => (
        <Card name={char.name} key={char.name} homeworld={char.homeworld} />
      ))}
    </div>
  );
};

export default CardList;
