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
import UserTable from './UserTable.jsx'

const option1_tabline = {
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
            name: '用户数',
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
            name: '用户数',
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


class UserRecord extends Component {
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
        const { dispatch , userId } = this.props;
        const {radioIndex} = this.state;
        dispatch(loadSaleTable(userId, radioIndex));
    }

    handleChange = (value) => {
        // console.log(value);
        this.setState({
            slideIndex: value,
        });
    };
    handleChangeRadio = (event, value) => {
        const { dispatch , userId } = this.props;
        this.setState({
            radioIndex: value
        });
        dispatch(loadSaleTable(userId, value));
    };
    handleChangeFromDate = (event, date) => {
        this.setState({
            fromDate: date,
            minDate: date
        });
        const { dispatch , userId } = this.props;
        const { toDate} = this.state;
        if (date && toDate) {
            dispatch(loadSaleTable1(userId, this.changeDateFormat(date), this.changeDateFormat(toDate)));
        }
    };
    handleChangeToDate = (event, date) => {
        this.setState({
            toDate: date,
            maxDate: date
        });

        const { dispatch , userId } = this.props;
        const { fromDate} = this.state;
        // console.log(fromDate);
        // console.log(date);
        if (fromDate && date) {
            // console.log('request');
            dispatch(loadSaleTable1(userId, this.changeDateFormat(fromDate), this.changeDateFormat(date)));
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
                color: '#000000',
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
                color: '#000000'
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
               // backgroundColor: 'transparent',
            },
            fontstyle: {
                fontSize: '14px',
                color: '#1565C0',
                fontFamily: '微软雅黑',
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
                fontSize: '14px',
                color: '#1565C0',
                clear: 'both',
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
                            <ToolbarTitle text="用户信息概览"/>
                        </ToolbarGroup>
                    </Toolbar>

                    <div style={{marginTop:'50px'}}>
                        <div style={styles.contentCenter}>
                            <span>用户总数:</span><br />
                            <span>新增用户：</span><br />
                            <span>活跃用户：</span><br />
                        </div>
                        <div style={styles.contentCenter}>
                            <span>用户留存率:</span><br />
                            <span>平均使用时长：</span><br />
                            <span>平均使用间隔：</span><br />
                        </div>
                        <div style={styles.contentCenter}>
                            <span>平均使用频率:</span><br />
                            <span>平均生命周期：</span><br />
                            <span>平均购买力：</span><br />
                        </div>
                    </div>

                    <div style={{marginTop:'50px'}}>
                        <ul style={{display:'inline-block',marginTop:'30px',width:'35%',height:66,padding:'0px',textAlign:'center'}}>
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

                        <div style={styles.after}></div>
                    </div>


                    <Paper style={{margin:'50px 30px'}}>
                        <Tabs
                            tabItemContainerStyle={styles.tabs}
                            onChange={this.handleChange}
                            value={this.state.slideIndex}>

                            <Tab label="用户总数" value={0}>

                                <div style={{width:'100%',height:'250px',textAlign:'center'}}>
                                    <ECharts option={option1_tabline}/>
                                </div>
                            </Tab>
                            <Tab label="活跃用户数" value={1}>
                                <div style={{width:'100%',height:'250px',textAlign:'center'}}>
                                    <ECharts option={option_tabline}/>
                                </div>
                            </Tab>
                            <Tab label="留存率" value={2}>
                                <div style={{width:'100%',height:'250px',textAlign:'center'}}>
                                    <ECharts option={option1_tabline}/>
                                </div>
                            </Tab>

                        </Tabs>

                    </Paper>
                </Paper>
            </div>
        );


    }
}

UserRecord.propTypes = {
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
)(UserRecord);




