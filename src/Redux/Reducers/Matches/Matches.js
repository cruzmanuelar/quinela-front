import { 
    GET_NEXT_MATCHES,
    GET_PREV_MATCHES,
    GET_ALL_MATCHES,
    GET_PREDICTIONS_JOURNEY,
    FORM_PREDICTION_NEXT_MATCHES,
    GET_TABLE_POSITIONS,
    SEND_FORM_QUINELA,
    LOADING_PREV_MATCHES,
    LOADING_NEXT_MATCHES
} from "../../../Constants/Matches/Matches"

const INIT_STATE = {
    rex_next_matches    : [],
    rex_prev_matches    : [],
    rex_loading_prev_matches : false,
    rex_loading_next_matches : false,
    rex_send_form_quinela : false,
    rex_all_matches     : [],
    rex_predictions_journey : [],
    rex_data_next_matches   : [],
    rex_form_prediction_next_matches : [],
    rex_table_positions : []
}

export default (state = INIT_STATE, action) => {
    switch(action.type){
        case LOADING_PREV_MATCHES:
            return {
                ...state,
                rex_loading_prev_matches: action.payload
        }
        case LOADING_NEXT_MATCHES:
            return {
                ...state,
                rex_loading_next_matches: action.payload
        }
        case GET_TABLE_POSITIONS:
            return {
                ...state,
                rex_table_positions: action.payload
        }
        case SEND_FORM_QUINELA:
            return {
                ...state,
                rex_send_form_quinela: action.payload
        }
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
        case FORM_PREDICTION_NEXT_MATCHES:
            return {
                ...state,
                rex_form_prediction_next_matches: action.payload
        }
        default:
            return state
    }
}