import React from "react";

export default function Card({ image, name, temperaments, weightMin, weightMax }) {
    return (
        <div>
            <h1>{name}</h1>
            <h3>{function (temperaments) {
                if (typeof (temperaments) === 'string') {
                    return temperaments
                }
                if (Array.isArray(temperaments)) {
                    let temps = temperaments.map(e => e.name)
                    return temps.join(', ')
                }
            }(temperaments)}</h3>
            <img src={image} alt={`${name}`} width='250px' height='200px' />
                {
                    name !== 'Perdon, la raza no esta en nuestra base de datos.' ?
                    <h3>Peso: De {weightMin} a {weightMax} kg.</h3> :
                    <></>
                }
        </div>
    )
}