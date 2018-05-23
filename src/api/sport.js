/**
 * Author:ll36
 * Create Time:2018/03/21 16:40
 * Descripttion:
 */
import {fetch} from '../utils/fetch'
import * as api from './apiUrl'

export const getSport = function (uid, token, sid) {
  const data = {uid, token, sid}

  return fetch({
    url: api.GET_SPORT,
    data
  })
}

export const editSport = function (uid, token, title, target, unit, remark, isPrivate, sid, status) {
  const data = {uid, token, title, target, unit, remark, isPrivate, sid, status}

  return fetch({
    url: api.EDIT_SPORT,
    type: 'post',
    data
  })
}

export const deleteSport = function (uid, token, sid) {
  const data = {uid, token, sid}

  return fetch({
    url: api.DELETE_SPORT,
    type: 'post',
    data
  })
}

export const getSportsList = function (uid, token, nPage=1) {
  const data = {uid, nPage, token}

  return fetch({
    url: api.GET_SPORTS,
    data
  })
}
