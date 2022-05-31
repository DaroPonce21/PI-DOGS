import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from '../actions'
import { useEffect } from "react";

export default function Detail(props) {
    const dispatch = useDispatch()
    const id = props.match.params.id

    useEffect(() => {
        dispatch(getDetail(id))
    }, [dispatch, id])

    const dogSelect = useSelector((state) => state.detail)

    return (
        <div>
            <Link to='/home'>
                <button className="" id='home'>Home</button>
            </Link>
            <Link to='/dogs'>
                <button className=""> Crear Raza</button>
            </Link>
            {
                dogSelect.length > 0 ?
                    <div>
                        <h1 className="">{dogSelect[0].name}</h1>
                        <ul>
                            <li>
                                <div>
                                    <img src={dogSelect[0].image} alt={dogSelect[0].name} />
                                </div>
                            </li>
                            <li>
                                <div>
                                    <h4>Temperamentos:</h4>
                                    <ul>{dogSelect[0].createdInDb ?
                                        dogSelect[0].temperaments.map(e => {
                                            return <li key={el.dogs_temperament.temperametId}><label>{el.name}</label></li>
                                        }) :
                                        dogSelect[0].temperaments ?
                                            dogSelect[0].split(',').map(e => {
                                                return <li key={e}><label>{e}</label></li>
                                            }) :
                                            'No hay temperamentos para esta raza'}
                                    </ul>
                                    <h4>Altura entre</h4>
                                    <p>{dogSelect[0].heightMin} Cm. y {dogSelect[0].heightMax} Cm. </p>
                                    <h4>Peso entre</h4>
                                    <p>{dogSelect[0].weightMin} Kg. y {dogSelect[0].weightMax} Kg. </p>
                                    <h4>Vida Estimada</h4>
                                    <p>{dogSelect[0].life_span} Años</p>
                                </div>
                            </li>
                        </ul>
                    </div> :
                    <div>
                        <h1><strong>Ven perrito perrito...</strong></h1> </div>

            }
        </div>
    )
}