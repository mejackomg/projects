import { connect } from 'react-redux';
import React, {Component, PropTypes} from 'react';
import Subheader from 'material-ui/Subheader';
import NVD3Chart from 'react-nvd3'


class Chart extends Component {


    render() {
        const {data} = this.props;
        let datum = [{
            key: "Cumulative Return",
            values: [
                {
                    "label" : "A" ,
                    "value" : 29.765957771107
                } ,
                {
                    "label" : "B" ,
                    "value" : 0
                } ,
                {
                    "label" : "C" ,
                    "value" : 32.807804682612
                } ,
                {
                    "label" : "D" ,
                    "value" : 196.45946739256
                } ,
                {
                    "label" : "E" ,
                    "value" : 0.19434030906893
                } ,
                {
                    "label" : "F" ,
                    "value" : 98.079782601442
                } ,
                {
                    "label" : "G" ,
                    "value" : 13.925743130903
                } ,
                {
                    "label" : "H" ,
                    "value" : 5.1387322875705
                }
            ]
        }
        ];

        return (
            <div>
                <Subheader style={{position:'absolute',top:-10,left:0,width:150}}>DiscreteBarChart</Subheader>
                <NVD3Chart
                    type='discreteBarChart'
                    datum={datum}
                    x="label"
                    y="value"
                    margin={{top:40,bottom:20,left:48}}
                    />
            </div>
        );
    }
}

Chart.propTypes = {
    data: PropTypes.array,//.isRequired,
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
