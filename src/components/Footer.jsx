import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useSelector } from 'react-redux'

const Footer = () => {
  const { userInfo } = useSelector((state) => state.userLogin)
  return (
    <footer>
      <Container>
        <Row>
          <Col className={`text-center pt-3 ${!userInfo && 'text-light'}`}>
            Copyright &copy; Ivan Bautista {new Date().getFullYear()}
          </Col>
        </Row>
        <Row>
          <Col className={`text-center pb-3 ${!userInfo && 'text-light'}`}>
            Check the code in my{' '}
            <a href="https://github.com/ivanbaug/cafe-wifi">
              Github <i className="fab fa-github" />
            </a>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
