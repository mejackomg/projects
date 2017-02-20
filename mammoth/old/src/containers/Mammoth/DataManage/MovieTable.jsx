
import React ,{ Component, PropTypes } from 'react';

import {Link} from 'react-router';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import IconButton from 'material-ui/IconButton';
import {LARGE, MEDIUM,SMALL}  from 'material-ui/utils/withWidth';
import MoreVert from 'material-ui/svg-icons/navigation/more-vert.js'
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import { connect } from 'react-redux';

//import { asyncConnect } from 'redux-async-connect';

import {
   darkBlack
} from 'material-ui/styles/colors';

import { loadMovie} from '../../../reducers/database.js';
import SearchBar from './SearchBar.jsx'
import AdvancedSearchPanel from './AdvancedSearchPanel.jsx'
import NavigationBar from './NavigationBar.jsx'

class MovieTable extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {
            //data: [],
            page:1,
            //pageConut:0,
            pageLineCount:10,
            advancedSearch:false,
            filterResult:[],
            searchText:'',
            showFilterResult:false
        };
    }

    getStyles() {
        const styles = {
            searchBar: {
                zIndex: this.context.muiTheme.zIndex.appBar,//-1,
                backgroundColor: this.context.muiTheme.palette.alternateTextColor,
                height: this.context.muiTheme.palette.desktopSubheaderHeight
            }
        }
        return styles;
    }

    componentDidMount () {
        const { dispatch } = this.props;
        dispatch(loadMovie());
    }

    handleMouseDown_SetPage=(page)=> {
        this.setState({page});
    }

    handleMouseDown_setPageLineCount=(count)=>{
        this.setState({pageLineCount:count});
    }

    handleMouseDown_AdvancedSearch=()=> {
        this.setState({advancedSearch: !this.state.advancedSearch});
    }

    handleMouseDown_ClearSearch=()=> {
        this.setState({
            filterResult: [],
            searchText: '',
            showFilterResult:false
        });
    }

    onUpdateInput_AutoComplete=(searchText, dataSource)=> {
        this.setState({searchText: searchText});
    }

    onNewRequest_AutoComplete=(chosenRequest, index)=> {
        //if (index === -1) {//Enter
        let filterResult = [];
        this.props.data.forEach((row, index) => {
            if (row.movie_name.indexOf(chosenRequest) >= 0)
                filterResult.push(row)
        });

        this.setState({filterResult: filterResult})
        this.setState({showFilterResult: true})

        //}
        //else {}
    }

    tableRender=(data)=> {
        const { page,pageLineCount } = this.state;
        let columns = [];
        for (let item in data[0])
            columns.push(item);
        return (
            <Table
                //height={300}
                fixedHeader={true}
                //bodyStyle={{width:1210}}
                >
                <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
                    <TableRow>
                        <TableHeaderColumn style={{width: 40}}>序号</TableHeaderColumn>
                        {
                            columns.map((column,key)=>
                                <TableHeaderColumn key={key} style={{width:column.indexOf('文名') >= 0?80:60}}>{column}</TableHeaderColumn>
                            )
                        }
                        <TableHeaderColumn style={{width: 30}}>更多</TableHeaderColumn>
                    </TableRow>
                </TableHeader>

                <TableBody
                    displayRowCheckbox={false}
                    showRowHover={true}
                    //stripedRows={true}
                    >
                    {data.slice((page - 1) * pageLineCount, page * pageLineCount).map((row, index) => (
                        <TableRow key={index + (page-1)*pageLineCount}>
                            <TableRowColumn style={{width: 10}}>{index + 1 + (page - 1) * pageLineCount}</TableRowColumn>
                            {
                                columns.map((column,key) =>
                                    <TableRowColumn key={key} style={{width:column.indexOf('文名') >= 0?110:60}}>{row[column]}</TableRowColumn>
                                )
                            }
                            <TableRowColumn style={{width: 40}}>
                                <IconButton containerElement={<Link to="/mammoth/film"/>}>
                                    <MoreVert/>
                                </IconButton>
                            </TableRowColumn>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        )
    }

    render( ) {

        const styles = this.getStyles();
        const {data} = this.props;
        const { page,pageLineCount,filterResult,searchText,showFilterResult } = this.state;
        const pageConut = Math.ceil(data.length / pageLineCount);

        return (
            <div>
                <Toolbar style={styles.searchBar}>
                    <SearchBar advancedSearch={this.handleMouseDown_AdvancedSearch}
                               onNewRequest={this.onNewRequest_AutoComplete}
                               clearSearch={this.handleMouseDown_ClearSearch}
                               showCloseButton={showFilterResult}
                               onUpdateInput={this.onUpdateInput_AutoComplete}
                               searchText={searchText}
                               />

                    <NavigationBar pageCount={pageConut}
                                   setPage={this.handleMouseDown_SetPage}
                                   setPageLineCount={this.handleMouseDown_setPageLineCount}/>
                </Toolbar>

                {
                    this.state.advancedSearch ?
                        <AdvancedSearchPanel />
                        : null
                }

                {
                    showFilterResult ?
                        this.tableRender(filterResult)
                        : this.tableRender(data)
                }
            </div>
        );
    }
}

MovieTable.propTypes = {
    data: PropTypes.array.isRequired,
    dispatch:PropTypes.func.isRequired,
};
MovieTable.contextTypes = {
    muiTheme: React.PropTypes.object,
}

const mapStateToProps = (state) => {
    const { databaseReducer } = state;
    return {
        data:databaseReducer.movieData,
    };
};
export default connect(
    mapStateToProps
)(MovieTable);


