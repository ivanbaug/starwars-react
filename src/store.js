import thunk from 'redux-thunk'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
  movieListReducer,
  peopleListReducer,
  movieDetailsReducer,
} from './reducers/movieReducers'
import { userLoginReducer } from './reducers/userReducers'

const reducer = combineReducers({
  userLogin: userLoginReducer,
  movieList: movieListReducer,
  peopleList: peopleListReducer,
  movieDetails: movieDetailsReducer,
})

const userDetailsFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const initialState = {
  userLogin: {
    userInfo: userDetailsFromStorage,
  },
}

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
