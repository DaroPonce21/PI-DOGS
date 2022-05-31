import React from "react";

export default function Card({name, temperaments, image, weightMin, weightMax}){
    return(
        <div>
            <h3>{name}</h3>
            <img src={image} alt={`${name}`} width="250px" height="200px" />
            <h5>{weightMin} - {weightMax}</h5>
            <h5>{temperaments}</h5>
        </div>
    )
}