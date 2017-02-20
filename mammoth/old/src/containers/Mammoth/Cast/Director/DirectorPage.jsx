import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import SwipeableViews from 'react-swipeable-views';

import ActiveTheme from '../../../../mui-themes/active-theme.js';
import getMuiTheme from '../../../../../node_modules/material-ui/styles/getMuiTheme';
import withWidth, {LARGE, MEDIUM,SMALL}  from '../../../../utils/withWidth';

import Paper from 'material-ui/Paper';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';

import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import {Tabs, Tab} from 'material-ui/Tabs';
import {Card,CardHeader,CardText} from 'material-ui/Card';

import SearchBar from './../SearchBar.jsx'
import DirectorCard from './DirectorCard.jsx'
import ProductsList from './../ProductsList.jsx'

import {
    colors,
    spacing,
    typography
} from 'material-ui/styles';

const filterInfo={
    '年代':['全部','2016','2015','2014','2013','2012','2011','2010','2009','2008','2007','2006','2005','2004','2003','2002','2001'],
    '类型':['全部','动作','悬疑','奇幻','传记','犯罪','惊悚','冒险','剧情','爱情','战争','喜剧','武侠','动画','科幻',
        '恐怖','西部','歌舞','纪录片'],
    '国家':['全部','中国','丹麦','俄罗斯','保加利亚','冰岛','加拿大','印度','台湾','墨西哥','巴西','德国','意大利','新加坡','新西兰',
        '日本','比利时','法国','泰国','澳大利亚','爱尔兰','瑞典','美国','芬兰','英国','荷兰','西班牙','韩国','马来西亚'],
    '字母':['全部','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
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

    handleMouseDown_AdvancedSearch = ()=> {
        this.setState({advancedSearch: !this.state.advancedSearch});
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
                                <Tab label="基本资料" value={0}/>
                                <Tab label="影视作品" value={1}/>
                                <Tab label="商业价值" value={2}/>
                                <Tab label="票房号召力" value={3}/>
                                <Tab label="热度分析" value={4}/>
                            </Tabs>
                        </ToolbarGroup>
                        <ToolbarGroup lastChild={false}>
                            <SearchBar advancedSearch={this.handleMouseDown_AdvancedSearch}/>
                        </ToolbarGroup>
                    </Toolbar>
                </Paper>

                <div style={styles.content}>
                    {
                        this.state.advancedSearch ?
                            <Paper style={{marginBottom:20}}>
                                {/*    <Subheader style={{
                                 textAlign:'center',
                                 background:'linear-gradient(to bottom, rgba(100,100,100,0.4) 0%,rgba(100,100,100,0.2) 70%,rgba(100,100,100,0) 100%)'
                                 }}>
                                 类型
                                 </Subheader>*/}
                                <FlatButton label="类 型"
                                            disabled={true}
                                            style={{borderRadius:0}}
                                            labelStyle={{color:colors.white}}
                                            backgroundColor={this.context.muiTheme.palette.primary1Color}/>
                                {
                                    filterInfo.类型.map((item, key)=>(
                                        <FlatButton key={key} label={item} primary={this.state.type == item}
                                                    labelStyle={{fontSize:this.state.type == item?15:12}}
                                                    onMouseDown={(event)=>(this.setState({type:item}))}
                                            />
                                    ))
                                }
                                <Divider />
                                <FlatButton label="年 代"
                                            disabled={true}
                                            style={{borderRadius:0}}
                                            labelStyle={{color:colors.white}}
                                            backgroundColor={this.context.muiTheme.palette.primary1Color}/>
                                {
                                    filterInfo.年代.map((item, key)=>(
                                        <FlatButton key={key} label={item} primary={this.state.year == item}
                                                    labelStyle={{fontSize:this.state.year == item?15:12}}
                                                    onMouseDown={(event)=>(this.setState({year:item}))}
                                            />
                                    ))
                                }
                                <Divider />
                                <FlatButton label="国 家"
                                            disabled={true}
                                            style={{borderRadius:0}}
                                            labelStyle={{color:colors.white}}
                                            backgroundColor={this.context.muiTheme.palette.primary1Color}/>
                                {
                                    filterInfo.国家.map((item, key)=>(
                                        <FlatButton key={key} label={item} primary={this.state.nation == item}
                                                    labelStyle={{fontSize:this.state.nation == item?15:12}}
                                                    onMouseDown={(event)=>(this.setState({nation:item}))}
                                            />
                                    ))
                                }
                                <Divider />
                                <FlatButton label="字 母"
                                            disabled={true}
                                            style={{borderRadius:0}}
                                            labelStyle={{color:colors.white}}
                                            backgroundColor={this.context.muiTheme.palette.primary1Color}/>
                                {
                                    filterInfo.字母.map((item, key)=>(
                                        <FlatButton key={key} label={item} primary={this.state.char == item}
                                                    labelStyle={{fontSize:this.state.char == item?15:12}}
                                                    onMouseDown={(event)=>(this.setState({char:item}))}
                                            />
                                    ))
                                }
                            </Paper>
                            : null
                    }

                    <DirectorCard/>
                    <SwipeableViews
                        index={this.state.slideIndex}
                        onChangeIndex={this.handleChange}
                        >
                        <div class='jianjie' style={{padding:'10 60px'}}>
                            <h3>简介：</h3>

                            <p>乌尔善，蒙古族，1972年生于内蒙古呼和浩特市。毕业于中央美术学院油画系。
                                现为自由艺术家，知名广告导演，亚洲星引力电影计划首位国内新人电影导演。
                                其广告作品曾多次入选《Archive》、时报华文广告及中国广告节。艺术作品
                                曾多次在国内外参展；其中故事片《肥皂剧》获韩国釜山国际电影节“国际影
                                评人奖”及瑞士日内瓦电影节“最佳导演奖”。其电影处女作《刀见笑》一经上
                                映就引发了国内外观众和影评人的强烈反响。新作《画皮Ⅱ》更是以其严谨的
                                叙事结构，气势磅礴的视觉特效，用完全不同的方式重新诠释了《画皮》这个
                                古老的聊斋故事。
                            </p>

                            <h3>个人经历：</h3>
                            <li>2000年 创建个人工作室“523studio”。他跟一帮朋友完成过装置、短片、行为艺术等纯艺术作品，也参加了许多艺术节活动并获得褒奖。</li>
                            <li>2004年 乌尔善以编剧、导演兼制片人的身份拍摄了90分钟独立电影作品《肥皂剧》获韩国釜山国际电影节“国际影评人奖”，以及瑞士日内瓦国际电影节最佳导演奖。</li>
                            <li>2009年 入选“亚洲星引力计划”首位推出的新人导演。9月24日乌尔善执导的首部商业电影《刀见笑》开机，这是一部先锋武侠喜剧电影，影片的执行监制是好莱坞导演道格·里曼。
                            </li>
                            <li>2011年
                                凭借这部电影在第48届台湾电影金马奖上获得最佳新导演奖，并与张嘉佳、唐缺、马洛杉三人共同获得最佳改编剧本提名，2012年还提名了第12届华语电影传媒大奖最佳新导演。
                            </li>
                            <li>2012年
                                2012年6月28日乌尔善执导的东方魔幻爱情电影《画皮2》上映，最终在中国内地获得7.26亿票房，刷新华语电影12项票房纪录。2013年该片获得第20届北京大学生电影节最佳观赏效果奖，以及2013年美国金预告片奖。
                            </li>
                            <li>2014年
                                2014年8月乌尔善执导奇幻冒险类电影《鬼吹灯之寻龙诀》，该片由陈坤、黄渤、舒淇、夏雨、AB、刘晓庆等主演，影片的制作成本为2.5亿人民币左右，截止到2016年1月，刷新多项华语电影票房纪录，居于华语电影历史票房第二位。
                            </li>
                            <li>2016年 计划执导《封神》系列</li>
                            <h3>获奖记录：</h3>
                            <li>2012 第32届香港电影金像奖最佳两岸华语电影奖[30] 画皮2 （提名）</li>
                            <li>2011 第48届台湾电影金马奖最佳新导演奖[1] 刀见笑 （获奖）</li>
                            <li>2011 第48届台湾电影金马奖最佳改编剧本奖[30] 刀见笑 （提名）</li>
                            <li>2004 第9届釜山国际电影节国际影评人协会奖 肥皂剧 （获奖）</li>
                            <li>2004 第9届釜山国际电影节主竞赛单元- 新浪潮奖[30] 肥皂剧 （提名）</li>
                            <li>2012 第12届华语电影传媒大奖最佳新导演奖[30] 刀见笑 （提名）</li>
                            <li>2004 瑞士日内瓦国际电影节最佳导演奖 肥皂剧 （获奖）</li>
                            <li>2005 台湾时报广告奖 （获奖）</li>
                            <li>2005 美国广告艾菲奖 （获奖）</li>
                            <li>2004 第十一届中国广告节金奖 （获奖）</li>
                            <li>2002 第九届中国广告节金奖 （获奖）</li>
                        </div>
                        <div style={{padding:'10 60px'}}>
                            <ProductsList />
                        </div>

                        <div >
                            商业代言
                        </div>
                        <div >
                            票房号召力
                        </div>
                        <div >
                            热词 热度曲线（正负）
                        </div>
                    </SwipeableViews>
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
    //const { layoutReducer } = state;
    return {
        //panelVisible:layoutReducer.panelVisible,
    };
};

export default connect(
    mapStateToProps
)(withWidth( )(CastPage));

