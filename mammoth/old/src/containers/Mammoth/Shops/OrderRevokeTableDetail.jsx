/**
 * Created by apple on 2016/12/4.
 */

/**
 * Created by apple on 2016/12/2.
 */

import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {
    Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn
}
    from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';
import {loadOrderRevokeDetail} from '../../../reducers/database.js'
import NavigationBar from './NavigationBar'
import Divider from 'material-ui/Divider';


const styles = {
    propContainer: {
        width: 200,
        overflow: 'hidden',
        margin: '20px auto 0',
    },
    propToggleHeader: {
        margin: '20px auto 10px',
    },
};

class OrderRevokeTableDetail extends React.Component {


    constructor(props) {
        super(props);

        this.state = {
            page: 1,
            pageLineCount: 5,
            fixedHeader: true,
            fixedFooter: true,
            stripedRows: false,
            showRowHover: false,
            selectable: true,
            multiSelectable: false,
            enableSelectAll: false,
            deselectOnClickaway: true,
            showCheckboxes: true,
            height: '300px',
        };
    }

    componentDidMount() {
        const {dispatch, shopId, datetime} = this.props;
        dispatch(loadOrderRevokeDetail(shopId, datetime));
    }
    componentWillReceiveProps(nextProps) {

        if (nextProps.datetime && this.props.datetime != nextProps.datetime) {
            const {dispatch} = this.props;
            dispatch(loadOrderRevokeDetail(nextProps.shopId,nextProps.datetime));
        }

    }

    handleMouseDown_SetPage = (page)=> {
        this.setState({page});
    }

    handleMouseDown_setPageLineCount = (count)=> {
        this.setState({pageLineCount: count});
    }


    render() {
        const {OrderRevokeDetail} = this.props;
        const {page, pageLineCount}=this.state;
        const pageConut = Math.ceil(OrderRevokeDetail.length / pageLineCount);
        return (
            <div>
                <Divider />

                <Table height={this.state.height}>
                    <TableHeader displaySelectAll={false}>
                        <TableRow>
                            <TableHeaderColumn colSpan="6"  style={{textAlign: 'center'}}>
                                销售记录详情表<span style={{marginLeft:'15px',color:'#FF4081'}}>{this.props.datetime}</span>
                            </TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={false}>
                        <TableRow style={{}}>
                            <TableRowColumn >序列</TableRowColumn>
                            <TableRowColumn >用户ID</TableRowColumn>
                            <TableRowColumn >消费金额</TableRowColumn>
                            <TableRowColumn >消费类型</TableRowColumn>
                            <TableRowColumn >消费时间</TableRowColumn>
                        </TableRow>
                        {OrderRevokeDetail.slice((page - 1) * pageLineCount, page * pageLineCount).map((row, index) => (
                            <TableRow key={index}> <TableRowColumn>{index + 1 + (page - 1) * pageLineCount}</TableRowColumn>
                                <TableRowColumn>{row['customer_id']}</TableRowColumn>
                                <TableRowColumn>{row['money']}</TableRowColumn>
                                {
                                    row['type'] == 0 ?
                                        <TableRowColumn>到店</TableRowColumn> :
                                        <TableRowColumn>外卖</TableRowColumn>
                                }
                                <TableRowColumn>{row['pay_time']}</TableRowColumn>
                            </TableRow>                         ))}
                    </TableBody>
                </Table>

                <div style={{width: '34%',marginLeft:'33%'}}>
                    <NavigationBar pageCount={pageConut}
                                   setPage={this.handleMouseDown_SetPage}
                                   setPageLineCount={this.handleMouseDown_setPageLineCount}/>
                </div>




            </div>
        );
    }
}
OrderRevokeTableDetail.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

OrderRevokeTableDetail.contextTypes = {
    muiTheme: React.PropTypes.object,
}

const mapStateToProps = (state) => {
    const {databaseReducer} = state;
    return {
        OrderRevokeDetail: databaseReducer.OrderRevokeDetail
    };
};

export default connect(
    mapStateToProps
)(OrderRevokeTableDetail);







