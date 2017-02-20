/**
 * Created by apple on 2016/12/12.
 */

import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import {LARGE, MEDIUM, SMALL}  from 'material-ui/utils/withWidth';
import {List, ListItem} from 'material-ui/List';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import keys from 'object-keys';
import NavigationBar from './NavigationBar'

import {
    grey50,
    lightGray,
} from 'material-ui/styles/colors';


class RepaymentTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            pageLineCount: 5,
            height: '190px',
        };
    }


    handleMouseDown_SetPage = (page)=> {
        this.setState({page});
    }

    handleMouseDown_setPageLineCount = (count)=> {
        this.setState({pageLineCount: count});
    }

    render() {
        const {page, pageLineCount} =this.state;
        const {repayRecord} =this.props;
        const pageConut = Math.ceil(repayRecord.length / pageLineCount);
        let columns = [];
        if (repayRecord.length > 0) {
            columns = keys(repayRecord[0]);
        }
        return (
            <div>
                <Table  height={this.state.height}>

                    <TableBody
                        showRowHover={true}
                        displayRowCheckbox={false}>
                        <TableRow >
                            <TableRowColumn style={{width:50,textAlign:'center'}}>序列</TableRowColumn>
                            <TableRowColumn style={{textAlign:'center'}}>还款时间</TableRowColumn>
                            <TableRowColumn style={{textAlign:'center'}}>还款金额</TableRowColumn>
                            <TableRowColumn style={{textAlign:'center'}}>风险评估</TableRowColumn>
                        </TableRow>
                        {
                            repayRecord.length > 0 ?
                                repayRecord.slice((page - 1) * pageLineCount, page * pageLineCount).map((row, index) => (
                                    < TableRow key={index + 1 + (page - 1) * pageLineCount}>
                                        <TableRowColumn style={{width:50,textAlign:'center'
                                        }}>{index + 1}</TableRowColumn>
                                        {
                                            columns.map((column, key) => <TableRowColumn
                                                style={{textAlign:'center'}}
                                                key={key}>{row[column]}</TableRowColumn>)
                                        }
                                    </TableRow>
                                ))
                                :
                                <TableRow>
                                    <TableRowColumn colSpan="4" style={{
                                        textAlign: 'center', fontSize: '24px',
                                        color: 'gray', height: '160px'
                                    }}> 暂无数据!</TableRowColumn>
                                </TableRow>
                        }

                    </TableBody>
                </Table>

                <div style={{width:'55%',margin:'100 auto 0 auto'}}>
                    <NavigationBar
                        pageCount={pageConut}
                                   setPage={this.handleMouseDown_SetPage}
                                   setPageLineCount={this.handleMouseDown_setPageLineCount}/>
                </div>
            </div>
        );
    }
}

RepaymentTable.contextTypes = {
    muiTheme: React.PropTypes.object,
}

RepaymentTable.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
    return {};
}
export default connect(
    mapStateToProps
)(RepaymentTable);

