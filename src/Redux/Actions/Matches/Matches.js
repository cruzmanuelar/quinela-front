import config from "./../../../config"
import { 
    FORM_PREDICTION_NEXT_MATCHES, 
    GET_ALL_MATCHES, 
    GET_NEXT_MATCHES, 
    GET_PREDICTIONS_JOURNEY, 
    GET_PREV_MATCHES, 
    GET_TABLE_POSITIONS, 
    LOADING_NEXT_MATCHES, 
    LOADING_PREV_MATCHES, 
    SEND_FORM_QUINELA
} from "../../../Constants/Matches/Matches"
import { GetNextMatchesReducers } from "../Admin/Admin"

export const GetTablePositionsReducers = () => async (dispatch, getState) =>{

    const usutoken = localStorage.getItem('usutoken')

    await fetch(config.apiUrl + "playoff/get-table",
        {
            mode: "cors",
            method : "POST",
            headers : {
                "Accept": "application/json",
                "Content-type":"application/json",
                "reqtoken" : usutoken 
            },
        },
    )
    .then( res => res.json())
    .then(async data => {
        if(data.response){
            dispatch({
                type : GET_TABLE_POSITIONS,
                payload : data.data
            })
        }
    })
    .catch((error) => {
        console.log(error)
    })
}

export const GetPrevMatchesReducers = () => async (dispatch, getState) =>{

    const usutoken = localStorage.getItem('usutoken')

    dispatch({
        type : LOADING_PREV_MATCHES,
        payload : true
    })

    await fetch(config.apiUrl + "matches/prev",
        {
            mode: "cors",
            method : "POST",
            headers : {
                "Accept": "application/json",
                "Content-type":"application/json",
                "reqtoken" : usutoken 
            },
        },
    )
    .then( res => res.json())
    .then(async data => {
        if(data.response){
            dispatch({
                type : GET_PREV_MATCHES,
                payload : data.data.prevMatches
            })
        }
    })
    .catch((error) => {
        console.log(error)
    })
    dispatch({
        type : LOADING_PREV_MATCHES,
        payload : false
    })
}

export const GetNextPrevMatchesReducers = () => async (dispatch, getState) =>{

    const usutoken = localStorage.getItem('usutoken')

    dispatch({
        type : LOADING_NEXT_MATCHES,
        payload : true
    })

    await fetch(config.apiUrl + "matches/next",
        {
            mode: "cors",
            method : "POST",
            headers : {
                "Accept": "application/json",
                "Content-type":"application/json",
                "reqtoken" : usutoken 
            },
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
                type : FORM_PREDICTION_NEXT_MATCHES,
                payload : [...data.dataUser.nextMatches]
            })

            console.log(data)
        }
    })
    .catch((error) => {
        console.log(error)
    })
    dispatch({
        type : LOADING_NEXT_MATCHES,
        payload : false
    })
}

export const SendQuinelaReducers = () => async (dispatch, getState) =>{

    const usutoken = localStorage.getItem('usutoken')

    dispatch({
        type : SEND_FORM_QUINELA,
        payload : true
    })

    let response = false
    let message = ""
    const dataQuinela = getState().matches.rex_form_prediction_next_matches

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
            let responseNext = await dispatch(GetNextPrevMatchesReducers())    
        }
        message = data.message
    })
    .catch((error) => {
        console.log(error)
    })

    dispatch({
        type : SEND_FORM_QUINELA,
        payload : false
    })

    return {response, message}
}

export const GetAllMatchesReducers = () => async (dispatch, getState) =>{

    let response = false

    await fetch(config.apiUrl + "matches/get-all",
        {
            mode: "cors",
            method : "POST",
            headers : {
                "Accept": "application/json",
                "Content-type":"application/json",
            },
        },
    )
    .then( res => res.json())
    .then(async data => {
        if(data.response){
            response = true
            dispatch({
                type : GET_ALL_MATCHES,
                payload : data.data
            })
        }
    })
    .catch((error) => {
        console.log(error)
    })

    return response
}

export const CloseMatchReducers = (match) => async (dispatch, getState) =>{

    let response = false
    let message = ""
    const usutoken = localStorage.getItem('usutoken')

    await fetch(config.apiUrl + "matches/end-match",
        {
            mode: "cors",
            method : "POST",
            headers : {
                "Accept": "application/json",
                "Content-type":"application/json",
                "reqtoken" : usutoken
            },
            body : JSON.stringify({
                req_partid : match.partid,
                req_golLocal : match.pargoleslocal,
                req_golVisitante : match.pargolesvisitante
            })
        },
    )
    .then( res => res.json())
    .then(async data => {
        message = data.message
        if(data.response){
            response = true
            dispatch(GetNextMatchesReducers())
        }
    })
    .catch((error) => {
        console.log(error)
    })

    return { response, message }
}

export const GetPredictionsJourneyReducers = (match) => async (dispatch, getState) =>{

    let response = false

    await fetch(config.apiUrl + "matches/predictions-journey",
        {
            mode: "cors",
            method : "POST",
            headers : {
                "Accept": "application/json",
                "Content-type":"application/json",
            },
            body : JSON.stringify({
                req_id : match.partid
            })
        },
    )
    .then( res => res.json())
    .then(async data => {
        console.log(data)
        if(data.response){
            response = true
            console.log(data.data)
            dispatch({
                type : GET_PREDICTIONS_JOURNEY,
                payload : data.data
            })
        }
    })
    .catch((error) => {
        console.log(error)
    })

    return response
}

export const EditFormQuinelaReducers = (index, team, value) => async (dispatch, getState) =>{
    const dataNextMatches = [...getState().matches.rex_form_prediction_next_matches]
    dataNextMatches[index][team] = value

    console.log("edit")

    dispatch({
        type : FORM_PREDICTION_NEXT_MATCHES,
        payload : dataNextMatches
    })
}

