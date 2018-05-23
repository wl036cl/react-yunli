/**
 * Author:ll36
 * Create Time:2018/04/09 16:24
 * Descripttion:
 */
import React, {Component} from 'react'
import ReactDOM from 'react-dom';
import TimeLine from '../../components/timeLine'
import {Tabs} from 'antd-mobile'
import DragRefresh from '../../components/dragRefresh'
import {StickyContainer, Sticky} from 'react-sticky'
import {connect} from "react-redux";
import {getSportRecordsList} from "../../api/sportRecord"
import './style.less'

class Records extends Component {
  constructor(){
    super()
    this.onRefresh=this.onRefresh.bind(this)
  }
  state = {
    tabs: [
      {title: '列表'},
      {title: '图表'}
    ],
    refreshing: false,
    msg: 'Loading…',
    sId: 0,
    sIndex: -1,
    list: [],
    route: 'sports', //  当前路径（sports/records）
    nextPage: 1, //  下一页页码
    finish: false,  //  是否无数据
  }

  renderTabBar(props) {
    return (<Sticky>
      {({style}) => <div style={{...style, zIndex: 1}}><Tabs.DefaultTabBar {...props} /></div>}
    </Sticky>);
  }

  async getNextPageRecords(sid, index) {
    console.log('2')
    const [uid, token] = [this.props.userInfo.uid, this.props.userInfo.token]
    try {
      if (uid && token && sid && index > -1 && !this.state.finish) {
        console.log('start',uid, token, sid, this.state.nextPage)
        let res = await getSportRecordsList(uid, token, sid, this.state.nextPage)
        console.log('3')
        if (res) {
          if (res.result === 1) {
            let list =this.state.list.concat(res.data)
            this.setState({
              sId: sid,
              sIndex: index,
              list,
              finish: res.isfinish === 1,
              nextPage: this.state.nextPage + 1
            })
            //this.transformState(res.data, res.isfinish === 1, this.state.nextPage + 1)
          } else {
            this.setState({finish: true, msg: '暂无数据'})
          }
        }
        console.log('end',uid, token, sid, this.state.nextPage)
      }
    }
    catch (err) {
      this.setState({finish: true, msg: '暂无数据'})
      console.log(err)
    }
    console.log('4')
  }

  async onRefresh (){
    if (!this.state.refreshing) {
      console.log('1')
      //  加载新页
      if (this.props.match.params.sid && this.props.match.params.index > -1) {
        this.setState({refreshing: true});
        await this.getNextPageRecords(this.props.match.params.sid, this.props.match.params.index)
        console.log('5')
        this.setState({refreshing: false});
      }
      console.log('6')
    }
  }

  checkList() {
    if (this.state.list && this.state.list.length) {
      let [color, unit] = ['red', '个']
      if (this.state.sIndex > -1 && this.state.sIndex < this.props.sportsList.list.length) {
        const sport = this.props.sportsList.list[this.state.sIndex]
        color = sport && sport.bgColor
        unit = sport && sport.unit
      }
      return (
        <StickyContainer>
          <Tabs tabs={this.state.tabs}
                initalPage={0}
                renderTabBar={this.renderTabBar}
                tabBarBackgroundColor='#108ee9'
                tabBarActiveTextColor='#fff'
                tabBarInactiveTextColor='#ccc'
          >
            <DragRefresh className='timeline-wrap'
                         refreshing={this.state.refreshing}
                         scrollRef={this.props.sideInfo.mainParent}
                         onReached={this.onRefresh}
            >
              <TimeLine list={this.state.list} color={color} unit={unit}></TimeLine>
            </DragRefresh>
            <div className='chart-wrap'>
              图表
            </div>
          </Tabs>
        </StickyContainer>
      )
    }
    return (<p style={{textAlign: 'center'}}>{this.state.msg}</p>)
  }

  componentWillMount() {
    //  运动项目ID
    if (this.props.match.params.sid && this.props.match.params.index > -1) {
      this.getNextPageRecords(this.props.match.params.sid, this.props.match.params.index)
    }
  }

  componentDidMount() {
    if (this.ptr) {
      const hei = this.state.prHeight - ReactDOM.findDOMNode(this.ptr).offsetTop;

      setTimeout(() => {
        //this.rData = genData();
        this.setState({
          //data: this.state.dataSource.cloneWithRows(genData()),
          prHeight: hei,
          refreshing: false
        });
      }, 1500);
    }
  }

  render() {

    return (
      <div>
        {this.checkList()}
      </div>
    )
  }
}

export default connect(state => ({
  sportsList: state.sportsList,
  userInfo: state.userInfo,
  sideInfo: state.sideInfo
}))(Records)
