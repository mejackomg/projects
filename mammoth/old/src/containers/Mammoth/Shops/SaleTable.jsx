import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {
    Table, TableBody,  TableHeader, TableHeaderColumn, TableRow, TableRowColumn
}
    from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';
import SaleTableDetail from './SaleTableDetail.jsx'
import NavigationChevronRight from 'material-ui/svg-icons/navigation/chevron-right';
import NavigationBar from './NavigationBar'
import IconButton from 'material-ui/IconButton';

class SaleTable extends React.Component {


    constructor(props) {
        super(props);

        this.state = {
            page: 1,
            pageLineCount: 5,
            height: '300px',
            date: ''
        };
    }
    showdetail(datetime) {
        const {date}=this.state;
        this.setState({date: datetime});
    }
    handleMouseDown_SetPage = (page)=> {
        this.setState({page});
    }

    handleMouseDown_setPageLineCount = (count)=> {
        this.setState({pageLineCount: count});
    }

    render() {
        const {saleData,shops_Id, shops_name} = this.props;
        const {date,page, pageLineCount}=this.state;
        const pageConut = Math.ceil(saleData.length / pageLineCount);
        return (
            <div>

                <div>
                    <Table height={this.state.height}
                    >
                        <TableHeader displaySelectAll={false}>
                            <TableRow>

                            <TableHeaderColumn colSpan="6"  style={{textAlign: 'center'}}>
                                销售记录表
                            </TableHeaderColumn>
                                </TableRow>

                        </TableHeader>
                       <TableBody displayRowCheckbox={false}>
                            <TableRow>
                                <TableRowColumn >序列</TableRowColumn>
                                <TableRowColumn>商铺ID地址</TableRowColumn>
                                <TableRowColumn>到店订单量</TableRowColumn>
                                <TableRowColumn>外卖订单量</TableRowColumn>
                                <TableRowColumn>销售额</TableRowColumn>
                                <TableRowColumn>日期</TableRowColumn>
                                <TableRowColumn >查看详情</TableRowColumn>

                            </TableRow>
                           {
                               saleData.length > 0 ?
                                   saleData.slice((page - 1) * pageLineCount, page * pageLineCount).map((row, index) => (
                                       <TableRow key={index} selectable={true}>
                                           <TableRowColumn>{index + 1 + (page - 1) * pageLineCount}</TableRowColumn>
                                           <TableRowColumn>{shops_Id}</TableRowColumn>
                                           <TableRowColumn>{row['到店次数']}</TableRowColumn>
                                           <TableRowColumn>{row['外卖次数']}</TableRowColumn>
                                           <TableRowColumn>{row['销售额']}</TableRowColumn>
                                           <TableRowColumn>{row['日期']}</TableRowColumn>
                                           <TableRowColumn >
                                               <IconButton
                                                   onTouchTap={()=>{
                                                       let row=this.props.saleData[index];
                                                       if(row) this.showdetail(row['日期'])
                                                   }}
                                               >
                                                   <NavigationChevronRight color={this.context.muiTheme.palette.accent1Color} />
                                               </IconButton>
                                           </TableRowColumn>
                                       </TableRow>
                                   ))
                                   :
                                   <TableRow>
                                       <TableRowColumn colSpan="7"  style={{textAlign:'center',fontSize: '24px',
                                           color: 'gray',height:'160px'}}> 暂无数据!</TableRowColumn>
                                   </TableRow>
                           }
                        </TableBody>
                    </Table>

                    <div style={{width: '34%',marginLeft:'33%'}}>
                        <NavigationBar pageCount={pageConut}
                                       setPage={this.handleMouseDown_SetPage}
                                       setPageLineCount={this.handleMouseDown_setPageLineCount}/>
                    </div>
                </div>
                <div>
                    {
                        date == '' ? null :
                            <SaleTableDetail shopId={shops_Id}
                                             datetime={date}
                            ></SaleTableDetail>
                    }
                </div>
            </div>
        );
    }
}
SaleTable.contextTypes = {
    muiTheme: React.PropTypes.object,
}
export default SaleTable;



