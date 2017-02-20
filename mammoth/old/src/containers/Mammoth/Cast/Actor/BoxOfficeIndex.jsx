
import React from 'react';

import {Link} from 'react-router';
import Paper from 'material-ui/Paper'
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import ECharts from 'react-echarts';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import BoxOfficeChart from './BoxOfficeChart.js'

import {
    colors,
    spacing,
    typography
} from 'material-ui/styles';

const styles = {

};

var films=[
    {"name":"饭局也疯狂","time":" 2012/1/23","type":"喜剧","classify":"B","firstDay":"8.10","boxOffice":"4381.6"},
    {"name":"杀生","time":"2012/4/28","type":"剧情","firstDay":"11","classify":"A","boxOffice":"1914.7"},
    {"name":"痞子英雄","time":"2012/6/19","type":"动作","classify":"A-","firstDay":"15.90","boxOffice":"8744.5"},
    {"name":"泰囧","time":"2012/12/12","type":"喜剧","classify":"B","firstDay":"38.50","boxOffice":"126800.7"},
    {"name":"西游降魔篇","time":"2013/2/10","type":"奇幻","classify":"C","firstDay":"41.60","boxOffice":"124699.5"},
    {"name":"101次求婚","time":"2013/2/12","type":"爱情","classify":"A","firstDay":"19.90","boxOffice":"20000.8"},
    {"name":"厨子戏子痞子","time":"2013/3/29","type":"喜剧","classify":"A-","firstDay":"27.20","boxOffice":"27277.9"},
    {"name":"无人区","time":" 2013/12/03","type":"剧情","classify":"B","firstDay":"33.90","boxOffice":"25959.2"},
    {"name":"亲爱的","time":"2014/9/25","type":"剧情","classify":"A","firstDay":"33.50","boxOffice":"34468.8"},
    {"name":"心花路放","time":" 2014/9/30","type":"喜剧","classify":"A-","firstDay":"46.30","boxOffice":"117002.9"},
    {"name":"寻龙诀","time":"2015/12/18","type":"奇幻","classify":"B","firstDay":"46.50","boxOffice":"168214.4"},
    {"name":"极限挑战","time":"2016/1/15","type":"综艺","classify":"A-","firstDay":"21.60","boxOffice":"12548.3"}
]

const option1 = {
    tooltip: {
        trigger: 'axis',
        formatter: function (params) {
            var tar='';
            var name;
            if(params.length>1) {
                params.map(function (param) {
                    if (param.value != '0') {
                        if( param.seriesName == '首日排片率')
                            tar += param.seriesName + ' : ' + param.value*10 + '%<br/>';
                        else
                            tar += param.seriesName + ' : ' + param.value +'<br/>';
                    }
                    name = param.name;
                })
            }
            else
            {
                //if(params.seriesType=='radar')
                //    return ;
                //
                tar = params.seriesName + ' : ' + params.value + '<br/>';
                name = params.name;
            }
            return tar = name +  '<br/>' + tar;
        }
    },
    grid: {
        left: '5%',
        right: '8%',
        top: '15%',

        //bottom:'25%',
        containLabel: true
    },
    legend: {
        left:0,
        right:'45%',
        data:['票房','票房贡献','票房号召力指数','首日排片率']
    },
    xAxis: [
        {
            type: 'category',
            data: films.map(function (item) {
                return item.name;
            }),
            axisLabel: {
                //show: true,
                interval: '0',
                //inside: false,
                rotate: -50
            }
        }
    ],
    yAxis: [
        {
            type: 'value',
            name: '票房',
            min: 0,
            max: 200000,
            interval: 20000,
            axisLabel: {
                formatter: '{value} 万'
            }
        },
        {
            type: 'value',
            name: '票房号召力指数',
            min: 0,
            max: 10,
            interval: 1,
            axisLabel: {
                formatter: '{value}'
            }
        }
    ],
    series: [
        {
            name:'票房',
            type:'bar',
            //stack:'1',
            data:films.map(function (item) {
                return item.boxOffice;
            })
        },
        {
            name:'票房贡献',
            type:'bar',
            //stack:'1',
            data:films.map(function (item) {
                var delta=1;
                switch (item.classify){
                    case 'A':
                        delta=0.3;
                        break;
                    case 'A-':
                        delta=0.25;
                        break;
                    case 'B':
                        delta=0.15;
                        break;
                    case 'B-':
                        delta=0.1;
                        break;
                    case 'C':
                        delta=0.05;
                        break;
                    case 'C-':
                        delta=0.05;
                        break;
                    case 'D':
                        delta=0.05;
                        break;
                    case 'D-':
                        delta=0.05;
                        break;
                }
                return item.boxOffice*delta;
            })
        },
        {
            name:'票房号召力指数',
            type:'line',
            yAxisIndex: 1,
            data:films.map(function (item) {
                var delta=1;
                switch (item.classify){
                    case 'A':
                        delta=0.3;
                        break;
                    case 'A-':
                        delta=0.25;
                        break;
                    case 'B':
                        delta=0.15;
                        break;
                    case 'B-':
                        delta=0.1;
                        break;
                    case 'C':
                        delta=0.05;
                        break;
                    case 'C-':
                        delta=0.05;
                        break;
                    case 'D':
                        delta=0.05;
                        break;
                    case 'D-':
                        delta=0.05;
                        break;
                }
                return Math.floor(item.boxOffice*delta/3000);
            }),
            markLine : {
                data : [
                    {
                        name: '平均线',
                        // 支持 'average', 'min', 'max'
                        type: 'average'
                    }
                ]
            }
        },
        {
            name:'首日排片率',
            type:'line',
            yAxisIndex: 1,
            data:films.map(function (item) {
                return item.firstDay/10;
            })
        }
    ]
};

const option2 ={

};


export default class BoxOfficeIndex extends React.Component {

    render() {
        return (
            <div style={{marginTop:-30}}>
                <Toolbar>
                    <ToolbarGroup>
                        <ToolbarTitle text="主要参演影片"/>
                    </ToolbarGroup>
                </Toolbar>
                <Table
                    fixedHeader={true}
                    height='300px'
                    selectable={false}
                    >
                    <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
                        <TableRow>
                            <TableHeaderColumn>影片</TableHeaderColumn>
                            <TableHeaderColumn>上映时间</TableHeaderColumn>
                            <TableHeaderColumn>影片类型</TableHeaderColumn>
                            <TableHeaderColumn>参演级别</TableHeaderColumn>
                            <TableHeaderColumn>首日排片率</TableHeaderColumn>
                            <TableHeaderColumn>票房</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody
                        displayRowCheckbox={false}
                        showRowHover={true}
                        //stripedRows={true}
                        >
                        {films.map((row, index) => (
                            <TableRow key={index}>
                                <TableRowColumn>{row.name}</TableRowColumn>
                                <TableRowColumn>{row.time}</TableRowColumn>
                                <TableRowColumn>{row.type}</TableRowColumn>
                                <TableRowColumn>{row.classify}</TableRowColumn>
                                <TableRowColumn>{row.firstDay}%</TableRowColumn>
                                <TableRowColumn>{row.boxOffice}万</TableRowColumn>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                <div style={{width:'100%',height:400,marginTop:50}}>
                    <Toolbar>
                        <ToolbarGroup>
                            <ToolbarTitle text="票房贡献分析"/>
                        </ToolbarGroup>
                    </Toolbar>
                    <ECharts option={option1}/>
                </div>

                <div style={{width:'100%',height:400,marginTop:80}}>
                    <Toolbar>
                        <ToolbarGroup>
                            <ToolbarTitle text="票房按类型分析"/>
                        </ToolbarGroup>
                    </Toolbar>
                    <BoxOfficeChart/>
                </div>
            </div>
        );
    }
}
