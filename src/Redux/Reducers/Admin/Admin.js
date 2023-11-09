import { 
    GET_DATA_JOURNEYS,
    GET_DATA_NEXT_JOURNEY
} from "../../../Constants/Admin/Admin"

const INIT_STATE = {
    rex_data_journeys    : [],
    rex_data_next_journey: []
}

export default (state = INIT_STATE, action) => {
    switch(action.type){
        case GET_DATA_JOURNEYS:
            return {
                ...state,
                rex_data_journeys: action.payload
        }
        case GET_DATA_NEXT_JOURNEY:
            return {
                ...state,
                rex_data_next_journey: action.payload
        }
        default:
            return state
    }
}