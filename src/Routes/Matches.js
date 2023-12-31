import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Collapse, Row, Col, Modal, Table, Spin } from 'antd'
import Top from '../Components/Top'
import { 
    GetAllMatchesReducers,
    GetPredictionsJourneyReducers
} from '../Redux/Actions/Matches/Matches'
import { UserValidationReducers } from '../Redux/Actions/Users/Users'
import '../Styles/Matches.css'
import {
    ArrowUpOutlined,
    FireOutlined
} from "@ant-design/icons"
import LoadingData from '../Components/LoadingData'
const cargarImagen = require.context("/src/Assets/images/icons", true)

const Matches = () => {


    const { Panel } = Collapse
    const dispatch = useDispatch()
	const navigate = useNavigate()
    const [ infoMatch, setInfoMatch ] = useState({pailocal:"", paivisitante :"", existJourney: false})
    const [ loadingData, setLoadingData ] = useState(false)
    const [ loadingPredictions, setLoadingPredictions ] = useState(false)

    const [ showPredictions, setShowPredictions] = useState(false)

    const getData = async() => {
        setLoadingData(true)
        let response = await dispatch(GetAllMatchesReducers())
        setLoadingData(false)
    }

    const {
        rex_all_matches,
        rex_predictions_journey
    } = useSelector(({matches}) => matches)

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

    useEffect(() => {
        getData()
    }, [])

    const showPredicionUsers = async (match) => {
        setShowPredictions(true)
        setInfoMatch({...infoMatch, pailocal : match.partlocal.paiimagen, paivisitante : match.partvisitante.paiimagen, existJourney : true})
        setLoadingPredictions(true)
        let response = await dispatch(GetPredictionsJourneyReducers(match))
        setLoadingPredictions(false)
    }

    const IconOnFire = () => {
        return <FireOutlined style={{color : "red"}}/>
    }

    const columns = [
        {
            title: 'Usuario',
            dataIndex: 'usuusuario',
            key: 'usuusuario',
            align: 'center',
            render : (_, record) => (
                <div style={{display:"flex", columnGap :"5px", justifyContent:"center"}}>
                    {record.usuusuarios.usuusuario}
                    {record.onFire && <IconOnFire/>}
                </div>
            )
        },
        {
            title: <div className='Container-Header-Prediction'>
                {infoMatch.existJourney
                ?<img className='Image-Country-Prediction' src={cargarImagen(`./${infoMatch.pailocal}`)}/>
                :null
                }
                </div>,
            dataIndex: 'prugoleslocal',
            key: 'prugoleslocal',
            align: 'center',
            render : (_, record) => (
                <div>
                    {record.prugoleslocal}
                </div>
            )
        },
        {
            title: <div className='Container-Header-Prediction'>
                {infoMatch.existJourney
                ?<img className='Image-Country-Prediction' src={cargarImagen(`./${infoMatch.paivisitante}`)}/>
                : null
                }
                </div>,
            dataIndex: 'prugolesvisitante',
            key: 'prugolesvisitante',
            align: 'center',
            render : (_, record) => (
                <div>
                    {record.prugolesvisitante}
                </div>
            )
        },
    ]

    return (
        <>
            <Top/>
            <Row>
                {
                    loadingData
                    ?   <Col span={24} style={{marginTop:"100px", display:"flex", alignItems:"center", flexDirection:"column", justifyContent:"center"}}>
                            <Spin size="large">
                            </Spin>
                            <span style={{color:"#5e2129"}}>Cargando...</span>
                        </Col>
                        
                    : rex_all_matches.map(dat => (
                        <Col span={24}>
                            <Collapse
                            >
                                <Panel header={dat.title + " - " + dat.description} key="1">
                                    {
                                        dat.data.map(mat => (
                                            <Row style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
                                                <Col span={10} style={{display:"flex", alignItems : "center", justifyContent:"end"}}
                                                    onClick={()=>        console.log(rex_predictions_journey)
                                                    }
                                                >

                                                    <span>{mat.partlocal.painombre}</span><img className='Image-Country' src={cargarImagen(`./${mat.partlocal.paiimagen}`)}/>
                                                    
                                                </Col>
                                                <Col 
                                                    onClick={() => {
                                                        showPredicionUsers(mat)
                                                    }}
                                                span={4} style={{display:"flex", alignItems : "center", justifyContent:"center", backgroundColor:"#5e2129", color :"#FFFFFF", borderRadius:"4px", cursor:"pointer"}}>
                                                    <span>{mat.parfinalizado?mat.pargoleslocal : ""} - {mat.parfinalizado?mat.pargolesvisitante : ""}</span>
                                                </Col>
                                                <Col span={10} style={{display:"flex", alignItems : "center"}}>
                                                    <img className='Image-Country' src={cargarImagen(`./${mat.partvisitante.paiimagen}`)}/>
                                                    <span>{mat.partvisitante.painombre}</span>
                                                </Col>
                                            </Row>
                                        ))
                                    }
                                    <Row>
                                        <Col span={24}>
                                            <div className='Text-Information-Matches'>
                                            <ArrowUpOutlined />Click para ver predicciones
                                            </div>
                                        </Col>
                                    </Row>
                                </Panel>
                            </Collapse>
                        </Col>
                ))
                }
            </Row>
            <Modal
                title={<div style={{textAlign:'center'}}>Predicciones</div>}
                open={showPredictions}
                closeIcon={null}
                footer={null}
                width={800}
                onCancel={()=> setShowPredictions(false)}
                className='Modal-Form-Quinela'
            >
                {
                    !loadingPredictions
                    ?   <>
                            <div style={{display:"flex", columnGap:"3px"}}>
                                <span style={{ color:"#5e2129", fontWeight:"500"}}>Marcador: <IconOnFire/> Acertó</span>
                            </div>
                            <div style={{display:"flex", alignItems:"center", columnGap:"5px", color:"#5e2129", fontWeight:"500"}}>
                                <div>Resultado:</div>
                                <div className='Box-Prediction-Ok'></div><span>Acertó</span>
                                <div className='Box-Prediction-Failed'></div><span>Falló</span>
                            </div>
                            <Table
                                size='small'
                                columns={columns}
                                dataSource={rex_predictions_journey}
                                className='Table-Quinela'
                                rowClassName={(record)=> {
                                    let resultOk = ""
                                    if(record.parpartidos.parfinalizado){
                                        resultOk = record.pruresultado == record.parpartidos.parresultado
                                        return resultOk ? "Color-Succes" : "Color-Wrong"
                                    }
                                    return resultOk

                                }}
                            />
                        </>
                        : <LoadingData margin="20px"/>
                }
                
            </Modal>
        </>
    )
}

export default Matches