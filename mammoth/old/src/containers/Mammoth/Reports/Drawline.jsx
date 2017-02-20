import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import SwipeableViews from 'react-swipeable-views';

import ActiveTheme from '../../../mui-themes/active-theme.js';
import getMuiTheme from '../../../../node_modules/material-ui/styles/getMuiTheme';
import withWidth, {LARGE, MEDIUM,SMALL}  from '../../../utils/withWidth';

import ECharts from '../../../components/ECharts.js';
import ReactEcharts from 'echarts-for-react';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import {Tabs, Tab} from 'material-ui/Tabs';
import {Card,CardHeader,CardText} from 'material-ui/Card';
import Paper from 'material-ui/Paper';

import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import DatePicker from 'material-ui/DatePicker';

import {
    colors,
    spacing,
    typography
} from 'material-ui/styles';
import { loadSaleAnalysis} from '../../../reducers/database.js';

export default class Drawline extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 1,
            name1:'16,247',
            name2:'16,287',
            Takeout:'15,852',
            arrival:'15,222',
            averagePrice:'123,234',
            user:'12,333',
            shop:'23,445'
        };


    }

    componentDidMount() {
        // const { dispatch , shopsId } = this.props;
        // // const {radioIndex} = this.state;
        // dispatch(loadSaleAnalysis(shopsId));
    }

    getStyles()
    {
        const styles = {
            tabs: {
                width: '100%',
                //backgroundColor: 'transparent',
            },
            style:{
                // margin:'0px 72px',
                fontSize:'14px',
                color:'#1565C0',
                clear:'both',
                // height:500
            },
            radioButton: {
                // flex:1,
                display:'flex',
                alignItems:'center',
                justifyContent:'center'

            }

        };
        // if ( this.props.width === MEDIUM || this.props.width === LARGE )
        // styles.content = Object.assign(styles.content, styles.contentWhenMedium);

        return styles;
    }

    getoption_Order(){
        var that = this;
        const option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                    type: 'line'        // 默认为直线，可选为：'line' | 'shadow'
                },
                formatter: function (params) {
                    // if(params[0].value !== that.state.name1 || params[1].value !== that.state.name2 || params[2].value !== that.state.name3){
                    if(params[0].value !== that.state.Takeout || params[1].value !== that.state.arrival){
                        that.setState({
                            Takeout:params[0].value,
                            arrival:params[1].value
                            // name2:
                            // name3:params[2].value
                        });
                    }
                    var format = params[0].seriesName+':'+params[0].value+'人';
                    for(var i=1; i<params.length; i++) {
                        format += '<br>';
                        format += params[i].seriesName+':'+params[i].value+'人';
                    }
                    // console.log(params);
                    return format;
                }
            },
            toolbox: {
                feature: {
                    // dataView: {show: true, readOnly: false},
                    magicType: {show: true, type: ['line', 'bar']},
                    restore: {show: true},
                    saveAsImage: {show: true}
                }

            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: ['11-9', '11-10', '11-11', '11-12', '11-13', '11-14', '11-15']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: '外卖',
                    type: 'line',
                    stack: '总量',
                    data: [120, 132, 101, 134, 90, 230, 210]
                },
                {
                    name: '到店',
                    type:'line',
                    stack: '总量',
                    data: [82, 83, 90, 93, 12, 13, 132]
                }]
        }
        return option;
    }


    handleChange = (event, index, value) => this.setState({value});
    render() {
        const {data} = this.props;
        return (
            <div>
                <Paper style={{width:'48%',margin:'0 0 10px 10px'}}>
                    <article style={{height:'318px'}}>
                        <header style={{display:'flex',padding:'8px 10px',cursor:'move',transition:'background 0.2s',borderBottom:'1px solid #ececee'}}>
                            <div style={{width:'76%'}}>
                                <div style={{fontSize:'16px',lineHeight:'24px',maxWidth:'calc(100%-150px)',color:'#4c535a'}}>
                                    <p style={{margin:'0 0 3px 0'}}>过去一周的每日订单量</p>
                                </div>
                                <div style={{fontSize:'12px',color:'#aaa'}}>
                                    <span>2016-11-8至2016-11-14 | 过去7天</span>
                                </div>
                            </div>
                            <div style={{width:'24%',margin:'-8px 0 0 33px'}}>
                                <DropDownMenu value={this.state.value} onChange={this.handleChange}>
                                    <MenuItem value={1} primaryText="按天" />
                                    <MenuItem value={2} primaryText="按周" />
                                    <MenuItem value={3} primaryText="按月" />
                                </DropDownMenu>
                            </div>

                        </header>
                        <div style={{height:'252px'}}>
                            <div style={{width:'100%',textAlign:'center',borderBottom:'1px solid #f3f3f3',height:'23px',lineHeight:'23px'}}>11-8（二）</div>
                            <div style={{textAlign:'center',margin:'10px 0 0 165px',color:'#3398db',height:'36px',display:'flex'}}>
                                <div style={{width:'31%'}}>
                                    <span style={{fontSize:'24px',lineHeight:'36px'}}>{this.state.Takeout}</span>
                                    <span style={{fontSize:'12px'}}>人</span><br/>
                                    <span style={{color:'#aaa',whiteSpace:'nowrap',textAlign:'center',margin:'0px'}}>到店</span>
                                </div>
                                <div style={{width:'31%'}}>
                                    <span style={{fontSize:'24px',lineHeight:'36px'}}>{this.state.arrival}</span>
                                    <span style={{fontSize:'12px'}}>人</span><br/>
                                    <span style={{color:'#aaa',whiteSpace:'nowrap',textAlign:'center',margin:'0px'}}>外卖</span>
                                </div>
                            </div>

                            <div style={{height:'200px',padding:'0 10px',marginTop:'-20px'}}>
                                <ECharts option={this.getoption_Order()}/>
                            </div>
                        </div>
                    </article>
                </Paper>
            </div>



        );


    }
}
