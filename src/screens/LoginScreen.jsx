import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Button, Form, Col, Row, Image, InputGroup } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader'
import Message from '../components/Message'
import { login } from '../actions/userActions';


const LoginScreen = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')


  const dispatch = useDispatch()
  const navigate = useNavigate()

  const userLogin = useSelector(state => state.userLogin)
  const { error, loading, userInfo } = userLogin

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(login(username, password))
  }

  useEffect(() => {
    if (userInfo) {
      navigate('/')
    }
  }, [navigate, userInfo])

  return (
    <>
      <video className='videoTag' autoPlay loop muted>
        <source src='https://starwars-demo.s3.amazonaws.com/swbg.mp4' type='video/mp4' />
      </video>
      <FormContainer >

        <Col className='myLogin mt-5'>
          <Row >
            <Image fluid src='https://starwars-demo.s3.amazonaws.com/xwing.png' id='login-img'  ></Image>
          </Row>
          <Row className='text-center my-4'>
            <h2>WELCOME BACK</h2>
          </Row>
          <Row>
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
          </Row>
          <Form onSubmit={submitHandler}>
            <InputGroup className='mb-3'>
              <InputGroup.Text >
                <i className='fas fa-user' />
              </InputGroup.Text>
              <Form.Control
                type='text'
                placeholder='Enter username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </InputGroup>
            <InputGroup className='mb-3'>
              <InputGroup.Text>
                <i className='fas fa-key' />
              </InputGroup.Text>
              <Form.Control
                type='password'
                placeholder='Enter Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </InputGroup>
            <div className="d-grid gap-2">
              <Button type='submit' variant='light'>LOG IN</Button>
            </div>
          </Form>
        </Col>
      </FormContainer>
    </>
  )
}

export default LoginScreen