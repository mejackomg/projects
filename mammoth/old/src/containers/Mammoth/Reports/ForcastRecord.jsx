import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import SwipeableViews from 'react-swipeable-views';

import ActiveTheme from '../../../mui-themes/active-theme.js';
import getMuiTheme from '../../../../node_modules/material-ui/styles/getMuiTheme';
import withWidth, {LARGE, MEDIUM,SMALL}  from '../../../utils/withWidth';

import ECharts from '../../../components/ECharts'//'react-echarts';
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


const option1_tabline = {
    tooltip: {
        trigger: 'axis'
    },
    grid: {
        left: '10%',
         right: '10%',
        top: '10%',
        bottom:'10%',
        //containLabel: true
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
    xAxis: {
        type: 'category',
        name: '',
        boundaryGap: true,
        data: ['Sept1', '2', '3', '4', '5', '6', '7']
    },
    yAxis: {
        type: 'value',
        name: '',
        axisLabel: {
            formatter: '{value} K '
        }
    },
    series: [
        {
            name: '销售金额',
            type: 'line',
            data: [400, 800, 400, 1000, 500, 900],
            markLine: {
                data: [
                    {type: 'average', name: '平均值'}
                ]
            }
        }
    ]
}

const option_tabline = {
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
    xAxis: {
        type: 'category',
        name: '',
        boundaryGap: true,
        data: ['Sept1', '2', '3', '4', '5', '6', '7']
    },
    yAxis: {
        type: 'value',
        name: '',
        axisLabel: {
            formatter: '{value} K '
        }
    },
    series: [
        {
            name: '总订单数',
            type: 'line',
            data: [400, 800, 400, 1000, 500, 900],
            markLine: {
                data: [
                    {type: 'average', name: '平均值'}
                ]
            }
        }
    ]
}


class ForcastRecord extends Component {
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
            radioIndex: 7,
            fromDate: null,
            toDate: null,
            minDate: minDate,
            maxDate: maxDate
        };
    }

    componentDidMount() {
        const { dispatch , shopsId } = this.props;
        const {radioIndex} = this.state;
        dispatch(loadSaleTable(shopsId, radioIndex));
    }

    handleChange = (value) => {
        // console.log(value);
        this.setState({
            slideIndex: value,
        });
    };
    handleChangeRadio = (event, value) => {
        const { dispatch , shopsId } = this.props;
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
        const { dispatch , shopsId } = this.props;
        const { toDate} = this.state;
        if (date && toDate) {
            dispatch(loadSaleTable1(shopsId, this.changeDateFormat(date), this.changeDateFormat(toDate)));
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
        if (fromDate && date) {
            // console.log('request');
            dispatch(loadSaleTable1(shopsId, this.changeDateFormat(fromDate), this.changeDateFormat(date)));
        }
    };
    changeDateFormat = (date) => {
        var newdate = '';
        newdate += date.getFullYear();
        if ((date.getMonth() + 1) < 10) {
            newdate += ('0' + (date.getMonth() + 1));
        } else {
            newdate += date.getMonth() + 1;
        }
        newdate += date.getDate();
        return newdate;
    }

    getStyles() {
        const styles = {
            fontSizeSpan: {
                // alignSelf:'center',
                flex: 1,
                //color: '#000000',
                // textAlign:'center'
            },
            contentLeft: {
                height: '160px',
                width: '16%',
                float: 'left',
                marginLeft: '38px',
                marginTop: '38px',
                minWidth: 200
            },
            contentLeftWhenSmall: {
                width: '35%',
                marginLeft: '15px'
            },
            contentCenter: {
                width: '27%',
                float: 'left',
                lineHeight: '28px',
                marginTop: '-30px',
                textAlign: 'left',
                fontSize: '14px',
                marginLeft: '38px',
                //color: '#000000'
            },
            contentCenterWhenSmall: {
                width: '25%',
                marginLeft: '5px'
            },
            contentRight: {
                height: 250,
                width: '35%',
                float: 'left'
            },
            contentRightWhenSmall: {
                width: '100%'
            },
            toolbar: {
                position: 'fixed',
                left: 0,
                width: '100%'
            },
            tabs: {
                width: '100%',
                //backgroundColor: '#2196F3',
            },
            fontstyle: {
                fontSize: '14px',
                //color: '#1565C0',
                //fontFamily: '微软雅黑',
                paddingLeft: '50px'
            },
            listyle: {
                listStyle: 'none',
                display: 'inline-block',
                border: '1px solid #03A9F4',
                height: 25,
                width: '50%',
                borderRight: 'none',
                textAlign: 'center'
            },
            listyle1: {
                listStyle: 'none',
                display: 'inline-block',
                height: 25,
                width: '35%',
                margin: '0px',
                padding: '0px'
            },
            style: {
                margin: '0px 72px',
                                       //color: '#1565C0',
                //clear: 'both',
                // height:500
            },
            radioButton: {
                width: '23%',
                display: 'inline-block'
            },
            after: {
                clear: 'both',
                display: 'block'
            }
        };

        if (this.props.width === MEDIUM || this.props.width === LARGE)
            styles.content = Object.assign(styles.content, styles.contentWhenMedium);

        return styles;
    }


    render() {
        // console.log(this.props);
        const {saleData} = this.props;
        const styles = this.getStyles()

        var xAxisData = [], seriesData = [];
        if (saleData.length > 0) {
            for (var i = 0; i < saleData.length; i++) {
                xAxisData.push(saleData[i]['日期']);
                seriesData.push(saleData[i]['订单金额']);
            }
            // option_tabline.xAxis.data = xAxisData;
            // option_tabline.series[0].data = seriesData;
        }

        if (this.props.width == LARGE) {
            styles.toolbar.left = 240;
            styles.toolbar.width = 'calc(100% - 240px)'
        }
        else {
            styles.toolbar.left = 0
            styles.toolbar.width = '100%'
        }
        return (
            <div>
                <Paper style={styles.style} zDepth={2}>
                    <Toolbar>
                        <ToolbarGroup>
                            <ToolbarTitle text="平台销售概况"/>
                        </ToolbarGroup>
                    </Toolbar>

                    <div style={{display: 'flex', padding: '20px 100px', lineHeight: '30px'}}>
                        <div style={{flex: 1}}>
                            <span>成交金额：3,567万</span><br />
                            <span>销售金额：5,658万</span><br />
                            <span>平台收入：1,023万</span><br />
                        </div>

                        <div style={{flex: 1}}>
                            <span>总订单数量：13589</span><br />
                            <span>转化率：78%</span><br />
                            <span>有效订单：8694</span><br />
                        </div>
                        <div style={{flex: 1}}>
                            <span>商户销售总金额数：5,043万</span><br />
                            <span>商户平均销售金额：14,566</span><br />
                            <span>商户总体评价：良好</span><br />
                        </div>

                    </div>


                    <div style={{margin: '10px 30px'}}>
                        <Tabs
                            tabItemContainerStyle={styles.tabs}
                            onChange={this.handleChange}
                            value={this.state.slideIndex}>

                            <Tab label="销售金额" value={0}>
                                <div style={{display: 'flex', justifyContent: 'space-between',width:'100%'}}>
                                    <div style={{display: 'flex',paddingLeft:30}}>
                                        <DatePicker
                                            style={{minWidth: '50px'}}
                                            textFieldStyle={{width: 80}}
                                            hintText="开始日期"
                                            autoOk={true}
                                            maxDate={this.state.maxDate}
                                            value={this.state.fromDate}
                                            onChange={this.handleChangeFromDate}
                                        />
                                        <DatePicker
                                            style={{marginLeft: 30}}
                                            textFieldStyle={{width: 80}}
                                            hintText="结束日期"
                                            autoOk={true}
                                            minDate={this.state.minDate}
                                            value={this.state.toDate}
                                            onChange={this.handleChangeToDate}
                                        />
                                    </div>
                                    <RadioButtonGroup style={{height:30,marginTop:15,marginRight:-200}} name="shipSpeed" onChange={this.handleChangeRadio}
                                                      defaultSelected={7}>
                                        <RadioButton
                                            value={7}
                                            label="最近7天"
                                            style={styles.radioButton}
                                            labelStyle={{width: '150px'}}
                                        />
                                        <RadioButton
                                            value={30}
                                            label="最近30天"
                                            style={styles.radioButton}
                                            labelStyle={{width: '150px'}}
                                        />
                                        <RadioButton
                                            value={90}
                                            label="最近90天"
                                            style={styles.radioButton}
                                            labelStyle={{width: '150px'}}
                                        />
                                    </RadioButtonGroup>
                                </div>
                                <div style={{width: '100%', height: '250px', textAlign: 'center'}}>
                                    <ECharts option={option1_tabline}/>
                                </div>
                            </Tab>
                            <Tab label="总订单数" value={1}>
                                <div style={{width: '100%', height: '350px', textAlign: 'center'}}>
                                    <ECharts option={option_tabline}/>
                                </div>
                            </Tab>
                            <Tab label="转换率" value={2}>
                                <div style={{width: '100%', height: '350px', textAlign: 'center'}}>
                                    <ECharts option={option_tabline}/>
                                </div>
                            </Tab>
                        </Tabs>

                    </div>
                    <div style={{height: '10px'}}>

                    </div>


                </Paper>
            </div>
        );
    }
}

ForcastRecord.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
    const { databaseReducer } = state;

    return {
        saleData: databaseReducer.saleData
    };
};

export default connect(
    mapStateToProps
)(ForcastRecord);




