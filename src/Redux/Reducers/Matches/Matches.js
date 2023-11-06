import { 
    GET_NEXT_MATCHES,
    GET_PREV_MATCHES,
    GET_ALL_MATCHES,
    GET_PREDICTIONS_JOURNEY
} from "../../../Constants/Matches/Matches"

const INIT_STATE = {
    rex_next_matches    : [],
    rex_prev_matches    : [],
    rex_all_matches     : [],
    rex_predictions_journey : []
}

export default (state = INIT_STATE, action) => {
    switch(action.type){
        case GET_PREDICTIONS_JOURNEY:
            return {
                ...state,
                rex_predictions_journey: action.payload
        }
        case GET_ALL_MATCHES:
            return {
                ...state,
                rex_all_matches: action.payload
        }
        case GET_NEXT_MATCHES:
            return {
                ...state,
                rex_next_matches: action.payload
        }
        case GET_PREV_MATCHES:
            return {
                ...state,
                rex_prev_matches: action.payload
        }
        default:
            return state
    }
}