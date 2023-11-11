import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GetJourneysReducers, SelectJourneyReducers } from '../../Redux/Actions/Admin/Admin'
import { Button, Select } from 'antd'

const SelectionJourney = () => {

	const dispatch = useDispatch()
	const [journeySelected, setJourneySelected ] = useState(null)

	const {
        rex_data_journeys,
    } = useSelector(({admin}) => admin)

	useEffect(()=> {
		dispatch(GetJourneysReducers())
	}, [])

	return (
		<div style={{display:"flex", flexDirection:"column", justifyContent:"center"}}>
			<Select
				style={{width:"100%", marginBottom:"10px"}}
				options={rex_data_journeys}
				placeholder="Seleccionar jornada"
				onChange={(value) => {
					setJourneySelected(value)
				}}
			/>
			<Button
				type="primary" 
				style={{width:"100%"}}
				onClick={() => {
					if(journeySelected){
						dispatch(SelectJourneyReducers(journeySelected))
					}
				}}
			>Actualizar jornada</Button>
		</div>
	)
}

export default SelectionJourney