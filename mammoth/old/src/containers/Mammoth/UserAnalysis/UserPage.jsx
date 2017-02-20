
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
import TabMenuBar from './TabMenuBar.jsx';
import ShopsSearchBar from '../Shops/ShopsSearchBar.jsx'
import ShopsNavigationBar from './ShopsNavigationBar.jsx'

// import AdvancedSearchPanel from './AdvancedSearchPanel.jsx'
import {loadUsers} from '../../../reducers/database.js';
import UserSurvey from './UserSurvey.jsx';
class UserPage extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {
            // data: [],
            page:1,
            //pageConut:0,
            pageLineCount:10,
            advancedSearch:false,
            searchText:'',
            showFilterResult:false,
        };
    }

    componentDidMount () {
        // if (!this.props.castLoaded) {
        const { dispatch} = this.props;

        const {page,pageLineCount,searchText} = this.state;
        dispatch(loadUsers(page,pageLineCount,searchText));
        // }
    }

    shouldComponentUpdate=(nextProps = {}, nextState = {}) => {
        return true;//false,页面不刷新数据
    }

    getStyles() {
        const styles = {
            searchBar: {
                zIndex: this.context.muiTheme.zIndex.appBar,//-1,
                backgroundColor: this.context.muiTheme.palette.accent2Color,//alternateTextColor,
                height: this.context.muiTheme.palette.desktopSubheaderHeight
            },
            content: {
                marginTop: this.context.muiTheme.spacing.desktopGutter+this.context.muiTheme.spacing.desktopSubheaderHeight,
                marginBottom:this.context.muiTheme.spacing.desktopGutter,
                marginLeft:this.context.muiTheme.spacing.desktopGutter,
                marginRight:this.context.muiTheme.spacing.desktopGutter,
            },
            contentWhenMedium: {
                // margin: `${this.context.muiTheme.spacing.desktopGutter * 2}px  ${this.context.muiTheme.spacing.desktopGutter * 3}px`,
                marginTop: this.context.muiTheme.spacing.desktopGutter * 2+this.context.muiTheme.spacing.desktopSubheaderHeight,
                marginBottom: this.context.muiTheme.spacing.desktopGutter * 2,
                marginLeft:this.context.muiTheme.spacing.desktopGutter * 3,
                marginRight:this.context.muiTheme.spacing.desktopGutter * 3,
            },
            fontSizeSpan:{
                // alignSelf:'center',
                flex:1,
                // textAlign:'center'
            }
        }
        if ( this.props.width === MEDIUM || this.props.width === LARGE )
            styles.content = Object.assign(styles.content, styles.contentWhenMedium);
        return styles;
    }

    handleMouseDown_SetPage=(page)=> {
        this.setState({page:page});

        const {dispatch} = this.props;
        const {pageLineCount,searchText} = this.state;
        dispatch(loadUsers(page,pageLineCount,searchText));
    }

    handleMouseDown_setPageLineCount=(count)=>{
        this.setState({pageLineCount:count});

        const {dispatch} = this.props;
        const {page,searchText} = this.state;
        dispatch(loadUsers(page,count,searchText));
    }

    handleMouseDown_AdvancedSearch=()=> {
        this.setState({advancedSearch: !this.state.advancedSearch});
    }
    advancedSearch_AutoComplete =()=>{
        this.setState({advancedSearch: !this.state.advancedSearch});
        const {dispatch} = this.props;
        const {searchText,pageLineCount} = this.state;
        dispatch(loadUsers(1,pageLineCount,searchText));
    }
    onUpdateInput_AutoComplete = (value)=>{
        const {dispatch} = this.props;
        const {pageLineCount} = this.state;
        if(value==''){
            this.setState({
                page:1,
                searchText:'',
                showFilterResult:false
            });
            dispatch(loadUsers(1,pageLineCount,''));
        }else{
            this.setState({
                searchText:value
            });
            // dispatch(loadUsers(1,pageLineCount,value));
        }
    }
    handleMouseDown_ClearSearch=()=> {
        this.setState({
            page:1,
            searchText: '',
            showFilterResult:false
        });

        const {dispatch} = this.props;
        const {pageLineCount} = this.state;
        dispatch(loadUsers(1,pageLineCount,''));
    }
    onNewRequest_AutoComplete=(chosenRequest, index)=> {
        const {dispatch} = this.props;
        this.setState({
            page:1,
            searchText: chosenRequest,
            showFilterResult: true
        })
        const {pageLineCount} = this.state;
        dispatch(loadUsers(1,pageLineCount,chosenRequest));
    }
    tableRender=(data,list)=> {
        const { page,pageLineCount } = this.state;
        return (
            <Table
                //height=300
                fixedHeader={true}
                bodyStyle={{minHeight:510,width:2500}}
            >
                <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
                    <TableRow>
                        <TableHeaderColumn style={{padding:'0px',width: 64,textAlign:'center'}}>更多</TableHeaderColumn>
                        <TableHeaderColumn style={{padding:'0px',width: 64,textAlign:'center'}}>序号</TableHeaderColumn>
                        {
                            list.map((column, key)=>
                                column.indexOf('id') != -1 ? null :
                                    <TableHeaderColumn key={key} style={{padding:'0px',width:column.indexOf('用户ID') >= 0?73:164,textAlign:'center'}}>
                                        {column}
                                    </TableHeaderColumn>
                            )
                        }
                    </TableRow>
                </TableHeader>
                <TableBody
                    displayRowCheckbox={false}
                    showRowHover={true}
                    //stripedRows={true}
                >
                    {data.map((row, index) =>
                        <TableRow key={index}>
                            <TableRowColumn style={{padding:'0px',textAlign:'center',width: 35}}>
                                <IconButton activeClassName="active"
                                style={{marginLeft:-10}}
                                containerElement={
                                <Link to={{ pathname: '/mammoth/userpages/'+row['用户ID'], query:row}} />
                                }
                                >
                                <MoreVert/>
                                </IconButton>
                            </TableRowColumn>
                            <TableRowColumn
                                style={{padding:'0px',textAlign:'center',width: 35}}>{index + 1 + (page - 1) * pageLineCount}
                            </TableRowColumn>
                            {
                                list.map((column, key) =>
                                    column.indexOf('用户ID') != -1 ?
                                        <TableRowColumn key={key} style={{padding:'0px',textAlign:'center',width:40}}>
                                        {row[column]}
                                    </TableRowColumn>:
                                        <TableRowColumn key={key} style={{padding:'0px',textAlign:'center',width:90}}>
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

    render( ) {
        const styles = this.getStyles();
        const {Userlist,count} = this.props;
        let UsersColumnList = ['用户ID','信用值','出生年月','是否注册用户','电话','注册时间',
            '会员积分','推荐码','用户的等级','性别', '状态','地址', '客户端','真实姓名',
            'Email'];
        const { page,pageLineCount,searchText,showFilterResult } = this.state;
        return (
            <div>
                <TabMenuBar {...this.props}
                            isArrowBackShown={false}
                            title="用户详情"
                            panelVisible={true}
                    //handleChange={this.handleChange_TabMenuBar}
                    //tabs={["演员","导演","编剧",'摄像','美工']}
                            tabsWidth={500}/>
                <div style={styles.content}>
                    <div style={{marginBottom:'30px'}}>
                        <UserSurvey />
                    </div>
                    <Paper zDepth={2}>
                        <Toolbar>
                            <ToolbarGroup>
                                <ToolbarTitle text="用户信息"/>
                            </ToolbarGroup>
                        </Toolbar>
                        {
                            this.props.loaded &&
                            <Toolbar style={styles.searchBar}>
                                <ShopsSearchBar
                                    advancedSearch={this.advancedSearch_AutoComplete}
                                    onNewRequest={this.onNewRequest_AutoComplete}
                                    clearSearch={this.handleMouseDown_ClearSearch}
                                    showCloseButton={showFilterResult}
                                    onUpdateInput={this.onUpdateInput_AutoComplete}
                                    searchText={searchText}
                                    data={[]}
                                />
                                <ShopsNavigationBar pageCount={pageLineCount}  value={page} total={count}
                                                    setPage={this.handleMouseDown_SetPage}
                                                    setPageLineCount={this.handleMouseDown_setPageLineCount}/>
                            </Toolbar>
                        }
                        {
                            Userlist.length<0 ?
                             <div style={{display:'flex', justifyContent:'center'}}>
                             <CircularProgress style={{margin:80}} size={1.5}/>
                             </div>
                             :
                            this.tableRender(Userlist,UsersColumnList)
                        }
                        {
                            this.props.loading &&
                            <div style={{display:'flex', justifyContent:'center'}}>
                                <CircularProgress style={{margin:-350}} size={1.5}/>
                            </div>
                        }
                    </Paper>
                </div>
            </div>
        );
    }
}
UserPage.propTypes = {
    dispatch:PropTypes.func.isRequired
};
UserPage.contextTypes = {
    muiTheme: React.PropTypes.object,
}
const mapStateToProps = (state) => {
    const { databaseReducer,layoutReducer } = state;
    return {
        Userlist:databaseReducer.UserData.Userlist,
        count:databaseReducer.UserData.count,
        loading:databaseReducer.loading,
        loaded:databaseReducer.loaded,
        panelVisible:layoutReducer.panelVisible,//勿删,传入TabMenuBar

    };
};
export default connect(
    mapStateToProps
)(withWidth( )(UserPage));


