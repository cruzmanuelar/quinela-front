import React, { useEffect, useState } from 'react'
import JourneyMatches from './JourneyMatches'
import { useDispatch, useSelector } from 'react-redux'
import { GetNextPrevMatchesReducers, GetPrevMatchesReducers } from '../Redux/Actions/Matches/Matches'
import TableQuinela from './TableQuinela'
import { Skeleton } from 'antd'
import { useNavigate } from 'react-router-dom'
import { UserValidationReducers } from '../Redux/Actions/Users/Users'

const Home = () => {
    
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {
        rex_next_matches,
        rex_prev_matches,
        rex_loading_prev_matches,
        rex_loading_next_matches,    
    } = useSelector(({matches}) => matches)

    const getData = async () => {
        if(rex_prev_matches.length == 0){
            await dispatch(GetNextPrevMatchesReducers())
        }
        if(rex_next_matches.length == 0){
            await dispatch(GetPrevMatchesReducers())
        }
    }

    const userValidation = async () => {
		let response = await dispatch(UserValidationReducers())
		if(!response){
			navigate("/login")
		}
		return response
	}

	useEffect(()=> {
		userValidation()
	},[])
    
    useEffect(()=>{
        getData()
    },[])

    return (
    <>
        {
            rex_loading_prev_matches
            ? <Skeleton active />
            : <JourneyMatches
                title={"Jornada anterior - Fecha " + rex_prev_matches[0]?.fecfechas.fecjornada}
                data={rex_prev_matches}
                nextMatches={false}
            />
        }
        <TableQuinela/>
        {
            rex_loading_next_matches
            ? <Skeleton active />
            : <JourneyMatches
                title={"Jornada siguiente - Fecha " + rex_next_matches[0]?.fecfechas.fecjornada}
                data={rex_next_matches}
                nextMatches={true}
            />
        }
    </>
  )
}

export default Home