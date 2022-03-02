import React, { useState } from 'react'
import { Button, Form, Col, Row, Image, InputGroup } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import swbg from '../swbg.mp4';


const LoginScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const submitHandler = (e) => {
    e.preventDefault()
    // dispatch(login(email, password))
  }
  return (
    <>
      <video className='videoTag' autoPlay loop muted>
        <source src={swbg} type='video/mp4' />
      </video>
      <FormContainer >
        <Col className='myLogin mt-5 '>
          <Row >
            <Image fluid src='/res/xwing.png' id='login-img'  ></Image>
          </Row>
          <Row className='text-center my-4'>
            <h2>WELCOME BACK</h2>
          </Row>
          <Form onSubmit={submitHandler}>
            <InputGroup controlId='email' className='mb-3'>
              <InputGroup.Text >
                <i className='fas fa-user' />
              </InputGroup.Text>
              <Form.Control
                type='email'
                placeholder='Enter Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </InputGroup>
            <InputGroup controlId='password' className='mb-3'>
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