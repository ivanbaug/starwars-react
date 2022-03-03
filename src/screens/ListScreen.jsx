import React, { useEffect } from 'react'
import { Card, ListGroup, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { listMovies } from '../actions/movieActions';
import DetailsContainer from '../components/DetailsContainer';
import Loader from '../components/Loader'
import Message from '../components/Message'

const ListScreen = () => {


  const { userInfo } = useSelector(state => state.userLogin)

  const movieList = useSelector(state => state.movieList)
  const { loading: loadingMovies, error: errorMovies, movies } = movieList

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (!userInfo) {
      navigate('/login')
    }
    else {
      dispatch(listMovies(userInfo.films))
    }
  }, [navigate, userInfo, dispatch])

  return (
    <DetailsContainer>
      {
        userInfo &&
        <Card>
          <Card.Header as="h3">{userInfo.name}</Card.Header>
          <ListGroup variant="flush">
            <ListGroup.Item><strong>Usuario desde:</strong>&nbsp;
              {new Date(userInfo.created).toLocaleDateString('es-CO', { year: "numeric", month: "long", day: "numeric" })}</ListGroup.Item>
          </ListGroup>
        </Card>
      }
      {
        userInfo &&
        <>
          <h4 className='mt-4'>Peliculas en las que ha participado:</h4>
          {
            loadingMovies
              ? <Loader />
              : errorMovies
                ? <Message variant='danger'  >{errorMovies}</Message>
                : movies && (movies.length > 0) &&
                <Table striped bordered hover responsive className='table-sm'>
                  <thead>
                    <tr>
                      <th>Titulo</th>
                      <th>Director</th>
                      <th>Opening Crawl</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      movies.map((movie, index) => (
                        <tr key={index}>
                          <td>
                            {movie.title}
                            <br />
                            <Link to={`/movies/${movie.id}`}>
                              Detalles
                            </Link>
                          </td>
                          <td>{movie.director}</td>
                          <td>{movie.opening_crawl}</td>
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

export default ListScreen