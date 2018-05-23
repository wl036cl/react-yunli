/**
 * Author:ll36
 * Create Time:2018/03/20 14:27
 * Descripttion:
 */
import {fetch} from '../utils/fetch'
import * as api from './apiUrl'

export const signInByPhone = function (phone, psw) {
  const data = {oauthUId: phone, oauthToken: psw, type: 1}

  return fetch({
    url: api.SIGN_IN,
    type: 'get',
    data
  })
}

export const signInByToken = function (uid, token) {
  const data = {oauthUId: uid, oauthToken: token, type: 2}

  return fetch({
    url: api.SIGN_IN,
    type: 'get',
    data
  })
}

export const signOut = function (uid, token) {
  const data = {uid, token}

  return fetch({
    url: api.SIGN_OUT,
    type: 'post',
    data
  })
}

export const signUp = function (phone, email, password, password2) {
  const data = {phone, email, password, password2}

  return fetch({
    url: api.SIGN_UP,
    type: 'post',
    data
  })
}

export const getUser = function (uid, token) {
  const data = {oauthUId: uid, oauthToken: token}

  return fetch({
    url: api.GET_USER,
    data
  })
}
