import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import ActiveTheme from '../../../mui-themes/active-theme.js';
import getMuiTheme from '../../../../node_modules/material-ui/styles/getMuiTheme';
import withWidth, {LARGE, MEDIUM,SMALL}  from '../../../utils/withWidth';

import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import {Tabs, Tab} from 'material-ui/Tabs';
import Title from 'react-title-component';
import keys from 'object-keys';
import Snackbar from 'material-ui/Snackbar';
import Paper from 'material-ui/Paper';

import { loadTransTable,/*loadMappingTable*/} from '../../../reducers/database.js';
import SearchBar from './SearchBar.jsx'
import NavigationBar from './NavigationBar.jsx'
import ConfigTable from './ConfigTable.jsx'
import EditForm from './EditForm.jsx'

class DataTransforPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            pageLineCount: 10,
            filterResult: [],
            searchText_Platform: '',
            isPlatformFilter: false,
            searchText_Src: '',
            isSrcTableFilter: false,
            searchText_Dst: '',
            isDstTableFilter: false,
            selectedRow:-1,
            snackbarOpen: false,
            snackbarMessage: '',
        };
    }

    getChildContext() {
        return ( {
            muiTheme: this.context.muiTheme,
        } );
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(loadTransTable());
        //dispatch(loadMappingTable());
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.mappingData && this.props.mappingData != nextProps.mappingData) {
            this.setState({
                loading: false,
            });
            this.setState({
                snackbarOpen: true,
                snackbarMessage: "Database loaded successfully"
            });
        }
        else if (nextProps.updateResult && this.props.updateResult != nextProps.updateResult) {
            const {success,data,error} = nextProps.updateResult;

            this.setState({
                snackbarOpen: true,
                snackbarMessage: success ? "Database updated successfully" : "Failed to update database: " + error
            });

            this.props.dispatch(loadTransTable());
        }
        else if (nextProps.updateError) {
            const {success,error} = nextProps.updateError;

            this.setState({
                snackbarOpen: true,
                snackbarMessage: success ? "Database updated successfully" : "Failed to update database: " + error
            });
        }
        else if (nextProps.deleteResult) {
            const {success,error} = nextProps.deleteResult;

            this.setState({
                snackbarOpen: true,
                snackbarMessage: success ? "Database deleted successfully" : "Failed to delete database: " + error
            });

            this.props.dispatch(loadTransTable());

        }
        else if (nextProps.deleteError) {
            const {success,error} = nextProps.deleteError;

            this.setState({
                snackbarOpen: true,
                snackbarMessage: success ? "Database deleted successfully" : "Failed to delete database: " + error
            });
        }
    }

    handleMouseDown_SetPage = (page)=> {
        this.setState({page});
    }

    handleMouseDown_setPageLineCount = (count)=> {
        this.setState({pageLineCount: count});
    }

    handleMouseDown_ClearSearch_Platform = ()=> {
        this.setState({
            searchText_Platform: '',
            isPlatformFilter: false
        });
    }

    onNewRequest_AutoComplete_Platform = (chosenRequest, index)=> {
        this.setState({
            searchText_Platform: chosenRequest,
            isPlatformFilter: true
        });
    }

    handleMouseDown_ClearSearch_Src = ()=> {
        this.setState({
            searchText_Src: '',
            isSrcTableFilter: false
        });
    }

    onNewRequest_AutoComplete_Src = (chosenRequest, index)=> {
        this.setState({
            searchText_Src: chosenRequest,
            isSrcTableFilter: true
        });
    }

    handleMouseDown_ClearSearch_Dst = ()=> {
        this.setState({
            searchText_Dst: '',
            isDstTableFilter: false
        });
    }

    onNewRequest_AutoComplete_Dst = (chosenRequest, index)=> {
        this.setState({
            searchText_Dst: chosenRequest,
            isDstTableFilter: true
        });
    }

    onRowSelection_Table=(key)=> {
        this.setState({selectedRow: key.length==0?-1:key[0]})
    }

    _handleUpdate_Refresh=()=>{
        this.setState({selectedRow: -1})

        this.props.dispatch(loadTransTable());
    }
    _handle_Close_Snackbar = () => {
        this.setState({snackbarOpen: false});
    };

    getStyles() {
        const styles = {
            searchBar: {
                zIndex: this.context.muiTheme.zIndex.appBar,//-1,
                //backgroundColor: this.context.muiTheme.palette.accent2Color,//alternateTextColor,
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
        };

        if (this.props.width === MEDIUM || this.props.width === LARGE)
            styles.content = Object.assign(styles.content, styles.contentWhenMedium);

        return styles;
    }

    render() {
        const styles = this.getStyles()
        const {mappingData,srcPlatforms,dstTables,updateRules} = this.props;
        const { page,pageLineCount,searchText_Platform,isPlatformFilter,
            searchText_Src,isSrcTableFilter,searchText_Dst,isDstTableFilter,selectedRow} = this.state;
        const pageConut = Math.ceil(mappingData.length / pageLineCount);

        let platformList=keys(srcPlatforms);
        let srcTableList = searchText_Platform==''?[]:keys(srcPlatforms[searchText_Platform].tables);
        let dstTableList = keys(dstTables);

        let filterResult = [];
        mappingData.forEach((row, index) => {
            if ((searchText_Platform == '' || row.源平台名 == searchText_Platform)
                && (searchText_Src == '' || row.源表名 == searchText_Src)
                && (searchText_Dst == '' || row.目的表名 == searchText_Dst))
                filterResult.push(row)
        });

        return (
            <Paper style={styles.content}>
                <Title render={(previousTitle) => `Home - ${previousTitle}`}/>
                {/*<Subheader style={{fontSize:20,color:colors.darkBlack}}>票房评估</Subheader>
                 <Divider/>*/}
                <Toolbar>
                    <ToolbarGroup>
                        <ToolbarTitle text="数据转换配置"/>
                    </ToolbarGroup>
                </Toolbar>

                <EditForm
                    srcPlatforms={srcPlatforms} dstTables={dstTables} updateRules={updateRules} selectedRow={selectedRow!=-1?mappingData[selectedRow]:null}
                    //searchText_Platform={searchText_Platform} searchText_Src={searchText_Src} searchText_Dst={searchText_Dst}
                    handleRefresh={this._handleUpdate_Refresh}
                />

                <Toolbar style={styles.searchBar}>
                    <SearchBar onNewRequest={this.onNewRequest_AutoComplete_Platform}
                               clearSearch={this.handleMouseDown_ClearSearch_Platform}
                               showCloseButton={isPlatformFilter}
                               searchText={searchText_Platform}
                               data={platformList}
                               hintText='源平台'
                    />
                    <SearchBar onNewRequest={this.onNewRequest_AutoComplete_Src}
                               clearSearch={this.handleMouseDown_ClearSearch_Src}
                               showCloseButton={isSrcTableFilter}
                               searchText={searchText_Src}
                               data={srcTableList}
                               hintText='源表名'
                    />
                    <SearchBar onNewRequest={this.onNewRequest_AutoComplete_Dst}
                               clearSearch={this.handleMouseDown_ClearSearch_Dst}
                               showCloseButton={isDstTableFilter}
                               searchText={searchText_Dst}
                               data={dstTableList}
                               hintText='目标表名'
                    />
                    <NavigationBar pageCount={pageConut}
                                   setPage={this.handleMouseDown_SetPage}
                                   setPageLineCount={this.handleMouseDown_setPageLineCount}/>
                </Toolbar>

                <ConfigTable
                    data={(isPlatformFilter|| isSrcTableFilter||isDstTableFilter)?filterResult:mappingData}
                    page={page} pageLineCount={pageLineCount}
                    onRowSelection={this.onRowSelection_Table}
                    selectedRowIndex={selectedRow}
                />

                <Snackbar
                    open={ this.state.snackbarOpen }
                    message={ this.state.snackbarMessage }
                    autoHideDuration={ 15000 }
                    onRequestClose={ this._handle_Close_Snackbar}
                />
            </Paper>
        );
    }
}


DataTransforPage.contextTypes = {
    muiTheme: React.PropTypes.object,
}

DataTransforPage.childContextTypes = {
    muiTheme: React.PropTypes.object,
};

DataTransforPage.propTypes = {
    //width:PropTypes.number.isRequired,
    //height:PropTypes.number.isRequired,
    dispatch:PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
    const { databaseReducer } = state;

    //let initLoaded = databaseReducer.initLoaded;
    // let loaded = databaseReducer.loaded;
    //
    // if (loaded) {
    //     return {mappingData: databaseReducer.mappingData}
    // }

    return {
        srcPlatforms: databaseReducer.tableData.srcPlatforms,
        dstTables: databaseReducer.tableData.dstTables,
        updateRules: databaseReducer.tableData.updateRules,
        mappingData: databaseReducer.tableData.mappingData,
        updateResult: databaseReducer.updateResult,
        updateError: databaseReducer.updateError,
        deleteResult:databaseReducer.deleteResult,
        deleteError:databaseReducer.deleteError,
    };
};

export default connect(
    mapStateToProps
)(withWidth( )(DataTransforPage));

