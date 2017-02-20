
import React ,{ Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import {Link} from 'react-router';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import IconButton from 'material-ui/IconButton';
import {LARGE, MEDIUM,SMALL}  from 'material-ui/utils/withWidth';
import Delete from 'material-ui/svg-icons/action/delete-forever.js'
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import CircularProgress from 'material-ui/CircularProgress';
import keys from 'object-keys';

import {
    grey50,
    lightGray,
} from 'material-ui/styles/colors';

import { deleteMappingData} from '../../../reducers/database.js';


class ConfigTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.data && this.props.data != nextProps.data) {
            this.setState({
                loading: false,
            });
        }
    }

    deleteRow_Table(configId, configTableId) {
        this.props.dispatch(deleteMappingData(configId, configTableId));
    }

    render() {
        const { data,page,pageLineCount,selectedRowIndex } = this.props;
        let columns = [];
        if (data.length > 0)
            columns = keys(data[0]);

        return (
            this.state.loading ?
                <div style={{display:'flex', justifyContent:'center'}}>
                    <CircularProgress style={{margin:80}} size={1.5}/>
                </div>
                :
                <Table
                    fixedHeader={true}
                    bodyStyle={{minHeight:200,width:1800}}
                    onRowSelection={this.props.onRowSelection}
                >
                    <TableHeader adjustForCheckbox={false} displaySelectAll={false}
                        //` style={{backgroundColor:this.context.muiTheme.palette.accent2Color}}
                    >
                        <TableRow>
                            <TableHeaderColumn style={{width: 55}}>删除</TableHeaderColumn>
                            <TableHeaderColumn style={{width: 55}}>序号</TableHeaderColumn>
                            {
                                columns.map((column, key)=> <TableHeaderColumn style={{width: 150}}
                                                                               key={key}>{column}</TableHeaderColumn>)
                            }
                        </TableRow>
                    </TableHeader>

                    <TableBody
                        displayRowCheckbox={false}
                        //showRowHover={true}
                        //stripedRows={true}
                    >
                        {data.slice((page - 1) * pageLineCount, page * pageLineCount).map((row, index) => (
                            <TableRow key={index} selected={index==selectedRowIndex}>
                                <TableRowColumn style={{width: 60}}>
                                    <IconButton
                                        style={{marginLeft:-10}}
                                        onTouchTap={()=>{
                                         let row=this.props.data[index];
                                            if(row) this.deleteRow_Table(row.config_id,row.config_table_id)
                                        }}
                                    >

                                        <Delete/>
                                    </IconButton>
                                </TableRowColumn>
                                <TableRowColumn style={{width: 50}}>{index + 1 + (page - 1) * pageLineCount}</TableRowColumn>
                                {
                                    columns.map((column, key) => <TableRowColumn style={{width: 150}}
                                                                                 key={key}>{row[column]}</TableRowColumn>)
                                }
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
        );
    }
}

ConfigTable.contextTypes = {
    muiTheme: React.PropTypes.object,
}

ConfigTable.propTypes = {
    dispatch:PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
    return {

    };
}
export default connect(
    mapStateToProps
)(ConfigTable);


