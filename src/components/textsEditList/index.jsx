import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {List, Icon, InputItem, Toast} from 'antd-mobile';
import './style.css'

export default class textsEditList extends Component {
  static propTypes = {
    title: PropTypes.string,
    list: PropTypes.array.isRequired,
    handleChange: PropTypes.func
  }

  constructor(props) {
    super(props)
    this.state = {list: this.props.list}
  }

  onErrorClick = (index) => {
    if (index > -1 && this.state.list.length && this.state.list[index].errMsg) {
      Toast.info(this.state.list[index].errMsg, 1)
    }
  }

  handleChange = (index, value) => {
    let list = this.state.list
    if (index > -1 && index < list.length) {
      list[index].value = value

      if (this.props.hasOwnProperty('handleChange')) {
        // 由父组件检查错误输入,修改errMsg，返回结果
        list = this.props.handleChange(index, list)
      }
      this.setState({list: list})
    }
  }

  render() {
    return (
      <List renderHeader={() => this.props.title}>
        {
          this.state.list.map((item, index) => {
            return <InputItem key={this.props.title + `_` + index}
                              clear
                              type={item.type}
                              placeholder={item.placeholder}
                              error={item.errMsg && item.value}
                              maxLength={item.maxLength}
                              value={item.value}
                              onErrorClick={() => this.onErrorClick(index)}
                              onChange={(value) => this.handleChange(index, value)}
            ><Icon type={item.icon} size="xs"/></InputItem>
          })}
      </List>
    );
  }
}