import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import SwipeableViews from 'react-swipeable-views';

import ActiveTheme from '../../../mui-themes/active-theme.js';
import getMuiTheme from '../../../../node_modules/material-ui/styles/getMuiTheme';
import withWidth, {LARGE, MEDIUM,SMALL}  from '../../../utils/withWidth';

import ECharts from 'react-echarts';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import {Tabs, Tab} from 'material-ui/Tabs';
import {Card,CardHeader,CardText} from 'material-ui/Card';
import Paper from 'material-ui/Paper';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import DatePicker from 'material-ui/DatePicker';
import {
    colors,
    spacing,
    typography
} from 'material-ui/styles';
import { loadSaleTable, loadSaleTable1} from '../../../reducers/database.js';
import RiskTable from './RiskTable.jsx'

const option_tabline={
    tooltip: {
        trigger: 'axis'
    },
    toolbox: {
        show: false,
        feature: {
            dataZoom: {
                yAxisIndex: 'none'
            },
            // dataView: {readOnly: false},
            magicType: {type: ['line', 'bar']},
            restore: {},
            saveAsImage: {}
        }
    },
    xAxis:  {
        type: 'category',
        name: '日期',
        boundaryGap: false,
        data: ['周一','周二','周三','周四','周五','周六','周日']
    },
    yAxis: {
        type: 'value',
        name: '销售额（元）',
        axisLabel: {
            formatter: '{value} '
        }
    },
    series: [
        {
            name:'销售额',
            type:'line',
            data:[6, 21, 65, 60, 50, 70, 80],
            markLine: {
                data: [
                    {type: 'average', name: '平均值'}
                ]
            }
        }
    ]
}


class ShopsRecord extends Component {
    constructor(props) {
        super(props);
        const minDate = new Date();
        const maxDate = new Date();
        minDate.setFullYear(minDate.getFullYear() - 100);
        minDate.setHours(0, 0, 0, 0);
        maxDate.setFullYear(maxDate.getFullYear() + 100);
        maxDate.setHours(0, 0, 0, 0);
        this.state = {
            slideIndex: 0,
            radioIndex:7,
            fromDate: null,
            toDate: null,
            minDate: minDate,
            maxDate: maxDate
        };
    }

    componentDidMount() {
        const { dispatch , shopsId } = this.props;
        const {radioIndex} = this.state;
        dispatch(loadSaleTable(shopsId,radioIndex));
    };
    handleChangeRadio = (event, value) =>{
        const { dispatch , shopsId } = this.props;
        this.setState({
            radioIndex: value
        });
        dispatch(loadSaleTable(shopsId,value));
    };
    handleChangeFromDate = (event, date) => {
        this.setState({
            fromDate: date,
            minDate: date
        });
        const { dispatch , shopsId } = this.props;
        const { toDate} = this.state;
        if(date && toDate) {
            dispatch(loadSaleTable1(shopsId,this.changeDateFormat(date),this.changeDateFormat(toDate)));
        }
    };
    handleChangeToDate = (event, date) => {
        this.setState({
            toDate: date,
            maxDate: date
        });

        const { dispatch , shopsId } = this.props;
        const { fromDate} = this.state;
        // console.log(fromDate);
        // console.log(date);
        if(fromDate && date) {
            // console.log('request');
            dispatch(loadSaleTable1(shopsId,this.changeDateFormat(fromDate),this.changeDateFormat(date)));
        }
    };
    changeDateFormat = (date) => {
        var newdate = '';
        newdate += date.getFullYear();
        if((date.getMonth()+1)<10) {
            newdate += ('0' + (date.getMonth()+1));
        } else {
            newdate += date.getMonth()+1;
        }
        newdate += date.getDate();
        return newdate;
    }

    getStyles()
    {
        const styles = {
            toolbar: {
                position:'fixed',
                left:0,
                width:'100%'
            },
            tabs: {
                width: '100%',
                backgroundColor: 'transparent',
            },
            fontstyle:{
                fontSize:'14px',
                color:'#1565C0',
                fontFamily:'微软雅黑',
                paddingLeft:'50px'
            },
            listyle:{
                listStyle:'none',
                display:'inline-block',
                border:'1px solid #03A9F4',
                height:25,
                width:'50%',
                borderRight:'none',
                textAlign:'center'
            },
            listyle1:{
                listStyle:'none',
                display:'inline-block',
                height:25,
                width:'35%',
                margin:'0px',
                padding:'0px'
            },
            style:{
                margin:'0px 40px',
                fontSize:'14px',
                color:'#1565C0',
                clear:'both',
                padding:'15px'
                // height:500
            },
            radioButton: {
                width:'23%',
                display:'inline-block'
            },
            after:{
                clear:'both',
                display:'block'
            }
        };

        if ( this.props.width === MEDIUM || this.props.width === LARGE )
            styles.content = Object.assign(styles.content, styles.contentWhenMedium);

        return styles;
    }


    render() {
        // console.log(this.props);
        const {saleData} = this.props;
        const styles = this.getStyles( )

        var xAxisData = [], seriesData = [];
        if(saleData.length > 0) {
            for(var i=0; i<saleData.length; i++) {
                xAxisData.push(saleData[i]['日期']);
                seriesData.push(saleData[i]['订单金额']);
            }
            option_tabline.xAxis.data = xAxisData;
            option_tabline.series[0].data = seriesData;
        }

        if (this.props.width == LARGE) {
            styles.toolbar.left = 240;
            styles.toolbar.width = 'calc(100% - 240px)'
        }
        else{
            styles.toolbar.left = 0
            styles.toolbar.width = '100%'
        }
        return (
            <div>

                    <div style={{marginTop:'50px'}}>
                        <ul style={{display:'inline-block',width:'35%',height:66,margin:'0px',padding:'0px',textAlign:'center'}}>
                            <li style={styles.listyle1}>
                                <span>From</span>
                                <DatePicker
                                    style={{minWidth: '100px',width:'100%',overflow:'hidden'}}
                                    hintText="开始日期"
                                    autoOk={true}
                                    maxDate={this.state.maxDate}
                                    value={this.state.fromDate}
                                    onChange={this.handleChangeFromDate}
                                />
                            </li>
                            <li style={{listStyle:'none', display:'inline-block', height:25,width:'35%', margin:'0px',
                                padding:'0px',marginLeft:'30px'}}>
                                <span>To</span>
                                <DatePicker
                                    style={{minWidth: '100px',width:'100%',overflow:'hidden'}}
                                    hintText="结束日期"
                                    autoOk={true}
                                    minDate={this.state.minDate}
                                    value={this.state.toDate}
                                    onChange={this.handleChangeToDate}
                                />
                            </li>
                        </ul>
                        <div style={{float:'right',width:'65%',height:'auto',minHeight:66,maxHeight:120,overflow:'hidden'}}>
                            {/*<div style={styles.fontstyle}>销售记录</div>*/}

                            <RadioButtonGroup style={{width:'90%',marginLeft:'15%'}} name="shipSpeed" onChange={this.handleChangeRadio} defaultSelected={7}>
                                <RadioButton
                                    value={7}
                                    label="最近7天"
                                    style={styles.radioButton}

                                />
                                <RadioButton
                                    value={30}
                                    label="最近30天"
                                    style={styles.radioButton}
                                />
                                <RadioButton
                                    value={90}
                                    label="最近90天"
                                    style={styles.radioButton}
                                />
                            </RadioButtonGroup>
                        </div>
                        <div style={styles.after}></div>
                    </div>
                    <Paper style={styles.style} zDepth={1}>
                        <RiskTable data={Date} />
                    </Paper>

            </div>
        );


    }
}

ShopsRecord.propTypes = {
    dispatch:PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
    const { databaseReducer } = state;

    return {
        saleData: databaseReducer.saleData
    };
};

export default connect(
    mapStateToProps
)(ShopsRecord);




