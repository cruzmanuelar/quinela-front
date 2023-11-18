import { Table, Typography, Modal, Select } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GetScoreUsersJourneyReducers, GetScoreUsersReducers } from '../Redux/Actions/Users/Users'
import '../Styles/Components/TableQuinela.css'
import {
    UserOutlined,
    QuestionCircleOutlined
} from "@ant-design/icons"
import { GetJourneysReducers } from '../Redux/Actions/Admin/Admin'

const TableQuinela = () => {

    const dispatch = useDispatch()
    const [ loadingData, setLoadingData ] = useState(false)
    const { Title } = Typography
    const [ showModalPoints, setShowModalPoints ] = useState(false)

    const [ filterJourney, setFilterJourney ] = useState("Todas")
    
    const {
        rex_data_journeys,
    } = useSelector(({admin}) => admin)

    const {
        rex_score_users,
    } = useSelector(({users}) => users)

    
    const getDataScore = async () => {
        setLoadingData(true)
        let response = await dispatch(GetScoreUsersReducers())
        if(rex_data_journeys.length == 0){
            let responseJourneys = await dispatch(GetJourneysReducers())
        }
        setLoadingData(false)
    }

    const getFilterJourney = async (value) => {
        setLoadingData(true)
        let response = await dispatch(GetScoreUsersJourneyReducers(value))
        setLoadingData(false)
    }

    const titleColumnQuinela = (title) => {
        return <div 
                    style={{display:"flex", columnGap:"5px", justifyContent:"center", cursor:"pointer"}}
                    onClick={()=>setShowModalPoints(true)}
                >
                    {title}<QuestionCircleOutlined style={{fontSize:"14px"}}/>
                </div>
    }
    
    useEffect(()=> {
        getDataScore()
    }, [])

    const columns = [
        {
            title: 'Usuario',
            dataIndex: 'user',
            key: 'user',
            align: 'center',
            render : (_, record) => (
                <div style={{width:"100%", display:"flex", justifyContent:"center", columnGap:"3px"}}>
                        <UserOutlined />{record.user}
                </div>
            )
        },
        {
            title: titleColumnQuinela("Bono resultado"),
            dataIndex: 'ptosResult',
            key: 'ptosResult',
            align: 'center',
        },
        {
            title: titleColumnQuinela("Bono marcador"),
            dataIndex: 'ptosScore',
            key: 'ptosScore',
            align: 'center',
        },
        {
            title: titleColumnQuinela("Bono goles"),
            dataIndex: 'ptosGoals',
            key: 'ptosGoals',
            align: 'center',
        },
        {
            title: titleColumnQuinela("Total"),
            dataIndex: 'ptosTotal',
            key: 'ptosTotal',
            align: 'center',
        },
    ]
    return (
        <div className='Container-Table-Quinela'>
            <Title className='Title-Table-Quinela' level={4}>Tabla de posiciones</Title>
            <div style={{margin:"10px 10px", display:"flex", alignItems:"center", columnGap:"10px"}}>
                <span>Filtrar por fecha:</span>
                <Select
                    style={{width:"200px"}}
                    value={filterJourney}
                    size='small'
                    options={rex_data_journeys}
                    allowClear={true}
                    onClear={() => {
                        dispatch(GetScoreUsersReducers())
                    }}
                    onChange={(value) => {
                        const labelFilter = rex_data_journeys.find(jou => jou.value == value)
                        if(labelFilter){
                            setFilterJourney(labelFilter.label)
                            getFilterJourney(value)
                        }else{
                            setFilterJourney("Todas")
                        }
                    }}
                    
                >

                </Select>
            </div>
            <Table
                loading={loadingData}
                columns={columns}
                pagination={{
                    position: ['bottomRight'],
                }}
                className='Table-Quinela'
                size='small'
                dataSource={rex_score_users}
            />
            <Modal
                title={<div style={{textAlign:'center'}}>Sistema de puntuacion</div>}
                open={showModalPoints}
                closeIcon={null}
                footer={null}
                width={420}
                onCancel={()=> setShowModalPoints(false)}
                className='Modal-Form-Quinela Modal-Positions'
            >
                <div style={{display:"flex", justifyContent:"center", flexDirection:"column", textAlign:"center", color:"#5e2129"}}>
                    <div>
                        <span style={{fontWeight:"bold"}}>Bono resultado:</span> Acierto de ganador o empate: +3ptos
                    </div>
                    <div>
                        <span style={{fontWeight:"bold"}}>Bono marcador:</span> Acierto de goles exactos del partido: +2ptos
                    </div>
                    <div>
                        <span style={{fontWeight:"bold"}}>Bono goles:</span> Acierto de goles de algún equipo: +1pto
                    </div>
                    <div>
                        <span style={{fontWeight:"bold"}}>Total:</span> Bono resultado + Bono marcador + Bono goles
                    </div>

                    <div style={{display:"flex", flexDirection:"column", margin:"10px 0"}}>
                        <span>Puntaje minimo: 0ptos por partido</span>
                        <span>Puntaje maximo: 7ptos por partido</span>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default TableQuinela