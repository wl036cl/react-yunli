/**
 * Author:ll36
 * Create Time:2018/03/27 20:20
 * Descripttion:
 */
import {IMGURL, VIDEOURL} from '../config/http.config'

export const getUrl = function (url) {
  if (!url) {
    return ''
  }
  if (url.indexOf('http') === 0) {
    return url
  }

  if (url.indexOf('/') !== 0) {
    url = '/' + url
  }

  return (/[mp4|mov]$/.test(url) ? VIDEOURL : IMGURL) + url
}
