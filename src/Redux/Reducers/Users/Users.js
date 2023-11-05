import { 
    GET_SCORE_USERS,
    GET_DATA_USERS
} from "../../../Constants/Users/Users"

const INIT_STATE = {
    rex_data_users : [],
    rex_score_users : [],    
}

export default (state = INIT_STATE, action) => {
    switch(action.type){
        case GET_DATA_USERS:
            return {
                ...state,
                rex_data_users: action.payload
        }
        case GET_SCORE_USERS:
            return {
                ...state,
                rex_score_users: action.payload
        }
        default:
            return state
    }
}