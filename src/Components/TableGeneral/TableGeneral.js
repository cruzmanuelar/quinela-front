import { Modal, Table, Typography, Tooltip, Popover } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GetTablePositionsReducers } from '../../Redux/Actions/Matches/Matches'
import {
    CaretUpOutlined,
    CaretDownOutlined,
    MinusOutlined,
    EyeOutlined
} from "@ant-design/icons"
import "./../../Styles/Components/TableGeneral.css"
const cargarImagen = require.context("/src/Assets/images/icons", true)

const TableGeneral = ({showTableGeneral, setShowTableGeneral}) => {

    const [ loadingData, setLoadingData ] = useState(false)

    const dispatch = useDispatch()

    const getData = async () => {
        setLoadingData(true)
        let response = await dispatch(GetTablePositionsReducers())
        setLoadingData(false)
    }

    const {
        rex_table_positions,
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
        if(rex_table_positions.length == 0){
            getData()
        }
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
                    <div className='Container-Flex-Center'>
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
            title: 'G',
            dataIndex: 'G',
            key: 'g',
            align: 'center',
            render : (_, record, index) => (
                <div>
                    {record.gf}:{record.gc}
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
        {
            title: 'Forma',
            dataIndex: 'ptos',
            key: 'ptos',
            align: 'center',
            render : (_, record, index) => (
                <div>
                    <Popover
                        content={()=>contentLastMatches(record.lastMatches)} 
                        trigger="click"
                        placement="left"
                        overlayClassName="PopOver-Last-Games"
                    >
                        <EyeOutlined style={{color:"#5e2129"}}/>
                    </Popover>
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
			className='Modal-Form-Quinela Modal-Positions'
		>
			<Table
                loading={loadingData}
				className='Table-Quinela Table-Playoff'
				size='small'
				columns={columns}
                dataSource={rex_table_positions}
			/>
		</Modal>
	)
}

export default TableGeneral