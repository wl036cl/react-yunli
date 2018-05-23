/**
 * Author:ll36
 * Create Time:2018/04/02 16:10
 * Descripttion:
 */
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Drawer, List, Icon} from 'antd-mobile'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import {toggleSide} from '../../store/side/action'
import './style.css'

class Side extends Component {
  static propTypes = {
    open:PropTypes.bool,
    toggleSide:PropTypes.func,
    signOut:PropTypes.func,
    list: PropTypes.array
  }

  createLink = (link, content) => {
    let navLink = content
    if (link)
      navLink = (
        <NavLink to={link} exact>{content}</NavLink>
      )
    return navLink
  }

  render() {
    const sidebar = (<List>
      {
        this.props.list.map((item, i) => {
          let [thumb, icon] = ['','']
          if (item.hasOwnProperty('img') && item.img)
            thumb = <span className='am-list-thumb'><img src={item.img} alt='head' /></span>
          if (item.hasOwnProperty('icon') && item.icon)
            icon = <Icon type='item.icon'/>
          let content = (
            <p className='side-item'>
              {thumb}
              {icon}
              {item.text}
              </p>
          )
          return (<List.Item key={i}>
            {this.createLink(item['link'], content)}
          </List.Item>)
        })
      }
    </List>)

    return (
      <Drawer className='sideBar'
              style={{minHeight: document.documentElement.clientHeight-45}}
              contentStyle={{}}
              sidebar={sidebar}
              enableDragHandle
              open={this.props.open}
              onOpenChange={this.props.toggleSide}
      >
        {this.props.children}
      </Drawer>
    )
  }
}
export default connect(state => ({
  open:state.sideInfo.open
}), {
  toggleSide
})(Side);