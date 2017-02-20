/**
 * Created by apple on 2016/11/27.
 */

import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import withWidth, {LARGE, MEDIUM, SMALL}  from '../../../utils/withWidth';

import Paper from 'material-ui/Paper';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import DatetimeRangePicker from 'react-bootstrap-datetimerangepicker';
import moment from 'moment';
import {Button, Glyphicon} from 'react-bootstrap';
import {Tabs, Tab} from 'material-ui/Tabs';
import ECharts from '../../../components/ECharts'//'react-echarts';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

//import IconButton from 'material-ui/IconButton';
//import AddIcon from 'material-ui/svg-icons/content/add.js';
//import ClearIcon from 'material-ui/svg-icons/content/clear.js';
//import Chip from 'material-ui/Chip';

import EventTable from './EventTable.jsx'
import {loadEventColumn, loadEventTriggerTimes} from '../../../reducers/database.js';
import keys from 'object-keys';

const menuItems = ['总次数', '触发用户数']

class EventAnalysis extends Component {
    constructor(props) {
        super(props);
        this.state = {
            eventValue: menuItems[0],
            times: '总次数',
            events: '提交订单',
            sort: '总体',
            period: '按天',
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
        };
    }

    getOption() {
        const {eventData} = this.props;
        const {times}=this.state
        var option = null;
        let type=[];
        let everyday=[];
        let singleDays=[];
        let sumTimes=[];
        let sum=[];
        let s=[];
        if (!eventData){
            console.log(!eventData)
        }
        else {

            singleDays= (Object.keys(eventData)).map((item)=> {
                return eventData[item]
            })


            type = keys(eventData);
            if(singleDays.length>0){
                everyday=keys(singleDays[0])

                singleDays.forEach(item=>{
                    sumTimes.push(
                        (Object.keys(item)).map((key)=> {
                            return item[key]
                        }))
                })
            }

            sumTimes.forEach(row =>{
                sum.push(
                    (Object.keys(row)).map((key)=> {
                        return row[key]
                    })
                )
            })

            for (var i = 0; i < sum.length; i++) {
                if(times=='总次数'){
                    s.push({
                        name: type[i] ,
                        type: 'line',
                        // stack: 'ddf',
                        data: sum[i].map((value, index)=> {
                            return value['总触发次数'];
                        }),

                    })
                }else{
                    s.push({
                        name: type[i] ,
                        type: 'line',
                        // stack: 'ddf',
                        data: sum[i].map((value, index)=> {
                            return value['触发用户数'];
                        }),
                    })

                }
            }
            option = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                        type: 'line'        // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                toolbox: {
                    feature: {
                        // dataView: {show: true, readOnly: true},
                        magicType: {show: true, type: ['line', 'bar']},
                        restore: {show: true},
                        saveAsImage: {show: true}
                    },
                    right: '10%'
                },
                legend: {
                    data:type
                },
                dataZoom: [{
                    type: 'inside',
                    start: 0,
                    end: 100
                }, {
                    start: 0,
                    end: 10,
                    handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
                    handleSize: '80%',
                    handleStyle: {
                        color: '#fff',
                        shadowBlur: 3,
                        shadowColor: 'rgba(0, 0, 0, 0.6)',
                        shadowOffsetX: 2,
                        shadowOffsetY: 2
                    }
                }],
                xAxis: {
                    type: 'category',
                    data: everyday,
                },
                yAxis: [
                    {
                        type: 'value',
                        name: times,
                        axisLabel: {
                            formatter: '{value}  '
                        },
                        //splitNumber:1 ,
                    }
                ],
                series: s
            }
        }

        return option;
    };


    componentDidMount() {
        const {events, times, sort, fromDate, toDate, period} = this.state;
        const {dispatch} = this.props;
        let value1='submitOrder';
        const from = fromDate.format('YYYY-MM-DD');
        const to = toDate.format('YYYY-MM-DD');
        dispatch(loadEventColumn());
        dispatch(loadEventTriggerTimes(value1, times, sort, from, to, period));

    }

    handleChangeEvent = (event, index, value) => {
        const {events,times, sort, fromDate, toDate, period} = this.state;
        const {dispatch,eventCoulumn} = this.props;
        let value1=0;
        for(var i=0;i<eventCoulumn.length;i++){
            if(eventCoulumn[i]["事件名"]==value){
                value1=eventCoulumn[i]["event"];
                break;
            }
        }
        const from = fromDate.format('YYYY-MM-DD');
        const to = toDate.format('YYYY-MM-DD');
        this.setState({events: value});
        dispatch(loadEventTriggerTimes(value1, times, sort, from, to, period));
    }

    handleChangeTimes = (event, index, value) => {
        this.setState({
            eventValue: value,
            times: value
        })
    }

    /*handleRequestDelete = (key) => {
     const {events, times, sort, fromDate, toDate, period}=this.state;
     const {dispatch,eventCoulumn} = this.props;
     let value1=0;
     for(var i=0;i<eventCoulumn.length;i++){
     if(eventCoulumn[i]["事件名"]==value){
     value1=eventCoulumn[i]["event"];
     break;
     }
     }
     const chipToDelete = times.map((chip) => chip.key).indexOf(key);
     times.splice(key, 1);
     this.setState({times: times});
     const from = fromDate.format('YYYY-MM-DD');
     const to = toDate.format('YYYY-MM-DD');
     dispatch(loadEventTriggerTimes(value1, times, sort, from, to, period));

     };*/

    handleChangeSort = (event, index, value) => {
        const {events, times, fromDate, toDate, period}=this.state;
        const {dispatch,eventCoulumn} = this.props;
        let value1=0;
        for(var i=0;i<eventCoulumn.length;i++){
            if(eventCoulumn[i]["事件名"]==events){
                value1=eventCoulumn[i]["event"];
                break;
            }
        }
        this.setState({sort: value});
        const from = fromDate.format('YYYY-MM-DD');
        const to = toDate.format('YYYY-MM-DD');
        dispatch(loadEventTriggerTimes(value1, times, value, from, to, period));
    };

    handleEvent = (event, picker) => {
        const {events, times,sort,period}=this.state;
        const {dispatch,eventCoulumn} = this.props;
        let value1=0;
        for(var i=0;i<eventCoulumn.length;i++){
            if(eventCoulumn[i]["事件名"]==events){
                value1=eventCoulumn[i]["event"];
                break;
            }
        }
        this.setState({
            fromDate: picker.startDate,
            toDate: picker.endDate,
        });
        const fromDate = picker.startDate.format('YYYY-MM-DD');
        const toDate = picker.endDate.format('YYYY-MM-DD');
        dispatch(loadEventTriggerTimes(value1, times, sort, fromDate, toDate, period));
    }

    handleChange_time = (event, index, value) => {
        const {events, times, sort, fromDate, toDate}=this.state;
        const {dispatch,eventCoulumn} = this.props;
        let value1=0;
        for(var i=0;i<eventCoulumn.length;i++){
            if(eventCoulumn[i]["事件名"]==events){
                value1=eventCoulumn[i]["event"];
                break;
            }
        }
        this.setState({period: value});
        const from = fromDate.format('YYYY-MM-DD');
        const to = toDate.format('YYYY-MM-DD');
        dispatch(loadEventTriggerTimes(value1, times, sort, from, to, value));
    }

    getStyles() {
        const styles = {
            searchBar: {
                zIndex: this.context.muiTheme.zIndex.appBar,//-1,
                height: this.context.muiTheme.palette.desktopSubheaderHeight
            },
            content: {
                margin: this.context.muiTheme.spacing.desktopGutter,
                zIndex: 0,
            },

            contentWhenMedium: {
                margin: `${this.context.muiTheme.spacing.desktopGutter * 2}px  ${this.context.muiTheme.spacing.desktopGutter * 3}px`,
            },
            underlineStyle: {
                borderColor: this.context.muiTheme.palette.accent1Color,
            },
            hintStyle: {
                color: this.context.muiTheme.palette.accent3Color,
            },
            underlineFocusStyle: {
                borderColor: this.context.muiTheme.palette.primary1Color
            },
            customWidth: {
                minWidth: '112px',
                width: 'auto',
                marginLeft: '20px',
            },
            wrapper: {
                display: 'flex',
                flexWrap: 'wrap',
                float: 'left'
            },
        };

        if (this.props.width === MEDIUM || this.props.width === LARGE)
            styles.content = Object.assign(styles.content, styles.contentWhenMedium);

        return styles;
    }

    render() {
        const styles = this.getStyles()
        const { eventCoulumn,eventData,eventTriggerData} = this.props;
        var opens = 'right';
        const {times}=this.state;
        var fromDate = this.state.fromDate.format('YYYY-MM-DD');
        var toDate = this.state.toDate.format('YYYY-MM-DD');
        var label = fromDate + ' 至 ' + toDate;//{fromDate}至{toDate} | 过去7天
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
        const  option = this.getOption();

        return (
            <Paper style={styles.content}>

                <Toolbar>
                    <ToolbarGroup>
                        <ToolbarTitle text="行为事件分析"/>
                    </ToolbarGroup>
                </Toolbar>

                <div style={{}}>

                    <div style={{display: 'flex', flexDirection: 'row'}}>
                        <div style={{float: 'left'}}>
                            <span style={{marginLeft: '20px'}}>显示</span>
                            <SelectField
                                value={this.state.events}
                                onChange={ this.handleChangeEvent}
                                maxHeight={200}
                                hintStyle={styles.hintStyle}
                                underlineStyle={styles.underlineStyle}
                                underlineFocusStyle={styles.underlineFocusStyle}
                                style={styles.customWidth}
                            >
                                {
                                    eventCoulumn.map((item, key)=>
                                        <MenuItem key={key} value={item.事件名} primaryText={item.事件名}/>
                                    )
                                }
                            </SelectField>
                            <span style={{marginLeft: '20px'}}>的</span>
                        </div>

                        <div style={{float: 'left'}}>
                            <SelectField
                                value={times}
                                onChange={ this.handleChangeTimes}
                                maxHeight={200}
                                hintStyle={styles.hintStyle}
                                underlineStyle={styles.underlineStyle}
                                underlineFocusStyle={styles.underlineFocusStyle}
                                style={styles.customWidth}
                            >
                                {
                                    menuItems.map((menu, key)=>
                                        <MenuItem key={key} value={menu}
                                                  primaryText={menu}
                                                  disabled={false }/>
                                    )
                                }
                            </SelectField>
                        </div>


                    </div>

                    <div>
                        <Divider />
                    </div>

                    <div style={{display: 'flex', flexDirection: 'row'}}>
                        <div style={{float: 'left'}}>
                            <span style={{marginLeft: '33px'}}>按</span>
                            <SelectField
                                value={this.state.sort}
                                onChange={ this.handleChangeSort}
                                maxHeight={200}
                                hintStyle={styles.hintStyle}
                                underlineStyle={styles.underlineStyle}
                                underlineFocusStyle={styles.underlineFocusStyle}
                                style={styles.customWidth}
                            >
                                <MenuItem  value={"总体"} primaryText={"总体"}/>
                                <MenuItem  value={"操作系统"} primaryText={"操作系统"}/>
                                <MenuItem  value={"设备型号"} primaryText={"设备型号"}/>

                            </SelectField>
                            <span style={{marginLeft: '20px'}}>查看</span>

                        </div>


                    </div>


                    <div>
                        <Divider />
                    </div>

                    <div style={{display: 'flex', flexDirection: 'row'}}>
                        <div style={{width: '200px'}}>
                            <DatetimeRangePicker startDate={this.state.fromDate} endDate={this.state.toDate}
                                                 ranges={this.state.ranges}
                                                 alwaysShowCalendars={true}
                                                 onApply={this.handleEvent} locale={locale} opens={opens}>
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

                        <div style={{width: '40%', textAlign: 'center', marginTop: '10px'}}>
                            <span>{this.state.events}的{times}</span>
                        </div>


                        <div style={{width: '40%', textAlign: 'center'}}>
                            <SelectField
                                value={this.state.period }
                                onChange={ this.handleChange_time}
                                maxHeight={200}
                                hintStyle={styles.hintStyle}
                                underlineStyle={styles.underlineStyle}
                                underlineFocusStyle={styles.underlineFocusStyle}
                                style={{width: 100}}
                            >
                                <MenuItem value={"按天"} primaryText="按天"/>
                                <MenuItem value={"按周"} primaryText="按周"/>
                                <MenuItem value={"按月"} primaryText="按月"/>
                            </SelectField>
                        </div>
                    </div>


                    <div style={{width: '100%', height: '250px', textAlign: 'center'}}>
                        { !eventData ?
                            <div style={{
                                textAlign: 'center', fontSize: '24px',
                                color: 'gray',marginTop:'100px'
                            }}> 暂无数据!</div>
                            :
                            <ECharts option={option} notMerge={true} />

                        }
                    </div>

                    <div>
                        <Divider />
                    </div>

                    <div>
                        {times=='总次数' ?
                            <EventTable tableData={eventTriggerData}  type={this.state.sort} times={times} />
                            :
                            <EventTable tableData={eventTriggerData}  type={this.state.sort} times={times} />
                        }

                    </div>


                </div>

            </Paper>
        );
    }
}

EventAnalysis.contextTypes = {
    muiTheme: React.PropTypes.object,
}

EventAnalysis.childContextTypes = {
    muiTheme: React.PropTypes.object,
};

EventAnalysis.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
    const {databaseReducer} = state;
    return {
        eventCoulumn: databaseReducer.EventCoulumnData.eventCoulumn,
        eventType: databaseReducer.EventCoulumnData.eventType,
        eventData: databaseReducer.event.eventData,
        eventTriggerData: databaseReducer.event.eventTriggerData,
    };
};

export default connect(
    mapStateToProps
)(withWidth()(EventAnalysis));




