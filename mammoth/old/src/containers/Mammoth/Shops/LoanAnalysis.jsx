/**
 * Created by apple on 2016/12/12.
 */

import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import withWidth, {LARGE, MEDIUM, SMALL}  from '../../../utils/withWidth';

import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import {connect} from 'react-redux';
import CircularProgress from 'material-ui/CircularProgress';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import RepaymentTable from './RepaymentTable.jsx'
import TabMenuBar from './TabMenuBar.jsx';


import React, {Component, PropTypes} from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import Toggle from 'material-ui/Toggle';
import Chip from 'material-ui/Chip';
import ECharts from '../../../components/ECharts.js';

import {loadShopLoan,loadShopLoanRisk} from '../../../reducers/database.js';
class LoanAnalysis extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isRevoked: 0,
            slideIndex: 0,
        };
    }

    getOption() {
        const {repayRecord} = this.props;
        var option = null;
        if (repayRecord.length > 0) {
            var xData = [];
            var y1Data = [];
            for (var i = 0; i < repayRecord.length; i++) {
                xData.push(repayRecord[i]['还款时间']);
                y1Data.push(repayRecord[i]['还款金额']);
            }
            option = {
                tooltip: {
                    trigger: 'axis',
                },
                toolbox: {
                    feature: {
                       // dataView: {show: true, readOnly: true},
                        magicType: {show: true, type: ['line', 'bar']},
                        restore: {show: true},
                        saveAsImage: {show: true}
                    },
                    right: '10%'
                },
                legend: {
                    data: ['还款金额']
                },
                dataZoom: [{
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
                xAxis: {
                    type: 'category',
                    data: xData.map((value, index)=> {
                        return value
                    }),
                },
                yAxis: [
                    {
                        type: 'value',
                        name: '还款金额',
                        axisLabel: {
                            formatter: '{value}元 '
                        },
                    }

                ],
                series: [
                    {
                        name: '还款金额',
                        type: 'line',
                        stack: '总量',
                        data: y1Data.map((value, index)=> {
                            return value
                        }),
                    }
                ]
            };
        }
        return option;
    };
    getOption_loanRisk() {
        const {ShopLoanRiskData} = this.props;
        var option = null;
        if (ShopLoanRiskData.length > 0) {
            var xData = [];
            var y1Data = [];
            for (var i = 0; i < ShopLoanRiskData.length; i++) {
                xData.push(ShopLoanRiskData[i]['时间']);
                y1Data.push(ShopLoanRiskData[i]['风险值']);
            }
            option = {
                tooltip: {
                    trigger: 'axis',
                },
                toolbox: {
                    feature: {
                        //dataView: {show: true, readOnly: true},
                        magicType: {show: true, type: ['line', 'bar']},
                        restore: {show: true},
                        saveAsImage: {show: true}
                    },
                    right: '10%'
                },
                legend: {
                    data: ['风险值']
                },
                dataZoom: [{
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
                xAxis: {
                    type: 'category',
                    data: xData.map((value, index)=> {
                        return value
                    }),
                },
                yAxis: [
                    {
                        type: 'value',
                        name: '风险值',
                        axisLabel: {
                            formatter: '{value} '
                        },
                    }

                ],
                series: [
                    {
                        name: '风险值',
                        type: 'line',
                        stack: '总量',
                        data: y1Data.map((value, index)=> {
                            return value
                        }),
                    }
                ]
            };
        }
        return option;
    };


    componentDidMount() {
        const {dispatch, params : {shopsId}} = this.props;
        dispatch(loadShopLoan(shopsId));
        dispatch(loadShopLoanRisk(shopsId));
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.shopsId && this.props.shopsId != nextProps.shopsId) {
            const {dispatch} = this.props;
            dispatch(loadShopLoan(nextProps.shopsId));
            dispatch(loadShopLoanRisk(nextProps.shopsId));
        }
    }

    changeNum = (num) => {
        let str = "";
        if (num > 10000) {
            let n = num / 10000;
            let nn = n + '';
            if (nn.indexOf(".") == -1) {
                str = nn + '万';
            } else {
                str = nn.split('.');
                var n0 = str[0];
                var n1 = str[1];
                var n00 = n0 + '';
                var n11 = n1 + '';
                var n12 = n11.substring(0, 2);
                str = n0 + '.' + n12 + '万';
            }
        } else {
            str = num + '';
        }
        var newStr = "";
        var count = 0;
        var strarr = str.split('.');
        for (var i = strarr[0].length - 1; i >= 0; i--) {
            if (count % 3 == 0 && count != 0) {
                newStr = str.charAt(i) + "," + newStr;
            } else {
                newStr = str.charAt(i) + newStr;
            }
            count++;
        }
        if (str.indexOf(".") == -1) {
            str = newStr;
        } else {
            str = newStr + '.' + strarr[1];
        }
        return str;
    }

    changeFormat = (num) => {
        let str = "";
        if (num == 1) {
            str = num;
        } else {
            let nn = num + '';
            str = nn.split('.');
            var n0 = str[0];
            var n1 = str[1];
            var n00 = n0 + '';
            var n11 = n1 + '';
            var n12 = n11.substring(0, 2);
            str = n0 + '.' + n12;

        }

        return str;
    }

    changeRate =(num) =>{
        let n=num.toFixed(4);
        let nn=n.slice(2,4)+'.'+n.slice(4,6)+'%'
        return nn;

    }


    handelChange = (event, isRevoked) => {
        if (isRevoked == true) {
            this.setState({isRevoked: 1})
        } else {
            this.setState({isRevoked: 0})
        }
    }

    handleChange_Tab = (value) => {
        if (value !== 0 || value !== 1 || value !== 2) {
            return;
        }
        this.setState({
            slideIndex: value,
        });
    };

    getStyles() {
        const styles = {
            thumbOff: {
                backgroundColor: this.context.muiTheme.palette.accent1Color,
            },
            trackOff: {
                backgroundColor: this.context.muiTheme.palette.accent1Color,
            },
            thumbSwitched: {
                backgroundColor: 'red',
            },
            trackSwitched: {
                backgroundColor: '#ff9d9d',
            },
            fontStyle: {
                fontSize: '14px',
                color: 'gray'
            },
            tabs: {
                width: '100%',
            },

        };
        /*if ( this.props.width === MEDIUM || this.props.width === LARGE )
         styles.content = Object.assign(styles.content, styles.contentWhenMedium);*/
        return styles;
    }


    render() {
        const {params : {shopsId}, repayRecord, loanData, sumMoney,ShopLoanRiskData, location:{query}} = this.props;
        var option = this.getOption();
        var option_loanRisk= this.getOption_loanRisk();
        const styles = this.getStyles();
        /*if (this.props.width == LARGE) {
         styles.toolbar.left = 240;
         styles.toolbar.width = 'calc(100% - 240px)';
         }
         else{
         styles.toolbar.left = 0;
         styles.toolbar.width = '100%';
         }*/
        return (
            <div>
                <TabMenuBar {...this.props}
                            isArrowBackShown={true}
                            title="返回"
                            tabsWidth={500}/>
                <div style={{width: '86%', margin: '100 auto 60 auto'}}>
                    {loanData.length > 0 && loanData[0]['scheme'] > 0 ?
                        <div style={{marginTop: '20px'}}>
                            <Paper zDepth={2}>
                                <Toolbar>
                                    <ToolbarGroup>
                                        <ToolbarTitle text="商户未贷款概况"/>
                                    </ToolbarGroup>
                                </Toolbar>

                                <div style={{display: 'flex'}}>
                                    <Paper style={{
                                        width: '20%',
                                        flexDirection: 'column',
                                        position: 'relative',
                                        display: 'flex',
                                        minWidth: '314px'
                                    }}>
                                        <div style={{
                                            width: '88%',
                                            fontSize: '12px',
                                            position: 'absolute',
                                            top: '20px',
                                            left: '38px'
                                        }}>
                                            <div style={{display: 'flex', lineHeight: '25px'}}>
                                                <div style={{flex: 1, textAlign: 'left', marginLeft: '-7px'}}>商铺名称：
                                                </div>
                                                <div style={{
                                                    flex: 2,
                                                    textAlign: 'left',
                                                    marginLeft: '-5px'
                                                }}>{query['商铺名称']}</div>
                                            </div>
                                            <div style={{display: 'flex', lineHeight: '25px'}}>
                                                <div style={{
                                                    flex: 1,
                                                    textAlign: 'left',
                                                    marginLeft: '-7px',
                                                    width: '80px'
                                                }}>最近平均信用值：
                                                </div>
                                                <div style={{
                                                    flex: 2,
                                                    textAlign: 'left',
                                                    marginLeft: '-5px'
                                                }}>{loanData.length > 0 ? this.changeFormat(loanData[0]['credit']) : null}</div>
                                            </div>
                                            <div style={{display: 'flex', lineHeight: '25px'}}>
                                                <div style={{flex: 1, textAlign: 'left', marginLeft: '-7px'}}>风险评级：
                                                </div>
                                                <div style={{
                                                    flex: 2,
                                                    textAlign: 'left',
                                                    marginLeft: '-5px'
                                                }}>{loanData.length > 0 ? loanData[0]['first_risk'] : null}</div>
                                            </div>
                                            <div style={{display: 'flex', lineHeight: '25px'}}>
                                                <div style={{flex: 1, textAlign: 'left', marginLeft: '-7px'}}>经营类型：
                                                </div>
                                                <div style={{
                                                    flex: 2,
                                                    textAlign: 'left',
                                                    marginLeft: '-5px'
                                                }}>{query['类型']}</div>
                                            </div>

                                            <div style={{display: 'flex', lineHeight: '25px'}}>
                                                <div style={{flex: 1, textAlign: 'left', marginLeft: '-7px'}}>电话：</div>
                                                <div style={{
                                                    flex: 2,
                                                    textAlign: 'left',
                                                    marginLeft: '-5px'
                                                }}>{query['电话']}</div>
                                            </div>
                                            <div style={{display: 'flex',  lineHeight: '25px'}}>
                                                <div style={{flex: 1, textAlign: 'left', marginLeft: '-7px'}}>注册时间：
                                                </div>
                                                <div style={{
                                                    flex: 2,
                                                    textAlign: 'left',
                                                    marginLeft: '-5px'
                                                }}>{query['注册时间']}</div>
                                            </div>
                                            <div style={{display: 'flex', lineHeight: '25px'}}>
                                                <div style={{flex: 1, textAlign: 'left', marginLeft: '-7px'}}>地址：</div>
                                                <div style={{
                                                    flex: 2,
                                                    textAlign: 'left',
                                                    marginLeft: '-5px'
                                                }}>{query['地址']}</div>
                                            </div>
                                        </div>
                                    </Paper>

                                    <div style={{width: '80%', height: '255px'}}>
                                        {loanData.length > 0 ?
                                            loanData.map((value, index)=>
                                                <div key={index} style={{marginTop: '0px'}}>
                                                    <div style={{
                                                        height: '60px',
                                                        display: 'flex',
                                                        flexDirection: 'row',
                                                        textAlign: 'center',
                                                        marginTop: '15px',
                                                    }}>
                                                        <div style={{
                                                            flex: 1,
                                                            marginTop: '10px',
                                                            fontSize: '20px',
                                                            color: 'gray'
                                                        }}>方案{loanData[index]['scheme']}
                                                        </div>
                                                        <div style={{flex: 1}}>
                                                                <span style={{
                                                                    color: '#3398db',
                                                                    fontWeight: '700',
                                                                    fontSize: '24px'
                                                                }}>{this.changeNum(loanData[index]['loan_money'])}</span><br/>
                                                            <span style={styles.fontStyle}>可贷款金额(元)</span>
                                                        </div>

                                                        <div style={{flex: 1}}>
                                                                <span style={{
                                                                    color: '#3398db',
                                                                    fontWeight: '700',
                                                                    fontSize: '24px'
                                                                }}>{this.changeRate(loanData[index]['loan_rate'])}</span><br/>
                                                            <span style={styles.fontStyle}>利率</span>
                                                        </div>

                                                        <div style={{flex: 1}}>
                                                                <span style={{
                                                                    color: '#3398db',
                                                                    fontWeight: '700',
                                                                    fontSize: '24px'
                                                                }}>{loanData[index]['loan_term']}</span>
                                                            <br/>
                                                            <span style={styles.fontStyle}>贷款期限(月)</span>
                                                        </div>
                                                    </div>
                                                    <div style={{height: '10px', backgroundColor: '#E0E0E0'}}></div>
                                                    {/*<Divider />*/}
                                                </div>
                                            )

                                            :
                                            <div style={{display: 'flex', justifyContent: 'center'}}>
                                                <CircularProgress style={{margin: -350}} size={1.5}/>
                                            </div>
                                        }
                                    </div>
                                </div>

                            </Paper>
                        </div>
                        :

                        <Paper zDepth={2}>
                            <Toolbar>
                                <ToolbarGroup>
                                    <ToolbarTitle text="商户已贷款概况"/>
                                </ToolbarGroup>
                            </Toolbar>

                            <div style={{display: 'flex'}}>
                                <Paper style={{
                                    width: '20%',
                                    flexDirection: 'column',
                                    position: 'relative',
                                    display: 'flex',
                                    minWidth: '314px',
                                    height: '416px'
                                }}>
                                    <div style={{
                                        width: '88%',
                                        fontSize: '12px',
                                        position: 'absolute',
                                        top: '30px',
                                        left: '38px'
                                    }}>
                                        <div style={{display: 'flex', lineHeight: '25px'}}>
                                            <div style={{flex: 1, textAlign: 'left', marginLeft: '-7px'}}>商铺名称：</div>
                                            <div style={{
                                                flex: 2,
                                                textAlign: 'left',
                                                marginLeft: '-5px'
                                            }}>{query['商铺名称']}</div>
                                        </div>
                                        <div style={{display: 'flex', lineHeight: '25px'}}>
                                            <div style={{flex: 1, textAlign: 'left', marginLeft: '-7px'}}>最近平均信用值：</div>
                                            <div style={{
                                                flex: 2,
                                                textAlign: 'left',
                                                marginLeft: '-5px'
                                            }}>{loanData.length > 0 ? this.changeFormat(loanData[0]['credit']) : null}</div>
                                        </div>
                                        <div style={{display: 'flex', lineHeight: '25px'}}>
                                            <div style={{flex: 1, textAlign: 'left', marginLeft: '-7px'}}>风险评级：</div>
                                            <div style={{
                                                flex: 2,
                                                textAlign: 'left',
                                                marginLeft: '-5px'
                                            }}>{loanData.length > 0 ? loanData[0]['first_risk'] : null}</div>
                                        </div>
                                        <div style={{display: 'flex', lineHeight: '25px'}}>
                                            <div style={{flex: 1, textAlign: 'left', marginLeft: '-7px'}}>已贷款金额(元)：
                                            </div>
                                            <div style={{
                                                flex: 2,
                                                textAlign: 'left',
                                                marginLeft: '-5px'
                                            }}>{loanData.length > 0 ? this.changeNum(loanData[0]['loan_money']) : null}</div>
                                        </div>
                                        <div style={{display: 'flex', lineHeight: '25px'}}>
                                            <div style={{flex: 1, textAlign: 'left', marginLeft: '-7px'}}>已还款金额(元)：
                                            </div>
                                            <div style={{
                                                flex: 2,
                                                textAlign: 'left',
                                                marginLeft: '-5px'
                                            }}>{loanData.length > 0 ? this.changeNum(sumMoney[0]['已还款金额']) : null}</div>
                                        </div>
                                        <div style={{display: 'flex', lineHeight: '25px'}}>
                                            <div style={{flex: 1, textAlign: 'left', marginLeft: '-7px'}}>利率：</div>
                                            <div style={{
                                                flex: 2,
                                                textAlign: 'left',
                                                marginLeft: '-5px'
                                            }}>{loanData.length > 0 ? loanData[0]['loan_rate'] * 100 + '%' : null}</div>
                                        </div>
                                        <div style={{display: 'flex', lineHeight: '25px'}}>
                                            <div style={{flex: 1, textAlign: 'left', marginLeft: '-7px'}}>贷款开始时间：</div>
                                            <div style={{
                                                flex: 2,
                                                textAlign: 'left',
                                                marginLeft: '-5px'
                                            }}>{loanData.length > 0 ? loanData[0]['贷款开始时间'] : null}</div>
                                        </div>
                                        <div style={{display: 'flex', lineHeight: '25px'}}>
                                            <div style={{flex: 1, textAlign: 'left', marginLeft: '-7px'}}>贷款结束时间：</div>
                                            <div style={{
                                                flex: 2,
                                                textAlign: 'left',
                                                marginLeft: '-5px'
                                            }}>{loanData.length > 0 ? loanData[0]['贷款结束时间'] : null}</div>
                                        </div>
                                        <div style={{display: 'flex', lineHeight: '25px'}}>
                                            <div style={{flex: 1, textAlign: 'left', marginLeft: '-7px'}}>经营类型：</div>
                                            <div style={{
                                                flex: 2,
                                                textAlign: 'left',
                                                marginLeft: '-5px'
                                            }}>{query['类型']}</div>
                                        </div>

                                        <div style={{display: 'flex',lineHeight: '25px'}}>
                                            <div style={{flex: 1, textAlign: 'left', marginLeft: '-7px'}}>电话：</div>
                                            <div style={{
                                                flex: 2,
                                                textAlign: 'left',
                                                marginLeft: '-12px'
                                            }}>{query['电话']}</div>
                                        </div>
                                        <div style={{display: 'flex', lineHeight: '25px'}}>
                                            <div style={{flex: 1, textAlign: 'left', marginLeft: '-7px'}}>注册时间：</div>
                                            <div style={{
                                                flex: 2,
                                                textAlign: 'left',
                                                marginLeft: '-12px'
                                            }}>{query['注册时间']}</div>
                                        </div>
                                        <div style={{display: 'flex', lineHeight: '25px'}}>
                                            <div style={{flex: 1, textAlign: 'left', marginLeft: '-7px'}}>地址：</div>
                                            <div style={{
                                                flex: 2,
                                                textAlign: 'left',
                                                marginLeft: '-12px',
                                            }}>{query['地址']}</div>
                                        </div>
                                    </div>
                                </Paper>

                                <div style={{width: '80%'}}>
                                            <div style={{display: 'flex', flexDirection: 'row', marginTop: '10px'}}>
                                                <Chip style={{margin: 4}}>
                                                    <div style={{float: 'left'}}>表单</div>
                                                    <div style={{
                                                        width: '40%',
                                                        float: 'left',
                                                        marginTop: '4px',
                                                        marginLeft: '9px'
                                                    }}>
                                                        <Toggle
                                                            label="图表"
                                                            labelPosition="right"
                                                            thumbStyle={styles.thumbOff}
                                                            trackStyle={styles.trackOff}
                                                            //thumbSwitchedStyle={styles.thumbSwitched}
                                                            //trackSwitchedStyle={styles.trackSwitched}
                                                            onToggle={this.handelChange}
                                                        />
                                                    </div>
                                                </Chip>

                                                <div style={{width: '68%', textAlign: 'center', marginTop: '10px'}}>还款记录表</div>
                                            </div>
                                            <br/>
                                            <Divider style={{marginTop: '-12px'}}/>

                                            {this.state.isRevoked > 0 ?
                                                <div style={{height: '270px'}}>
                                                    {repayRecord.length > 0 ?
                                                        <ECharts option={option} style={{marginTop: '30px'}}/>
                                                        :
                                                        <div style={{
                                                            textAlign: 'center',
                                                            fontSize: '24px',
                                                            color: 'gray',
                                                            marginTop: '80px'
                                                        }}>暂无数据</div>
                                                    }

                                                </div>

                                                :

                                                <RepaymentTable repayRecord={repayRecord}/>
                                            }


                                </div>
                            </div>

                        </Paper>
                    }

                </div>

                <Paper zDepth={2} style={{width:'86%',margin:'0 auto'}}>
                    <Toolbar>
                        <ToolbarGroup>
                            <ToolbarTitle text="风险评估趋势"/>
                        </ToolbarGroup>
                    </Toolbar>
                    <div style={{height: '270px'}}>
                        {ShopLoanRiskData.length>0 ?
                            <ECharts option={option_loanRisk} style={{marginTop: '30px'}}/>
                            :
                            <div style={{
                                textAlign: 'center',
                                fontSize: '24px',
                                color: 'gray',
                                marginTop: '80px',
                            }}>暂无数据!</div>

                        }
                    </div>
                </Paper>
                <div style={{height: '20px'}}></div>
            </div>
        )

    }
}


LoanAnalysis.contextTypes = {
    muiTheme: React.PropTypes.object,
}

LoanAnalysis.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
    const {databaseReducer,layoutReducer} = state;
    return {
        sumMoney: databaseReducer.ShopLoanData.sumMoney,
        repayRecord: databaseReducer.ShopLoanData.repayRecord,
        loanData: databaseReducer.ShopLoanData.loanData,
        ShopLoanRiskData:databaseReducer.ShopLoanRiskData,
        panelVisible:layoutReducer.panelVisible,//勿删,传入TabMenuBar
        loading: databaseReducer.loading,
        loaded: databaseReducer.loaded
    };
};
export default connect(
    mapStateToProps
)(withWidth()(LoanAnalysis));