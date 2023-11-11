import React, { useEffect } from 'react'
import { Typography } from 'antd'
import Top from '../Top'
import SelectionJourney from './SelectionJourney'
import CloseMatches from './CloseMatches'
import { useNavigate } from 'react-router-dom'
import { UserValidationReducers } from '../../Redux/Actions/Users/Users'
import { useDispatch } from 'react-redux'

const Admin = () => {

	const { Title } = Typography
	const navigate = useNavigate()
	const dispatch = useDispatch()

    const userValidation = async () => {
		let response = await dispatch(UserValidationReducers())
		if(!response){
			navigate("/")
		}
		return response
	}

	useEffect(()=> {
		userValidation()
	},[])

    return (
        <div>
			<Top/>
            <div style={{padding:"10px 20px"}}>
				<Title level={4}>Seleccionar próxima jornada</Title>
				<SelectionJourney/>
			</div>
            <div style={{padding:"0 20px"}}>
				<CloseMatches/>
			</div>
        </div>
    )
}

export default Admin