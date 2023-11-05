import React from 'react'
import Top from '../Top'
import { Collapse, Row, Col } from 'antd'

export const Matches = () => {

    const { Panel } = Collapse

    const data = [
        {id : 1},
        {id : 2},
        {id : 3},
        {id : 4},
        {id : 5},
        {id : 6},
        {id : 7},
        {id : 8},
        {id : 9},
        {id : 10},
        {id : 11},
        {id : 12},
        {id : 13},
        {id : 14},
        {id : 15},
        {id : 16},
        {id : 17},
        {id : 18}
    ]

    return (
        <div>
            <Top/>
            <Row>

            {
                data.map(dat => (
                        <Col sm={24} md={8}>
                            <Collapse
                            >
                                <Panel header={`Jornada ${dat.id}`} key="1"></Panel>
                            </Collapse>
                        </Col>
                ))
            }
            </Row>
        </div>
    )
}
