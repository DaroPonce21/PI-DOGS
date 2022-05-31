import React from 'react'
import {Link} from 'react-router-dom'


export default function LandingPage(){
    return(
    <div className=''>
        <h1> HOLA ESTO ES EL LANDING </h1>
        <Link to= '/home'>
            <button> Ingresar </button> 
            </Link>
    </div>
    )
}