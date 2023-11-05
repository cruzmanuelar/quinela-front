import { Modal, Table, Typography } from 'antd'
import React from 'react'

const TableGeneral = ({showTableGeneral, setShowTableGeneral}) => {

	const { Title } = Typography
    const columns = [
        {
            title: 'Pais',
            dataIndex: 'country',
            key: 'country',
            align: 'center',
            render : (_, record) => (
                <div style={{width:"100%", display:"flex", justifyContent:"center", columnGap:"3px"}}>
                        {/* <UserOutlined />{record.user} */}
                        {/* {record.key == 1 && <FireOutlined style={{color:"red"}}/>}              */}
                </div>
            )
        },
        {
            title: 'PJ',
            dataIndex: 'pj',
            key: 'pj',
            align: 'center',
        },
        {
            title: 'PG',
            dataIndex: 'pg',
            key: 'pg',
            align: 'center',
        },
        {
            title: 'PE',
            dataIndex: 'pe',
            key: 'pe',
            align: 'center',
        },
		{
            title: 'PP',
            dataIndex: 'pp',
            key: 'pp',
            align: 'center',
        },
        {
            title: 'GF',
            dataIndex: 'gf',
            key: 'gf',
            align: 'center',
        },
		{
            title: 'GC',
            dataIndex: 'gc',
            key: 'gc',
            align: 'center',
        },
		{
            title: 'DF',
            dataIndex: 'df',
            key: 'df',
            align: 'center',
        },
		{
            title: 'Ptos',
            dataIndex: 'ptos',
            key: 'ptos',
            align: 'center',
        },

    ]
	return (
		<Modal
			title={<div style={{textAlign:'center'}}>Tabla Eliminatorias</div>}
			open={showTableGeneral}
			closeIcon={null}
			footer={null}
			width={800}
			onCancel={()=> setShowTableGeneral(false)}
			className='Modal-Form-Quinela'
		>
			<Table
				className='Table-Quinela'
				size='small'
				columns={columns}
			/>
		</Modal>
	)
}

export default TableGeneral