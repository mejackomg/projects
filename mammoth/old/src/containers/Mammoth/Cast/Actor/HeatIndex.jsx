
import React from 'react';

import {Link} from 'react-router';
import Paper from 'material-ui/Paper'
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import ECharts from 'react-echarts';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import Subheader from 'material-ui/Subheader';
import {TagCloud, defaultRenderer} from "react-tagcloud";

import {
    colors,
    spacing,
    typography
} from 'material-ui/styles';

const styles = {

};
const films=[];

const data = [
    { value: "实力派", count: 25 }, { value: "搞笑", count: 18 },
    { value: "喜欢看极限挑战", count: 38 }, { value: "王迅", count: 30 },
    { value: "平民英雄", count: 28 }, { value: "偶像", count: 15 },
    { value: "本色演出", count: 33 }, { value: "都是青岛的", count: 20 },
    { value: "最佳配角", count: 10 }, { value: "严谨", count: 8 },
    { value: "极限三精", count: 25 }, { value: "唱歌好听", count: 16 },
    { value: "不靠颜值靠实力", count: 10 }, { value: "真人秀", count: 12 },
    { value: "合适演小角色", count: 6 }, { value: "风一样的男子", count: 6 },

];

const option1 = {
    tooltip: {
        trigger: 'axis',
        formatter: function (params) {
            var tar = '';
            var name;
            if (params.length > 1) {
                params.map(function (param) {
                    if (param.value != '0') {
                        if (param.seriesName == '搜索关注')
                            tar += param.seriesName + ' : ' + param.value * 100 + '次<br/>';
                        else if (param.seriesName == '搜索关注' || param.seriesName == '微博关注'
                            ||param.seriesName ==  '社区关注'||param.seriesName == '媒体关注')
                            tar += param.seriesName + ' : ' + param.value + '次<br/>';
                        else
                            tar += param.seriesName + ' : ' + param.value + '<br/>';
                    }
                    name = param.name;
                })
            }
            else {
                //if(params.seriesType=='radar')
                //    return ;
                //
                tar = params.seriesName + ' : ' + params.value + '<br/>';
                name = params.name;
            }
            return tar = name + '<br/>' + tar;
        }
    },
    legend: [
        {
            left: '25%',
            //right: '45%',
            data: ['搜索关注', '微博关注', '社区关注', '媒体关注', '认知指数']
        },
        {
            left: '30%',
            bottom:'7%',
            //right: '45%',
            data: ['微博评价', '社区评价', '媒体评价', '认知评价','口碑指数']
        }
    ],
    grid: [
        {
            left: '8%',
            right: '8%',
            top: '60',
            height: '280',

            //containLabel: true
        },
        {
            left: '8%',
            right: '8%',
            top: '370',
            height: '150'
        }
    ],
    xAxis: [
        {
            type: 'category',
            //boundaryGap: false,
            //axisLabel: {
            //    show: false
            //},
            data: ['5月18日', '5月19日', '5月20日', '5月21日', '5月22日', '5月23日', '5月24日', '5月25日', '5月26日', '5月27日'
                , '5月28日', '5月29日', '5月30日', '5月31日', '6月1日']
        },
        {
            gridIndex: 1,
            type: 'category',
            axisLabel: {
                show: false
                //    textStyle: {
                //        fontSize: 9
                //    }
            },
            data: ['5月18日', '5月19日', '5月20日', '5月21日', '5月22日', '5月23日', '5月24日', '5月25日', '5月26日', '5月27日'
                , '5月28日', '5月29日', '5月30日', '5月31日', '6月1日']
        }
    ],
    yAxis: [
        {
            type: 'value',
            name: '关注数量',
            min: 0,
            max: 300,
            interval: 30,
        },
        {
            type: 'value',
            name: ' 认知指数',
            min: 0,
            max: 10,
            interval: 1,
            axisLabel: {
                formatter: '{value}'
            }
        },
        {
            gridIndex: 1,
            min: 0,
            max: 10,
            name: '口碑指数',
            type: 'value',
            inverse: true,
            //axisLabel: {
            //    textStyle: {
            //        fontSize: 9
            //    }
            //},
            //nameLocation: 'middle',
            //nameGap: 25
        }
    ],
    series: [
        {
            name: '搜索关注',
            type: 'bar',
            //stack: '总量',
            data: [120, 132, 101, 114, 90,
                100, 110, 80, 160, 110, 90, 70, 40, 20, 40]
        },
        {
            name: '微博关注',
            type: 'bar',
            data: [200, 182, 191, 234, 230,
                230, 190, 160, 140, 130, 150, 110, 110, 100, 60]
        },
        {
            name: '社区关注',
            type: 'bar',
            data: [150, 142, 131, 164, 150,
                140, 120, 90, 120, 140, 100, 90, 80, 90, 93]
        },
        {
            name: '媒体关注',
            type: 'bar',
            data: [20, 32, 5, 10, 20,
                50, 55, 40, 30, 25, 10, 5, 10, 4, 2]
        },
        {
            name: '认知指数',
            type: 'line',
            yAxisIndex: 1,
            areaStyle: {
                normal: {
                    opacity: 0.3
                }
            },
            data: [7, 7.4, 8.2, 8.6, 8,
                7.4, 6.8, 7, 7.5, 6.5, 5.8, 5.6, 5, 4.2, 4.3]
        },

        {
            name: '口碑指数',
            type: 'line',
            xAxisIndex: 1,
            yAxisIndex: 2,
            areaStyle: {
                normal: {
                    opacity: 0.3
                }
            },
            data: [6.1, 6.4, 6.2, 5.8, 5.6,
                5.4, 5.8, 5.2, 5, 4.5, 4.8, 4.6, 4, 4.2, 4.3]
        },
        {
            name: '微博评价',
            type: 'bar',
            xAxisIndex: 1,
            yAxisIndex: 2,
            data: [5, 6, 7, 6.3, 5.8,
                4.8, 5.2, 5, 4.3, 4.6, 3.9, 3.3, 2.8, 2.4, 2.6]
        },
        {
            name: '社区评价',
            type: 'bar',
            xAxisIndex: 1,
            yAxisIndex: 2,
            data: [6, 6.3, 7, 7, 6.1,
                6.4, 5.8, 5.2, 5, 4.6, 4, 4.1, 4.8, 4.3, 4.7]
        },
        {
            name: '媒体评价',
            type: 'bar',
            xAxisIndex: 1,
            yAxisIndex: 2,
            data: [7, 7, 7.2, 6.8, 6.4,
                6.4, 6, 5.5, 5, 5.6, 6, 6.6, 6.3, 5.8, 5.4]
        },

    ]
};

const option2 ={

};

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

export default class BoxOfficeIndex extends React.Component {


    render() {
        return (
            <div style={{marginTop:-30}}>
                <div style={{width:'100%',height:600}}>
                    <Toolbar>
                        <ToolbarGroup>
                            <ToolbarTitle text="认知度分析"/>
                        </ToolbarGroup>
                    </Toolbar>
                    <ECharts option={option1}/>
                </div>

                <div style={{width:'100%',height:450,marginTop:50}}>
                    <Toolbar>
                        <ToolbarGroup>
                            <ToolbarTitle text="口碑评价分析"/>
                        </ToolbarGroup>
                    </Toolbar>


                    <div style={{ margin:'0 10px', textAlign:'center' }}>
                        <Paper zDepth={0}
                               style={{height: 35,width: 90,backgroundColor:'039BE5',
                                   color:'#FAFAFA',lineHeight:2.5,marginBottom:30}}
                            >
                            <h4>正面评价</h4>
                        </Paper>

                        <div style={{width:'60%',marginLeft:'20%'}}>
                            <TagCloud minSize={12}
                                      maxSize={35}
                                      tags={data}
                                      renderer={renderer}/>
                        </div>
                    </div>
                    <div style={{ margin:'0 10px',textAlign:'center'}}>
                        <Paper zDepth={0}
                               style={{height: 35,width: 90,backgroundColor:'EC407A',
                                   color:'#FAFAFA',lineHeight:2.5,marginBottom:30}}
                            >
                            <h4>负面评价</h4>
                        </Paper>

                        <div style={{width:'60%',marginLeft:'20%'}}>
                            <TagCloud minSize={12}
                                      maxSize={35}
                                      tags={data}
                                      renderer={renderer}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
