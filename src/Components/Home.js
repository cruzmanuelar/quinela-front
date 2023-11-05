import React, { useEffect } from 'react'
import JourneyMatches from './JourneyMatches'
import { useDispatch, useSelector } from 'react-redux'
import { GetNextPrevMatchesReducers } from '../Redux/Actions/Matches/Matches'
import TableQuinela from './TableQuinela'


const Home = () => {
    
    const dispatch = useDispatch()

    const {
        rex_next_matches,
        rex_prev_matches
    } = useSelector(({matches}) => matches)

    const getData = async () => {
        await dispatch(GetNextPrevMatchesReducers())
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
        <TableQuinela/>
        <JourneyMatches
            title={"Jornada siguiente"}
            data={rex_next_matches}
            nextMatches={true}
        />

    </>
  )
}

export default Home