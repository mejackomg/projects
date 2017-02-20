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
import SaleTable from './SaleTable.jsx'

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
    }
    handleChange = (value) => {
        // console.log('tab',value);
        if(value !== 0 || value !== 1 || value !== 2){
            return;
        }
        this.setState({
            slideIndex: value,
        });
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

        if(fromDate && date) {
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
            tabs: {
                width: '100%',
                // backgroundColor: 'transparent',
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


    render() {
        const {saleData} = this.props;
        const styles = this.getStyles( );

        var xAxisData = [], seriesData = [];
        if(saleData.length > 0) {
            for(var i=0; i<saleData.length; i++) {
                xAxisData.push(saleData[i]['日期']);
                seriesData.push(saleData[i]['订单金额']);
            }
            option_tabline.xAxis.data = xAxisData;
            option_tabline.series[0].data = seriesData;
        }

        return (
            <div>
                <Paper style={styles.style} zDepth={2}>
                    <Toolbar>
                        <ToolbarGroup>
                            <ToolbarTitle text="销售记录"/>
                        </ToolbarGroup>
                    </Toolbar>
                    <div style={{}}>
                        <Tabs
                            tabItemContainerStyle={styles.tabs}
                            onChange={this.handleChange}
                            value={this.state.slideIndex}>

                            <Tab label="销售记录表" value={0}>
                                <div style={{display:'flex',height:'80px',marginTop:'20px',padding:'0 30px'}}>
                                    <div style={{display:'flex',flexDirection:'row',flex:1.5}}>
                                        <div style={{flex:1,marginRight:'20px'}}>
                                            <span>From</span>
                                            <DatePicker
                                                style={{minWidth: '50px',width:'100%',overflow:'hidden'}}
                                                textFieldStyle={{width:'100%'}}
                                                hintText="开始日期"
                                                autoOk={true}
                                                maxDate={this.state.maxDate}
                                                value={this.state.fromDate}
                                                onChange={this.handleChangeFromDate}
                                            />
                                        </div>
                                        <div style={{flex:1}}>
                                            <span>To</span>
                                            <DatePicker
                                                style={{minWidth: '50px',width:'100%',overflow:'hidden'}}
                                                textFieldStyle={{width:'100%'}}
                                                hintText="结束日期"
                                                autoOk={true}
                                                minDate={this.state.minDate}
                                                value={this.state.toDate}
                                                onChange={this.handleChangeToDate}
                                            />
                                        </div>
                                    </div>
                                    {/*<div style={{flex:4,display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center'}}>*/}
                                        {/*<div style={{flex:1,textAlign:'center'}}>销售记录</div>*/}
                                        {/*<RadioButtonGroup style={{display:'flex',flexDirection:'row',flex:5,height:'26px'}} name="shipSpeed" onChange={this.handleChangeRadio} defaultSelected={7}>*/}
                                            {/*<RadioButton*/}
                                                {/*value={7}*/}
                                                {/*label="最近7天"*/}
                                                {/*style={styles.radioButton}*/}
                                                {/*labelStyle={{minWidth:'50px',width:'50px'}}*/}
                                            {/*/>*/}
                                            {/*<RadioButton*/}
                                                {/*value={30}*/}
                                                {/*label="最近30天"*/}
                                                {/*style={styles.radioButton}*/}
                                                {/*labelStyle={{minWidth:'50px',width:'58px'}}*/}
                                            {/*/>*/}
                                            {/*<RadioButton*/}
                                                {/*value={90}*/}
                                                {/*label="最近90天"*/}
                                                {/*style={styles.radioButton}*/}
                                                {/*labelStyle={{minWidth:'50px',width:'58px'}}*/}
                                            {/*/>*/}
                                        {/*</RadioButtonGroup>*/}
                                    {/*</div>*/}
                                </div>
                                <SaleTable
                                    data={saleData}
                                />
                            </Tab>
                            <Tab label="销售额曲线图" value={1}>
                                <div style={{width:'100%',height:'250px',textAlign:'center'}}>
                                    <ECharts option={option_tabline}/>
                                </div>
                            </Tab>
                            <Tab label="口碑曲线图" value={2} />
                        </Tabs>

                    </div>
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




