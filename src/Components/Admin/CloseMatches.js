import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GetNextMatchesReducers } from '../../Redux/Actions/Admin/Admin'
import { Row, Col } from 'antd'
import  "./../../Styles/Components/CloseMatches.css"
const cargarImagen = require.context("/src/Assets/images/icons", true)

const CloseMatches = () => {

	const dispatch = useDispatch()


	const {
        rex_data_next_journey,
    } = useSelector(({admin}) => admin)

	useEffect(() => {
		dispatch(GetNextMatchesReducers())
	}, [])

	return (
		<Row className='Container-Close-Matches'>
			{
				rex_data_next_journey.map(jou => {
					return <Col span={24}>
						<Row>
							<Col span={10} style={{textAlign:"end", display:"flex", justifyContent:"end", alignItems:"center"}}>
								<div>{jou.partlocal.painombre}</div><img className='Image-Country' src={cargarImagen(`./${jou.partlocal.paiimagen}`)}/>
							</Col>
							<Col span={4} className='Col-Container-Score'>
								<div className='Container-Score'>{jou.parfinalizado ? `${jou.pargoleslocal} - ${jou.pargolesvisitante}` : "Finalizar"}</div>
							</Col>
							<Col span={10} style={{display:"flex", alignItems:"center"}}>
							<img className='Image-Country' src={cargarImagen(`./${jou.partvisitante.paiimagen}`)}/><div>{jou.partvisitante.painombre}</div>
							</Col>
						</Row>
					</Col>
				})
			}
		</Row>	
	)
}

export default CloseMatches