import React,{PropTypes} from 'react';

// import ECharts from 'react-echarts';
import ECharts from '../../../components/ECharts.js'
import { connect } from 'react-redux';
import {loadShopTelephone} from '../../../reducers/database.js';
class ChartBubble extends React.Component {
    componentDidMount () {
        const { dispatch, shopsId} = this.props;
        dispatch(loadShopTelephone(shopsId));
    }
    getStyle =()=>{
        const itemStyle= {
            normal: {},
            emphasis: {
                barBorderWidth: 1,
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                shadowColor: 'rgba(0,0,0,0.5)'
            }
        }
        return itemStyle;
    }
    getOption(chartData){
        const {itemStyle} = this.getStyle();
        let arr=[],dataX =[];
        let distanceObj = {};
        let dateObj =[];
        let option = null;
        if(chartData.data){
            let data = chartData.data;
            for(let i=0;i<data.length;i++){
                if(!distanceObj[data[i].date]){
                    distanceObj[data[i].date] = [];
                    distanceObj[data[i].date].push(data[i]);
                    dataX.push([data[i].date]);
                }else{
                    if( distanceObj[data[i].date].length<5){
                        distanceObj[data[i].date].push(data[i]);
                    }
                }

            }
            for(var key in distanceObj) {
                distanceObj[key].sort(function (a, b) {
                    return a.distance - b.distance;
                });
            }

            if(data.length>0){
                option = {
                    // backgroundColor: '#eee',
                    title: {
                        text: '消费者电话归属'
                    },
                    legend: {
                        data: [],
                        align: 'left',
                        left: 100
                    },
                    toolbox: {
                        feature: {
                            // dataView: {readOnly: true},
                            magicType: {type: ['line', 'bar']},
                            restore: {},
                            saveAsImage: {}
                        }
                    },
                    xAxis: {
                        data: dataX,
                        // name: 'X Axis',
                        silent: false,
                        axisLine: {onZero: true},
                        splitLine: {show: false},
                        splitArea: {show: false}
                    },
                    yAxis: {
                        inverse: false,
                        splitArea: {show: false}
                    },
                    grid: {
                        left: 100
                    },
                    series:
                        [0,1,2,3,4].map(index=>{
                            return {
                                name: index,
                                type: 'bar',
                                stack: 'bar',
                                label: {
                                    emphasis: {
                                        show: true,
                                        formatter:function(params){
                                            return params.data.date+'\n'+params.data.home_province+':'+params.data.value;
                                        },
                                        position: 'center',
                                        shadowColor: 'rgba(0,0,0,0.5)',
                                        barBorderWidth: 1,
                                        shadowBlur: 10,
                                        shadowOffsetX: 0,
                                        shadowOffsetY: 0,
                                        textStyle:{
                                            // color:'#FFCDD2',
                                            color:'#000',
                                            fontSize: 13
                                        }
                                    }
                                },
                                data: Object.keys(distanceObj).map(date=>distanceObj[date][index])
                            }
                        })
                };
            }
        }

        return option;
    }
    render() {

        const {ShopTelephoneDate,style} = this.props;
        const option = this.getOption(ShopTelephoneDate);
        // console.log('ShopTelephoneDate',ShopTelephoneDate)
        return (
            <div>
                {
                    ShopTelephoneDate.data ?
                    <ECharts option={option} style={style}/>:
                        <div style={{textAlign:'center',fontSize: '24px', color: 'gray',height:'410px',marginTop:'40px'}}>
                            暂无数据!
                        </div>
                }

            </div>
        );
    }
}
ChartBubble.propTypes = {
    dispatch:PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
    const { databaseReducer } = state;

    return {
        ShopTelephoneDate:databaseReducer.ShopTelephoneDate,
    };
};
export default connect(
    mapStateToProps
)( ChartBubble);



