/**
 * Author:ll36
 * Create Time:2018/04/12 10:06
 * Descripttion:
 */
import React, {Component} from 'react'
import PropTypes from "prop-types"

export default class DraRefresh extends Component {
  static propTypes = {
    disabled: PropTypes.bool,  //  是否禁用
    className:PropTypes.string, //  className
    direction: PropTypes.string,  //  down/up
    distanceToRefresh: PropTypes.number, //  触发回调距离
    refreshing: PropTypes.bool,  //  是否显示刷新状态
    onEndReached: PropTypes.func, //  上拉到底回调
  }

  state = {}

  static defaultProps = {
    scrollRef:window,
    disabled: false,
    direction: 'up',
    distanceToRefresh: 10,
    refreshing: false,
    onReached: () => {
      console.log('reach the bottom')
    }
  }

  handleScroll= ()=> {
    if (this.props.refreshing || this.props.disabled)
      return
    let [scrollerScrollHeight, scrollerHeight, scrollerTop] = [this.props.scrollRef.scrollHeight, this.props.scrollRef.getBoundingClientRect().height, this.props.scrollRef.scrollTop]; //  容器滚动总高度 //  容器滚动可见高度  //  滚过的高度
    // 达到滚动加载阀值
    //console.log(scrollerScrollHeight, scrollerHeight, scrollerTop)
    if (scrollerScrollHeight - scrollerHeight - scrollerTop <= this.props.distanceToRefresh) {
      //  调用回调
      this.props.onReached()
    }
  }

  componentWillReceiveProps(nextProps) {
    //  接收到新数据（children）
    console.log(nextProps)

  }

  componentDidMount() {
    if (!this.props.disabled&&this.props.scrollRef) {
      //  添加监听
      this.props.scrollRef.addEventListener('scroll', this.handleScroll, false);
    }
  }

  componentWillUnmount() {
    //  取消滚动监听
    if (!this.props.disabled&&this.props.scrollRef) {
      this.props.scrollRef.removeEventListener('scroll', this.handleScroll)
    }
  }

  render() {
    return (
      <div ref={(scroll) => this.scroll = scroll} className={this.props.className}>
        {this.props.children}
        <p style={{visibility:this.props.refreshing?'visible':'hidden',textAlign:'center'}}>loading...</p>
      </div>
    )
  }
}
