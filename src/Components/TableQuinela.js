import { Table, Typography, Pagination, Select } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GetScoreUsersJourneyReducers, GetScoreUsersReducers } from '../Redux/Actions/Users/Users'
import '../Styles/Components/TableQuinela.css'
import {
    UserOutlined,
    FireOutlined
} from "@ant-design/icons"
import { GetJourneysReducers } from '../Redux/Actions/Admin/Admin'

const TableQuinela = () => {

    const dispatch = useDispatch()
    const [ loadingData, setLoadingData ] = useState(false)
    const { Title } = Typography

    const [ filterJourney, setFilterJourney ] = useState("Todas")

    
    const getDataScore = async () => {
        setLoadingData(true)
        await dispatch(GetScoreUsersReducers())
        await dispatch(GetJourneysReducers())
        setLoadingData(false)
    }

    const {
        rex_data_journeys,
    } = useSelector(({admin}) => admin)

    const {
        rex_score_users,
    } = useSelector(({users}) => users)

    const getFilterJourney = async (value) => {
        dispatch(GetScoreUsersJourneyReducers(value))
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
            title: 'Bono resultado',
            dataIndex: 'ptosResult',
            key: 'ptosResult',
            align: 'center',
        },
        {
            title: 'Bono marcador',
            dataIndex: 'ptosScore',
            key: 'ptosScore',
            align: 'center',
        },
        {
            title: 'Bono goles',
            dataIndex: 'ptosGoals',
            key: 'ptosGoals',
            align: 'center',
        },
        {
            title: 'Total',
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
        </div>
    )
}

export default TableQuinela