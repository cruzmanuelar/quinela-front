import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GetJourneysReducers, SelectJourneyReducers } from '../../Redux/Actions/Admin/Admin'
import { Button, Select } from 'antd'
import { ToastContainer, toast } from 'react-toastify';
import { LoadingOutlined } from '@ant-design/icons'
import "react-toastify/dist/ReactToastify.css";

const SelectionJourney = () => {

	const dispatch = useDispatch()
	const [journeySelected, setJourneySelected ] = useState(null)
	const [ sendJourney, setSendJourney ] = useState(false)

	const {
        rex_data_journeys,
    } = useSelector(({admin}) => admin)

	const notifyAlert = (message) => toast.warn(message, {
        position: toast.POSITION.TOP_CENTER
    });

	const notifySuccess = (message) => toast.success(message, {
        position: toast.POSITION.TOP_CENTER
    });

	useEffect(()=> {
		if(rex_data_journeys.length = 0){
			dispatch(GetJourneysReducers())
		}
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
				onClick={async () => {
					if(journeySelected){
						setSendJourney(true)
						let {response, message} = await dispatch(SelectJourneyReducers(journeySelected))
						setSendJourney(false)
						if(response){
							notifySuccess(message)
						}else{
							notifyAlert(message)
						}
					}
				}}
			>{sendJourney ? <LoadingOutlined /> : "Actualizar jornada"}</Button>
		</div>
	)
}

export default SelectionJourney