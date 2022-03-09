import {
  MOVIE_LIST_REQUEST,
  MOVIE_LIST_SUCCESS,
  MOVIE_LIST_FAIL,
  PEOPLE_LIST_REQUEST,
  PEOPLE_LIST_SUCCESS,
  PEOPLE_LIST_FAIL,
} from '../constants/movieConstants'
import axios from 'axios'

export const listMovies =
  (uList = []) =>
  async (dispatch) => {
    try {
      dispatch({ type: MOVIE_LIST_REQUEST })
      const movies = await Promise.all(
        uList.map(async (movie) => {
          let id = Number(movie.split('/')[5])
          let { data } = await axios.get(movie)

          return { id: id, ...data }
        })
      )
      dispatch({
        type: MOVIE_LIST_SUCCESS,
        payload: movies,
      })
    } catch (error) {
      dispatch({
        type: MOVIE_LIST_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      })
    }
  }

export const listPeople =
  (cList = []) =>
  async (dispatch) => {
    try {
      dispatch({ type: PEOPLE_LIST_REQUEST })
      const people = await Promise.all(
        cList.map(async (person) => {
          let id = Number(person.split('/')[5])
          let { data } = await axios.get(person)
          let { data: homeworld_name } = await axios.get(data.homeworld)
          return {
            id: id,
            ...data,
            homeworld_name: homeworld_name.name,
          }
        })
      )
      dispatch({
        type: PEOPLE_LIST_SUCCESS,
        payload: people,
      })
    } catch (error) {
      dispatch({
        type: PEOPLE_LIST_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      })
    }
  }
