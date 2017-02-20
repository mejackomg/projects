/**
 * Created by apple on 2016/11/29.
 */

import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import {LARGE, MEDIUM, SMALL}  from 'material-ui/utils/withWidth';
import {List, ListItem} from 'material-ui/List';


import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import keys from 'object-keys';
import Checkbox from 'material-ui/Checkbox';
import Divider from 'material-ui/Divider';
import NavigationBar from '../DataManage/NavigationBar.jsx'

import {
    grey50,
    lightGray,
} from 'material-ui/styles/colors';

class EventTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isInputChecked: false,
            temp: [],
            sum: 0,
            sumAvg: 0,
            page: 1,
            pageLineCount: 10,
            height: '300px',
            sumTriigerTimes:[],
            sumPeopleTimes:[],
        };
    }

    componentWillReceiveProps (nextProps) {
        if(nextProps.tableData != this.props.tableData ) {
            var sumTrigger=0;
            var sumPeople=0;
            var Trigger=[];
            var People=[];
            const {tableData} =this.props;
            Object.keys(nextProps.tableData).forEach((item,key)=>{
                Object.keys(nextProps.tableData[item]).forEach((items,index)=>{
                    sumTrigger=sumTrigger+nextProps.tableData[item][items]['总触发次数'];
                    sumPeople=sumPeople+nextProps.tableData[item][items]['触发用户数'];
                })
                Trigger.push(sumTrigger);
                People.push(sumPeople);
                sumTrigger=0;
                sumPeople=0;
            })
            this.setState({
                sumTriggerTimes:Trigger,
                sumPeopleTimes:People
            });

        }
    }


    inputChecked = (event, isInputChecked) => {
        var sumTrigger=0;
        var sumPeople=0;
        var Trigger=[];
        var People=[];
        var jian=0;
        const {tableData} =this.props;
        Object.keys(tableData).forEach((item,key)=>{
            Object.keys(tableData[item]).forEach((items,index)=>{
                sumTrigger=sumTrigger+tableData[item][items]['总触发次数'];
                sumPeople=sumPeople+tableData[item][items]['触发用户数'];
            })
            Trigger.push(sumTrigger);
            People.push(sumPeople);
            sumTrigger=0;
            sumPeople=0;
        })
        this.setState({
            isInputChecked: isInputChecked,
            sumTriggerTimes:Trigger,
            sumPeopleTimes:People
        });

    }

    handleMouseDown_SetPage = (page)=> {
        this.setState({page});
    }

    handleMouseDown_setPageLineCount = (count)=> {
        this.setState({pageLineCount: count});
    }


    render() {
        const {isInputChecked, sum, page, pageLineCount,sumTriggerTimes,sumPeopleTimes} =this.state;
        const {tableData, type, times, sumTimes}=this.props;
        console.log(sumTriggerTimes)
        // const pageConut = Math.ceil(tableData.length / pageLineCount);
        let everyday = [];
        let coulumn=[];
        let singleDays = [];
        if (!tableData) {
            console.log(!tableData)
        }
        else {
            coulumn=keys(tableData)
            singleDays = (Object.keys(tableData)).map((key)=> {
                return tableData[key]
            })
            if (singleDays.length > 0) {
                everyday = keys(singleDays[0])
            }

        }
        return (
            <div>
                <div style={{maxWidth: 250, marginLeft: '20px'}}>
                    <Checkbox
                        label="显示合计"
                        onCheck={this.inputChecked}
                        disabled={everyday.length > 0 ? false : true }
                        style={{marginBottom: 16, marginTop: '10px'}}
                    />
                </div>

                <Divider style={{backgroundColor: this.context.muiTheme.palette.accent1Color}}/>



                <Table bodyStyle={{minWidth: 0}}>

                    <TableBody displayRowCheckbox={false}>
                        <TableRow>
                            {
                                <TableHeaderColumn style={{
                                    width: '0px',
                                    textAlign: 'center',
                                    marginLeft: '0px',
                                    paddingRight: '0px'
                                }}>{type}</TableHeaderColumn>
                            }
                            {
                                isInputChecked == true ?
                                    <TableHeaderColumn
                                        style={{width: '0px', textAlign: 'center'}}>合计</TableHeaderColumn>
                                    :
                                    <TableHeaderColumn style={{width: '0px', textAlign: 'center'}}></TableHeaderColumn>
                            }

                            {
                                everyday.length > 0 ?
                                    everyday.map((items, key)=>(
                                        <TableHeaderColumn style={{width: '0px', textAlign: 'center'}}
                                                           key={key + 'everyday'}>{items}</TableHeaderColumn>
                                    )) : null
                            }
                        </TableRow>

                        {
                            Object.keys(tableData).map((item, key)=>(
                                <TableRow key={key + 'tableData'} style={{width: '0px'}}>
                                    <TableRowColumn style={{width: '0px', textAlign: 'center'}}>{item}</TableRowColumn>
                                    {
                                        isInputChecked == true ?
                                            (times == '总次数' ?

                                                    <TableRowColumn style={{
                                                        width: '0px',
                                                        textAlign: 'center'
                                                    }}>{sumTriggerTimes[key]}</TableRowColumn>

                                                    :
                                                    <TableRowColumn  style={{
                                                        width: '0px',
                                                        textAlign: 'center'
                                                    }}>{sumPeopleTimes[key]}</TableRowColumn>

                                            )
                                            :
                                            <TableRowColumn
                                                style={{width: '0px', textAlign: 'center'}}></TableRowColumn>
                                    }
                                    {times == '总次数' ?
                                        Object.keys(tableData[item]).map((items, index)=>(
                                            <TableRowColumn style={{width: '0px', textAlign: 'center'}}
                                                            key={index + 'item'}>
                                                {tableData[item][items]['总触发次数']}
                                            </TableRowColumn>
                                        ))
                                        :
                                        Object.keys(tableData[item]).map((items, index)=>(
                                            <TableRowColumn style={{width: '0px', textAlign: 'center'}}
                                                            key={index + 'item'}>{tableData[item][items]['触发用户数']}</TableRowColumn>
                                        ))
                                    }

                                </TableRow>
                            ))
                        }
                    </TableBody>
                    }


                </Table>
                {/*<div style={{width: '34%', marginLeft: '33%'}}>
                 <NavigationBar pageCount={pageConut}
                 setPage={this.handleMouseDown_SetPage}
                 setPageLineCount={this.handleMouseDown_setPageLineCount}/>
                 </div>*/}


            </div>
        );
    }
}

EventTable.contextTypes = {
    muiTheme: React.PropTypes.object,
}

EventTable.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
    return {};
}
export default connect(
    mapStateToProps
)(EventTable);



