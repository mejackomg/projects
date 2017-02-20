import React from 'react';
import ECharts from 'echarts-for-react'//'./ECharts.js';
import Paper from 'material-ui/Paper';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import { connect } from 'react-redux';
import * as loadData from '../reducers/database'
import {Button, Glyphicon} from 'react-bootstrap';
import IconButton from 'material-ui/IconButton';
import ActionList from 'material-ui/svg-icons/navigation/menu';
import Left from 'material-ui/svg-icons/navigation/chevron-left'
import Right from 'material-ui/svg-icons/navigation/chevron-right'
import DatetimeRangePicker from 'react-bootstrap-datetimerangepicker';
import moment from 'moment';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-daterangepicker/daterangepicker.css';
import DatePicker from 'material-ui/DatePicker';
// import ReactEcharts from 'echarts-for-react';


class Chart extends React.Component {

    static defaultProps = {
        series: [],
        xData: [],
        legend: []
    };

    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            updateFlag:true,
            selectedValueList: {},
            selectedDate: '',
            summaryIndex:0,
            fromDate: moment().subtract(29, 'days'),
            toDate: moment(),
            ranges: {
                '今日': [moment().startOf('day'), moment()],
                '昨天': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                '过去7天': [moment().subtract(6, 'days'), moment()],
                '过去30天': [moment().subtract(29, 'days'), moment()],
                '这个月': [moment().startOf('month'), moment().endOf('month')],
                '上个月': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
            },
            isShowTime:true,
            stylePositon:3,
            isEmpty:false
        };
    };
    componentWillReceiveProps(nextProps) {
        if (nextProps.totalPeriod != this.props.totalPeriod) {
            this.setState({
                value:nextProps.totalPeriod,
                updateFlag: true
            })
            const {data,dispatch}=this.props;
            let fromDate = this.state.fromDate.format('YYYY-MM-DD');
            let toDate = this.state.toDate.format('YYYY-MM-DD');
            const dateS =nextProps.totalPeriod==0?'day':nextProps.totalPeriod==1?'week':'month';
            if (data.dispatchFunc != '' && loadData[data.dispatchFunc]){
                if(data.dispatchFunc == 'SingleShopOrder' || data.dispatchFunc == 'SingleShopSales' ){
                    dispatch(loadData[data.dispatchFunc](fromDate, toDate, dateS,nextProps.shopsId));
                    this.setState({
                        isShowTime:true
                    })
                }else if(data.dispatchFunc == 'loadShopTelephone' || data.dispatchFunc =='loadShopData'){
                    dispatch(loadData[data.dispatchFunc](nextProps.shopsId));
                    this.setState({
                        isShowTime:false
                    })
                }else if(data.dispatchFunc == 'TotalSalesTop10' || data.dispatchFunc == 'SalesYesterdayTop10'){
                    this.setState({
                        isShowTime:false
                    })
                    dispatch(loadData[data.dispatchFunc]());
                }else if (data.dispatchFunc == 'SingleUserConsumptionCurve' ) {
                    dispatch(loadData[data.dispatchFunc](fromDate, toDate, dateS,nextProps.usersId));
                    this.setState({
                        isShowTime: true
                    })
                }
                else if ( data.dispatchFunc == 'SingleusersCreditHistroy') {
                    dispatch(loadData[data.dispatchFunc](nextProps.usersId));
                    this.setState({
                        isShowTime: false
                    })
                }
                else{
                    this.setState({
                        isShowTime:true
                    })
                    dispatch(loadData[data.dispatchFunc](fromDate, toDate, dateS));
                }
            }

        }
        if(nextProps.reducerProps[nextProps.data.dataPropName] != this.props.reducerProps[this.props.data.dataPropName]){
            if(nextProps.reducerProps[nextProps.data.dataPropName].xData){
                if(nextProps.reducerProps[nextProps.data.dataPropName].xData.length==0)
                    this.setState({isEmpty:true})
                else
                    this.setState({isEmpty:false})
            }
            else
            this.setState({isEmpty:false})
        }
        // if(nextProps.reducerProps[nextProps.data.dataPropName])
        // console.log('look')
        // console.log(nextProps.data,nextProps.shopsId);
        if(nextProps.data!= this.props.data)
        {
            this.setState({
                value:0,
                updateFlag: true
            })
            this.dispatchFunc(nextProps.data);

        }else if(nextProps.shopsId != this.props.shopsId){

            this.dispatchFunc(nextProps.data,nextProps.shopsId);

        }else if (nextProps.usersId != this.props.usersId) {
            this.dispatchFunc(nextProps.data);
        }
    }
    dispatchFunc=(data,shopsId)=>{
        const {dispatch} = this.props;
        if (data.dispatchFunc != '' && data.dataPropName != '') {
            if (loadData[data.dispatchFunc]) {
                let startDay = this.state.fromDate;
                let endDay = this.state.toDate;
                const fromDate = startDay.format('YYYY-MM-DD');
                const toDate = endDay.format('YYYY-MM-DD');
                if(data.dispatchFunc == 'SingleShopOrder' || data.dispatchFunc == 'SingleShopSales' ){
                    dispatch(loadData[data.dispatchFunc](fromDate, toDate, 'day',shopsId||this.props.shopsId));
                    this.setState({
                        isShowTime:true
                    })
                }else if(data.dispatchFunc == 'loadShopTelephone' || data.dispatchFunc =='loadShopData'){
                    dispatch(loadData[data.dispatchFunc](shopsId||this.props.shopsId));
                    this.setState({
                        isShowTime:false
                    })
                }else if(data.dispatchFunc == 'TotalSalesTop10' || data.dispatchFunc == 'SalesYesterdayTop10'){
                    this.setState({
                        isShowTime:false
                    })
                    dispatch(loadData[data.dispatchFunc]());
                }else if (data.dispatchFunc == 'SingleUserConsumptionCurve' ) {
                    dispatch(loadData[data.dispatchFunc](fromDate, toDate, 'day',this.props.usersId));
                    this.setState({
                        isShowTime: true
                    })
                }
                else if ( data.dispatchFunc == 'SingleusersCreditHistroy') {
                    dispatch(loadData[data.dispatchFunc](this.props.usersId));
                    this.setState({
                        isShowTime: false
                    })
                }
                else{
                    this.setState({
                        isShowTime:true
                    })
                    dispatch(loadData[data.dispatchFunc](fromDate, toDate, 'day'));
                }

            }
        }
    }

    componentWillMount(){
        const {data} = this.props;
        // if(data.xData && data.xData.length>0){
        //     this.setState({
        //         selectedDate:data.xData[0]
        //     })
        // }
        // console.log('哪里',data.xData && data.xData.length>0)
    }
    componentDidMount() {
        const {data} = this.props;
        this.dispatchFunc(data);
        // if(data.xData && data.xData.length>0){
        //     this.setState({
        //         selectedDate:data.xData[0]
        //     });
        //
        // }


    }
    getOption(legend, xData, yData, unit) {
        var that = this;
        // var yAxis = {
        //     type: 'value'
        // };
        var xAxis = {
            type: 'category',
            boundaryGap: false,
        };
        var series = [];
        for (var i = 0; i < legend.length; i++) {
            series[i] = {};
            series[i].name = legend[i];
            series[i].data = yData[legend[i]];
            series[i].type = 'line';
            series[i].stack = '总量';
        }
        xAxis.data = xData;
        const option = {
            title: {
                text: ''
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'line'
                },
                formatter: function (params) {
                    const {selectedValueList}=that.state;
                    let date = '';
                    // if (params[0].value !== selectedValueList[Object.keys(selectedValueList)[0]]) {
                        var temp = {};
                        for (let i = 0; i < legend.length; i++) {
                            temp[params[i].seriesName] = params[i].value;
                            date = params[i].name;
                        }
                        // console.log(temp, date);
                        that.setState({
                            selectedValueList: temp,
                            selectedDate: date,
                            updateFlag: false

                        });
                        // }
                        var format = params[0].seriesName + ':' + params[0].value;
                        for (var i = 1; i < params.length; i++) {
                            format += '<br>';
                            format += params[i].seriesName + ':' + params[i].value;
                        }
                        return format;
                    // }
                }
            },
            // legend: {
            //     data: legend.length > 1 ? legend : [],
            //     left: 10
            // },
            grid: {
                left: '3%',
                right: '8%',
                bottom: '3%',
                containLabel: true
            },
            toolbox: {
                show: true,
                feature: {
                    // dataView: {show: true, readOnly:true},
                    magicType:{show:true, type: ['line', 'bar']},
                    restore: {show: true},
                    // saveAsImage : {show: true}
                },
                // orient:'vertical',
                right:'0px',
                top:'25px'

            },
            xAxis: xAxis,
            yAxis: {
                type: 'value',
                boundaryGap:[]
            },
            series: series

        };
        return option;
    }

    getOption_WordCloud(WordData,id) {
        // let imgURL = "/data-1478056468744-rkpz90Iex.png";
        // let maskImage = new Image();
        // maskImage.src = imgURL;
        let WordDatas = [];
        for (let i = 0; i < WordData.length; i++) {
            // WordDatas[i]["name"] = WordData[i]["words"];
            // WordDatas[i]["value"] = WordData[i]["rank"];
            if(id==1){
                WordDatas[i] = {
                    "name": WordData[i]["words"],
                    "value": WordData[i]["rank"]
                }

            }else{
                WordDatas[i] = {
                    "name": WordData[i]["name"],
                    "value": WordData[i]["value"]
                }

            }
        }
        const option = {
            tooltip: {},
            series: [{
                type: 'wordCloud',
                gridSize: 2,
                sizeRange: [10, 100],
                rotationRange: [-90, 90],
                shape: 'pentagon',
                // maskImage: maskImage,
                textStyle: {
                    normal: {
                        color: function() {
                            return 'rgb(' + [
                                    Math.round(Math.random() * 160),
                                    Math.round(Math.random() * 160),
                                    Math.round(Math.random() * 160)
                                ].join(',') + ')';
                        }
                    },
                    emphasis: {
                        shadowBlur: 10,
                        shadowColor: '#333'
                    }
                },
                data:WordDatas.sort(function (a, b) {
                    return b.value  - a.value;
                })
            }]
        };

        return option;
    }

    getOption_Map(MapData,shopData){
        // console.log('MapData',MapData);
        // console.log('shopData',shopData);
        // let planePath = 'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z';
        // let planePath = '';
        let geoCoordMap = {
            '北京': [116.4551, 40.2539],
            '天津': [117.4219, 39.4189],
            '河北': [114.4995, 38.1006],
            '山西': [112.3352, 37.9413],
            '内蒙古': [111.4124, 40.4901],
            '辽宁': [123.1238, 42.1216],
            '吉林': [125.8154, 44.2584],
            '黑龙江': [127.9688, 45.368],
            '上海': [121.4648, 31.2891],
            '江苏': [118.8062, 31.9208],
            '浙江': [119.5313, 29.8773],
            '安徽': [117.29, 32.0581],
            '福建': [119.4543, 25.9222],
            '江西': [116.0046, 28.6633],
            '山东': [117.1582, 36.8701],
            '河南': [113.4668, 34.6234],
            '湖北': [114.3896, 30.6628],
            '湖南': [113.0823, 28.2568],
            '广东': [113.5107, 23.2196],
            '广西': [108.479, 23.1152],
            '海南': [110.3893, 19.8516],
            '重庆': [107.7539, 30.1904],
            '四川': [103.9526, 30.7617],
            '贵州': [106.6992, 26.7682],
            '云南': [102.9199, 25.4663],
            '西藏': [91.1865, 30.1465],
            '陕西': [109.1162, 34.2004],
            '甘肃': [103.5901, 36.3043],
            '青海': [101.4038, 36.8207],
            '宁夏': [106.3586, 38.1775],
            '新疆': [87.9236, 43.5883],
            '新疆兵团': [85.42, 41.82]
        };
        // let shopLL = [shopData[0]['经度'], shopData[0]['纬度']];

        // let res = [];
        let data = [];
        if(MapData && MapData.length>0){
            for (var i = 0; i < MapData.length; i++) {
                // let dataItem = MapData[i];
                // let toCoord= [dataItem.longitude, dataItem.latitude];
                // let fromCoord= [shopData[0]['经度'], shopData[0]['纬度']];
                // res.push({
                //     toName: dataItem.home_province, //city_belonging
                //     fromName: shopData[0]['商铺名称'],
                //     coords: [fromCoord, toCoord]
                // });

                data.push([[shopData[0]['经度'], shopData[0]['纬度']],[MapData[i].longitude, MapData[i].latitude]]);

            }

        }

        // var color = ['#a6c84c', '#ffa022', '#46bee9'];
        // var series = [];
        /*series.push(
            {
            name: shopData[0]['商铺名称'],
            type: 'lines',
            zlevel: 1,
            effect: {
                show: true,
                period: 6,
                trailLength: 0.7,
                color: '#fff',
                symbolSize: 3
            },
            lineStyle: {
                normal: {
                    color: color[0],
                    width: 0,
                    curveness: 0.2
                }
            },
            data: res
        },
        // {
        //     name: shopData[0]['商铺名称'],
        //     type: 'lines',
        //     zlevel: 2,
        //     effect: {
        //         show: true,
        //         period: 6,
        //         trailLength: 0,
        //         symbol: planePath,
        //         symbolSize: 10
        //     },
        //     lineStyle: {
        //         normal: {
        //             color: color[0],
        //             width: 1,
        //             opacity: 0.4,
        //             curveness: 0.2
        //         }
        //     },
        //     data: res
        // },
        {
            name: shopData[0]['商铺名称'],
            type: 'effectScatter',
            coordinateSystem: 'geo',
            zlevel: 2,
            rippleEffect: {
                brushType: 'stroke'
            },
            label: {
                normal: {
                    show: true,
                    position: 'right',
                    formatter: '{b}'
                }
            },
            symbolSize: function (val) {
                return val[2] / 8;
            },
            itemStyle: {
                normal: {
                    color: color[0]
                }
            },
            data: MapData.map(function (dataItem) {
                return {
                    name: dataItem.home_province, //home_province
                    value: [dataItem.longitude, dataItem.latitude, dataItem.value*100]    //经度，纬度，值
                };
            })
        }
        );*/
        let color = [ '#1e90ff','#46bee9'];
        // series.push(
            // {
            //     name: shopData[0]['商铺名称'],
            //     type: 'lines',
            //     zlevel: 2,
            //     effect: {
            //         show: true,
            //         period: 6,
            //         constantSpeed: 100,
            //         trailLength: 0.4,
            //         color: '#F9FAFD',
            //         symbolSize: 5
            //     },
            //     lineStyle: {
            //         normal: {
            //             color: '#46bee9',
            //             width: 0,
            //             curveness: 0.2
            //         }
            //     },
            //     data: res
            // }
            // ,
            // {
            //     name: shopData[0]['商铺名称'],
            //     type: 'lines',
            //     zlevel: 1,
            //     effect: {
            //         show: true,
            //         period: 6,
            //         trailLength: 0,
            //         symbol: 'image://',
            //         symbolSize: 15
            //     },
            //     label: {
            //         emphasis: {
            //             show: true,
            //
            //         }
            //     },
            //     lineStyle: {
            //         normal: {
            //             color: '#46bee9',
            //             width: 2,
            //             opacity: 0.8,
            //             curveness: 0.2
            //         },
            //         emphasis:{
            //             color: '#46bee9',
            //             shadowColor: 'rgba(0, 0, 0, 0.5)',
            //             shadowBlur: 10,
            //             width: 6
            //         }
            //     },
            //     data: res
            // }
            // ,
            // {
            //     name: shopData[0]['商铺名称'],
            //     type: 'effectScatter',
            //     coordinateSystem: 'geo',
            //     zlevel: 2,
            //     rippleEffect: {
            //         period: 5,
            //         scale: 8,
            //         brushType: 'stroke'
            //     },
            //     symbolSize: function (val) {
            //         if([val[0],val[1]].toString()==shopLL.toString()){
            //             return 3;
            //         }
            //         return 8;
            //     },
            //     itemStyle: {
            //         normal: {
            //             color: '#46bee9'
            //         }
            //     },
            //     data: MapData.map(function (dataItem) {
            //         return {
            //             name: dataItem.home_province, //home_province
            //             // value: [dataItem.longitude, dataItem.latitude, dataItem.value*100]    //经度，纬度，值
            //             value: [dataItem.longitude, dataItem.latitude]    //经度，纬度，值
            //         };
            //     })
            // }
            // ,
            // {
            //     name: shopData[0]['商铺名称'],
            //     type: 'map',
            //     mapType: 'china',
            //     zlevel: 0,
            //     roam: false,
            //     zoom: 1.2,
            //     selectedMode : 'multiple',
            //     label: {
            //         normal: {
            //             show: true
            //         },
            //         emphasis: {
            //             show: true
            //         }
            //     },
            //     itemStyle: {
            //         normal: {
            //             areaColor: '#F0F2F5',
            //             borderColor: 'red'
            //         },
            //         emphasis: {
            //             areaColor: '#F79092'
            //         }
            //     }
            // }
        // )
        let option = {
            backgroundColor: '#404a59',
            title: {
                text: '',
                subtext: '',
                left: 'center',
                textStyle: {
                    color: '#fff'
                }
            },
            // tooltip: {
            //     trigger: 'item',
            //     // formatter: function(params){
            //     //     // let res = params.seriesName+'<br/>';
            //     //     // if(params.seriesType=='lines'){
            //     //     //     res += params.data.fromName+' > '+params.data.toName;
            //     //     //     var myseries = option.series;
            //     //     //     for (var i = 0; i < myseries.length; i++) {
            //     //     //         if(myseries[i].name==params.seriesName &&
            //     //     //             myseries[i].type=='effectScatter'){
            //     //     //             for (var j = 0; j < myseries[i].data.length; j++) {
            //     //     //                 if(myseries[i].data[j].name==params.data.fromName){
            //     //     //                     res += '：'+myseries[i].data[j].value[2]+'个';
            //     //     //                 }
            //     //     //             }
            //     //     //         }
            //     //     //     }
            //     //     // }else if(params.seriesType=='effectScatter'){
            //     //     //     res += params.data.name+'：'+params.data.value[2]+'个';
            //     //     // }else if(params.seriesType=='map'){
            //     //     //     res += params.data.name+'：'+params.data.value+'个';
            //     //     // }
            //
            //     //     // return res;
            //     // },
            // },
            legend: {
                orient: 'vertical',
                top: 'bottom',
                left: 'right',
                data: ['',''],
                textStyle: {
                    color: '#333'
                },
                // selectedMode: 'multiple'
            },
            geo: {
                map: 'china',
                label: {
                    emphasis: {
                        show: false
                    }
                },
                roam: true,
                zoom:1.2,
                itemStyle: {
                    normal: {
                        areaColor: '#F0F2F5',
                        borderColor: 'red'
                    },
                    emphasis: {
                        areaColor: '#F79092'
                    }
                }
            },
            series: [{
                type: 'lines',
                coordinateSystem: 'geo',
                data: data,
                zlevel: 2,
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
        // }
        // var mapData = [];
        // //商户分布地图
        // for(var i=0; i<MapData.length; i++) {
        //     mapData.push({
        //         name:MapData[i].name,
        //         value:[MapData[i].longitude, MapData[i].latitude, MapData[i].tnum]
        //     });
        // }
        // var option = null;
        // if(true){
        //     option = {
        //         backgroundColor: '#404a59',
        //         title: {
        //             text: '商户日平均销量',
        //             left: 'center',
        //             textStyle:{
        //                 color:'#fff'
        //             }
        //         },
        //         tooltip : {
        //             trigger: 'item'
        //         },
        //         geo: {
        //             map: 'china',
        //             label: {
        //                 emphasis: {
        //                     show: false
        //                 }
        //             },
        //             roam: true,
        //             itemStyle: {
        //                 normal: {
        //                     areaColor: '#323c48',
        //                     borderColor: '#111'
        //                 },
        //                 emphasis: {
        //                     areaColor: '#2a333d'
        //                 }
        //             }
        //         },
        //         series : [
        //             {
        //                 name: '商户分布',
        //                 type: 'scatter',
        //                 coordinateSystem: 'geo',
        //                 data: mapData,
        //                 symbolSize: function (val) {
        //                     return val[2] / 10;
        //                 },
        //                 label: {
        //                     normal: {
        //                         formatter: '{b}',
        //                         position: 'right',
        //                         show: false
        //                     },
        //                     emphasis: {
        //                         show: true
        //                     }
        //                 },
        //                 itemStyle: {
        //                     normal: {
        //                         color: '#ddb926'
        //                     }
        //                 }
        //             },
        //             {
        //                 name: 'Top 5',
        //                 type: 'effectScatter',
        //                 coordinateSystem: 'geo',
        //                 data: mapData.sort(function (a, b) {
        //                     return b.value - a.value;
        //                 }).slice(0, 5),
        //                 symbolSize: function (val) {
        //                     return val[2] / 10;
        //                 },
        //                 showEffectOn: 'render',
        //                 rippleEffect: {
        //                     brushType: 'stroke'
        //                 },
        //                 hoverAnimation: true,
        //                 label: {
        //                     normal: {
        //                         formatter: '{b}',
        //                         position: 'right',
        //                         show: true
        //                     }
        //                 },
        //                 itemStyle: {
        //                     normal: {
        //                         color: '#f4e925',
        //                         shadowBlur: 10,
        //                         shadowColor: '#333'
        //                     }
        //                 },
        //                 zlevel: 1
        //             }
        //         ]
        //     };
        // }
        return option;
    }
    getOption_Bar(barData){
        let xDate = [];
        let yDate=[];
        for(var i=0;i<barData.length;i++){
            xDate.push(barData[i].xData);
            yDate.push(barData[i].value);
        }
        const option = {
            color: ['#3398DB'],
            tooltip: {
                // trigger: 'axis',
                // axisPointer: {
                //     type: 'shadow'
                // },
                // formatter: function (params) {
                //     const {selectedValueList}=that.state;
                //     let date = '';
                //     if (params[0].value !== selectedValueList[Object.keys(selectedValueList)[0]]) {
                //         var temp = {};
                //         for (let i = 0; i < legend.length; i++) {
                //             temp[params[i].seriesName] = params[i].value;
                //             date = params[i].name;
                //         }
                //         that.setState({
                //             selectedValueList: temp,
                //             selectedDate: date,
                //             updateFlag: false
                //         });
                //     }
                //     var format = params[0].seriesName+':'+params[0].value+unit;
                //     for(var i=1; i<params.length; i++) {
                //         format += '<br>';
                //         format += params[i].seriesName+':'+params[i].value+unit;
                //     }
                //     return format;
                // }

            },
            toolbox: {
                show: true,
                feature: {
                    // dataView: {show: true, readOnly: false},
                    magicType: {show: true, type: ['line', 'bar']},
                    restore: {show: true},
                    // saveAsImage : {show: true}
                },
                top: '20px',
                right:'0px',

            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },

            xAxis: [
                {
                    type:'category',
                    data:xDate,
                    axisTick:{
                        alignWithLabel:true
                    },
                    axisLabel:{
                        interval:0
                    }

                }
            ],
            yAxis: [{
                type: 'value'
            }],
            series:[{
                type:'bar',
                barWidth:'60%',
                data:yDate
            }]
        };

        return option;
    }
    prev (value){

        // var summaryIndex = this.state.summaryIndex;
        value++;
        this.setState({
            summaryIndex: value >= 0 ? value : 0
        });
    }
    next (value){

        const {data}=this.props;
        let l = Object.keys(data.valueList).length;
        // var summaryIndex = this.state.summaryIndex;
        value--;
        this.setState({
            summaryIndex: value <= l-1 ? value : l-1
        });
        // console.log(value)
    }
    getContent = (data, legend)=> {
        const {selectedValueList, selectedDate,summaryIndex,updateFlag,value,isEmpty}=this.state;
        let l = 1;
        if(data.valueList){
           l = Object.keys(data.valueList).length;
        }
        const type = data.type;
        switch (type) {
            case '单指标':
                return (
                    <div>
                        <div style={{width: '100%', textAlign: 'center', borderBottom: '1px solid #f3f3f3', height: '23px', lineHeight: '23px'}}>
                            {  selectedDate|| data.xData[0]}
                        </div>
                        <div>
                            <div style={{textAlign: 'center', color: '#3398db', display: 'flex', justifyContent: 'center', height: 40}}>
                                {
                                    isEmpty? null:
                                    (legend.map((item, index)=>
                                        <div key={index} style={{margin:'5px 10px'}}>

                                            {
                                                    legend.length ==2 ?
                                                    <div>
                                                        <span style={{fontSize: '28px', lineHeight: '32px'}}>{selectedValueList[item]||data.yData[item][0]}</span>
                                                        <span style={{fontSize: '12px', lineHeight: '36px'}}>{data.unit}</span><br/>
                                                        <span style={{color: '#aaa', whiteSpace: 'nowrap', textAlign: 'center', margin: '0px'}}>{item}</span>
                                                    </div> :
                                                    (
                                                        legend.length ==3 ?
                                                        <div>
                                                            <span style={{fontSize: '20px', lineHeight: '32px'}}>{selectedValueList[item]||data.yData[item][0]}</span>
                                                            <span style={{fontSize: '12px', lineHeight: '36px'}}>{data.unit}</span><br/>
                                                            <span style={{color: '#aaa', whiteSpace: 'nowrap', textAlign: 'center', margin: '0px'}}>{item}</span>
                                                        </div>:
                                                        <div>
                                                            <span style={{fontSize: '36px', lineHeight: '48px'}}>{selectedValueList[legend[index]]||data.yData[item][0]}</span>
                                                            <span style={{fontSize: '12px', lineHeight: '64px'}}>{data.unit}</span>
                                                        </div>
                                                     )
                                            }

                                        </div>
                                        )
                                    )
                                }
                            </div>

                            <div style={{height:'calc(100% - 100px)',margin: '-30px 15px 0px 5px'}}>
                                {/*<ECharts style={{width: '100%', height: '100%'}}*/}
                                         {/*option={this.getOption(legend, data.xData, data.yData)}*/}
                                         {/*notMerge={true}*/}
                                {/*/>*/}
                                {/*<ChartTest update={updateFlag}  option={this.getOption(legend, data.xData, data.yData, data.unit)}/>*/}
                                {
                                    !isEmpty?
                                    <ChartTest period={value}  option={this.getOption(legend, data.xData, data.yData, data.unit)}/>:
                                    <div style={{textAlign:'center',fontSize:'24px',color:'gray',marginTop:'50px'}}>暂无数据！</div>
                                }

                            </div>
                        </div>
                    </div>
                )
                break;
            case '指标概览':
                // console.log('Object.keys(data.valueList)[summaryIndex]',Object.keys(data.valueList)[summaryIndex]);
                return (
                    <div>
                        <div style={{display:"flex",justifyContent:'center',height: '23px',borderBottom: '1px solid #f3f3f3'}}>
                            {/*<botton style={{textAlign: 'center'}} onClick={this.prev.bind(this,summaryIndex)} >上一个</botton>*/}
                            {
                                summaryIndex !=l-1?
                                <IconButton onTouchTap={ this.prev.bind(this,summaryIndex)} style={{marginTop:'-12px'}}>
                                    <Left color={this.context.muiTheme.palette.accent1Color}/>
                                </IconButton>:
                                    <div style={{width:'48px',height:'48px',textAlign:'center'}}>
                                        <Left />
                                    </div>

                            }
                            <div style={{
                                width: '20%',
                                textAlign: 'center',
                                lineHeight: '23px'
                            }}>
                                {Object.keys(data.valueList)[Object.keys(data.valueList).length-1-summaryIndex]}
                            </div>
                            {
                                summaryIndex!=0?

                                    <IconButton onTouchTap={ this.next.bind(this,summaryIndex)} style={{marginTop:'-12px'}}>
                                        <Right color={this.context.muiTheme.palette.accent1Color}/>
                                    </IconButton>:
                                    <div style={{width:'48px',height:'48px',textAlign:'center'}}>
                                        <Right />
                                    </div>
                            }
                            {/*<div style={{width:'40%',textAlign: 'center'}} onClick={this.next.bind(this,summaryIndex)}>下一个</div>*/}
                        </div>

                        <div style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            justifyContent: 'center',
                            alignItems: 'center',
                            minHeight: 260,
                            marginBottom: 20
                        }}>
                            {
                                Object.keys(data.valueList).length>0?
                                data.valueList[Object.keys(data.valueList)[Object.keys(data.valueList).length-1-summaryIndex]].map((item, key)=>
                                    <div key={key} style={{
                                        textAlign: 'center',
                                        color: '#3398db',
                                        //marginTop: '15px',
                                        fontWeight: '700',
                                        //padding: '0 20px',
                                        width: 120,
                                        //display:'flex',
                                        //flexDirection:'column'
                                    }}>
                                        <span style={{fontSize: '24px'}}>{item.value}</span>
                                        <span>{item.unit}</span>
                                        <p style={{
                                            color: '#aaa',
                                            whiteSpace: 'nowrap',
                                            margin: '0px',
                                        }}>{item.valueName}</p>
                                    </div>
                                ):null
                            }
                        </div>
                    </div>
                )

                break;
            case '词云':
                return (
                    <div style={{height: 300, margin: '10px'}}>

                        { this.props.shopsId > 0 ?
                            <ECharts option={this.getOption_WordCloud(data.shopLabelData,1)}/>
                            :
                            null

                        }

                        { this.props.usersId > 0 ?
                        <ECharts option={this.getOption_WordCloud(data.SinglePortrait,0)}/>
                            :
                        null


                        }


                    </div>
                )
                break;
            case '地图':
                return (
                    <div style={{height:300,margin:'10px'}}>
                        <ECharts option={this.getOption_Map(data.data,this.props.shopData)} style={{height:265}} />
                    </div>
                    //http://gallery.echartsjs.com/editor.html?c=xryZmn6Axg
                )
                break;
            case '柱状图':
                return (
                    <div>
                        <div style={{display:"flex",justifyContent:'center',height: '23px',borderBottom: '1px solid #f3f3f3'}}>
                            {
                                summaryIndex && summaryIndex!=0?
                                    <IconButton onTouchTap={ this.prev.bind(this,summaryIndex)} style={{marginTop:'-12px'}}>
                                        <Left color={this.context.muiTheme.palette.accent1Color}/>
                                    </IconButton>:
                                    <div style={{width:'48px',height:'48px',textAlign:'center'}}>
                                        <Left />
                                    </div>

                            }
                            <div style={{
                                width: '20%',
                                textAlign: 'center',
                                lineHeight: '23px'
                            }}>
                                {Object.keys(data.valueColumn)[summaryIndex]}
                            </div>
                            {
                                summaryIndex && summaryIndex !=l-1?
                                    <IconButton onTouchTap={ this.next.bind(this,summaryIndex)} style={{marginTop:'-12px'}}>
                                        <Right color={this.context.muiTheme.palette.accent1Color}/>
                                    </IconButton>:
                                    <div style={{width:'48px',height:'48px',textAlign:'center'}}>
                                        <Right />
                                    </div>
                            }

                        </div>
                        <div style={{height:'calc(100% - 100px)',margin: '-10px 5px 0px'}}>
                            <ECharts style={{width:'100%',height:'100%'}} option={this.getOption_Bar(data.valueColumn[Object.keys(data.valueColumn)[0]])}/>
                        </div>
                    </div>
                )
                break;
        }
    }
    handleEvent = (event, picker) => {

        const {data,dispatch} = this.props;
        this.setState({
            fromDate: picker.startDate,
            toDate: picker.endDate,
            updateFlag: true
        });

        const {value} = this.state;
        if (data.dispatchFunc != '' && data.dataPropName != '') {
            if (loadData[data.dispatchFunc]) {
                const fromDate = picker.startDate.format('YYYY-MM-DD');
                const toDate = picker.endDate.format('YYYY-MM-DD');
                if(data.dispatchFunc == 'SingleShopOrder' || data.dispatchFunc == 'SingleShopSales'){
                    dispatch(loadData[data.dispatchFunc](fromDate, toDate, value==0?'day':value==1?'week':'month',this.props.shopsId));
                    // console.log('shopsId',this.props.shopsId)
                }else if (data.dispatchFunc == 'SingleUserConsumptionCurve' ) {
                    dispatch(loadData[data.dispatchFunc](fromDate, toDate, value == 0 ? 'day' : value == 1 ? 'week' : 'month',this.props.usersId));

                }
                else{
                    dispatch(loadData[data.dispatchFunc](fromDate, toDate, value==0?'day':value==1?'week':'month'));
                }

            }
        }
    }


    // handleChangeFromDate = (event, date) => {

    //     this.setState({
    //         fromDate: date,
    //         minDate: date
    //     });
    //     const { dispatch , data } = this.props;
    //     const { toDate} = this.state;
    //     if (data.dispatchFunc != '' && data.dataPropName != '') {
    //         if (loadData[data.dispatchFunc]) {
    //             // dispatch(loadData[data.dispatchFunc](date, toDate, 'day'));
    //             dispatch(loadData[data.dispatchFunc](this.changeDateFormat(date), this.changeDateFormat(toDate), 'day'));
    //
    //         }
    //     }
    // };
    // handleChangeToDate = (event, date) => {

    //     this.setState({
    //         toDate: date,
    //         maxDate: date
    //     });
    //
    //     const { dispatch , data } = this.props;
    //     const { fromDate} = this.state;

    //     if (data.dispatchFunc != '' && data.dataPropName != '') {
    //         if (loadData[data.dispatchFunc]) {
    //             // dispatch(loadData[data.dispatchFunc](fromDate, date, 'day'));
    //
    //             dispatch(loadData[data.dispatchFunc](this.changeDateFormat(fromDate), this.changeDateFormat(date), 'day'));
    //         }
    //     }
    // };
    // changeDateFormat = (date) => {
    //     var newdate = '';
    //     newdate += date.getFullYear();
    //     if((date.getMonth()+1)<10) {
    //         newdate += ('0' + (date.getMonth()+1));
    //     } else {
    //         newdate += date.getMonth()+1;
    //     }
    //     newdate += date.getDate();
    //     return newdate;
    // }

    render() {
        let data=this.props.data;
        const {reducerProps,dispatch,index} = this.props;
        var opens = index%2===0 ? 'right' : 'left'
        const {value}=this.state;
        let fromDate = this.state.fromDate.format('YYYY-MM-DD');
        let toDate = this.state.toDate.format('YYYY-MM-DD');
        let label = fromDate + ' 至 ' + toDate;//{fromDate}至{toDate} | 过去7天
        if(reducerProps[data.dataPropName])
            data=Object.assign(data, reducerProps[data.dataPropName]);
        // console.log('data',data);

        const {isShowTime} = this.state;
        let legend = [], title = '';
        title = data.name;
        const dateSelect = data.dateSelect;
        // console.log('',dateSelect);
        if (data.type == '单指标') {
            legend = Object.keys(data.yData);
        }
        let locale = {
            "format": 'YYYY-MM-DD',
            "separator": " -222 ",
            "applyLabel": "确定",
            "cancelLabel": "取消",
            "fromLabel": "起始时间",
            "toLabel": "结束时间'",
            "customRangeLabel": "自定义",
            "weekLabel": "W",
            "daysOfWeek": ["日", "一", "二", "三", "四", "五", "六"],
            "monthNames": ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
        };

        return (
            <Paper style={{height:'100%'}}>

                <header style={{
                    display: 'flex',
                    padding: '6px 10px 0px 10px',
                    cursor: 'move',
                    transition: 'background 0.2s',
                    borderBottom: '1px solid #ececee',
                    //backgroundColor:this.context.muiTheme.palette.primary1Color
                }}>

                    <div style={{flex: 4}}>
                        <div style={{
                            fontSize: '16px',
                            lineHeight: '24px',
                            color: '#4c535a',
                            fontWeight: 700
                        }}>
                            <p style={{margin: '0 0 0 16px'}}>{title}</p>

                        </div>
                        {
                            isShowTime ?
                                <DatetimeRangePicker startDate={this.state.fromDate} endDate={this.state.toDate}
                                                     ranges={this.state.ranges}
                                                     alwaysShowCalendars={true}
                                                     onApply={this.handleEvent} locale={locale} opens={opens}>
                                    <Button className="selected-date-range-btn" style={{
                                        width: '68%', border: 'none',
                                        color: this.context.muiTheme.palette.accent1Color
                                    }}>
                                        <div className="pull-left">
                                            <i className="fa fa-calendar"/>
                                            &nbsp;
                                            <span>
                                    {label}
                                </span>
                                        </div>
                                        <div className="pull-right">
                                            <i className="fa fa-angle-down"/>
                                        </div>
                                    </Button>
                                </DatetimeRangePicker>:
                                <div style={{height:'32px',padding:'6px 0',width:'68%'}}></div>
                        }
                    </div>

                    {/*<div style={{display:'flex'}}>*/}
                        {/*<DatePicker*/}
                            {/*style={{minWidth: '50px',width:'50%',overflow:'hidden'}}*/}
                            {/*textFieldStyle={{width:'50%'}}*/}
                            {/*hintText="开始日期"*/}
                            {/*autoOk={true}*/}
                            {/*maxDate={this.state.maxDate}*/}
                            {/*value={fromDate}*/}
                            {/*onChange={this.handleChangeFromDate}*/}
                        {/*/>*/}
                        {/*<DatePicker*/}
                            {/*style={{minWidth: '50px',width:'50%',overflow:'hidden'}}*/}
                            {/*textFieldStyle={{width:'50%'}}*/}
                            {/*hintText="结束日期"*/}
                            {/*autoOk={true}*/}
                            {/*minDate={this.state.minDate}*/}
                            {/*value={toDate}*/}
                            {/*onChange={this.handleChangeToDate}*/}
                        {/*/>*/}
                    {/*</div>*/}

                    {
                        isShowTime ?
                        <div style={{flex: 'none', margin: '-8px 0 0 33px'}}>
                            <DropDownMenu underlineStyle={{borderColor: 'transparent'}}
                                          labelStyle={{color: this.context.muiTheme.palette.accent1Color}}
                                          value={value}
                                          onChange={(obj,value)=>{
                                              this.setState({
                                                  value,
                                                  updateFlag:true,
                                                  selectedDate: '',
                                              });
                                              if (data.dispatchFunc != '' && loadData[data.dispatchFunc]) {
                                                  if(data.dispatchFunc == 'SingleShopOrder' || data.dispatchFunc == 'SingleShopSales'){
                                                      dispatch(loadData[data.dispatchFunc](fromDate, toDate, value==0?'day':value==1?'week':'month',this.props.shopsId));
                                                  }else if(data.dispatchFunc == 'SingleUserConsumptionCurve'){
                                                      dispatch(loadData[data.dispatchFunc](fromDate, toDate, value == 0 ? 'day' : value == 1 ? 'week' : 'month', this.props.usersId));
                                                  } else{
                                                      dispatch(loadData[data.dispatchFunc](fromDate, toDate, value==0?'day':value==1?'week':'month'));
                                                  }
                                              }
                                          }}
                            >
                                <MenuItem value={0} primaryText="按天"/>
                                <MenuItem value={1} primaryText="按周"/>
                                <MenuItem value={2} primaryText="按月"/>
                            </DropDownMenu>
                        </div>:null
                    }

                </header>

                {
                    this.getContent(data, legend)
                }
            </Paper>
        );
    }
}
Chart.contextTypes = {
    muiTheme: React.PropTypes.object,
}

const mapStateToProps = (state) => {
    const { databaseReducer } = state;
    return {
        reducerProps: databaseReducer,
        loaded:databaseReducer.loaded
    };
};

export default connect(
    mapStateToProps
)(Chart);
class ChartTest extends React.Component
{
    shouldComponentUpdate = (nextProps = {}, nextState = {}) => {
        const thisProps = this.props || {};

        // if(thisProps.period != nextProps.period)
        //     return true;
        //
        // return false;

        if(thisProps.option.series[0].data != nextProps.option.series[0].data)
            return true;

        return false;
        // return thisProps.update;
    }
    render( )
    {
        const {option}=this.props;


        return (
            <ECharts style={{width: '100%', height: '100%'}}
                     option={option}
                     notMerge={true}/>
        )
    }
}

