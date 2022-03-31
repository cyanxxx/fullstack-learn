import {
  createStore,
  combineReducers,
  applyMiddleware
} from 'redux'
import thunk from 'redux-thunk'
import blogsReducer from './reducers/blogsReducer'
import notificationReducer from './reducers/notificationsReducer'
import userReducer from './reducers/userReducer'
import {
  composeWithDevTools
} from 'redux-devtools-extension'

const store = createStore(combineReducers({
  blogs: blogsReducer,
  notification: notificationReducer,
  user: userReducer
}), composeWithDevTools(
  applyMiddleware(thunk)
))

export default store