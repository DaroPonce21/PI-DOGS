import axios from 'axios'

export const GET_DOGS = 'GET_DOGS'
export const GET_TEMPERAMENTS = 'GET_TEMPERAMENTS'
export const SEARCH_ERROR = 'SEARCH_ERROR'
export const FILTER_BY_TEMPERAMENT = 'FILTER_BY_TEMPERAMENT'
export const SORT_BY_NAME = 'SORT_BY_NAME'
export const FILTER_CREATED = 'FILTER_CREATED'
export const FILTER_WEIGHT = 'FILTER_WEIGHT'
export const GET_DETAIL = 'GET_DETAIL'

export function getDogs(name) {
    return async function (dispatch) {
        try {
            if (name) {
                return axios.get('http://localhost:3001/dogs?name=' + name)
                    .then(res => dispatch({ type: GET_DOGS, payload: res.data }))
                    .catch(err => dispatch({ type: GET_DOGS, payload: err.data }))
            }
            const json = await axios.get('http://localhost:3001/dogs')
            return dispatch({
                type: GET_DOGS,
                payload: json.data
            })
        } catch (err) {
            let error = axios.get('http://localhost:3001/dogs?name=' + name)
                .then(res => res.data)
            return dispatch({
                type: SEARCH_ERROR,
                payload: error,
            })
        }

    }
}

export function getTemperaments() {
    return async function (dispatch) {
        let json = await axios.get('http://localhost:3001/temperament')
        return dispatch({
            type: GET_TEMPERAMENTS,
            payload: json.data
        })
    }
}
export function filterDogsByTemperament(payload) {
    return {
        type: FILTER_BY_TEMPERAMENT,
        payload
    }
}

export function sortByName(payload) {
    return {
        type: SORT_BY_NAME,
        payload
    }
}

export function filterDogsCreated(payload) {
    return {
        type: FILTER_CREATED,
        payload
    }
}

export function filterByWeight(payload) {
    return {
        type: FILTER_WEIGHT,
        payload
    }
}

export function getDetail(id){
    return async function(dispatch){
        try {
            let json = await axios.get('http://localhost:3001/dogs/ ' + id)
            return dispatch({
                type:GET_DETAIL,
                payload: json.data
            })
        } catch (err) {
            console.log(err)
            
        }
    }
}