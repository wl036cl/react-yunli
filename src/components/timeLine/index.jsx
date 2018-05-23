/**
 * Author:ll36
 * Create Time:2018/04/09 16:37
 * Descripttion:
 */
import React, {Component} from 'react'
import PropTypes from "prop-types"
import {getUrl} from '../../utils/fullUrl'
import {Button} from "antd-mobile"
import './style.less'

export default class TimeLine extends Component {
  static propTypes = {
    list: PropTypes.array,
    unit: PropTypes.string,
    color: PropTypes.string
  }

  static defaultProps = {
    list: []
  }

  state = {
    imgUrl: getUrl('/images/run.svg'),
    imgStyle: {filter: "drop-shadow(-.5rem 0 " + this.props.color + ")"}
  }

  render() {
    let list = this.props.list.map((item, index) => {
      return (
        <li className="timeline-li" key={'li_'+item.recordId+'_'+index}>
          <div className="line-wrap">
            <img className="run-img" style={this.state.imgStyle} src={this.state.imgUrl}/>
          </div>
          <div className="record-wrap">
            <p className="time" style={{color: this.props.color}}>{item.recordTimeStr}</p>
            <p className="num">完成：{item.recordNum}&nbsp;{this.props.unit}</p>
            {item.remark ? (<p className='remark'>心得：{item.remark}</p>) : ''}
            <span className='btn-delete'>删除</span>
          </div>
        </li>
      )
    })
    return (
      <ul className="timeline-ul">
        {list}
      </ul>
    )
  }
}
