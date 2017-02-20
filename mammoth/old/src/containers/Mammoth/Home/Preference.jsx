
import React from 'react';

import {Link} from 'react-router';
import Paper from 'material-ui/Paper'
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import ECharts from 'react-echarts';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import Subheader from 'material-ui/Subheader';
import {TagCloud, defaultRenderer} from "react-tagcloud";
import Chart from '../../Charts/Highcharts/Highcharts.react.js';
import PreferenceChart1 from '../PublicOpinion/PreferenceChart1.js'

//var map=require('highcharts/modules/map');
//var modules=[];

import {
    colors,
    spacing,
    typography
} from 'material-ui/styles';


const styles = {

};
const films=[];

const data = [
    { value: "宋仲基", count: 25 }, { value: "幽默搞笑", count: 18 },
    { value: "明星真人秀", count: 38 }, { value: "热爱生活", count: 30 },
    { value: "3D IMax", count: 28 }, { value: "屌丝逆袭", count: 15 },
    { value: "玄幻", count: 33 }, { value: "美国科幻大片", count: 20 },
    { value: "鬼吹灯", count: 10 }, { value: "英雄主义", count: 8 },
    { value: "宋慧乔", count: 25 }
];
const option = {
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    grid: {
        left: '1%',
        //right: '8%',
        top: '6%',
        width:220,
        height:190,
        containLabel: true
    },
    xAxis: {
        type: 'value',
        //boundaryGap: [0, 0.01],
        min: 0,
        max: 10,
        position:'top',
        name:'影响力'
        //interval: 20000,
    },
    yAxis: {
        type: 'category',
        inverse:true,
        data: ['路人甲','路人乙','路人丙','路人丁','路人戊']
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
            data:[9,8,7,6,5]
        }
    ]
};
const myConfig = {
    chart: {
        type: 'pie',
        options3d: {
            enabled: true,
            alpha: 45
        },
        width:530,
        height:290,
        //marginLeft:-30,
        //margin: [50, 400, 100, 50],
        //spacing:[0,0,0,0]
    },
    title: {
        text: ''
    },
    //subtitle: {
    //    text: '3D donut in Highcharts'
    //},
    plotOptions: {
        pie: {
            innerSize: 60,
            depth: 35,
            dataLabels: {
                enabled: true,
                distance: 10,
                format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                //style: {
                //    color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                //},
                //connectorColor: 'silver'
            }
        }
    },
    tooltip: {
        headerFormat: '<b>{point.key}</b><br>',
        pointFormat: '<span style="color:{series.color}">\u25CF</span> {series.name}: {point.y}%'
    },
    series: [{
        name: 'Delivered amount',
        data: [
            ['00后', 10],
            ['90后', 20],
            ['80后', 50],
            ['70后', 15],
            ['其他', 5]
        ]
    }]
}
const myConfig1 = {
    chart: {
        type: 'pie',
        //options3d: {
        //    enabled: true,
        //    alpha: 45
        //},
        width:350,
        height:90,
        marginLeft:-50,
        //margin: [50, 400, 100, 50],
        //spacing:[0,0,0,0]
    },
    title: {
        text: ''
    },
    //subtitle: {
    //    text: '3D donut in Highcharts'
    //},
    plotOptions: {
        pie: {
            //innerSize: 60,
            depth: 15,
            dataLabels: {
                enabled: true,
                distance: 10,
                format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                //style: {
                //    color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                //},
                //connectorColor: 'silver'
            }
        }
    },
    tooltip: {
        headerFormat: '<b>{point.key}</b><br>',
        pointFormat: '<span style="color:{series.color}">\u25CF</span> {series.name}: {point.y}%'
    },
    series: [{
        name: 'Delivered amount',
        data: [
            ['男性', 70],
            ['女性', 30],
        ]
    }]
}

const myConfig2 = {
    chart: {
        type: 'pie',
        //options3d: {
        //    enabled: true,
        //    alpha: 45
        //},
        width:350,
        height:90,
        marginLeft:-50,
        //margin: [50, 400, 100, 50],
        //spacing:[0,0,0,0]
    },
    title: {
        text: ''
    },
    //subtitle: {
    //    text: '3D donut in Highcharts'
    //},
    plotOptions: {
        pie: {
            //innerSize: 60,
            depth: 5,
            dataLabels: {
                enabled: true,
                distance: 10,
                format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                //style: {
                //    color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                //},
                //connectorColor: 'silver'
            }
        }
    },
    tooltip: {
        headerFormat: '<b>{point.key}</b><br>',
        pointFormat: '<span style="color:{series.color}">\u25CF</span> {series.name}: {point.y}%'
    },
    series: [{
        name: 'Delivered amount',
        data: [
            ['高收入', 10],
            ['中等收入', 50],
            ['低等收入', 30],
            ['其他', 10],
        ]
    }]
}
const myConfig3 = {
    chart: {
        type: 'pie',
        //options3d: {
        //    enabled: true,
        //    alpha: 45
        //},
        width:350,
        height:90,
        marginLeft:-50,
        //margin: [50, 400, 100, 50],
        //spacing:[0,0,0,0]
    },
    title: {
        text: ''
    },
    //subtitle: {
    //    text: '3D donut in Highcharts'
    //},
    plotOptions: {
        pie: {
            //innerSize: 60,
            depth: 15,
            dataLabels: {
                enabled: true,
                distance: 10,
                format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                //style: {
                //    color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                //},
                //connectorColor: 'silver'
            }
        }
    },
    tooltip: {
        headerFormat: '<b>{point.key}</b><br>',
        pointFormat: '<span style="color:{series.color}">\u25CF</span> {series.name}: {point.y}%'
    },
    series: [{
        name: 'Delivered amount',
        data: [
            ['服务业', 30],
            ['IT', 20],
            ['政府企业', 15],
            ['学生', 20],
            ['其他', 15],
        ]
    }]
}

function randomData() {
    return Math.round(Math.random()*1000);
}

const renderer = defaultRenderer({
    props: {
        style: {
            //border: '1px solid silver',
            padding: '5px'},
        //className: 'my-tag-class'
    },
    //colorOptions: {
    //    luminosity: 'light',
    //    hue: 'blue'
    //}
});

export default class Audience extends React.Component {

    render() {
        //modules.push(map);
        return (
            <div style={{marginTop:-30}}>
                <div style={{width:'100%',height:180,marginTop:100}}>
                    <div style={{width:'40%',marginLeft:'30%',marginTop:40,textAlign:'center'}}>
                        <TagCloud minSize={12}
                                  maxSize={35}
                                  tags={data}
                                  renderer={renderer}/>
                    </div>
                </div>

                <div style={{width:'100%',height:400}}>
                    <PreferenceChart1 />
                </div>
            </div>
        );
    }
}
