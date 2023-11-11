import React, { useEffect, useState } from 'react'
import JourneyMatches from './JourneyMatches'
import { useDispatch, useSelector } from 'react-redux'
import { GetNextPrevMatchesReducers } from '../Redux/Actions/Matches/Matches'
import TableQuinela from './TableQuinela'
import { Skeleton } from 'antd'

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