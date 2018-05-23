/**
 * Author:ll36
 * Create Time:2018/04/09 17:53
 * Descripttion:
 */
import * as actionType from './actionType'

export const redirect = (url, replace = false) => {
  let type = actionType.REDIRECT

  return {
    type,
    data: {
      url,
      replace
    }
  }
}
