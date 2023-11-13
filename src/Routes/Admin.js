import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Typography } from 'antd'
import Top from '../Components/Top'
import SelectionJourney from './../Components/Admin/SelectionJourney'
import CloseMatches from './../Components/Admin/CloseMatches'
import { 
    UserValidationReducers 
} from '../Redux/Actions/Users/Users'

const Admin = () => {

	const { Title } = Typography
	const navigate = useNavigate()
	const dispatch = useDispatch()

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