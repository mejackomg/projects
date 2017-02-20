
import React from 'react';

import {Link} from 'react-router';
import Paper from 'material-ui/Paper'
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import ECharts from 'react-echarts';
import {Tabs, Tab} from 'material-ui/Tabs';
import Divider from 'material-ui/Divider';

import {
    colors,
    spacing,
    typography
} from 'material-ui/styles';


const styles = {

};

var films= [
    {"上映日":"2014.01.31","影片":"前任攻略","票房":"1.3","豆瓣分数":"6.3","开画排片":"9%","主要演员 ":"韩庚/姚星彤/郑恺 "},
    {"上映日":"2014.07.30","影片":"闺蜜","票房":"2.05","豆瓣分数":"5.5","开画排片":"24%","主要演员 ":"陈意涵/薛凯琪/杨子珊 "},
    {"上映日":"2014.08.21","影片":"临时同居","票房":"1.01","豆瓣分数":"5","开画排片":"21%","主要演员 ":"张家辉/郑秀文/欧豪/AB "},
    {"上映日":"2014.11.11","影片":"单身男女2","票房":"1.99","豆瓣分数":"5.4","开画排片":"32%","主要演员 ":"高圆圆/吴彦祖/古天乐/杨千_ "},
    {"上映日":"2014.11.28","影片":"撒娇女人最好命","票房":"2.31","豆瓣分数":"5.9","开画排片":"27%","主要演员 ":"周迅/黄晓明 "},
    {"上映日":"2014.12.12","影片":"我的早更女友","票房":"1.62","豆瓣分数":"5.5","开画排片":"29%","主要演员 ":"周迅/佟大为 "},
    {"上映日":"2014.12.24","影片":"微爱之渐入佳境","票房":"2.85","豆瓣分数":"4.8","开画排片":"28%","主要演员 ":"陈赫/AB "},
    {"上映日":"2015.01.08","影片":"重返20岁","票房":"3.66","豆瓣分数":"7.3","开画排片":"28%","主要演员 ":"杨子珊/鹿晗 "},
    {"上映日":"2015.02.06","影片":"有种你爱我","票房":"0.68","豆瓣分数":"4.8","开画排片":"12%","主要演员 ":"郑恺/江一燕 "},
    {"上映日":"2015.04.02","影片":"咱们结婚吧","票房":"2.84","豆瓣分数":"6","开画排片":"29%","主要演员 ":"高圆圆/姜武/李晨/郑恺 "},
    {"上映日":"2015.04.17","影片":"万物生长","票房":"1.48","豆瓣分数":"5.9","开画排片":"20%","主要演员 ":"范冰冰/韩庚 "},
    {"上映日":"2015.07.24","影片":"命中注定","票房":"0.68","豆瓣分数":"5.8","开画排片":"17%","主要演员 ":"汤唯/廖凡 "},
    {"上映日":"2015.08.20","影片":"新娘大作战","票房":"1.73","豆瓣分数":"4","开画排片":"31%","主要演员 ":"倪妮/AB/陈晓 "},
    {"上映日":"2015.11.06","影片":"前任2","票房":"2.52","豆瓣分数":"5.2","开画排片":"27%","主要演员 ":"郑恺/郭采洁 "},
    {"上映日":"2015.11.19","影片":"我的少女时代","票房":"3.59","豆瓣分数":"7.9","开画排片":"22%","主要演员 ":"宋芸桦/王大陆(刘德华 陈乔恩) "},
    {"上映日":"2015.12.04","影片":"杜拉拉追婚记","票房":"0.5","豆瓣分数":"5.3","开画排片":"13%","主要演员 ":"林依晨/周渝民/陈柏霖 "},
]

const option2 = {
    title : {
        text: '票房类型占比',
        subtext: '2007 年至 2016 年',
        x:'40%'
    },
    tooltip : {
        trigger: 'axis'},
    legend: {
        data:['爱情','喜剧','奇幻'],
        left:'20%',
        top:'12%',
    },
    grid: {
        left: '2%',
        right: '40%',
        top: '25%',

        //bottom:'25%',
        containLabel: true
    },
    calculable : true,
    xAxis : [
        {
            type : 'category',
            data : ['2007','2008','2009','2010','2011','2012','2013','2014','2015','2016'],
            axisLabel:{
                interval:0
            }
        }
    ],
    yAxis : [
        {
            type : 'value',
            axisLabel: {
                formatter: '{value}%'
            }
        }
    ],
    series : [
        {
            name:'爱情',
            type:'bar',
            stack: '1',
            barWidth:22,
            data:[9, 4, 7, 10, 13, 11, 9, 14, 12, 8]
        },
        {
            name:'喜剧',
            type:'bar',
            stack: '1',
            barWidth:22,
            data:[6, 5, 9, 6, 8, 7, 15, 15, 8, 12],
        },
        {
            name:'奇幻',
            type:'bar',
            stack: '1',
            barWidth:22,
            data:[3, 5, 9, 4, 6, 7, 11, 13, 8, 10],
        },
        {
            name: '访问来源',
            type: 'pie',
            radius : '45%',
            center: ['80%', '50%'],
            data:[
                {value:10, name:'爱情'},
                {value:12, name:'喜剧'},
                {value:9, name:'奇幻'},
                {value:69, name:'其他'}
            ],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            },
            label: {
                normal: {
                    show:true,
                    //position:'inner',
                    formatter: '{b}: {d}%'
                }
            },
        }
    ]
};

const option1 = {
    title: {
        text: '同类型影片分析',
        subtext: '2014 年至 2015 年',
        left: 'center'
    },
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
                            tar += param.seriesName + ' : ' + param.value +'亿<br/>';
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
        top: '25%',

        //bottom:'25%',
        containLabel: true
    },
    legend: {
        left:'20%',
        top:'12%',
        right:'45%',
        data:['票房','首日排片率']
    },
    xAxis: [
        {
            type: 'category',
            data: films.map(function (item) {
                return item.影片;
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
            max: 5,
            interval: 1,
            axisLabel: {
                formatter: '{value} 亿'
            }
        },
        {
            type: 'value',
            name: '首日排片',
            min: 0,
            max: 5,
            interval: 1,
            axisLabel: {
                formatter: function (val) {
                    return val * 10 + '%';
                }//formatter: '{value}%'
            }
        }
    ],
    series: [
        {
            name:'票房',
            type:'bar',
            //stack:'1',
            data:films.map(function (item) {
                return item.票房;
            }),
            barWidth:22,
            markPoint : {
                data : [
                    {type : 'max', name: '最大值'},
                    {type : 'min', name: '最小值'}
                ]
            },
            markLine : {
                data : [
                    {type : 'average', name: '平均值'}
                ]
            }
        },
        {
            name:'首日排片率',
            type:'line',
            yAxisIndex: 1,
            data:films.map(function (item) {
                return parseInt(item.开画排片)/10;
            })
        }
    ]
};

export default class CompositeValue extends React.Component {

    render() {
        return (
            <div style={{marginTop:60}}>
                <Toolbar>
                    <ToolbarGroup>
                        <ToolbarTitle text="类型分析"/>
                        <ToolbarTitle text="票房占比：12％" style={{color:'F9A825'}}/>
                        <ToolbarTitle text="票房区间：[2，5］亿" style={{color:'F9A825'}}/>
                    </ToolbarGroup>
                </Toolbar>

                <div style={{marginTop:10}}>
                    <div style={{height:400}}>
                        <ECharts option={option2}/>
                    </div>
                    <Divider style={{marginBottom:20,marginTop:-20}}/>
                    <div style={{height:400}}>
                        <ECharts option={option1}/>
                    </div>
                </div>
            </div>
        );
    }
}
