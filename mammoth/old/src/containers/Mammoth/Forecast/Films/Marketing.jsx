
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

};

const option1 = {
    tooltip: {
        trigger: 'item',
    },
    grid: {
        left: '1%',
        right: '3%',
        top: '60%',
        height:200,
        //bottom:'5%',
        containLabel: true
    },
    legend: {
        left:'20%',
        //right:'45%',
        top:'53%',
        data:['海报剧照','片花预告片','新闻','社交平台','票房','期待/购票指数']
    },
    xAxis: [
        {
            type: 'category',
            data: ['前4周','前3周','前2周','前1周','第1周','第2周','第3周','第4周','第5周'],
            axisLabel: {//坐标轴文本标签选项
                //show: true,
                interval: '0',//标签显示挑选间隔,0全部显示
                //inside: false,
                //rotate: -50
            }
        }
    ],
    yAxis: [
        {
            type: 'value',
            name: '票房',
            min: 0,
            max: 100000,
            interval: 10000,
            axisLabel: {
                formatter: '{value} 万'
                //间隔名称格式器formatter：{string}，模板（Template），其变量为：
                // {value}: 内容或值
                // {Function}，传递参数同模板变量：
                // eg：function (value){return "星期" + "日一二三四五六".charAt(value);'}
            }
        },
        {
            type: 'value',
            name: '营销指数',
            min: 0,
            max: 10,
            interval: 1,
            axisLabel: {
                formatter: '{value}'
            }
        }
    ],
    radar: {
        indicator: [//雷达指标列表，同时也是label内容
            { text: '预告海报',max: 30 },
            { text: '正式海报',max: 30 },
            { text: '官方剧照' ,max: 30},
            { text: '角色海报',max: 30 },
            { text: '新闻图片',max: 30 },
            { text: '工作照',max: 30 },
            { text: '截图',max: 30 },
            { text: '其他',max: 30 }
        ],
        center: ['52%', '27%'],
        radius: '38%',
//      startAngle: 90,
//      splitNumber: 4,
        //shape: 'circle',
        nameGap:10,
        name: {
//        formatter:'【{value}】',
            textStyle: {
                color:'#004D40'
            }
        },
//      splitArea: {
//        areaStyle: {
//          color: ['rgba(114, 172, 209, 0.2)',
//            'rgba(114, 172, 209, 0.4)', 'rgba(114, 172, 209, 0.6)',
//            'rgba(114, 172, 209, 0.8)', 'rgba(114, 172, 209, 1)'],
//          shadowColor: 'rgba(0, 0, 0, 0.3)',
//          shadowBlur: 10
//        }
//      },
//      axisLine: {
//        lineStyle: {
//          color: 'rgba(255, 255, 255, 0.5)'
//        }
//      },
        splitLine: {
            lineStyle: {
                color: 'rgba(205, 235, 55, 0.5)'
            }
        }
    },
    series: [
        {
            name:'票房',
            type:'bar',
            stack:'1',
            barWidth:30,
            data:[0,0,0,0,90200,50000,30000,10000,5500]
        },
        {
            name:'海报剧照',
            type:'line',
            yAxisIndex: 1,
            data:[4,7,6,4,5,2,1,0,0]
        },
        {
            name:'新闻',
            type:'line',
            yAxisIndex: 1,
            data:[3,5,7,3,6,7.2,6,4,3]
        },
        {
            name:'片花预告片',
            type:'line',
            yAxisIndex: 1,
            data:[7,6,8,6,1,0,0,0,0]
        },
        {
            name:'社交平台',
            type:'line',
            yAxisIndex: 1,
            data:[3,4,4.5,6,8,7,5,3,2]
        },
        {
            name: '期待/购票指数',
            type: 'line',
            //xAxisIndex: 1,
            yAxisIndex: 1,
            areaStyle: {
                normal: {
                    opacity: 0.3
                }
            },
            data: [3,5,5.5,7,8.1,7.3,4,2,1]
        },
        {
            name:'行业分析',
            type:'pie',
            selectedMode: 'single',
            radius: [0, '20%'],
            center: ['20%', '27%'],
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
                {value:3200, name:'海报剧照', selected:true},
                {value:2400, name:'片花预告片'},
                {value:2200, name:'新闻'},
                {value:1500, name:'社交平台'}
            ]
        },
        {
            name:'行业分析',
            type:'pie',
            radius: ['27%', '38%'],
            center: ['20%', '27%'],
            data:[
                {value:3200, name:'Mtime'},
                {value:900, name:'Mtime'},
                {value:1500, name:'豆瓣'},
                {value:300, name:'新浪新闻'},
                {value:600, name:'凤凰网'},
                {value:400, name:'网易新闻'},
                {value:600, name:'微博'},
                {value:600, name:'微信公众号'},
                {value:500, name:'豆瓣'},
                {value:400, name:'爱电影'}
            ]
        },
        {
            name: '',
            type: 'radar',
            itemStyle: {
                emphasis: {
                    // color: 各异,
                    lineStyle: {
                        width: 4
                    }
                }
            },
            data: [
                {
                    value: [27, 22, 24, 25, 22,21,20,10],
                    name: '海报剧照分布',
                    //areaStyle: {
                    //    normal: {
                    //        opacity: 0.4,
                    //        color: new echarts.graphic.RadialGradient(0.5, 0.5, 1, [
                    //            {
                    //                color: '#B8D3E4',
                    //                offset: 0
                    //            },
                    //            {
                    //                color: '#72ACD1',
                    //                offset: 1
                    //            }
                    //        ])
                    //    }
                    //},
                    lineStyle: {
                        normal: {
//                color: '#fff',
                            width:1,
                            opacity:0.4
                        }
                    },
                    //label: {
                    //    normal: {
                    //        show: true,
                    //        //position:'inside',
                    //        textStyle: {
                    //            color: '#F57C00',
                    //        },
                    //        formatter:function(params) {
                    //            return params.value + '次';
                    //        }
                    //    }
                    //}
                }
            ]
        },
        {
            name:'网络新闻',
            type:'pie',
            radius : ['10%', '35%'],
            center : ['84%', '27%'],
            roseType : 'area',
            labelLine: {
                normal: {
                    //show: false,
                    length:0
                },
                emphasis: {
                    show: true
                }
            },
            data:[
                {value:10, name:'人民日报'},
                {value:5, name:'网易'},
                {value:15, name:'搜狐'},
                {value:25, name:'腾讯娱乐'},
                {value:20, name:'凤凰娱乐'},
                {value:35, name:'其他'}
            ]
        }
    ]
};


export default class CompositeValue extends React.Component {

    render() {
        return (
            <div style={{height:500,marginTop:60}}>
                <Toolbar>
                    <ToolbarGroup>
                        <ToolbarTitle text="宣发分析"/>
                    </ToolbarGroup>
                </Toolbar>
                <ECharts option={option1}/>
            </div>
        );
    }
}
