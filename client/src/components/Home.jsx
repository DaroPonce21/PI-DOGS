
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getDogs, getTemperaments, filterDogsByTemperament, sortByName, filterDogsCreated, filterByWeight } from '../actions'
import { Link } from 'react-router-dom'
import Card from './Card'
import Paginado from './Paginado'
import SearchBar from './SearchBar'

export default function Home() {

    const dispatch = useDispatch()

    // ESTUDIAR: CON ESTO DECLARO LA CONST Y CON EL USESELECTOR ME TRAIGO TODO LO QUE ESTA EN EL ESTADO

    const allDogs = useSelector((state) => state.dogs)
    const allTemperaments = useSelector((state) => state.temperaments)

    const [currentPage, setCurrentPage] = useState(1)
    const [dogPerPage, setDogCurrentPerPage] = useState(8)
    const indexOfLastDog = currentPage * dogPerPage
    const indexOfFirstDog = indexOfLastDog - dogPerPage
    const currentDog = allDogs.slice(indexOfFirstDog, indexOfLastDog)

    const [_orden, setOrden] = useState('')

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    useEffect(() => {
        dispatch(getDogs())
    }, [dispatch])

    useEffect(() => {
        dispatch(getTemperaments())
    }, [dispatch])

    function handleClick(e) {
        e.preventDefault();
        dispatch(getDogs())
    }

    function handleFilterTemperaments(e) {
        e.preventDefault()
        setCurrentPage(1)
        dispatch(filterDogsByTemperament(e.target.value))
    }

    function handleSortByName(e) {
        e.preventDefault();
        dispatch(sortByName(e.target.value))
        setCurrentPage(1)
        setOrden(`Se a filtrado de ${e.target.value}`)
    }

    function handleFilterCreated(e) {
        e.preventDefault()
        setCurrentPage(1)
        dispatch(filterDogsCreated(e.target.value))

    }

    function handleFilterByWeight(e) {
        e.preventDefault()
        dispatch(filterByWeight(e.target.value))
        setCurrentPage(1)
        setOrden(`Se a filtrado de ${e.target.value}`)
    }

    return (
        <div>
            <Link to='/dogs'> Crear Perro</Link>
            <h1>HOLA ESTO ES EL HOME</h1>
            <button onClick={e => { handleClick(e) }}>
                Cargar todos los perros
            </button>
            <div>
                <SearchBar/>
                <select onChange={e => handleSortByName(e)}>
                    <option value="selected" hidden >Orden Alfabetico</option>
                    <option value="ABC">A-Z</option>
                    <option value="ZXY">Z-A</option>
                </select>

                <select onChange={e => handleFilterByWeight(e)}>
                    <option value="selectWeight" hidden>Ordenar por Peso</option>
                    <option value="lightweight">De Menor a Mayor</option>
                    <option value="heavy">De Mayor a Menor</option>
                </select>

                <select onChange={e => handleFilterCreated(e)} >
                    <option value="allTheRaces">Todas Las Razas</option>
                    <option value="api">Razas Existentes</option>
                    <option value="db">Razas Creadas</option>
                </select>

                <select onChange={e => handleFilterTemperaments(e)}>
                    <option value="all" key={0}>Temperamentos</option>
                    {allTemperaments?.sort(function (a, b) {
                        if (a.name < b.name) return -1
                        if (a.name > b.name) return 1
                        return 0
                    }).map(ele => {
                        return (
                            <option key={ele.id} value={ele.name}> {ele.name}</option>
                        )
                    })
                    }
                </select>
                <div>
                    {
                        currentDog?.map((e) => {
                            return (
                                <div key={e.id}>
                                    <Link to={'/home/' + e.id}>
                                        <Card
                                            name={e.name}
                                            image={e.image}
                                            weightMin={e.weightMin}
                                            weightMax={e.weightMax}
                                            temperaments={e.temperaments}
                                            key={e.id}
                                        />
                                    </Link>
                                </div>
                            )
                        })
                    }
                </div>
                <Paginado
                    dogPerPage={dogPerPage}
                    allDogs={allDogs.length}
                    paginado={paginado}
                />
            </div>
        </div>
    )


}