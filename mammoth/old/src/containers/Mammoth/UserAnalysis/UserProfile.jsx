import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import SwipeableViews from 'react-swipeable-views';

import ActiveTheme from '../../../mui-themes/active-theme.js';
import getMuiTheme from '../../../../node_modules/material-ui/styles/getMuiTheme';

import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

import withWidth, {LARGE, MEDIUM,SMALL}  from '../../../utils/withWidth';
import TabMenuBar from './TabMenuBar.jsx';
import EChartsWordcloud from 'echarts-wordcloud';
// import ECharts from 'react-echarts';
import echarts from 'echarts';
import ECharts from '../../../components/ECharts.js'
import ReactEcharts from 'echarts-for-react';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import {Tabs, Tab} from 'material-ui/Tabs';
import {Card,CardHeader,CardText} from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';
import WordCloud from '../../../components/WordCloud.jsx';
import Chart2 from '../UserAnalysis/Chart2.jsx';
import Chart3 from '../UserAnalysis/Chart3.jsx';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import UserRecord from './UserRecord.jsx';
import DeleteLabel from './DeleteLabel.jsx';
import SatisfiedFind from './SatisfiedFind.jsx';
import SelectButton from './SelectButton.jsx';
import UserSearchBar from './UserSearchBar.jsx';
import CustomTable from './CustomTable.jsx';
import { loadUsers,SingleusersCreditHistroy,UserConsumptionCurve } from '../../../reducers/database.js';
import {loadShopData} from '../../../reducers/database.js';
import {
    colors,
    spacing,
    typography
} from 'material-ui/styles';


const option = {
    legend: {
        orient: 'vertical',
        x: 'left',
        data: ['实时信用指数']
    },
    series: [
        {
            name: '访问来源',
            type: 'pie',
            radius: ['90%', '95%'],
            avoidLabelOverlap: false,
            label: {
                normal: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    show: true,
                    textStyle: {
                        fontSize: '10',
                        fontWeight: 'bold'
                    }
                }
            },
            labelLine: {
                normal: {
                    show: false
                }
            },
            data: [0, 100],
            color: ['#F44336', '#FFCDD2']
        }
    ]
}


const option_ld = {
    title: {
        text: ''
    },
    tooltip: {},
    legend: {
        data: ['预算分配（Allocated Budget）', '实际开销（Actual Spending）']
    },
    radar: {
        // shape: 'circle',
        indicator: [
            {name: '销售（sales）', max: 6500},
            {name: '管理（Administration）', max: 16000},
            {name: '信息技术（Information Techology）', max: 30000},
            {name: '客服（Customer Support）', max: 38000},
            {name: '研发（Development）', max: 52000},
            {name: '市场（Marketing）', max: 25000}
        ]
    },
    series: [{
        name: '预算 vs 开销（Budget vs spending）',
        type: 'radar',
        // areaStyle: {normal: {}},
        data: [
            {
                value: [4300, 10000, 28000, 35000, 50000, 19000],
                name: '预算分配（Allocated Budget）'
            },
            {
                value: [5000, 14000, 28000, 31000, 42000, 21000],
                name: '实际开销（Actual Spending）'
            }
        ]
    }]

}


const data = [
    {
        title:'单用户的购买力分析',
        xDate:['11-9','11-10','11-11','11-12','11-13','11-14','11-15'],
        yDate: {
            '单用户购买力分析':[120, 132, 101, 134, 90, 230, 210]
        }
    },
    {
        title:'单用户的补贴分析',
        xDate:['11-9','11-10','11-11','11-12','11-13','11-14','11-15'],
        yDate: {
            '单用户的补贴分析':[120, 132, 101, 134, 90, 230, 210]
        }
    }
]
class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            slideIndex: 0
        };
    }

    componentDidMount() {
        const { dispatch, params : {usersId}} = this.props;
        // dispatch(loadUsers(userId));
        dispatch(SingleusersCreditHistroy(usersId));
        dispatch(UserConsumptionCurve(usersId));
    }

    shouldComponentUpdate = (nextProps = {}, nextState = {}) => {
        return true;//false,页面不刷新数据
    }
    getOption(){
        const {SinglePortrait} = this.props;
        const option = {
            tooltip: {},
            series: [{
                type: 'wordCloud',
                gridSize: 20,
                sizeRange: [12, 50],
                rotationRange: [0, 0],
                shape: 'circle',
                textStyle: {
                    normal: {
                        color: function() {
                            return 'rgb(' + [
                                    Math.round(Math.random() * 160),
                                    Math.round(Math.random() * 160),
                                    Math.round(Math.random() * 160)
                                ].join(',') + ')';
                        }
                    },
                    emphasis: {
                        shadowBlur: 10,
                        shadowColor: '#333'
                    }
                },
                data:SinglePortrait
            }]
        };
        return option;
    }
    getOption_userCerid(){
        //历史曲线
        const {SingleUserHistoryData} = this.props;
        // console.log(this.props);
        let option = null;
        if(SingleUserHistoryData.dateList) {
             option = {
                grid: {
                    left: '8%',
                    right: '6%',
                    // top: '50',
                    //height: '200',
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
                    data: SingleUserHistoryData.dateList
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
                        data: SingleUserHistoryData.valueList
                    }
                ]
            }
        }
        return option;

    };
    getOption_UserConsumption(){
        const {UserConsumptionCurveData} = this.props;
        let option = null;
        if(UserConsumptionCurveData.length>0){
            option = {
                grid: {
                    left: '8%',
                    right: '6%',
                    // top: '50',
                    //height: '200',
                    //bottom:'5%',
                    //containLabel: true
                },
                tooltip: {
                    trigger: 'axis',
                    position: function (pt) {
                        return [pt[0], '10%'];
                    },
                    formatter: function (params) {
                        return params[0].name + '<br/>' + parseInt(params[0].value) + '元';
                    }
                },
                xAxis: {
                    type: 'category',
                    //boundaryGap: false,
                    data: UserConsumptionCurveData.map((rows,index)=>{
                        return rows.date;
                    }),
                    splitLine: {
                        show: false
                    },
                    boundaryGap: false
                },
                yAxis: {
                    type: 'value',
                    name: '消费额（元）',
                    axisLabel: {
                        formatter: function (value, index) {
                            return parseInt(value);
                        }
                    },
                    // boundaryGap: [] ,
                    splitNumber: 3,
                    splitLine: {
                        show: false
                    }
                },
                // dataZoom: [{
                //     type: 'inside',
                //     start: 0,
                //     end: 100
                // }, {
                //     start: 0,
                //     end: 10,
                //     handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
                //     handleSize: '80%',
                //     handleStyle: {
                //         color: '#fff',
                //         shadowBlur: 3,
                //         shadowColor: 'rgba(0, 0, 0, 0.6)',
                //         shadowOffsetX: 2,
                //         shadowOffsetY: 2
                //     }
                // }],
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
                        data: UserConsumptionCurveData.map((rows,index)=>{
                            return rows.money;
                        })
                    }
                ]
            }
        }
        return option;
    };
    getStyles() {
        const styles = {
            searchBar: {
                zIndex: this.context.muiTheme.zIndex.appBar,//-1,
                backgroundColor: this.context.muiTheme.palette.accent2Color,//alternateTextColor,
                height: this.context.muiTheme.palette.desktopSubheaderHeight
            },

            grahf1: {
                display: 'inline-block',
                margin: '16px 32px 16px 0',
            },

            content: {
                marginTop: this.context.muiTheme.spacing.desktopGutter + this.context.muiTheme.spacing.desktopSubheaderHeight,
                marginBottom: this.context.muiTheme.spacing.desktopGutter,
                marginLeft: this.context.muiTheme.spacing.desktopGutter,
                marginRight: this.context.muiTheme.spacing.desktopGutter,
            },
            contentWhenMedium: {
                // margin: `${this.context.muiTheme.spacing.desktopGutter * 2}px  ${this.context.muiTheme.spacing.desktopGutter * 3}px`,
                marginTop: this.context.muiTheme.spacing.desktopGutter * 2 + this.context.muiTheme.spacing.desktopSubheaderHeight,
                marginBottom: this.context.muiTheme.spacing.desktopGutter * 2,
                marginLeft: this.context.muiTheme.spacing.desktopGutter * 3,
                marginRight: this.context.muiTheme.spacing.desktopGutter * 3,
            },
            toolbar: {
                position: 'fixed',
                left: 0,
                width: '100%'
                //display: 'inline-block',
                //float: 'left',
                //margin: '16px 32px 16px 0',
            },
            tabs: {
                width: 880,
                backgroundColor: 'transparent',
            },
            after: {
                clear: 'both',
                display: 'block'
            },
            preRisk: {
                position: 'absolute',
                top: '50%',
                left: '50%',
                marginLeft: '-15px',
                marginTop: '-15px',
                fontSize: '30px'
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
                float: 'left',
                width: '40%',
                lineHeight: '28px',
                marginTop: '27px',
                textAlign: 'left',
                fontSize: '14px',
                marginLeft: '78px'
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
            consumer: {
                height: 310,
                width: '45%',
                float: 'left',
                marginLeft: '5%',
                marginTop: 10
            },
            consumerWhenSmall: {
                width: '90%'
            },
            fontstyle: {
                fontSize: '14px',
                color: '#1565C0',
                fontFamily: '微软雅黑',
                width: '10%'
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
                width: '40%',
                marginLeft: '10%'
            },
            listylechild: {
                display: 'inline-block',
                width: '100%',
                height: 25,
                textAlign: 'left'
            },
            style: {
                // height: 266,
                margin: '50px 72px',
                textAlign: 'center',
                // lineHeight:266
                // display: 'block',
            },

        };

        if (this.props.width === MEDIUM || this.props.width === LARGE)
            styles.content = Object.assign(styles.content, styles.contentWhenMedium);
        if (this.props.width === MEDIUM || this.props.width === SMALL) {
            styles.contentCenter = Object.assign(styles.contentCenter, styles.contentCenterWhenSmall);
            styles.contentRight = Object.assign(styles.contentRight, styles.contentRightWhenSmall);
            styles.contentLeft = Object.assign(styles.contentLeft, styles.contentLeftWhenSmall);
            styles.consumer = Object.assign(styles.consumer, styles.consumerWhenSmall);
        }

        return styles;
    }
    handleChange = (event, index, value) => this.setState({value});
    render() {

        const {params : {usersId}, location:{query},UserConsumptionCurveData,SingleUserHistoryData} = this.props;
        // console.log(query);
        const {SinglePortrait}= this.props;
        const styles = this.getStyles();
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
                <TabMenuBar {...this.props}
                            isArrowBackShown={true}
                            title="返回"
                    //handleChange={this.handleChange_TabMenuBar}
                    //tabs={["演员","导演","编剧",'摄像','美工']}
                            tabsWidth={500}/>
                <div style={styles.content}>
                    <Paper zDepth={2}>
                        <Toolbar>
                            <ToolbarGroup>
                                <ToolbarTitle text="用户特征分析"/>
                            </ToolbarGroup>
                        </Toolbar>
                        <div >
                            <div >
                                <TextField hintText="用户详情" style={{marginLeft:'40px',fontSize:'24px'}}
                                           underlineShow={false}/>
                                <Divider />
                            </div>
                            <div style={{display:'flex',justifyContent:'space-around',padding:'20px',marginTop:'15px',fontSize:'14px'}}>
                                {/*<div style={{width:'20%',flexShrink:0,marginLeft:'30px',marginTop:'20px'}}>*/}
                                    {/**/}
                                {/*</div>*/}
                                {/*<img style={{ height:200,marginTop:'10px'}} src='/user.jpeg' />*/}
                                <div style={{width:'30%',lineHeight:'28px',textAlign:'left'} }>
                                    <span style={{color:'blue'}}>基本信息</span><br />
                                    <span>真实姓名：{query['真实姓名']}</span><br />
                                    <span>出生日期：{query['出生年月']} </span><br />
                                    <span>性别：{query['性别']}</span><br />
                                    <span>用户ID：{query['用户ID']}</span><br />
                                    <span>邮箱：{query['Email']}</span><br />
                                    <span>电话：{query['电话']}</span><br/>
                                    <span>居住区域：{query['地址']}</span>
                                </div>

                                <div style={{width:'30%',lineHeight:'28px',textAlign:'left',marginLeft:'-30px'} }>
                                    <span style={{color:'blue'}}>消费特征</span><br />
                                    <span>会员积分：{query['会员积分']}</span><br />
                                    <span>用户的等级：{query['用户的等级']}</span><br />
                                    <span>注册时间：{query['注册时间']}</span><br />
                                    <span>用户性质：{query['是否注册用户']}</span><br />
                                    <span>客户端：{query['客户端']}</span><br />
                                    {/*<span>信用评分：A+</span><br />*/}


                                </div>
                            </div>

                            {/*<div style={{display:'flex',flexDirection:'row',padding:'0 20px 0 20px'}}>*/}
                                {/*<Paper zDepth={1} style={{flex:2,height:300,marginRight:'10px'}}>*/}
                                    {/*<Chart3 data={query}/>*/}
                                {/*</Paper>*/}
                                {/*<Paper zDepth={1} style={{width:'40%',height:300}}>*/}
                                    {/*<span style={styles.fontSize}>消费偏好特征</span>*/}
                                    {/*<ECharts style={{height:260}} option={option_ld}/>*/}
                                {/*</Paper>*/}
                            {/*</div>*/}
                            <div style={{display:'flex',padding:'0 20px 0 20px',marginTop:'10px'}}>
                                <Paper zDepth={1} style={{width:'30%',marginRight:'10px',padding:'10px'}}>
                                    <span style={styles.fontSize}>用户画像</span>
                                    {
                                        SinglePortrait.length>0?
                                            <ECharts style={{height:300}} option={this.getOption()} />:
                                            <div style={{height:220}}>
                                                <div style={{textAlign:'center',fontSize: '24px', color: 'gray',height:'160px',marginTop:'80px'}}>
                                                    暂无数据!
                                                </div>
                                            </div>
                                    }
                                </Paper>
                                <Paper zDepth={1} style={{width:'69.5%',padding:'10px'}}>
                                    <span style={styles.fontSize}>消费曲线图</span>
                                    {
                                        UserConsumptionCurveData.length>0?
                                        <ECharts style={{height:300}} option={this.getOption_UserConsumption()} />:
                                        <div style={{height:220}}>
                                            <div style={{textAlign:'center',fontSize: '24px', color: 'gray',height:'160px',marginTop:'80px'}}>
                                                暂无数据!
                                            </div>
                                        </div>
                                    }
                                </Paper>
                            </div>
                            <div style={{display:'flex',flexDirection:'row',padding:'0 20px 20px 20px',marginTop:'10px'}}>
                                <Paper zDepth={1} style={{width:'100%',padding:'10px'}}>
                                    <span style={styles.fontSize}>信用指数历史曲线图</span>
                                    {SingleUserHistoryData.dateList && SingleUserHistoryData.dateList.length>0 ?
                                    <ECharts style={{marginTop:'-20px',height:320}} option={this.getOption_userCerid()} />:
                                    <div style={{height:260}}>
                                        <div style={{textAlign:'center',fontSize: '24px', color: 'gray',height:'160px',marginTop:'80px'}}>
                                            暂无数据!
                                        </div>
                                    </div>
                                    }
                                </Paper>
                            </div>
                        </div>
                        {/*<div>*/}
                            {/*<SatisfiedFind findId={usersId}/>*/}
                        {/*</div>*/}
                    </Paper>
                </div>

            </div>
        );


    }
}


UserProfile.propTypes = {
    dispatch: PropTypes.func.isRequired,
    // shopsRows:PropTypes.Array.isRequired,
};

UserProfile.contextTypes = {
    muiTheme: React.PropTypes.object,
}

const mapStateToProps = (state) => {
    const { databaseReducer,layoutReducer} = state;
    return {
        loading: databaseReducer.loading,
        loaded: databaseReducer.loaded,
        panelVisible: layoutReducer.panelVisible,//勿删,传入TabMenuBar

        SingleUserHistoryData:databaseReducer.SingleUserCredit_historyData.SingleUserHistoryData,
        SingleUserAvgCredit:databaseReducer.SingleUserCredit_historyData.SingleUserAvgCredit,
        SinglePortrait:databaseReducer.SingleUserCredit_historyData.SinglePortrait,
        UserConsumptionCurveData:databaseReducer.UserConsumptionCurveData
    };
};
export default connect(
    mapStateToProps
)(withWidth()(UserProfile));




