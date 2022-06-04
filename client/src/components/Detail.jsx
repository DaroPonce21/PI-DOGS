import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from '../actions'
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import '../styles/Detail.css'

export default function Detail(props) {

    const dispatch = useDispatch()
    const {id} = useParams()

    useEffect(() => {
        dispatch(getDetail(id))
    }, [dispatch, id])

    const myDog = useSelector((state) => state.detail)

    return (
        <div className="divDetail">
            <Link to='/home'><button id="home" className="buttonHome1">Inicio</button></Link>
            <Link to='/dogs'>
                <button className="buttonHome1">Crear Perro</button>
            </Link>
            {
                myDog.length > 0 ?  
                <div>
                    <h1 className="name">{myDog[0].name}</h1>
                    <ul className="asd">
                        <li>
                            <div>
                                <img src={myDog[0].image} alt={myDog[0].name} className='image'/>
                            </div>
                        </li>
                        <li>
                            <div>
                                <h4 className="caracts">Temperamentos:</h4>
                                <ul className="allTemps">
                                    {myDog[0].CreatedInDB ? 
                                        myDog[0].temperaments.map(e=>{
                                            return <li key={e.race_temperament.temperamentId}><label>{e.name}</label></li>
                                        }) :
                                        myDog[0].temperaments ?
                                            myDog[0].temperaments.split(', ').map(e =>{
                                                return <li key={e}><label>{e}</label></li>
                                            }):
                                        'Esta raza no posee temperamentos'    
                                }
                                </ul>
                                <h4 className="caracts">Altura entre: </h4>
                                <p>{myDog[0].heightMin} a {myDog[0].heightMax} Cm.</p>
                                <h4 className="caracts">Peso entre:</h4>
                                <p>{myDog[0].weightMin} a {myDog[0].weightMax} Kg.</p>
                                <h4 className="caracts">Esperanza de vida:</h4>
                                <p className="last">{myDog[0].life_span}</p>
                            </div>
                        </li>
                    </ul>
                </div> :
                <div className="loading">
                    <h1><strong>Cargando...</strong></h1>
                </div>
            }
        </div>
    )
}