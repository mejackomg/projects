import { connect } from 'react-redux';
import React, {Component, PropTypes} from 'react';
import Subheader from 'material-ui/Subheader';

import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

const tableData = [
    {
        source: '58.201.33.18',
        destination: '171.51.7.198',
        type: 'NetBIOS Name Service攻击',
        time: '2016-4-10 13:40:10'
    },
    {
        source: '145.11.43.2',
        destination: '22.81.116.41',
        type: 'Remote Procedure Call协议攻击',
        time: '2016-4-10 13:41:03'
    },
    {
        source: '191.2.44.131',
        destination: '8.61.127.190',
        type: 'SNMP协议攻击',
        time: '2016-4-10 14:07:14'
    },
    {
        source: '125.122.139.183',
        destination: '221.239.21.188',
        type: 'SQL注入攻击',
        time: '2016-4-10 14:10:51'
    },
    {
        source: '112.112.16.183',
        destination: '219.12.41.210',
        type: 'FTP文件传输协议攻击',
        time: '2016-4-10 14:27:35'
    },
    {
        source: '124.117.232.171',
        destination: '202.203.208.23',
        type: 'HTTPS服务攻击',
        time: '2016-4-10 14:28:47'
    }
];

class MyTable extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fixedHeader: true,
            fixedFooter: false,
            stripedRows: false,
            showRowHover: false,
            selectable: true,
            multiSelectable: false,
            enableSelectAll: false,
            deselectOnClickaway: true,
            showCheckboxes: false,
            height: '200px',
        };
    }

    render() {
        const {data} = this.props;

        return (
            <div>
                {/*         <Subheader style={{
                        textAlign:'center',
                        background:'linear-gradient(to bottom, rgba(100,100,100,0.4) 0%,rgba(100,100,100,0.2) 70%,rgba(100,100,100,0) 100%)'
                    }}>
                    威胁情报&nbsp;&nbsp;
                </Subheader>*/}
                <Table
                    style={{backgroundColor:'transparent',marginLeft:20,width:this.props.width-40}}
                    height={(this.props.height-40)+'px'}//{this.state.height}
                    fixedHeader={this.state.fixedHeader}
                    //fixedFooter={this.state.fixedFooter}
                    selectable={this.state.selectable}
                    multiSelectable={this.state.multiSelectable}
                    onRowSelection={this._onRowSelection}
                    >
                    <TableHeader
                        displaySelectAll={this.state.showCheckboxes}
                        adjustForCheckbox={this.state.showCheckboxes}
                        enableSelectAll={this.state.enableSelectAll}
                        >
                        <TableRow>
                            <TableHeaderColumn tooltip="The ID">攻击时间</TableHeaderColumn>
                            <TableHeaderColumn tooltip="The Name">攻击类型</TableHeaderColumn>
                            <TableHeaderColumn tooltip="The Status">攻击源地址</TableHeaderColumn>
                            <TableHeaderColumn tooltip="The Status">被攻击地址</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody
                        displayRowCheckbox={this.state.showCheckboxes}
                        deselectOnClickaway={this.state.deselectOnClickaway}
                        showRowHover={this.state.showRowHover}
                        stripedRows={this.state.stripedRows}
                        >
                        {tableData.map( (row, index) => (
                            <TableRow key={index} selected={row.selected}>
                                <TableRowColumn>{row.time}</TableRowColumn>
                                <TableRowColumn>{row.type}</TableRowColumn>
                                <TableRowColumn>{row.source}</TableRowColumn>
                                <TableRowColumn>{row.destination}</TableRowColumn>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        );
    }
}

MyTable.propTypes = {
    data: PropTypes.array,//.isRequired,
    width:PropTypes.number.isRequired,
    height:PropTypes.number.isRequired,
};

const mapStateToProps=(state)=> {
    const { dataReducer } = state;
  return {
    data: dataReducer.data,
  };
}

export default connect(
    mapStateToProps
)(MyTable);
