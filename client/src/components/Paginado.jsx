import React from "react";


export default function Paginado({ dogsPerPage, allDogs, paginado }){
const pageNumbers = []

for (let i = 1; i <= Math.ceil(allDogs / dogsPerPage); i++) {
    pageNumbers.push(i)
}

return (
    <nav>
        <ul className="pag">
            {pageNumbers.length > 1 &&
            pageNumbers.map(number =>(
                <li key={number}>
                    <button onClick={()=> paginado(number)}><strong>{number}</strong></button>
                </li>
            ))
            }
        </ul>
    </nav>
)
}