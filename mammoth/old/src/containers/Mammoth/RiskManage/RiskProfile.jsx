import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import withWidth, {LARGE, MEDIUM,SMALL}  from '../../../utils/withWidth';
import TabMenuBar from '../PublicComponent/TabMenuBar.jsx';
import ECharts from 'react-echarts';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import Paper from 'material-ui/Paper';

import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import RiskTable from './RiskTable.jsx';
import RiskRecord from './RiskRecord.jsx';
import {loadShopData} from '../../../reducers/database.js';
import {
    colors,
    spacing,
    typography
} from 'material-ui/styles';
const option={
    legend: {
        orient: 'vertical',
        x: 'left',
        data:['']
    },
    series: [
        {
            name:'访问来源',
            type:'pie',
            radius: ['90%', '95%'],
            avoidLabelOverlap: false,
            label: {
                normal: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    show: true,
                    textStyle: {
                        fontSize: '10',
                        fontWeight: 'bold'
                    }
                }
            },
            labelLine: {
                normal: {
                    show: false
                }
            },
            data:[0,100],
            color:['#F44336','#FFCDD2']
        }
    ]
}




class RiskProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            slideIndex: 0
        };
    }

    componentDidMount () {
        // const { dispatch, params : {shopsId}} = this.props;
        // dispatch(loadShopData(shopsId));
    }

    shouldComponentUpdate=(nextProps = {}, nextState = {}) => {
        return true;//false,页面不刷新数据
    }

    getStyles()
    {
        const styles = {
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
            toolbar: {
                position:'fixed',
                left:0,
                width:'100%'
                //display: 'inline-block',
                //float: 'left',
                //margin: '16px 32px 16px 0',
            },
            tabs: {
                width: 880,
                backgroundColor: 'transparent',
            },
            after:{
                clear:'both',
                display:'block'
            },
            preRisk: {
                position:'absolute',
                top:'50%',
                left:'50%',
                marginLeft:'-15px',
                marginTop:'-15px',
                fontSize:'30px'
            },
            contentLeft:{
                height: '160px',
                width: '16%',
                float: 'left',
                marginLeft: '38px',
                marginTop: '38px',
                minWidth: 200
            },
            contentLeftWhenSmall:{
                width: '35%',
                marginLeft: '15px'
            },
            contentCenter:{
                width: '15%',
                float: 'left',
                lineHeight: '28px',
                marginTop: '27px',
                textAlign: 'left',
                fontSize: '14px',
                marginLeft: '38px'
            },
            contentCenterWhenSmall:{
                width: '25%',
                marginLeft: '5px'
            },
            contentRight:{
                height:250,
                width:'35%',
                float:'left'
            },
            contentRightWhenSmall:{
                width:'100%'
            },
            consumer:{
                height:310,
                width:'45%',
                float:'left',
                marginLeft:'5%',
                marginTop:10
            },
            consumerWhenSmall: {
                width:'90%'
            },
            style: {
                // height: 266,
                margin:'50px 72px',
                textAlign: 'center',
                // lineHeight:266
                // display: 'block',
            },
            style1: {
                margin:'50px 72px',
                textAlign: 'center',
                fontSize:'14px',
                color:'#1565C0'
            },
            style3:{
                margin:'30px 72px',
                fontSize:'14px',
                color:'#1565C0',
            },
            radioButton: {
                width:150,
                display:'inline-block'
            }

        };

        if ( this.props.width === MEDIUM || this.props.width === LARGE )
            styles.content = Object.assign(styles.content, styles.contentWhenMedium);
        if ( this.props.width === MEDIUM || this.props.width === SMALL ){
            styles.contentCenter = Object.assign(styles.contentCenter, styles.contentCenterWhenSmall);
            styles.contentRight = Object.assign(styles.contentRight, styles.contentRightWhenSmall);
            styles.contentLeft = Object.assign(styles.contentLeft, styles.contentLeftWhenSmall);
            styles.consumer = Object.assign(styles.consumer, styles.consumerWhenSmall);
        }

        return styles;
    }


    render() {

        const styles = this.getStyles();

        if (this.props.width == LARGE) {
            styles.toolbar.left = 240;
            styles.toolbar.width = 'calc(100% - 240px)'
        }
        else{
            styles.toolbar.left = 0
            styles.toolbar.width = '100%'
        }
        return (
            <div>
                <TabMenuBar {...this.props}
                            isArrowBackShown={true}
                            title="风控管理"
                    //handleChange={this.handleChange_TabMenuBar}
                    //tabs={["演员","导演","编剧",'摄像','美工']}
                            tabsWidth={500}/>
                <div style={styles.content}>

                    <Paper style={styles.style} zDepth={2}>
                        <Toolbar>
                            <ToolbarGroup>
                                <ToolbarTitle text="实时欺诈交易识别"/>
                            </ToolbarGroup>
                        </Toolbar>
                        <div style={{padding:'15px'}}>
                            <div style={{display:'flex',flexDirection:'row',height:'340px'}}>
                                <div style={{flex:1,position:'relative',paddingLeft:'40px'}}>
                                    <ECharts option={option}/>

                                    <div style={{fontFamily:'微软雅黑',fontSize:'19px',fontWeight:'bold',position:'absolute',top:'60px',left:'60px'}}>实时信用指数</div>
                                </div>
                                <div style={{flex:6}}>

                                        <RiskTable></RiskTable>

                                </div>
                            </div>
                            {/*<hr style={{margin:'0 20px'}}/>*/}
                            <div style={{}}>
                                <RiskRecord style={{padding:'15px'}}/>
                            </div>
                        </div>

                    </Paper>


                    <Paper style={styles.style1} zDepth={2}>
                        <Toolbar>
                            <ToolbarGroup>
                                <ToolbarTitle text="渠道监控"/>
                            </ToolbarGroup>
                        </Toolbar>
                        <div style={{padding:'30px 15px'}}>
                            <RiskRecord style={{padding:'15px'}}/>
                        </div>
                    </Paper>

                    <Paper style={styles.style3} zDepth={2}>
                        <Toolbar>
                            <ToolbarGroup>
                                <ToolbarTitle text="黑名单"/>
                            </ToolbarGroup>
                        </Toolbar>
                        <div style={{padding:'30px 15px'}}>
                            <RiskRecord style={{padding:'15px'}}/>
                        </div>

                    </Paper>
                </div>

            </div>
        );


    }
}


RiskProfile.propTypes = {
    dispatch:PropTypes.func.isRequired,
    // shopsRows:PropTypes.Array.isRequired,
};
RiskProfile.contextTypes = {
    muiTheme: React.PropTypes.object,
}

const mapStateToProps = (state) => {
    const { databaseReducer,layoutReducer} = state;
    return {
        shopLabelData:databaseReducer.shopData.shopLabelData,
        creditData:databaseReducer.shopData.creditData,
        loading:databaseReducer.loading,
        loaded:databaseReducer.loaded,
        panelVisible:layoutReducer.panelVisible,//勿删,传入TabMenuBar

    };
};
export default connect(
    mapStateToProps
)(withWidth( )(RiskProfile));




