import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/LandingPage.css'
import image from '../styles/Fluffy.png'

export default function LandingPage() {
    return (
        <div className='landing'>
            <h1 className='h1'>Bienvenidos a la Fluffypedia</h1>
            
            <Link to='/home'>
                <button className='btn2'><h1><span>INGRESAR</span></h1></button>
            </Link>
            <img src={image} className='Fluffy' />
        </div>
    )
}