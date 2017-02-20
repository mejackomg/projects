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
import Dialog_Delete from './Dialog_Delete.jsx'
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
import {loadGetFunnel,loadFunnelStep} from '../../../reducers/database.js'

class FunnelAnalysis extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dialogOpen: false,
            dialogDeleteOpen:false,
            // open: false
            valueFunnel: 0,
            valueChoose: 0,
            fromDate: moment().subtract(29, 'days'),
            toDate: moment(),
            ranges: {
                '今日': [moment().startOf('day'), moment()],
                '昨天': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                '过去7天': [moment().subtract(6, 'days'), moment()],
                '过去30天': [moment().subtract(29, 'days'), moment()],
                '这个月': [moment().startOf('month'), moment().endOf('month')],
                '上个月': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
            },
            showCheckboxes:true,
            FunnelNewName:[]
        };
    }
    componentDidMount () {
        const {dispatch} = this.props;
        dispatch(loadGetFunnel(this.props.user.userId));
        this.setState({
            FunnelNewName:this.props.Funnel_name
        })
    }
    componentWillReceiveProps (nextProps) {
        const {fromDate,toDate} = this.state;
        const {dispatch} = this.props;
        // console.log('GetData.Funnel_name',this.props.Funnel_name);
        // console.log('nextProps',nextProps.Funnel_name);
        // console.log(nextProps.Funnel_name.toString(),this.props.Funnel_name.toString());

        if(nextProps.createFunnelFlag == 'success' || nextProps.DeleteFunnelFlag == 'success' ) {
            dispatch(loadGetFunnel(this.props.user.userId));
        }
        if(nextProps.Funnel_name.toString() != this.props.Funnel_name.toString()){
            this.setState({FunnelNewName:nextProps.Funnel_name});
            dispatch(loadFunnelStep(nextProps.Funnel_name[0].funnel_name,nextProps.choose_name[0].page_name,fromDate,toDate));
        }
    }
    getOption(){
        const {PathFunnelData,DictTitle} = this.props;
        // console.log('PathFunnelData',PathFunnelData);
        // if(DictTitle && DictTitle.length>0){
        //     console.log(DictTitle)
        // }
        let lengendData = [];
        let valueData = [];
        if(PathFunnelData && PathFunnelData.length>0){
            for(let i=0;i<PathFunnelData.length;i++){
                lengendData.push(PathFunnelData[i].page_name);
                // valueData.push({
                //     "value":PathFunnelData[i].content,
                //     "name":PathFunnelData[i].page_name
                // })
                valueData.push(PathFunnelData[i].content)
            }

        }
        let option = null;
        option = {
            color: ['#3398DB'],
            tooltip : {
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis : [
                {
                    type : 'category',
                    data : lengendData,
                    axisTick: {
                        show:false
                    },
                    axisLine:{
                        show:false
                    }
                }
            ],
            yAxis : [
                {
                    type : 'value',
                    scale:true,
                    show:false,
                    splitLine:{
                        show:false
                    }
                }
            ],
            series : [
                {
                    name:'',
                    type:'bar',
                    barWidth: '60%',
                    data:valueData
                }
            ]
        };

        // 0:{page_name: "提交订单", content: "1111", time: "2016-12-17T09:18:08.000Z"}
        // 1:{page_name: "浏览首页", content: "890", time: "2016-12-17T09:18:36.000Z"}
        // 2:{page_name: "优品", content: "750", time: "2016-12-17T09:18:59.000Z"}


       /*
        console.log('lengendData',lengendData);
        console.log('valueData',valueData);
        option = {
            title: {
                text: '',
                subtext: ''
            },
            tooltip: {
                trigger: 'item',
                formatter: "{b} : {c}人"
            },
            toolbox: {
                feature: {
                    dataView: {readOnly: false},
                    restore: {},
                    saveAsImage: {}
                }
            },
            legend: {
                data: lengendData
            },
            calculable: true,
            series: [
                {
                    name:'漏斗图',
                    type:'funnel',
                    left: '10%',
                    top: 60,
                    //x2: 80,
                    bottom: 60,
                    width: '80%',
                    // height: {totalHeight} - y - y2,
                    // min: 0,
                    // max: 100,
                    minSize: '0%',
                    maxSize: '100%',
                    sort: 'descending',
                    gap: 2,
                    label: {
                        normal: {
                            show: true,
                            position: 'inside'
                        },
                        emphasis: {
                            textStyle: {
                                fontSize: 20
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            length: 10,
                            lineStyle: {
                                width: 1,
                                type: 'solid'
                            }
                        }
                    },
                    itemStyle: {
                        normal: {
                            borderColor: '#fff',
                            borderWidth: 1
                        }
                    },
                    data: valueData
                }
            ]
        };*/
        return option;

    }
    handleOpen = () => {
        this.setState({dialogOpen: true});
    };
    handleDeleteOpen=()=>{
        this.setState({dialogDeleteOpen: true});
    }
    onClosed = () => {
        this.setState({dialogOpen: true});
    };
    handleChange = (event, index, value) => {
        const {dispatch,Funnel_name,choose_name} = this.props;
        const {fromDate,toDate} = this.state;
        this.setState({
            valueFunnel:value,
            valueChoose:0
        });
        dispatch(loadFunnelStep(Funnel_name[value].funnel_name,choose_name[0].page_name,fromDate,toDate))

    }
    handleChange1 =(event, index, value) => {
        this.setState({valueChoose:value});
        const {valueFunnel,fromDate,toDate} = this.state;
        const {dispatch,Funnel_name,choose_name} = this.props;
        dispatch(loadFunnelStep(Funnel_name[valueFunnel].funnel_name,choose_name[value].page_name,fromDate,toDate))
    }
    handleEvent = (event, picker) => {
        const {dispatch,Funnel_name,choose_name} = this.props;
        const {valueFunnel,valueChoose} = this.state;
        this.setState({
            fromDate: picker.startDate,
            toDate: picker.endDate
        });
        dispatch(loadFunnelStep(Funnel_name[valueFunnel].funnel_name,choose_name[valueChoose].page_name,picker.startDate,picker.endDate));
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
        const {choose_name,PathFunnelData} = this.props;
        console.log('PathFunnelData',PathFunnelData);
        const {FunnelNewName} = this.state;
        let FunnelName = [];
        if(FunnelNewName && FunnelNewName.length>0){
            for(let i=0;i<FunnelNewName.length;i++){
                FunnelName.push(FunnelNewName[i].funnel_name)
            }
        }
        let ChooseName = [];
        if(choose_name && choose_name.length>0){
            for(let i=0;i<choose_name.length;i++){
                ChooseName.push(choose_name[i].page_type)
            }
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
                <Toolbar style={{background:this.context.muiTheme.palette.alternateTextColor,color:this.context.muiTheme.palette.textColor}}>
                    <ToolbarGroup firstChild={true}>
                        <ToolbarTitle text="显示漏斗" style={{marginLeft:'30px'}}/>
                        <DropDownMenu value={this.state.valueFunnel} onChange={this.handleChange}>
                            {
                                FunnelName && FunnelName.length>0?
                                    FunnelName.map((item,key)=>
                                        <MenuItem key={key} value={key} primaryText={item} />
                                    ):null
                            }
                        </DropDownMenu>
                        <ToolbarTitle text="按" />
                        <DropDownMenu value={this.state.valueChoose} onChange={this.handleChange1}>
                            {
                                ChooseName && ChooseName.length>0?
                                    ChooseName.map((item,key)=>
                                        <MenuItem key={key+'type'} value={key} primaryText={item} />
                                    ):null
                            }
                        </DropDownMenu>
                        <ToolbarTitle text="查看" />
                    </ToolbarGroup>
                    <ToolbarGroup>
                        <FontIcon />
                        <ToolbarSeparator />
                        <RaisedButton label="删除漏斗" onTouchTap={this.handleDeleteOpen} primary={true} />
                        <RaisedButton label="创建漏斗" onTouchTap={this.handleOpen} primary={true} />
                    </ToolbarGroup>
                </Toolbar>
                <div style={{padding:'20px 12px 10px 12px'}}>
                    <div style={{backgroundColor:this.context.muiTheme.palette.accent2Color,
                        height:'60px',display:'flex',borderBottom:'1px solid #d9dadb'}}>
                        {/*<FlatButton label="筛选条件"*/}
                        {/*labelPosition="after"*/}
                        {/*primary={true}*/}
                        {/*icon={<ContentAdd />}*/}
                        {/*//onTouchTap={isexpanded?this.handleReduce:this.handleExpand}*/}
                        {/*//onTouchTap={this.handleAdd}*/}
                        {/*style={{width:'144px'}} />*/}
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
                                        <span>{label}</span>
                                    </div>
                                    <div className="pull-right">
                                        <i className="fa fa-angle-down"/>
                                    </div>
                                </Button>
                            </DatetimeRangePicker>
                            {/*<div style={{display:'flex',justifyContent:'center'}}>*/}
                                {/*<div>窗口期：</div>*/}
                                {/*<div style={{color: '#3398db'}}>7天</div>*/}
                            {/*</div>*/}
                        </div>
                        {
                            FunnelName && FunnelName.length>0?
                            <div style={{width:'58%',textAlign:'center',lineHeight:'60px',fontSize:'18px',marginRight:'110px'}}>
                                {FunnelName[this.state.valueFunnel]}转化漏斗图
                            </div>:null
                        }
                        <div style={{width:'8%',textAlign:'center'}}>
                            <div style={{color: '#aaa',lineHeight:'30px'}}>总体转化率</div>
                            {
                                PathFunnelData && PathFunnelData.length>0?
                                    <div style={{color: '#3398db',lineHeight:'30px'}}>
                                        {(PathFunnelData[PathFunnelData.length-1].content*100/PathFunnelData[0].content).toFixed(2)}%
                                    </div>:null
                            }
                        </div>
                    </div>
                    <div>
                        {
                            PathFunnelData && PathFunnelData.length>0?
                                <ECharts option={this.getOption()} />:
                                <div style={{textAlign:'center',fontSize:'24px',color:'gray',marginTop:'50px',height:'250px'}}>暂无数据</div>
                        }

                    </div>
                    <div style={{}}>
                        <Table
                            fixedHeader={false}
                            height='300px'
                            selectable={false}
                        >
                            <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
                                <TableRow>
                                    <TableHeaderColumn style={{width:200}}>漏斗步骤</TableHeaderColumn>
                                    <TableHeaderColumn>流失用户</TableHeaderColumn>
                                    <TableHeaderColumn>转化用户</TableHeaderColumn>
                                    <TableHeaderColumn>创建时间</TableHeaderColumn>
                                    <TableHeaderColumn>转化率</TableHeaderColumn>
                                </TableRow>
                            </TableHeader>
                            <TableBody
                                displayRowCheckbox={false}
                                showRowHover={true}
                                //stripedRows={true}
                            >
                                    {
                                        PathFunnelData && PathFunnelData.length>0?
                                            PathFunnelData.map((column, key)=>
                                                <TableRow key={key}>
                                                    <TableRowColumn key={key}>{column.page_name}</TableRowColumn>
                                                    {
                                                        key==PathFunnelData.length-1?
                                                            <TableRowColumn key={key}>0人</TableRowColumn>:
                                                            <TableRowColumn key={key}>{PathFunnelData[key+1].content-column.content}人</TableRowColumn>
                                                    }
                                                    <TableRowColumn key={key}>{column.content}人</TableRowColumn>
                                                    <TableRowColumn key={key}>{column.time}</TableRowColumn>
                                                    {
                                                        key==PathFunnelData.length-1?
                                                        <TableRowColumn key={key}>100%</TableRowColumn>:
                                                        <TableRowColumn key={key}>{(column.content*100/PathFunnelData[key+1].content).toFixed(2)}%</TableRowColumn>
                                                    }

                                                </TableRow>)
                                            :null
                                    }
                            </TableBody>
                        </Table>
                    </div>
                </div>
                <Dialog_Type
                    dialogOpen={this.state.dialogOpen}
                    DictTitle={this.props.DictTitle}
                    onClosed={() => {this.setState({dialogOpen: false})}}
                    Funnel_name = {FunnelName}
                />
                <Dialog_Delete
                    dialogOpen={this.state.dialogDeleteOpen}
                    DictTitle={this.props.DictTitle}
                    onClosed={() => {this.setState({dialogDeleteOpen: false})}}
                    Funnel_name = {FunnelName}
                    PathFunnelData={PathFunnelData}
                />
            </div>
        )
    }
}

FunnelAnalysis.contextTypes = {
    muiTheme: React.PropTypes.object.isRequired
};
const mapStateToProps = (state) => {
    const { authReducer,databaseReducer } = state;
    return {
        Funnel_name: databaseReducer.GetData.Funnel_name,
        choose_name: databaseReducer.GetData.choose_name,
        DictTitle:databaseReducer.GetData.DictTitle,
        PathFunnelData:databaseReducer.PathFunnelData,
        createFunnelFlag:databaseReducer.createFunnelFlag,
        DeleteFunnelFlag:databaseReducer.DeleteFunnelFlag,
        user:authReducer.user
    };
};
export default connect(
    mapStateToProps
)(FunnelAnalysis);

