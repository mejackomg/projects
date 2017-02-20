/**
 * Created by Administrator on 2016-11-01.
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import SwipeableViews from 'react-swipeable-views';

import ActiveTheme from '../../../mui-themes/active-theme.js';
import getMuiTheme from '../../../../node_modules/material-ui/styles/getMuiTheme';
import withWidth, {LARGE, MEDIUM,SMALL}  from '../../../utils/withWidth';

import ECharts from '../../../components/ECharts.js';
import ReactEcharts from 'echarts-for-react';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import {Tabs, Tab} from 'material-ui/Tabs';
import {Card,CardHeader,CardText} from 'material-ui/Card';
import Paper from 'material-ui/Paper';

import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import DatePicker from 'material-ui/DatePicker';

import CustomTable from './CustomTable.jsx';
import Chart from '../../../components/Chart';

import {
    colors,
    spacing,
    typography
} from 'material-ui/styles';
import { loadSaleAnalysis} from '../../../reducers/database.js';

const data = [
    {
        title:'商户销售额',
        xDate:['11-9','11-10','11-11','11-12','11-13','11-14','11-15'],
        yDate: {
            '商户销售额':[120, 132, 101, 134, 90, 230, 210]
        }
    },
    {
        title:'商户信用值',
        xDate:['11-9','11-10','11-11','11-12','11-13','11-14','11-15'],
        yDate: {
            '商户信用值': [120, 132, 101, 134, 90, 230, 210]
        }
    },
    {
        title:'用户数',
        xDate:['11-9','11-10','11-11','11-12','11-13','11-14','11-15'],
        yDate:{
            '用户数':[120, 132, 101, 134, 90, 230, 210]
        }
    },
    {
        title:'订单数',
        xDate:['11-9','11-10','11-11','11-12','11-13','11-14','11-15'],
        yDate:{
            '订单数':[120, 132, 101, 134, 90, 230, 210]

        }
    }
]


class ShopsData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 1,
            name1: '16,247',
            name2: '16,287',
            name3: '15,852'
        };


    }

    componentDidMount() {
        // const { dispatch , shopsId } = this.props;
        // // const {radioIndex} = this.state;
        // dispatch(loadSaleAnalysis(shopsId));
    }

    getStyles() {
        const styles = {
            tabs: {
                width: '100%',
                //backgroundColor: 'transparent',
            },
            style: {
                // margin:'0px 72px',
                fontSize: '14px',
                color: '#1565C0',
                clear: 'both',
                // height:500
            },
            radioButton: {
                // flex:1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'

            }

        };
        // if ( this.props.width === MEDIUM || this.props.width === LARGE )
        // styles.content = Object.assign(styles.content, styles.contentWhenMedium);

        return styles;
    }
    handleChange = (event, index, value) => this.setState({value});
    // onChartClick = (param, echart) =>{
    //         console.log(param, echart);
    //         this.setState({
    //             name1:param.value
    //         });
    //         alert('chart click');
    // };

    onChartReady = (echart)=> {
        // console.log('echart is ready', echart);
    }

    render() {
        return (
            <div>
                <header style={{display:'flex',padding:'16px 14px 8px 14px'}}>
                    <span style={{marginRight:'10px',width:'20%',fontSize:'24px',color:'#4c535a'}}>商户数据概况</span>
                    <div style={{width:'7%',margin:'-8px 0 0 33px',border:'1px solid #a8b7c8',borderRudius:'3px'}}>
                        <DropDownMenu value={this.state.value} onChange={this.handleChange}>
                            <MenuItem value={1} primaryText="天" />
                            <MenuItem value={2} primaryText="周" />
                            <MenuItem value={3} primaryText="月" />
                        </DropDownMenu>
                    </div>
                </header>
                <section style={{display:'flex',flexWrap:'wrap',padding:'10px'}}>
                    {data.map((value,index)=>
                        <Chart key={index} onChange={this.handleChange} title={value.title} yData={value.yDate} xData={value.xDate}/>
                    )}
                    <Paper style={{width:'48%',margin:'10px'}}>
                        <article style={{height:'430px'}}>
                            <header
                                style={{display:'flex',padding:'8px 10px',cursor:'move',transition:'background 0.2s',borderBottom:'1px solid #ececee'}}>
                                <div style={{width:'76%'}}>
                                    <div
                                        style={{fontSize:'16px',lineHeight:'24px',maxWidth:'calc(100%-150px)',color:'#4c535a'}}>
                                        <p style={{margin:'0 0 3px 0'}}>今日的商户数据概览</p>
                                    </div>
                                    <div style={{fontSize:'12px',color:'#aaa'}}>
                                        <span>2016-11-14至2016-11-16 | 本周</span>
                                    </div>
                                </div>
                                <div style={{width:'24%',margin:'-8px 0 0 33px'}}>
                                    <DropDownMenu value={this.state.value} onChange={this.handleChange}>
                                        <MenuItem value={0} primaryText="按天"/>
                                        <MenuItem value={1} primaryText="按周"/>
                                        <MenuItem value={2} primaryText="按月"/>
                                    </DropDownMenu>
                                </div>

                            </header>
                            <div style={{}}>
                                <div
                                    style={{width:'100%',textAlign:'center',borderBottom:'1px solid #f3f3f3',height:'23px',lineHeight:'23px'}}>
                                    11-16（三）
                                </div>
                                <div style={{display:'flex',flexDirection:'row',margin:'0 auto',width:'90%'}}>
                                    <div style={{width:'49.5%'}}>
                                        <div style={{textAlign:'center',color:'#3398db',marginTop:'15px',fontWeight:'700'}}>
                                            <span style={{fontSize:'24px'}}>230</span>
                                            <span>次</span>
                                        </div>
                                        <p style={{color:'#aaa',whiteSpace:'nowrap',textAlign:'center',margin:'0px'}}>
                                            商户总数</p>
                                        <div style={{textAlign:'center',color:'#4a90e2',fontWeight:'700',marginTop:'15px'}}>
                                            <span style={{fontSize:'24px'}}>7255</span>
                                            <span>次</span>
                                        </div>
                                        <p style={{color:'#aaa',whiteSpace:'nowrap',textAlign:'center',margin:'0px'}}>
                                            商户总销售额（单位）</p>
                                        <div style={{textAlign:'center',color:'#3398db',marginTop:'15px',fontWeight:'700'}}>
                                            <span style={{fontSize:'24px'}}>123,123</span>
                                            <span>元</span>
                                        </div>
                                        <p style={{color:'#aaa',whiteSpace:'nowrap',textAlign:'center',margin:'0px'}}>
                                            日销售额（单位）</p>
                                        <div style={{textAlign:'center',color:'#3398db',marginTop:'15px',fontWeight:'700'}}>
                                            <span style={{fontSize:'24px'}}>11,245</span>
                                            <span>元</span>
                                        </div>
                                        <p style={{color:'#aaa',whiteSpace:'nowrap',textAlign:'center',margin:'0px'}}>
                                            用户总数</p>
                                        <div style={{textAlign:'center',color:'#3398db',marginTop:'15px',fontWeight:'700'}}>
                                            <span style={{fontSize:'24px'}}>123,123</span>
                                            <span>元</span>
                                        </div>
                                        <p style={{color:'#aaa',whiteSpace:'nowrap',textAlign:'center',margin:'0px'}}>
                                            日用户总数</p>
                                    </div>
                                    <div style={{width:'49.5%'}}>


                                        <div style={{textAlign:'center',color:'#3398db',marginTop:'15px',fontWeight:'700'}}>
                                            <span style={{fontSize:'24px'}}>123,123</span>
                                            <span>元</span>
                                        </div>
                                        <p style={{color:'#aaa',whiteSpace:'nowrap',textAlign:'center',margin:'0px'}}>
                                            平均信用值</p>

                                        <div style={{textAlign:'center',color:'#3398db',marginTop:'15px',fontWeight:'700'}}>
                                            <span style={{fontSize:'24px'}}>123,123</span>
                                            <span>元</span>
                                        </div>
                                        <p style={{color:'#aaa',whiteSpace:'nowrap',textAlign:'center',margin:'0px'}}>
                                            已完成订单数</p>
                                        <div style={{textAlign:'center',color:'#3398db',marginTop:'15px',fontWeight:'700'}}>
                                            <span style={{fontSize:'24px'}}>123,123</span>
                                            <span>元</span>
                                        </div>
                                        <p style={{color:'#aaa',whiteSpace:'nowrap',textAlign:'center',margin:'0px'}}>
                                            待付款订单</p>
                                        <div style={{textAlign:'center',color:'#3398db',marginTop:'15px',fontWeight:'700'}}>
                                            <span style={{fontSize:'24px'}}>123,123</span>
                                            <span>元</span>


                                        </div>
                                        <p style={{color:'#aaa',whiteSpace:'nowrap',textAlign:'center',margin:'0px'}}>
                                            商户优惠实际金额（万元）</p>
                                    </div>
                                </div>
                            </div>
                        </article>
                    </Paper>

                </section>
                {/*<div style={{display:'flex',flexWrap:'wrap'}}>*/}

                    {/*<Paper style={{width:'48%',margin:'10px 0 10px 10px'}}>*/}
                        {/*<article style={{}}>*/}
                            {/*<header*/}
                                {/*style={{display:'flex',padding:'8px 10px',cursor:'move',transition:'background 0.2s',borderBottom:'1px solid #ececee'}}>*/}
                                {/*<div style={{width:'76%'}}>*/}
                                    {/*<div*/}
                                        {/*style={{fontSize:'16px',lineHeight:'24px',maxWidth:'calc(100%-150px)',color:'#4c535a'}}>*/}
                                        {/*<p style={{margin:'0 0 3px 0'}}>商户详细数据总览</p>*/}
                                    {/*</div>*/}
                                {/*</div>*/}
                            {/*</header>*/}

                            {/*<div style={{display:'flex',flexDirection:'row',margin:'10px auto',width:'90%'}}>*/}
                                {/*<div style={{flex:1}}>*/}
                                    {/*<div style={{textAlign:'center',color:'#3398db',marginTop:'15px',fontWeight:'700'}}>*/}
                                        {/*<span style={{fontSize:'24px'}}>12,345</span>*/}
                                        {/*<span>万</span>*/}
                                    {/*</div>*/}
                                    {/*<p style={{color:'#aaa',whiteSpace:'nowrap',textAlign:'center',margin:'0px'}}>*/}
                                        {/*商户总数</p>*/}


                                    {/*<div style={{textAlign:'center',color:'#4a90e2',fontWeight:'700',marginTop:'15px'}}>*/}
                                        {/*<span style={{fontSize:'24px'}}>43,567</span>*/}
                                        {/*<span>万</span>*/}
                                    {/*</div>*/}
                                    {/*<p style={{color:'#aaa',whiteSpace:'nowrap',textAlign:'center',margin:'0px'}}>*/}
                                        {/*商户总销售额</p>*/}


                                    {/*<div style={{textAlign:'center',color:'#3398db',marginTop:'15px',fontWeight:'700'}}>*/}
                                        {/*<span style={{fontSize:'24px'}}>12,670</span>*/}
                                        {/*<span>元</span>*/}
                                    {/*</div>*/}
                                    {/*<p style={{color:'#aaa',whiteSpace:'nowrap',textAlign:'center',margin:'0px'}}>*/}
                                        {/*日销售额</p>*/}
                                {/*</div>*/}

                                {/*<div style={{flex:1}}>*/}
                                    {/*<div style={{textAlign:'center',color:'#3398db',marginTop:'15px',fontWeight:'700'}}>*/}
                                        {/*<span style={{fontSize:'24px'}}>1,560</span>*/}
                                        {/*<span>万</span>*/}
                                    {/*</div>*/}
                                    {/*<p style={{color:'#aaa',whiteSpace:'nowrap',textAlign:'center',margin:'0px'}}>*/}
                                        {/*用户总数</p>*/}


                                    {/*<div style={{textAlign:'center',color:'#4a90e2',fontWeight:'700',marginTop:'15px'}}>*/}
                                        {/*<span style={{fontSize:'24px'}}>2378</span>*/}
                                        {/*<span>人</span>*/}
                                    {/*</div>*/}
                                    {/*<p style={{color:'#aaa',whiteSpace:'nowrap',textAlign:'center',margin:'0px'}}>*/}
                                        {/*日用户总数</p>*/}


                                    {/*<div style={{textAlign:'center',color:'#3398db',marginTop:'15px',fontWeight:'700'}}>*/}
                                        {/*<span style={{fontSize:'24px'}}>0.7</span>*/}

                                    {/*</div>*/}
                                    {/*<p style={{color:'#aaa',whiteSpace:'nowrap',textAlign:'center',margin:'0px'}}>*/}
                                        {/*平均信用值</p>*/}

                                {/*</div>*/}

                                {/*<div style={{flex:1}}>*/}
                                    {/*<div style={{textAlign:'center',color:'#3398db',marginTop:'15px',fontWeight:'700'}}>*/}
                                        {/*<span style={{fontSize:'24px'}}>1,780</span>*/}
                                        {/*<span>万</span>*/}
                                    {/*</div>*/}
                                    {/*<p style={{color:'#aaa',whiteSpace:'nowrap',textAlign:'center',margin:'0px'}}>*/}
                                        {/*已完成订单数</p>*/}


                                    {/*<div style={{textAlign:'center',color:'#4a90e2',fontWeight:'700',marginTop:'15px'}}>*/}
                                        {/*<span style={{fontSize:'24px'}}>12</span>*/}
                                        {/*<span>万</span>*/}
                                    {/*</div>*/}
                                    {/*<p style={{color:'#aaa',whiteSpace:'nowrap',textAlign:'center',margin:'0px'}}>*/}
                                        {/*待付款订单数</p>*/}


                                    {/*<div style={{textAlign:'center',color:'#3398db',marginTop:'15px',fontWeight:'700'}}>*/}
                                        {/*<span style={{fontSize:'24px'}}>1,300</span>*/}
                                        {/*<span>万元</span>*/}
                                    {/*</div>*/}
                                    {/*<p style={{color:'#aaa',whiteSpace:'nowrap',textAlign:'center',margin:'0px'}}>*/}
                                        {/*商户优惠实际金额</p>*/}
                                {/*</div>*/}
                            {/*</div>*/}



                        {/*</article>*/}

                    {/*</Paper>*/}

                    {/*<Paper style={{width:'48%',margin:'10px'}}>*/}
                        {/*<article style={{}}>*/}
                            {/*<header*/}
                                {/*style={{display:'flex',padding:'8px 10px',cursor:'move',transition:'background 0.2s',borderBottom:'1px solid #ececee'}}>*/}
                                {/*<div style={{width:'76%'}}>*/}
                                    {/*<div*/}
                                        {/*style={{fontSize:'16px',lineHeight:'24px',maxWidth:'calc(100%-150px)',color:'#4c535a'}}>*/}
                                        {/*<p style={{margin:'0 0 3px 0'}}>过去一周平均每个店铺的商品浏览量</p>*/}
                                    {/*</div>*/}
                                    {/*<div style={{fontSize:'12px',color:'#aaa'}}>*/}
                                        {/*<span>2016-11-8至2016-11-14 | 过去7天</span>*/}
                                    {/*</div>*/}
                                {/*</div>*/}
                                {/*<div style={{width:'24%',margin:'-8px 0 0 33px'}}>*/}
                                    {/*<DropDownMenu value={this.state.value} onChange={this.handleChange}>*/}
                                        {/*<MenuItem value={1} primaryText="按天"/>*/}
                                        {/*<MenuItem value={2} primaryText="按周"/>*/}
                                        {/*<MenuItem value={3} primaryText="按月"/>*/}
                                    {/*</DropDownMenu>*/}
                                {/*</div>*/}

                            {/*</header>*/}
                            {/*<div style={{height:''}}>*/}
                                {/*<div*/}
                                    {/*style={{width:'100%',textAlign:'center',borderBottom:'1px solid #f3f3f3',height:'23px',lineHeight:'23px'}}>*/}
                                    {/*11-8（二）*/}
                                {/*</div>*/}

                                {/*<div style={{display:'flex',flexDirection:'row',marginTop:'10px'}}>*/}
                                    {/*<div style={{width:'33%',textAlign:'center'}}>*/}
                                        {/*<span style={{fontSize:'20px',color:'#CA504C'}}>58,235</span><span*/}
                                        {/*style={{fontSize:'12px',color:'#CA504C'}}>次</span><br/>*/}
                                        {/*<span style={{fontSize:'12px',color:'gray'}}>苹果手机专卖店</span>*/}
                                    {/*</div>*/}
                                    {/*<div style={{width:'33%',textAlign:'center'}}>*/}
                                        {/*<span style={{fontSize:'20px',color:'#ACB4BA'}}>35,236</span><span*/}
                                        {/*style={{fontSize:'12px',color:'#ACB4BA'}}>次</span><br/>*/}
                                        {/*<span style={{fontSize:'12px',color:'gray'}}>香蕉数码</span>*/}
                                    {/*</div>*/}
                                    {/*<div style={{width:'33%',textAlign:'center'}}>*/}
                                        {/*<span style={{fontSize:'20px',color:'#85B6BC'}}>35,096</span><span*/}
                                        {/*style={{fontSize:'12px',color:'#85B6BC'}}>次</span><br/>*/}
                                        {/*<span style={{fontSize:'12px',color:'gray'}}>天源笔记本专卖</span>*/}
                                    {/*</div>*/}

                                {/*</div>*/}

                                {/*<div style={{height:'250px',marginTop:'10px'}}>*/}
                                    {/*<ECharts option={option1_tabline}/>*/}
                                {/*</div>*/}
                            {/*</div>*/}
                        {/*</article>*/}
                    {/*</Paper>*/}
                    {/*<Paper style={{width:'48%',margin:'0 0 10px 10px'}}>*/}
                        {/*<article style={{height:''}}>*/}
                            {/*<header*/}
                                {/*style={{display:'flex',padding:'8px 10px',cursor:'move',transition:'background 0.2s',borderBottom:'1px solid #ececee'}}>*/}
                                {/*<div style={{width:'76%'}}>*/}
                                    {/*<div*/}
                                        {/*style={{fontSize:'16px',lineHeight:'24px',maxWidth:'calc(100%-150px)',color:'#4c535a'}}>*/}
                                        {/*<p style={{margin:'0 0 3px 0'}}>过去一周平均每个店铺的每日销售金额</p>*/}
                                    {/*</div>*/}
                                    {/*<div style={{fontSize:'12px',color:'#aaa'}}>*/}
                                        {/*<span>2016-11-14至2016-11-16 | 本周</span>*/}
                                    {/*</div>*/}
                                {/*</div>*/}
                                {/*<div style={{width:'24%',margin:'-8px 0 0 33px'}}>*/}
                                    {/*<DropDownMenu value={this.state.value} onChange={this.handleChange}>*/}
                                        {/*<MenuItem value={1} primaryText="按天"/>*/}
                                        {/*<MenuItem value={2} primaryText="按周"/>*/}
                                        {/*<MenuItem value={3} primaryText="按月"/>*/}
                                    {/*</DropDownMenu>*/}
                                {/*</div>*/}

                            {/*</header>*/}
                            {/*<div style={{height:''}}>*/}
                                {/*<div*/}
                                    {/*style={{width:'100%',textAlign:'center',borderBottom:'1px solid #f3f3f3',height:'23px',lineHeight:'23px'}}>*/}
                                    {/*11-16（三）*/}
                                {/*</div>*/}
                                {/*<div style={{display:'flex',flexDirection:'row',marginTop:'10px'}}>*/}
                                    {/*<div style={{width:'33%',textAlign:'center'}}>*/}
                                        {/*<span style={{fontSize:'20px',color:'#CA504C'}}>58,235</span><span*/}
                                        {/*style={{fontSize:'12px',color:'#CA504C'}}>次</span><br/>*/}
                                        {/*<span style={{fontSize:'12px',color:'gray'}}>苹果手机专卖店</span>*/}
                                    {/*</div>*/}
                                    {/*<div style={{width:'33%',textAlign:'center'}}>*/}
                                        {/*<span style={{fontSize:'20px',color:'#ACB4BA'}}>35,236</span><span*/}
                                        {/*style={{fontSize:'12px',color:'#ACB4BA'}}>次</span><br/>*/}
                                        {/*<span style={{fontSize:'12px',color:'gray'}}>香蕉数码</span>*/}
                                    {/*</div>*/}
                                    {/*<div style={{width:'33%',textAlign:'center'}}>*/}
                                        {/*<span style={{fontSize:'20px',color:'#85B6BC'}}>35,096</span><span*/}
                                        {/*style={{fontSize:'12px',color:'#85B6BC'}}>次</span><br/>*/}
                                        {/*<span style={{fontSize:'12px',color:'gray'}}>天源笔记本专卖</span>*/}
                                    {/*</div>*/}

                                {/*</div>*/}

                                {/*<div style={{height:'250px',marginTop:'10px'}}>*/}
                                    {/*<ECharts option={option1_tabline}/>*/}
                                {/*</div>*/}
                            {/*</div>*/}
                        {/*</article>*/}
                    {/*</Paper>*/}
                    {/*<Paper style={{width:'48%',margin:'0 10px 10px 10px'}}>*/}
                        {/*<article style={{height:'318px'}}>*/}
                            {/*<header*/}
                                {/*style={{display:'flex',padding:'8px 10px',cursor:'move',transition:'background 0.2s',borderBottom:'1px solid #ececee'}}>*/}
                                {/*<div style={{width:'76%'}}>*/}
                                    {/*<div*/}
                                        {/*style={{fontSize:'16px',lineHeight:'24px',maxWidth:'calc(100%-150px)',color:'#4c535a'}}>*/}
                                        {/*<p style={{margin:'0 0 3px 0'}}>过去一周平均每个店铺的每日购买用户</p>*/}
                                    {/*</div>*/}
                                    {/*<div style={{fontSize:'12px',color:'#aaa'}}>*/}
                                        {/*<span>2016-11-8至2016-11-14 | 过去7天</span>*/}
                                    {/*</div>*/}
                                {/*</div>*/}
                                {/*<div style={{width:'24%',margin:'-8px 0 0 33px'}}>*/}
                                    {/*<DropDownMenu value={this.state.value} onChange={this.handleChange}>*/}
                                        {/*<MenuItem value={1} primaryText="按天"/>*/}
                                        {/*<MenuItem value={2} primaryText="按周"/>*/}
                                        {/*<MenuItem value={3} primaryText="按月"/>*/}
                                    {/*</DropDownMenu>*/}
                                {/*</div>*/}

                            {/*</header>*/}
                            {/*<div style={{height:'252px'}}>*/}
                                {/*<div*/}
                                    {/*style={{width:'100%',textAlign:'center',borderBottom:'1px solid #f3f3f3',height:'23px',lineHeight:'23px'}}>*/}
                                    {/*11-8（二）*/}
                                {/*</div>*/}
                                {/*<div style={{height:'250px'}}>*/}
                                    {/*<CustomTable></CustomTable>*/}
                                {/*</div>*/}


                            {/*</div>*/}
                        {/*</article>*/}
                    {/*</Paper>*/}

                    {/*<Paper style={{width:'48%',marginLeft:'10px',marginTop:'0px'}}>*/}
                        {/*<article style={{height:'318px'}}>*/}
                            {/*<header*/}
                                {/*style={{display:'flex',padding:'8px 10px',cursor:'move',transition:'background 0.2s',borderBottom:'1px solid #ececee'}}>*/}
                                {/*<div style={{width:'76%'}}>*/}
                                    {/*<div*/}
                                        {/*style={{fontSize:'16px',lineHeight:'24px',maxWidth:'calc(100%-150px)',color:'#4c535a'}}>*/}
                                        {/*<p style={{margin:'0 0 3px 0'}}>过去一周每个店铺的平均订单单价</p>*/}
                                    {/*</div>*/}
                                    {/*<div style={{fontSize:'12px',color:'#aaa'}}>*/}
                                        {/*<span>2016-11-14至2016-11-16 | 本周</span>*/}
                                    {/*</div>*/}
                                {/*</div>*/}
                                {/*<div style={{width:'24%',margin:'-8px 0 0 33px'}}>*/}
                                    {/*<DropDownMenu value={this.state.value} onChange={this.handleChange}>*/}
                                        {/*<MenuItem value={1} primaryText="按天"/>*/}
                                        {/*<MenuItem value={2} primaryText="按周"/>*/}
                                        {/*<MenuItem value={3} primaryText="按月"/>*/}
                                    {/*</DropDownMenu>*/}
                                {/*</div>*/}

                            {/*</header>*/}
                            {/*<div style={{height:'252px'}}>*/}
                                {/*<div*/}
                                    {/*style={{width:'100%',textAlign:'center',borderBottom:'1px solid #f3f3f3',height:'23px',lineHeight:'23px'}}>*/}
                                    {/*11-16（三）*/}
                                {/*</div>*/}
                                {/*<div style={{height:'250px'}}>*/}
                                    {/*<CustomTable></CustomTable>*/}
                                {/*</div>*/}
                            {/*</div>*/}
                        {/*</article>*/}
                    {/*</Paper>*/}

                {/*</div>*/}
            </div>


        );


    }
}

ShopsData.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

ShopsData.contextTypes = {
    muiTheme: React.PropTypes.object,
}

const mapStateToProps = (state) => {
    const { databaseReducer } = state;

    return {
        // SaleAnalysisDate: databaseReducer.SaleAnalysisDate
    };
};

export default connect(
    mapStateToProps
)(ShopsData);

