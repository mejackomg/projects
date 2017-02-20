import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import SwipeableViews from 'react-swipeable-views';

import ActiveTheme from '../../../mui-themes/active-theme.js';
import getMuiTheme from '../../../../node_modules/material-ui/styles/getMuiTheme';
import withWidth, {LARGE, MEDIUM,SMALL}  from '../../../utils/withWidth';

import Paper from 'material-ui/Paper';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';

import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import {Tabs, Tab} from 'material-ui/Tabs';
import {Card,CardHeader,CardText} from 'material-ui/Card';
import {GridList, GridTile} from 'material-ui/GridList';

import SearchBar from './SearchBar.jsx'
import FilmCard from './FilmCard.jsx'
import {Link} from 'react-router';

import Audience from '../Cast/Actor/Audience.jsx'
import HeatIndex from '../Cast/Actor/HeatIndex.jsx'
import Marketing from './Marketing.jsx'
import BoxOfficeInfo from './BoxOfficeInfo.jsx'

import {
    colors,
    spacing,
    typography
} from 'material-ui/styles';



class FilmPage extends Component {
    constructor(props) {
        super(props);
        this.state = {};
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
                width: 500,
                backgroundColor: 'transparent',
            },
            content: {
                margin: this.context.muiTheme.spacing.desktopGutter,
                //marginBottom:0
                paddingTop: this.context.muiTheme.spacing.desktopSubheaderHeight,
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
                <Paper style={styles.toolbar} zDepth={1}>
                    <Toolbar
                        style={{
                    backgroundColor:this.context.muiTheme.palette.alternateTextColor,
                    height:this.context.muiTheme.palette.desktopSubheaderHeight}}
                        >
                        <ToolbarGroup firstChild={true} style={{width:210}}/>
                        <ToolbarGroup>
                            <Tabs
                                tabItemContainerStyle={styles.tabs}
                                onChange={this.handleChange}
                                value={this.state.slideIndex}
                                >
                                <Tab label="影片资料" value={0}/>
                                <Tab label="营销分析" value={1}/>
                                <Tab label="票房分析" value={2}/>
                                <Tab label="热度分析" value={3}/>
                                <Tab label="受众分析" value={4}/>
                            </Tabs>
                        </ToolbarGroup>
                        <ToolbarGroup lastChild={false}>
                            <SearchBar advancedSearch={this.handleMouseDown_AdvancedSearch}/>
                        </ToolbarGroup>
                    </Toolbar>
                </Paper>

                <div style={styles.content}>
                    <FilmCard />

                    <SwipeableViews
                        index={this.state.slideIndex}
                        onChangeIndex={this.handleChange}
                        >
                        <div style={{padding:'10 60px'}}>
                            <h3>剧情简介：</h3>

                            <p>上世纪80年代末，胡八一（陈坤 饰）、王凯旋（黄渤 饰）与Shirley杨（舒淇 饰）在美国打算金盆洗手，
                                本来叱咤风云的摸金校尉沦为街头小贩被移民局追得满街跑。就在此时，意外发现20年前死在草原上的初恋
                                对象丁思甜（杨颖 饰）可能还活着，胡八一、王凯旋、Shirley杨决定再入草原千年古墓……</p>

                            <h3>导演：</h3>

                            <p><Link to="/mammoth/casts/director">乌尔善 Wuershan</Link></p>

                            <h3>主演：</h3>

                            <p><Link to="/mammoth/film">陈坤 Kun Chen</Link></p>

                            <p><Link to="/mammoth/casts/actor">黄渤 Bo Huang </Link></p>

                            <p>
                                <a target="_blank" href="" title="舒淇 Hsu Chi">
                                    舒淇 Hsu Chi </a><span></span>
                            </p>

                            <p>
                                <a target="_blank" href=""
                                   title="杨颖 Angela Baby">
                                    杨颖 Angela Baby </a><span></span>
                            </p>

                            <p>
                                <a target="_blank" href="" title="夏雨 Yu Xia">
                                    夏雨 Yu Xia </a><span></span>
                            </p>

                            <p>
                                <a target="_blank" href=""
                                   title="刘晓庆 Xiaoqing Liu">
                                    刘晓庆 Xiaoqing Liu </a><span></span>
                            </p>


                            <h3>制作公司：</h3>

                            <p><Link to="/mammoth/casts/producer">万达影视传媒有限公司 Wanda Media Co., LTD</Link></p>

                            <p><a target="_blank" href="" title="万达影业（香港）有限公司">万达影业（香港）有限公司
                                Wanda Pictures（Hongkong）Co.,Ltd</a></p>

                            <p><a target="_blank" href="" title="万达影业（青岛）有限公司">万达影业（青岛）有限公司
                                Wanda Pictures（Qingdao）Co.,Ltd </a></p>

                            <p><a target="_blank" href="" title="华谊兄弟传媒股份有限公司">华谊兄弟传媒股份有限公司
                                Huayi Brothers Media Group Co.,Ltd</a></p>

                            <p><a target="_blank" href="" title="北京光线影业有限公司">北京光线影业有限公司
                                Beijing Enlight Pictures Co.,Ltd</a></p>

                            <p><a target="_blank" href=""
                                  title="亚太未来影视（北京）有限公司">亚太未来影视（北京）有限公司 Yatai Weilai
                                Entertainment（Beijing）Co.,Ltd </a></p>

                            <p><a target="_blank" href="" title="浙江蓝巨星国际传媒有限公司">浙江蓝巨星国际传媒有限公司
                                Zhejiang Blue Star International Media Co., Ltd</a></p>

                            <p><a target="_blank" href="" title="长生天影业">长生天影业
                                Changshengtian Flims</a></p>

                            <p><a target="_blank" href="" title="工夫影业股份有限公司">工夫影业股份有限公司
                                Gongfu Entertainment Co.,Ltd </a></p>


                            <h3>发行公司：</h3>

                            <p><Link to="/mammoth/casts/producer1">五洲电影发行有限公司 Wuzhou Film Distribution</Link></p>

                            <p><a target="_blank" href="" title="万达影业（青岛）有限公司">万达影业（青岛）有限公司
                                Wanda Pictures（Qingdao）Co.,Ltd </a></p>

                            <p><a target="_blank" href="" title="华谊兄弟传媒股份有限公司">华谊兄弟传媒股份有限公司
                                Huayi Brothers Media Group Co.,Ltd</a></p>

                            <p><a target="_blank" href="" title="北京光线影业有限公司">北京光线影业有限公司
                                Beijing Enlight Pictures Co.,Ltd</a></p>

                            <p><a target="_blank" href="" title="华夏电影发行有限责任公司">华夏电影发行有限责任公司
                                Huaxia Film Distribution Co.,Ltd</a></p>

                            <p><a target="_blank" href="" title="北京微影时代科技有限公司">北京微影时代科技有限公司
                                Beijing Weiying Shidai Technology Co.,Ltd</a></p>

                            <p><a target="_blank" href="" title="淘票票">淘票票 Taobao
                                Film</a></p>

                            <p><a target="_blank" href="" title="北京百度网讯科技有限公司">北京百度网讯科技有限公司
                                Baidu.Com</a></p>

                        </div>
                        <div style={{padding:'60 0px'}}>
                            <Marketing/>
                        </div>
                        <div style={{padding:'60 0px'}}>
                            <BoxOfficeInfo/>
                        </div>
                        <div style={{padding:'60 0px'}}>
                            <HeatIndex/>
                        </div>
                        <div style={{padding:'60 0px'}}>
                            <Audience/>
                        </div>
                    </SwipeableViews>
                </div>
            </div>
        );
    }
}


FilmPage.contextTypes = {
    muiTheme: React.PropTypes.object,
}

FilmPage.childContextTypes = {
    muiTheme: React.PropTypes.object,
};

FilmPage.propTypes = {
    //width:PropTypes.number.isRequired,
    //height:PropTypes.number.isRequired,
};

const mapStateToProps = (state) => {
    //const { layoutReducer } = state;
    return {
        //panelVisible:layoutReducer.panelVisible,
    };
};

export default connect(
    mapStateToProps
)(withWidth( )(FilmPage));

