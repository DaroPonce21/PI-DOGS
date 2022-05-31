import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getDogs } from "../actions";


export default function SearchBar(){

    const dispatch = useDispatch()
    const [name , setName] = useState('')

    function handleInputChange(e){
        e.preventDefault()
        setName(e.target.value)
    }

    function handleSubmit(e){
        e.preventDefault()
        var found = getDogs(name)
        dispatch(found)
        setName('')
    }
    return(
        <>
            <input
                type='test' 
                placeholder='Busca tu raza favorita'
                onChange={e => handleInputChange(e)}
                value={name}
                className='input'
                onKeyPress={e=> e.key === 'Enter' && handleSubmit(e)}
                />
            <button
                type="submit"
                onClick={e=> handleSubmit(e)}
                className='fetch'
                >
                <strong>Buscar!</strong>
                </button>
                

            
        </>
    )
}
