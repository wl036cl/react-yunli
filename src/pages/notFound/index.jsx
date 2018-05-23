/**
 * Author:ll36
 * Create Time:2018/03/27 20:49
 * Descripttion:
 */
import React, {Component} from 'react'
import PageMsg from '../../components/pageMsg/index'

export default class NotFound extends Component {
  render() {
    return (
      <PageMsg class="not-found" img="/images/emoji-sad.svg" msg="页面不存在"/>
    )
  }
}
