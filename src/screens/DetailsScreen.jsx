import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { Card, ListGroup, Table } from 'react-bootstrap'
import { getMovieDetails, listPeople } from '../actions/movieActions'
import DetailsContainer from '../components/DetailsContainer'
import Loader from '../components/Loader'
import Message from '../components/Message'
import ViewHistory from '../components/ViewHistory'

const DetailsScreen = () => {
  const { userInfo } = useSelector((state) => state.userLogin)

  const movieDetails = useSelector((state) => state.movieDetails)
  const { loading: loadingMovie, error: errorMovie, movie } = movieDetails

  const peopleList = useSelector((state) => state.peopleList)
  const { loading: loadingPeople, error: errorPeople, people } = peopleList

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const params = useParams()

  useEffect(() => {
    if (!userInfo) {
      // Go to loginpage if not logged in
      navigate('/login')
    }
    if (!movie || Number(movie.id) !== Number(params.id)) {
      dispatch(getMovieDetails(params.id))
    }
    if (movie && Number(movie.id) === Number(params.id)) {
      dispatch(listPeople(movie.characters))
    }
  }, [navigate, userInfo, dispatch, movie, params])

  return (
    <DetailsContainer>
      {loadingMovie ? (
        <Loader />
      ) : errorMovie ? (
        <Message variant="danger">{errorMovie}</Message>
      ) : (
        movie && (
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
        )
      )}
      {movie && (
        <>
          <h4 className="mt-4">Personajes</h4>
          {loadingPeople ? (
            <Loader />
          ) : errorPeople ? (
            <Message variant="danger">{errorPeople}</Message>
          ) : (
            people &&
            people.length > 0 && (
              <Table striped bordered hover responsive className="table-sm">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Homeworld</th>
                    <th>Hair Color</th>
                    <th>Height</th>
                  </tr>
                </thead>
                <tbody>
                  {people.map((person, index) => (
                    <tr key={index}>
                      <td>{person.name}</td>
                      <td>{person.homeworld_name}</td>
                      <td>{person.hair_color}</td>
                      <td>{person.height}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )
          )}
        </>
      )}
      {movie && <ViewHistory movie={movie} />}
    </DetailsContainer>
  )
}

export default DetailsScreen
