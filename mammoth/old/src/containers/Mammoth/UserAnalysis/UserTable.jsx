import React from 'react';
import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn}
    from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';

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

export default class UserTable extends React.Component {


    constructor(props) {
        super(props);

        this.state = {
            fixedHeader: true,
            fixedFooter: true,
            stripedRows: false,
            showRowHover: false,
            selectable: true,
            multiSelectable: false,
            enableSelectAll: false,
            deselectOnClickaway: true,
            showCheckboxes: false,
            height: '300px',
        };
    }

    handleToggle = (event, toggled) => {
        this.setState({
            [event.target.name]: toggled,
        });
    };

    handleChange = (event) => {
        this.setState({height: event.target.value});
    };

    render() {
        console.log(this.props);
        const {data} = this.props;
        console.log(data);
        return (
            <div>
                <Table
                    height={this.state.height}
                    fixedHeader={this.state.fixedHeader}
                    fixedFooter={this.state.fixedFooter}
                    selectable={this.state.selectable}
                    multiSelectable={this.state.multiSelectable}
                >
                    <TableHeader
                        displaySelectAll={this.state.showCheckboxes}
                        adjustForCheckbox={this.state.showCheckboxes}
                        enableSelectAll={this.state.enableSelectAll}
                    >
                        <TableRow>
                            <TableHeaderColumn colSpan="6" tooltip="销售记录表" style={{textAlign: 'center'}}>
                                销售记录表
                            </TableHeaderColumn>
                        </TableRow>
                        <TableRow>

                            <TableHeaderColumn tooltip="序列">序列</TableHeaderColumn>
                            <TableHeaderColumn tooltip="商铺ID地址">商铺ID地址</TableHeaderColumn>
                            <TableHeaderColumn tooltip="商铺名字">商铺名字</TableHeaderColumn>
                            <TableHeaderColumn tooltip="日期">日期</TableHeaderColumn>
                            <TableHeaderColumn tooltip="订单量">订单量</TableHeaderColumn>
                            <TableHeaderColumn tooltip="订单金额">订单金额</TableHeaderColumn>

                        </TableRow>
                    </TableHeader>
                    <TableBody
                        displayRowCheckbox={this.state.showCheckboxes}
                        deselectOnClickaway={this.state.deselectOnClickaway}
                        showRowHover={this.state.showRowHover}
                        stripedRows={this.state.stripedRows}
                    >
                        {data.map( (row, index) => (
                            <TableRow key={index} >
                                <TableRowColumn>{index}</TableRowColumn>
                                <TableRowColumn>{row.userId}</TableRowColumn>
                                <TableRowColumn>{row.shopsname}</TableRowColumn>
                                <TableRowColumn>{row['日期']}</TableRowColumn>
                                <TableRowColumn>{row['订单量']}</TableRowColumn>
                                <TableRowColumn>{row['订单金额']}</TableRowColumn>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter
                        adjustForCheckbox={this.state.showCheckboxes}
                    >
                        <TableRow>
                            <TableRowColumn>排名</TableRowColumn>
                            <TableRowColumn>订单</TableRowColumn>
                            <TableRowColumn>金额</TableRowColumn>
                        </TableRow>
                        <TableRow>
                            <TableRowColumn colSpan="3" style={{textAlign: 'center'}}>
                                销售记录表
                            </TableRowColumn>
                        </TableRow>
                    </TableFooter>
                </Table>


            </div>
        );
    }
}