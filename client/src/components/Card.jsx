import React from "react";
import '../styles/Card.css'


export default function Card({ image, name, temperaments, weightMin, weightMax, heightMin, heightMax, bredFor, breedGroups, origin }) {
return (
    <div className="card">
        <h1 className="infoName">{name}</h1>
        <img src={image} alt={`${name}`} className="imageDog" />
        {
            name !== 'Perdon, la raza no esta en nuestra base de datos.' ?
                <h3 className="info">Peso: De {weightMin} a {weightMax} kg.</h3> :
                <></>
        }
        {
            /*
            name !== 'Perdon, la raza no esta en nuestra base de datos.' ?
                <h3 className="info">Altura: De {heightMin} a {heightMax} Cm.</h3> :
                <></>

        }
        {

            name !== 'Perdon, la raza no esta en nuestra base de datos.' ?
                <h3 className="info">Pertenece a la familia de los: {breedGroups} </h3> :
                <></>

        }
        {
            name !== 'Perdon, la raza no esta en nuestra base de datos.' ?
                <h3 className="info">Creiado para: {bredFor} </h3> :
                <></>

                */
        }


        <h3 className="info">Temperamentos:</h3>
        <h3 className="info"> {function (temperaments) {
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

/*<h3 className="info">Paises de origen::</h3>
            <h3 className="info">{function (origin) {
                if (typeof (origin) === 'string') {
                    return origin
                }
                if (Array.isArray(origin)) {
                    let origs = origin.map(e => e.name)
                    return origs.join(', ')
                }
            }(origin)}</h3>

            */