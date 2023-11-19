import React from 'react'
import { Row, Col, Spin } from 'antd'

const LoadingData = (margin="100px") => {
    return (
        <Row>
            <Col span={24} style={{marginTop:margin, display:"flex", alignItems:"center", flexDirection:"column", justifyContent:"center"}}>
                <Spin size="large">
                </Spin>
                <span style={{color:"#5e2129"}}>Cargando...</span>
            </Col>
        </Row>
    )
}

export default LoadingData