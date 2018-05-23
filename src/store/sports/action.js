/**
 * Author:ll36
 * Create Time:2018/04/09 17:27
 * Descripttion:
 */
import * as actionType from './actionType'

//  登录后保存用户信息
export const setSportsList=(uid,data) => {
  return {
    type: actionType.SET_SPORTSLIST,
    data:{
      uid,
      list:data
    }
  }
}

//  注销登录清除用户信息
export const clearSportsList = () => {
  return {
    type: actionType.CLEAR_SPORTSLIST
  }
}
