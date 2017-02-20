
import React from 'react';

import {Link} from 'react-router';
import Paper from 'material-ui/Paper'
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import ECharts from 'react-echarts';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import Subheader from 'material-ui/Subheader';
import {TagCloud, defaultRenderer} from "react-tagcloud";
import Chart from '../../Charts/Highcharts/Highcharts.react.js';

import MapPage from '../../Map/Map.js'
import BoxOfficeChart1 from './BoxOfficeChart1.js'


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
    { value: "汽车", count: 25 }, { value: "幽默搞笑", count: 18 },
    { value: "喜欢明星真人秀", count: 38 }, { value: "热爱音乐", count: 30 },
    { value: "学生", count: 28 }, { value: "穷忙", count: 15 },
    { value: "宅在家", count: 33 }, { value: "青岛人", count: 20 },
    { value: "最佳配角", count: 10 }, { value: "中低收入", count: 8 },
    { value: "上班族", count: 25 }
];

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
            <div style={{marginTop:0}}>
                <div style={{width:'100%',height:300}}>
                    <Toolbar>
                        <ToolbarGroup>
                            <ToolbarTitle text="年龄/性别分析"/>
                        </ToolbarGroup>
                    </Toolbar>

                    <div>
                        <div style={{float:'left'}}>
                            <Chart container="3d_pie" options={myConfig}/>
                        </div>
                        <div style={{float:'left'}}>
                            <Chart container="3d_pie1" options={myConfig1}/>
                            <Chart container="3d_pie2" options={myConfig2}/>
                            <Chart container="3d_pie3" options={myConfig3}/>
                        </div>
                    </div>
                </div>

                <div style={{width:'100%',height:400,marginTop:50}}>
                    <Toolbar>
                        <ToolbarGroup>
                            <ToolbarTitle text="受众票房占比"/>
                        </ToolbarGroup>
                    </Toolbar>
                    <BoxOfficeChart1/>
                </div>

                <div style={{width:'100%',height:625,marginTop:50}}>
                    <Toolbar>
                        <ToolbarGroup>
                            <ToolbarTitle text="地域分布"/>
                        </ToolbarGroup>
                    </Toolbar>
<MapPage/>
                </div>

                <div style={{width:'100%',height:450,marginTop:50}}>
                    <Toolbar>
                        <ToolbarGroup>
                            <ToolbarTitle text="受众标签分析"/>
                        </ToolbarGroup>
                    </Toolbar>
                    <div style={{width:'40%',marginLeft:'30%',marginTop:40,textAlign:'center'}}>
                        <TagCloud minSize={12}
                                  maxSize={35}
                                  tags={data}
                                  renderer={renderer}/>
                    </div>
                </div>
            </div>
        );
    }
}
