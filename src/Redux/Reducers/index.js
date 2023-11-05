import { combineReducers } from "redux"
import { connectRouter } from "connected-react-router"
import Users from "./Users/Users"
import Matches from "./Matches/Matches"

const createRootReducer = (history) => combineReducers({
    router      : connectRouter(history),
    users       : Users,
    matches     : Matches
})

export default createRootReducer