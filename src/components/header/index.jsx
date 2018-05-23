/**
 * Author:ll36
 * Create Time:2018/04/02 15:46
 * Descripttion:
 */
import React, {Component} from 'react'
import {NavBar, Icon} from 'antd-mobile'
import PropTypes from 'prop-types'
import {withRouter} from 'react-router-dom'
import {connect} from "react-redux"
import {toggleSide} from '../../store/side/action'

class Header extends Component {

  static propTypes = {
    toggleSide:PropTypes.func,
    title: PropTypes.string
  }

  static defaultProps = {
    title: '运力'
  }

  goBack = () => {
    this.props.history.goBack()
    console.log('后退')
  }

  render() {
    return (
      <header>
        <NavBar className='navBar'
                icon={<Icon type='left'/>}
                onLeftClick={this.goBack}
                rightContent={<Icon type='ellipsis' onClick={this.props.toggleSide}/>}
        >
          {this.props.title}
        </NavBar>
      </header>
    )
  }
}
export default withRouter(connect(state => ({}), {
  toggleSide
})(Header))
