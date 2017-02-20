import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import SwipeableViews from 'react-swipeable-views';

import sizeMe from 'react-sizeme';


import withWidth, {LARGE, MEDIUM,SMALL}  from '../utils/withWidth';
import Divider from 'material-ui/Divider';

import Chart from '../components/Chart';
import ReactEcharts from 'echarts-for-react';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import {Tabs, Tab} from 'material-ui/Tabs';
import {Card,CardHeader,CardText} from 'material-ui/Card';
import Paper from 'material-ui/Paper';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

import {Responsive as ResponsiveReactGridLayout}  from 'react-grid-layout';
import IconButton from 'material-ui/IconButton';
import {Link} from 'react-router';
import MoreVert from 'material-ui/svg-icons/navigation/more-vert.js'


import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import DatePicker from 'material-ui/DatePicker';
import layoutConfig from '../../Data/layoutConfig.json'
import ShopsSearchBar from '../containers/Mammoth/Shops/ShopsSearchBar.jsx'
import {loadShops,loadShopsSearch, loadSingleUsersSearch, loadUsers} from '../reducers/database.js';
import CircularProgress from 'material-ui/CircularProgress';
import ShopsNavigationBar from '../containers/Mammoth/UserAnalysis/ShopsNavigationBar.jsx'

import {
    colors,
    spacing,
    typography
} from 'material-ui/styles';


class IndexPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            totalPeriod: 0,
            data: [],
            showFilterResult: true,
            isShow: false,
            shopsId: 0,
            usersId: 0,
            page: 1,
            pageLineCount: 10,
            searchText_user: '',
            showFilterResult_user: true,
            isShow_user: false,

            advancedSearch:false,
            page_Shops: 1,
            pageLineCount_Shops: 10,
            searchText: '',

        };
    }

    componentWillReceiveProps(nextProps) {
        const {page, pageLineCount,page_Shops,pageLineCount_Shops,searchText,searchText_user} = this.state;
        const {dispatch} = this.props;
        if (nextProps.params && this.props.params != nextProps.params) {
            if(nextProps.params.level1=='商户分析'){
                dispatch(loadShops(page_Shops,pageLineCount_Shops,searchText,0,1));
            }else if(nextProps.params.level1=='用户分析'){
                dispatch(loadUsers(page, pageLineCount,searchText_user));
            }
            const {params: {level1, level2}} = nextProps;
            this.updateData(level1, level2);
            this.setState({
                totalPeriod: 0
            })
        }
    }

    componentDidMount() {
        const {params: {level1, level2}} = this.props;
        this.updateData(level1, level2);
        const {dispatch} = this.props;
        const {page, pageLineCount,page_Shops,pageLineCount_Shops,searchText,searchText_user} = this.state;
        if(level1=='商户分析'){
            dispatch(loadShops(page_Shops,pageLineCount_Shops,searchText,0,1));
        }else if(level1=='用户分析'){
            dispatch(loadUsers(page, pageLineCount,searchText_user));
        }
    }

    updateData=(level1,level2)=>{
        let data=[];
        if(layoutConfig[level1]) {
            if (layoutConfig[level1][level2])
                if(level2=="总览"){
                    layoutConfig[level1]['总览'].map(item=>{
                        if(layoutConfig[item.level1] && layoutConfig[item.level1][item.level2]){
                            layoutConfig[item.level1][item.level2].forEach(value=>{
                                if(value.name==item.level3){
                                    data.push(value);
                                }
                            })
                        }
                    })
                }
                else
                    data = layoutConfig[level1][level2];
        }
        this.setState({data})
    }

    getStyles() {
        const styles = {
            content: {
                margin: this.context.muiTheme.spacing.desktopGutter,
                //marginBottom:0
            },

            contentWhenMedium: {
                margin: `${this.context.muiTheme.spacing.desktopGutter * 2}px  ${this.context.muiTheme.spacing.desktopGutter * 3}px`,
                //marginTop:this.context.muiTheme.spacing.desktopGutter
            },
            shopsName:{
                color: '#aaa', whiteSpace: 'nowrap', textAlign: 'center', margin: '0px'
            },
            shopsValue:{
                textAlign: 'center', color: '#3398db', marginTop: '15px', fontWeight: '700'
            },
            searchBar: {
                zIndex: this.context.muiTheme.zIndex.appBar,//-1,
                backgroundColor: this.context.muiTheme.palette.accent2Color,//alternateTextColor,
                height: this.context.muiTheme.palette.desktopSubheaderHeight
            }
        };

        // if (this.props.width === MEDIUM || this.props.width === LARGE)
        //     styles.content = Object.assign(styles.content, styles.contentWhenMedium);

        return styles;
    }

    handleChangeTotal=(obj,value)=>{
        this.setState({totalPeriod:value})
    }

    getLayouts(data) {
        let layout={lg: [],md:[],sm:[]};
        data.map((item,index)=>{
            const cellWidth=6,cellHeight=6,cols=2;
            layout.lg.push({
                i: index.toString(), x: index%cols==0?0:cellWidth, y: Math.floor(index/cols)*cellHeight, w: cellWidth, h: cellHeight,minW: 6, minH: 6
            })
            layout.md.push({
                i: index.toString(), x: index%cols==0?0:cellWidth, y: Math.floor(index/cols)*cellHeight, w: cellWidth, h: cellHeight,minW: 6, minH: 6
            })
            layout.sm.push({
                i: index.toString(), x: index%cols==0?0:cellWidth, y: Math.floor(index/cols)*cellHeight, w: cellWidth, h: cellHeight,minW: 6, minH: 6
            })
        });
        return layout;
    }
    onUpdateInput_AutoComplete=(value)=> {
        const {dispatch} = this.props;
        const {pageLineCount_Shops} = this.state;
        if(value == ''){
            this.setState({
                searchText: '',
                showFilterResult:false
            });
            dispatch(loadShops(1,pageLineCount_Shops,'',0,1));
        }else {
            this.setState({
                searchText:value,
                showFilterResult:true
            });

        }
    }
    advancedSearch_AutoComplete = (value)=> {
        this.setState({
            advancedSearch: !this.state.advancedSearch,
            isShow: true
        });
        const {dispatch} = this.props;
        const {searchText,page_Shops,pageLineCount_Shops} = this.state;
        dispatch(loadShops(page_Shops,pageLineCount_Shops,searchText,0,1));
    }
    onNewRequest_AutoComplete = (chosenRequest, index)=> {
        const {dispatch} = this.props;
        this.setState({
            page_Shops:1,
            searchText: chosenRequest,
            showFilterResult: true,
            isShow: true
        })
        const {pageLineCount_Shops} = this.state;
        // dispatch(loadShopsSearch(chosenRequest));
        dispatch(loadShops(1,pageLineCount_Shops,chosenRequest,0,1));
        this.changeValuedShops('');
    }
    handleMouseDown_ClearSearch=()=> {
        this.setState({
            page_Shops:1,
            searchText: '',
            showFilterResult:false,
            isShow:false
        });
        const {dispatch} = this.props;
        const {pageLineCount_Shops} = this.state;
        dispatch(loadShops(1,pageLineCount_Shops,'',0,1));
        this.changeValuedShops('');
    }

    onUpdateInput_AutoComplete_user = (value)=> {
        const {dispatch} = this.props;
        const {pageLineCount} = this.state;
        if (value == '') {
            this.setState({
                page: 1,
                searchText_user: '',
                showFilterResult_user: false
            });
            dispatch(loadUsers(1, pageLineCount, ''));
        } else {
            this.setState({
                searchText_user: value,
                showFilterResult_user: true
            });
        }
    }

    advancedSearch_AutoComplete_user = (value)=> {
        this.setState({
            // advancedSearch: !this.state.advancedSearch,
            isShow_user: false
        });
        const {dispatch} = this.props;
        const {searchText_user, pageLineCount} = this.state;
        dispatch(loadUsers(1, pageLineCount, searchText_user));
    }
    changeValued = (userid)=> {
        this.setState({
            // advancedSearch: !this.state.advancedSearch,
            isShow_user: true,
            showFilterResult_user: true,
            usersId:userid
        });
        const {dispatch} = this.props;
        dispatch(loadSingleUsersSearch(userid));
    }
    changeValuedShops = (ShopsId)=> {
        console.log('ShopsId',ShopsId);
        this.setState({
            advancedSearch: !this.state.advancedSearch,
            isShow: true,
            showFilterResult: true,
            shopsId:ShopsId
        });
        const {dispatch} = this.props;
        dispatch(loadShopsSearch(ShopsId));
    }
    onNewRequest_AutoComplete_user = (chosenRequest, index)=> {
        const {dispatch} = this.props;
        this.setState({
            page: 1,
            searchText_user: chosenRequest,
            showFilterResult_user: true,
            isShow_user: false
        })
        const {pageLineCount} = this.state;
        dispatch(loadUsers(1, pageLineCount, chosenRequest));
    }

    handleMouseDown_ClearSearch_user = ()=> {
        this.setState({
            searchText_user: '',
            showFilterResult_user: false,
            isShow_user: false
        });
        const {pageLineCount} = this.state;
        const {dispatch} = this.props;
        dispatch(loadUsers(1, pageLineCount, ''));
    }



    handleMouseDown_SetPage = (page)=> {
        this.setState({page: page});
        const {dispatch} = this.props;
        const {pageLineCount, searchText} = this.state;
        dispatch(loadUsers(page, pageLineCount, searchText));
    }

    handleMouseDown_setPageLineCount = (count)=> {
        this.setState({pageLineCount: count});

        const {dispatch} = this.props;
        const {page, searchText} = this.state;
        dispatch(loadUsers(page, count, searchText));
    }
    handleMouseDown_SetPage_Shops=(page)=> {
        this.setState({page_Shops:page});

        const {dispatch} = this.props;
        const {pageLineCount_Shops,searchText} = this.state;
        dispatch(loadShops(page,pageLineCount_Shops,searchText,0,1));

    }

    handleMouseDown_setPageLineCount_Shops=(count)=>{
        this.setState({pageLineCount_Shops:count});

        const {dispatch} = this.props;
        const {page_Shops,searchText} = this.state;
        dispatch(loadShops(page_Shops,count,searchText,0,1));

    }
    tableRender = (data, list,str,page,pageLineCount)=> {
        // console.log('data',data);
        return (
            // <Table
            //     //height=300
            //     fixedHeader={true}
            //     bodyStyle={{minHeight: 510, width: 2500}}
            // >
            //     <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
            //         <TableRow>
            //             <TableHeaderColumn style={{width: 15}}>更多</TableHeaderColumn>
            //             {
            //                 str == '店铺id' ?
            //                     <TableHeaderColumn style={{width: 33}}>序号</TableHeaderColumn>:
            //                     <TableHeaderColumn style={{width: 60}}>序号</TableHeaderColumn>
            //             }
            //
            //             {
            //                 str == '店铺id' ?
            //                 list.map((column, key)=>
            //                     column.indexOf('id') != -1 ? null :
            //                         <TableHeaderColumn key={key} style={{
            //                             width: column.indexOf('商铺名称') >= 0 ? 160 : 160,
            //                             textAlign: 'center'
            //                         }}>
            //                             {column}
            //                         </TableHeaderColumn>
            //                 ):
            //                     list.map((column, key)=>
            //                         column.indexOf('id') != -1 ? null :
            //                             <TableHeaderColumn key={key} style={{
            //                                 width: column.indexOf('文名') >= 0 ? 149 : 149,
            //                                 textAlign: 'center'
            //                             }}>
            //                                 {column}
            //                             </TableHeaderColumn>
            //                     )
            //             }
            //         </TableRow>
            //     </TableHeader>
            //     {
            //
            //         this.props.loaded && data && data.length>0?
            //         <TableBody
            //             displayRowCheckbox={false}
            //             showRowHover={true}
            //             //stripedRows={true}
            //         >
            //
            //             {data.map((row, index) =>
            //                 <TableRow key={index}>
            //                     <TableRowColumn style={{width: 20}}>
            //                         <IconButton
            //                             style={{marginLeft: -10}}
            //                             onTouchTap={()=> {
            //                                 str == '店铺id' ?
            //                                     this.changeValuedShops(row[str]) :
            //                                     this.changeValued(row[str])
            //                             }}
            //                         >
            //                             <MoreVert/>
            //                         </IconButton>
            //                     </TableRowColumn>
            //                     <TableRowColumn
            //                         style={{width: 60}}>{index + 1 + (page - 1) * pageLineCount}
            //                     </TableRowColumn>
            //                     {
            //                         list.map((column, key) =>
            //                             column.indexOf('id') != -1 ? null :
            //                                 <TableRowColumn key={key} style={{padding: '0px', textAlign: 'center'}}>
            //                                     {row[column]}
            //                                 </TableRowColumn>
            //                         )
            //                     }
            //                 </TableRow>)
            //             }
            //     </TableBody>:<div style={{marginTop:'30px',fontSize:'16px',textAlign: 'center', color: 'gray', height: '160px'}}>无此店铺信息</div>
            //     }
            // </Table>
            <Table
                //height=300
                fixedHeader={true}
                bodyStyle={{minHeight:510,width:2500}}
            >
                {
                    str == '店铺id' ?
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
                        </TableHeader>:
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
                }
                {
                    str == '店铺id' ?
                        <TableBody
                            displayRowCheckbox={false}
                            showRowHover={true}
                            //stripedRows={true}
                        >
                            {data.map((row, index) =>

                                <TableRow key={index}>
                                    <TableRowColumn style={{width: 20}}>
                                        <IconButton style={{marginLeft: -10}}
                                            onTouchTap={()=> {
                                                this.changeValuedShops(row[str])
                                            }}
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
                        </TableBody> :
                        <TableBody
                            displayRowCheckbox={false}
                            showRowHover={true}
                            //stripedRows={true}
                        >
                            {data.map((row, index) =>
                                <TableRow key={index}>
                                    <TableRowColumn style={{padding: '0px', textAlign: 'center', width: 35}}>
                                        <IconButton style={{marginLeft: -10}}
                                                    onTouchTap={()=> {
                                                        this.changeValued(row[str])
                                                    }}
                                        >
                                            <MoreVert/>
                                        </IconButton>
                                    </TableRowColumn>
                                    <TableRowColumn
                                        style={{
                                            padding: '0px',
                                            textAlign: 'center',
                                            width: 35
                                        }}>{index + 1 + (page - 1) * pageLineCount}
                                    </TableRowColumn>
                                    {
                                        list.map((column, key) =>
                                            column.indexOf('用户ID') != -1 ?
                                                <TableRowColumn key={key} style={{
                                                    padding: '0px',
                                                    textAlign: 'center',
                                                    width: 40
                                                }}>
                                                    {row[column]}
                                                </TableRowColumn> :
                                                <TableRowColumn key={key} style={{
                                                    padding: '0px',
                                                    textAlign: 'center',
                                                    width: 90
                                                }}>
                                                    {row[column]}
                                                </TableRowColumn>
                                        )
                                    }
                                </TableRow>
                            )}
                        </TableBody>
                }
            </Table>
        )
    }

    render() {
        const {params: {level1, level2}} = this.props;
        // console.log('render');
        // console.log(level1,level2)
        const {shops,dataTotal, SingleData, Userlist, count,SingleShopsData} = this.props;
        let shopsColumnList = ['商铺名称','店主','信用值','电话','地址','商圈','推荐码','当前状态','审核状态','是否注销','推广人推荐码','银行推荐码','注册时间','审核时间','类型','店铺id'];
        let UsersColumnList = ['用户ID','信用值', '出生年月', '是否注册用户', '电话', '注册时间', '会员积分', '推荐码', '用户的等级', '性别', '状态', '地址', '客户端', '真实姓名', 'Email'];
        const {totalPeriod, data, showFilterResult, isShow, searchText,
            showFilterResult_user, isShow_user, searchText_user, page, pageLineCount,
            page_Shops,pageLineCount_Shops}=this.state;
        const styles = this.getStyles();
        const showData = (shops.length == 1 && isShow);
        // console.log('SingleShopsData',SingleShopsData)
        return (
            <div style={styles.content}>
                <Toolbar style={{backgroundColor:'transparent'}}>
                    <ToolbarGroup>
                        {
                            level1=='商户分析'?
                                <div>
                                    <div style={{display:'flex'}}>
                                        <Toolbar style={{backgroundColor:''}}>
                                            <ShopsSearchBar
                                                onUpdateInput={this.onUpdateInput_AutoComplete}
                                                advancedSearch={this.advancedSearch_AutoComplete}
                                                onNewRequest={this.onNewRequest_AutoComplete}
                                                clearSearch={this.handleMouseDown_ClearSearch}
                                                showCloseButton={showFilterResult}
                                                searchText={searchText}
                                                data={[]}
                                            />
                                        </Toolbar>
                                        {
                                            SingleShopsData && SingleShopsData.length==1 && isShow?
                                                <div style={{display:'flex',marginTop:'-13px'}} >
                                                    <div style={{marginRight:'20px'}}>
                                                        <div style={styles.shopsName}>
                                                            当前查询的店铺
                                                        </div>
                                                        <div style={styles.shopsValue}>
                                                            {SingleShopsData[0]['商铺名称']}
                                                        </div>
                                                    </div>
                                                    <div style={{marginRight:'20px'}}>
                                                        <div style={styles.shopsName}>店铺id</div>
                                                        <div style={styles.shopsValue}>{SingleShopsData[0]['店铺id']}</div>
                                                    </div>
                                                    <div style={{marginRight:'20px'}}>
                                                        <div style={styles.shopsName}>店主电话</div>
                                                        <div style={styles.shopsValue}>{SingleShopsData[0]['电话']}</div>
                                                    </div>
                                                    <div style={{marginRight:'20px'}}>
                                                        <div style={styles.shopsName}>店主名称</div>
                                                        <div style={styles.shopsValue}>{SingleShopsData[0]['店主']}</div>
                                                    </div>
                                                </div> :
                                                <div style={{textAlign: 'center', fontSize: '14px', color: 'gray', height: '160px', marginTop: '15px'}}>
                                                    请输入需要查询的店铺名称、店主、店主电话、店铺ID
                                                </div>

                                        }

                                    </div>


                                </div>
                                :
                                (level1 == '用户分析' ?
                                        <div style={{display: 'flex'}}>
                                            <Toolbar style={{backgroundColor: ''}}>
                                                <ShopsSearchBar
                                                    onUpdateInput={this.onUpdateInput_AutoComplete_user}
                                                    advancedSearch={this.advancedSearch_AutoComplete_user}
                                                    onNewRequest={this.onNewRequest_AutoComplete_user}
                                                    clearSearch={this.handleMouseDown_ClearSearch_user}
                                                    showCloseButton={showFilterResult_user}
                                                    searchText={searchText_user}
                                                    data={[]}
                                                />
                                            </Toolbar>
                                            {
                                                SingleData.length == 1 && isShow_user ?
                                                    <div style={{display: 'flex', marginTop: '-13px'}}>
                                                        <div style={{marginRight: '20px'}}>
                                                            <div style={styles.shopsName}>
                                                                当前查询的用户
                                                            </div>
                                                            <div style={styles.shopsValue}>
                                                                {SingleData[0]['真实姓名']}
                                                            </div>
                                                        </div>
                                                        <div style={{marginRight: '20px'}}>
                                                            <div style={styles.shopsName}>用户id</div>
                                                            <div style={styles.shopsValue}>{SingleData[0]['用户ID']}</div>
                                                        </div>
                                                        <div style={{marginRight: '20px'}}>
                                                            <div style={styles.shopsName}>用户电话</div>
                                                            <div style={styles.shopsValue}>{SingleData[0]['电话']}</div>
                                                        </div>
                                                        <div style={{marginRight: '20px'}}>
                                                            <div style={styles.shopsName}>用户等级</div>
                                                            <div
                                                                style={styles.shopsValue}>{SingleData[0]['用户的等级']}</div>
                                                        </div>
                                                    </div> :<div style={{textAlign: 'center', fontSize: '14px', color: 'gray', height: '160px', marginTop: '15px'}}>
                                                    请输入需要查询的用户ID、用户名称、Email
                                                </div>
                                            }

                                        </div>
                                        :
                                        <ToolbarTitle text={level2}/>
                                )
                        }
                    </ToolbarGroup>
                    {
                        level1 == '用户分析' && isShow_user == false ||level1 == '商户分析' && isShow == false? null
                            :
                            <ToolbarGroup style={{marginRight: -8}}>
                                <DropDownMenu value={totalPeriod} onChange={this.handleChangeTotal}
                                              underlineStyle={{borderColor: 'transparent'}}
                                              labelStyle={{color: this.context.muiTheme.palette.accent1Color}}>
                                    <MenuItem value={0} primaryText="按天"/>
                                    <MenuItem value={1} primaryText="按周"/>
                                    <MenuItem value={2} primaryText="按月"/>
                                </DropDownMenu>
                            </ToolbarGroup>
                    }

                </Toolbar>
                {
                    level1 == '用户分析' && isShow_user == false ?
                        null :
                        <div style={{padding: '0 20px'}}>
                            <Divider />
                        </div>
                }
                {
                    level1 != '商户分析' ?

                        (level1 != '用户分析' ?
                                <ResponsiveReactGridLayout className="layout" layouts={this.getLayouts(data)}
                                                           breakpoints={{lg: 992, md: 768, sm: 0}}
                                                           cols={{lg: 12, md: 12, sm: 6, xs: 4, xxs: 2}}
                                                           rowHeight={40} width={this.props.size.width}
                                                           margin={[30, 20]}
                                >
                                    {
                                        data.map((item, index)=>
                                            <div key={index}>
                                                <Chart data={item} index={index} totalPeriod={totalPeriod}/>
                                            </div>
                                        )
                                    }
                                </ResponsiveReactGridLayout>
                                :
                                (
                                    SingleData.length == 1 && isShow_user ?
                                        <ResponsiveReactGridLayout className="layout" layouts={this.getLayouts(data)}
                                                                   breakpoints={{lg: 992, md: 768, sm: 0}}
                                                                   cols={{lg: 12, md: 12, sm: 6, xs: 4, xxs: 2}}
                                                                   rowHeight={40} width={this.props.size.width}
                                                                   margin={[30, 20]}
                                        >
                                            {
                                                data.map((item, index)=>
                                                    <div key={index}>
                                                        <Chart data={item} index={index} totalPeriod={totalPeriod}
                                                               usersId={SingleData[0]['用户ID']} userData={SingleData}/>
                                                    </div>
                                                )
                                            }
                                        </ResponsiveReactGridLayout>
                                        :
                                        (SingleData.length != 1 && isShow_user ?
                                                <div style={{
                                                    textAlign: 'center',
                                                    fontSize: '24px',
                                                    color: 'gray',
                                                    height: '160px',
                                                    marginTop: '30px'
                                                }}>
                                                    对不起，您输入的用户ID不存在，请重新输入！
                                                </div>
                                                :

                                                <Paper zDepth={2} style={{width: '92%', margin: '0 auto'}}>
                                                    <Toolbar>
                                                        <ToolbarGroup>
                                                            <ToolbarTitle text="用户信息"/>
                                                        </ToolbarGroup>
                                                    </Toolbar>
                                                    {
                                                        this.props.loaded &&
                                                        <Toolbar style={styles.searchBar}>
                                                                <ShopsNavigationBar
                                                                    pageCount={pageLineCount} value={page}
                                                                    total={pageLineCount * 100}
                                                                    setPage={this.handleMouseDown_SetPage}
                                                                    setPageLineCount={this.handleMouseDown_setPageLineCount}/>
                                                        </Toolbar>
                                                    }
                                                    {
                                                        Userlist.length < 0 ?
                                                            <div style={{display: 'flex', justifyContent: 'center'}}>
                                                                <CircularProgress style={{margin: 80}} size={1.5}/>
                                                            </div>
                                                            :
                                                            this.tableRender(Userlist, UsersColumnList,'用户ID',page,pageLineCount)
                                                    }
                                                    {
                                                        this.props.loading &&
                                                        <div style={{display: 'flex', justifyContent: 'center'}}>
                                                            <CircularProgress style={{margin: -350}} size={1.5}/>
                                                        </div>
                                                    }
                                                </Paper>
                                        )
                                )
                        )
                        :
                        (
                            SingleShopsData && SingleShopsData.length == 1 && isShow ?
                                <ResponsiveReactGridLayout className="layout" layouts={this.getLayouts(data)}
                                                           breakpoints={{lg: 992, md: 768, sm: 0}}
                                                           cols={{lg: 12, md: 12, sm: 6, xs: 4, xxs: 2}}
                                                           rowHeight={40} width={this.props.size.width}
                                                           margin={[30, 20]}
                                >
                                    {
                                        data.map((item, index)=>
                                            <div key={index}>
                                                <Chart data={item} index={index} totalPeriod={totalPeriod}
                                                       shopsId={SingleShopsData[0]['店铺id']} shopData={SingleShopsData}/>
                                            </div>
                                        )
                                    }
                                </ResponsiveReactGridLayout>
                                :

                            <Paper zDepth={2} style={{width: '92%', margin: '0 auto'}}>
                                <Toolbar>
                                    <ToolbarGroup>
                                        <ToolbarTitle text="商户信息"/>
                                    </ToolbarGroup>
                                </Toolbar>
                                {
                                    this.props.loaded &&
                                    <Toolbar style={styles.searchBar}>
                                        <ShopsNavigationBar
                                            pageCount={pageLineCount_Shops} value={page_Shops}
                                            total={dataTotal}
                                            setPage={this.handleMouseDown_SetPage_Shops}
                                            setPageLineCount={this.handleMouseDown_setPageLineCount_Shops}/>
                                    </Toolbar>
                                }
                                {
                                    shops.length < 0 ?
                                        <div style={{display: 'flex', justifyContent: 'center'}}>
                                            <CircularProgress style={{margin: 80}} size={1.5}/>
                                        </div>
                                        :
                                        this.tableRender(shops, shopsColumnList,'店铺id',page_Shops,pageLineCount_Shops)
                                }
                                {
                                    this.props.loading &&
                                    <div style={{display: 'flex', justifyContent: 'center'}}>
                                        <CircularProgress style={{margin: -350}} size={1.5}/>
                                    </div>
                                }
                            </Paper>
                        )
                }


            </div>

        );


    }
}

IndexPage.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

IndexPage.contextTypes = {
    muiTheme: React.PropTypes.object,
}

const mapStateToProps = (state) => {
    const {databaseReducer} = state;

    return {
        dataTotal:databaseReducer.shopsRows.dataTotal,//商铺总条数
        shops: databaseReducer.shopsRows.shops,
        SingleShopsData:databaseReducer.SingleShopsData,
        SingleData: databaseReducer.SingleData,
        Userlist: databaseReducer.UserData.Userlist,
        count: databaseReducer.UserData.count,
        loading: databaseReducer.loading,
        loaded: databaseReducer.loaded
    };
};

export default connect(
    mapStateToProps
)(sizeMe()(IndexPage));




