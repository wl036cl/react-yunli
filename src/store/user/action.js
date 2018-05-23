/**
 * Author:ll36
 * Create Time:2018/03/27 19:02
 * Descripttion:
 */
import * as actionType from './actionType'

//  登录后保存用户信息
export const setUserInfo=(data) => {
  return {
    type: actionType.SET_USERINFO,
    data
  }
}

//  注销登录清除用户信息
export const clearUserInfo = () => {
  return {
    type: actionType.CLEAR_USERINFO
  }
}
