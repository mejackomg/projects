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
import Chart from '../../../components/Chart';
import {
    colors,
    spacing,
    typography
} from 'material-ui/styles';
import { loadSaleAnalysis} from '../../../reducers/database.js';
const data = [
    {
        title:'用户销售额',
        xDate:['11-9','11-10','11-11','11-12','11-13','11-14','11-15'],
        yDate: {
            '用户销售额':[120, 132, 101, 134, 90, 230, 210]
        }
    },
    {
        title:'用户信用值',
        xDate:['11-9','11-10','11-11','11-12','11-13','11-14','11-15'],
        yDate: {
            '用户信用值': [120, 132, 101, 134, 90, 230, 210]
        }
    },
    {
        title:'用户平均消费额',
        xDate:['11-9','11-10','11-11','11-12','11-13','11-14','11-15'],
        yDate:{
            '用户平均消费额':[120, 132, 101, 134, 90, 230, 210]
        }
    },
    {
        title:'用户消费间隔',
        xDate:['11-9','11-10','11-11','11-12','11-13','11-14','11-15'],
        yDate:{
            '用户消费间隔':[120, 132, 101, 134, 90, 230, 210]

        }
    }
]
class UserView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 1,
            name1:'16,247',
            name2:'16,287',
            Takeout:'15,852',
            arrival:'15,222',
            averagePrice:'123,234',
            user:'12,333',
            shop:'23,445'
        };


    }

    componentDidMount() {
        // const { dispatch , shopsId } = this.props;
        // // const {radioIndex} = this.state;
        // dispatch(loadSaleAnalysis(shopsId));
    }

    getStyles()
    {
        const styles = {
            tabs: {
                width: '100%',
                //backgroundColor: 'transparent',
            },
            style:{
                // margin:'0px 72px',
                fontSize:'14px',
                color:'#1565C0',
                clear:'both',
                // height:500
            },
            radioButton: {
                // flex:1,
                display:'flex',
                alignItems:'center',
                justifyContent:'center'

            }

        };
        // if ( this.props.width === MEDIUM || this.props.width === LARGE )
        // styles.content = Object.assign(styles.content, styles.contentWhenMedium);

        return styles;
    }

    handleChange = (event, index, value) => this.setState({value});
    render() {
        return (
            <div>

                <header style={{display:'flex',padding:'16px 14px 8px 14px'}}>
                    <span style={{marginRight:'10px',width:'20%',fontSize:'24px',color:'#4c535a'}}>用户数据概况</span>
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
                        <article style={{height:'318px'}}>
                            <header
                                style={{display:'flex',padding:'8px 10px',cursor:'move',transition:'background 0.2s',borderBottom:'1px solid #ececee'}}>
                                <div style={{width:'76%'}}>
                                    <div
                                        style={{fontSize:'16px',lineHeight:'24px',maxWidth:'calc(100%-150px)',color:'#4c535a'}}>
                                        <p style={{margin:'0 0 3px 0'}}>今日的用户数据概览</p>
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
                            <div style={{height:'252px'}}>
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
                                            用户总数</p>


                                        <div style={{textAlign:'center',color:'#4a90e2',fontWeight:'700',marginTop:'15px'}}>
                                            <span style={{fontSize:'24px'}}>7255</span>
                                            <span>次</span>


                                        </div>
                                        <p style={{color:'#aaa',whiteSpace:'nowrap',textAlign:'center',margin:'0px'}}>
                                            活跃用户率</p>


                                        <div style={{textAlign:'center',color:'#3398db',marginTop:'15px',fontWeight:'700'}}>
                                            <span style={{fontSize:'24px'}}>123,123</span>
                                            <span>元</span>


                                        </div>
                                        <p style={{color:'#aaa',whiteSpace:'nowrap',textAlign:'center',margin:'0px'}}>
                                            用户补贴总额</p>
                                    </div>
                                    <div style={{width:'49.5%'}}>
                                        <div style={{textAlign:'center',color:'#3398db',marginTop:'15px',fontWeight:'700'}}>
                                            <span style={{fontSize:'24px'}}>11,245</span>
                                            <span>元</span>


                                        </div>
                                        <p style={{color:'#aaa',whiteSpace:'nowrap',textAlign:'center',margin:'0px'}}>
                                            用户消费总额</p>


                                        <div style={{textAlign:'center',color:'#3398db',marginTop:'15px',fontWeight:'700'}}>
                                            <span style={{fontSize:'24px'}}>123,123</span>
                                            <span>元</span>


                                        </div>
                                        <p style={{color:'#aaa',whiteSpace:'nowrap',textAlign:'center',margin:'0px'}}>
                                            用户平均信用值</p>
                                        <div style={{textAlign:'center',color:'#3398db',marginTop:'15px',fontWeight:'700'}}>
                                            <span style={{fontSize:'24px'}}>123,123</span>
                                            <span>元</span>


                                        </div>
                                        <p style={{color:'#aaa',whiteSpace:'nowrap',textAlign:'center',margin:'0px'}}>
                                            用户复购率（针对整个平台）</p>

                                    </div>
                                </div>
                            </div>
                        </article>
                    </Paper>

                </section>

            </div>



        );


    }
}

UserView.propTypes = {
    dispatch:PropTypes.func.isRequired,
};

UserView.contextTypes = {
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
)(UserView);
