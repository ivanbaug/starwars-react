import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const DetailsContainer = ({ children }) => {
  return (
    <Container className="mt-4">
      <Row className="justify-content-md-center">
        <Col xs={12} md={10}>
          {children}
        </Col>
      </Row>
    </Container>
  )
}

export default DetailsContainer
