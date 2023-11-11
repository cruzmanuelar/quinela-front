import { Col, InputNumber , Modal, Row } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './../Styles/Components/FormQuinela.css'
import { EditFormQuinelaReducers, SendQuinelaReducers } from '../Redux/Actions/Matches/Matches';
import { LoadingOutlined } from '@ant-design/icons'

const cargarImagen = require.context("/src/Assets/images/icons", true)

const FormQuinela = ({showForm, setShowForm, notifyAlert, notifySuccess}) => {

    const [ sendQuinela, setSendQuinela ] = useState(false)
    const dispatch = useDispatch()

    const {
        rex_next_matches,
    } = useSelector(({matches}) => matches)

    useEffect(() => {

    },[showForm])

    return (
        <Modal
            centered={true}
            title={<div style={{textAlign:'center'}}>Editar Quinela</div>}
            open={showForm}
            closeIcon={null}
            okText={sendQuinela ? <LoadingOutlined/> :'Enviar'}
            cancelText='Cancelar'
            onOk={async () => {
                setSendQuinela(true)
                const {response, message} = await dispatch(SendQuinelaReducers())
                setSendQuinela(false)
                if(response){
                    setShowForm(false)
                    notifySuccess(message)
                }else{
                    notifyAlert(message)
                }
            }}
            confirmLoading={false}
            onCancel={()=> setShowForm(false)}
            className='Modal-Form-Quinela'
        >
            {
                rex_next_matches.length > 0
                ? <>
                    <Row style={{display:'flex', alignItems:'center', marginBottom:'4px'}}>
                        <Col span={8} style={{display:'flex', justifyContent:'end', alignItems:'center'}}>
                            <span>{rex_next_matches[0]['partlocal']['painombre']}</span>
                            <img className='Image-Country' src={cargarImagen(`./${rex_next_matches[0]['partlocal'].paiimagen}`)}/>
                        </Col>
                        <Col span={8} style={{display:'flex', justifyContent:'center', columnGap:'8px'}}>
                            <InputNumber
                                defaultValue={rex_next_matches[0]['predictionLocal']}
                                onChange={(value)=> dispatch(EditFormQuinelaReducers(0, 'predictionLocal', value))}
                                min={0} max={20}
                                disabled={!rex_next_matches[0]["parhabilitado"]}
                            />
                            <InputNumber
                                defaultValue={rex_next_matches[0]['predictionVisitante']}
                                onChange={(value)=> dispatch(EditFormQuinelaReducers(0, 'predictionVisitante', value))}
                                min={0} max={20}
                                disabled={!rex_next_matches[0]["parhabilitado"]}
                            />
                        </Col>
                        <Col span={8} style={{display:'flex', justifyContent:'inital', alignItems:'center'}}>
                        <img className='Image-Country' src={cargarImagen(`./${rex_next_matches[0]['partvisitante'].paiimagen}`)}/><span>{rex_next_matches[0]['partvisitante']['painombre']}</span>
                        </Col>
                    </Row>
                    <Row style={{display:'flex', alignItems:'center', marginBottom:'4px'}}>
                        <Col span={8} style={{display:'flex', justifyContent:'end', alignItems:'center'}}>
                            <span>{rex_next_matches[1]['partlocal']['painombre']}</span><img className='Image-Country' src={cargarImagen(`./${rex_next_matches[1]['partlocal'].paiimagen}`)}/>
                        </Col>
                        <Col span={8} style={{display:'flex', justifyContent:'center', columnGap:'8px'}}>
                            <InputNumber
                                defaultValue={rex_next_matches[1]['predictionLocal']}
                                onChange={(value)=> dispatch(EditFormQuinelaReducers(1, 'predictionLocal', value))}
                                min={0} max={20}
                                disabled={!rex_next_matches[1]["parhabilitado"]}
                            />
                            <InputNumber
                                defaultValue={rex_next_matches[1]['predictionVisitante']}
                                onChange={(value)=> dispatch(EditFormQuinelaReducers(1, 'predictionVisitante', value))}
                                min={0} max={20}
                                disabled={!rex_next_matches[1]["parhabilitado"]}
                            />
                        </Col>
                        <Col span={8} style={{display:'flex', justifyContent:'inital', alignItems:'center'}}>
                        <img className='Image-Country' src={cargarImagen(`./${rex_next_matches[1]['partvisitante'].paiimagen}`)}/><span>{rex_next_matches[1]['partvisitante']['painombre']}</span>
                        </Col>
                    </Row>
                    <Row style={{display:'flex', alignItems:'center', marginBottom:'4px'}}>
                        <Col span={8} style={{display:'flex', justifyContent:'end', alignItems:'center'}}>
                            <span>{rex_next_matches[2]['partlocal']['painombre']}</span><img className='Image-Country' src={cargarImagen(`./${rex_next_matches[2]['partlocal'].paiimagen}`)}/>
                        </Col>
                        <Col span={8} style={{display:'flex', justifyContent:'center', columnGap:'8px'}}>
                            <InputNumber 
                                defaultValue={rex_next_matches[2]['predictionLocal']}
                                onChange={(value)=> dispatch(EditFormQuinelaReducers(2, 'predictionLocal', value))}
                                min={0} max={20}
                                disabled={!rex_next_matches[2]["parhabilitado"]}
                            />
                            <InputNumber
                                defaultValue={rex_next_matches[2]['predictionVisitante']}
                                onChange={(value)=> dispatch(EditFormQuinelaReducers(2, 'predictionVisitante', value))}
                                min={0} max={20}
                                disabled={!rex_next_matches[2]["parhabilitado"]}
                            />
                        </Col>
                        <Col span={8} style={{display:'flex', justifyContent:'inital', alignItems:'center'}}>
                        <img className='Image-Country' src={cargarImagen(`./${rex_next_matches[2]['partvisitante'].paiimagen}`)}/><span>{rex_next_matches[2]['partvisitante']['painombre']}</span>
                        </Col>
                    </Row>
                    <Row style={{display:'flex', alignItems:'center', marginBottom:'4px'}}>
                        <Col span={8} style={{display:'flex', justifyContent:'end', alignItems:'center'}}>
                            <span>{rex_next_matches[3]['partlocal']['painombre']}</span><img className='Image-Country' src={cargarImagen(`./${rex_next_matches[3]['partlocal'].paiimagen}`)}/>
                        </Col>
                        <Col span={8} style={{display:'flex', justifyContent:'center', columnGap:'8px'}}>
                            <InputNumber 
                                defaultValue={rex_next_matches[3]['predictionLocal']}
                                onChange={(value)=> dispatch(EditFormQuinelaReducers(3, 'predictionLocal', value))}
                                min={0} max={20}
                                disabled={!rex_next_matches[3]["parhabilitado"]}
                            />
                            <InputNumber
                                defaultValue={rex_next_matches[3]['predictionVisitante']}
                                onChange={(value)=> dispatch(EditFormQuinelaReducers(3, 'predictionVisitante', value))}
                                min={0} max={20}
                                disabled={!rex_next_matches[3]["parhabilitado"]}
                            />
                        </Col>
                        <Col span={8} style={{display:'flex', justifyContent:'inital', alignItems:'center'}}>
                        <img className='Image-Country' src={cargarImagen(`./${rex_next_matches[3]['partvisitante'].paiimagen}`)}/><span>{rex_next_matches[3]['partvisitante']['painombre']}</span>
                        </Col>
                    </Row>
                    <Row style={{display:'flex', alignItems:'center', marginBottom:'4px'}}>
                        <Col span={8} style={{display:'flex', justifyContent:'end', alignItems:'center'}}>
                            <span>{rex_next_matches[4]['partlocal']['painombre']}</span><img className='Image-Country' src={cargarImagen(`./${rex_next_matches[4]['partlocal'].paiimagen}`)}/>
                        </Col>
                        <Col span={8} style={{display:'flex', justifyContent:'center', columnGap:'8px'}}>
                            <InputNumber
                                defaultValue={rex_next_matches[4]['predictionLocal']}
                                onChange={(value)=> dispatch(EditFormQuinelaReducers(4, 'predictionLocal', value))}
                                min={0} max={20}
                                disabled={!rex_next_matches[4]["parhabilitado"]}
                            />
                            <InputNumber
                                defaultValue={rex_next_matches[4]['predictionVisitante']}
                                onChange={(value)=> dispatch(EditFormQuinelaReducers(4, 'predictionVisitante', value))}
                                min={0} max={20}
                                disabled={!rex_next_matches[4]["parhabilitado"]}
                            />
                        </Col>
                        <Col span={8} style={{display:'flex', justifyContent:'inital', alignItems:'center'}}>
                        <img className='Image-Country' src={cargarImagen(`./${rex_next_matches[4]['partvisitante'].paiimagen}`)}/><span>{rex_next_matches[4]['partvisitante']['painombre']}</span>
                        </Col>
                    </Row>
                </>
                : null
            }
        </Modal>
    )
}

export default FormQuinela