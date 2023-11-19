import { Col, InputNumber , Modal, Row, Tooltip, Popover } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './../../Styles/Components/FormQuinela.css'
import { EditFormQuinelaReducers, SendQuinelaReducers } from '../../Redux/Actions/Matches/Matches';
import { LoadingOutlined } from '@ant-design/icons'

const cargarImagen = require.context("/src/Assets/images/icons", true)

const FormQuinela = ({showForm, setShowForm, notifyAlert, notifySuccess}) => {

    const [ sendQuinela, setSendQuinela ] = useState(false)
    const dispatch = useDispatch()

    const {
        rex_next_matches,
    } = useSelector(({matches}) => matches)

    const contentLastMatches = (lastMatches) => {
        return <div className="Container-Last-Games">
            
            {
                lastMatches.map(last => {
                    return <Tooltip
                                placement="bottom" 
                                title={last.infoMatch}
                                overlayInnerStyle={{background:"gray"}}
                            >
                                <div className={last.class} style={{cursor:"pointer"}}>
                                    {
                                        last.info == "draw" 
                                        ? "E" 
                                        : last.info == "win" 
                                            ? "G" 
                                            : last.info == "lost" 
                                                ? "P" 
                                                : "?"                            
                                    }
                                </div>
                            </Tooltip>
                })
            }
        </div>
    }

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
                    {
                        rex_next_matches.map((next, index) => {
                            return <Row style={{display:'flex', alignItems:'center', marginBottom:'4px'}}>
                                        <Col span={8} style={{display:'flex', justifyContent:'end', alignItems:'center'}}>
                                            <Popover
                                                content={()=>contentLastMatches(rex_next_matches[index]['partlocal']['lastMatches'])} 
                                                trigger="click"
                                                placement="bottom"
                                                arrow={false}
                                                overlayInnerStyle={{backgroundColor:"#5e2129"}}
                                                overlayClassName="PopOver-Last-Games"
                                            >
                                                <div className="Container-Flex-Center Container-Quinela">
                                                    <span>{rex_next_matches[index]['partlocal']['painombre']}</span>
                                                    <img className='Image-Country' src={cargarImagen(`./${rex_next_matches[index]['partlocal'].paiimagen}`)}/>
                                                </div>
                                            </Popover>
                                        </Col>
                                        <Col span={8} style={{display:'flex', justifyContent:'center', columnGap:'8px'}}>
                                            <InputNumber
                                                defaultValue={rex_next_matches[index]['predictionLocal']}
                                                onChange={(value)=> dispatch(EditFormQuinelaReducers(index, 'predictionLocal', value))}
                                                min={0} max={20}
                                                disabled={!rex_next_matches[index]["parhabilitado"]}
                                            />
                                            <InputNumber
                                                defaultValue={rex_next_matches[index]['predictionVisitante']}
                                                onChange={(value)=> dispatch(EditFormQuinelaReducers(index, 'predictionVisitante', value))}
                                                min={0} max={20}
                                                disabled={!rex_next_matches[index]["parhabilitado"]}
                                            />
                                        </Col>
                                        <Col span={8} style={{display:'flex', justifyContent:'inital', alignItems:'center'}}>
                                            <Popover
                                                content={()=>contentLastMatches(rex_next_matches[index]['partvisitante']['lastMatches'])} 
                                                trigger="click"
                                                placement="bottom"
                                                overlayInnerStyle={{backgroundColor:"#5e2129"}}
                                                arrow={false}
                                                overlayClassName="PopOver-Last-Games"
                                            >
                                                <div className="Container-Flex-Center Container-Quinela">
                                                    <img className='Image-Country' src={cargarImagen(`./${rex_next_matches[index]['partvisitante'].paiimagen}`)}/><span>{rex_next_matches[index]['partvisitante']['painombre']}</span>
                                                </div>
                                            </Popover>
                                        </Col>
                            </Row>
                        })
                    }
                </>
                : null
            }
            <div style={{color:"#5e2129"}}>
                * Click en el pais para ver sus ultimos resultados
            </div>
        </Modal>
    )
}

export default FormQuinela