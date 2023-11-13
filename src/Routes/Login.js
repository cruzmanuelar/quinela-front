import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Select, Typography, Button, Modal, Input, Spin } from 'antd'
import './../Styles/Login.css'
import { GetUsersReducers, LoginUserReducers } from '../Redux/Actions/Users/Users'
import {
    CloseOutlined
} from "@ant-design/icons"
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const Login = () => {

    const { Option } = Select
    const { Title } = Typography
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [ showModalConfirm, setShowModalConfirm ] = useState(false)
    const [confirmLoading, setConfirmLoading] = useState(false)
    const [ usuLogin, setUsuLogin ] = useState(
        {
            usuemail: "",
            usupassword : ""
        }
    )
    const [ loadingUsers, setLoadingUsers ] = useState(false)

    const {
        rex_data_users
    } = useSelector(({users}) => users)

    const notify = (message) => toast.warn(message, {
        position: toast.POSITION.TOP_CENTER
    });

    const getDataUsers = async () => {
        setLoadingUsers(true)
        await dispatch(GetUsersReducers())
        setLoadingUsers(false)
    }

    const loginUser = async () => {
        setConfirmLoading(true)
        const { response, message } = await dispatch(LoginUserReducers(usuLogin))
        setConfirmLoading(false)
        if(response){
            navigate('/home')
        }else{
            console.log("response")
            console.log(response)
            setShowModalConfirm(false)
            notify(message)
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
            <div style={{display:"flex", rowGap:"10px", flexDirection:"column"}}>
                {
                    loadingUsers
                    ? <div style={{display:"flex", flexDirection:"column", rowGap:"10px"}}>
                        <Spin size='large'></Spin>
                        <span style={{color:"white", fontSize:"18px"}}>Cargando usuarios</span>
                    </div>
                    : <>
                        <Select
                            placeholder='Seleccione su usuario'
                            style={{ width:'200px'}}
                            onChange={(value)=> {
                                setUsuLogin({...usuLogin, usuemail : value})
                            }}
                        >
                            {
                            rex_data_users.map(usu => (
                                <Option value={usu.usuusuario}>{usu.usuusuario}</Option>
                            ))
                            }
                        </Select>
                        <Input.Password
                            style={{ width:'200px'}}
                            onChange={(e)=> {
                                setUsuLogin({...usuLogin, usupassword : e.target.value})
                            }}
                            placeholder="Clave"
                        />
                        <Button
                            onClick={()=> {
                                setShowModalConfirm(true)
                            }}
                            className='Button-Login'
                        >Ingresar</Button>
                    </>
                }
                

            </div>
            <ToastContainer/>
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
                <p>Desea ingresar como: {usuLogin.usuemail}?</p>
            </Modal>
        </div>
    )
}

export default Login