import React from 'react'
import { connect } from 'react-redux';
import ECharts from 'echarts-for-react'
import moment from 'moment';
import DatetimeRangePicker from 'react-bootstrap-datetimerangepicker';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {Button, Glyphicon} from 'react-bootstrap';
import Toggle from 'material-ui/Toggle';
import Snackbar from 'material-ui/Snackbar';
import RetentionAnalysisSurface from './RetentionAnalysisSurface.jsx'
import {loadCustomerEvent,loadDictTitle,addSystemLog} from '../../../reducers/database.js'

class RetentionAnalysis extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            InitialEvent: 0,
            nextEvent:0,
            fromDate: moment().subtract(7, 'days'),
            toDate: moment(),
            ranges: {
                '今日': [moment().startOf('day'), moment()],
                '昨天': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                '过去7天': [moment().subtract(6, 'days'), moment()],
                '过去30天': [moment().subtract(29, 'days'), moment()],
                '这个月': [moment().startOf('month'), moment().endOf('month')],
                '上个月': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
            },
            expanded:false,
            openSanckbar:false,
            alertMsg:''
        };
    }
    componentWillMount(){
        const {dispatch} = this.props;
        dispatch(loadDictTitle());
        dispatch(addSystemLog(this.props.user.userName,'查看留存分析页面'));
    }
    handleInitialEvent = (event, index, value) => {this.setState({InitialEvent:value});}
    handleNextEvent =(event, index, value) => {this.setState({nextEvent:value});}
    handleEvent = (event, picker) => {
        // console.log('picker',picker);
        switch (picker.chosenLabel){
            case '今日':
                this.setState({
                    fromDate: picker.startDate,
                    toDate: picker.endDate
                });
                break;
            case '昨天':
                this.setState({
                    fromDate: picker.startDate,
                    toDate: picker.endDate
                });
                break;
            case '过去7天':
                this.setState({
                    fromDate: picker.startDate,
                    toDate: picker.endDate
                });
                break;
            case '过去30天':
                this.setState({
                    fromDate: moment(picker.endDate).subtract(7, 'days'),
                    toDate: picker.endDate,
                    openSanckbar:true,
                    alertMsg:'一次可展示的日期为七天,以所选时间的最大值往前展示七天'
                });
                break;
            case '这个月':
                this.setState({
                    fromDate: moment(picker.endDate).subtract(7, 'days'),
                    toDate: picker.endDate,
                    openSanckbar:true,
                    alertMsg:'一次可展示的日期为七天,以所选时间的最大值往前展示七天'
                });
                break;
            case '上个月':
                this.setState({
                    fromDate: moment(picker.endDate).subtract(7, 'days'),
                    toDate: picker.endDate,
                    openSanckbar:true,
                    alertMsg:'一次可展示的日期为七天,以所选时间的最大值往前展示七天'
                });
                break;
            case '自定义':
                if(moment(picker.endDate).subtract(7, 'days') < moment("2016-12-23")){
                    this.setState({
                        openSanckbar:true,
                        alertMsg:'请选择2016年12月23日以后的日期'
                    });
                    return;
                } else if (moment(picker.endDate) > moment()){
                    this.setState({
                        openSanckbar:true,
                        alertMsg:'请选择今天之前日期'
                    });
                    return;
                }
                this.setState({
                    fromDate: moment(picker.endDate).subtract(7, 'days'),
                    toDate: picker.endDate
                });
                break;
        }
    }
    handleRequestClose = () =>{
        this.setState({
            openSanckbar: false,
        });
    }
    handleToggle = (event, toggle) => {
        this.setState({expanded: toggle});
        console.log('expanded',toggle);
    };
    getStyle(){
        const styles = {
            underlineStyle: {
                borderColor: this.context.muiTheme.palette.accent1Color,
            }
        }
        return styles;
    }
    render() {
        const {DictTitleData} = this.props;
        const styles = this.getStyle();
        const {InitialEvent,nextEvent} = this.state;
        console.log(this.state.fromDate,this.state.toDate);
        const tableData = ['初始行为时间','总人数','1天之内'];
        for(let i=1;i<7;i++){
            tableData.push('第'+(i+1)+'天');
        }
        let fromDate = this.state.fromDate.format('YYYY-MM-DD');
        let toDate = this.state.toDate.format('YYYY-MM-DD');
        let label = fromDate + ' 至 ' + toDate;//{fromDate}至{toDate} | 过去7天
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
            <div>
                <div style={{padding:'20px 12px 10px 12px'}}>
                    <div style={{display:'flex',alignItems:'center'}}>
                        <div style={{marginRight:'20px'}}>初始行为</div>
                        <SelectField
                            value={this.state.InitialEvent}
                            onChange={this.handleInitialEvent}
                            underlineStyle={styles.underlineStyle}
                            maxHeight={200}
                            //hintStyle={{color: this.context.muiTheme.palette.accent3Color}}
                        >
                            {
                                DictTitleData.map((item,key)=>(
                                    <MenuItem value={key} key={key} primaryText={item.name} />
                                ))
                            }
                        </SelectField>
                    </div>
                    <div style={{display:'flex',alignItems:'center'}}>
                        <div style={{marginRight:'20px'}}>后续行为</div>
                        <SelectField
                            value={this.state.nextEvent}
                            onChange={this.handleNextEvent}
                            underlineStyle={styles.underlineStyle}
                            maxHeight={200}
                            //hintStyle={{color: this.context.muiTheme.palette.accent3Color}}
                        >
                            {
                                DictTitleData.map((item,key)=>(
                                    <MenuItem value={key} key={key+'next'} primaryText={item.name} />
                                ))
                            }
                        </SelectField>
                    </div>
                    <div style={{display:'flex',marginBottom:'10px'}}>
                        <div style={{width:'200px'}}>
                            <DatetimeRangePicker startDate={this.state.fromDate} endDate={this.state.toDate}
                                                 ranges={this.state.ranges}
                                                 alwaysShowCalendars={true}
                                                 onApply={this.handleEvent} locale={locale} >
                                <Button className="selected-date-range-btn" style={{
                                    width: '100%', border: 'none', marginTop: '5px',
                                    color: this.context.muiTheme.palette.accent1Color
                                }}>
                                    <div className="pull-left">
                                        <i className="fa fa-calendar"/>
                                        &nbsp;
                                        <span>{label}</span>
                                    </div>
                                    <div className="pull-right">
                                        <i className="fa fa-angle-down"/>
                                    </div>
                                </Button>
                            </DatetimeRangePicker>
                        </div>
                        {
                            DictTitleData && DictTitleData.length>0?
                                <div style={{width:'62%',fontSize:'18px',marginTop:'10px',fontWeight:'500',textAlign:'center'}}>
                                    用户先进行{DictTitleData[InitialEvent].name}  后进行{DictTitleData[nextEvent].name}的7天留存分析
                                </div>:null
                        }
                        <div style={{width:'156px',display:"flex",marginTop:'10px'}}>
                            <div style={{width:'106px'}}>七天留存</div>
                            <Toggle label=""
                                    style={{width:'25%'}}
                                //defaultToggled={false}
                                    onToggle={this.handleToggle}
                            />
                            <div style={{width:'106px',marginLeft:'5px'}}>七天流失</div>
                        </div>
                    </div>
                    <RetentionAnalysisSurface
                        InitialEvent={this.state.InitialEvent}
                        nextEvent={this.state.nextEvent}
                        DictTitleData={DictTitleData}
                        fromDate={this.state.fromDate}
                        toDate={this.state.toDate}
                        expanded={this.state.expanded}
                    />
                </div>
                <Snackbar
                    open={this.state.openSanckbar}
                    message={this.state.alertMsg}
                    autoHideDuration={4000}
                    onRequestClose={this.handleRequestClose}
                />

            </div>
        )
    }
}

RetentionAnalysis.contextTypes = {
    muiTheme: React.PropTypes.object.isRequired
};
const mapStateToProps = (state) => {
    const { authReducer,databaseReducer } = state;
    return {
        user:authReducer.user,
        DictTitleData:databaseReducer.DictTitleData
    };
};
export default connect(
    mapStateToProps
)(RetentionAnalysis);



