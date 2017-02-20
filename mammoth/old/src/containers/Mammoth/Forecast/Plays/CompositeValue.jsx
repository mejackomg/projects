
import React from 'react';

import {Link} from 'react-router';
import Paper from 'material-ui/Paper'
import Star from 'material-ui/svg-icons/toggle/star';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import StarHalf from 'material-ui/svg-icons/toggle/star-half';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import ECharts from 'react-echarts';
import Divider from 'material-ui/Divider';

import {
    colors,
    spacing,
    typography
} from 'material-ui/styles';

const styles = {

};
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
        height:'80%',
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
        data: ['票房号召力','商业代言','荧屏活跃度','热度指数','受众指数'],
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
            data: [6.1, 4, 6.5, 8, 6],
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

export default class CompositeValue extends React.Component
{
    render( ) {
        return (
            <div>
                <div style={{marginTop:0,width:180,height:150}}>
                    <Toolbar style={{height:35}}>
                        <ToolbarGroup
                            //firstChild={true}
                            >
                            <ToolbarTitle text="匹配度" style={{marginTop:-10,marginLeft:-15,fontSize:14,color:'F9A825'}}/>
                            <Star color='F9A825' style={{marginLeft:-10,marginTop:5}}/>
                            <Star color='F9A825' style={{marginTop:5}}/>
                            <Star color='F9A825' style={{marginTop:5}}/>
                            <StarHalf color='F9A825' style={{marginTop:5}}/>
                            <StarBorder color='F9A825' style={{marginTop:5}}/>
                        </ToolbarGroup>
                    </Toolbar>
                    <ECharts option={option}/>
                </div>
            </div>
        );
    }
}
