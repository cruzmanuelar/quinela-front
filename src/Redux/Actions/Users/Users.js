
import config from "./../../../config"
import { 
    GET_SCORE_USERS,
    GET_DATA_USERS
} from "../../../Constants/Users/Users"

export const UserValidationReducers = () => async (dispatch, getState) =>{

    let usutoken = await localStorage.getItem("usutoken")
    let response = false

    await fetch(config.apiUrl + "users/user-validation",
        {
            mode: "cors",
            method : "POST",
            headers : {
                "Accept": "application/json",
                "Content-type":"application/json",
                "usutoken" : usutoken
            },
        },
    )
    .then( res => res.json())
    .then(async data => {
        if(data.response){
            response = true
        }
    })
    .catch((error) => {
        console.log(error)
    })

    return response
}

export const GetUsersReducers = () => async (dispatch, getState) =>{

    await fetch(config.apiUrl + "users/all",
        {
            mode: "cors",
            method : "POST",
            headers : {
                "Accept": "application/json",
                "Content-type":"application/json",
            },
            body : JSON.stringify({
            })
        },
    )
    .then( res => res.json())
    .then(async data => {
        if(data.response){
            console.log(data)
            dispatch({
                type: GET_DATA_USERS,
                payload : data.data
            })
        }
    })
    .catch((error) => {
        console.log(error)
    })
}

export const LoginUserReducers = (user) => async (dispatch, getState) =>{

    let response    = false
    let message     = ""

    await fetch(config.apiUrl + "users/login",
        {
            mode: "cors",
            method : "POST",
            headers : {
                "Accept": "application/json",
                "Content-type":"application/json",
            },
            body : JSON.stringify({
                req_usucorreo: user.usuemail,
                req_usupassword : user.usupassword
            })
        },
    )
    .then( res => res.json())
    .then(async data => {
        if(data.response){
            response = true
            localStorage.setItem('usutoken', JSON.stringify(data.token));
        }
        message = data.message
    })
    .catch((error) => {
        console.log(error)
    })

    return {response, message}
}

export const GetScoreUsersReducers = () => async (dispatch, getState) =>{
    await fetch(config.apiUrl + "users/scores",
        {
            mode: "cors",
            method : "POST",
            headers : {
                "Accept": "application/json",
                "Content-type":"application/json",
            },
            body : JSON.stringify({
            })
        },
    )
    .then( res => res.json())
    .then(async data => {
        if(data.response){
            console.log(data)

            const dataUsers = data.data.sort(function (a, b) {
                return b.ptosTotal - a.ptosTotal;
            });

            console.log(dataUsers)
            dispatch({
                type : GET_SCORE_USERS,
                payload : dataUsers
            })
        }
    })
    .catch((error) => {
        console.log(error)
    })
}

export const GetScoreUsersJourneyReducers = (fecid) => async (dispatch, getState) =>{
    await fetch(config.apiUrl + "users/scores-journey",
        {
            mode: "cors",
            method : "POST",
            headers : {
                "Accept": "application/json",
                "Content-type":"application/json",
            },
            body : JSON.stringify({
                req_fecid : fecid
            })
        },
    )
    .then( res => res.json())
    .then(async data => {
        if(data.response){
            console.log(data)

            const dataUsers = data.data.sort(function (a, b) {
                return b.ptosTotal - a.ptosTotal;
            });

            dispatch({
                type : GET_SCORE_USERS,
                payload : dataUsers
            })
        }
    })
    .catch((error) => {
        console.log(error)
    })
}