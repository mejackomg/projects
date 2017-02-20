/* @flow weak */
/* eslint react/prop-types: 0 */

import React from 'react'

//import Relay from 'react-relay'
import { connect } from 'react-redux';
import {List, ListItem, MakeSelectable} from 'material-ui/List';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import Bookmark from 'material-ui/svg-icons/action/bookmark-border.js';
import ActionFace from 'material-ui/svg-icons/action/face';
import ActionRecordVoice from 'material-ui/svg-icons/action/record-voice-over.js';
import ActionReceipt from 'material-ui/svg-icons/action/receipt';
import Extension from 'material-ui/svg-icons/action/extension';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import RemoveRedEye from 'material-ui/svg-icons/image/remove-red-eye';
import Info from 'material-ui/svg-icons/action/info-outline';
import ContentLink from 'material-ui/svg-icons/content/link';
import Divider from 'material-ui/Divider';
import ContentCopy from 'material-ui/svg-icons/content/content-copy';
import Videocam from 'material-ui/svg-icons/av/videocam';
import Home from 'material-ui/svg-icons/action/home.js';
import TrendingUp from 'material-ui/svg-icons/action/trending-up.js';
import People from 'material-ui/svg-icons/social/people.js';
import Domain from 'material-ui/svg-icons/social/domain.js';
import DataMng from 'material-ui/svg-icons/av/featured-play-list.js';
import Subheader from 'material-ui/Subheader';
import adminManagement from '../../../Data/AdminManagement.json';

import {
    colors,
    spacing,
    typography
} from 'material-ui/styles';
import {fade} from 'material-ui/utils/colorManipulator';

import { setChromeTitle} from '../../actions/layout';

const SelectableList = MakeSelectable(List);


class NavMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // adminState: '超级管理员',
            adminState: 'default',
            data:adminManagement
        };
    }
    componentDidMount () {
        const { user} = this.props;
        // console.log('user',user);
        //用户信息不存在或者用户类型不存在，跳回登录
        if(!user || !user.userType) {
            this.context.router.push('/');
        }
        this.setState({adminState : user.userType});
    }

    getMenuList (data, userType) {
        return (
            data.map((item, index)=>
                item.type && item.type.join(',').indexOf(userType) > -1 ?
                    item.value ? <ListItem primaryText={item.menuName} leftIcon={this.getLeftIcon(item.leftIcon)}
                                           value={item.value ? item.value : item.menuName}
                                           key={index}
                                           nestedItems={
                                               item.subMenu.map((subMenu, i)=>
                                                   subMenu.type && subMenu.type.join(',').indexOf(userType) > -1 ?
                                                       subMenu.value ?
                                                           <ListItem style={{paddingLeft: 40}} key={index + '' + i}
                                                                     primaryText={subMenu.menuName}
                                                                     value={subMenu.value}/> :
                                                           <ListItem style={{paddingLeft: 40}} key={index + '' + i}
                                                                     primaryText={subMenu.menuName}/>
                                                       : <ListItem style={{paddingLeft: 40}} key={index + '' + i}
                                                                   primaryText={subMenu.menuName}/>
                                               )}/> :
                        <ListItem primaryText={item.menuName} leftIcon={this.getLeftIcon(item.leftIcon)}
                                  key={index}
                                  nestedItems={
                                      item.subMenu.map((subMenu, i)=>
                                          subMenu.type && subMenu.type.join(',').indexOf(userType) > -1 ?
                                              subMenu.value ?
                                                  <ListItem style={{paddingLeft: 40}} key={index + '' + i}
                                                            primaryText={subMenu.menuName} value={subMenu.value}/> :
                                                  <ListItem style={{paddingLeft: 40}} key={index + '' + i}
                                                            primaryText={subMenu.menuName}/>
                                              : <ListItem style={{paddingLeft: 40}} key={index + '' + i}
                                                          primaryText={subMenu.menuName}/>
                                      )}/> : null
            )
        );
    }
    getLeftIcon (leftIcon) {
        if(leftIcon === 'RemoveRedEye') {
            return <RemoveRedEye />
        } else if(leftIcon === 'ContentCopy'){
            return <ContentCopy />
        } else if(leftIcon === 'ActionRecordVoice'){
            return <ActionRecordVoice />
        } else if(leftIcon === 'ActionReceipt'){
            return <ActionReceipt />
        } else if(leftIcon === 'DataMng'){
            return <DataMng />
        } else {
            return <ContentCopy />
        }
    }
    render() {
        const {user} = this.props;
        const {data,adminState}= this.state;
        let nestedItems_Misc = [
            <ListItem primaryText="Home" value="/"/>,
            <ListItem primaryText="Compendium" value="/compendiums"/>,
        ];
        //if( ! this.props.User_IsAnonymous )
        //{
        //  nestedItems_Misc.push( <ListItem primaryText="User Profile" value="/User" /> )
        //  nestedItems_Misc.push( <ListItem primaryText="Force Login" value="/ForceLogin" /> )
        //}

        return (
            <SelectableList
                value={ this.props.value }
                onChange={ this.props.onChange }
                style={{marginTop:-16,overflowX:'hidden'}}
            >
                {/*<ListItem  primaryText="首页" leftIcon={<Home />} value="/mammoth"/>*/}
                {/*<Subheader style={{*/}
                {/*//background:"linear-gradient(to bottom, rgba(0,0,0,0.6) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)",*/}
                {/*//background:this.context.muiTheme.palette.primary1Color,*/}
                {/*color: this.context.muiTheme.palette.primary1Color,//alternateTextColor,*/}
                {/*fontSize: 15,*/}
                {/*//marginLeft:55*/}
                {/*}}>*/}
                {/*业务数据分析*/}
                {/*</Subheader>*/}
                {this.getMenuList(data,adminState)}
                {/*<ListItem  primaryText="经营报告" leftIcon={<RemoveRedEye />}
                 value="/mammoth/reports/经营报告/总览"
                 nestedItems={[
                 <ListItem style={{paddingLeft: 40}} key={1} primaryText="销售数据概览" value="/mammoth/reports/经营报告/销售数据概览"/>,
                 <ListItem style={{paddingLeft: 40}} key={2} primaryText="用户数据概览" value="/mammoth/reports/经营报告/用户数据概览"/>,
                 <ListItem style={{paddingLeft: 40}} key={3} primaryText="商户数据概览" value="/mammoth/reports/经营报告/商户数据概览"/>,
                 <ListItem style={{paddingLeft: 40}} key={4} primaryText="商品数据概览" value="/mammoth/reports/经营报告/商品数据概览"/>
                 ]}/>
                 <ListItem  primaryText="信用评估" leftIcon={<ContentCopy />}
                 nestedItems={[
                 <ListItem style={{paddingLeft: 40}} key={5} primaryText="用户信用评估"/>,
                 <ListItem style={{paddingLeft: 40}} key={6} primaryText="商户信用评估" value="/mammoth/shopsPages" />,
                 <ListItem style={{paddingLeft: 40}} key={7} primaryText="商户贷款评估"/>
                 ]}/>
                 <ListItem  primaryText="行为分析" leftIcon={<ContentCopy />}
                 nestedItems={[
                 <ListItem style={{paddingLeft: 40}} key={8} primaryText="关键路径分析"/>,
                 <ListItem style={{paddingLeft: 40}} key={9} primaryText="漏斗分析"/>,
                 <ListItem style={{paddingLeft: 40}} key={10} primaryText="留存分析"/>
                 ]}/>
                 <ListItem  primaryText="商户分析" leftIcon={<ContentCopy />}
                 value="/mammoth/reports/商户分析/default"
                 nestedItems={[
                 <ListItem style={{paddingLeft: 40}} key={11} primaryText="销售分析" value="/mammoth/shopsPages" />,
                 <ListItem style={{paddingLeft: 40}} key={12} primaryText="购物车分析"/>,
                 <ListItem style={{paddingLeft: 40}} key={13} primaryText="订单/支付分析"/>,
                 <ListItem style={{paddingLeft: 40}} key={14} primaryText="商品分析"/>
                 ]}/>
                 <ListItem  primaryText="用户分析" leftIcon={<ActionRecordVoice />}
                 value="/mammoth/reports/用户分析/default" />
                 <ListItem  primaryText="渠道分析" leftIcon={<ActionReceipt />}
                 value="/mammoth/forecast/rowPiece"/>
                 <ListItem  primaryText="营销分析" leftIcon={<ContentCopy />}
                 value="/mammoth/forecast/publicity"
                 nestedItems={[
                 <ListItem style={{paddingLeft: 40}} key={15} primaryText="市场营销活动"/>,
                 <ListItem style={{paddingLeft: 40}} key={16} primaryText="广告投放"/>
                 ]}/>
                 <ListItem  primaryText="流量分析" leftIcon={<ActionRecordVoice />}
                 value="/mammoth/forecast/reputation"/>
                 <ListItem  primaryText="风控管理" leftIcon={<ContentCopy />}
                 value="/mammoth/risk"
                 nestedItems={[
                 <ListItem style={{paddingLeft: 40}} key={17} primaryText="实时风险监控"/>,
                 <ListItem style={{paddingLeft: 40}} key={18} primaryText="渠道监控"/>,
                 <ListItem style={{paddingLeft: 40}} key={19} primaryText="黑名单"/>
                 ]}/>
                 <ListItem  primaryText="参数配置" leftIcon={<DataMng />}
                 nestedItems={[
                 <ListItem style={{paddingLeft: 40}} key={20} primaryText="API调用记录" value="/mammoth/configManage/apiRecord" />,
                 <ListItem style={{paddingLeft: 40}} key={21} primaryText="数据库转换配置" value="/mammoth/configManage/dataTransfor" />,
                 <ListItem style={{paddingLeft: 40}} key={22} primaryText="系统日志" value="/mammoth/configManage/systemLog"/>,
                 <ListItem style={{paddingLeft: 40}} key={22} primaryText="用户管理" value="/mammoth/configManage/userManage"/>
                 ]}/>*/}


                {/*<Subheader style={{*/}
                {/*//background:"linear-gradient(to bottom, rgba(0,0,0,0.6) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)",*/}
                {/*//background:this.context.muiTheme.palette.primary1Color,*/}
                {/*color: this.context.muiTheme.palette.primary1Color,//alternateTextColor,*/}
                {/*fontSize: 15,*/}
                {/*//textAlign:'center'*/}
                {/*}}>*/}
                {/*配置管理</Subheader>*/}
                {/*<Divider />*/}
            </SelectableList>
        )
    }
}

NavMenu.contextTypes = {
    muiTheme: React.PropTypes.object.isRequired
};
const mapStateToProps = (state) => {
    const { authReducer } = state;

    return {
        user: authReducer.user
    };
};

export default connect(
    mapStateToProps
)(NavMenu);