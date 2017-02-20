/**
 * Created by spattana on 4/6/16. This is the core component to create different charts
 */

import React from 'react';
//import HighchartsMore from 'highcharts-more';
import Highcharts from 'highcharts';
//import SolidGaugeModule from 'highcharts-solid-gauge';
import HightCharts3D from 'highcharts-3d';

class HighchartsReact extends React.Component
{

    // When the DOM is ready, create the chart.
    componentDidMount() {
        // Extend Highcharts with modules. Most probably we wont be using these modules

        if (this.props.modules) {
            this.props.modules.forEach(function (module) {
                module(Highcharts);
            });
        }
        // Set container which the chart should render to.

        //HighchartsMore(Highcharts);
        //SolidGaugeModule(Highcharts)
        HightCharts3D(Highcharts);
        this.chart = new Highcharts[this.props.type || "Chart"](
            this.props.container,
            this.props.options
        );
    }
    //Destroy chart before unmount.
    componentWillUnmount () {
        this.chart.destroy();
    }
    //Create the div which the chart will be rendered to.
    render () {

        return (
            <div id={ this.props.container}>
            </div>
        )

    }
}
export default HighchartsReact;
