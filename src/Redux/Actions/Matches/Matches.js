import { GET_NEXT_MATCHES, GET_PREV_MATCHES } from "../../../Constants/Matches/Matches"
import config from "./../../../config"

export const GetNextPrevMatchesReducers = () => async (dispatch, getState) =>{

    const usutoken = localStorage.getItem('usutoken')

    await fetch(config.apiUrl + "matches/next-prev",
        {
            mode: "cors",
            method : "POST",
            headers : {
                "Accept": "application/json",
                "Content-type":"application/json",
                "reqtoken" : usutoken 
            },
            body : JSON.stringify({
                req_id : "OK"
            })
        },
    )
    .then( res => res.json())
    .then(async data => {
        if(data.response){
            dispatch({
                type : GET_NEXT_MATCHES,
                payload : data.data.nextMatches
            })
            dispatch({
                type : GET_PREV_MATCHES,
                payload : data.data.prevMatches
            })

            console.log(data)
        }
    })
    .catch((error) => {
        console.log(error)
    })
}

export const SendQuinelaReducers = () => async (dispatch, getState) =>{

    const usutoken = localStorage.getItem('usutoken')

    let response = false
    const dataQuinela = getState().matches.rex_next_matches

    await fetch(config.apiUrl + "matches/create-quinela",
        {
            mode: "cors",
            method : "POST",
            headers : {
                "Accept": "application/json",
                "Content-type":"application/json",
                "reqtoken" : usutoken 
            },
            body : JSON.stringify({
                req_data : dataQuinela
            })
        },
    )
    .then( res => res.json())
    .then(async data => {
        if(data.response){
            response = true
            dispatch(GetNextPrevMatchesReducers())
        }
    })
    .catch((error) => {
        console.log(error)
    })

    return response
}



export const EditFormQuinelaReducers = (index, team, value) => async (dispatch, getState) =>{
    const dataNextMatches = getState().matches.rex_next_matches

    console.log(dataNextMatches[index][team])

    dataNextMatches[index][team] = value

    dispatch({
        type : GET_NEXT_MATCHES,
        payload : dataNextMatches
    })
}

