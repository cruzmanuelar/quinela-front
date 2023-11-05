import { Select, Typography, Button, Modal } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GetUsersReducers, LoginUserReducers } from '../Redux/Actions/Users/Users'
import './../Styles/Components/Login.css'
import { useNavigate } from 'react-router-dom'
import {
    CloseOutlined
} from "@ant-design/icons"

const Login = () => {

    const { Option } = Select
    const { Title } = Typography
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [ showModalConfirm, setShowModalConfirm ] = useState(false)
    const [confirmLoading, setConfirmLoading] = useState(false)
    const [ usuLogin, setUsuLogin ] = useState('')

    const {
        rex_data_users
    } = useSelector(({users}) => users)

    const getDataUsers = async () => {
        await dispatch(GetUsersReducers())
    }

    const loginUser = async () => {
        setConfirmLoading(true)
        const response = await dispatch(LoginUserReducers(usuLogin))
        setConfirmLoading(false)
        if(response){
            navigate('/home')
        }
    }

    useEffect(()=> {
        getDataUsers()
    }, [])

    return (
        <div style={{display:'flex', height:'100vh', alignItems:'center', justifyContent:'center', flexDirection:'column', backgroundColor:'#5e2129'}}>
            <img
                className='Image-Login'
                src='https://pbs.twimg.com/media/E3DLL1NXMAA4OkS.jpg'
            />
            <Title style={{color:'#FFFFFF'}} level={2}>
                La polla de la bondad
            </Title>
            <Select
                placeholder='Seleccione su usuario'
                style={{ width:'200px'}}
                onChange={(value)=> setUsuLogin(value)}
            >
                {
                rex_data_users.map(usu => (
                    <Option value={usu.usuusuario}>{usu.usuusuario}</Option>
                ))
                }
            </Select>
            <Button
                onClick={()=> {
                    if(usuLogin){
                        setShowModalConfirm(true)
                    }
                }}
                className='Button-Login'>Ingresar</Button>
            <Modal
                centered={true}
                title="Confirmar"
                closeIcon={<CloseOutlined style={{color:"white"}}/>}
                open={showModalConfirm}
                okText='Aceptar'
                width={400}
                cancelText='Cancelar'
                className='Modal-Confirm-Login'
                onOk={() => loginUser()}
                confirmLoading={confirmLoading}
                onCancel={()=>setShowModalConfirm(false)}
            >
                <p>Desea ingresar como: {usuLogin}?</p>
            </Modal>
        </div>
    )
}

export default Login