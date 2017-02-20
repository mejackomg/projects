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
    },
    propToggleHeader: {
        margin: '20px auto 10px',
    },
};

const tableData = [
    {
        name: 'John Smith',
        status: 'Employed',
        selected: true,
        favorite:'喜剧'
    },
    {
        name: 'Randal White',
        status: 'Unemployed',
        favorite:'喜剧'
    },
    {
        name: 'Stephanie Sanders',
        status: 'Employed',
        selected: true,
        favorite:'喜剧'
    },
    {
        name: 'Steve Brown',
        status: 'Employed',
        favorite:'喜剧'
    },
    {
        name: 'Joyce Whitten',
        status: 'Employed',
        favorite:'喜剧'
    },
    {
        name: 'Samuel Roberts',
        status: 'Employed',
        favorite:'喜剧'
    },
    {
        name: 'Adam Moore',
        status: 'Employed',
        favorite:'喜剧'
    },
];

export default class CustomTable extends React.Component {

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
            height: '250px',
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
                    selectable={this.state.selectable}
                    multiSelectable={this.state.multiSelectable}
                >
                    <TableHeader
                        displaySelectAll={this.state.showCheckboxes}
                        adjustForCheckbox={this.state.showCheckboxes}
                        enableSelectAll={this.state.enableSelectAll}
                    >

                        <TableRow>
                            <TableHeaderColumn tooltip="The ID">会员ID</TableHeaderColumn>
                            <TableHeaderColumn tooltip="The Name">消费能力</TableHeaderColumn>
                            <TableHeaderColumn tooltip="The Status">消费意愿</TableHeaderColumn>
                            <TableHeaderColumn tooltip="The favorite">消费偏好</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody
                        displayRowCheckbox={this.state.showCheckboxes}
                        deselectOnClickaway={this.state.deselectOnClickaway}
                        showRowHover={this.state.showRowHover}
                        stripedRows={this.state.stripedRows}
                    >
                        {tableData.map((row, index) => (
                            <TableRow key={index} selected={row.selected}>
                                <TableRowColumn>{index}</TableRowColumn>
                                <TableRowColumn>{row.name}</TableRowColumn>
                                <TableRowColumn>{row.status}</TableRowColumn>
                                <TableRowColumn>{row.favorite}</TableRowColumn>
                            </TableRow>
                        ))}
                    </TableBody>

                </Table>


            </div>
        );
    }
}