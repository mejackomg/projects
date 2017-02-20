
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

const films_shishi=[
    {"index":"1","name":"X战警：天启","shish":"2951.06","zhanbi":"72.13%","days":"4","leiji":"41311.5"},
    {"index":"2","name":"爱丽丝梦游仙境2：镜中奇遇记","shish":"496.06","zhanbi":"12.12%","days":"11","leiji":"32862.06"},
    {"index":"3","name":"愤怒的小鸟","shish":"287.76","zhanbi":"7.03%","days":"18","leiji":"47345.4"},
    {"index":"4","name":"超脑48小时","shish":"75.82","zhanbi":"1.85%","days":"25","leiji":"10314.59"},
    {"index":"5","name":"记忆碎片","shish":"59.13","zhanbi":"1.45%","days":"4","leiji":"280.96"},
    {"index":"6","name":"分歧者3：忠诚世界","shish":"42.93","zhanbi":"1.05%","days":"18","leiji":"12026.44"},
    {"index":"7","name":"死亡游戏","shish":"37.97","zhanbi":"0.93%","days":"4","leiji":"253.43"},
    {"index":"8","name":"百鸟朝凤","shish":"34.21","zhanbi":"0.84%","days":"32","leiji":"8407.26"},
    {"index":"9","name":"北京遇上西雅图之不二情书","shish":"31.09","zhanbi":"0.76%","days":"39","leiji":"78130.57"},
    {"index":"10","name":"斗龙战士之星印罗盘","shish":"12.45","zhanbi":"0.30%","days":"1","leiji":"12.45"}
]


const option = {
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    grid: {
        left: '1%',
        right: '8%',
        top: '6%',
        height:320,
        containLabel: true
    },
    xAxis: {
        type: 'value',
        //boundaryGap: [0, 0.01],
        min: 0,
        max: 3000,
        position:'top',
        name:'万'
        //interval: 20000,
    },
    yAxis: {
        type: 'category',
        inverse:true,
        data: films_shishi.map(function (item) {return item.name})
    },
    series: [
        {
            name: '2011年',
            type: 'bar',
            itemStyle: {
                normal: {
                    color: '#4FC3F7'
                }
            },
            label: {
                normal: {
                    show: true,
                    position: 'right',
                    textStyle:{
                        color: colors.grey500
                    }
                }
            },
            barWidth:17,
            data: films_shishi.map(function (item) {return item.shish})
        },
        {
            name:'行业分析',
            type:'pie',
            radius: ['20%', '32%'],
            center: ['82%', '75%'],
            label: {
                normal: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    show: true,
                    textStyle: {
                        fontSize: '30',
                        fontWeight: 'bold'
                    }
                }
            },
            labelLine: {
                normal: {
                    show: false
                }
            },
            data:[
                {value:3200, name:'人人车'},
                {value:900, name:'景芝酒'},
                {value:1500, name:'今麦郎'},
                {value:300, name:'双鹿电池'},
                {value:600, name:'艾尔康居'},
                {value:400, name:'雅安泰'},
                {value:600, name:'耐普照明'},
                {value:600, name:'修正药业'},
                {value:500, name:'新东方烹饪'},
                {value:400, name:'伏魔者OL'}
            ]
        }
    ]
};

const styles = {

};

export default class CompositeValue extends React.Component {

    render() {
        return (
            <div>
                <div style={{height:350}}>
                    <ECharts option={option}/>
                </div>

                <div style={{margin:'20 30px'}}>
                    <Table
                        fixedHeader={true}
                        height='500px'
                        selectable={false}
                        >
                        <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
                            <TableRow>
                                <TableHeaderColumn style={{width:200}}>影片名</TableHeaderColumn>
                                <TableHeaderColumn>实时票房（万）</TableHeaderColumn>
                                <TableHeaderColumn>票房占比</TableHeaderColumn>
                                <TableHeaderColumn>上映天数</TableHeaderColumn>
                                <TableHeaderColumn>累计票房（万）</TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody
                            displayRowCheckbox={false}
                            showRowHover={true}
                            //stripedRows={true}
                            >
                            {films_shishi.map((row, index) => (
                                <TableRow key={index} selected={row.selected}>
                                    <TableRowColumn
                                        style={{width:200}}>{row.index + '：' + row.name}</TableRowColumn>
                                    <TableRowColumn>{row.shish}年</TableRowColumn>
                                    <TableRowColumn>{row.zhanbi}</TableRowColumn>
                                    <TableRowColumn>{row.days}</TableRowColumn>
                                    <TableRowColumn>{row.leiji}</TableRowColumn>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        );
    }
}
