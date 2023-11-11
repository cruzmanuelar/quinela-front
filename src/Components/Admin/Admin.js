import React from 'react'
import { Typography } from 'antd'
import Top from '../Top'
import SelectionJourney from './SelectionJourney'
import CloseMatches from './CloseMatches'

const Admin = () => {

	const { Title } = Typography


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