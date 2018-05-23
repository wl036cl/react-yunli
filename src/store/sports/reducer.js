/**
 * Author:ll36
 * Create Time:2018/04/09 17:27
 * Descripttion:
 */
import * as actionType from './actionType'

let defaultInfo = {
  uid:0,
  list:[]
}

//  运动项目List
export const sportsList = (state = defaultInfo , action = {}) => {
  switch (action.type) {
    case actionType.SET_SPORTSLIST:
      return {...state, ...action.data}
    case actionType.CLEAR_SPORTSLIST:
      return {...state, ...defaultInfo}
    default:
      return state;
  }
}