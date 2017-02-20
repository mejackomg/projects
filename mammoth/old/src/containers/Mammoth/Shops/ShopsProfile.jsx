import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import SwipeableViews from 'react-swipeable-views';

import ActiveTheme from '../../../mui-themes/active-theme.js';
import getMuiTheme from '../../../../node_modules/material-ui/styles/getMuiTheme';
import echarts from 'echarts';
import withWidth, {LARGE, MEDIUM,SMALL}  from '../../../utils/withWidth';
import TabMenuBar from './TabMenuBar.jsx';
import ECharts from '../../../components/ECharts.js';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import {Tabs, Tab} from 'material-ui/Tabs';
import {Card,CardHeader,CardText} from 'material-ui/Card';
import Paper from 'material-ui/Paper';
import WordCloud from '../../../components/WordCloud.jsx';
import Chart2 from '../UserAnalysis/Chart2.jsx';

import ReactGridLayout from 'react-grid-layout';
import ShopsRecord from './ShopsRecord.jsx';
import ReactEcharts from 'echarts-for-react';
import PureRenderMixin from 'react/lib/ReactComponentWithPureRenderMixin';
//import WidthProvider from 'react-grid-layout/components/WidthProvider';
import ChartBubble from './ChartBubble.jsx';
import OrderAnalysis from './OrderAnalysis.jsx';
import PayAnalysis from './PayAnalysis.jsx';
import SaleAnalysis from './SaleAnalysis.jsx';
import {loadShopData,loadSingleShopMap,loadSingleShopUser,loadShopTelephone} from '../../../reducers/database.js';
import {
    colors,
    spacing,
    typography
} from 'material-ui/styles';
const option = {
    tooltip : {
        trigger: 'item',
        formatter: "{b}:{d}%"
    },
    legend: {
        orient: 'vertical',
        left: 'left',
        data: ['']
    },
    series : [
        {
            name:'',
            type: 'pie',
            radius : ['40%', '55%'],
            label: {
                normal: {
                    position: 'center'
                }
            },
            data:[
                {
                    value:0,
                    name:'实时信用指数',
                    label: {
                        normal: {
                            formatter: '{d} %',
                            textStyle: {
                                fontSize: 23
                            }
                        }
                    }
                },
                {
                    value:1,
                    name:'占位',
                    tooltip: {
                        show: false
                    },
                    itemStyle: {
                        normal: {
                            color: '#999'
                        }
                    },
                    label: {
                        normal: {
                            formatter: '\n实时信用指数'
                        }
                    }
                }
            ]
        }
    ]
}
const option_line={
    title: {
        text: '商家历史信用值',
        // left:'10%'
    },
    tooltip: {
        trigger: 'axis'
    },
    // legend: {
    //     data:['邮件营销','联盟广告','视频广告','直接访问','搜索引擎']
    // },
    grid: {
        // left: '77px',
        right: '82px',
        bottom: '10%',
        containLabel: true
    },
    toolbox: {
        show : true,
        feature : {
            mark : {show: true},
            // dataView : {show: true, readOnly: true},
            magicType : {show: true, type: ['line', 'bar']},
            restore : {show: true},
            saveAsImage : {show: true}
        }
    },
    dataZoom: [
        {
            type: 'inside',
            start: 0,
            end: 100
        }, {
            start: 0,
            end: 10,
            handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
            handleSize: '80%',
            handleStyle: {
                color: '#fff',
                shadowBlur: 3,
                shadowColor: 'rgba(0, 0, 0, 0.6)',
                shadowOffsetX: 2,
                shadowOffsetY: 2
            }
        }],
    calculable : true,
    xAxis: {
        type: 'category',
        name: '日期',
        boundaryGap: false,
        data: []
    },
    yAxis: {
        type: 'value',
        name: '信用值'
    },
    series: [
        {
            name:'信用值',
            type:'line',
            // stack: '总量',
            smooth : true,
            data:[]
        }
    ]
};
const originalLayout = getFromLS('layout') || [];
class ShopsProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            slideIndex: 0,
            layout: JSON.parse(JSON.stringify(originalLayout)),
            tabIndex:0,
        };
    }

    componentDidMount () {
        const { dispatch, params : {shopsId}} = this.props;
        dispatch(loadShopData(shopsId));
        dispatch(loadSingleShopMap(shopsId));
        dispatch(loadSingleShopUser(shopsId));
        dispatch(loadShopTelephone(shopsId));

    }

    shouldComponentUpdate=(nextProps = {}, nextState = {}) => {
        return true;//false,页面不刷新数据
    }

    onLayoutChange = (layout) => {
        saveToLS('layout', layout);
        this.setState({layout: layout});

    };
    handleChange_Tab=(value)=>{
        if(value !== 0 || value !== 1 || value !== 2){
            return;
        }
        this.setState({tabIndex:value})
    }
    addDate(dateStr,dadd){
        var a = new Date(dateStr);
        a = a.valueOf();
        a = a + dadd * 24 * 60 * 60 * 1000;
        a = new Date(a)
        return a;
    }
    getOption_ld(){
        const {loadSingleShopUserData} = this.props;
        let option_ld = null;
        if(loadSingleShopUserData.length>0){
            let dataAxis = [];
            let yMax = 1;
            let dataShadow = [];
            let temp = [];
            for (var i = 0; i < loadSingleShopUserData.length; i++) {
                dataShadow.push(yMax);
                dataAxis.push(loadSingleShopUserData[i]['date']);
                temp.push(loadSingleShopUserData[i]['customer_avg_estimate']);
            }
            option_ld = {
                title: {
                    top:10,
                    left:'42%',
                    text: '消费者信用均值'
                },
                tooltip: {},
                // legend: {
                //     // data: ['预算分配', '实际开销'],
                //     // bottom: 0
                // },
                grid: {
                    left: '13%',
                    right: '13%',
                    top: 60,
                    //bottom: '10%',
                    //containLabel: true
                },
                // radar: {
                //     // shape: 'circle',
                //     indicator: [
                //         { name: '销售', max: 6500},
                //         { name: '管理', max: 16000},
                //         { name: '信息技术', max: 30000},
                //         { name: '客服', max: 38000},
                //         { name: '研发', max: 52000},
                //         { name: '市场', max: 25000}
                //     ],
                //     center: ['80%', '50%'],
                //     radius:'55%'
                // },
                xAxis: {
                    data: dataAxis,
                    axisLabel: {
                        //inside: true,
                        // textStyle: {
                        //     color: '#fff'
                        // }
                    },
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        show: false
                    },
                    z: 10
                },
                yAxis: {
                    axisLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        textStyle: {
                            color: '#999'
                        }
                    }
                },
                dataZoom: [
                    {
                        type: 'inside'
                    }
                ],
                series: [
                    // {
                    //     name: '预算 vs 开销（Budget vs spending）',
                    //     type: 'radar',
                    //     // areaStyle: {normal: {}},
                    //     data : [
                    //         {
                    //             value : [4300, 10000, 28000, 35000, 50000, 19000],
                    //             name : '预算分配'
                    //         },
                    //         {
                    //             value : [5000, 14000, 28000, 31000, 42000, 21000],
                    //             name : '实际开销'
                    //         }
                    //     ]
                    // },
                    { // For shadow
                        type: 'bar',
                        itemStyle: {
                            normal: {color: 'rgba(0,0,0,0.05)'}
                        },
                        barGap:'-100%',
                        barCategoryGap:'40%',
                        data: dataShadow
                    },
                    {
                        type: 'bar',
                        itemStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(
                                    0, 0, 0, 1,
                                    [
                                        {offset: 0, color: '#83bff6'},
                                        {offset: 0.5, color: '#188df0'},
                                        {offset: 1, color: '#188df0'}
                                    ]
                                )
                            },
                            emphasis: {
                                color: new echarts.graphic.LinearGradient(
                                    0, 0, 0, 1,
                                    [
                                        {offset: 0, color: '#2378f7'},
                                        {offset: 0.7, color: '#2378f7'},
                                        {offset: 1, color: '#83bff6'}
                                    ]
                                )
                            }
                        },
                        data: temp
                    }
                ]

            };
        }

        return option_ld;
    }
    resetLayout=()=> {
        saveToLS('layout', []);
        this.setState({
            layout: []
        });
    }
    getOption_map(){
        let option = null;
        const {location:{query},ShopTelephoneDate}= this.props;
        let temp = [];
        let fromData = [];
        let data=[];
        if(ShopTelephoneDate.data){
            for(let i=0;i<ShopTelephoneDate.data.length;i++) {
                data.push([[parseFloat(query['经度']),parseFloat(query['纬度'])],[parseFloat(ShopTelephoneDate.data[i]['longitude']),parseFloat(ShopTelephoneDate.data[i]['latitude'])]]);
            }
            // temp.push({'name':query['商铺名称'],'longitude':query['经度'],'latitude':query['纬度'],
            //     'value':ShopTelephoneDate.data.length});
            // for(let i=0;i<ShopTelephoneDate.data.length;i++){
            //     temp.push({'name':ShopTelephoneDate.data[i]['home_province']+"省"+ShopTelephoneDate.data[i]['city_belonging'],
            //         'longitude':ShopTelephoneDate.data[i]['longitude'],
            //         'latitude':ShopTelephoneDate.data[i]['latitude'],
            //         'value':ShopTelephoneDate.data[i]['value']
            //     });
            //
            // }
            // for(let i=0;i<temp.length;i++){
            //     if(temp[i]['name']==query['商铺名称']){
            //         fromData.push ({
            //             "name": temp[i]['name'],
            //             "value": [temp[i]['longitude'],temp[i]['latitude'],temp[i]['value']],
            //             "symbolSize": 10,
            //             "itemStyle": {
            //                 "normal": {
            //                     "color": "#58B3CC"
            //                 }
            //             }
            //         });
            //     }else {
            //         fromData.push ({
            //             "name": temp[i]['name'],
            //             "value": [temp[i]['longitude'],temp[i]['latitude'],temp[i]['value']],
            //             "symbolSize": 5,
            //             "itemStyle": {
            //                 "normal": {
            //                     "color": "#F58158"
            //                 }
            //             }
            //         });
            //     }
            // }
            // let toData = [];
            // for(let i=1;i<temp.length;i++){
            //     toData.push({
            //         "fromName": temp[0]['name'],
            //         //"toName": ShopTelephoneDate.data[i]['home_province'],
            //         "toName": temp[i]['name'],
            //         "coords": [
            //             [query['经度'], query['纬度']],
            //             [temp[i]['longitude'], temp[i]['latitude']]
            //         ]
            //     })
            // }
            //
            // let allData = {
            //     "citys": fromData,
            //     "moveLines": toData
            // };
            option = {
                backgroundColor: '#404a59',
                title: {
                    text: '消费用户分布图',
                    left: 'center',
                    textStyle: {
                        color: '#fff'
                    }
                },
                legend: {
                    show: false,
                    orient: 'vertical',
                    top: 'bottom',
                    left: 'right',
                    data: ['', ''],
                    textStyle: {
                        color: '#fff'
                    }
                },
                // backgroundColor: '#003',
                geo: {
                    map: 'china',
                    silent: true,
                    // label: {
                    //     emphasis: {
                    //         show: false
                    //     }
                    // },
                    roam: true,
                    itemStyle: {
                        normal: {
                            areaColor: '#323c48',
                            borderColor: '#404a59'
                        },
                        emphasis: {
                            areaColor: '#2a333d'
                        }
                    }
                    // itemStyle: {
                    //     normal: {
                    //         borderColor: '#003',
                    //         color: '#005'
                    //     }
                    // }
                },
                series: [
                //     {
                //     name: '',
                //     type: 'effectScatter',
                //     coordinateSystem: 'geo',
                //     zlevel: 2,
                //     rippleEffect: {
                //         brushType: 'stroke'
                //     },
                //     label: {
                //          emphasis: {
                //             //normal: {
                //             show: true,
                //             position: 'right',
                //             formatter: '{b}'
                //         }
                //     },
                //     symbolSize: 2,
                //     showEffectOn: 'render',
                //     itemStyle: {
                //         normal: {
                //             color: '#46bee9'
                //         }
                //     },
                //     data: allData.citys
                // },
                //     {
                //     name: '',
                //     type: 'lines',
                //     coordinateSystem: 'geo',
                //     zlevel: 2,
                //     large: true,
                //     effect: {
                //         show: true,
                //         constantSpeed: 30,
                //         symbol: 'pin',
                //         symbolSize: 3,
                //         trailLength: 0,
                //     },
                //     lineStyle: {
                //         normal: {
                //             color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                //                 offset: 0,
                //                 color: '#58B3CC'
                //             }, {
                //                 offset: 1,
                //                 color: '#F58158'
                //             }], false),
                //             width: 1,
                //             opacity: 0.2,
                //             curveness: 0.1
                //         }
                //     },
                //     data: allData.moveLines
                // },
                    {
                        type: 'lines',
                        coordinateSystem: 'geo',
                        data: data,
                        large: true,
                        largeThreshold: 1000,
                        lineStyle: {
                            normal: {
                                opacity: 0.03,
                                width: 0.5,
                                curveness: 0.3
                            }
                        },
                        // 设置混合模式为叠加
                        blendMode: 'lighter'
                    }]
            };
        }

//         var startPoint = {
//             x: 104.114129,
//             y: 37.550339
//         };
// // 地图自定义样式
//
//         var bmap = {
//             center: [startPoint.x, startPoint.y],
//             zoom: 5,
//             roam: true,
//             mapStyle: {
//                 styleJson: [{
//                     "featureType": "water",
//                     "elementType": "all",
//                     "stylers": {
//                         "color": "#044161"
//                     }
//                 }, {
//                     "featureType": "land",
//                     "elementType": "all",
//                     "stylers": {
//                         "color": "#004981"
//                     }
//                 }, {
//                     "featureType": "boundary",
//                     "elementType": "geometry",
//                     "stylers": {
//                         "color": "#064f85"
//                     }
//                 }, {
//                     "featureType": "railway",
//                     "elementType": "all",
//                     "stylers": {
//                         "visibility": "off"
//                     }
//                 }, {
//                     "featureType": "highway",
//                     "elementType": "geometry",
//                     "stylers": {
//                         "color": "#004981"
//                     }
//                 }, {
//                     "featureType": "highway",
//                     "elementType": "geometry.fill",
//                     "stylers": {
//                         "color": "#005b96",
//                         "lightness": 1
//                     }
//                 }, {
//                     "featureType": "highway",
//                     "elementType": "labels",
//                     "stylers": {
//                         "visibility": "off"
//                     }
//                 }, {
//                     "featureType": "arterial",
//                     "elementType": "geometry",
//                     "stylers": {
//                         "color": "#004981"
//                     }
//                 }, {
//                     "featureType": "arterial",
//                     "elementType": "geometry.fill",
//                     "stylers": {
//                         "color": "#00508b"
//                     }
//                 }, {
//                     "featureType": "poi",
//                     "elementType": "all",
//                     "stylers": {
//                         "visibility": "off"
//                     }
//                 }, {
//                     "featureType": "green",
//                     "elementType": "all",
//                     "stylers": {
//                         "color": "#056197",
//                         "visibility": "off"
//                     }
//                 }, {
//                     "featureType": "subway",
//                     "elementType": "all",
//                     "stylers": {
//                         "visibility": "off"
//                     }
//                 }, {
//                     "featureType": "manmade",
//                     "elementType": "all",
//                     "stylers": {
//                         "visibility": "off"
//                     }
//                 }, {
//                     "featureType": "local",
//                     "elementType": "all",
//                     "stylers": {
//                         "visibility": "off"
//                     }
//                 }, {
//                     "featureType": "arterial",
//                     "elementType": "labels",
//                     "stylers": {
//                         "visibility": "off"
//                     }
//                 }, {
//                     "featureType": "boundary",
//                     "elementType": "geometry.fill",
//                     "stylers": {
//                         "color": "#029fd4"
//                     }
//                 }, {
//                     "featureType": "building",
//                     "elementType": "all",
//                     "stylers": {
//                         "color": "#1a5787"
//                     }
//                 }, {
//                     "featureType": "label",
//                     "elementType": "all",
//                     "stylers": {
//                         "visibility": "off"
//                     }
//                 }]
//             }
//         }
//
//         var geoCoordMap = {
//             '上海': [121.4648, 31.2891],
//             '东莞': [113.8953, 22.901],
//             '东营': [118.7073, 37.5513],
//             '中山': [113.4229, 22.478],
//             '临汾': [111.4783, 36.1615],
//             '临沂': [118.3118, 35.2936],
//             '丹东': [124.541, 40.4242],
//             '丽水': [119.5642, 28.1854],
//             '乌鲁木齐': [87.9236, 43.5883],
//             '佛山': [112.8955, 23.1097],
//             '保定': [115.0488, 39.0948],
//             '兰州': [103.5901, 36.3043],
//             '包头': [110.3467, 41.4899],
//             '北京': [116.4551, 40.2539],
//             '北海': [109.314, 21.6211],
//             '南京': [118.8062, 31.9208],
//             '南宁': [108.479, 23.1152],
//             '南昌': [116.0046, 28.6633],
//             '南通': [121.1023, 32.1625],
//             '厦门': [118.1689, 24.6478],
//             '台州': [121.1353, 28.6688],
//             '合肥': [117.29, 32.0581],
//             '呼和浩特': [111.4124, 40.4901],
//             '咸阳': [108.4131, 34.8706],
//             '哈尔滨': [127.9688, 45.368],
//             '唐山': [118.4766, 39.6826],
//             '嘉兴': [120.9155, 30.6354],
//             '大同': [113.7854, 39.8035],
//             '大连': [122.2229, 39.4409],
//             '天津': [117.4219, 39.4189],
//             '太原': [112.3352, 37.9413],
//             '威海': [121.9482, 37.1393],
//             '宁波': [121.5967, 29.6466],
//             '宝鸡': [107.1826, 34.3433],
//             '宿迁': [118.5535, 33.7775],
//             '常州': [119.4543, 31.5582],
//             '广州': [113.5107, 23.2196],
//             '廊坊': [116.521, 39.0509],
//             '延安': [109.1052, 36.4252],
//             '张家口': [115.1477, 40.8527],
//             '徐州': [117.5208, 34.3268],
//             '德州': [116.6858, 37.2107],
//             '惠州': [114.6204, 23.1647],
//             '成都': [103.9526, 30.7617],
//             '扬州': [119.4653, 32.8162],
//             '承德': [117.5757, 41.4075],
//             '拉萨': [91.1865, 30.1465],
//             '无锡': [120.3442, 31.5527],
//             '日照': [119.2786, 35.5023],
//             '昆明': [102.9199, 25.4663],
//             '杭州': [119.5313, 29.8773],
//             '枣庄': [117.323, 34.8926],
//             '柳州': [109.3799, 24.9774],
//             '株洲': [113.5327, 27.0319],
//             '武汉': [114.3896, 30.6628],
//             '汕头': [117.1692, 23.3405],
//             '江门': [112.6318, 22.1484],
//             '沈阳': [123.1238, 42.1216],
//             '沧州': [116.8286, 38.2104],
//             '河源': [114.917, 23.9722],
//             '泉州': [118.3228, 25.1147],
//             '泰安': [117.0264, 36.0516],
//             '泰州': [120.0586, 32.5525],
//             '济南': [117.1582, 36.8701],
//             '济宁': [116.8286, 35.3375],
//             '海口': [110.3893, 19.8516],
//             '淄博': [118.0371, 36.6064],
//             '淮安': [118.927, 33.4039],
//             '深圳': [114.5435, 22.5439],
//             '清远': [112.9175, 24.3292],
//             '温州': [120.498, 27.8119],
//             '渭南': [109.7864, 35.0299],
//             '湖州': [119.8608, 30.7782],
//             '湘潭': [112.5439, 27.7075],
//             '滨州': [117.8174, 37.4963],
//             '潍坊': [119.0918, 36.524],
//             '烟台': [120.7397, 37.5128],
//             '玉溪': [101.9312, 23.8898],
//             '珠海': [113.7305, 22.1155],
//             '盐城': [120.2234, 33.5577],
//             '盘锦': [121.9482, 41.0449],
//             '石家庄': [114.4995, 38.1006],
//             '福州': [119.4543, 25.9222],
//             '秦皇岛': [119.2126, 40.0232],
//             '绍兴': [120.564, 29.7565],
//             '聊城': [115.9167, 36.4032],
//             '肇庆': [112.1265, 23.5822],
//             '舟山': [122.2559, 30.2234],
//             '苏州': [120.6519, 31.3989],
//             '莱芜': [117.6526, 36.2714],
//             '菏泽': [115.6201, 35.2057],
//             '营口': [122.4316, 40.4297],
//             '葫芦岛': [120.1575, 40.578],
//             '衡水': [115.8838, 37.7161],
//             '衢州': [118.6853, 28.8666],
//             '西宁': [101.4038, 36.8207],
//             '西安': [109.1162, 34.2004],
//             '贵阳': [106.6992, 26.7682],
//             '连云港': [119.1248, 34.552],
//             '邢台': [114.8071, 37.2821],
//             '邯郸': [114.4775, 36.535],
//             '郑州': [113.4668, 34.6234],
//             '鄂尔多斯': [108.9734, 39.2487],
//             '重庆': [107.7539, 30.1904],
//             '金华': [120.0037, 29.1028],
//             '铜川': [109.0393, 35.1947],
//             '银川': [106.3586, 38.1775],
//             '镇江': [119.4763, 31.9702],
//             '长春': [125.8154, 44.2584],
//             '长沙': [113.0823, 28.2568],
//             '长治': [112.8625, 36.4746],
//             '阳泉': [113.4778, 38.0951],
//             '青岛': [120.4651, 36.3373],
//             '韶关': [113.7964, 24.7028]
//         };
//
//         var BJData = [
//             [{
//                 name: '北京'
//             }, {
//                 name: '上海',
//                 value: 95
//             }],
//             [{
//                 name: '北京'
//             }, {
//                 name: '广州',
//                 value: 90
//             }],
//             [{
//                 name: '北京'
//             }, {
//                 name: '大连',
//                 value: 80
//             }],
//             [{
//                 name: '北京'
//             }, {
//                 name: '南宁',
//                 value: 70
//             }],
//             [{
//                 name: '北京'
//             }, {
//                 name: '南昌',
//                 value: 60
//             }],
//             [{
//                 name: '北京'
//             }, {
//                 name: '拉萨',
//                 value: 50
//             }],
//             [{
//                 name: '北京'
//             }, {
//                 name: '长春',
//                 value: 40
//             }],
//             [{
//                 name: '北京'
//             }, {
//                 name: '包头',
//                 value: 30
//             }],
//             [{
//                 name: '北京'
//             }, {
//                 name: '重庆',
//                 value: 20
//             }],
//             [{
//                 name: '北京'
//             }, {
//                 name: '常州',
//                 value: 10
//             }]
//         ];
//
//         var planePath = 'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z';
//
//         var convertData = function(data) {
//             var res = [];
//             for (var i = 0; i < data.length; i++) {
//                 var dataItem = data[i];
//                 var fromCoord = geoCoordMap[dataItem[0].name];
//                 var toCoord = geoCoordMap[dataItem[1].name];
//                 if (fromCoord && toCoord) {
//                     res.push({
//                         fromName: dataItem[0].name,
//                         toName: dataItem[1].name,
//                         coords: [fromCoord, toCoord]
//                     });
//                 }
//             }
//             return res;
//         };
//
//         var color = ['#a6c84c'];
//         var series = [];
//         [
//             ['北京', BJData]
//         ].forEach(function(item, i) {
//             series.push({
//                 name: item[0] + ' Top10',
//                 type: 'effectScatter',
//                 coordinateSystem: 'bmap',
//                 zlevel: 2,
//                 rippleEffect: {
//                     brushType: 'stroke'
//                 },
//                 label: {
//                     normal: {
//                         show: true,
//                         position: 'right',
//                         formatter: '{b}'
//                     }
//                 },
//                 symbolSize: function(val) {
//                     return val[2] / 4;
//                 },
//                 showEffectOn: 'render',
//                 itemStyle: {
//                     normal: {
//                         color: color[i]
//                     }
//                 },
//                 data: [{
//                     name: item[0],
//                     value: geoCoordMap[item[0]].concat([100])
//                 }]
//             }, {
//                 name: item[0] + ' Top10',
//                 type: 'lines',
//                 coordinateSystem: 'bmap',
//                 zlevel: 1,
//                 effect: {
//                     show: true,
//                     period: 6,
//                     trailLength: 0.7,
//                     color: '#fff',
//                     symbolSize: 3
//                 },
//                 lineStyle: {
//                     normal: {
//                         color: color[i],
//                         width: 0,
//                         curveness: 0.2
//                     }
//                 },
//                 data: convertData(item[1])
//             }, {
//                 name: item[0] + ' Top10',
//                 type: 'lines',
//                 coordinateSystem: 'bmap',
//                 zlevel: 2,
//                 effect: {
//                     show: true,
//                     period: 6,
//                     trailLength: 0,
//                     symbol: planePath,
//                     symbolSize: 15
//                 },
//                 lineStyle: {
//                     normal: {
//                         color: color[i],
//                         width: 1,
//                         opacity: 0.4,
//                         curveness: 0.2
//                     }
//                 },
//                 data: convertData(item[1])
//             }, {
//                 name: item[0] + ' Top10',
//                 type: 'effectScatter',
//                 coordinateSystem: 'bmap',
//                 zlevel: 2,
//                 rippleEffect: {
//                     brushType: 'stroke'
//                 },
//                 label: {
//                     normal: {
//                         show: true,
//                         position: 'right',
//                         formatter: '{b}'
//                     }
//                 },
//                 symbolSize: function(val) {
//                     return val[2] / 4;
//                 },
//                 showEffectOn: 'render',
//                 itemStyle: {
//                     normal: {
//                         color: color[i]
//                     }
//                 },
//                 data: item[1].map(function(dataItem) {
//                     return {
//                         name: dataItem[1].name,
//                         value: geoCoordMap[dataItem[1].name].concat([dataItem[1].value])
//                     };
//                 })
//             });
//         });
//
//         option = {
//             bmap: bmap,
//             color: ['gold', 'aqua', 'lime'],
//             backgroundColor: '#404a59',
//             title: {
//                 text: '模拟迁徙+百度地图',
//                 subtext: 'data-visual.cn',
//                 sublink:'http://data-visual.cn',
//                 left: 'center',
//                 textStyle: {
//                     color: '#fff'
//                 }
//             },
//             tooltip: {
//                 trigger: 'item'
//             },
//             // legend: {
//             //     orient: 'vertical',
//             //     top: 'bottom',
//             //     left: 'right',
//             //     data: ['北京 Top10', '上海 Top10', '广州 Top10'],
//             //     textStyle: {
//             //         color: '#fff'
//             //     },
//             //     selectedMode: 'single'
//             // },
//             geo: {
//                 map: 'bmap',
//                 polyline: true,
//                 progressiveThreshold: 500,
//                 progressive: 200,
//                 label: {
//                     emphasis: {
//                         show: false
//                     }
//                 },
//                 roam: true,
//                 itemStyle: {
//                     normal: {
//                         areaColor: '#323c48',
//                         borderColor: '#404a59'
//                     },
//                     emphasis: {
//                         areaColor: '#2a333d'
//                     }
//                 }
//             },
//             series: series
//         };
        return option;
    }



    getStyles()
    {
        const styles = {
            content: {
                marginTop: this.context.muiTheme.spacing.desktopGutter+this.context.muiTheme.spacing.desktopSubheaderHeight,
                marginBottom:this.context.muiTheme.spacing.desktopGutter,
                marginLeft:this.context.muiTheme.spacing.desktopGutter,
                marginRight:this.context.muiTheme.spacing.desktopGutter,
            },
            contentWhenMedium: {
                // margin: `${this.context.muiTheme.spacing.desktopGutter * 2}px  ${this.context.muiTheme.spacing.desktopGutter * 3}px`,
                marginTop: this.context.muiTheme.spacing.desktopGutter * 2+this.context.muiTheme.spacing.desktopSubheaderHeight,
                marginBottom: this.context.muiTheme.spacing.desktopGutter * 2,
                marginLeft:this.context.muiTheme.spacing.desktopGutter * 3,
                marginRight:this.context.muiTheme.spacing.desktopGutter * 3,
            },
            toolbar: {
                position:'fixed',
                left:0,
                width:'100%'
            }
        };
        if ( this.props.width === MEDIUM || this.props.width === LARGE )
            styles.content = Object.assign(styles.content, styles.contentWhenMedium);
        return styles;
    }
    render() {
        //console.log(localStorage)

        const {params : {shopsId}, creditData, shopLabelData, location:{query}} = this.props;
        const styles = this.getStyles();
        //处理商户标签数据
        var labelData = {};
        for(var i=0; i<shopLabelData.length; i++) {
            labelData[shopLabelData[i].words] = shopLabelData[i].rank;
        }
        //处理信用数据
        var creditX = [], creditS = [], totalScore=0;
        if(creditData.length>0){
            for(var i=0; i<creditData.length; i++) {
                if(creditData[i]['date']){
                    creditX.push(creditData[i]['date']);
                    creditS.push(creditData[i].estimate);
                }
            }

        }
        option_line.xAxis.data = creditX;
        option_line.series[0].data = creditS;
        //处理信用指数数据
        if(creditData.length>0) {
            var preRisk = 0;
            preRisk = creditData[creditData.length-1].estimate * 100;
            option.series[0].data[0].value = preRisk;
            option.series[0].data[1].value = 100-preRisk;
        }

        if (this.props.width == LARGE) {
            styles.toolbar.left = 240;
            styles.toolbar.width = 'calc(100% - 240px)';
        }
        else{
            styles.toolbar.left = 0;
            styles.toolbar.width = '100%';
        }
        return (
            <div>
                <TabMenuBar {...this.props}
                            isArrowBackShown={true}
                            title="返回"
                    //handleChange={this.handleChange_TabMenuBar}
                    //tabs={["演员","导演","编剧",'摄像','美工']}
                            tabsWidth={500}/>
                <div style={styles.content}>
                    <Paper  zDepth={2}>
                        <div style={{display:'flex'}}>
                            <Paper style={{width:'25%',flexDirection:'column',position:'relative',minWidth:'246px'}}>
                                <div style={{width:'100%',marginTop:'-35px',height:'240px'}}>
                                    <ECharts option={option}/>
                                </div>
                                <div style={{width:'88%',fontSize:'12px',position:'absolute',top:'155px',left:'32px'}}>
                                    <div style={{display:'flex',height:'25px',lineHeight:'25px'}}>
                                        <div style={{flex:1,textAlign:'right'}}>编号：</div>
                                        <div style={{flex:2,textAlign:'left'}}>{query['店铺id']}</div>
                                    </div>
                                    <div style={{display:'flex',height:'25px',lineHeight:'25px'}}>
                                        <div style={{flex:1,textAlign:'right'}}>商圈：</div>
                                        <div style={{flex:2,textAlign:'left'}}>{query['商圈']}</div>
                                    </div>
                                    <div style={{display:'flex',height:'25px',lineHeight:'25px'}}>
                                        <div style={{flex:1,textAlign:'right'}}>经营类型：</div>
                                        <div style={{flex:2,textAlign:'left'}}>{query['类型']}</div>
                                    </div>
                                    <div style={{display:'flex',height:'25px',lineHeight:'25px'}}>
                                        <div style={{flex:1,textAlign:'right'}}>推荐码：</div>
                                        <div style={{flex:2,textAlign:'left'}}>{query['推荐码']}</div>
                                    </div>
                                    <div style={{display:'flex',height:'25px',lineHeight:'25px'}}>
                                        <div style={{flex:1,textAlign:'right'}}>银行推荐码：</div>
                                        <div style={{flex:2,textAlign:'left'}}>{query['银行推荐码']}</div>
                                    </div>
                                    <div style={{display:'flex',height:'25px',lineHeight:'25px'}}>
                                        <div style={{flex:1,textAlign:'right'}}>商铺名称：</div>
                                        <div style={{flex:2,textAlign:'left'}}>{query['商铺名称']}</div>
                                    </div>
                                    <div style={{display:'flex',height:'25px',lineHeight:'25px'}}>
                                        <div style={{flex:1,textAlign:'right'}}>电话：</div>
                                        <div style={{flex:2,textAlign:'left'}}>{query['电话']}</div>
                                    </div>
                                    <div style={{display:'flex',height:'25px',lineHeight:'25px'}}>
                                        <div style={{flex:1,textAlign:'right'}}>注册时间：</div>
                                        <div style={{flex:2,textAlign:'left'}}>{query['注册时间']}</div>
                                    </div>
                                    <div style={{display:'flex',height:'25px',lineHeight:'25px'}}>
                                        <div style={{flex:1,textAlign:'right'}}>审核时间：</div>
                                        <div style={{flex:2,textAlign:'left'}}>{query['审核时间']}</div>
                                    </div>
                                    <div style={{display:'flex',height:'25px',lineHeight:'25px'}}>
                                        <div style={{flex:1,textAlign:'right'}}>审核状态：</div>
                                        <div style={{flex:2,textAlign:'left'}}>{query['审核状态']}</div>
                                    </div>
                                    <div style={{display:'flex',height:'25px',lineHeight:'25px',flexWrap:'wrap'}}>
                                        <div style={{flex:1,textAlign:'right'}}>地址：</div>
                                        <div style={{flex:2,textAlign:'left'}}>{query['地址']}</div>
                                    </div>
                                </div>
                            </Paper>
                            <div style={{width:'75%'}}>
                                <Tabs
                                    onChange={this.handleChange_Tab}
                                    value={this.state.tabIndex}
                                    tabItemContainerStyle={styles.tabs}
                                >
                                    <Tab label="历史信用曲线图" value={0}>
                                        <div style={{height:460,padding:'25px 50px',}}>
                                            <ECharts option={option_line}/>
                                        </div>
                                    </Tab>
                                    <Tab label="消费者电话归属" value={1}>
                                        <ChartBubble shopsId={shopsId} style={{marginTop:'50px',height:410,padding:'0 50px',}}/>
                                    </Tab>
                                </Tabs>
                            </div>
                        </div>
                    </Paper>
                    <Paper style={{margin:'50px 0', textAlign: 'center'}} zDepth={2}>
                        <Toolbar>
                            <ToolbarGroup>
                                <ToolbarTitle text="消费者"/>
                            </ToolbarGroup>
                        </Toolbar>
                        <Tabs
                            onChange={this.handleChange_Tab}
                            value={this.state.tabIndex}
                           // tabItemContainerStyle={styles.tabs}
                        >
                            <Tab label="消费者特征" value={0}>
                                <ECharts option={this.getOption_ld()} style={{height:'374px'}}/>
                            </Tab>
                            <Tab label="商户画像标签" value={1}>
                                <div style={{textAlign:'center'}}>商户画像标签</div>
                                <WordCloud data={labelData} style={{height:'350px'}}/>
                            </Tab>
                            <Tab label="消费用户分布图" value={1}>
                                <ECharts option={this.getOption_map()} style={{height:'374px'}}/>
                            </Tab>
                        </Tabs>
                    </Paper>
                    <div style={{marginTop:'60px'}}>
                        <SaleAnalysis shopsId={shopsId} shops_name={query['商铺名称']}/>
                    </div>
                </div>


            </div>
        );


    }
}

function getFromLS(key) {
    let ls = {};
    if (global.localStorage) {
        try {
            ls = JSON.parse(global.localStorage.getItem('rgl-7')) || {};
        } catch(e) {/*Ignore*/}
    }
    return ls[key];
}

function saveToLS(key, value) {
    if (global.localStorage) {
        global.localStorage.setItem('rgl-7', JSON.stringify({
            [key]: value
        }));
    }
}

ShopsProfile.propTypes = {
    dispatch:PropTypes.func.isRequired,
    // shopsRows:PropTypes.Array.isRequired,
};
ShopsProfile.contextTypes = {
    muiTheme: React.PropTypes.object,
}

const mapStateToProps = (state) => {
    const { databaseReducer,layoutReducer} = state;
    return {
        shopLabelData:databaseReducer.shopData.shopLabelData,
        creditData:databaseReducer.shopData.creditData,
        SingleShopMapData1:databaseReducer.SingleShopMapData1,
        loadSingleShopUserData:databaseReducer.loadSingleShopUserData,
        loading:databaseReducer.loading,
        loaded:databaseReducer.loaded,
        panelVisible:layoutReducer.panelVisible,//勿删,传入TabMenuBar
        ShopTelephoneDate:databaseReducer.ShopTelephoneDate
    };
};
export default connect(
    mapStateToProps
)(withWidth( )(ShopsProfile));




