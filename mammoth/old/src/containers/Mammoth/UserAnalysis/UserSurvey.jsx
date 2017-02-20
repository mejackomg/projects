


import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import IconButton from 'material-ui/IconButton';
import withWidth, {LARGE, MEDIUM,SMALL}  from '../../../utils/withWidth';
import MoreVert from 'material-ui/svg-icons/navigation/more-vert.js'
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import { connect } from 'react-redux';
import SwipeableViews from 'react-swipeable-views';
import CircularProgress from 'material-ui/CircularProgress';
// import {loadShopOverview,loadShopMap,loadShopTop} from '../../../reducers/database.js';
import {usersCreditHistroy,loadShopMap,loadShopTop} from '../../../reducers/database.js';

import Paper from 'material-ui/Paper';
// import ECharts from 'react-echarts';
import ECharts from '../../../components/ECharts.js'
import BoxOfficeMarket from './BoxOfficeMarket.jsx'

import React ,{ Component, PropTypes } from 'react';


import {Tabs, Tab} from 'material-ui/Tabs';


import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

import {
    colors,
    spacing,
    typography
} from 'material-ui/styles';
import {fade} from 'material-ui/utils/colorManipulator';

class UserSurvey extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            isChart:true,
            tabIndex:0
        };
    }

    componentDidMount () {
        const { dispatch} = this.props;

        dispatch(usersCreditHistroy());
        dispatch(loadShopMap());
        dispatch(loadShopTop());
    };

    getOption2(){
        //饼状图
        const {UserGrade} = this.props;
        //测试数据
        var option = null;
        if(UserGrade.length > 0) {
            var legend = [];
            var UserGradeData = [];
            for(var key in UserGrade[0]) {
                legend.push(key);
                UserGradeData.push({value:UserGrade[0][key],name:key});
            }

            option = {
                // title : {
                //     text: '信用的分级占比',
                //     x:'center',
                //     fontSize:'12px'
                // },
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)",
                    position:['10px','20px']
                },
                // legend: {
                //     y: 'bottom',
                //     top:'20px',
                //     data: legend
                // },
                series: [{
                    name: '用户信用占比',
                    type: 'pie',
                    radius : '60%',
                    center: ['47%', '50%'],
                    data:UserGradeData,
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }]
            };
        }
        return option;
    };
    getOption3(){
        //实时信用
        const {AvgCredit} = this.props;
        var option = null;
        option = {
            // tooltip : {
            //     trigger: 'item',
            //     formatter: "{a} <br/>{b} : {c} ({d}%)"
            // },
            legend: {
                orient: 'vertical',
                left: 'left',
                data: ['']
            },
            series : [
                {
                    type: 'pie',
                    radius : ['60%', '80%'],
                    label: {
                        normal: {
                            position: 'center'
                        }
                    },
                    data:[
                        {
                            value:AvgCredit,
                            name:'占有率',
                            label: {
                                normal: {
                                    formatter: '{d} %',
                                    textStyle: {
                                        fontSize: 23
                                    }
                                }
                            }
                        },
                        {
                            value:100-AvgCredit,
                            name:'占位',
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
                                    formatter: '\n实时信用指数'
                                }
                            }
                        }
                    ]
                }
            ]
        };
        return option;

    };
    getOption4(){
        //历史曲线
        const {UserHistoryData} = this.props;
        var option = null;
        if(UserHistoryData.dateList) {
            var option = {
                grid: {
                    left: '77px',
                    right: '80px',
                    //bottom:'5%',
                    //containLabel: true
                },
                tooltip: {
                    trigger: 'axis',
                    position: function (pt) {
                        return [pt[0], '10%'];
                    },
                    formatter: function (params) {
                        return params[0].name + '<br/>' + parseInt(params[0].value) + '%';
                    }
                },
                xAxis: {
                    type: 'category',
                    //boundaryGap: false,
                    data: UserHistoryData.dateList
                },
                yAxis: {
                    type: 'value',
                    name: '信用指数（%）',
                    axisLabel: {
                        formatter: function (value, index) {
                            return parseInt(value);
                        }
                    },
                    boundaryGap: []
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
                series: [
                    {
                        name: '商户信用平均值',
                        type: 'line',
                        smooth: true,
                        symbol: 'none',
                        sampling: 'average',
                        itemStyle: {
                            normal: {
                                color: 'rgb(255, 70, 131)'
                            }
                        },
                        areaStyle: {
                            normal: {
                                color: 'rgba(155, 170, 131,0.2)'
                            }
                        },
                        data: UserHistoryData.valueList
                    }
                ]
            }
        }
        return option;

    };

    handleChange = (event, index, value) => this.setState({value});

    getStyle=()=>{
        const styles={
            thumbOff: {
                backgroundColor:  this.context.muiTheme.palette.accent1Color,
            },
            trackOff: {
                backgroundColor: 'gray',
            },
            thumbSwitched: {
                backgroundColor:  this.context.muiTheme.palette.accent1Color,
            },
            trackSwitched: {
                backgroundColor: 'gray',
            },
            labelStyle: {
                color: 'red',
            },
            clear:{
                display:'block',
                clear:'both'
            },
            chart: {
                position:'relative',
                height: 400,
                width:'33.33%',
                float: 'left',
                flex:1,
                display:'flex',
                flexDirection:'row'
            },
            pre: {
                flex:1,
                position:'absolute',
                top:'50%',
                left:'50%',
                fontSize: '20px',
                // marginLeft:'-15px',
                // marginTop:'-10px'
            },
            tabs:{
                //color:'#fff',
                //background:'#333',
                fontSize:'12px'
            }
        }
       return styles;
    };

    onToggle=(event,value)=>{
        this.setState({isChart:!value})
    }

    handleChange_Tab=(value)=>{
        this.setState({tabIndex:value})
    }
    render() {
        const styles = this.getStyle();
        const {AvgCredit} = this.props.UserHistoryData;
        var pre = AvgCredit + '%';
        //处理饼状图数据
        var option2 = this.getOption2();
        //处理环形图数据
        var option3 = this.getOption3();
        //处理历史数据
        var option4 = this.getOption4();
        return (
            <div>
                <Paper zDepth={2}>
                    <Toolbar>
                        <ToolbarGroup>
                            <ToolbarTitle text="用户信用概览"/>
                        </ToolbarGroup>
                    </Toolbar>
                    <div style={{display:'flex',padding:'20px'}}>
                        <Paper zDepth={1} style={{width:'70%',marginRight:'10px'}}>
                            <ECharts style={{height:'410px'}} option={option4}/>
                        </Paper>
                        <div style={{width:'29%',height:400}}>
                            <Paper zDepth={1} style={{width:'100%',marginBottom:'10px'}}>
                                <ECharts style={{height:'200px'}} option={option2}/>
                            </Paper>
                            <Paper zDepth={1} style={{width:'100%'}}>
                                <ECharts style={{height:'200px'}} option={option3}/>
                            </Paper>
                        </div>
                    </div>

                </Paper>

            </div>
        );
    }
}

UserSurvey.contextTypes = {
    muiTheme: React.PropTypes.object,
}

UserSurvey.propTypes = {
    dispatch:PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
    const { databaseReducer } = state;
    return {
        UserHistoryData:databaseReducer.usersCreditHistroyData.UserHistoryData,
        AvgCredit:databaseReducer.usersCreditHistroyData.AvgCredit,

        shopMapData:databaseReducer.shopMapData,
        UserGrade:databaseReducer.usersCreditHistroyData.UserGrade,

        shopTopData:databaseReducer.shopTopData,
        loading:databaseReducer.loading,
        loaded:databaseReducer.loaded

    };
};
export default connect(
    mapStateToProps
)(withWidth( )(UserSurvey));