import React from 'react'
import '../Styles/Components/Header.css'
import { useSelector } from 'react-redux'
import { Button } from 'antd'
import { LogoutOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'

const Top = () => {

  const navigate = useNavigate()

  const {
    rex_users
  } = useSelector(({users}) => users)

  return (
    <div className='Container-Header'>
        <div>La quinela de la bondad</div>
        <Button 
          size='small'
          onClick={()=>{
            navigate('/')
            localStorage.clear()
          }}
        ><LogoutOutlined /></Button>
    </div>
  )
}

export default Top