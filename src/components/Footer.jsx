import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
const Footer = ({ textCls }) => {
  return (
    <footer>
      <Container>
        <Row>
          <Col className={`text-center pt-3 ${textCls}`} >Copyright &copy; Ivan Bautista {new Date().getFullYear()}</Col>
        </Row>
        <Row>
          <Col className={`text-center pb-3 ${textCls}`} >
            Check the code in my <a href="https://github.com/ivanbaug/cafe-wifi">Github <i className='fab fa-github' /></a>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

Footer.defaultProps = {
  textCls: '',
}

export default Footer