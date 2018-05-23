/**
 * Author:ll36
 * Create Time:2018/03/27 20:08
 * Descripttion:
 */
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import './style.css'
import {getUrl} from '../../utils/fullUrl'

export default class PageMsg extends Component {
  static propTypes = {
    img: PropTypes.string,
    msg: PropTypes.string.isRequired
  }

  static defaultProps = {
    img: '/images/anchor.png'
  }

  render() {
    let fullHeight= document.documentElement.offsetHeight + 'px'
    return (
      <section className='app-bg' style={{height:fullHeight}}>
        <img className='animate' src={getUrl(this.props.img)} alt='emotion' />
        <h1>{this.props.msg}</h1>
      </section>
    )
  }
}