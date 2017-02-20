/**
 * Created by Administrator on 2016-11-03.
 */

import React ,{ Component, PropTypes } from 'react';

import {Link} from 'react-router';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import IconButton from 'material-ui/IconButton';
import withWidth, {LARGE, MEDIUM,SMALL}  from '../../../utils/withWidth';
import MoreVert from 'material-ui/svg-icons/navigation/more-vert.js'
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import { connect } from 'react-redux';
import CircularProgress from 'material-ui/CircularProgress';
import {
    darkBlack
} from 'material-ui/styles/colors';
import keys from 'object-keys';
import { is } from 'immutable';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Snackbar from 'material-ui/Snackbar';
import TabMenuBar from '../Shops/TabMenuBar.jsx';
import ShopsSearchBar from '../Shops/ShopsSearchBar.jsx'
import ShopsNavigationBar from '../Shops/ShopsNavigationBar.jsx'
import DatePicker from 'material-ui/DatePicker';

import {loadSystemLog} from '../../../reducers/database.js';

class SystemLog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            page: 1,
            pageLineCount: 10,
            advancedSearch: false,
            searchText: '',
            showFilterResult: false,
            creditFrom: null,
            creditTo: null
        };
    }

    componentDidMount() {
        const { dispatch} = this.props;
        const {page,pageLineCount,searchText,creditFrom,creditTo} = this.state;
        dispatch(loadSystemLog(page, pageLineCount, searchText, creditFrom, creditTo));
    }

    shouldComponentUpdate = (nextProps = {}, nextState = {}) => {
        return true;//false,页面不刷新数据
    }

    getStyles() {
        const styles = {
            underlineStyle: {
                borderColor: this.context.muiTheme.palette.accent1Color,//alternateTextColor,
            },
            searchBar: {
                zIndex: this.context.muiTheme.zIndex.appBar,//-1,
                backgroundColor: this.context.muiTheme.palette.accent2Color,//alternateTextColor,
                height: this.context.muiTheme.palette.desktopSubheaderHeight
            },
            content: {
                margin: this.context.muiTheme.spacing.desktopGutter,
                //marginBottom:0
                //paddingTop: this.context.muiTheme.spacing.desktopSubheaderHeight,
            },
            contentWhenMedium: {
                margin: `${this.context.muiTheme.spacing.desktopGutter * 2}px  ${this.context.muiTheme.spacing.desktopGutter * 3}px`,
                //marginTop:this.context.muiTheme.spacing.desktopGutter
            },

            creditStyle: {
                width: '35px',
                display: 'inline-block',
                margin: '0 20px',
                lineHeight: '56px',
                fontSize: 16,
                color: 'rgba(0, 0, 0, 0.4)'
            }
        }
        if (this.props.width === MEDIUM || this.props.width === LARGE)
            styles.content = Object.assign(styles.content, styles.contentWhenMedium);
        return styles;
    }

    handleMouseDown_SetPage = (page)=> {
        this.setState({page: page});
        const {dispatch} = this.props;
        const {pageLineCount,searchText,creditFrom,creditTo} = this.state;
        dispatch(loadSystemLog(page, pageLineCount, searchText, creditFrom, creditTo));

    }

    handleMouseDown_setPageLineCount = (count)=> {
        this.setState({pageLineCount: count});
        const {dispatch} = this.props;
        const {page,searchText,creditFrom,creditTo} = this.state;
        dispatch(loadSystemLog(page, count, searchText, creditFrom, creditTo));

    }

    handleMouseDown_AdvancedSearch = ()=> {
        this.setState({advancedSearch: !this.state.advancedSearch});
    }

    handleMouseDown_ClearSearch = ()=> {
        this.setState({
            page: 1,
            searchText: '',
            showFilterResult: false
        });
        const {dispatch} = this.props;
        const {page,pageLineCount,creditFrom,creditTo} = this.state;
        dispatch(loadSystemLog(1, pageLineCount, '', creditFrom, creditTo));
    }


    onNewRequest_AutoComplete = (chosenRequest, index)=> {
        const {dispatch} = this.props;
        this.setState({
            page: 1,
            searchText: chosenRequest,
            showFilterResult: true
        })
        const {pageLineCount,creditFrom,creditTo} = this.state;
        dispatch(loadSystemLog(1, pageLineCount, chosenRequest, creditFrom, creditTo));
    }


    handleChangeFromDate = (event, date) => {
        this.setState({
            fromDate: date,
            minDate: date
        });
        const {dispatch} = this.props;
        const {toDate, page,pageLineCount, searchText} = this.state;
        if (date && toDate) {
            dispatch(loadSystemLog(page, pageLineCount, searchText, date, toDate));
        }
    };
    handleChangeToDate = (event, date) => {
        this.setState({
            toDate: date,
            maxDate: date
        });
        const {dispatch} = this.props;
        const {fromDate,page, pageLineCount, searchText} = this.state;

        if (fromDate && date) {
            dispatch(loadSystemLog(page, pageLineCount, searchText, fromDate, date));
        }
    };

    handleTouchTap = () => {
        this.setState({
            open: true,
        });
    };

    handleRequestClose = () => {
        this.setState({
            open: false,
        });
    };
    tableRender = (data, list)=> {

        const { page,pageLineCount } = this.state;
        return (
            <Table
                fixedHeader={true}
                bodyStyle={{minHeight: 400}}
            >
                <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
                    <TableRow>
                        <TableHeaderColumn style={{width: 45}}>序号</TableHeaderColumn>
                        {
                            list.map((column, key)=>
                                column.indexOf('id') != -1 ? null :
                                    <TableHeaderColumn key={key} style={{width: column == '内容' ? 'auto' : 120}}>
                                        {column}
                                    </TableHeaderColumn>
                            )
                        }
                    </TableRow>
                </TableHeader>
                <TableBody
                    displayRowCheckbox={false}
                >
                    {data.map((row, index) =>
                        <TableRow key={index}>
                            <TableRowColumn style={{width: 45}}>{index + 1 + (page - 1) * pageLineCount}
                            </TableRowColumn>
                            {
                                list.map((column, key) =>
                                    column.indexOf('id') != -1 ? null :
                                        <TableRowColumn key={key} style={{width: column == '内容' ? 'auto' : 120}}>
                                            {row[column]}
                                        </TableRowColumn>
                                )
                            }
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        )
    }

    render() {
        const styles = this.getStyles();
        const {systemLogData,systemLogCount} = this.props;
        var shopsColumnList = ['用户名','用户平台名','内容','日志时间'];
        const { page,pageLineCount,searchText,showFilterResult } = this.state;
        return (
            <div style={styles.content}>
                <Paper>
                    <Toolbar>
                        <ToolbarGroup>
                            <ToolbarTitle text="系统日志"/>
                        </ToolbarGroup>
                    </Toolbar>
                    {
                        this.props.logLoaded &&
                        <Toolbar style={styles.searchBar}>
                            <ShopsSearchBar //advancedSearch={this.handleMouseDown_AdvancedSearch}
                                onNewRequest={this.onNewRequest_AutoComplete}
                                clearSearch={this.handleMouseDown_ClearSearch}
                                showCloseButton={showFilterResult}
                                searchText={searchText}
                                data={[]}
                            />
                            <div style={{display: 'flex', flexDirection: 'row'}}>
                                <DatePicker
                                    underlineStyle={styles.underlineStyle}
                                    style={{minWidth: '0px', width: '85px', overflow: 'hidden'}}
                                    textFieldStyle={{width: '100%'}}
                                    hintText="开始日期"
                                    autoOk={true}
                                    maxDate={this.state.maxDate}
                                    value={this.state.fromDate}
                                    onChange={this.handleChangeFromDate}
                                />

                                <div style={styles.creditStyle}>—</div>
                                <DatePicker
                                    underlineStyle={styles.underlineStyle}
                                    style={{minWidth: '0px',width:'85px',overflow:'hidden',marginLeft:'-5px'}}
                                    textFieldStyle={{width:'100%'}}
                                    hintText="结束日期"
                                    autoOk={true}
                                    minDate={this.state.minDate}
                                    value={this.state.toDate}
                                    onChange={this.handleChangeToDate}
                                />

                            </div>
                            <ShopsNavigationBar pageCount={pageLineCount} value={page} total={systemLogCount}
                                                setPage={this.handleMouseDown_SetPage}
                                                setPageLineCount={this.handleMouseDown_setPageLineCount}/>
                        </Toolbar>
                    }
                    {
                        systemLogData.length < 0 ?
                            <div style={{display:'flex', justifyContent:'center'}}>
                                <CircularProgress style={{margin:80}} size={1.5}/>
                            </div>
                            :
                            this.tableRender(systemLogData, shopsColumnList)
                    }
                    {
                        this.props.loading &&
                        <div style={{display:'flex', justifyContent:'center'}}>
                            <CircularProgress style={{margin:-350}} size={1.5}/>
                        </div>
                    }
                </Paper>
            </div>
        );
    }
}

SystemLog.propTypes = {
    dispatch: PropTypes.func.isRequired,
};
SystemLog.contextTypes = {
    muiTheme: React.PropTypes.object,
}

const mapStateToProps = (state) => {
    const { databaseReducer} = state;
    return {
        systemLogData: databaseReducer.systemLogDataResult.systemLogData,
        systemLogCount: databaseReducer.systemLogDataResult.systemLogCount,
        logLoaded: databaseReducer.logLoaded,
    };
};
export default connect(
    mapStateToProps
)(withWidth()(SystemLog));



