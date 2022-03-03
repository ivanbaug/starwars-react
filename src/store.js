import thunk from 'redux-thunk'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
// import {
//   movieListReducer,
//   movieDetailsReducer,
//   movieDeleteReducer,
//   movieCreateReducer,
//   movieUpdateReducer,
//   movieCreateReviewReducer,
//   movieDeleteReviewReducer,
// } from './reducers/movieReducers'
import {
  userLoginReducer,
  // userRegisterReducer,
  // userDetailsReducer,
  // userUpdateProfileReducer,
} from './reducers/userReducers'

const reducer = combineReducers({
  // cafeList: cafeListReducer,
  // cafeDetails: cafeDetailsReducer,
  // cafeDelete: cafeDeleteReducer,
  // cafeCreate: cafeCreateReducer,
  // cafeUpdate: cafeUpdateReducer,
  // cafeCreateReview: cafeCreateReviewReducer,
  // cafeDeleteReview: cafeDeleteReviewReducer,
  userLogin: userLoginReducer,
  // userRegister: userRegisterReducer,
  // userDetails: userDetailsReducer,
  // userUpdateProfile: userUpdateProfileReducer,
})


const userDetailsFromStorage = localStorage.getItem('userInfo') ?
  JSON.parse(localStorage.getItem('userInfo')) : null


const initialState = {
  userLogin: {
    userInfo: userDetailsFromStorage,
  }
}

const middleware = [thunk]


const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store