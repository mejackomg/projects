/* @flow weak */
/* eslint react/prop-types: 0 */

import React from 'react'

//import Relay from 'react-relay'
import { connect } from 'react-redux';
import {List, ListItem, MakeSelectable} from 'material-ui/List';

import ECharts from 'echarts-for-react'
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import ContentAdd from 'material-ui/svg-icons/content/add';
import FlatButton from 'material-ui/FlatButton';
import {Button, Glyphicon} from 'react-bootstrap';

import Dialog_Type from './Dialog_Type.jsx'
import {
    colors,
    spacing,
    typography
} from 'material-ui/styles';
import {fade} from 'material-ui/utils/colorManipulator';
import moment from 'moment';
import DatetimeRangePicker from 'react-bootstrap-datetimerangepicker';

import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

// import { setChromeTitle} from '../../actions/layout';
import {loadDictTitle,loadUserPath} from '../../../reducers/database.js'
import SelectField from 'material-ui/SelectField';
import Checkbox from 'material-ui/Checkbox';



class CriticalPath extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            StartEnd:0,
            EventChoice:[],
            EventC:0,
            // sum:2,
            fromDate: moment().subtract(29, 'days'),
            toDate: moment(),
            ranges: {
                '今日': [moment().startOf('day'), moment()],
                '昨天': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                '过去7天': [moment().subtract(6, 'days'), moment()],
                '过去30天': [moment().subtract(29, 'days'), moment()],
                '这个月': [moment().startOf('month'), moment().endOf('month')],
                '上个月': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
            }

        };
    }
    componentDidMount () {
        const {dispatch} = this.props;
        dispatch(loadDictTitle());
    }
    getOption(a,b){
        let option = null;
        const data ={
            "nodes":[{"name":"提交订单第一层"},
                {"name":"发现第二层"},
                {"name":"卡包第二层"},
                {"name":"提交订单第二层"},
                {"name":"发现第三层"},
                {"name":"卡包第三层"},
                {"name":"提交订单第三层"}],
            "links":[
                {
                    "source":"提交订单第一层",
                    "target":"发现第二层",
                    "value":2
                },
                {
                    "source":"提交订单第一层",
                    "target":"卡包第二层",
                    "value":1
                },
                {
                    "source":"提交订单第一层",
                    "target":"提交订单第二层",
                    "value":1
                },
                {
                    "source":"发现第二层",
                    "target":"发现第三层",
                    "value":45
                },
                {
                    "source":"发现第二层",
                    "target":"卡包第三层",
                    "value":21
                },
                {
                    "source":"卡包第二层",
                    "target":"发现第三层",
                    "value":22
                },
                {
                    "source":"卡包第二层",
                    "target":"卡包第三层",
                    "value":37
                },
                {
                    "source":"提交订单第二层",
                    "target":"发现第三层",
                    "value":2
                },
                {
                    "source":"提交订单第二层",
                    "target":"卡包第三层",
                    "value":1
                },
                {
                    "source":"提交订单第二层",
                    "target":"提交订单第三层",
                    "value":1
                }
            ]
        }
        option = {
            title: {
                text: '用户路径分析'
            },
            tooltip: {
                trigger: 'item',
                triggerOn: 'mousemove'
            },
            series: [
                {
                    type: 'sankey',
                    layout: 'none',
                    data:a,
                    links: b,
                    itemStyle: {
                        normal: {
                            borderWidth: 1,
                            borderColor: '#aaa'
                        }
                    },
                    lineStyle: {
                        normal: {
                            color: 'source',
                            curveness: 0.5
                        }
                    }
                }
            ]
        }
        return option;

    }
    handleQuery = () => {
        const {dispatch,DictTitleData} = this.props;
        const {EventChoice,StartEnd,EventC,fromDate,toDate} = this.state;
        let temp = [];
        for(let i=0;i<EventChoice.length;i++){
            temp.push(DictTitleData[EventChoice[i]].event);
        }
        //
        // console.log(temp);
        // console.log(StartEnd==0?'bgn_event':'end_event');
        // console.log(temp[EventC]);
        dispatch(loadUserPath(temp,StartEnd==0?'bgn_event':'end_event',temp[EventC],fromDate,toDate));
    };
    onClosed = () => {
        this.setState({dialogOpen: true});
    };
    handleStartEnd = (event,index,value) => this.setState({StartEnd:value});
    handleEventChoice = (event,index,value) => {
        const {EventChoice} = this.state;
        let temp = EventChoice;
        if(temp.indexOf(index) == -1){
            temp.push(index);
        }else{
            temp.splice(temp.indexOf(index),1);
        }
        temp.sort(function (a,b) {
            return a-b;
        })
        this.setState({EventChoice:temp});
    }

    handleEventC = (event,index,value) => this.setState({EventC:value});
    handleEvent = (event, picker) => {
        const {dispatch,DictTitleData} = this.props;
        const {EventChoice,StartEnd,EventC} = this.state;
        let temp = [];
        for(let i=0;i<EventChoice.length;i++){
            temp.push(DictTitleData[EventChoice[i]].event);
        }
        this.setState({
            fromDate: picker.startDate,
            toDate: picker.endDate
        });
        dispatch(loadUserPath(temp,StartEnd==0?'bgn_event':'end_event',temp[EventC],picker.startDate,picker.endDate));
    }
    getStyle(){
        const styles = {
            underlineStyle: {
                borderColor: this.context.muiTheme.palette.accent1Color,
            }
        }
        return styles;
    }
    render() {
        const {UserPathData,DictTitleData} = this.props;
        console.log('UserPathData',UserPathData);
        const {EventChoice,EventC,StartEnd} = this.state;
        const styles = this.getStyle();
        function query(name) {
            for(let i=0;i<DictTitleData.length;i++){
                if(name==DictTitleData[i].event){
                    return DictTitleData[i].name
                }
            }
        }
        let tempNodes = [];
        let tempLinks = [];
        let tempName = ['第一层','第二层','第三层','第四层'];

        if(UserPathData && UserPathData[tempName[0]] && UserPathData[tempName[0]].length>0){
            let obj = {};
            for(let i=0;i<4;i++){
                for(let j=0;j<UserPathData[tempName[i]].length;j++){
                    let isExisted = true;
                    if(UserPathData.StartEnd == 'bgn_event') {
                        if(i<3)
                            isExisted =searchNodes(i+1,UserPathData[tempName[i]][j].end_event,UserPathData.StartEnd);
                        if(isExisted){
                            tempLinks.push({
                                "source":query(UserPathData[tempName[i]][j].bgn_event)+tempName[i],
                                "target":query(UserPathData[tempName[i]][j].end_event)+tempName[i+1],
                                "value":UserPathData[tempName[i]][j].personNum
                            })
                        }
                    }else{
                        if(i>0){
                            isExisted =  searchNodes(i-1,UserPathData[tempName[i]][j].bgn_event,UserPathData.StartEnd);

                            if(isExisted){
                                tempLinks.push({
                                    "source":query(UserPathData[tempName[i]][j].bgn_event)+tempName[i-1],
                                    "target":query(UserPathData[tempName[i]][j].end_event)+tempName[i],
                                    "value":UserPathData[tempName[i]][j].personNum
                                })
                            }
                        }
                    }

                    console.log('tempLinks',tempLinks);
                    if(UserPathData.StartEnd == 'bgn_event'){
                        if(!obj[UserPathData[tempName[i]][j].bgn_event+tempName[i]]){
                            let isExisted = true;
                            if(i<3){
                                isExisted = searchNodes(i+1,UserPathData[tempName[i]][j].end_event,UserPathData.StartEnd);
                            }
                            if(isExisted) {
                                obj[UserPathData[tempName[i]][j].bgn_event + tempName[i]] = true;
                                tempNodes.push({
                                    "name": query(UserPathData[tempName[i]][j].bgn_event) + tempName[i]
                                })
                            }
                        }
                    }else {
                        if(!obj[UserPathData[tempName[i]][j].end_event+tempName[i]]){
                            let isExisted = true;
                            if(i>0){
                                isExisted = searchNodes(i-1,UserPathData[tempName[i]][j].bgn_event,UserPathData.StartEnd);
                            }
                            if(isExisted){
                                obj[UserPathData[tempName[i]][j].end_event+tempName[i]] = true;
                                tempNodes.push({
                                    "name":query(UserPathData[tempName[i]][j].end_event)+tempName[i]
                                })
                            }

                        }
                    }
                    console.log('tempNodes',tempNodes);
                }
            }
        }
        //判断

        function searchNodes(level,name,startEnd){
            return startEnd == 'bgn_event'?
                UserPathData[tempName[level]].some(item=>item.bgn_event==name)
                :UserPathData[tempName[level]].some(item=>item.end_event==name);
        }


        let fromDate = this.state.fromDate.format('YYYY-MM-DD');
        let toDate = this.state.toDate.format('YYYY-MM-DD');
        let label = fromDate + ' 至 ' + toDate;//{fromDate}至{toDate} | 过去7天
        let locale = {
            "format": 'YYYY-MM-DD',
            "separator": " -222 ",
            "applyLabel": "确定",
            "cancelLabel": "取消",
            "fromLabel": "起始时间",
            "toLabel": "结束时间'",
            "customRangeLabel": "自定义",
            "weekLabel": "W",
            "daysOfWeek": ["日", "一", "二", "三", "四", "五", "六"],
            "monthNames": ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
        };


        return (
            <div>
                <div style={{padding:'20px 12px 10px 12px'}}>
                    <div style={{display:'flex',alignItems:'center'}}>
                        <div style={{marginRight:'20px'}}>选择参与分析的事件</div>
                        <SelectField
                            value={this.state.EventChoice}
                            onChange={this.handleEventChoice}
                            underlineStyle={styles.underlineStyle}
                            floatingLabelText={'共有'+this.state.EventChoice.length+'参与分析'}
                            maxHeight={200}>
                            {
                                DictTitleData && DictTitleData.length>0?
                                    DictTitleData.map((items,key)=>(
                                        <MenuItem key={key+'EventChoice'} >
                                            <Checkbox label={items.name} checked={this.state.EventChoice.indexOf(key)!=-1?true:false}/>
                                        </MenuItem>
                                    )):null
                            }
                        </SelectField>
                    </div>
                    <div style={{display:'flex',alignItems:'center'}}>
                        <div style={{marginRight:'20px'}}>设置</div>
                        <SelectField
                            value={this.state.StartEnd}
                            onChange={this.handleStartEnd}
                            underlineStyle={styles.underlineStyle}
                            maxHeight={200}>
                            {
                                ['起始事件','结束事件'].map((item,key)=>(
                                    <MenuItem value={key} key={key} primaryText={item} />
                                ))
                            }
                        </SelectField>
                        <div style={{marginRight:'20px'}}>为</div>
                        <SelectField
                            value={this.state.EventC}
                            onChange={this.handleEventC}
                            underlineStyle={styles.underlineStyle}
                            maxHeight={200}>
                            {
                                DictTitleData && DictTitleData.length>0?
                                EventChoice.length>0?
                                EventChoice.map((item,key)=>(
                                    <MenuItem value={key} key={key+'EventC'} primaryText={DictTitleData[item].name} />
                                )): <MenuItem value={0} primaryText={'请先选择参与分析的事件'} />
                                    :null
                            }
                        </SelectField>
                        <RaisedButton label="查询" onTouchTap={this.handleQuery} primary={true} />
                    </div>
                </div>
                <div style={{padding:'20px 12px 10px 12px'}}>
                    <div style={{backgroundColor:this.context.muiTheme.palette.accent2Color,
                        height:'60px',display:'flex',borderBottom:'1px solid #d9dadb'}}>
                        <div style={{width:'19%'}}>
                            <DatetimeRangePicker startDate={this.state.fromDate} endDate={this.state.toDate}
                                                 ranges={this.state.ranges}
                                                 alwaysShowCalendars={true}
                                                 onApply={this.handleEvent} locale={locale} >
                                <Button className="selected-date-range-btn" style={{
                                    width: '100%', border: 'none', marginTop: '5px',
                                    color: this.context.muiTheme.palette.accent1Color
                                }}>
                                    <div className="pull-left">
                                        <i className="fa fa-calendar"/>
                                        &nbsp;
                                        <span>
                                    {label}
                                </span>
                                    </div>
                                    <div className="pull-right">
                                        <i className="fa fa-angle-down"/>
                                    </div>
                                </Button>
                            </DatetimeRangePicker>
                        </div>
                        {
                            EventChoice.length>0?
                            <div style={{width:'58%',textAlign:'center',lineHeight:'60px',fontSize:'18px',marginRight:'110px'}}>
                                {StartEnd ==0?'起始事件':'结束事件' } 为{DictTitleData[EventChoice[EventC]].name}的用户行为路径
                            </div>:
                            <div style={{width:'58%',textAlign:'center',lineHeight:'60px',fontSize:'18px',marginRight:'110px'}}>
                                请选择参与分析的事件
                            </div>
                        }

                    </div>
                    <div>
                        {
                            tempNodes.length>0?
                            <ECharts option={this.getOption(tempNodes,tempLinks)} style={{height:'400px'}} />:
                            <div style={{width:'200px',height:'100px',marginLeft:'calc(50% - 100px)',marginTop:'100px'}}>暂无数据！</div>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

CriticalPath.contextTypes = {
    muiTheme: React.PropTypes.object.isRequired
};
const mapStateToProps = (state) => {
    const { authReducer,databaseReducer } = state;
    return {
        DictTitleData: databaseReducer.DictTitleData,
        UserPathData:databaseReducer.UserPathData,
        user:authReducer.user
    };
};

export default connect(
    mapStateToProps
)(CriticalPath);

