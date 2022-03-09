import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react'
import { Card, ListGroup, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { listPeople } from '../actions/movieActions';
import DetailsContainer from '../components/DetailsContainer'
import Loader from '../components/Loader'
import Message from '../components/Message'

const DetailsScreen = () => {

  const [movie, setMovie] = useState({})

  const { userInfo } = useSelector(state => state.userLogin)
  const { movies } = useSelector(state => state.movieList)

  const peopleList = useSelector(state => state.peopleList)
  const { loading: loadingPeople, error: errorPeople, people } = peopleList

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const params = useParams()

  useEffect(() => {
    if (!userInfo) {
      navigate('/login')
    }
    else {

      if (movies.length > 0) {
        let m = movies.find(mve => Number(mve.id) === Number(params.id))
        setMovie(m)
      }
      else {
        window.alert('Select the movie you want from the provided table...')
        navigate('/')
      }
      if (Object.keys(movie).length > 0) {
        dispatch(listPeople(movie.characters))
      }

    }
  }, [navigate, userInfo, dispatch, movies, params, movie])


  return (
    <DetailsContainer>
      {
        userInfo && movies && (movies.length > 0) && movie &&

        <Card>
          <Card.Header as="h3">{movie.title}</Card.Header>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <strong>Director:</strong>&nbsp;
              {movie.director}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Productor(es):</strong>&nbsp;
              {movie.producer}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Opening Crawl:</strong>&nbsp;
              {movie.opening_crawl}
            </ListGroup.Item>
          </ListGroup>
        </Card>
      }
      {
        userInfo && movies && (movies.length > 0) && movie &&
        <>
          <h4 className='mt-4'>Personajes</h4>
          {
            loadingPeople
              ? <Loader />
              : errorPeople
                ? <Message variant='danger'  >{errorPeople}</Message>
                : people && (people.length > 0) &&
                <Table striped bordered hover responsive className='table-sm'>
                  <thead>
                    <tr>
                      <th>Nombre</th>
                      <th>Homeworld</th>
                      <th>Hair Color</th>
                      <th>Height</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      people.map((person, index) => (
                        <tr key={index}>
                          <td>{person.name}</td>
                          <td>{person.homeworld_name}</td>
                          <td>{person.hair_color}</td>
                          <td>{person.height}</td>
                        </tr>
                      ))
                    }
                  </tbody>
                </Table>
          }
        </>
      }
    </DetailsContainer>
  )
}

export default DetailsScreen