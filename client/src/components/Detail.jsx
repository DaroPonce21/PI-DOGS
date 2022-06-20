import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail, cleaner, cleanDog, deleteDog} from '../actions'
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import '../styles/Detail.css'

export default function Detail(props) {

    const dispatch = useDispatch()
    const { id } = useParams()
    const navigate = useNavigate()
 
    useEffect(() => {
         dispatch(getDetail(id))
         dispatch(cleaner())
         dispatch(cleanDog())
     }, [dispatch, id])



    const myDog = useSelector((state) => state.detail)

    function handleDelete(e) {
        if (id.length > 5) {
            e.preventDefault()
            dispatch(cleanDog())
            dispatch(deleteDog(id))
            dispatch(cleaner())
            alert('La raza fue eliminada')
            navigate('/home')
        }else{
            alert('Solo podemos eliminar las razas creadas por usted.')
        }
    }
           

    return (
        <div className="divDetail">
            <Link to='/home'><button id="home" className="buttonHome1">Inicio</button></Link>
            <Link to='/dogs'>
                <button className="buttonHome1">Crear Perro</button>
            </Link>
            <button onClick={(e) => handleDelete(e)}>Borrar Perro</button> 
            

           
            {
                myDog.length > 0 ?
                    <div>
                        <h1 className="name">{myDog[0].name}</h1>
                        <ul className="asd">
                            <li>
                                <div>
                                    <img src={myDog[0].image} alt={myDog[0].name} className='image' />
                                </div>
                            </li>
                            <li>
                                <div>
                                    <h4 className="caracts">Temperamentos:</h4>
                                    <ul className="allTemps">
                                        {myDog[0].CreatedInDB ?
                                            myDog[0].temperaments.map(e => {
                                                return <li key={e.race_temperament.temperamentId}><label>{e.name}</label></li>
                                            }) :
                                            myDog[0].temperaments ?
                                                myDog[0].temperaments.split(', ').map(e => {
                                                    return <li key={e}><label>{e}</label></li>
                                                }) :
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



/*
CLASE

class Detail extends Component {

    componentDidMount() {
        const dogId = this.props.match.params.id;
        this.props.getDetail(dogId);
    };


    render() {
        return (
            <div className='divDetail'>
                <Link to='/home'><button className='buttonHome1' id='home' >Home <GiDogHouse /></button></Link>
                <Link to='/dogs' >
                    <button className='buttonHome1' >
                        Create pupper <GiSittingDog />
                    </button>
                </Link>
                {
                    myDog.length > 0 ?
                        <div>
                            <h1 className='name'>{myDog[0].name}</h1>
                            <ul className='asd'>
                                <li>
                                    <div>
                                        <img src={myDog[0].image} alt={myDog[0].name} className='image' />
                                    </div>
                                </li>
                                <li>
                                    <div>
                                        <h4 className='caracts'>Temperaments:</h4>
                                        <ul className='allTemps'>
                                            {myDog[0].createdInDb ?
                                                myDog[0].temperaments.map(el => {
                                                    return <li key={el.race_temperament.temperamentId}><label>{el.name}</label></li>
                                                }) :
                                                myDog[0].temperaments ?
                                                    myDog[0].temperaments.split(', ').map(el => {
                                                        return <li key={el}><label>{el}</label></li>
                                                    }) :
                                                    '🤷‍♂️ No temperaments provided for this breed 🤷‍♀️'}
                                        </ul>
                                        <h4 className='caracts'>Height</h4>
                                        <p>{myDog[0].heightMin} - {myDog[0].heightMax} cm</p>
                                        <h4 className='caracts'>Weight</h4>
                                        <p>{myDog[0].weightMin} - {myDog[0].weightMax} kg</p>
                                        <h4 className='caracts'>Life span</h4>
                                        <p className='last'>{myDog[0].life_span}</p>
                                    </div>
                                </li>
                            </ul>
                        </div> :
                        <div className='loading'>
                            <h1><strong>Come here boy...<GiDogBowl /></strong></h1>
                        </div>
                }
            </div>
        )
    }
};



                                    <h4 className="caracts">Origenes:</h4>
                                    <ul className="allOrg">
                                        {myDog[0].CreatedInDB ?
                                            myDog[0].origins.map(e => {
                                                return <li key={e.race_origin.originsId}><label>{e.name}</label></li>
                                            }) :
                                            myDog[0].origins ?
                                                myDog[0].origins.split(', ').map(e => {
                                                    return <li key={e}><label>{e}</label></li>
                                                }) :
                                                'Esta raza no posee origenes'
                                        }

                                    </ul>


function mapStateToProps(state) {
    return {
        dog: state.detail,
    };
};

function mapDispatchToProps(dispatch) {
    return {
        getDetail: id => dispatch(getDetail(id)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Detail); 

*/


  /* 
    function handleDelete(e) {
        if (id.length > 5) {
            e.preventDefault()
            dispatch(deleteDog(id))
            dispatch(cleaner())
            alert('La raza fue eliminada')
            navigate('/home')
        }else{
            alert('Solo podemos eliminar las razas creadas por usted.')
        }
    }
            <button onClick={(e) => handleDelete(e)}>Borrar Perro</button> 
*/