/**
 * Author:ll36
 * Create Time:2018/03/21 17:35
 * Descripttion:
 */
import {fetch} from '../utils/fetch'
import * as api from './apiUrl'

export const getSportRecordsList = function (uid, token, sid, nPage=1) {
  const data = {uid, token, sid, nPage}

  return fetch({
    url: api.GET_SPORT_RECORDS,
    data
  })
}

export const editSportRecord = function (uid, token, num, time, remark, sid, rid) {
  const data = {uid, token, num, time, remark, sid, rid}

  return fetch({
    url: api.EDIT_SPORT_RECORD,
    type: 'post',
    data
  })
}

export const deleteSportRecord = function (uid, token, rid) {
  const data = {uid, token, rid}

  return fetch({
    url: api.DELETE_SPORT_RECORD,
    type: 'post',
    data
  })
}
