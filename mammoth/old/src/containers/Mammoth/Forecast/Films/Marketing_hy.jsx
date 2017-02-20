import React from 'react';

import {Link} from 'react-router';
import Paper from 'material-ui/Paper'
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import ECharts from 'react-echarts';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import {Tabs, Tab} from 'material-ui/Tabs';

import {
    colors,
    spacing,
    typography
} from 'material-ui/styles';

const styles = {
    imgs:{
        float:left,
        height:195,
        width:181,
        padding:'10px 5px 5px 10px'
    },
    textname:{
        float:left,

    }
};

const option1 = {
    title: {
        text: '基础雷达图'
    },
    tooltip: {},
    legend: {
        data: ['预算分配（Allocated Budget）', '实际开销（Actual Spending）']
    },
    radar: {
        // shape: 'circle',
        indicator: [
            { name: '销售（sales）', max: 6500},
            { name: '管理（Administration）', max: 16000},
            { name: '信息技术（Information Techology）', max: 30000},
            { name: '客服（Customer Support）', max: 38000},
            { name: '研发（Development）', max: 52000},
            { name: '市场（Marketing）', max: 25000}
        ]
    },
    series: [{
        name: '预算 vs 开销（Budget vs spending）',
        type: 'radar',
        // areaStyle: {normal: {}},
        data : [
            {
                value : [4300, 10000, 28000, 35000, 50000, 19000],
                name : '预算分配（Allocated Budget）'
            },
            {
                value : [5000, 14000, 28000, 31000, 42000, 21000],
                name : '实际开销（Actual Spending）'
            }
        ]
    }]
};


export default class Composite extends React.Component {

    render() {
        return (
            <div style={{height:600,marginTop:60}}>
                <Toolbar>
                    <ToolbarGroup>
                        <ToolbarTitle text="会员分析"/>
                    </ToolbarGroup>
                </Toolbar>
                <div>
                    <img src="{this.state.imageSrc} style={}" alt=""/>
                    <div>
                        <span>姓名：</span><span>John</span>
                        <span>年龄：</span><span>28</span> <span>性别：</span><span>男</span>
                        <span>会员ID:</span><span>sd341293</span>
                        <span>邮箱：</span><span>wssf@123.com</span>
                        <span>电话：</span><span>+86 1293557394</span>
                        <span>居住区域：</span><span>朝阳区大悦城附近2公里</span>
                    </div>
                    <div>
                        <legend>消费特征：</legend>
                        <span>信用评分：</span><span>A+</span>
                        <span>支付能力：</span><span>B-</span>
                        <span>消费偏好：</span><span>零食／冷饮／快餐</span>
                    </div>
                </div>
                <ECharts option={option1}/>
            </div>
        );
    }
}