/**
 * Created by apple on 2016/12/12.
 */
import React, {Component, PropTypes} from 'react';

import {Link} from 'react-router';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import IconButton from 'material-ui/IconButton';
import withWidth, {LARGE, MEDIUM, SMALL}  from '../../../utils/withWidth';
import MoreVert from 'material-ui/svg-icons/navigation/more-vert.js'
import {List, ListItem} from 'material-ui/List';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import {connect} from 'react-redux';
import CircularProgress from 'material-ui/CircularProgress';
import {
    darkBlack
} from 'material-ui/styles/colors';
import {is} from 'immutable';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import TabMenuBar from './TabMenuBar.jsx';
import ShopsSearchBar from './ShopsSearchBar.jsx'
import ShopsNavigationBar from './ShopsNavigationBar.jsx'
import Snackbar from 'material-ui/Snackbar';
import LoanAnalysis from './LoanAnalysis.jsx'

import {loadLoanShops} from '../../../reducers/database.js';

class ShopLoanPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            pageLineCount: 10,
            showFilterResult: false,
            searchText: '',
            creditFrom: '0',
            creditTo: '1',
            open: false,
            message: '',
            shopsId: '1'
        };
    }

    componentDidMount() {
        const {dispatch} = this.props;
        const {page, pageLineCount, searchText, creditFrom, creditTo} = this.state;
        dispatch(loadLoanShops(page, pageLineCount, searchText, creditFrom, creditTo));
    }

    shouldComponentUpdate = (nextProps = {}, nextState = {}) => {
        return true;//false,页面不刷新数据
    }

    onUpdateInput_AutoComplete = (value)=> {
        const {dispatch} = this.props;
        const {pageLineCount, creditFrom, creditTo} = this.state;
        if (value == '') {
            this.setState({
                page: 1,
                searchText: '',
                showFilterResult: false
            });
            dispatch(loadLoanShops(1, pageLineCount, '', creditFrom, creditTo));
        } else {
            this.setState({
                searchText: value
            });
        }
    }

    advancedSearch_AutoComplete = (value)=> {
        this.setState({advancedSearch: !this.state.advancedSearch});
        const {dispatch} = this.props;
        const {searchText, pageLineCount, creditFrom, creditTo} = this.state;
        dispatch(loadLoanShops(1, pageLineCount, searchText, creditFrom, creditTo));

    }

    onNewRequest_AutoComplete = (chosenRequest, index)=> {
        const {dispatch} = this.props;
        this.setState({
            page: 1,
            searchText: chosenRequest,
            showFilterResult: true
        })
        const {pageLineCount, creditFrom, creditTo} = this.state;
        dispatch(loadLoanShops(1, pageLineCount, chosenRequest, creditFrom, creditTo));
    }

    handleMouseDown_ClearSearch = ()=> {
        this.setState({
            page: 1,
            searchText: '',
            showFilterResult: false
        });

        const {dispatch} = this.props;
        const {pageLineCount, creditFrom, creditTo} = this.state;
        dispatch(loadLoanShops(1, pageLineCount, '', creditFrom, creditTo));
    }

    creditFromChange = (event)=> {
        let value = event.target.value;
        const {creditTo} = this.state;
        this.setState({
            creditFrom: value
        });
        this.Judge(value, creditTo);
    }
    Judge = (a, b)=> {
        const {dispatch}= this.props;
        const {searchText, pageLineCount} = this.state;
        if (this.Range(a) && this.Range(b)) {
            if (a > b) {
                this.setState({
                    message: '信用开始值必须小于或等于信用结束值！'
                })
                this.handleTouchTap();
            } else if (a == b) {
                dispatch(loadLoanShops(1, pageLineCount, searchText, a, a));
            } else {
                dispatch(loadLoanShops(1, pageLineCount, searchText, a, b));
            }
        } else {
            this.handleTouchTap();
        }
    }
    Range = (value) => {
        let range = '';
        if (value >= 0 && value <= 1) {
            range = true;
        } else {
            this.setState({
                message: '请输入（0-1）有效信用值范围！'
            })
            this.handleTouchTap();
            range = false;
        }
        return range;
    }
    creditToChange = (event)=> {
        let value = event.target.value;
        const {creditFrom} = this.state;
        this.setState({
            creditTo: value
        })
        this.Judge(creditFrom, value);
    }

    handleMouseDown_SetPage = (page)=> {
        this.setState({page: page});

        const {dispatch} = this.props;
        const {pageLineCount, searchText, creditFrom, creditTo} = this.state;
        dispatch(loadLoanShops(page, pageLineCount, searchText, creditFrom, creditTo));

    }

    handleMouseDown_setPageLineCount = (count)=> {
        this.setState({pageLineCount: count});
        const {dispatch} = this.props;
        const {page, searchText, creditFrom, creditTo} = this.state;
        dispatch(loadLoanShops(page, count, searchText, creditFrom, creditTo));

    }

    handleRequestClose = () => {
        this.setState({
            open: false,
        });
    };
    handleTouchTap = () => {
        this.setState({
            open: true,
        });
    };

    changeNum = (num) => {
        let str = "";
        if (num > 10000) {
            let n = num / 10000;
            let nn = n + '';
            if (nn.indexOf(".") == -1) {
                str = nn + '万';
            } else {
                str = nn.split('.');
                var n0 = str[0];
                var n1 = str[1];
                var n00 = n0 + '';
                var n11 = n1 + '';
                var n12 = n11.substring(0, 2);
                str = n0 + '.' + n12 + '万';
            }
        } else {
            str = num + '';
        }
        var newStr = "";
        var count = 0;
        var strarr = str.split('.');
        for (var i = strarr[0].length - 1; i >= 0; i--) {
            if (count % 3 == 0 && count != 0) {
                newStr = str.charAt(i) + "," + newStr;
            } else {
                newStr = str.charAt(i) + newStr;
            }
            count++;
        }
        if (str.indexOf(".") == -1) {
            str = newStr;
        } else {
            str = newStr + '.' + strarr[1];
        }
        return str;
    }

    /*showSingleShop = (shopId) => {
     this.setState({shopsId: shopId});
     }*/

    getStyles() {
        const styles = {
            searchBar: {
                zIndex: this.context.muiTheme.zIndex.appBar,//-1,
                backgroundColor: this.context.muiTheme.palette.accent2Color,//alternateTextColor,
                height: this.context.muiTheme.palette.desktopSubheaderHeight
            },
            content: {
                marginTop: this.context.muiTheme.spacing.desktopGutter + this.context.muiTheme.spacing.desktopSubheaderHeight,
                marginBottom: this.context.muiTheme.spacing.desktopGutter,
                marginLeft: this.context.muiTheme.spacing.desktopGutter,
                marginRight: this.context.muiTheme.spacing.desktopGutter,
            },
            contentWhenMedium: {
                marginTop: this.context.muiTheme.spacing.desktopGutter * 2 + this.context.muiTheme.spacing.desktopSubheaderHeight,
                marginBottom: this.context.muiTheme.spacing.desktopGutter * 2,
                marginLeft: this.context.muiTheme.spacing.desktopGutter * 3,
                marginRight: this.context.muiTheme.spacing.desktopGutter * 3,
            },
            creditStyle: {
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

    tableRender = (data, list)=> {
        const {page, pageLineCount} = this.state;
        return (
            <Table fixedHeader={true} bodyStyle={{minHeight: 510}}>
                <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
                    <TableRow>
                        <TableHeaderColumn style={{width: 15}}>更多</TableHeaderColumn>
                        <TableHeaderColumn style={{width: '50px'}}>序号</TableHeaderColumn>
                        {
                            list.map((column, key)=>
                                column.indexOf('id') != -1 ? null :
                                    <TableHeaderColumn key={key} style={{textAlign: 'center'}}
                                    >{column}</TableHeaderColumn>
                            )
                        }
                    </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false} showRowHover={true}>
                    {data.map((row, index) =>
                        <TableRow key={index}>
                            <TableRowColumn style={{width: 20}}>
                                <IconButton activeClassName="active"
                                            style={{marginLeft: -10}}
                                            containerElement={
                                                <Link to={{
                                                    pathname: '/mammoth/shopLoanPages/' + row['店铺id'],
                                                    query: row
                                                }}/>

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
                                        <TableRowColumn key={key} style={{padding: '0px', textAlign: 'center'}}>
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
        const {shopsId}=this.state;
        const {shops, dataTotal} = this.props;
        console.log(shops)
        let shopData = [];
        for (var i = 0; i < shops.length; i++) {
            if (shops[i]['平均贷款金额'] == null) {
                shopData.push({
                    '商铺名称': shops[i]['商铺名称'],
                    '信用值': shops[i]['信用值'],
                    '平均贷款金额(元)': '无',
                    '是否贷款': shops[i]['贷款类型'],
                    '电话': shops[i]['电话'],
                    '地址': shops[i]['地址'],
                    '注册时间': shops[i]['注册时间'],
                    '类型': shops[i]['类型'],
                    '店铺id': shops[i]['店铺id']
                });
            } else {
                shopData.push({
                    '商铺名称': shops[i]['商铺名称'],
                    '信用值': shops[i]['信用值'],
                    '平均贷款金额(元)': this.changeNum(shops[i]['平均贷款金额']),
                    '是否贷款': shops[i]['贷款类型'],
                    '电话': shops[i]['电话'],
                    '地址': shops[i]['地址'],
                    '注册时间': shops[i]['注册时间'],
                    '类型': shops[i]['类型'],
                    '店铺id': shops[i]['店铺id']
                });
            }
        }

        const {page, pageLineCount, searchText, showFilterResult, creditFrom, creditTo} = this.state;
        var shopsColumnList = ['商铺名称', '信用值', '平均贷款金额(元)','是否贷款', '电话', '地址', '注册时间', '类型', '店铺id'];

        return (
            <div>
                <TabMenuBar {...this.props}
                            isArrowBackShown={false}
                            title="商户贷款详情"
                            tabsWidth={500}/>

                <div style={{marginTop: '0px'}}>
                    <div style={styles.content}>
                        <Paper zDepth={2}>
                            <Toolbar>
                                <ToolbarGroup>
                                    <ToolbarTitle text="商户贷款概况展示"/>
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
                                        <TextField id="creditFrom" value={creditFrom} onChange={this.creditFromChange}
                                                   style={{width: "10%"}} inputStyle={{
                                            textAlign: 'center',
                                            color: this.context.muiTheme.palette.accent1Color
                                        }}/>
                                        <div style={styles.creditStyle}>到</div>
                                        <TextField id="creditTo" value={creditTo} onChange={this.creditToChange}
                                                   style={{width: "10%"}} inputStyle={{
                                            textAlign: 'center',
                                            color: this.context.muiTheme.palette.accent1Color
                                        }}/>
                                    </div>
                                    <ShopsNavigationBar pageCount={pageLineCount} value={page} total={dataTotal}
                                                        setPage={this.handleMouseDown_SetPage}
                                                        setPageLineCount={this.handleMouseDown_setPageLineCount}/>
                                </Toolbar>
                            }

                            {
                                shopData.length > 0 ?
                                    this.tableRender(shopData, shopsColumnList)
                                    :
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        height: 510,
                                        fontSize: '24px',
                                        color: 'gray',
                                        marginTop: '150px'
                                    }}>
                                        对不起，您输入的商户不存在，请重新输入！
                                        {/*<CircularProgress style={{margin: 80}} size={1.5}/>*/}
                                    </div>

                            }
                            {
                                this.props.loading &&
                                <div style={{display: 'flex', justifyContent: 'center'}}>
                                    <CircularProgress style={{margin: -350}} size={1.5}/>
                                </div>
                            }
                        </Paper>
                    </div>
                </div>

                <Snackbar
                    open={this.state.open}
                    message={this.state.message}
                    autoHideDuration={4000}
                    onRequestClose={this.handleRequestClose}
                />

                {/*{ shopsId <= 1 ?
                 <div></div>
                 :
                 <div style={styles.content}>
                 <div style={{marginTop:'-40px',width:''}}>
                 <LoanAnalysis shopsId={shopsId} shops={shops} />
                 </div>
                 </div>
                 }*/}
            </div>
        );
    }
}

ShopLoanPage.propTypes = {
    dispatch: PropTypes.func.isRequired,
};
ShopLoanPage.contextTypes = {
    muiTheme: React.PropTypes.object,
}

const mapStateToProps = (state) => {
    const {databaseReducer, layoutReducer} = state;
    return {
        dataTotal: databaseReducer.LoanshopsRows.dataTotal,
        shops: databaseReducer.LoanshopsRows.shops,
        loading: databaseReducer.loading,
        loaded: databaseReducer.loaded,
        panelVisible: layoutReducer.panelVisible,//勿删,传入TabMenuBar
    };
};
export default connect(
    mapStateToProps
)(withWidth()(ShopLoanPage));



