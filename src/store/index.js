/**
 * Author:ll36
 * Create Time:2018/03/27 19:01
 * Descripttion:
 */
import {createStore, combineReducers, applyMiddleware} from 'redux'
import * as user from './user/reducer'
import * as side from './side/reducer'
import * as sports from './sports/reducer'
import * as redirect from './redirect/reducer'
import thunk from 'redux-thunk'

let store = createStore(
  combineReducers({...redirect,...user,...side,...sports}),
  applyMiddleware(thunk)
)

export default store