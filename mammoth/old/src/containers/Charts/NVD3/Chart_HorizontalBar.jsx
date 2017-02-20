import { connect } from 'react-redux';
import React, {Component, PropTypes} from 'react';
import Subheader from 'material-ui/Subheader';
import NVD3Chart from 'react-nvd3'
import Divider from 'material-ui/Divider';

const long_short_data = [
    {
        key: '受攻击数',
        values: [
            {
                "label" : "太原分部" ,
                "value" : -11.8746444827653
            } ,
            {
                "label" : "大连分部" ,
                "value" : -8.0961543492239
            } ,
            {
                "label" : "南宁分部" ,
                "value" : -10.57072943117674
            } ,
            {
                "label" : "长春分部" ,
                "value" : -2.4174010336624
            } ,
            {
                "label" : "天津分部" ,
                "value" : -0.72009071426284
            }
        ]
    },
    {
        key: '攻击数',
        values: [
            {
                "label" : "太原分部" ,
                "value" : 10.307646510375
            } ,
            {
                "label" : "大连分部" ,
                "value" : 13.756779544553
            } ,
            {
                "label" : "南宁分部" ,
                "value" : 8.451534877007
            } ,
            {
                "label" : "长春分部" ,
                "value" : 2.6142352811805
            } ,
            {
                "label" : "天津分部" ,
                "value" : 7.8082472075876
            }
        ]
    }
];

class Chart extends Component {

    render() {
        const {data} = this.props;

        return (
            <div style={{height:this.props.height,marginTop:-5}}>
                {/*                <Subheader style={{
                        textAlign:'center',
                        background:'linear-gradient(to bottom, rgba(100,100,100,0.4) 0%,rgba(100,100,100,0.2) 70%,rgba(100,100,100,0) 100%)'
                    }}>
                    攻击源/目标排名&nbsp;&nbsp;
                </Subheader>*/}
                <Divider style={{width:'100%',backgroundColor:'rgba(12,12,12,.5)'}} />
                <NVD3Chart
                    type='multiBarHorizontalChart'
                    datum={long_short_data}
                    x="label"
                    y="value"
                    xAxis={{
                    //tickFormat:d3.format(',f'),
                    //axisLabel="X Axis"
                    }}
                    yAxis={{
                    tickFormat:d3.format(',f')
                    }}
                    //showYAxis={false}
                    showControls={false}
                    groupSpacing={0.2}
                    barColor={d3.scale.category20().range()}
                    //stacked={true}
                    margin={{left:55,bottom:18}}
                    duration={250}
                    //tooltip={{enabled:false}}
                    //height={this.props.height}
                    />
            </div>
        );
    }
}

Chart.propTypes = {
    data: PropTypes.array,//.isRequired,
    height:PropTypes.number,
};

const mapStateToProps=(state)=> {
    const { dataReducer } = state;
  return {
    data: dataReducer.data,
  };
}

export default connect(
    mapStateToProps
)(Chart);
