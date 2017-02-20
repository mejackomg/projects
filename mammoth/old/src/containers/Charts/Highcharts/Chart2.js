/**
 * Created by spattana on 4/6/16.
 */

import React from 'react';
import Chart from './Highcharts.react.js';
import Highcharts from 'highcharts';
import {constructChartConfigs} from './chart_utility';
//import {options_1} from './options_constants_1';

export default class Chart1 extends React.Component
{
    // pie_options = getDefaultConfig("PIE",options.options_pie);

    updateDynamicInfo(chart)
    {
        //console.log('chart ref');
        //console.log(chart);
        // set up the updating of the chart each second
        var series = chart.series[0];
        setInterval(function () {
            var x = (new Date()).getTime(), // current time
                y = Math.random();
            series.addPoint([x, y], true, true);
        }, 1000);
    }

    getSplineConfig()
    {
        var me = this;
        const myLineConfig = {

        };

       return constructChartConfigs("options_polar" , myLineConfig)
    }

    render()
    {
        return (
            <Chart container="options_polar" options={this.getSplineConfig()} />
        );

    }
}


