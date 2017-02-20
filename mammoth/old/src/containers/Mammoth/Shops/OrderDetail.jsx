/**
 * Created by apple on 2016/12/4.
 */

import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import ECharts from '../../../components/ECharts.js';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import DatePicker from 'material-ui/DatePicker';




import {loadSaleTable1, loadSaleTable} from '../../../reducers/database.js';
import SaleTable from './SaleTable.jsx'

class OrderDetail extends Component {
    constructor(props) {
        super(props);
        const minDate = new Date();
        const maxDate = new Date();
        minDate.setFullYear(minDate.getFullYear() - 100);
        minDate.setHours(0, 0, 0, 0);
        maxDate.setFullYear(maxDate.getFullYear() + 100);
        maxDate.setHours(0, 0, 0, 0);
        this.state = {
            page: 1,
            pageLineCount: 5,
            slideIndex: 0,
            radioIndex: 7,
            fromDate: null,
            toDate: null,
            minDate: minDate,
            maxDate: maxDate
        };
    }

    getOption() {
        const {saleData} = this.props;
        var option = null;
        if (saleData.length > 0) {
            var xData = [];
            var y1Data = [];
            var y2Data = [];
            var y3Data = [];
            for (var i = 0; i < saleData.length; i++) {
                xData.push(saleData[i]['日期']);
                y1Data.push(saleData[i]['销售额']);
                y2Data.push(saleData[i]['外卖次数']);
                y3Data.push(saleData[i]['到店次数']);
            }

            option = {
                tooltip: {
                    trigger: 'axis',
                    /*axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                     type: 'line'        // 默认为直线，可选为：'line' | 'shadow'
                     }*/
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
                    data: ['外卖', '到店', '销售额']
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
                // grid: {
                //     left: '3%',
                //     right: '40%',
                //     bottom: '3%',
                //     containLabel: true
                // },
                xAxis: {
                    type: 'category',
                    data: xData.map((value, index)=> {
                        return value
                    }),
                },
                yAxis: [
                    {
                        type: 'value',
                        name: '订单量',
                        axisLabel: {
                            formatter: '{value}单  '
                        },
                      splitNumber:1 ,
        },
                    {
                        type: 'value',
                        name: '销售额',
                        axisLabel: {
                            formatter: '{value}元',

                        }
                    }
                ],
                series: [
                    {
                        name: '外卖',
                        type: 'bar',
                        stack: '总量',
                        /*label: {
                            normal: {
                                show: true,
                                position: 'insideRight'
                            }
                        },*/
                        data: y2Data.map((value, index)=> {
                            return value
                        }),
                    },
                    {
                        name: '到店',
                        type: 'bar',
                        stack: '总量',
                        /*label: {
                            normal: {
                                show: true,
                                position: 'insideRight'
                            }
                        },*/
                        data: y3Data.map((value, index)=> {
                            return value
                        }),
                    },
                    {
                        name: '销售额',
                        type: 'bar',
                        yAxisIndex: 1,
                        data: y1Data.map((value, index)=> {
                            return value
                        }),
                    }
                ]
            }
        }
        return option;
    };

    componentDidMount() {
        const {dispatch, shopsId} = this.props;
        const {minDate, maxDate, radioIndex} = this.state;
        // const {radioIndex} = this.state;
        dispatch(loadSaleTable(shopsId, radioIndex));
    }

    handleChange = (value) => {
        if (value !== 0 || value !== 1 || value !== 2) {
            return;
        }
        this.setState({
            slideIndex: value,
        });
    };
    handleChangeRadio = (event, value) => {
        const {dispatch, shopsId} = this.props;
        this.setState({
            radioIndex: value
        });
        dispatch(loadSaleTable(shopsId, value));
    };
    handleChangeFromDate = (event, date) => {

        this.setState({
            fromDate: date,
            minDate: date
        });
        const {dispatch, shopsId} = this.props;
        const {toDate} = this.state;
        if (date && toDate) {
            dispatch(loadSaleTable1(shopsId, date, toDate));
        }
    };

    handleChangeToDate = (event, date) => {
        this.setState({
            toDate: date,
            maxDate: date
        });
        const {dispatch, shopsId} = this.props;
        const {fromDate} = this.state;
        if (fromDate && date) {
            dispatch(loadSaleTable1(shopsId, fromDate, date));
        }
    };

    handleMouseDown_SetPage = (page)=> {
        this.setState({page});
    }

    handleMouseDown_setPageLineCount = (count)=> {
        this.setState({pageLineCount: count});
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
        return styles;
    }
    render() {
        const styles = this.getStyles();
        var option = this.getOption();
        const {shopsId, shops_name, saleData} = this.props;
        const {page, pageLineCount}=this.state;
        const pageConut = Math.ceil(saleData.length / pageLineCount);
        return (
            <div>
                <div style={{display: 'flex', height: '80px', marginTop: '20px', padding: '0 30px'}}>
                <div style={{display: 'flex', flexDirection: 'row', flex: 1.5}}>
                    <div style={{flex: 1, marginRight: '20px'}}>
                        <span>From</span>
                        <DatePicker
                            style={{minWidth: '50px', width: '100%', overflow: 'hidden'}}
                            textFieldStyle={{width: '100%'}}
                            hintText="开始日期"
                            autoOk={false}
                            maxDate={this.state.maxDate}
                            value={this.state.fromDate}
                            onChange={this.handleChangeFromDate}
                        />
                    </div>
                    <div style={{flex: 1}}>
                        <span>To</span>
                        <DatePicker
                            style={{minWidth: '50px', width: '100%', overflow: 'hidden'}}
                            textFieldStyle={{width: '100%'}}
                            hintText="结束日期"
                            autoOk={false}
                            minDate={this.state.minDate}
                            value={this.state.toDate}
                            onChange={this.handleChangeToDate}
                        />
                    </div>
                </div>
                {/*<div style={{*/}
                    {/*flex: 4,*/}
                    {/*display: 'flex',*/}
                    {/*flexDirection: 'row',*/}
                    {/*justifyContent: 'center',*/}
                    {/*alignItems: 'center'*/}
                {/*}}>*/}
                    {/*<div style={{flex: 1, textAlign: 'center'}}>销售记录</div>*/}
                    {/*<RadioButtonGroup*/}
                        {/*style={{display: 'flex', flexDirection: 'row', flex: 5, height: '26px'}}*/}
                        {/*name="shipSpeed" onChange={this.handleChangeRadio} defaultSelected={7}>*/}
                        {/*<RadioButton*/}
                            {/*value={7}*/}
                            {/*label="最近7天"*/}
                            {/*style={styles.radioButton}*/}
                            {/*labelStyle={{minWidth: '50px', width: '50px'}}*/}
                        {/*/>*/}
                        {/*<RadioButton*/}
                            {/*value={30}*/}
                            {/*label="最近30天"*/}
                            {/*style={styles.radioButton}*/}
                            {/*labelStyle={{minWidth: '50px', width: '58px'}}*/}
                        {/*/>*/}
                        {/*<RadioButton*/}
                            {/*value={90}*/}
                            {/*label="最近90天"*/}
                            {/*style={styles.radioButton}*/}
                            {/*labelStyle={{minWidth: '50px', width: '58px'}}*/}
                        {/*/>*/}
                    {/*</RadioButtonGroup>*/}
                {/*</div>*/}
                </div>

                <div style={{height: '400px'}}>
                    {saleData.length > 0 ?
                        <ECharts option={option}/>
                        :
                        <div style={{
                            width: '80%',
                            margin: '10 auto',
                            textAlign: 'center',
                            fontSize: '24px',
                            color: 'gray'
                        }}>暂无数据!</div>
                    }
                </div>

                <div >
                    <SaleTable
                        page={page}
                        pageLineCount={pageLineCount}
                        saleData={saleData}
                        shops_Id={shopsId}
                        shops_name={shops_name}
                    />

                </div>

            </div>
        )
    }
}

OrderDetail.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

OrderDetail.contextTypes = {
    muiTheme: React.PropTypes.object,
}

const mapStateToProps = (state) => {
    const {databaseReducer} = state;

    return {
        saleData: databaseReducer.saleData
    };
};

export default connect(
    mapStateToProps
)(OrderDetail);





