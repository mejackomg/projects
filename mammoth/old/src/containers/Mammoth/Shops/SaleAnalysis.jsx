import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import SwipeableViews from 'react-swipeable-views';

import ActiveTheme from '../../../mui-themes/active-theme.js';
import getMuiTheme from '../../../../node_modules/material-ui/styles/getMuiTheme';
import withWidth, {LARGE, MEDIUM, SMALL}  from '../../../utils/withWidth';

import ECharts from '../../../components/ECharts.js';
// import ReactEcharts from 'echarts-for-react';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import {Tabs, Tab} from 'material-ui/Tabs';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import Paper from 'material-ui/Paper';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import DatePicker from 'material-ui/DatePicker';
import Divider from 'material-ui/Divider';

import {loadSaleAnalysis, loadSaleTable1, loadSaleTable} from '../../../reducers/database.js';
import OrderDetail from './OrderDetail.jsx'
import OrderRevoke from './OrderRevoke.jsx'

const option_return = {
    tooltip: {
        trigger: 'item',
        formatter: "{b}:{d}%"
    },
    legend: {
        orient: 'vertical',
        left: 'left',
        data: ['']
    },
    series: [
        {
            type: 'pie',
            radius: ['40%', '55%'],
            label: {
                normal: {
                    position: 'center'
                }
            },
            data: [
                {
                    value: 0,
                    name: '成交率',
                    label: {
                        normal: {
                            formatter: '{d} %',
                            textStyle: {
                                fontSize: 20
                            }
                        }
                    }
                },
                {
                    value: 1,
                    name: '占位',
                    tooltip: {
                        show: false
                    },
                    itemStyle: {
                        normal: {
                            color: '#999'
                        }
                    },
                    label: {
                        normal: {
                            formatter: '\n成交率'
                        }
                    }
                }
            ]
        }
    ]
};
class SaleAnalysis extends Component {
    constructor(props) {
        super(props);
        const minDate = new Date();
        const maxDate = new Date();
        minDate.setFullYear(minDate.getFullYear() - 100);
        minDate.setHours(0, 0, 0, 0);
        maxDate.setFullYear(maxDate.getFullYear() + 100);
        maxDate.setHours(0, 0, 0, 0);
        this.state = {
            page: 1,
            pageLineCount: 10,
            slideIndex: 0,
            radioIndex: 7,
            fromDate: null,
            toDate: null,
            minDate: minDate,
            maxDate: maxDate
        };
    }
    componentDidMount() {
        const {dispatch, shopsId} = this.props;
        const {minDate, maxDate, radioIndex} = this.state;
        // const {radioIndex} = this.state;
        dispatch(loadSaleAnalysis(shopsId));
        dispatch(loadSaleTable(shopsId, radioIndex));
    }
    getOption() {
        const {saleData} = this.props;
        var option = null;
        if (saleData.length > 0) {
            var xData = [];
            var y1Data = [];
            var y2Data = [];
            var y3Data = [];
            for (var i = 0; i < saleData.length; i++) {
                xData.push(saleData[i]['日期']);
                y1Data.push(saleData[i]['销售额']);
                y2Data.push(saleData[i]['外卖次数']);
                y3Data.push(saleData[i]['到店次数']);
            }

            option = {
                tooltip: {
                    trigger: 'axis',
                    /*axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                     type: 'line'        // 默认为直线，可选为：'line' | 'shadow'
                     }*/
                },
                toolbox: {
                    feature: {
                        // dataView: {show: true, readOnly: false},
                        magicType: {show: true, type: ['line', 'bar']},
                        restore: {show: true},
                        saveAsImage: {show: true}
                    },
                    right: '10%'
                },
                legend: {
                    data: ['外卖', '到店', '销售额']
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
                // grid: {
                //     left: '3%',
                //     right: '40%',
                //     bottom: '3%',
                //     containLabel: true
                // },
                xAxis: {
                    type: 'category',
                    data: xData.map((value, index)=> {
                        return value
                    }),
                },
                yAxis: [
                    {
                        type: 'value',
                        name: '订单量',
                        axisLabel: {
                            formatter: '{value}单  '
                        }
                    },
                    {
                        type: 'value',
                        name: '销售额',
                        axisLabel: {
                            formatter: '{value}元',

                        }
                    }
                ],
                series: [
                    {
                        name: '外卖',
                        type: 'bar',
                        stack: '总量',
                        label: {
                            normal: {
                                show: true,
                                position: 'insideRight'
                            }
                        },
                        data: y2Data.map((value, index)=> {
                            return value
                        }),
                    },
                    {
                        name: '到店',
                        type: 'bar',
                        stack: '总量',
                        label: {
                            normal: {
                                show: true,
                                position: 'insideRight'
                            }
                        },
                        data: y3Data.map((value, index)=> {
                            return value
                        }),
                    },
                    {
                        name: '销售额',
                        type: 'bar',
                        yAxisIndex: 1,
                        data: y1Data.map((value, index)=> {
                            return value
                        }),
                    }
                ]
            }
        }
        return option;
    };



    handleChange = (value) => {
        if (value !== 0 || value !== 1 || value !== 2) {
            return;
        }
        this.setState({
            slideIndex: value,
        });
    };
    handleChangeRadio = (event, value) => {
        const {dispatch, shopsId} = this.props;
        this.setState({
            radioIndex: value
        });
        dispatch(loadSaleTable(shopsId, value));
    };
    handleChangeFromDate = (event, date) => {

        this.setState({
            fromDate: date,
            minDate: date
        });
        const {dispatch, shopsId} = this.props;
        const {toDate} = this.state;
        if (date && toDate) {
            dispatch(loadSaleTable1(shopsId, date, toDate));
        }
    };

    handleChangeToDate = (event, date) => {
        this.setState({
            toDate: date,
            maxDate: date
        });
        const {dispatch, shopsId} = this.props;
        const {fromDate} = this.state;
        if (fromDate && date) {
            dispatch(loadSaleTable1(shopsId, fromDate, date));
        }
    };

    handleMouseDown_SetPage = (page)=> {
        this.setState({page});
    }

    handleMouseDown_setPageLineCount = (count)=> {
        this.setState({pageLineCount: count});
    }

    changeNum = (num) =>{
        var str="";
        if(num>10000){
            var n=num/10000;
            var nn=n + '';
            var str= nn.split('.');
            var n0=str[0];
            var n1=str[1];
            var n00=n0 + '';
            var n11=n1 +'';
            var n12=n11.substring(0,2);
            str=n0 + '.' + n12+ '万';
        } else{
            str=num +'';
        }
        var newStr = "";
        var count = 0;
        var strarr = str.split('.');
        for(var i=strarr[0].length-1;i>=0;i--){
            if(count % 3 == 0 && count != 0){
                newStr = str.charAt(i) + "," + newStr;
            }else{
                newStr = str.charAt(i) + newStr;
            }
            count++;
        }
        if(str.indexOf(".")==-1){
            str = newStr;
        } else {
            str = newStr + '.' + strarr[1] ;
        }
        return str;
    }

    getStyles() {
        const styles = {
            tabs: {
                width: '100%',
            },
            style: {
                // margin:'0px 72px',
                fontSize: '14px',
                color: '#1565C0',
                clear: 'both',
                // height:500
            },
            radioButton: {
                // flex:1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'

            }

        };

        return styles;
    }


    render() {
        const {SaleAnalysisDate, shopsId, shops_name} = this.props;
        const { pageLineCount,slideIndex}=this.state;
        const styles = this.getStyles();
        let option = this.getOption();

        {/*var SaleDate0, SaleDate2, SaleDate3, SaleDate4, SaleDate5;*/}
        {/*if (SaleAnalysisDate.saleDate.length > 0) {*/}
            {/*SaleDate0 = SaleAnalysisDate.saleDate[0]['店铺下单用'];*/}
        //     SaleDate2 = SaleAnalysisDate.saleDateNum[0]['退货数量'];
        //     SaleDate4 = SaleAnalysisDate.saleDate[0]['总订单数'];
        //     SaleDate5 = SaleAnalysisDate.saleDate[0]['总销售额'];
        //     option_return.series[0].data[0].value = SaleAnalysisDate.saleDateRate[0]['转化率'].toFixed(2) * 100;
        //     option_return.series[0].data[1].value = (1 - SaleAnalysisDate.saleDateRate[0]['转化率'].toFixed(2)) * 100;
        // } else {
        //     SaleDate0 = 0;
        //     SaleDate2 = 0;
        //     SaleDate4 = 0;
        //     SaleDate5 = 0;
        // }
        if(SaleAnalysisDate.length>0)
            for(let i=0;i<SaleAnalysisDate.length;i++){
                if(SaleAnalysisDate[i].name == '成交订单数'){
                    option_return.series[0].data[0].value = SaleAnalysisDate[i].value;
                }
                if(SaleAnalysisDate[i].name == '退货数据'){
                    option_return.series[0].data[1].value = SaleAnalysisDate[i].value;
                }
            }

        return (
            <div>
                <Paper style={styles.style} >
                    <Toolbar>
                        <ToolbarGroup>
                            <ToolbarTitle text="商铺销售分析"/>
                        </ToolbarGroup>
                    </Toolbar>
                    <div style={{}}>
                        <Paper style={{width: '100%'}}>


                            <div style={{display: 'flex'}}>
                                <div style={{width: '30%', height: '200px'}}>
                                    <ECharts
                                        option={option_return}
                                    />
                                </div>
                                <div style={{width:'70%',display:'flex',flexWrap:'flex'}}>
                                    {
                                        SaleAnalysisDate.length>0 ?
                                            SaleAnalysisDate.map((item, key)=>(
                                                <div key={key + 'SaleAnalysisDate'} style={{width:'49.5%',height:'126px',marginTop:'60px'}}>
                                                    <div style={{textAlign:'center',color:'#3398db',marginTop:'15px',fontWeight:'700'}}>
                                                        <span style={{fontSize:'20px'}}>
                                                            {this.changeNum(item.value)}
                                                        </span>
                                                    </div>
                                                    <div style={{color:'#aaa',whiteSpace:'nowrap',textAlign:'center',margin:'0px'}}>
                                                        {item.name}
                                                    </div>
                                                </div>
                                            )) :
                                            <div></div>
                                    }
                                </div>
                            </div>
                        </Paper>
                        <div style={{width: '100%'}}>
                            <Tabs
                                tabItemContainerStyle={styles.tabs}
                                onChange={this.handleChange}
                                value={this.state.slideIndex}>

                                <Tab label="订单详情表" value={0} style={{}}>
                                    <OrderDetail key={0}
                                                 shopsId={shopsId}
                                                 shops_name={shops_name}
                                    />
                                </Tab>
                                <Tab label="退单详情表" value={1} style={{}}>
                                    <OrderRevoke key={0} shopsId={shopsId}
                                                 shops_name={shops_name}
                                    />

                                </Tab>
                            </Tabs>
                        </div>

                        <Divider />
                    </div>


                </Paper>
            </div>
        );


    }
}

SaleAnalysis.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

SaleAnalysis.contextTypes = {
    muiTheme: React.PropTypes.object,
}

const mapStateToProps = (state) => {
    const {databaseReducer} = state;

    return {
        SaleAnalysisDate: databaseReducer.SaleAnalysisDate,
        saleData: databaseReducer.saleData
    };
};

export default connect(
    mapStateToProps
)(SaleAnalysis);




