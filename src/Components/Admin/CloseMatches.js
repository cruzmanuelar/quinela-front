import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GetNextMatchesReducers } from '../../Redux/Actions/Admin/Admin'
import { Row, Col, Modal, Typography, InputNumber } from 'antd'
import  "./../../Styles/Components/CloseMatches.css"
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { CloseMatchReducers } from '../../Redux/Actions/Matches/Matches'
const cargarImagen = require.context("/src/Assets/images/icons", true)


const CloseMatches = () => {

	const dispatch = useDispatch()
	const [ closeMatch, setCloseMatch ] = useState(null)
	const [ showCloseMatch, setShowCloseMatch ] = useState(false)
	const { Title } = Typography

	const {
        rex_data_next_journey,
    } = useSelector(({admin}) => admin)

	const notifyAlert = (message) => toast.warn(message, {
        position: toast.POSITION.TOP_CENTER
    });

	const notifySuccess = (message) => toast.success(message, {
        position: toast.POSITION.TOP_CENTER
    });

	const sendCloseMatch = async () => {
		console.log(closeMatch)
		if( !Number.isInteger(closeMatch.pargoleslocal) || !Number.isInteger(closeMatch.pargolesvisitante) ){
			notifyAlert("Resultado invalido")
			return false
		}

		let { response, message } = await dispatch(CloseMatchReducers(closeMatch))
		if(response){
			notifySuccess(message)
			setShowCloseMatch(false)
			setCloseMatch({...closeMatch, pargoleslocal : null, pargolesvisitante: null})
		}else{
			notifyAlert(message)
		}
	}

	useEffect(() => {
		dispatch(GetNextMatchesReducers())
	}, [])

	useEffect(() => {
		dispatch(GetNextMatchesReducers())
	}, [])

	return (
		<Row className='Container-Close-Matches'>
			{
				rex_data_next_journey.map(jou => {
					return <Col span={24}>
						<Row>
							<Col span={8} style={{textAlign:"end", display:"flex", justifyContent:"end", alignItems:"center"}}>
								<div>{jou.partlocal.painombre}</div><img className='Image-Country' src={cargarImagen(`./${jou.partlocal.paiimagen}`)}/>
							</Col>
							<Col span={8} className='Col-Container-Score'>
								<div 
									className='Container-Score'
									onClick={() => {
										if(!jou.parfinalizado){
											setCloseMatch({...jou, pargoleslocal : 0, pargolesvisitante: 0})
											setShowCloseMatch(true)
										}
									}}
								>
									{jou.parfinalizado ? `${jou.pargoleslocal} - ${jou.pargolesvisitante}` : "Finalizar"}
								</div>
							</Col>
							<Col span={8} style={{display:"flex", alignItems:"center"}}>
							<img className='Image-Country' src={cargarImagen(`./${jou.partvisitante.paiimagen}`)}/><div>{jou.partvisitante.painombre}</div>
							</Col>
						</Row>
					</Col>
				})
			}
			<Modal
				open={showCloseMatch}
				onCancel={() => {
					setShowCloseMatch(false)
				}}
				title="Finalizar partido"
				okText="Aceptar"
				cancelText="Cancelar"
				className='Modal-Close-Match'
				centered={true}
				onOk={ () => sendCloseMatch()}
				confirmLoading={false}
			>
				<div>
					<Row style={{marginBottom:"20px"}}>
						<Col span={8} style={{textAlign:"end", display:"flex", justifyContent:"end", alignItems:"center"}}>
								<div>{closeMatch?.partlocal.painombre}</div>
								{
									closeMatch &&
									<img className='Image-Country' src={cargarImagen(`./${closeMatch?.partlocal.paiimagen}`)}/>
								}
						</Col>
						<Col span={8} >
							<div 
							style={{display:"flex", flexDirection:"row", columnGap:"10px"}}
							>
                            <InputNumber
                                onChange={(value)=> {
									setCloseMatch({...closeMatch, pargoleslocal : value})
								}}
								value={closeMatch?.pargoleslocal}
                                min={0} max={20}
                            />
							<InputNumber
                                onChange={(value)=> {
									setCloseMatch({...closeMatch, pargolesvisitante : value})
								}}
								value={closeMatch?.pargolesvisitante}
                                min={0} max={20}
                            />
							</div>
						</Col>
						<Col span={8} style={{display:"flex", alignItems:"center"}}>
							{closeMatch &&
								<img className='Image-Country' src={cargarImagen(`./${closeMatch?.partvisitante.paiimagen}`)}/>
							}
						
						<div>{closeMatch?.partvisitante.painombre}</div>
						</Col>
					</Row>
					<span style={{padding:"0 20px"}}>* Esta accion es irreversible</span>
				</div>
			</Modal>
			<ToastContainer />
		</Row>	
	)
}

export default CloseMatches