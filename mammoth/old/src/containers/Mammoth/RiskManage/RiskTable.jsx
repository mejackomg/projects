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
const data = [
    {
        name:'活动1',
        time:'10:08',
        typename:'类型1',
        money:' 32157',
        status:'终止交易'
    },
    {
        name:'活动2',
        time:'9:54',
        typename:'类型2',
        money:' 4321',
        status:'终止交易'
    },
    {
        name:'活动3',
        time:'8:46',
        typename:'类型3',
        money:' 1437',
        status:'终止交易'
    }
];
export default class RiskTable extends React.Component {


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
            height: '160px',
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
    getData = ()=>{
        const data = [
            {
                name:'活动1',
                time:'10:08',
                typename:'类型1',
                money:' 32157',
                status:'终止交易'
            },
            {
                name:'活动2',
                time:'9:54',
                typename:'类型2',
                money:' 4321',
                status:'终止交易'
            },
            {
                name:'活动3',
                time:'8:46',
                typename:'类型3',
                money:' 1437',
                status:'终止交易'
            }
        ];
        return data;
    }
    render() {
        const data =  this.getData();
        // console.log(data);
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
                            <TableHeaderColumn colSpan="5" tooltip="实时欺诈交易监控" style={{textAlign: 'left',fontSize:'16px'}}>
                                实时欺诈交易监控
                            </TableHeaderColumn>
                        </TableRow>
                        <TableRow>

                            <TableHeaderColumn tooltip="商户/会员">商户/会员</TableHeaderColumn>
                            <TableHeaderColumn tooltip="时间">时间</TableHeaderColumn>
                            <TableHeaderColumn tooltip="欺诈类型">欺诈类型</TableHeaderColumn>
                            <TableHeaderColumn tooltip="交易金额">交易金额</TableHeaderColumn>
                            <TableHeaderColumn tooltip="处理">处理</TableHeaderColumn>

                        </TableRow>
                    </TableHeader>
                    <TableBody
                        displayRowCheckbox={this.state.showCheckboxes}
                        deselectOnClickaway={this.state.deselectOnClickaway}
                        showRowHover={this.state.showRowHover}
                        stripedRows={this.state.stripedRows}
                    >
                        {/*{data.map( (row, index) => (*/}
                            {/*<TableRow key={index} >*/}
                                {/*<TableRowColumn>{index}</TableRowColumn>*/}
                                {/*<TableRowColumn>{row.shopsid}</TableRowColumn>*/}
                                {/*<TableRowColumn>{row.shopsname}</TableRowColumn>*/}
                                {/*<TableRowColumn>{row['日期']}</TableRowColumn>*/}
                                {/*<TableRowColumn>{row['订单量']}</TableRowColumn>*/}
                                {/*<TableRowColumn>{row['订单金额']}</TableRowColumn>*/}
                            {/*</TableRow>*/}
                        {/*))}*/}
                        {data.map( (row, index) => (
                            <TableRow key={index} >
                                <TableRowColumn>{row.name}</TableRowColumn>
                                <TableRowColumn>{row.time}</TableRowColumn>
                                <TableRowColumn>{row.typename}</TableRowColumn>
                                <TableRowColumn>{row.money}</TableRowColumn>
                                <TableRowColumn>{row.status}</TableRowColumn>
                            </TableRow>
                        ))}
                    </TableBody>

                </Table>


            </div>
        );
    }
}