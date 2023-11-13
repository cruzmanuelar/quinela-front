import config from "./../../../config"
import { 
    GET_DATA_JOURNEYS,
    GET_DATA_NEXT_JOURNEY
} from "../../../Constants/Admin/Admin"

export const GetJourneysReducers = () => async (dispatch, getState) =>{

    const usutoken = localStorage.getItem('usutoken')

    await fetch(config.apiUrl + "matches/get-journeys",
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
                type : GET_DATA_JOURNEYS,
                payload : data.data
            })

        }
    })
    .catch((error) => {
        console.log(error)
    })
}

export const SelectJourneyReducers = (id) => async (dispatch, getState) =>{

    const usutoken = localStorage.getItem('usutoken')
    let response = false
    let message = ""

    await fetch(config.apiUrl + "matches/select-next-journey",
        {
            mode: "cors",
            method : "POST",
            headers : {
                "Accept": "application/json",
                "Content-type":"application/json",
                "reqtoken" : usutoken 
            },
            body : JSON.stringify({
                req_id : id
            })
        },
    )
    .then( res => res.json())
    .then(async data => {
        if(data.response){
            response = true
            dispatch(GetNextMatchesReducers())
        }
        message = data.message
    })
    .catch((error) => {
        console.log(error)
    })

    return { response, message }
}


export const DisableMatchReducers = (id, status) => async (dispatch, getState) =>{

    let response = false
    let message = ""
    const usutoken = localStorage.getItem('usutoken')

    await fetch(config.apiUrl + "matches/disable-match",
        {
            mode: "cors",
            method : "POST",
            headers : {
                "Accept": "application/json",
                "Content-type":"application/json",
                "reqtoken" : usutoken
            },
            body : JSON.stringify({
                req_partid : id,
                req_status  : status
            })
        },
    )
    .then( res => res.json())
    .then(async data => {
        if(data.response){
            response = true
            dispatch(GetNextMatchesReducers())
        }
        message = data.message
    })
    .catch((error) => {
        console.log(error)
    })

    return { response, message }
}


export const GetNextMatchesReducers = (id) => async (dispatch, getState) =>{

    const usutoken = localStorage.getItem('usutoken')

    await fetch(config.apiUrl + "matches/get-next-journey",
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
        dispatch({
            type : GET_DATA_NEXT_JOURNEY,
            payload : data.data
        })
    })
    .catch((error) => {
        console.log(error)
    })
}