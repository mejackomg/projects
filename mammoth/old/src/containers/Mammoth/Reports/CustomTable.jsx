/**
 * Created by Administrator on 2016-11-02.
 */
import React from 'react';
import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn}
    from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';

const styles = {
    propContainer: {
        width: '50px',
        overflow: 'hidden',
        margin: '20px auto 0',
        allRowsSelected:'false'
    },
    propToggleHeader: {
        margin: '20px auto 10px',
    },
};

const tableData = [
    {
        name: '苹果产品专卖店',
        number: '8292',
       // selected: true,

    },
    {
        name: '香蕉数码',
        number: '5355',

    },
    {
        name: '天源笔记本',
        number: '5307',
        //selected: true,

    },
    {
        name: '橘子数码3C专卖店',
        number: '4251',

    },
    {
        name: '老王的手机小店',
        number: '3510',

    }
];

export default class CustomTable extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            fixedHeader: true,
            fixedFooter: true,
            stripedRows: false,
            showRowHover: false,
         //   selectable: true,
            multiSelectable: false,
            enableSelectAll: false,
            deselectOnClickaway: true,
            showCheckboxes: true,
            height: '200px',
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
        return (
            <div>
                <Table
                    height={this.state.height}
                    fixedHeader={this.state.fixedHeader}
                    fixedFooter={this.state.fixedFooter}
                   // selectable={this.state.selectable}
                   // multiSelectable={this.state.multiSelectable}
                >
                    <TableHeader
                     //   displaySelectAll={this.state.showCheckboxes}
                        adjustForCheckbox={this.state.showCheckboxes}
                      //  enableSelectAll={this.state.enableSelectAll}
                    >

                        <TableRow>

                            <TableHeaderColumn tooltip="The Name">店铺名称</TableHeaderColumn>
                            <TableHeaderColumn tooltip="The Number">用户数量（人）</TableHeaderColumn>

                        </TableRow>
                    </TableHeader>
                    <TableBody
                      //  displayRowCheckbox={this.state.showCheckboxes}
                        deselectOnClickaway={this.state.deselectOnClickaway}
                        showRowHover={this.state.showRowHover}
                        stripedRows={this.state.stripedRows}
                    >
                        {tableData.map((row, index) => (
                            <TableRow key={index} selected={row.selected}>

                                <TableRowColumn>{row.name}</TableRowColumn>
                                <TableRowColumn>{row.number}</TableRowColumn>

                            </TableRow>
                        ))}
                    </TableBody>

                </Table>


            </div>
        );
    }
}