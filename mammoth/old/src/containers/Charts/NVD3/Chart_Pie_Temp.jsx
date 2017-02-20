import { connect } from 'react-redux';
import React, {Component, PropTypes} from 'react';
import Subheader from 'material-ui/Subheader';
import NVD3Chart from 'react-nvd3';
import Paper from 'material-ui/Paper';


const testdata1 = [
    { key: "Updated", y: 0 },
    { key: "Pending", y: 100 }
];
const arcRadius1 = [
    { inner: 0.6, outer: 1 },
    { inner: 0.65, outer: 0.95 }
];
const colors = ["lightgreen", "darkred"];

class Chart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chartTitle:"0%",
            titleColor:"240,0,0"
        };

    }

    componentDidMount=()=>{
        setInterval(function () {
            if (testdata1[0].y < 100) {
                testdata1[0].y = testdata1[0].y + 1;
                testdata1[1].y = testdata1[1].y - 1;
            }
            else {
                testdata1[0].y = 0;
                testdata1[1].y = 100;
            }

            this.setState({titleColor:(240 - testdata1[0].y*2)+",0,0"});

            this.setState({chartTitle:testdata1[0].y + "%"});
        }.bind(this), 100);
    }

    pad=(num, n)=> {
        var len = num.toString().length;

        while(len < n) {
            num = "_" + num;
            len++;
        }
        return num;
    }

    render() {
        const {data} = this.props;

        return (
            <div style={{height:230,position:'absolute',left:700,top:110}}>
                <div style={{marginTop:-3}}>
                    <div style={{float:'left'}}>
                        <NVD3Chart
                            type='pieChart'
                            datum={testdata1}
                            x="key"
                            y="y"
                            color={colors}
                            donut={true}
                            showLabels={false}
                            //margin={{left:48,bottom:21}}
                            growOnHover={false}
                            arcsRadius={arcRadius1}
                            id='donut1' // allow custom CSS for this one svg
                            title={this.state.chartTitle}
                            showLegend={false}
                            margin={{top:0,left:0,right:0,bottom:0}}
                            height={180}
                            width={180}
                            tooltip={{enabled:false}}
                            //startAngle={(d)=>{ return d.startAngle/2 -Math.PI/2 }}
                            //endAngle={(d)=>{ return d.endAngle/2 -Math.PI/2 }}
                        />
                    </div>
                    <div style={{float:'left',marginLeft:20}}>
                        <NVD3Chart
                            type='pieChart'
                            datum={testdata1}
                            x="key"
                            y="y"
                            color={colors}
                            donut={true}
                            showLabels={false}
                            //margin={{left:48,bottom:21}}
                            growOnHover={false}
                            arcsRadius={arcRadius1}
                            id='donut1' // allow custom CSS for this one svg
                            title={this.state.chartTitle}
                            showLegend={false}
                            margin={{top:0,left:0,right:0,bottom:0}}
                            height={180}
                            width={180}
                            tooltip={{enabled:false}}
                            //startAngle={(d)=>{ return d.startAngle/2 -Math.PI/2 }}
                            //endAngle={(d)=>{ return d.endAngle/2 -Math.PI/2 }}
                            />
                    </div>
                    <div style={{textAlign: 'center',float:'left',marginLeft:30,marginTop:4,lineHeight:0.1}}>
                        <Paper style={{height: 41,width: 100,backgroundColor:'rgba(205,105,100,0.2)',color:'#2196F3'}} >
                            <p style={{paddingTop:10,fontSize:6.2,color:'#64B5F6'}}>评分</p>
                            <h3>113</h3>
                        </Paper>
                        <Paper style={{height: 41,width: 100,backgroundColor:'rgba(255,255,0,0.2)',color:'#2196F3'}} >
                            <p style={{paddingTop:10,fontSize:12,color:'#64B5F6'}}>票房</p>
                            <h3>$3000万</h3>
                        </Paper>
                        <Paper style={{height: 41,width: 100,backgroundColor:'rgba(105,155,200,0.2)',color:'#FF1744'}} >
                            <p style={{paddingTop:10,fontSize:12,color:'#64B5F6'}}>观影人次</p>
                            <h3>1082313</h3>
                        </Paper>
                    </div>
                </div>
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
