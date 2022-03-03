import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react'
import { Card, ListGroup, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import DetailsContainer from '../components/DetailsContainer'
import Loader from '../components/Loader'
import Message from '../components/Message'


const DetailsScreen = () => {

  const [movie, setMovie] = useState({})


  const { userInfo } = useSelector(state => state.userLogin)
  const { movies } = useSelector(state => state.movieList)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const params = useParams()

  useEffect(() => {
    if (!userInfo) {
      navigate('/login')
    }
    else {

      if (movies) {
        let m = movies.find(mve => Number(mve.id) === Number(params.id))
        setMovie(m)
      }
    }
  }, [navigate, userInfo, dispatch, movies, params])
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
    </DetailsContainer>
  )
}

export default DetailsScreen