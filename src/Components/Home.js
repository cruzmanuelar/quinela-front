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
    const [loadingData, setLoadingData ] = useState(false)
    const navigate = useNavigate()

    const {
        rex_next_matches,
        rex_prev_matches
    } = useSelector(({matches}) => matches)

    const getData = async () => {
        setLoadingData(true)
        try {
            await Promise.all([
              dispatch(GetNextPrevMatchesReducers()),
              dispatch(GetPrevMatchesReducers())
            ]);        
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoadingData(false);
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
            loadingData
            ? <Skeleton active />
            : <JourneyMatches
                title={"Jornada anterior - Fecha " + rex_prev_matches[0]?.fecfechas.fecjornada}
                data={rex_prev_matches}
                nextMatches={false}
            />
        }
        
        <TableQuinela/>
        {
            loadingData
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