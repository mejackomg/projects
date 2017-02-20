
import React from 'react';

import {Link} from 'react-router';
import Paper from 'material-ui/Paper'
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import ECharts from 'react-echarts';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

import {
    colors,
    spacing,
    typography
} from 'material-ui/styles';

const styles = {

};

const daiyan=[
    {time:'2015',brand:'人人车',brandValue:'8.0',income:'3200万'},
    {time:'2015',brand:'景芝酒',brandValue:'5.0',income:'900万'},
    {time:'2014',brand:'今麦郎',brandValue:'6.0',income:'1500万'},
    {time:'2013',brand:'双鹿电池',brandValue:'6.0',income:'300万'},
    {time:'2013',brand:'艾尔康居',brandValue:'4.0',income:'600万'},
    {time:'2013',brand:'修正药业',brandValue:'6.0',income:'600万'},
    {time:'2013',brand:'新东方烹饪学校',brandValue:'5.0',income:'500万'},
    {time:'2013',brand:'雅安泰品牌门',brandValue:'4.0',income:'400万'},
    {time:'2012',brand:'耐普照明',brandValue:'5.0',income:'600万'},
    {time:'2012',brand:'伏魔者OL',brandValue:'6.0',income:'400万'}
]

const option = {
    //title: {
    //    text: '世界人口总量',
    //    subtext: '数据来自网络'
    //},
    //tooltip: {
    //    trigger: 'axis',
    //    axisPointer: {
    //        type: 'shadow'
    //    }
    //},
    //legend: {
    //    data: ['2011年', '2012年']
    //},
    grid: {
        left: '10%',
        right: '4%',
        top: '3%',
        bottom:'20%',
        containLabel: true
    },
    xAxis: {
        type: 'value',
        boundaryGap: [0, 0.1],

        axisLine:{
            show:false
        },
        axisLabel: {
            show: false,
        },
        splitLine: {
            show: false,
        },
        axisTick: {
            show: false,
        }
    },
    yAxis: {
        type: 'category',
        data: ['票房号召力','广告代言','荧屏活跃度','口碑','热度'],
        inverse:true,

        axisLine:{
            show:false
        },
        axisLabel: {
            show: true,
        },
        splitLine: {
            show: false,
        },
        axisTick: {
            show: false,
        }
    },
    series: [
        {
            name: '2011年',
            type: 'bar',
            barWidth:12,
            data: [7, 4, 6.5, 8, 7],
            itemStyle: {
                normal: {
                    color: '#FFE0B2'
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
            }
        }
    ]
};

const option1 = {
    tooltip: {
        trigger: 'axis',
        formatter: function (params) {
            var tar='';
            var name;
            if(params.length>1) {
                //if(params[0].seriesName=='本周投入') {
                //    params.map(function (param) {
                //        tar += param.seriesName + ' : ' + param.value + '万元<br/>';
                //        name = '第'+param.name+'周';
                //    })
                //}
                //else
                {
                    params.map(function (param) {
                        if (param.value != '0') {
                            if( param.seriesName != '商业代言指数')
                                tar += param.seriesName + ' : ' + param.value + '万<br/>';
                            else
                                tar += param.seriesName + ' : ' + param.value +'<br/>';
                        }
                        name = param.name;
                    })
                }
            }
            else
            {
                //if(params.seriesType=='radar')
                //    return ;
                //
                //tar = params.seriesName + ' : ' + params.value + '周<br/>';
                //name = params.name;
            }
            return tar = name +  '<br/>' + tar;
        }
    },
    grid: {
        left: '1%',
        right: '45%',
        top: '20%',
        //bottom:'5%',
        containLabel: true
    },
    legend: {
        left:0,
        right:'45%',
        data:['人人车','景芝酒','今麦郎','双鹿电池','艾尔康居',
            '修正药业','新东方烹饪','雅安泰','耐普照明','伏魔者OL']
    },
    xAxis: [
        {
            type: 'category',
            data: ['2012年','2013年','2014年','2015年','2016年']
        }
    ],
    yAxis: [
        {
            type: 'value',
            name: '代言费',
            min: 0,
            max: 4000,
            interval: 800,
            axisLabel: {
                formatter: '{value} 万'
            }
        },
        {
            type: 'value',
            name: '商业代言指数',
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
            name:'人人车',
            type:'bar',
            stack:'1',
            barWidth:30,
            data:[0,0,0,1000,2200]
        },
        {
            name:'景芝酒',
            type:'bar',
            stack:'1',
            data:[0,0,0,900,0]
        },
        {
            name:'今麦郎',
            type:'bar',
            stack:'1',
            data:[0,0,1500,0,0]
        },
        {
            name:'双鹿电池',
            type:'bar',
            stack:'1',
            data:[0,300,0,0,0]
        },
        {
            name:'艾尔康居',
            type:'bar',
            stack:'1',
            data:[0,600,0,0]
        },
        {
            name:'修正药业',
            type:'bar',
            stack:'1',
            data:[0,600,0,0,0]
        },
        {
            name:'新东方烹饪',
            type:'bar',
            stack:'1',
            data:[0,500,0,0,0]
        },
        {
            name:'雅安泰',
            type:'bar',
            stack:'1',
            data:[0,400,0,0,0]
        },
        {
            name:'耐普照明',
            type:'bar',
            stack:'1',
            data:[600,0,0,0,0]
        },
        {
            name:'伏魔者OL',
            type:'bar',
            stack:'1',
            data:[400,0,0,0,0]
        },
        {
            name:'商业代言指数',
            type:'line',
            yAxisIndex: 1,
            data:[4,7,6,5,8]
        },

        {
            name:'行业分析',
            type:'pie',
            selectedMode: 'single',
            radius: [0, '30%'],
            center: ['80%', '48%'],
            label: {
                normal: {
                    position: 'inner'
                }
            },
            labelLine: {
                normal: {
                    show: false
                }
            },
            label: {
                normal: {
                    position: 'inner',
                    textStyle: {
                        color:'#EFEBE9'
                    }
                }
            },
            data:[
                {value:3200, name:'服务业', selected:true},
                {value:2400, name:'饮食业'},
                {value:2200, name:'家居生活'},
                {value:1500, name:'其他'}
            ]
        },
        {
            name:'行业分析',
            type:'pie',
            radius: ['40%', '58%'],
            center: ['80%', '48%'],
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


export default class CompositeValue extends React.Component {

    render() {
        return (
            <div style={{marginTop:-30}}>
                <Toolbar>
                    <ToolbarGroup>
                        <ToolbarTitle text="商业代言"/>
                    </ToolbarGroup>
                </Toolbar>
                <Table
                    fixedHeader={true}
                    height='300px'
                    selectable={false}
                    >
                    <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
                        <TableRow>
                            <TableHeaderColumn>年份</TableHeaderColumn>
                            <TableHeaderColumn>品牌</TableHeaderColumn>
                            <TableHeaderColumn>品牌认知度</TableHeaderColumn>
                            <TableHeaderColumn>代言费</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody
                        displayRowCheckbox={false}
                        showRowHover={true}
                        //stripedRows={true}
                        >
                        {daiyan.map((row, index) => (
                            <TableRow key={index} selected={row.selected}>
                                <TableRowColumn>{row.time}</TableRowColumn>
                                <TableRowColumn>{row.brand}年</TableRowColumn>
                                <TableRowColumn>{row.brandValue}</TableRowColumn>
                                <TableRowColumn>{row.income}</TableRowColumn>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                <div style={{height:400,marginTop:50}}>
                    <Toolbar>
                        <ToolbarGroup>
                            <ToolbarTitle text="商业代言价值分析"/>
                        </ToolbarGroup>
                    </Toolbar>
                    <ECharts option={option1}/>
                </div>
            </div>
        );
    }
}
