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

import TabMenuBar from './TabMenuBar.jsx';
import ForcastRecord from './ForcastRecord.jsx';
import ShopData from './ShopsData.jsx';
import GoodsData from './GoodsData.jsx';
import {Platformsales} from '../../../reducers/database.js';
//import {loadShops,loadShopWords,loadShopWords1} from '../../../reducers/database.js';

import {
    colors,
    spacing,
    typography
} from 'material-ui/styles';
import ReportSalesOverview from './ReportSalesOverview'


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
       // dispatch(loadShopWords());
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
        const {params : {shopsId}} = this.props;
        const styles = this.getStyles()
        const shopWordData = this.props;
        // console.log(shopWordData);

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
                <div style={styles.content}>


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

