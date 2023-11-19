import React, { useEffect, useState } from 'react'
import JourneyMatches from './../Components/Main/JourneyMatches'
import { useDispatch, useSelector } from 'react-redux'
import { GetNextPrevMatchesReducers, GetPrevMatchesReducers } from '../Redux/Actions/Matches/Matches'
import TableQuinela from './Main/TableQuinela'
import { useNavigate } from 'react-router-dom'
import { UserValidationReducers } from '../Redux/Actions/Users/Users'
import LoadingData from './LoadingData'

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
        await Promise.all([
            rex_prev_matches.length === 0 && dispatch(GetNextPrevMatchesReducers()),
            rex_next_matches.length === 0 && dispatch(GetPrevMatchesReducers())
        ])
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
            ? <div style={{marginTop:"20px"}}>
                <LoadingData />
            </div>
            : <JourneyMatches
                title={"Jornada anterior - Fecha " + rex_prev_matches[0]?.fecfechas.fecjornada}
                data={rex_prev_matches}
                nextMatches={false}
            />
        }
        <TableQuinela/>
        {
            rex_loading_next_matches
            ? <div style={{marginTop:"20px"}}>
                    <LoadingData />
                </div>
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