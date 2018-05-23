/**
 * Author:ll36
 * Create Time:2018/04/09 17:54
 * Descripttion:
 */
import * as actionType from './actionType'
let defaultInfo = {
  replace: false,  //  是否替换（是：不加入history）
  url:''  //  重定向url
}

export const redirectInfo = (state = defaultInfo , action = {}) => {
  switch (action.type) {
    case actionType.REDIRECT:
      return {...state, ...action.data}
    default:
      return state;
  }
}