import { GET_DOGS, GET_TEMPERAMENTS, FILTER_BY_TEMPERAMENT, SORT_BY_NAME, FILTER_CREATED, FILTER_WEIGHT, GET_DETAIL } from "../actions"

const initialState = {
    dogs: [],
    allDogs: [],
    temperaments: [],
    details: []
}


// aca cambio todo el initialState segun lo que se mande por actions
function rootReducer(state = initialState, action) {
    switch (action.type) {
        case GET_DOGS:
            return {
                ...state,
                dogs: action.payload,
                allDogs: action.payload,
            }
        case GET_TEMPERAMENTS:
            return {
                ...state,
                temperaments: action.payload
            }
        case FILTER_BY_TEMPERAMENT:
            const allDogs = state.allDogs
            const temperamentFiltered = action.payload === 'all' ? allDogs : allDogs.filter(e => {
                if (typeof (e.temperaments) === 'string') return e.temperaments.includes(action.payload)
                if (Array.isArray(e.temperaments)) {
                    let tempers = e.temperaments.map(e => e.name)
                    return tempers.includes(action.payload)
                }
                return true
            })
            return {
                ...state,
                dogs: temperamentFiltered
            }
        case SORT_BY_NAME:
            const sortedName = action.payload === 'ABC' ?
                state.dogs.sort(function (a, b) {
                    if (a.name.toLowerCase() > b.name.toLowerCase()) {
                        return 1;
                    }
                    if (b.name.toLowerCase() > a.name.toLowerCase()) {
                        return -1;
                    }
                    return 0
                }) :
                state.dogs.sort(function (a, b) {
                    if (a.name.toLowerCase() > b.name.toLowerCase()) {
                        return -1;
                    }
                    if (b.name.toLowerCase() > a.name.toLowerCase()) {
                        return 1;
                    }
                    return 0
                })
            return {
                ...state,
                dogs: sortedName
            }
        case FILTER_CREATED:
            const all = state.allDogs
            const filterCreated = action.payload === 'allTheRaces' ? all : action.payload === 'db' ? all.filter(e => e.CreatedInDB) : all.filter(e => !e.CreatedInDB)
            return {
                ...state,
                dogs: filterCreated
            }
        case FILTER_WEIGHT:
            const balance = action.payload === 'lightweight' ?
                state.dogs.sort(function (a, b) {
                    return parseInt(a.weightMin) - parseInt(b.weightMin)
                }) :
                state.dogs.sort(function (a, b) {
                    return parseInt(b.weightMax) - parseInt(a.weightMax)
                })
            return {
                ...state,
                dogs: balance,
            }
        case GET_DETAIL:
            return {
                ...state,
                detail: action.payload
            }
        default:
            return state
    }
}

export default rootReducer