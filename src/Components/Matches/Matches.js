import React, { useEffect, useState } from 'react'
import Top from '../Top'
import { Collapse, Row, Col, Modal, Table } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { GetAllMatchesReducers, GetPredictionsJourneyReducers } from '../../Redux/Actions/Matches/Matches'
import '../../Styles/Components/Matches.css'
const cargarImagen = require.context("/src/Assets/images/icons", true)

const Matches = () => {


    const { Panel } = Collapse
    const dispatch = useDispatch()
    const [ infoMatch, setInfoMatch ] = useState({pailocal:"", paivisitante :"", existJourney: false})

    const [ showPredictions, setShowPredictions] = useState(false)

    const getData = () => {
        dispatch(GetAllMatchesReducers())
    }

    const {
        rex_all_matches,
        rex_predictions_journey
    } = useSelector(({matches}) => matches)

    useEffect(() => {
        getData()
    }, [])

    const showPredicionUsers = async (match) => {
        setShowPredictions(true)
        setInfoMatch({...infoMatch, pailocal : match.partlocal.paiimagen, paivisitante : match.partvisitante.paiimagen, existJourney : true})
        let response = await dispatch(GetPredictionsJourneyReducers(match))
        console.log(match)
    }

    const columns = [
        {
            title: 'Usuario',
            dataIndex: 'usuusuario',
            key: 'usuusuario',
            align: 'center',
            render : (_, record) => (
                <div>
                    {record.usuusuarios.usuusuario}
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
                rex_all_matches.map(dat => (
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
                                                span={4} style={{display:"flex", alignItems : "center", justifyContent:"center", backgroundColor:"#5e2129", color :"#FFFFFF", borderRadius:"4px"}}>
                                                    <span>{mat.pargoleslocal?mat.pargoleslocal : ""} - {mat.pargolesvisitante?mat.pargolesvisitante : ""}</span>
                                                </Col>
                                                <Col span={10} style={{display:"flex", alignItems : "center"}}>
                                                    <img className='Image-Country' src={cargarImagen(`./${mat.partvisitante.paiimagen}`)}/>
                                                    <span>{mat.partvisitante.painombre}</span>
                                                </Col>
                                            </Row>
                                        ))
                                    }
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
                    rex_predictions_journey.length > 0
                    ?   <>
                        <Table
                            size='small'
                            columns={columns}
                            dataSource={rex_predictions_journey}
                            className='Table-Quinela'
                            rowClassName={(record)=> {
                                let resultOk = record.pruresultado == record.parpartidos.parresultado

                                return resultOk ? "Color-Succes" : "Color-Wrong"
                            }}
                        />
                        <div style={{display:"flex", alignItems:"center", columnGap:"5px", color:"#5e2129", fontWeight:"500"}}>
                            <div>Resultado:</div>
                            <div className='Box-Prediction-Ok'></div><span>Acertó</span>
                            <div className='Box-Prediction-Failed'></div><span>Falló</span>
                        </div>
                        </>
                : null
                }
            </Modal>
        </>
    )
}

export default Matches