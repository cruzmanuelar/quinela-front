import { combineReducers } from "redux"
import { connectRouter } from "connected-react-router"
import Users from "./Users/Users"
import Matches from "./Matches/Matches"
import Admin from "./Admin/Admin"

const createRootReducer = (history) => combineReducers({
    router      : connectRouter(history),
    users       : Users,
    matches     : Matches,
    admin       : Admin
})

export default createRootReducer