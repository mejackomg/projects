import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import IconButton from 'material-ui/IconButton';
import withWidth, {LARGE, MEDIUM,SMALL}  from '../../../utils/withWidth';
import MoreVert from 'material-ui/svg-icons/navigation/more-vert.js'
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import { connect } from 'react-redux';
import SwipeableViews from 'react-swipeable-views';
import CircularProgress from 'material-ui/CircularProgress';
import {loadShopOverview,loadShopMap,loadShopTop} from '../../../reducers/database.js';
import Paper from 'material-ui/Paper';
// import ECharts from 'react-echarts';
import ECharts from '../../../components/ECharts.js';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import BoxOfficeMarket from './BoxOfficeMarket.jsx'

import React ,{ Component, PropTypes } from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
class ShopsSurvey extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isChart:true,
            tabIndex:0,
            value_radio:'day'
        };
    }

    componentDidMount () {
        const { dispatch} = this.props;

        dispatch(loadShopOverview());
        dispatch(loadShopMap());
        dispatch(loadShopTop());
    };

    /*formatNum = (num) => {
     var str = num +''
     var newStr = "";
     var count = 0;
     var strarr = str.split('.');
     for(var i=strarr[0].length-1;i>=0;i--){
     if(count % 3 == 0 && count != 0){
     newStr = str.charAt(i) + "," + newStr;
     }else{
     newStr = str.charAt(i) + newStr;
     }
     count++;
     }
     if(str.indexOf(".")==-1){
     str = newStr;
     } else {
     str = newStr + '.' + strarr[1];
     }
     return str;
     };*/

     changeFormat = (num) =>{
     let str="";
     let nn=num + '';
     str= nn.split('.');
     var n0=str[0];
     var n1=str[1];
     var n00=n0 + '';
     var n11=n1 +'';
     var n12=n11.substring(0,2);
     str=n0 + '.' + n12;
     return str;
     }

    changeNum = (num) =>{
        let str="";
        if(num>10000){
            let n=num/10000;
            let nn=n + '';
            str= nn.split('.');
            var n0=str[0];
            var n1=str[1];
            var n00=n0 + '';
            var n11=n1 +'';
            var n12=n11.substring(0,2);
            str=n0 + '.' + n12+ '万';
        } else{
            str=num +'';
        }
        var newStr = "";
        var count = 0;
        var strarr = str.split('.');
        for(var i=strarr[0].length-1;i>=0;i--){
            if(count % 3 == 0 && count != 0){
                newStr = str.charAt(i) + "," + newStr;
            }else{
                newStr = str.charAt(i) + newStr;
            }
            count++;
        }
        if(str.indexOf(".")==-1){
            str = newStr;
        } else {
            str = newStr + '.' + strarr[1] ;
        }
        return str;
    }
    changeNum_null = (num) =>{

        if(num>10000){
            num=num/10000;
        }
        return num.toFixed(2);
    }
    getOption1(){
        //雷达图
        const {shopTopData} = this.props;
        // console.log('shopTopData',shopTopData);
        var option = null;
        if(shopTopData.length > 0) {
            let shopTopArr = [];
            let shopTopIndicator = [];
            for(var i=0; i<shopTopData.length; i++) {
                shopTopArr.push(this.changeNum_null(shopTopData[i].total_money));
                shopTopIndicator.push(shopTopData[i].type_name);
            }
            // console.log('shopTopArr',shopTopArr)
            option = {
                // backgroundColor: '#404a59',
                title: {
                    text: 'Top6总体销量  单位（万）',
                    x: 'center',
                    textStyle: {
                        color: '#404a59'
                    }
                },
                tooltip: {
                    trigger: 'item'
                },
                dataRange: {
                    show: false,
                    min : 0,
                    max : 12,
                    calculable : true,
                    color: ['#50a3ba'],
                    y:'center',
                },

                xAxis: [
                    {
                        type: 'category',
                        show: false,
                        data: shopTopIndicator
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        show: false
                    }
                ],
                series: [
                    {
                        name: 'TOP前六商铺',
                        type: 'bar',
                        barGap: 0.1,
                        barCategoryGap: 0.01,
                        itemStyle: {
                            normal: {
                                color: function(params) {
                                    var colorList = [
                                        '#FCCE10','#E87C25','#27727B',
                                        '#FE8463','#9BCA63','#FAD860','#F3A43B','#60C0DD',
                                        '#D7504B','#C6E579','#F4E001','#F0805A','#26C0C0'
                                    ];
                                    return colorList[params.dataIndex]
                                },
                                label: {
                                    show: true,
                                    position: 'top',
                                    formatter: '{b}\n{c}'
                                },
                                shadowBlur: 80,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        },
                        data: shopTopArr
                    }
                ]
            };
            // option = {
            //     title: {
            //         text: 'TOP前六商铺',
            //         x:'center'
            //     },
            //     legend: {
            //         y: 'top',
            //         top:'20px',
            //         data: [ '销售额']
            //     },
            //     tooltip: {},
            //     xAxis:  {
            //         type: 'value'
            //     },
            //     yAxis: {
            //         type: 'category',
            //         data: shopTopIndicator
            //     },
            //     series: [
            //         {
            //             name: '搜索引擎',
            //             type: 'bar',
            //             label: {
            //                 normal: {
            //                     show: true,
            //                     position: 'insideRight'
            //                 }
            //             },
            //             data: shopTopArr
            //         }
            //     ]
            // }
        }
        return option;
    };

    getOption2(){
        //饼状图
        const {shopGrade} = this.props;
        //测试数据
        var option = null;
        if(shopGrade.length > 0) {
            var legend = [];
            var shopGradeData = [];
            for(var key in shopGrade[0]) {
                legend.push(key);
                shopGradeData.push({value:shopGrade[0][key],name:key});
            }

            var option = {
                // title : {
                //     text: '信用的分级占比',
                //     x:'center',
                //     textStyle:{
                //         fontSize:'13px'
                //     }
                // },
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} :{d}%"
                },
                // legend: {
                //     y: 'bottom',
                //     top:'20px',
                //     data: legend
                // },
                series: [{
                    name: '商户信用占比',
                    type: 'pie',
                    radius : '65%',
                    center: ['50%', '60%'],
                    data:shopGradeData,
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }]
            };
        }
        return option;
    };

    getOption3(){
        //实时信用
        const {shopAvgCredit} = this.props;
        var option = null;
        // var data = [shopAvgCredit,100-shopAvgCredit];
        option = {
            // tooltip : {
            //     trigger: 'item',
            //     formatter: "{a} <br/>{b} : {d}%"
            // },
            legend: {
                orient: 'vertical',
                left: 'left',
                data: ['']
            },
            series : [
                {
                    type: 'pie',
                    radius : ['60%', '80%'],
                    label: {
                        normal: {
                            position: 'center'
                        }
                    },
                    data:[
                        {
                            value:shopAvgCredit,
                            name:'占有率',
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
                            value:100-shopAvgCredit,
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
        };
        return option;

    };
    getOption4() {
        //历史曲线
        const {shopHistoryData,shopAvgCreditW,shopAvgCreditM} = this.props;
        var data,type = 'bar',dataZoom = [];
        if(this.state.value_radio=='week'){
            data = shopAvgCreditW;
        }else if(this.state.value_radio =='month'){
            data = shopAvgCreditM;
        }else if(this.state.value_radio=='day'){
            data = shopHistoryData;
            type = 'line';
            dataZoom = [{
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
            }];
        }
        var option = null;
        // console.log(data);
        if(data.dateList) {
            option = {
                title: {
                    text: '',
                    subtext: ''
                },
                grid: {
                    left: '77px',
                    right: '80px',
                    //bottom:'5%',
                    //containLabel: true
                },
                tooltip: {
                    trigger: 'axis',
                    position: function (pt) {
                        return [pt[0], '10%'];
                    },
                    formatter: function (params) {
                        // console.log('shopsSurvey',params)
                        if(!params[0].name) {
                            return;
                        }
                        return params[0].name + '<br/>' + params[0].value + '%';
                    }
                },
                legend: {
                    data: []
                },
                toolbox: {
                    show: false,
                    feature: {
                        // dataView: {show: true, readOnly: false},
                        magicType: {show: true, type: ['line', 'bar']},
                        restore: {show: true},
                        saveAsImage: {show: true}
                    }
                },
                calculable: true,
                xAxis: [
                    {
                        type: 'category',
                        // boundaryGap: false,
                        data: data.dateList
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        boundaryGap: []
                    }
                ],
                dataZoom:dataZoom,
                series: [
                    {
                        name: '蒸发量',
                        type: type,
                        data: data.valueList.map((value, index)=> {
                            return value.toFixed(2);
                        }),
                        label: {
                            emphasis: {
                                show: true,
                                shadowColor: 'rgba(0,0,0,0.5)',
                                barBorderWidth: 1,
                                shadowBlur: 10
                            }
                        },
                        markPoint: {
                            data: [
                                {type: 'max', name: '最大值'},
                                {type: 'min', name: '最小值'}
                            ]
                        },
                        markLine: {
                            data: [
                                {type: 'average', name: '平均值'}
                            ]
                        }
                    }
                ]
            };
        }
        return option;
    }
    getOption5(){
        //商户分布地图
        const {shopMapData} = this.props;
        var mapData = [];
        for(var i=0; i<shopMapData.length; i++) {
            mapData.push({
                name:shopMapData[i].shopsid,
                value:[this.changeFormat(shopMapData[i].longitude), this.changeFormat(shopMapData[i].latitude), shopMapData[i].times]
            });
        }
        var option = null;
        if(true){
            option = {
                backgroundColor: '#404a59',
                title: {
                    text: '商户总体销量',
                    left: 'center',
                    textStyle:{
                        color:'#fff'
                    }
                },
                tooltip : {
                    trigger: 'item'
                },
                geo: {
                    type:'map',
                    map: 'china',
                    mapType:'china',
                    selectedMode:'multiple',
                    label: {
                        normal:{
                            show:true
                        },
                        emphasis: {
                            show: false
                        }
                    },
                    roam: true,
                    itemStyle: {
                        normal: {
                            areaColor: '#323c48',
                            borderColor: '#111'
                        },
                        emphasis: {
                            areaColor: '#2a333d'
                        }
                    }
                },
                series : [
                    {
                        name: '商户分布',
                        type: 'scatter',
                        coordinateSystem: 'geo',
                        data: mapData,
                        symbolSize: function (val) {
                            return val[2] / 10;
                        },
                        label: {
                            normal: {
                                formatter: '{b}',
                                position: 'right',
                                show: false
                            },
                            emphasis: {
                                show: true
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: '#ddb926'
                            }
                        }
                    },
                    {
                        name: 'Top 5',
                        type: 'effectScatter',
                        coordinateSystem: 'geo',
                        data: mapData.slice(0, 5),
                        // sort(function (a, b) {
                        //     return b.value - a.value;
                        // }).slice(0, 5),
                        symbolSize: function (val) {
                            return val[2] / 10;
                        },
                        showEffectOn: 'render',
                        rippleEffect: {
                            brushType: 'stroke'
                        },
                        hoverAnimation: true,
                        label: {
                            normal: {
                                formatter: '{b}',
                                position: 'right',
                                show: true
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: '#f4e925',
                                shadowBlur: 10,
                                shadowColor: '#333'
                            }
                        },
                        zlevel: 1
                    }
                ]
            };
        }
        return option;
    }

    handleChange = (event, index, value) => this.setState({value});

    getStyle=()=>{
        const styles={
            thumbOff: {
                backgroundColor:  this.context.muiTheme.palette.accent1Color,
            },
            trackOff: {
                backgroundColor: 'gray',
            },
            thumbSwitched: {
                backgroundColor:  this.context.muiTheme.palette.accent1Color,
            },
            trackSwitched: {
                backgroundColor: 'gray',
            },
            labelStyle: {
                color: 'red',
            },
            clear:{
                display:'block',
                clear:'both'
            },
            tabs:{
                // color:'#fff',
                // background:'#333',
                fontSize:'12px'
            },
            radioButton: {
                width: 16,
                marginRight:'10px'
            }
        }
        return styles;
    };

    // onToggle=(event,value)=>{
    //     this.setState({isChart:!value})
    // }

    handleChange_Tab=(value)=>{
        if(value !== 0 || value !== 1 || value !== 2){
            return;
        }
        this.setState({tabIndex:value})
    }
    handleChangeRadio = (event, value) =>{
        this.setState({
            value_radio :value
        });
    };
    render() {

        const styles = this.getStyle();
        const {shopAvgCredit,shopWordData} = this.props;
        // console.log(shopWordData.length);

        //处理雷达图数据
        var option1 = this.getOption1();
        //处理饼状图数据
        var option2 = this.getOption2();
        //处理环形图数据
        var option3 = this.getOption3();
        //处理历史数据
        var option4 = this.getOption4();
        //处理地图数据
        var option5 = this.getOption5();

        return (
            <div>
                <Paper zDepth={2}>
                    <Toolbar>
                        <ToolbarGroup>
                            <ToolbarTitle text="商户信用概览"/>
                        </ToolbarGroup>
                    </Toolbar>
                    <div style={{display:'flex',padding:'20px'}}>
                        <div style={{width:'70%',marginRight:'10px',paddingBottom:'15px'}}>
                            <div style={{height:'30px',lineHeight:'30px',textAlign:'center'}}>商户信用历史曲线</div>
                            <div style={{position:'relative',height:'45px'}}>
                                <RadioButtonGroup name="shipSpeed" defaultSelected="day" onChange={this.handleChangeRadio}
                                                  style={{display:'flex',flexDirection:'row',position:'absolute',left:'calc(50% - 100px)',top:'2px'}}>
                                    <RadioButton
                                        value="day"
                                        label="天"
                                        style={styles.radioButton}
                                    />
                                    <RadioButton
                                        value="week"
                                        label="周"
                                        style={styles.radioButton}
                                    />
                                    <RadioButton
                                        value="month"
                                        label="月"
                                        style={styles.radioButton}
                                    />
                                </RadioButtonGroup>
                            </div>
                            <ECharts style={{height: 350,marginTop:'-50px'}} option={option4}/>
                        </div>
                        <div style={{width:'29%',height:400}}>
                            <div style={{width:'100%',marginBottom:'10px'}}>
                                <ECharts style={{height:'200px'}} option={option2}/>
                            </div>
                            <div style={{width:'100%'}}>
                                <ECharts style={{height:'200px'}} option={option3}/>
                            </div>
                        </div>
                    </div>
                </Paper>
                <Paper zDepth={2} style={{marginTop:"30px"}}>
                    <Toolbar>
                        <ToolbarGroup>
                            <ToolbarTitle text="商户日平均销量"/>
                        </ToolbarGroup>
                    </Toolbar>
                    <div style={{display:'flex'}}>
                        <ECharts style={{height:'300px',width:'70%'}} option={option1}/>
                        <div style={{display:'flex',flexDirection:'row',margin:'0 auto',width:'30%',flexWrap:'wrap',marginLeft:'-20px'}}>

                            {
                                shopWordData.length < 0 ?
                                    <div style={{display: 'flex', justifyContent: 'center'}}>
                                        <CircularProgress style={{margin: 80}} size={1.5}/>
                                    </div>:
                                    shopWordData.map((item,key)=>
                                        <div key={key} style={{width: '49.5%'}}>
                                            <div style={{
                                                textAlign: 'center',
                                                color: '#3398db',
                                                marginTop: '15px',
                                                fontWeight: '700'
                                            }}>
                                                <span style={{fontSize: '16px'}}>{this.changeNum(item.value)}</span>
                                            </div>
                                            <p style={{
                                                color: '#aaa',
                                                whiteSpace: 'nowrap',
                                                textAlign: 'center',
                                                margin: '0px'
                                            }}>
                                                {item.name}
                                            </p>
                                        </div>)
                            }
                        </div>
                    </div>
                    <div style={{padding:'0 20px 20px',marginTop:'-20px'}}>
                        {this.props.shopMapData.length >0 ?
                            <ECharts style={{height: 300}} option={option5}/>
                            :
                            <div style={{textAlign:'center', backgroundColor: '#404a59',height: 300}}>
                                <div style={{color:'#fff',fontSize: '20px',fontWeight:'bold'}} >商户总体销量分布图</div>
                                <div style={{marginTop:'80px',color:'#fff',fontSize: '24px'}}>暂无数据!</div>
                            </div>
                        }
                    </div>

                </Paper>
            </div>
        );
    }
}

ShopsSurvey.contextTypes = {
    muiTheme: React.PropTypes.object,
}

ShopsSurvey.propTypes = {
    dispatch:PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
    const { databaseReducer } = state;
    return {
        shopWordData:databaseReducer.shopWordData,
        shopHistoryData:databaseReducer.ShopOverviewData.shopHistoryData,
        shopAvgCreditW:databaseReducer.ShopOverviewData.shopAvgCreditW,
        shopAvgCreditM:databaseReducer.ShopOverviewData.shopAvgCreditM,
        shopMapData:databaseReducer.shopMapData,
        shopGrade:databaseReducer.ShopOverviewData.shopGrade,
        shopAvgCredit:databaseReducer.ShopOverviewData.shopAvgCredit,
        shopTopData:databaseReducer.shopTopData,
        loading:databaseReducer.loading,
        loaded:databaseReducer.loaded
    };
};
export default connect(
    mapStateToProps
)(withWidth( )(ShopsSurvey));