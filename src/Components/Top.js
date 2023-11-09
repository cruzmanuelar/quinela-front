import React, { useState } from 'react'
import '../Styles/Components/Header.css'
import { useSelector } from 'react-redux'
import { Button, Dropdown, Avatar } from 'antd'
import { LogoutOutlined, CalendarOutlined, TableOutlined, UserOutlined, HomeOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import TableGeneral from './TableGeneral/TableGeneral'

const Top = () => {

	const [ showTableGeneral, setShowTableGeneral ] = useState(false)
	const [ showHome, setShowHome ] = useState(true)

	const navigate = useNavigate()

	const {
		rex_users
	} = useSelector(({users}) => users)

	const items = [
		{
			label: <div
			  onClick={()=> navigate('/home')}
			  style={{display:"flex", columnGap:"10px"}}
			>
			  <HomeOutlined /> Principal	
			</div>,
			key: '0',
		},
		{
		  label: <div
			onClick={()=> setShowTableGeneral(true)}
			style={{display:"flex", columnGap:"10px"}}
		  >
			<TableOutlined/> Eliminatorias	
		  </div>,
		  key: '1',
		},
		{
		  label: <div
			onClick={()=> {
				navigate('/matches')
			}}
			style={{display:"flex", columnGap:"10px"}}
		  >
			<CalendarOutlined /> Calendario
		  </div>,
		  key: '2',
		},
		{
			label: <div
			  onClick={()=> {
				  navigate('/admin')
			  }}
			  style={{display:"flex", columnGap:"10px"}}
			>
			  <UserOutlined /> Administrador
			</div>,
			key: '3',
		},
		{
		  type: 'divider',
		},
		{
		  label: <div
		  	onClick={()=>{
				navigate('/')
				localStorage.clear()
			}}
			style={{display:"flex", columnGap:"10px"}}
		  ><LogoutOutlined /> Salir</div>,
		  key: '4',
		},
	];

	return (
		<div className='Container-Header'>
			<div>La quinela de la bondad</div>

			
			<Dropdown
				menu={{items}}
				trigger={['click']}
			>
				<a onClick={(e) => e.preventDefault()}>
					<Avatar style={{backgroundColor:"white", cursor:"pointer"}} size={28}  icon={<UserOutlined style={{color:"black"}} />} />
				</a>
			</Dropdown>
			{/* <div style={{display:"flex", columnGap:"10px"}}>
				<Button
					size='small'
					onClick={()=> setShowTableGeneral(true)}
				>
					< TableOutlined/>
				</Button>
				<Button
					size='small'

				>
					<CalendarOutlined />
				</Button>
				<Button 
					size='small'
					
				>
					<LogoutOutlined />
				</Button>
			</div> */}
			<TableGeneral
				showTableGeneral={showTableGeneral}
				setShowTableGeneral={setShowTableGeneral}
			/>
		</div>
	)
}

export default Top