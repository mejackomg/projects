import { connect } from 'react-redux';
import React, {Component, PropTypes} from 'react';
import Subheader from 'material-ui/Subheader';
import NVD3Chart from 'react-nvd3'
import Paper from 'material-ui/Paper';
import {stream_layers} from '../../../utils/stream_layers.js'

class Chart extends Component {

    testData(){
        return stream_layers(3,64,.1).map(function(data, i) {
            let key;
            switch (i)
            {
                case 0:
                    key="美洲";
                    break;
                case 1:
                    key="欧洲";
                    break;
                case 2:
                    key="亚洲";
                    break;
            };
            return {
                key: key,
                area: i === 1,
                values: data
            };
        });
    }

    render() {
        const {data,dragStarted} = this.props;

        return (
            <Paper style={{height:280,width:430,position:'absolute',left:600,top:210}}>
                <Subheader style={{position:'absolute',top:-5,left:30,width:100}}>全球票房趋势</Subheader>
                {dragStarted &&
                <NVD3Chart
                    type='lineChart'//'lineWithFocusChart'
                    datum={this.testData()}
                    //brushExtent={[50,70]}
                    xAxis={{
                        tickFormat:d3.format(',f')
                        }}
                    x2Axis={{
                        tickFormat:d3.format(',f')
                        }}
                    yAxis={{
                        tickFormat:d3.format(',.2f')
                        }}
                    y2Axis={{
                        tickFormat:d3.format(',.2f')
                        }}
                    useInteractiveGuideline={false}
                    margin={{left:44,bottom:21}}
                    //duration={5}
                    tooltip={{enabled:false}}
                    />
                }
                {!dragStarted &&
                <NVD3Chart
                    type='lineChart'//'lineWithFocusChart'
                    datum={this.testData()}
                    //brushExtent={[50,70]}
                    xAxis={{
                        tickFormat:d3.format(',f')
                        }}
                    x2Axis={{
                        tickFormat:d3.format(',f')
                        }}
                    yAxis={{
                        tickFormat:d3.format(',.2f')
                        }}
                    y2Axis={{
                        tickFormat:d3.format(',.2f')
                        }}
                    useInteractiveGuideline={true}
                    margin={{left:44,bottom:21}}
                    //duration={5}
                    tooltip={{enabled:true}}
                    />
                }
            </Paper>
        );
    }
}

Chart.propTypes = {
    data: PropTypes.array,//.isRequired,
    dragStarted:PropTypes.bool.isRequired
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
