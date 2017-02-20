
import React from 'react';

import {Link} from 'react-router';
import Paper from 'material-ui/Paper'
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import ECharts from 'react-echarts';
import {Tabs, Tab} from 'material-ui/Tabs';

import {
    colors,
    spacing,
    typography
} from 'material-ui/styles';

import TreemapChart from '../../BoxOffice/TreemapChart.js'

const styles = {

};

var films=[
    {"week":"第1周","time":"2016年06月08日-06月14日","changjunrenci":"65","danzhou":"60075","leiji":"60119","days":"3"},
    {"week":"第2周","time":"2016年06月15日-06月21日","changjunrenci":"40","danzhou":"61484","leiji":"121588","days":"10"},
    {"week":"第3周","time":"2016年06月22日-06月28日","changjunrenci":"38","danzhou":"33849","leiji":"155429","days":"17"},
    {"week":"第4周","time":"2016年01月04日-01月10日","changjunrenci":"18","danzhou":"8324","leiji":"163754","days":"24"},
    {"week":"第5周","time":"2016年01月11日-01月17日","changjunrenci":"14","danzhou":"2302","leiji":"166057","days":"31"},
    {"week":"第6周","time":"2016年01月18日-01月24日","changjunrenci":"17","danzhou":"1035","leiji":"167092","days":"38"},
    {"week":"第7周","time":"2016年01月25日-01月31日","changjunrenci":"15","danzhou":"679","leiji":"167771","days":"45"},
    {"week":"第8周","time":"2016年02月01日-02月07日","changjunrenci":"12","danzhou":"410","leiji":"168182","days":"52"},
    {"week":"第9周","time":"2016年02月08日-02月14日","changjunrenci":"15","danzhou":"23","leiji":"168205","days":"59"},
]

const option1 = {
    tooltip: {
        trigger: 'axis',
    },
    grid: {
        left: '5%',
        right: '8%',
        height:270,

        //bottom:'25%',
        containLabel: true
    },
    legend: {
        left:0,
        //right:'45%',
        data:['单周票房','累计票房','场均人次']
    },
    xAxis: [
        {
            type: 'category',
            data: films.map(function (item) {
                return item.week;
            }),
            //axisLabel: {
            //    //show: true,
            //    interval: '0',
            //    //inside: false,
            //    rotate: -50
            //}
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
            name: '场均人次',
            min: 0,
            max: 100,
            interval: 10,
            axisLabel: {
                formatter: '{value}'
            }
        }
    ],
    series: [
        {
            name:'单周票房',
            type:'bar',
            //stack:'1',
            barWidth:15,
            data:films.map(function (item) {
                return item.danzhou;
            })
        },
        {
            name:'场均人次',
            type:'line',
            yAxisIndex: 1,
            data:films.map(function (item) {
                return item.changjunrenci;
            })
        },
        {
            name:'累计票房',
            type:'line',
            data:films.map(function (item) {
                return item.leiji;
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
                        <ToolbarTitle text="预测票房（中国）"/>
                        <ToolbarTitle text="总票房：17亿" style={{color:'F9A825'}}/>
                        <ToolbarTitle text="首日：2.7亿" style={{color:'F9A825'}}/>
                        <ToolbarTitle text="首周：6.2亿" style={{color:'F9A825'}}/>
                    </ToolbarGroup>
                </Toolbar>

                <div style={{height:350,marginTop:10}}>
                    <ECharts option={option1}/>
                </div>

                <div style={{width:'100%',height:450,marginTop:30}}>
                    <Toolbar>
                        <ToolbarGroup>
                            <ToolbarTitle text="票房评估指标"/>
                            <ToolbarTitle text="总指标：8.7" style={{color:'F9A825'}}/>
                            <ToolbarTitle text="首周指标：7.1" style={{color:'F9A825'}}/>
                            <ToolbarTitle text="后劲指标：6.0" style={{color:'F9A825'}}/>
                        </ToolbarGroup>
                    </Toolbar>
                    <TreemapChart/>
                </div>
            </div>
        );
    }
}
