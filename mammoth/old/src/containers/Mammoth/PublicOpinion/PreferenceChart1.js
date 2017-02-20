/**
 * Created by spattana on 4/6/16.
 */

import React from 'react';
import Chart from '../../Charts/Highcharts/Highcharts.react.js';
//import HighchartsModule from 'highcharts/modules/';

const myConfig = {
    chart: {
        type: 'column',
        //options3d: {
        //    enabled: true,
        //    alpha: 15,
        //    beta: 15,
        //    viewDistance: 25,
        //    depth: 40
        //},
        margin: [50, 100, 100, 50],

    },

    title: {
        text: ''
    },

    xAxis: {
        categories: ['爱情', '动作', '剧情', '喜剧', '奇幻', '综艺']
    },

    yAxis: {
        allowDecimals: false,
        min: 0,
        title: {
            text: ''
        }
    },

    tooltip: {
        headerFormat: '<b>{point.key}</b><br>',
        pointFormat: '<span style="color:{series.color}">\u25CF</span> {series.name}: {point.y}%'
    },

    plotOptions: {
        column: {
            stacking: 'normal',
            depth: 40
        }
    },

    series: [
        {
            name: '2014',
            data: [7, 3, 45, 35, 7, 3],
            stack: '1'
        },
        {
            name: '2015',
            data: [20, 16, 26, 30, 44,22],
            stack: '3'
        },
        {
            name: '2016',
            data: [7, 3, 7, 25, 53, 5],
            stack: '2'
        }
    ]
};


export default class Chart1 extends React.Component
{

    render()
    {
        var modules=[];
        //modules.push(HighchartsModule);
        return (
            <Chart container="column_2" modules={modules} options={myConfig} />
        );
    }
}


