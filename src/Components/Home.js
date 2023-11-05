import React, { useEffect, useState } from 'react'
import JourneyMatches from './JourneyMatches'
import { useDispatch, useSelector } from 'react-redux'
import { GetNextPrevMatchesReducers } from '../Redux/Actions/Matches/Matches'
import TableQuinela from './TableQuinela'


const Home = () => {
    
    const dispatch = useDispatch()
    const [loadingData, setLoadingData ] = useState(false)

    const {
        rex_next_matches,
        rex_prev_matches
    } = useSelector(({matches}) => matches)

    const getData = async () => {
        setLoadingData(true)
        await dispatch(GetNextPrevMatchesReducers())
        setLoadingData(false)
    }

    useEffect(()=>{
        getData()
    },[])

    return (
    <>
        <JourneyMatches
            title={"Jornada anterior"}
            data={rex_prev_matches}
            nextMatches={false}
        />
        <TableQuinela
            loadingData={loadingData}
        />
        <JourneyMatches
            title={"Jornada siguiente"}
            data={rex_next_matches}
            nextMatches={true}
        />

    </>
  )
}

export default Home