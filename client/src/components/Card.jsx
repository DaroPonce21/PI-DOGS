import React from "react";
import '../styles/Card.css'

export default function Card({ image, name, temperaments, weightMin, weightMax }) {
    return (
        <div className="card">
            <h1 className="infoName">{name}</h1>
            <img src={image} alt={`${name}`} className="imageDog" />
                {
                    name !== 'Perdon, la raza no esta en nuestra base de datos.' ?
                    <h3 className="info">Peso: De {weightMin} a {weightMax} kg.</h3> :
                    <></>
                }
            <h3 className="info">{function (temperaments) {
                if (typeof (temperaments) === 'string') {
                    return temperaments
                }
                if (Array.isArray(temperaments)) {
                    let temps = temperaments.map(e => e.name)
                    return temps.join(', ')
                }
            }(temperaments)}</h3>
            
        </div>
    )
}