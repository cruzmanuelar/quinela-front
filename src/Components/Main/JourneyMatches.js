import { Col, Row, Collapse, Button } from 'antd'
import React, { useState } from 'react'
import "./../../Styles/Components/JourneyMatches.css"
import FormQuinela from './FormQuinela';
import { useSelector } from 'react-redux'
import {
    AlertOutlined
} from "@ant-design/icons"
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
const cargarImagen = require.context("/src/Assets/images/icons", true);

const JourneyMatches = ({title, data, nextMatches}) => {

    
    const { Panel } = Collapse
    const [ showPredictions, setShowPredictions ] = useState(false)
    const [ showForm, setShowForm ] = useState(false)

    const notifyAlert = (message) => toast.warn(message, {
        position: toast.POSITION.TOP_CENTER
    });

    const {
        rex_send_form_quinela,
    } = useSelector(({matches}) => matches)

	const notifySuccess = (message) => toast.success(message, {
        position: toast.POSITION.TOP_CENTER
    });

    return (

        <div>
            {
                data.length > 0
                ? <Collapse defaultActiveKey={['1']} onChange={()=> console.log("ojk")}
                className='Collapse-Journey-Matches'>
                <Panel header={title} key="1">
                    <>
                        {
                            nextMatches
                            ? <div className='Container-Button-Add'>
                                <Button onClick={()=> setShowForm(true)} className='Button-Add-Quinela'>
                                    {rex_send_form_quinela ? "Actualizando" : "Editar Quinela"}
                                    </Button>
                            </div>
                            : <div className='Container-Button-Add'>
                                <Button onClick={() => setShowPredictions(!showPredictions)} className='Button-Add-Quinela'>{`${showPredictions ? "Ocultar" : "Mostrar"} mi ultima prediccion`}</Button>
                            </div>
                        }
                        {
                            data.map(dat => {
                                return <Row className='Container-Match'>
                                    <Col span={9} className='Container-Country-Shield Left'>
                                    {dat.partlocal.painombre}<img className='Image-Country' src={cargarImagen(`./${dat.partlocal.paiimagen}`)}
                                        />
                                    </Col>
                                    <Col style={{display:'flex', flexDirection:'column', justifyContent:'center'}} span={6}>
                                        {
                                            nextMatches
                                            ?  <div style={{display:"flex", flexDirection:"column"}}>
                                                <div><AlertOutlined style={{cursor:"pointer",
                                                    color : `${dat.done ? "black":"red"}`
                                                }}/></div>
                                                <div style={{width:'100%'}}>
                                                    <div className='Container-Score Info-Matches'>
                                                    {dat.predictionLocal} - {dat.predictionVisitante}</div>
                                                </div>
                                            </div>
                                                
                                            : <div style={{width:'100%'}}>
                                                <div className='Container-Score'>{dat.pargoleslocal} - {dat.pargolesvisitante}</div>
                                            </div>
                                        }
                                        
                                        {
                                            nextMatches
                                            ?null
                                            : <div className={`Container-Prediction ${showPredictions ? "Show": "Hidden"}`}>
                                                    <div className='Container-Prediction-Score'>{dat.predictionLocal != null ? dat.predictionLocal : ""} - {dat.predictionVisitante != null ? dat.predictionVisitante : ""}</div>
                                                </div>
                                                
                                        }

                                    </Col>
                                    <Col span={9} className='Container-Country-Shield Right'>
                                        <img className='Image-Country' src={cargarImagen(`./${dat.partvisitante.paiimagen}`)}/>{dat.partvisitante.painombre}
                                    </Col>
                                </Row>
                            })
                        }
                    </>
                </Panel>
            </Collapse>
                : null
            }
            <ToastContainer/>
            <FormQuinela
                showForm={showForm}
                setShowForm={setShowForm}
                notifyAlert={(message)=> notifyAlert(message)}
                notifySuccess={(message)=> notifySuccess(message)}
            />
        </div> 
    )
}

export default JourneyMatches