import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import SwipeableViews from 'react-swipeable-views';

import ActiveTheme from '../../../mui-themes/active-theme.js';
import getMuiTheme from '../../../../node_modules/material-ui/styles/getMuiTheme';
import withWidth, {LARGE, MEDIUM,SMALL}  from '../../../utils/withWidth';

import ECharts from 'react-echarts';
import Paper from 'material-ui/Paper';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';

import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import {Tabs, Tab} from 'material-ui/Tabs';
import {Card,CardHeader,CardText} from 'material-ui/Card';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Equalizer from 'material-ui/svg-icons/av/equalizer';
import {Link} from 'react-router';

import SearchBar from '../Cast/SearchBar.jsx'
import FilmsList from '../Cast/CastsList.jsx'
import FilmInfoSet from './Films/FilmInfoSet.jsx'
import PlayInfoSet from './Plays/PlayInfoSet.jsx'
import TabMenuBar from './TabMenuBar.jsx';
import ForcastRecord from './ForcastRecord.jsx';
import {Platformsales} from '../../../reducers/database.js';
import {loadShops,loadShopWords} from '../../../reducers/database.js';

import {
    colors,
    spacing,
    typography
} from 'material-ui/styles';

const option1_tabline = {
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        orient: 'vertical',
        left: 'left',

    },
    series: [
        {
            type: 'pie',
            radius: ['60%', '55%'],
            label: {
                normal: {
                    position: 'center'
                }
            },
            data: [
                {
                    value: 75, name: '转化率',
                    label: {
                        normal: {
                            formatter: '{d} %',
                            textStyle: {
                                fontSize: 30
                            }
                        }
                    }
                },
                {
                    value: 25, name: '占位',
                    tooltip: {
                        show: false
                    },
                    itemStyle: {
                        normal: {
                            color: '#999'
                        }
                    },
                    label: {
                        normal: {
                            formatter: '\n转化率'
                        }
                    }
                }
            ]
        }
    ]
};

const option2_tabline = {
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        orient: 'vertical',
        left: 'left',

    },
    color: ['green'],
    series: [
        {
            type: 'pie',
            radius: ['60%', '55%'],
            label: {
                normal: {
                    position: 'center'
                }
            },
            data: [
                {
                    value: 50, name: '转化率',
                    label: {
                        normal: {
                            formatter: '{d} %',
                            textStyle: {
                                fontSize: 30
                            }
                        }
                    }
                },
                {
                    value: 50, name: '占位',
                    tooltip: {
                        show: false
                    },
                    itemStyle: {
                        normal: {
                            color: '#999'
                        }
                    },
                    label: {
                        normal: {
                            formatter: '\n转化率'
                        }
                    }
                }
            ]
        }
    ]
};

const option3_tabline = {
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    color: ['blue'],
    legend: {
        orient: 'vertical',
        left: 'left',

    },
    series: [
        {
            type: 'pie',
            radius: ['60%', '55%'],
            label: {
                normal: {
                    position: 'center'
                }
            },
            data: [
                {
                    value: 25, name: '转化率',
                    label: {
                        normal: {
                            formatter: '{d} %',
                            textStyle: {
                                fontSize: 30
                            }
                        }
                    }
                },
                {
                    value: 75, name: '占位',
                    tooltip: {
                        show: false
                    },
                    itemStyle: {
                        normal: {
                            color: '#999'
                        }
                    },
                    label: {
                        normal: {
                            formatter: '\n转化率'
                        }
                    }
                }
            ]
        }
    ]
};

const option4_tabline = {
    tooltip: {
        trigger: 'axis'
    },
    toolbox: {
        show: false,
        feature: {
            dataZoom: {
                yAxisIndex: 'none'
            },
            // dataView: {readOnly: false},
            magicType: {type: ['line', 'bar']},
            restore: {},
            saveAsImage: {}
        }
    },
    xAxis: {
        type: 'category',
        name: '',
        boundaryGap: true,
        data: ['Sept1', '2', '3', '4', '5', '6', '7'],
        show: false
    },
    yAxis: {
        type: 'value',
        name: '',
        axisLabel: {
            formatter: '{value} K '
        },
        show: false
    },
    series: [
        {
            name: '会员数',
            type: 'line',
            data: [400, 800, 400, 1000, 500, 900],
            markLine: {
                data: [
                    {type: 'average', name: '平均值'}
                ]
            }
        }
    ]
}


const filterInfo = {
    '年代': ['全部', '2016', '2015', '2014', '2013', '2012', '2011', '2010', '2009', '2008', '2007', '2006', '2005', '2004', '2003', '2002', '2001'],
    '类型': ['全部', '动作', '悬疑', '奇幻', '传记', '犯罪', '惊悚', '冒险', '剧情', '爱情', '战争', '喜剧', '武侠', '动画', '科幻',
        '恐怖', '西部', '歌舞', '纪录片'],
    '国家': ['全部', '中国', '丹麦', '俄罗斯', '保加利亚', '冰岛', '加拿大', '印度', '台湾', '墨西哥', '巴西', '德国', '意大利', '新加坡', '新西兰',
        '日本', '比利时', '法国', '泰国', '澳大利亚', '爱尔兰', '瑞典', '美国', '芬兰', '英国', '荷兰', '西班牙', '韩国', '马来西亚'],
    '字母': ['全部', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
}

class CastPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            slideIndex: 0,
            advancedSearch: false,
            nation: '全部',
            year: '全部',
            type: '全部',
            char: '全部'
        };
    }

    componentDidMount() {
        const { dispatch} = this.props;
        //const { dispatch, params : {shopsId}} = this.props;
        dispatch(loadShopWords());
        // dispatch(loadShopWords1());
    }

    shouldComponentUpdate=(nextProps = {}, nextState = {}) => {
        return true;//false,页面不刷新数据
    }

    handleChange = (value) => {
        this.setState({
            slideIndex: value,
        });
    };

    getChildContext() {
        return ( {
            muiTheme: this.context.muiTheme,
        } );
    }

    getStyles() {

        const styles = {
            toolbar: {
                zIndex: this.context.muiTheme.zIndex.appBar,//-1,
                position: 'fixed',
                left: 0,
                top: this.context.muiTheme.spacing.desktopKeylineIncrement,
                width: '100%'
                //display: 'inline-block',
                //float: 'left',
                //margin: '16px 32px 16px 0',
            },
            tabs: {
                width: 400,
                backgroundColor: 'transparent',
            },
            floatingButton: {
                position: 'absolute',
                right: 45,
                top: 20
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

    handleMouseDown_AdvancedSearch = ()=> {
        this.setState({advancedSearch: !this.state.advancedSearch});
    }


    render() {
        // const {params : {shopsId},location:{query}} = this.props;
        // const {params : {shopsId}} = this.props;
        const styles = this.getStyles()
        const shopWordData = this.props;
        console.log(shopWordData);

        if (this.props.width == LARGE) {
            styles.toolbar.left = 240;
            styles.toolbar.width = 'calc(100% - 240px)'
        }
        else {
            styles.toolbar.left = 0
            styles.toolbar.width = '100%'
        }

        return (
            <div>
                <TabMenuBar {...this.props}
                            isArrowBackShown={false}
                            title="经营报告详情"
                            tabsWidth={500}/>

                <div style={{marginTop:'100px'}}>
                    <ForcastRecord></ForcastRecord>
                </div>

                <Paper style={styles.content} zDepth={2}>
                    <Toolbar>
                        <ToolbarGroup>
                            <ToolbarTitle text="平台用户概况"/>
                        </ToolbarGroup>
                    </Toolbar>

                    <div style={{display:'flex',flexDirection:'row',paddingTop:'30px',paddingLeft:'100px'}}>
                        <div style={{flex:1,color:'#000000',fontSize:'16px'}}>
                            <span>总访客人数:</span><br />
                            <span>注册会员数：</span><br />
                            <span>新会员数增速：</span><br />
                            <span>新客户获取成本：</span><br />
                        </div>
                        <div style={{width:'30%',color:'#000000',fontSize:'16px'}}>
                            <span>活跃会员率:</span><br />
                            <span>会员复购率：</span><br />
                            <span>会员平均购买次数：</span><br />
                            <span>会员留存率：</span><br />
                        </div>
                        <div style={{flex:1,color:'#000000',fontSize:'16px'}}>
                            <span>商户总数: </span><br />
                            <span>商户数增速：</span><br />
                            <span>商户活跃数：</span><br />
                        </div>
                    </div>

                    <div
                        style={{display:'flex',flexDirection:'row',marginLeft:'28px',marginTop:'5px',width:'95%',backgroundColor:'#F2F2F2'}}>
                        <div style={{flex:1,height:'250px'}}>
                            <ECharts option={option1_tabline}/>
                        </div>
                        <div style={{flex:1,height:'250px'}}>
                            <ECharts option={option2_tabline}/>
                        </div>
                        <div style={{flex:1,height:'250px'}}>
                            <ECharts option={option3_tabline}/>
                        </div>

                        <div style={{width:'25%',fontSize:'24px'}}>
                            <div style={{height:'180px',backgroundColor:'#D7D7D7'}}>
                                <span>July 2015</span>
                                <ECharts option={option4_tabline}/>
                            </div>
                            <div style={{display:'flex',flexDirection:'row',backgroundColor:'#E4E4E4',height:'70px'}}>
                                <div style={{flex:1,color:'#000000',fontSize:'14px',fontFamily:'微软雅黑',marginTop:'10px',marginLeft:'20px'}}>
                                    <span>59%</span><br />
                                    <span>Redict Sell</span><br />
                                </div>
                                <div
                                    style={{width:'50%',color:'#000000',fontSize:'14px',fontFamily:'微软雅黑',marginTop:'10px'}}>
                                    <span>41%</span><br />
                                    <span>SMM</span><br />
                                </div>
                            </div>
                        </div>

                    </div>
                    <div style={{height:'30px',width:'100%'}}>

                    </div>
                </Paper>


                <Paper style={styles.toolbar} zDepth={1}>
                    {/* <Toolbar
                     style={{
                     backgroundColor:this.context.muiTheme.palette.alternateTextColor,
                     height:this.context.muiTheme.palette.desktopSubheaderHeight}}
                     >
                     <ToolbarGroup firstChild={true} style={{width:10}}/>
                     <ToolbarGroup>
                     <Tabs
                     tabItemContainerStyle={styles.tabs}
                     onChange={this.handleChange}
                     value={this.state.slideIndex}
                     >
                     <Tab label="成片评估" value={0}/>
                     <Tab label="剧本评估" value={1}/>
                     </Tabs>
                     </ToolbarGroup>
                     <ToolbarGroup lastChild={false}>
                     {/!* <SearchBar advancedSearch={this.handleMouseDown_AdvancedSearch}/>*!/}
                     </ToolbarGroup>
                     </Toolbar>*/}
                    <FloatingActionButton
                        containerElement={
                            this.state.slideIndex==0?<Link to="/mammoth/forecast/filmReport" />:<Link to="/mammoth/forecast/playReport" />
                        }
                        secondary={true}
                        style={styles.floatingButton}
                    >
                        <Equalizer />
                    </FloatingActionButton>
                </Paper>

                <div style={styles.content}>
                    {/*<SwipeableViews
                     index={this.state.slideIndex}
                     onChangeIndex={this.handleChange}
                     >
                     <div style={{padding:'10 30px'}}>
                     <FilmInfoSet catalogue='history'/>
                     </div>
                     <div style={{padding:'10 30px'}}>
                     <PlayInfoSet />
                     </div>
                     </SwipeableViews>*/}

                </div>
            </div>
        );
    }
}


CastPage.contextTypes = {
    muiTheme: React.PropTypes.object,
}

CastPage.childContextTypes = {
    muiTheme: React.PropTypes.object,
};

CastPage.propTypes = {
    //width:PropTypes.number.isRequired,
    //height:PropTypes.number.isRequired,
};

const mapStateToProps = (state) => {
    const { databaseReducer,layoutReducer } = state;
    return {
        shopWordData:databaseReducer.shopWordData,
        loading:databaseReducer.loading,
        loaded:databaseReducer.loaded,
        panelVisible:layoutReducer.panelVisible,//勿删,传入TabMenuBar

    };
};

export default connect(
    mapStateToProps
)(withWidth()(CastPage));

