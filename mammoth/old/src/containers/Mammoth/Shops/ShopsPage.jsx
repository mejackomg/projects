
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
import TabMenuBar from './TabMenuBar.jsx';
import ShopsSearchBar from './ShopsSearchBar.jsx'
import ShopsNavigationBar from './ShopsNavigationBar.jsx'
import ShopsView from './ShopsView.jsx'
// import {ReactGridLayout} from 'react-grid-layout';
// import AdvancedSearchPanel from './AdvancedSearchPanel.jsx'
import {loadShops,loadShopWords} from '../../../reducers/database.js';
import ShopsSurvey from './ShopsSurvey.jsx';
import ReactGridLayout from 'react-grid-layout';


class ShopsPages extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {
            // data: [],
            open: false,
            page:1,
            //pageConut:0,
            pageLineCount:10,
            advancedSearch:false,
            searchText:'',
            showFilterResult:false,
            creditFrom: '0',
            creditTo: '1',
            message:''
        };
    }

    componentDidMount () {
        // if (!this.props.castLoaded) {
        const { dispatch} = this.props;

        const {page,pageLineCount,searchText,creditFrom,creditTo} = this.state;
        dispatch(loadShops(page,pageLineCount,searchText,creditFrom,creditTo));
        // dispatch(loadShops(page,pageLineCount,searchText,0,1));
        dispatch(loadShopWords());

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
                flex:1,
                // fontSize:'14px'
                // textAlign:'center'
            },
            creditStyle:{
                display:'inline-block',
                margin: '0 20px',
                lineHeight: '56px',
                fontSize: 16,
                color: 'rgba(0, 0, 0, 0.4)'
            }
        }
        if ( this.props.width === MEDIUM || this.props.width === LARGE )
            styles.content = Object.assign(styles.content, styles.contentWhenMedium);

        return styles;
    }

    handleMouseDown_SetPage=(page)=> {
        this.setState({page:page});

        const {dispatch} = this.props;
        const {pageLineCount,searchText,creditFrom,creditTo} = this.state;
        dispatch(loadShops(page,pageLineCount,searchText,creditFrom,creditTo));

    }

    handleMouseDown_setPageLineCount=(count)=>{
        this.setState({pageLineCount:count});

        const {dispatch} = this.props;
        const {page,searchText,creditFrom,creditTo} = this.state;
        dispatch(loadShops(page,count,searchText,creditFrom,creditTo));

    }
    advancedSearch_AutoComplete=(value)=>{
        this.setState({advancedSearch: !this.state.advancedSearch});
        const {dispatch} = this.props;
        const {searchText,pageLineCount,creditFrom,creditTo} = this.state;
        dispatch(loadShops(1,pageLineCount,searchText,creditFrom,creditTo));
    }
    onUpdateInput_AutoComplete=(value)=> {
        const {dispatch} = this.props;
        const {page,pageLineCount,creditFrom,creditTo} = this.state;
        if(value == ''){
            this.setState({
                page:1,
                searchText: '',
                showFilterResult:false
            });
            dispatch(loadShops(1,pageLineCount,'',creditFrom,creditTo));
        }else {
            this.setState({
                searchText:value
            });
        }


    }

    handleMouseDown_ClearSearch=()=> {
        this.setState({
            page:1,
            searchText: '',
            showFilterResult:false
        });

        const {dispatch} = this.props;
        const {page,pageLineCount,creditFrom,creditTo} = this.state;
        dispatch(loadShops(1,pageLineCount,'',creditFrom,creditTo));
    }

    onNewRequest_AutoComplete=(chosenRequest, index)=> {
        console.log(chosenRequest);
        const {dispatch} = this.props;

        this.setState({
            page:1,
            searchText: chosenRequest,
            showFilterResult: true
        })

        const {pageLineCount,creditFrom,creditTo} = this.state;
        dispatch(loadShops(1,pageLineCount,chosenRequest,creditFrom,creditTo));
    }

    creditFromChange=(event)=>{
        let value = event.target.value;
        const {pageLineCount,searchText,creditTo} = this.state;
        const {dispatch} = this.props;
        this.setState({
            creditFrom:value
        });
        this.Judge(value,creditTo);
    }
    Judge = (a,b)=>{
        const {dispatch}= this.props;
        const {searchText,pageLineCount} = this.state;
        // let reasult = 0;
        console.log(this.Range(a),this.Range(b),this.Range(a) &&this.Range(b));
       if(this.Range(a) && this.Range(b)){
           console.log(a,b);
           if(a>b){
               this.setState({
                   message:'信用开始值必须小于信用结束值！'
               })
               this.handleTouchTap();
           }else if(a==b){
               // return a;
               dispatch(loadShops(1,pageLineCount,searchText,a,a));
           }else {
               // reasult= 2;
               dispatch(loadShops(1,pageLineCount,searchText,a,b));
           }
       }else{
           this.handleTouchTap();
       }
    }
    Range = (value) =>{
        let range = '';
        if(value>=0 && value <=1 ){
            range= true;
        }else{
            this.setState({
                message:'请输入（0-1）有效信用值范围！'
            })
            this.handleTouchTap();
            range= false;
        }
        return range;
    }
    creditToChange=(event)=>{
        let value = event.target.value;
        const {creditFrom} = this.state;
        const {dispatch} = this.props;
        this.setState({
            creditTo:value
        })
        this.Judge(creditFrom,value);
    }
    handleTouchTap = () => {
        this.setState({
            open: true,
        });
    };
    formatNum = (num) => {
        var str = num +''
        var newStr = "";
        var count = 0;
        var strarr = str.split('.');
        for(var i=strarr[0].length-1;i>=0;i--){
            if(count % 3 == 0 && count != 0){
                newStr = str.charAt(i) + "," + newStr;
            }else{
                newStr = str.charAt(i) + newStr;
            }
            count++;
        }
        if(str.indexOf(".")==-1){
            str = newStr;
        } else {
            str = newStr + '.' + strarr[1];
        }
        return str;
    };
    handleRequestClose = () => {
        this.setState({
            open: false,
        });
    };
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
                        <TableHeaderColumn style={{width: 15}}>更多</TableHeaderColumn>
                        <TableHeaderColumn style={{width: 33}}>序号</TableHeaderColumn>
                        {
                            list.map((column, key)=>
                                column.indexOf('id') != -1 ? null : <TableHeaderColumn key={key}
                                                                                       style={{width:column.indexOf('商铺名称') >= 0?160:160,textAlign:'center'}}>{column}</TableHeaderColumn>
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
                            <TableRowColumn style={{width: 20}}>

                                <IconButton activeClassName="active"
                                            style={{marginLeft:-10}}
                                            containerElement={
                                                <Link to={{ pathname: '/mammoth/shopsPages/'+row['店铺id'], query:row}} />

                                            }
                                    /*+row['店铺id']*/
                                >
                                    <MoreVert/>
                                </IconButton>
                            </TableRowColumn>
                            <TableRowColumn
                                style={{width: 25}}>{index + 1 + (page - 1) * pageLineCount}
                            </TableRowColumn>
                            {
                                list.map((column, key) =>
                                    column.indexOf('id') != -1 ? null :
                                        <TableRowColumn key={key} style={{padding:'0px',textAlign:'center'}}>
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
        const {shops,dataTotal} = this.props;
        const {creditFrom, creditTo} = this.state;
        let shopsColumnList = ['商铺名称','店主','信用值','电话','地址','商圈','推荐码','当前状态','审核状态','是否注销','推广人推荐码','银行推荐码','注册时间','审核时间','类型','店铺id'];
        const { page,pageLineCount,searchText,showFilterResult } = this.state;

        return (
            <div>
                <TabMenuBar {...this.props}
                            isArrowBackShown={false}
                            title="商户详情"
                            tabsWidth={500}
                            //panelVisible={true}
                />
                <div style={{}}>
                    <div style={styles.content}>
                        <div style={{marginBottom:'30px'}}>
                            <ShopsSurvey></ShopsSurvey>
                        </div>
                        <Paper zDepth={2}>
                            <Toolbar>
                                <ToolbarGroup>
                                    <ToolbarTitle text="商户展示"/>
                                </ToolbarGroup>
                            </Toolbar>
                            {
                                this.props.loaded &&
                                <Toolbar style={styles.searchBar}>
                                    <ShopsSearchBar
                                        onUpdateInput={this.onUpdateInput_AutoComplete}
                                        advancedSearch={this.advancedSearch_AutoComplete}
                                        onNewRequest={this.onNewRequest_AutoComplete}
                                        clearSearch={this.handleMouseDown_ClearSearch}
                                        showCloseButton={showFilterResult}
                                        searchText={searchText}
                                        data={[]}
                                    />
                                    <div>
                                        <div style={styles.creditStyle}>信用值从</div>
                                        <TextField id="creditFrom" value={creditFrom} onChange={this.creditFromChange} style={{width:"10%"}} inputStyle={{textAlign:'center',color:this.context.muiTheme.palette.accent1Color}}/>
                                        <div style={styles.creditStyle}>到</div>
                                        <TextField id="creditTo" value={creditTo} onChange={this.creditToChange} style={{width:"10%"}} inputStyle={{textAlign:'center',color:this.context.muiTheme.palette.accent1Color}}/>
                                    </div>
                                    <ShopsNavigationBar pageCount={pageLineCount}  value={page} total={dataTotal}
                                                        setPage={this.handleMouseDown_SetPage}
                                                        setPageLineCount={this.handleMouseDown_setPageLineCount}/>
                                </Toolbar>
                            }

                            {
                                shops.length<0 ?
                                    <div style={{display:'flex', justifyContent:'center'}}>
                                        <CircularProgress style={{margin:80}} size={1.5}/>
                                    </div>
                                    :
                                    this.tableRender(shops,shopsColumnList)
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
                <Snackbar
                    open={this.state.open}
                    message={this.state.message}
                    // message="请输入符合规范的信用范围（0-1）"
                    autoHideDuration={4000}
                    onRequestClose={this.handleRequestClose}
                />
            </div>

        );
    }
}

ShopsPages.propTypes = {
    dispatch:PropTypes.func.isRequired,
    // shopsRows:PropTypes.Array.isRequired,
};
ShopsPages.contextTypes = {
    muiTheme: React.PropTypes.object,
}

const mapStateToProps = (state) => {
    const { databaseReducer,layoutReducer } = state;
    return {
        dataTotal:databaseReducer.shopsRows.dataTotal,
        shops:databaseReducer.shopsRows.shops,
        SingleShopMapData1:databaseReducer.SingleShopMapData1,
        loading:databaseReducer.loading,
        loaded:databaseReducer.loaded,
        panelVisible:layoutReducer.panelVisible,//勿删,传入TabMenuBar
    };
};
export default connect(
    mapStateToProps
)(withWidth( )(ShopsPages));


