import { Modal, Table, Typography, Tooltip } from 'antd'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GetTablePositionsReducers } from '../../Redux/Actions/Matches/Matches'
import {
    CaretUpOutlined,
    CaretDownOutlined,
    MinusOutlined
} from "@ant-design/icons"
import "./../../Styles/Components/TableGeneral.css"
const cargarImagen = require.context("/src/Assets/images/icons", true)

const TableGeneral = ({showTableGeneral, setShowTableGeneral}) => {

	const { Title } = Typography

    const dispatch = useDispatch()

    const getData = async () => {
        dispatch(GetTablePositionsReducers())
    }

    const {
        rex_table_positions,
    } = useSelector(({matches}) => matches)

    useEffect(() => {
        getData()
    },[])
    const columns = [
        {
            title: 'Pais',
            dataIndex: 'country',
            key: 'country',
            align: 'center',
            render : (_, record, index) => {
                let position = index + 1
                let statusTeam = null
                if(position <= 7){
                    statusTeam = "Repechage"
                    if(position <= 6){
                        statusTeam = "World-Cup"
                    }
                }
                return <div className='Column-Team'>
                    <div>
                    {
                        statusTeam == "World-Cup"
                        ? <CaretUpOutlined style={{color:"green"}} />
                        : statusTeam == "Repechage"
                            ? <MinusOutlined />
                            : <CaretDownOutlined  style={{color:"red"}} />
                    }
                    </div>
                    <div>
                    <Tooltip
                            title={record.painombre}
                            placement="right"
                        >
                            <img className='Image-Country' src={cargarImagen(`./${record.paiimagen}`)}/>
                        </Tooltip>
                    </div>
                </div>
            }
        },
        {
            title: 'PJ',
            dataIndex: 'pj',
            key: 'pj',
            align: 'center',
            render : (_, record, index) => (
                <div>
                    {record.pj}
                </div>
            )
        },
        {
            title: 'PG',
            dataIndex: 'pg',
            key: 'pg',
            align: 'center',
            render : (_, record, index) => (
                <div>
                    {record.pg}
                </div>
            )
        },
        {
            title: 'PE',
            dataIndex: 'pe',
            key: 'pe',
            align: 'center',
            render : (_, record, index) => (
                <div>
                    {record.pe}
                </div>
            )
        },
		{
            title: 'PP',
            dataIndex: 'pp',
            key: 'pp',
            align: 'center',
            render : (_, record, index) => (
                <div>
                    {record.pp}
                </div>
            )
        },
        {
            title: 'GF',
            dataIndex: 'gf',
            key: 'gf',
            align: 'center',
            render : (_, record, index) => (
                <div>
                    {record.gf}
                </div>
            )
        },
		{
            title: 'GC',
            dataIndex: 'gc',
            key: 'gc',
            align: 'center',
            render : (_, record, index) => (
                <div>
                    {record.gc}
                </div>
            )
        },
		{
            title: 'DF',
            dataIndex: 'df',
            key: 'df',
            align: 'center',
            render : (_, record, index) => (
                <div>
                    {record.df}
                </div>
            )
        },
		{
            title: 'Ptos',
            dataIndex: 'ptos',
            key: 'ptos',
            align: 'center',
            render : (_, record, index) => (
                <div>
                    {record.ptos}
                </div>
            )
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
				className='Table-Quinela Table-Playoff'
				size='small'
				columns={columns}
                dataSource={rex_table_positions}
			/>
		</Modal>
	)
}

export default TableGeneral