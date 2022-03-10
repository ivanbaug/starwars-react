import {
  MOVIE_LIST_REQUEST,
  MOVIE_LIST_SUCCESS,
  MOVIE_LIST_FAIL,
  MOVIE_LIST_REMOVE,
  MOVIE_DETAIL_REQUEST,
  MOVIE_DETAIL_SUCCESS,
  MOVIE_DETAIL_FAIL,
  MOVIE_DETAIL_REMOVE,
  PEOPLE_LIST_REQUEST,
  PEOPLE_LIST_SUCCESS,
  PEOPLE_LIST_FAIL,
  PEOPLE_LIST_REMOVE,
} from '../constants/movieConstants'

export const movieListReducer = (state = { movies: [] }, action) => {
  switch (action.type) {
    case MOVIE_LIST_REQUEST:
      return { loading: true }
    case MOVIE_LIST_SUCCESS:
      return {
        loading: false,
        movies: action.payload,
      }
    case MOVIE_LIST_FAIL:
      return { loading: false, error: action.payload }
    case MOVIE_LIST_REMOVE:
      return {}
    default:
      return state
  }
}

export const movieDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case MOVIE_DETAIL_REQUEST:
      return { loading: true }
    case MOVIE_DETAIL_SUCCESS:
      return {
        loading: false,
        movie: action.payload,
      }
    case MOVIE_DETAIL_FAIL:
      return { loading: false, error: action.payload }
    case MOVIE_DETAIL_REMOVE:
      return {}
    default:
      return state
  }
}

export const peopleListReducer = (state = { people: [] }, action) => {
  switch (action.type) {
    case PEOPLE_LIST_REQUEST:
      return { loading: true }
    case PEOPLE_LIST_SUCCESS:
      return {
        loading: false,
        people: action.payload,
      }
    case PEOPLE_LIST_FAIL:
      return { loading: false, error: action.payload }
    case PEOPLE_LIST_REMOVE:
      return {}
    default:
      return state
  }
}
