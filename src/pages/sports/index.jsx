/**
 * Author:ll36
 * Create Time:2018/03/27 20:49
 * Descripttion:
 */
import React, {Component} from 'react'
import {Route, Link, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {getSportsList} from '../../api/sport'
import {SwipeAction} from 'antd-mobile'
import Records from '../sportRecords'
import classNames from 'classnames'
import extend from 'deep-extend'
import './style.less'
import {redirect} from '../../store/redirect/action'
import {setSportsList} from '../../store/sports/action'
import {findNode} from "../../utils/findNode"

class Sports extends Component {
  state = {
    // redirectUrl:'',
    // push:false,
    //bgColors: ['#78ba00', '#008287', '#1faeff', '#006ac1', '#001e4e', '#252525', '#691bb8', '#F8461F', '#f4b300'],
    bgColors: ['#b71515', '#FF7F00', '#bbbb38', '#199619', '#12adad', '#1d1da0', '#8B00FF'],
    list: [],
    route: 'sports', //  当前路径（sports/records）
    nextPage: 1, //  下一页页码
    finish: false,  //  是否无数据
  }

  // redirect(url,isPush=true) {
  //   this.setState({redirectUrl: url,push:isPush})
  // }

  transformState = (arr, finish, nPage) => {
    arr = arr.map((item, i) => {
      item['bgColor'] = this.state.bgColors[i % this.state.bgColors.length]
      //item['transform'] = {}

      switch (Number(item.status)) {
        case -1:
          item['status'] = 'tag-deleted';
          item['statusTip'] = '删除';
          break;
        case 0:
          item['status'] = 'tag-deserted';
          item['statusTip'] = '放弃';
          break;
        case 1:
          item['status'] = 'tag-ing';
          item['statusTip'] = '进行中';
          break;
        case 2:
          item['status'] = 'tag-over';
          item['statusTip'] = '成功';
          break;
        case 3:
          item['status'] = 'tag-fail';
          item['statusTip'] = '失败';
          break;
      }
      return item
    })

    let list = {}
    extend(list, {data: this.state.list})
    extend(list, {data: arr})

    //  设置store
    this.props.setSportsList(this.props.userInfo.uid, list.data)
    this.setState({list: list.data, finish: finish, nextPage: nPage})
  }

  getNextPageSports = () => {
    const [uid, token] = [this.props.userInfo.uid, this.props.userInfo.token]

    if (uid && token && !this.state.finish) {
      getSportsList(uid, token, this.state.nextPage).then(res => {
        if (res.result === 1) {
          this.transformState(res.data, res.isfinish === 1, this.state.nextPage + 1)
        } else {
          this.setState({finish: true})
        }
      }).catch(err => {
        console.log(err)
      })
    }
  }

  chooseSport(e, sid, index = -1) {
    if (this.state.route === 'records') { //  屏蔽在records下点击
      e.preventDefault()
    }
    //  选择单一项目，进入records
    if (sid && index > -1 && this.state.list.length > index) {
      let data = []
      data.push(this.state.list[index])
      this.setState({list: data, route: 'records'})
    }
  }

  componentWillMount() {
    this.getNextPageSports()
  }

  componentDidUpdate() {
    if (this.state.route === 'records' && this.props.location.pathname === this.props.match.path) { //  从records返回
      this.setState({list: this.props.sportsList.list, route: 'sports'})
    }
  }

  render() {
    // if (this.state.redirectUrl) {
    //   if(this.state.push)
    //     return <Redirect push to={this.state.redirectUrl}/>
    //   return <Redirect to={this.state.redirectUrl}/>
    // }

    let list = this.state.list.map((item, index) => {
      let tagClass = classNames('tag', item.status)
      return (<li
          key={'li_' + item.sportId + `_` + index}
        >
          <SwipeAction
            key={'sa_' + item.sportId + '_' + index}
            autoClose
            right={[{
              text: '编辑',
              className: 'btn-edit',
              style: {backgroundColor: '#00cd4b', color: 'white'},
              onPress: () => console.log('编辑')
            },
              {
                text: '删除',
                className: 'btn-delete',
                style: {backgroundColor: '#686868', color: 'white'},
                onPress: () => console.log('删除')
              },]}
            onOpen={() => console.log('global open')}
            onClose={() => console.log('global close')}
          >
            <Link className='swipe-wrap'
                  to={this.props.match.path + '/records/' + item.sportId + '&' + index}
                  onClick={(event) => {
                    this.chooseSport(event, item.sportId, index)
                  }}
                  style={{backgroundColor: item.bgColor}}>
              <span className={tagClass}>{item.statusTip}</span>
              <div className='content-wrap'>
                <p className='title'>{item.title}</p>
                <p className='target'>目标：{item.target}&nbsp;&nbsp;{item.unit}</p>
                <p className='promise'>宣言：{item.remark}</p>
              </div>
              <ul className="time-wrap">
                <li>
                  <span>{item.recordNum === 0 ? '暂无' : (item.recordNum + '条')}记录</span>
                  {item.isPrivate ? <span className='private'>私人项目</span> : ''}
                </li>
                <li>
                  <span>{!!item.lastTimeStr ? (item.lastTimeStr + `更新`) : (item.createTimeStr + `创建`)}</span>
                </li>
              </ul>
            </Link>
          </SwipeAction>
        </li>
      )
    })

    return (
      <div className="sports-wrap">
        <ul className='sports-list'>
          {list}
        </ul>
        <Route path={`${this.props.match.path}/records/:sid&:index`} exact component={Records}/>
      </div>
    )
  }
}

export default connect(state => ({
  sportsList: state.sportsList,
  userInfo: state.userInfo
}), {
  setSportsList
})(Sports)
