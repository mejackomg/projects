//
// import React,{PropTypes} from 'react';
//
// import {Link} from 'react-router';
// import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
// import ECharts from 'react-echarts';
// import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
// import {Tabs, Tab} from 'material-ui/Tabs';
// import IconButton from 'material-ui/IconButton';
// import ChevronRight from 'material-ui/svg-icons/navigation/chevron-right'
// import { connect } from 'react-redux';
//
// import {
//     colors,
//     spacing,
//     typography
// } from 'material-ui/styles';
// // import {loadOrderPayTable} from '../../../reducers/database.js';
//
// const data = {
//
// };
// class Chart2 extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//         };
//
//     }
//     // componentDidMount=()=>{
//     //     this.props.dispatch(loadOrderPayTable());
//     // }
//     // getData=(length)=> {//lon:74~135  lat:4~54
//     //     for(let i=0;i<=61;i++){
//     //         this.xAxisLabel.push(i);
//     //         this.xAxisData[i]=0;
//     //     }
//     //     for(let i=0;i<=36;i++){
//     //         this.yAxisLabel.push(i);
//     //         this.yAxisData[i]=0;
//     //     }
//     //
//     //     for (let i = 0; i < length; i+=2) {
//     //         let lon = 74 + Math.random() * 61;
//     //         let lat = 18 + Math.random() * 36;
//     //         let value = Math.random() * 80;
//     //
//     //         if(lon>100 && lon<119 && lat >25 && lat < 40)
//     //         {
//     //             this.heatmapData.push([lon.toFixed(2), lat.toFixed(2), value]);
//     //
//     //             let lon1 = Math.round(lon);
//     //             let lat1 = Math.round(lat);
//     //
//     //             this.xAxisData[lon1-74] += value;
//     //             this.yAxisData[lat1-18] += value;
//     //         }
//     //
//     //     }
//     // };
//
//     getData=(data)=>{
//         let xAxisLabel=[];
//         let yAxisLabel=[];
//         let xAxisData=[];
//         let yAxisData=[];
//         let heatmapData=[[],[],[]];
//         for(let i=0;i<=170;i++){
//             xAxisLabel.push(i);
//             xAxisData[i] = 0;
//         }
//         for(let i=0;i<=200;i++){
//             yAxisLabel.push(i);
//             yAxisData[i] = 0;
//         }
//         let valueList=[];
//         console.log(data);
//         data.forEach(row=> {////lon:115.70~117.40 11570+170 | lat:39.40~41.60 3940+220
//             if(!row.longitude || !row.latitude) {
//                 return;
//             }
//             let lon = parseFloat(row.longitude).toFixed(2);
//             let lat = parseFloat(row.latitude).toFixed(2);
//             let value = parseInt(row.total);
//             let xIndex = parseInt(lon*100) - 11558;
//             let yIndex = parseInt(lat*100) - 3934;
//
//             // let xIndex = parseInt(Math.floor(deltaX) * 60 + (deltaX - Math.floor(deltaX)) * 100);
//             // let yIndex = parseInt(Math.floor(deltaY) * 60 + (deltaY - Math.floor(deltaY)) * 100);
//
//             if(xIndex<=170 && xIndex>=0 && yIndex<=200 && yIndex>=0 && lat<40.6){
//                 xAxisData[xIndex] += value;
//                 yAxisData[yIndex] += value;
//                 if(value<100)
//                     heatmapData[0].push([lon, lat, value])
//                 else if(value>=100 && value<200)
//                     heatmapData[1].push([lon, lat, value])
//                 else if(value>=200 )
//                     heatmapData[2].push([lon, lat, value])
//
//                 valueList.push(value)
//             }
//         });
//         console.log(valueList.sort((a,b)=>{return b-a}))
//         console.log(heatmapData[0])
//         console.log(heatmapData[1])
//         console.log(heatmapData[2])
//
//         return {
//             xAxisLabel:xAxisLabel,yAxisLabel:yAxisLabel,
//             xAxisData:xAxisData,yAxisData:yAxisData,
//             heatmapData:heatmapData
//         }
//     }
//
//     getOption(data) {
//         console.log(data);
//         const {xAxisLabel,yAxisLabel,xAxisData,yAxisData,heatmapData}=this.getData(data)
//         let option = null;
//         // if (xAxisData.length > 0)
//         {
//             option = {
//                 // backgroundColor: '#404a59',
//                 // visualMap: {
//                 //     // min: 0,
//                 //     // max: 100,
//                 //     // splitNumber: 5,
//                 //      show: false,
//                 //     inRange: {
//                 //         color: ['#d94e5d', '#eac736', '#50a3ba'].reverse()
//                 //     },
//                 //     textStyle: {
//                 //         color: '#111'
//                 //     }
//                 // },
//                 // tooltip: {
//                 //     trigger: 'item'
//                 // },
//                 toolbox: {
//                     // y: 'bottom',
//                     feature: {
//                         saveAsImage: {
//                             pixelRatio: 2
//                         }
//                     }
//                 },
//                 geo: {
//                     map: '北京',
//                     label: {
//                         emphasis: {
//                             show: false
//                         }
//                     },
//                     // roam: true,
//                     itemStyle: {
//                         normal: {
//                             // areaColor: 'rgba(200,200,200,0.1)',
//                             // borderColor: 'rgba(0,0,0,0.1)'
//                             areaColor: '#323c48',
//                             borderColor: '#111'
//                         },
//                         // emphasis: {
//                         //     areaColor: 'rgba(200,200,200,0.2)'
//                         // }
//                     }
//                 },
//                 grid: [{
//                     left: 70,
//                     right: 70,
//                     height: 48,
//                     top: 6
//                 }, {
//                     right: 16,
//                     top: 58,
//                     width: 48
//                     //height: '35%'
//                 }],
//                 xAxis: [
//                     {
//                         type: 'category',
//                         boundaryGap: false,
//                         axisTick: {show: false},
//                         axisLabel: {show: false},
//                         axisLine: {show: false},
//                         data: xAxisLabel
//                     },
//                     {
//                         gridIndex: 1,
//                         type: 'value',
//                         //axisLine: {show: false},
//                         // splitLine: {show: false},
//                         // axisLabel: {show: false},
//                         splitNumber:3,
//                         minInterval:50000,
//                         axisLabel: {rotate: -90},
//                         axisTick: {show: false},
//                         // position: 'left'
//                     }
//                 ],
//                 yAxis: [
//                     {
//                         type: 'value',
//                         axisTick: {show: false},
//                         // splitLine:{show: false}
//                         // axisLabel: {show: false},
//                         splitNumber:3,
//                         minInterval:50000
//                         // axisLine: {show: false}
//                     },
//                     {
//                         gridIndex: 1,
//                         type: 'category',
//                         axisTick: {show: false},
//                         axisLabel: {show: false},
//                         splitLine: {show: false},
//                         axisLine: {show: false},
//                         // inverse: true,
//                         boundaryGap: false,
//                         data: yAxisLabel
//
//                     }
//                 ],
//                 // legend: {
//                 //     left: 'left',
//                 //     data: ['强', '中', '弱'],
//                 //     textStyle: {
//                 //         color: '#ccc'
//                 //     }
//                 // },
//                 series: [
//                     // {
//                     //     name: 'AQI',
//                     //     type: 'heatmap',
//                     //     coordinateSystem: 'geo',
//                     //     data: heatmapData
//                     // },
//                     {
//                         name: 'lon',
//                         type: 'line',
//                         showSymbol: false,
//                         // smooth:true,
//                         data: Object.keys(xAxisData).map(key=>xAxisData[key])
//                     },
//                     {
//                         name: 'lat',
//                         type: 'line',
//                         xAxisIndex: 1,
//                         yAxisIndex: 1,
//                         showSymbol: false,
//                         // smooth:true,
//                         data: Object.keys(yAxisData).map(key=>yAxisData[key])
//                     },
//                     {
//                         name: '经济活动区域',
//                         type: 'effectScatter',
//                         coordinateSystem: 'geo',
//                         data: heatmapData,
//                         symbolSize: function (val) {
//                             return val[2];// / 5;
//                         },
//                         showEffectOn: 'render',
//                         rippleEffect: {
//                             brushType: 'stroke'
//                         },
//                         hoverAnimation: true,
//                         // label: {
//                         //     normal: {
//                         //         color: '#323c48',
//                         //         formatter: '{a}',
//                         //         position: 'right',
//                         //         show: true
//                         //     }
//                         // },
//                         // itemStyle: {
//                         //     normal: {
//                         //         color: '#323c48',
//                         //         shadowBlur: 10,
//                         //         shadowColor: '#111'
//                         //     }
//                         // },
//                         zlevel: 1
//                     },
//                     {
//                         name: '弱',
//                         type: 'scatter',
//                         coordinateSystem: 'geo',
//                         symbolSize: 10,
//                         large: true,
//                         itemStyle: {
//                             normal: {
//                                 shadowBlur: 25,
//                                 shadowColor: 'rgba(37, 140, 249, 0.3)',
//                                 color: 'rgba(37, 140, 249, 0.6)'
//                             }
//                         },
//                         data: heatmapData[0]
//                     }, {
//                         name: '中',
//                         type: 'scatter',
//                         coordinateSystem: 'geo',
//                         symbolSize: 5,
//                         large: true,
//                         itemStyle: {
//                             normal: {
//                                 shadowBlur: 10,
//                                 shadowColor: 'rgba(14, 241, 242, 0.4)',
//                                 color: 'rgba(14, 241, 242, 0.6)'
//                             }
//                         },
//                         data: heatmapData[1]
//                     }, {
//                         name: '强',
//                         type: 'scatter',
//                         coordinateSystem: 'geo',
//                         symbolSize: 2,
//                         large: true,
//                         itemStyle: {
//                             normal: {
//                                 shadowBlur: 5,
//                                 shadowColor: 'rgba(255, 255, 255, 0.8)',
//                                 color: 'rgba(255, 255, 255, 0.5)'
//                             }
//                         },
//                         data: heatmapData[2]
//                     }
//                 ]
//             };
//         }
//
//         return option;
//     }
//
//     render() {
//
//         const {saleLonLatData} = this.props;
//         console.log(saleLonLatData);
//         const option = this.getOption(saleLonLatData);
//
//         return (
//             <div>
//                 <div style={{marginTop:0,width: '100%', display: 'flex', justifyContent: 'center'}}>
//                     {
//                         option &&
//                         <ECharts option={option} style={{height: 600,width:600}}/>
//                     }
//                 </div>
//             </div>
//         );
//     }
// }
// Chart2.propTypes = {
//     dispatch:PropTypes.func.isRequired,
// };
//
// const mapStateToProps = (state) => {
//     const { databaseReducer } = state;
//
//     return {
//         saleLonLatData:databaseReducer.shopData.saleLonLatData,
//     };
// };
// export default connect(
//     mapStateToProps
// )( Chart2);

import React,{PropTypes} from 'react';
import ECharts from '../../../components/ECharts.js';
import {Link} from 'react-router';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
//import ECharts from 'react-echarts';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import {Tabs, Tab} from 'material-ui/Tabs';
import IconButton from 'material-ui/IconButton';
import ChevronRight from 'material-ui/svg-icons/navigation/chevron-right'
import { connect } from 'react-redux';

import {
    colors,
    spacing,
    typography
} from 'material-ui/styles';
// import {loadOrderPayTable} from '../../../reducers/database.js';

const data = {

};
class Chart2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };

    }
    getData=(data)=>{
        let xAxisLabel=[];
        let yAxisLabel=[];
        let xAxisData=[];
        let yAxisData=[];
        let heatmapData=[[],[],[]];
        for(let i=0;i<=170;i++){
            xAxisLabel.push(i);
            xAxisData[i] = 0;
        }
        for(let i=0;i<=200;i++){
            yAxisLabel.push(i);
            yAxisData[i] = 0;
        }
        let valueList=[];
        // console.log(data);
        data.forEach(row=> {////lon:115.70~117.40 11570+170 | lat:39.40~41.60 3940+220
            if(!row.longitude || !row.latitude) {
                return;
            }
            // console.log(row);
            let lon = parseFloat(row.longitude).toFixed(2);
            let lat = parseFloat(row.latitude).toFixed(2);
            let value = parseInt(row.total);
            //北京使用
            // let xIndex = parseInt(lon*100) - 11558;
            // let yIndex = parseInt(lat*100) - 3934;

            let xIndex = parseInt(lon*100) - 8888;
            let yIndex = parseInt(lat*100) - 2926;

            // let xIndex = parseInt(Math.floor(deltaX) * 60 + (deltaX - Math.floor(deltaX)) * 100);
            // let yIndex = parseInt(Math.floor(deltaY) * 60 + (deltaY - Math.floor(deltaY)) * 100);

            // if(xIndex<=170 && xIndex>=0 && yIndex<=200 && yIndex>=0 && lat<40.6){
            xAxisData[xIndex] += value;
            yAxisData[yIndex] += value;
            if(value<100)
                heatmapData[0].push([lon, lat, value])
            else if(value>=100 && value<200)
                heatmapData[1].push([lon, lat, value])
            else if(value>=200 )
                heatmapData[2].push([lon, lat, value])

            valueList.push(value)
            // }
        });
        // console.log(valueList.sort((a,b)=>{return b-a}))
        // console.log(heatmapData[0])
        // console.log(heatmapData[1])
        // console.log(heatmapData[2])

        return {
            xAxisLabel:xAxisLabel,yAxisLabel:yAxisLabel,
            xAxisData:xAxisData,yAxisData:yAxisData,
            heatmapData:heatmapData
        }
    }

    getOption(data) {
        // console.log(data);
        const {xAxisLabel,yAxisLabel,xAxisData,yAxisData,heatmapData}=this.getData(data)
        let option = null;
        // if (xAxisData.length > 0)
        // {
            option = {
                // backgroundColor: '#404a59',
                // visualMap: {
                //     // min: 0,
                //     // max: 100,
                //     // splitNumber: 5,
                //      show: false,
                //     inRange: {
                //         color: ['#d94e5d', '#eac736', '#50a3ba'].reverse()
                //     },
                //     textStyle: {
                //         color: '#111'
                //     }
                // },
                // tooltip: {
                //     trigger: 'item'
                // },
                toolbox: {
                    // y: 'bottom',
                    feature: {
                        saveAsImage: {
                            pixelRatio: 2
                        }
                    }
                },
                geo: {
                    map: 'china',
                    label: {
                        emphasis: {
                            show: false
                        }
                    },
                    // roam: true,
                    itemStyle: {
                        normal: {
                            // areaColor: 'rgba(200,200,200,0.1)',
                            // borderColor: 'rgba(0,0,0,0.1)'
                            areaColor: '#323c48',
                            borderColor: '#111'
                        },
                        // emphasis: {
                        //     areaColor: 'rgba(200,200,200,0.2)'
                        // }
                    }
                },
                // grid: [{
                //     left: 70,
                //     right: 70,
                //     height: 48,
                //     top: 6
                // }, {
                //     right: 16,
                //     top: 58,
                //     width: 48
                //     //height: '35%'
                // }],
                // xAxis: [
                //     {
                //         type: 'category',
                //         boundaryGap: false,
                //         axisTick: {show: false},
                //         axisLabel: {show: false},
                //         axisLine: {show: false},
                //         data: xAxisLabel
                //     },
                //     {
                //         gridIndex: 1,
                //         type: 'value',
                //         //axisLine: {show: false},
                //         // splitLine: {show: false},
                //         // axisLabel: {show: false},
                //         splitNumber:3,
                //         minInterval:50000,
                //         axisLabel: {rotate: -90},
                //         axisTick: {show: false},
                //         // position: 'left'
                //     }
                // ],
                // yAxis: [
                //     {
                //         type: 'value',
                //         axisTick: {show: false},
                //         // splitLine:{show: false}
                //         // axisLabel: {show: false},
                //         splitNumber:3,
                //         minInterval:50000
                //         // axisLine: {show: false}
                //     },
                //     {
                //         gridIndex: 1,
                //         type: 'category',
                //         axisTick: {show: false},
                //         axisLabel: {show: false},
                //         splitLine: {show: false},
                //         axisLine: {show: false},
                //         // inverse: true,
                //         boundaryGap: false,
                //         data: yAxisLabel
                //
                //     }
                // ],
                // legend: {
                //     left: 'left',
                //     data: ['强', '中', '弱'],
                //     textStyle: {
                //         color: '#ccc'
                //     }
                // },
                series: [
                    // {
                    //     name: 'AQI',
                    //     type: 'heatmap',
                    //     coordinateSystem: 'geo',
                    //     data: heatmapData
                    // },
                    // {
                    //     name: 'lon',
                    //     type: 'line',
                    //     showSymbol: false,
                    //     // smooth:true,
                    //     data: Object.keys(xAxisData).map(key=>xAxisData[key])
                    // },
                    // {
                    //     name: 'lat',
                    //     type: 'line',
                    //     xAxisIndex: 1,
                    //     yAxisIndex: 1,
                    //     showSymbol: false,
                    //     // smooth:true,
                    //     data: Object.keys(yAxisData).map(key=>yAxisData[key])
                    // },
                    {
                        name: '经济活动区域',
                        type: 'effectScatter',
                        coordinateSystem: 'geo',
                        data: heatmapData,
                        symbolSize: function (val) {
                            return val[2];// / 5;
                        },
                        showEffectOn: 'render',
                        rippleEffect: {
                            brushType: 'stroke'
                        },
                        hoverAnimation: true,
                        // label: {
                        //     normal: {
                        //         color: '#323c48',
                        //         formatter: '{a}',
                        //         position: 'right',
                        //         show: true
                        //     }
                        // },
                        // itemStyle: {
                        //     normal: {
                        //         color: '#323c48',
                        //         shadowBlur: 10,
                        //         shadowColor: '#111'
                        //     }
                        // },
                        zlevel: 1
                    },
                    {
                        name: '弱',
                        type: 'scatter',
                        coordinateSystem: 'geo',
                        symbolSize: 10,
                        large: true,
                        itemStyle: {
                            normal: {
                                shadowBlur: 25,
                                shadowColor: 'rgba(37, 140, 249, 0.3)',
                                color: 'rgba(37, 140, 249, 0.6)'
                            }
                        },
                        data: heatmapData[0]
                    }, {
                        name: '中',
                        type: 'scatter',
                        coordinateSystem: 'geo',
                        symbolSize: 5,
                        large: true,
                        itemStyle: {
                            normal: {
                                shadowBlur: 10,
                                shadowColor: 'rgba(14, 241, 242, 0.4)',
                                color: 'rgba(14, 241, 242, 0.6)'
                            }
                        },
                        data: heatmapData[1]
                    }, {
                        name: '强',
                        type: 'scatter',
                        coordinateSystem: 'geo',
                        symbolSize: 2,
                        large: true,
                        itemStyle: {
                            normal: {
                                shadowBlur: 5,
                                shadowColor: 'rgba(255, 255, 255, 0.8)',
                                color: 'rgba(255, 255, 255, 0.5)'
                            }
                        },
                        data: heatmapData[2]
                    }
                ]
            };
        // }

        return option;
    }

    render() {

        const {saleLonLatData,style} = this.props;
        // console.log(saleLonLatData);
        const option = this.getOption(saleLonLatData);

        return (
            <div>
                <div style={{marginTop:0,width: '100%', display: 'flex', justifyContent: 'center'}}>
                    {
                        option &&
                        <ECharts option={option} style={style}/>
                    }
                </div>
            </div>
        );
    }
}
Chart2.propTypes = {
    dispatch:PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
    const { databaseReducer } = state;

    return {
        saleLonLatData:databaseReducer.shopData.saleLonLatData,
    };
};
export default connect(
    mapStateToProps
)( Chart2);