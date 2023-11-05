import { Table, Typography, Pagination } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GetScoreUsersReducers } from '../Redux/Actions/Users/Users'
import '../Styles/Components/TableQuinela.css'
import {
    UserOutlined,
    FireOutlined
} from "@ant-design/icons"

const TableQuinela = () => {

    const dispatch = useDispatch()
    const { Title } = Typography

    
    const getDataScore = async () => {
        await dispatch(GetScoreUsersReducers())
    }

    const {
        rex_score_users,
    } = useSelector(({users}) => users)

    
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
                        {record.key == 1 && <FireOutlined style={{color:"red"}}/>}             
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
            <Table
                columns={columns}
                pagination={{
                    position: ['topCenter'],
                }}
                className='Table-Quinela'
                size='small'
                dataSource={rex_score_users}
            />
        </div>
    )
}

export default TableQuinela