import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {getTemperaments, postDogs} from '../actions'
import {useDispatch, useSelector} from 'react-redux'


function validate(input){
    let errors ={}
    if(!input.name){
        errors.name = 'Necesitas asignarle un nombre a la raza'}
    
    else if(!input.name.length > 30){
        errors.name = 'El nombre es muy largo, no podria recordarlo'}
    
    else if(!input.heightMin){
        errors.heightMin = 'Necesitamos de una altura minima'}
    
    else if(isNaN(parseInt(input.heightMin))){
        errors.heightMin = 'Por favor, colocalo en numeros para que pueda entenderte'}
    
    else if(input.heightMin <= 0){
        errors.heightMin = 'Es tan pequeño que no se ve, coloca un valor superior a 0'}
    
    else if(!input.heightMax){
        errors.heightMax = 'Todo tiene un limite, coloca un valor de altura maximo, por favor'}
    
    else if(isNaN(parseInt(input.heightMax))){
        errors.heightMax = 'Por favor, colocalo en numeros para que pueda entenderte'}
    
    else if(input.heightMax > 200){
        errors.heightMax = 'Recuerde que hablamos de razas de perro, Es muy grande'}
    
    else if (parseInt(input.heightMin) >= parseInt(input.heightMax)){
        errors.heightMin = 'Creo que el tamaño minimo deberia ser menor que el tamaño maximo'}
    
    else if (!input.weightMin){errors.weightMin = 'Necesitamos un peso minimo'}
    
    else if (isNaN(parseInt(input.weightMin))){
        errors.weightMin='Por favor, colocalo en numeros para que pueda entenderte'}
    
    else if (input.weightMin <= 0){
        errors.weightMin = 'Eso si que es ser liviano!!, el peso deberia ser mayor a 0'}
    
    else if (!input.weightMax){ errors.weightMax = 'Deberias especificar un peso maximo'}
    
    else if (isNaN(parseInt(input.weightMax))){
        errors.weightMax = 'Por favor, colocalo en numeros para que pueda entenderte'}
    
    else if (input.weightMax > 200){
        errors.heightMax ='No somos de juzgar a nadie, pero creo que tu raza es de dinosaurios y no de perros, coloca un valor mas pequeño'}
    
    else if (parseInt(input.weightMin) >= parseInt(input.weightMax)){
        errors.weightMin = 'El peso maximo deberia ser el mas grande'}
    
    else if (!input.life_span){
        errors.life_span = 'No nos gusta ni pensarlo, pero necesitamos saber su esperanza de vida'}
    
    else if (input.life_span > 50){
        errors.life_span='Quisieramos que fueran eternos, pero no podemos cambiar la realidad'}
    
    else if (input.life_span <= 0){
        errors.life_span = 'Su esperanza de vida es demasiado corta, deberia ser mayor que 0'}
    
    else if (isNaN(parseInt(input.life_span))){
        errors.life_span = 'Por favor, colocalo en numeros para que pueda entenderte'}
    
    return errors
}


export default function DogCreate(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const allTemperaments = useSelector((state) => state.temperaments)
    const [errors, setErrors] = useState({})
    const [input , setInput] = useState({
        name: '',
        heightMin: '',
        heightMax: '',
        weightMin: '',
        weightMax: '',
        life_span: '',
        image: '',
        temperaments: [],
    });

    useEffect(() => {
      dispatch(getTemperaments())
    }, [dispatch])

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        })
        setErrors(validate({
        ...input,
        [e.target.name]: e.target.value,
    }))
        console.log(input)    
    }

    function handleSelect(e){
        if(!input.temperaments.includes(e.target.value)){
            setInput({
                ...input,
                temperaments: [...input.temperaments, e.target.value]
            })
            console.log(input)
        }
    }

    function handleSubmit(e){
        e.preventDefault()
        if(!Object.getOwnPropertyNames(errors).length && input.name && input.heightMin && input.heightMax && input.weightMin && input.weightMax && input.life_span && input.temperaments.length){
            dispatch(postDogs(input))
            alert('Se creo una nueva raza')
            setInput({
                name: '',
                heightMin: '',
                heightMax: '',
                weightMin: '',
                weightMax: '',
                life_span: '',
                image: '',
                temperaments: []
            })
            navigate('/home')
        }else{
            alert('No se creo el perro')
        }
    }
    
    function handleDeleteTemperament(e){
        setInput({
            ...input,
            temperaments: input.temperaments.filter(temp => temp !== e)
        })
    }

    return (
        <div>
            <Link to='/home'><button> Pagina Principal</button> </Link>
            <h1>Crea tu propia raza de perro</h1>
            <form onSubmit={e => handleSubmit(e)}>
                <div>
                    <label><strong>Nombre de la Raza: </strong></label>
                    <input type="text" value={input.name} name='name' onChange={e => handleChange(e)} />
                {errors.name &&(
                    <p>{errors.name}</p>
                )}
                </div>
                
                <div>
                    <label><strong>Altura minima: </strong></label>
                    <input type="text" value={input.heightMin} name='heightMin' onChange={e => handleChange(e)}/>
                    <label><strong> cm.</strong></label>
                    {errors.heightMin && (
                        <p>{errors.heightMin}</p>
                    )}
                </div>
            
                <div>
                    <label><strong>Altura maxima: </strong></label>
                    <input type="text" value={input.heightMax} name='heightMax' onChange={e => handleChange(e)}/>
                    <label><strong> cm.</strong></label>
                    {errors.heightMax && (
                        <p>{errors.heightMax}</p>
                    )}
                </div>
                        
                <div>
                    <label><strong>Peso minimo: </strong></label>
                    <input type="text" value={input.weightMin} name='weightMin' onChange={e => handleChange(e)}/>
                    <label><strong> Kg.</strong></label>
                    {errors.weightMin && (
                        <p>{errors.weightMin}</p>
                    )}
                </div>
            
                <div>
                    <label><strong>Peso maximo: </strong></label>
                    <input type="text" value={input.weightMax} name='weightMax' onChange={e => handleChange(e)}/>
                    <label><strong> Kg.</strong></label>
                    {errors.weightMax && (
                        <p>{errors.weightMax}</p>
                    )}
                </div>

                <div>
                    <label><strong>Esperanza de Vida: </strong></label>
                    <input type="text" value={input.life_span} name='life_span' onChange={e => handleChange(e)}/>
                    <label><strong> años</strong></label>
                    {errors.life_span && (
                        <p>{errors.life_span}</p>
                    )}
                </div>

                <div>
                    <label><strong>Imagen: </strong></label>
                    <input type="text" value={input.image} name='image' onChange={e => handleChange(e)}/>
                </div>
            
                <div>
                    <select onChange={e=> handleSelect(e)}>
                        <option value='selected' hidden >Temperamentos</option>
                        {allTemperaments?.sort(function(a,b){
                            if(a.name < b.name) return -1
                            if(a.name > b.name) return 1
                            return 0
                        }).map(temp =>{
                            return(
                                <option value={temp.name} key={temp.id}>{temp.name}</option>
                            )
                        })}
                    </select>
                    {input.temperaments.map(e =>{
                        return ( 
                            <ul className="allTemps" key={e}>
                                <li>
                                    <p><strong>{e}</strong></p>
                                    <button onClick={() => handleDeleteTemperament(e)} className='x'>X</button>
                                </li>
                            </ul>
                        )
                    })}
                </div>
                    <button type="submit" className="crear" ><strong>Crear</strong></button>
            
            </form>
        </div>
    )


}