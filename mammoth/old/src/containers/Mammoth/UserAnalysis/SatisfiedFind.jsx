import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import SwipeableViews from 'react-swipeable-views';

import ActiveTheme from '../../../mui-themes/active-theme.js';
import getMuiTheme from '../../../../node_modules/material-ui/styles/getMuiTheme';

import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

import SearchIcon from 'material-ui/svg-icons/action/search';
import IconButton from 'material-ui/IconButton';
import withWidth, {LARGE, MEDIUM,SMALL}  from '../../../utils/withWidth';
import TabMenuBar from './TabMenuBar.jsx';
import ECharts from 'react-echarts';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import {Tabs, Tab} from 'material-ui/Tabs';


import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';
import WordCloud from '../../../components/WordCloud.jsx';
import Chart2 from '../UserAnalysis/Chart2.jsx';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import UserRecord from './UserRecord.jsx';
import DeleteLabel from './DeleteLabel.jsx';
import SelectButton from './SelectButton.jsx';
import UserSearchBar from './UserSearchBar.jsx';
import CustomTable from './CustomTable.jsx';
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
const option_line = {
    // title: {
    //     text: '折线图堆叠'
    // },
    tooltip: {
        trigger: 'axis'
    },
    // legend: {
    //     data:['邮件营销','联盟广告','视频广告','直接访问','搜索引擎']
    // },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    toolbox: {
        show: false,
        feature: {
            mark: {show: true},
            // dataView: {show: true, readOnly: false},
            magicType: {show: true, type: ['line', 'bar', 'stack', 'tiled']},
            restore: {show: true},
            saveAsImage: {show: true}
        }
    },
    calculable: true,
    xAxis: {
        type: 'category',
        name: '日期',
        boundaryGap: false,
        data: [0, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    },
    yAxis: {
        type: 'value',
        name: '信用值'
    },
    series: [
        {
            name: '邮件营销',
            type: 'line',
            stack: '总量',
            smooth: true,
            data: [12, 8, 4, 88, 12, 35, 10]
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
        boundaryGap: false,
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
    },
    yAxis: {
        type: 'value',
        axisLabel: {
            formatter: '{value} k'
        }
    },
    series: [
        {
            name: '销售额',
            type: 'line',
            data: [6, 21, 65, 60, 50, 70, 80],
            markLine: {
                data: [
                    {type: 'average', name: '平均值'}
                ]
            }
        }
    ]
}


class SatisfiedFind extends Component {
    constructor(props) {
        super(props);
        this.state = {
            slideIndex: 0
        };
    }


    shouldComponentUpdate = (nextProps = {}, nextState = {}) => {
        return true;//false,页面不刷新数据
    }

    getStyles() {
        const styles = {
            grahf1: {
                display: 'inline-block',
                margin: '16px 32px 16px 0',
            },
             toolbar: {
                position: 'fixed',
                left: 0,
                width: '100%'
                //display: 'inline-block',
                //float: 'left',
                //margin: '16px 32px 16px 0',
            },
            style: {
                // height: 266,
                margin: '50px 72px',
                textAlign: 'center',
                // lineHeight:266
                // display: 'block',
            },

        };
        return styles;
    }

    onNewRequest_AutoComplete = (chosenRequest, index)=> {
        const {dispatch} = this.props;

        this.setState({
            page: 1,
            searchText: chosenRequest,
            showFilterResult: true
        })

        const {page,pageLineCount} = this.state;
        dispatch(loadShops(1, pageLineCount, chosenRequest));
    }


    render() {

        const {labelId,selectId,selectId1,selectId2,customId} = this.props;
        // console.log(this.props);
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

                <div style={{marginTop:10}}>
                    <TextField hintText="分类查找" style={{marginLeft:'40px',fontSize:'24px'}} underlineShow={false}/>
                    <Divider />
                </div>

                <div style={{display:'flex',flexDirection:'row',padding:'20px'}}>

                    <div style={{flex:1,marginLeft:'15px'}}>
                        <div
                            style={{backgroundColor:'#EFEFEF',textAlign:'center'}}>
                            <br/>
                            <span style={{fontSize:'24px'}}>航母级</span><br/><br/>
                            会员数量：18320<br/>
                            人均消费金额：3000元/月<br/>
                        </div>
                        <div
                            style={{backgroundColor:'#EFEFEF',marginTop:'10px',textAlign:'center'}}>
                            <br/>
                            <span style={{fontSize:'24px'}}>巡洋舰</span><br/><br/>
                            会员数量：18320<br/>
                            人均消费金额：3000元/月<br/>
                        </div>
                        <div
                            style={{backgroundColor:'#EFEFEF',marginTop:'10px',textAlign:'center'}}>
                            <br/>
                            <span style={{fontSize:'24px'}}>护卫舰</span><br/><br/>
                            会员数量：18320<br/>
                            人均消费金额：3000元/月<br/>
                        </div>
                        <div
                            style={{backgroundColor:'#EFEFEF',marginTop:'10px',textAlign:'center'}}>
                            <br/>
                            <span style={{fontSize:'24px'}}>护卫舰</span><br/><br/>
                            会员数量：18320<br/>
                            人均消费金额：3000元/月<br/>
                        </div>
                    </div>

                    <div style={{width:'70%',height:'',backgroundColor:'',marginLeft:'10px'}}>
                        <div style={{marginLeft:'50px'}}>
                            <DeleteLabel labelId={labelId}/>
                        </div>
                        <hr/>

                        <div style={{marginTop:'0px',marginLeft:'110px'}}>
                            <IconButton onTouchTap={this.props.advancedSearch}>
                                <SearchIcon color={'blue50'} />
                            </IconButton>
                            <TextField hintText="Search"/>
                        </div>


                        <div style={{marginTop:'0px',width:"100%"}}>
                            <SelectButton selectId={selectId}/>

                        </div>


                        <div style={{float:'left',width:'100%',height:'auto'}}>
                            <CustomTable selectId={selectId}/>
                        </div>
                    </div>


                </div>

            </div>

        );
    }
}


SatisfiedFind.propTypes = {
    dispatch: PropTypes.func.isRequired,
};
export default connect(

)(SatisfiedFind);




