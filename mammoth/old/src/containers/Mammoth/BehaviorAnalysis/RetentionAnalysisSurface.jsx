import React from 'react'
import { connect } from 'react-redux';
import ECharts from 'echarts-for-react'

import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import {Button, Glyphicon} from 'react-bootstrap';
import {loadCustomerEvent} from '../../../reducers/database.js'

class RetentionAnalysisSurface extends React.Component{
    componentWillReceiveProps (nextProps) {
        const {dispatch,InitialEvent,nextEvent,fromDate,toDate} = this.props;
        console.log(nextProps.DictTitleData[InitialEvent].event,nextProps.DictTitleData[nextEvent].event);
        if(nextProps.DictTitleData!=this.props.DictTitleData){
            dispatch(loadCustomerEvent(nextProps.DictTitleData[0].event,nextProps.DictTitleData[0].event,nextProps.fromDate,nextProps.toDate));
        }
        if(nextProps.InitialEvent!=this.props.InitialEvent || nextProps.nextEvent!=this.props.nextEvent || nextProps.fromDate!=this.props.fromDate || nextProps.toDate!=this.props.toDate) {
            dispatch(loadCustomerEvent(nextProps.DictTitleData[nextProps.InitialEvent].event, nextProps.DictTitleData[nextProps.nextEvent].event, nextProps.fromDate, nextProps.toDate));
        }
    }
    render() {

        const {customereventData,expanded} = this.props;
        const tableData = ['初始行为时间','总人数','1天之内'];
        for(let i=1;i<7;i++){
            tableData.push('第'+(i+1)+'天');
        }
        return (
            <div style={{}}>
                <Table
                    fixedHeader={true}
                    height='106px'
                    bodyStyle={{minHeight:600}}

                >
                    <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
                        <TableRow>
                            {
                                tableData.map((item,key)=>(
                                    <TableHeaderColumn key={key} style={{width:item=='总人数'?90:(item=='初始行为时间'?119:90),textAlign:'center'}}>{item}</TableHeaderColumn>
                                ))
                            }
                        </TableRow>
                    </TableHeader>
                    <TableBody
                        displayRowCheckbox={false}
                        showRowHover={true}
                        //stripedRows={true}
                    >
                        {
                            customereventData && customereventData.length>0?
                                customereventData.map((item,key)=>(
                                    <TableRow key={key}>
                                        <TableRowColumn style={{width: 116,textAlign:'center'}}>{item.date}</TableRowColumn>
                                        <TableRowColumn style={{width: 90,textAlign:'center'}}>{item.total}人</TableRowColumn>
                                        {
                                            item.date1 =='尚未有值'?
                                                <TableRowColumn></TableRowColumn>:
                                                expanded?
                                                    <TableRowColumn style={{textAlign:'center',width:90}}>
                                                        <span style={{color:this.context.muiTheme.palette.accent1Color}}>{item.total-item.date1}人</span><br />
                                                        <span>{item.total*1 === 0 ? 0 : ((item.total-item.date1)*100/item.total).toFixed(2)}%</span>
                                                    </TableRowColumn>:
                                                    <TableRowColumn style={{textAlign:'center',width:90}}>
                                                        <span style={{color:this.context.muiTheme.palette.accent1Color}}>{item.date1}人</span><br />
                                                        <span>{item.total*1 === 0 ? 0 : (item.date1*100/item.total).toFixed(2)}%</span>
                                                    </TableRowColumn>
                                        }
                                        {
                                            item.date2 =='尚未有值'?
                                                <TableRowColumn></TableRowColumn>:
                                                expanded?
                                                    <TableRowColumn style={{textAlign:'center',width:90}}>
                                                        <span style={{color:this.context.muiTheme.palette.accent1Color}}>{item.total-item.date2}人</span><br />
                                                        <span>{item.total*1 === 0 ? 0 : ((item.total-item.date2)*100/item.total).toFixed(2)}%</span>
                                                    </TableRowColumn>:
                                                    <TableRowColumn style={{textAlign:'center',width:90}}>
                                                        <span style={{color:this.context.muiTheme.palette.accent1Color}}>{item.date2}人</span><br />
                                                        <span>{item.total*1 === 0 ? 0 : (item.date2*100/item.total).toFixed(2)}%</span>
                                                    </TableRowColumn>
                                        }
                                        {
                                            item.date3 =='尚未有值'?
                                                <TableRowColumn></TableRowColumn>:
                                                expanded?
                                                    <TableRowColumn style={{textAlign:'center',width:90}}>
                                                        <span style={{color:this.context.muiTheme.palette.accent1Color}}>{item.total-item.date3}人</span><br />
                                                        <span>{item.total*1 === 0 ? 0 : ((item.total-item.date3)*100/item.total).toFixed(2)}%</span>
                                                    </TableRowColumn>:
                                                    <TableRowColumn style={{textAlign:'center',width:90}}>
                                                        <span style={{color:this.context.muiTheme.palette.accent1Color}}>{item.date3}人</span><br />
                                                        <span>{item.total*1 === 0 ? 0 : (item.date3*100/item.total).toFixed(2)}%</span>
                                                    </TableRowColumn>
                                        }
                                        {
                                            item.date4 =='尚未有值'?
                                                <TableRowColumn></TableRowColumn>:
                                                expanded?
                                                    <TableRowColumn style={{textAlign:'center',width:90}}>
                                                        <span style={{color:this.context.muiTheme.palette.accent1Color}}>{item.total-item.date4}人</span><br />
                                                        <span>{item.total*1 === 0 ? 0 : ((item.total-item.date4)*100/item.total).toFixed(2)}%</span>
                                                    </TableRowColumn>:
                                                    <TableRowColumn style={{textAlign:'center',width:90}}>
                                                        <span style={{color:this.context.muiTheme.palette.accent1Color}}>{item.date4}人</span><br />
                                                        <span>{item.total*1 === 0 ? 0 : (item.date4*100/item.total).toFixed(2)}%</span>
                                                    </TableRowColumn>
                                        }
                                        {
                                            item.date5 =='尚未有值'?
                                                <TableRowColumn></TableRowColumn>:
                                                expanded?
                                                    <TableRowColumn style={{textAlign:'center',width:90}}>
                                                        <span style={{color:this.context.muiTheme.palette.accent1Color}}>{item.total-item.date5}人</span><br />
                                                        <span>{item.total*1 === 0 ? 0 : ((item.total-item.date5)*100/item.total).toFixed(2)}%</span>
                                                    </TableRowColumn>:
                                                    <TableRowColumn style={{textAlign:'center',width:90}}>
                                                        <span style={{color:this.context.muiTheme.palette.accent1Color}}>{item.date5}人</span><br />
                                                        <span>{item.total*1 === 0 ? 0 : (item.date5*100/item.total).toFixed(2)}%</span>
                                                    </TableRowColumn>
                                        }
                                        {
                                            item.date6 =='尚未有值'?
                                                <TableRowColumn></TableRowColumn>:
                                                expanded?
                                                    <TableRowColumn style={{textAlign:'center',width:90}}>
                                                        <span style={{color:this.context.muiTheme.palette.accent1Color}}>{item.total-item.date6}人</span><br />
                                                        <span>{item.total*1 === 0 ? 0 : ((item.total-item.date6)*100/item.total).toFixed(2)}%</span>
                                                    </TableRowColumn>:
                                                    <TableRowColumn style={{textAlign:'center',width:90}}>
                                                        <span style={{color:this.context.muiTheme.palette.accent1Color}}>{item.date6}人</span><br />
                                                        <span>{item.total*1 === 0 ? 0 : (item.date6*100/item.total).toFixed(2)}%</span>
                                                    </TableRowColumn>
                                        }
                                        {
                                            item.date7 =='尚未有值'?
                                                <TableRowColumn></TableRowColumn>:
                                                expanded?
                                                    <TableRowColumn style={{textAlign:'center',width:90}}>
                                                        <span style={{color:this.context.muiTheme.palette.accent1Color}}>{item.total-item.date7}人</span><br />
                                                        <span>{item.total*1 === 0 ? 0 : ((item.total-item.date7)*100/item.total).toFixed(2)}%</span></TableRowColumn>:
                                                    <TableRowColumn style={{textAlign:'center',width:90}}>
                                                        <span style={{color:this.context.muiTheme.palette.accent1Color}}>{item.date7}人</span><br />
                                                        <span>{item.total*1 === 0 ? 0 : (item.date7*100/item.total).toFixed(2)}%</span>
                                                    </TableRowColumn>

                                        }

                                    </TableRow>

                                )):null
                        }
                    </TableBody>
                </Table>
            </div>
        )
    }

}
RetentionAnalysisSurface.contextTypes = {
    muiTheme: React.PropTypes.object.isRequired
};
const mapStateToProps = (state) => {
    const { authReducer,databaseReducer } = state;
    return {
        // user:authReducer.user
        customereventData:databaseReducer.customereventData
    };
};
export default connect(
    mapStateToProps
)(RetentionAnalysisSurface);