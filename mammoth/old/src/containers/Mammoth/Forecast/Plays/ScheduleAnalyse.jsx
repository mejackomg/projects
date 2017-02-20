
import React from 'react';

import {Link} from 'react-router';
import Paper from 'material-ui/Paper'
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import ECharts from 'react-echarts';
import {Tabs, Tab} from 'material-ui/Tabs';
import Divider from 'material-ui/Divider';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import FilmsList from './FilmsList.jsx'

import {
    colors,
    spacing,
    typography
} from 'material-ui/styles';


const styles = {
    checkbox: {
        marginTop: 18,
        width:120,
        float:'left'
    },
    labelStyle:{
        fontSize:14
    }
};

var schedule=[
    {'name':'元旦档','value':['3','4','5','6','6','8','10','12','13','14'],'total':'81'},
    {'name':'春节档','value':['3','4','5','6','6','8','10','12','13','14'],'total':'81'},
    {'name':'元宵节','value':['3','4','5','6','6','8','10','12','13','14'],'total':'81'},
    {'name':'情人节','value':['3','4','5','6','6','8','10','12','13','14'],'total':'81'},
    {'name':'妇女节','value':['3','4','5','6','6','8','10','12','13','14'],'total':'81'},
    {'name':'清明档','value':['3','4','5','6','6','8','10','12','13','14'],'total':'81'},
    {'name':'五一档','value':['3','4','5','6','6','8','10','12','13','14'],'total':'81'},
    {'name':'端午档','value':['3','4','5','6','6','8','10','12','13','14'],'total':'81'},
    {'name':'七夕档','value':['3','4','5','6','6','8','10','12','13','14'],'total':'81'},
    {'name':'中秋档','value':['3','4','5','6','6','8','10','12','13','14'],'total':'81'},
    {'name':'暑假档','value':['3','4','5','6','6','8','10','12','13','14'],'total':'81'},
    {'name':'国庆档','value':['3','4','5','6','6','8','10','12','13','14'],'total':'81'},
    {'name':'冷档','value':['3','4','5','6','6','8','10','12','13','14'],'total':'81'},
    {'name':'贺岁档','value':['3','4','5','6','6','8','10','12','13','14'],'total':'81'},

]

var data=schedule.map(row => {
    return {
        name: row.name,
        type: 'bar',
        //stack: '总量',
        areaStyle: {normal: {}},
        data: //row.value
            [2, 2, 3, 3, 4, 4, 5, 6, 6, 7].map((item)=>Math.round(Math.random()*7+item))
    }
})
data.push( {
    name:'同类型影片票房',
    type:'line',
    //yAxisIndex: 1,
    data:[1, 1, 2, 2, 3, 3, 4, 4, 5, 6].map((item)=>Math.round(Math.random()*5+item))
})
var data1=schedule.map(row=>row.name)
data1.push('同类型影片票房')

const option2 = {
    title: {
        text: '历年各档期票房',
        subtext: '2007 年至 2016 年',
        left: 'center'
    },
    tooltip: {
        trigger: 'axis',
        formatter: function (params) {
            var tar='';
            var name;
            if(params.length>1) {
                params.map(function (param) {
                    tar += param.seriesName + ' : ' + param.value + '亿<br/>';
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
    legend: {
        data: data1,
        selected: {
            '清明档': false,
            '元旦档': false,
            '五一档': false,
            '端午档': true,
            '中秋档': false,
            '贺岁档': false,
            '国庆档': false,
            '暑假档': true,
            '春节档': false,
            '妇女节': false,
            '情人节': false,
            '七夕档': true,
            '元宵节': false,
            '开学档': false,
            '冷档': false,
        },
        top: '12%',
        left: '0%'
    },
    grid: {
        left: '2%',
        right: '5%',
        top: '30%',

        //bottom:'25%',
        containLabel: true
    },
    calculable: true,
    xAxis: [
        {
            type: 'category',
            data: ['2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016'],
            axisLabel: {
                interval: 0
            },
            //boundaryGap: false
        }
    ],
    yAxis: [
        {
            type: 'value',
            name: '票房',
            axisLabel: {
                formatter: '{value} 亿'
            }
        }
    ],
    series: data
};

const option1 = {
    title: {
        text: '票房按档期分布',
        subtext: '2016 年',
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
                        if( param.seriesName == '影片数量')
                            tar += param.seriesName + ' : ' + param.value + '部<br/>';
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
        left: '2%',
        right: '5%',
        top: '25%',
        //bottom:'25%',
        containLabel: true
    },
    legend: {
        left:'20%',
        top:'12%',
        data:['预测票房','影片数量']
    },
    xAxis: [
        {
            type: 'category',
            data: schedule.map(function (item) {
                return item.name;
            }),
            axisLabel: {
                //show: true,
                interval: '0',
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
            max: 15,
            interval: 3,
            axisLabel: {
                formatter: '{value} 亿'
            }
        },
        {
            type: 'value',
            name: '数量',
            min: 0,
            max: 10,
            interval: 2,
            axisLabel: {
                //formatter: function (val) {
                //    return val * 10 + '%';
                //}
                formatter: '{value}部'
            }
        }
    ],
    series: [
        {
            name:'预测票房',
            type:'bar',
            //stack:'1',
            data:schedule.map(()=> Math.round(Math.random()*7+5)),
            barWidth:22,
            itemStyle:{
                normal:{
                    color:''
                }
            }
        },
        {
            name:'影片数量',
            type:'line',
            yAxisIndex: 1,
            data:schedule.map(()=> Math.round(Math.random()*7+1)),
        }
    ]
};

export default class CompositeValue extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            year:'未上映影片'
        };
    }
    handleChange = (event, index, year) => this.setState({year});

    render() {
        option1.title.subtext = this.state.year;
        option1.series[0].data=schedule.map(()=>Math.round(Math.random()*7+5));
        option1.series[1].data=schedule.map(()=> Math.round(Math.random()*7+1));
        if(this.state.year=='未上映影片')
            option1.series[0].itemStyle.normal.color='lightBlue'
        else
            option1.series[0].itemStyle.normal.color=''
        return (
            <div style={{marginTop:60}}>
                <Toolbar>
                    <ToolbarGroup>
                        <ToolbarTitle text="档期分析"/>
                        <ToolbarTitle text="推荐档期：七夕档、端午档" style={{color:'F9A825'}}/>
                    </ToolbarGroup>
                </Toolbar>

                <div style={{marginTop:10}}>
                    <div style={{height:450}}>
                        <ECharts option={option2}/>
                    </div>
                    <Divider style={{marginBottom:20,marginTop:-20}}/>
                    <SelectField value={this.state.year} style={{width:150,marginLeft:30,zIndex:99}} onChange={this.handleChange}>
                        {
                            ['未上映影片','2016', '2015', '2014', '2013', '2012', '2011', '2010', '2009', '2008', '2007'].map((item, key)=> {
                                return <MenuItem key={key} value={item } primaryText={item}/>
                            })}
                    </SelectField>

                    <div style={{height:400,marginTop:-35}}>
                        <ECharts option={option1}/>
                    </div>
                    <FilmsList catalogue='upcoming'/>
                </div>
            </div>
        );
    }
}
