import React from "react";


export default function Paginado({ dogPerPage, allDogs, paginado }){
const pageNumbers = []

for (let i = 1; i <= Math.ceil(allDogs / dogPerPage); i++) {
    pageNumbers.push(i)
}

return (
    <nav>
        <ul className="pag">
            {
                pageNumbers?.map(number => (
                    <li key={number}>
                        <button onClick={() => paginado(number)}><strong>{number}</strong></button>
                    </li>
                ))
            }
        </ul>
    </nav>
)
}