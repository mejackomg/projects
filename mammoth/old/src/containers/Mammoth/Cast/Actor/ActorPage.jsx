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
import ActorCard from './ActorCard.jsx'
import ProductsList from './../ProductsList.jsx'
import CommercialEndorsement from './CommercialEndorsement.jsx'
import BoxOfficeIndex from './BoxOfficeIndex.jsx'
import HeatIndex from './HeatIndex.jsx'
import Audience from './Audience.jsx'

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
            advancedSearch:false,
            nation:'全部',
            year:'全部',
            type:'全部',
            char:'全部'
        };
    }

    handleChange = (value) => {
        this.setState({
            slideIndex: value,
        });
    };

    getChildContext( )
    {
        return ( {
            muiTheme: this.context.muiTheme,
        } );
    }

    getStyles()
    {
        const styles = {
            toolbar: {
                zIndex: this.context.muiTheme.zIndex.appBar,//-1,
                position:'fixed',
                left:0,
                top:this.context.muiTheme.spacing.desktopKeylineIncrement,
                width:'100%'
                //display: 'inline-block',
                //float: 'left',
                //margin: '16px 32px 16px 0',
            },
            tabs: {
                width: 580,
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

    if ( this.props.width === MEDIUM || this.props.width === LARGE )
      styles.content = Object.assign(styles.content, styles.contentWhenMedium);

    return styles;
    }

    handleMouseDown_AdvancedSearch=()=>{
        this.setState({advancedSearch:!this.state.advancedSearch});
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
                                <Tab label="票房号召力" value={2}/>
                                <Tab label="商业代言" value={3}/>
                                <Tab label="热度分析" value={4}/>
                                <Tab label="受众分析" value={5}/>
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

                    <ActorCard />

                    <SwipeableViews
                        index={this.state.slideIndex}
                        onChangeIndex={this.handleChange}
                        //containerStyle={{height:200}}
                        >
                        <div style={{padding:'10 60px'}}>
                            <h3>简介：</h3>

                            <p>黄渤，1974年8月26日生于山东青岛，中国著名男演员，毕业于北京电影学院表演系配音专业。
                                黄渤早年曾有过驻唱歌手、舞蹈教练、影视配音等多种工作经历。2006年因演出新锐导演宁
                                浩执导的电影《疯狂的石头》而一举成名。2009年黄渤凭借在影片《斗牛》中的出色演出夺
                                得第46届台湾电影金马奖最佳男主角奖。从2012年底到2013年4月，由黄渤出演的多部电影
                                连续上映，票房总数达到三十亿，被网友誉为“卅帝”。
                            </p>

                            <h3>获奖记录：</h3>

                            <p>2015-07 第15届华语电影传媒大奖最佳男主角奖[56] 亲爱的 （提名）</p>

                            <p>2015-06 第15届中国电影表演艺术学会金凤凰奖学会奖[57] （获奖）</p>

                            <p>2015-05 第22届北京大学生电影节最佳男演员奖 亲爱的 （提名）</p>

                            <p>2015-02 第34届香港电影金像奖最佳男主角奖[58] 亲爱的 （提名）</p>

                            <p>2014-10 第14届华语电影传媒大奖最受瞩目男演员[59] 西游降魔篇 （获奖）</p>

                            <p>2014-08 第13届华语电影传媒大奖最佳男主角[60] 杀生 （提名）</p>

                            <p>2014-06 第1届温哥华华语电影节最佳男主角[61] 无人区 （获奖）</p>

                            <p>2014-06 第3届丹尼奖最佳男演员[62] 活着 （获奖）</p>

                            <p>2014-03 第5届中国电影导演协会年度男主角 无人区 （提名）</p>

                            <p>2014-03 第33届香港电影金像奖最佳男配角 西游·降魔篇 （提名）</p>

                            <p>2014-02 第8届亚洲电影大奖最佳男配角 无人区 （获奖）</p>

                            <p>2013-12 第1届伦敦国际华语电影节最佳男配角 人再囧途之泰囧 （获奖）</p>

                            <p>2013-10 第50届台湾电影金马奖最佳男配角 西游·降魔篇 （提名）</p>

                            <p>2013-06 第19届上海电视节最佳男演员 民兵葛二蛋 （提名）</p>

                            <p>2013-05 第20届北京大学生电影节最佳男演员 杀生 （获奖）</p>

                            <p>2013-04 第4届壹戏剧大赏年度最佳男主角 活着 （获奖）</p>

                            <p>2013-03 第4届中国电影导演协会年度男演员奖 杀生 （获奖）</p>

                            <p>2010-12 第2届澳门国际电影节最佳男配角 寻找微尘 （提名）</p>

                            <p>2010-10 第30届大众电影百花奖最佳男配角 铁人 （提名）</p>

                            <p>2010-05 第17届北京大学生电影节最佳男主角 斗牛 （获奖）</p>

                            <p>2010-05 第10届华语电影传媒大奖最佳男主角 斗牛 （提名）</p>

                            <p>2010-05 第10届华语电影传媒大奖最具实力男演员 （获奖）</p>

                            <p>2010-02 第4届亚洲电影大奖最佳男主角 斗牛 （提名）</p>

                            <p>2010-00 第1届金榕树大奖最佳演员 斗牛 （获奖）</p>

                            <p>2009-11 第46届台湾电影金马奖最佳男主角 斗牛 （获奖）</p>

                            <p>2009-10 第27届中国电影金鸡奖最佳男配角[63] 铁人 （提名）</p>

                            <p>2009-08 第12届中国电影表演艺术学会金凤凰奖表演学会奖 斗牛 （获奖）</p>

                            <p>2008-08 第29届大众电影百花奖最佳新人奖[64] 疯狂的石头 （提名）</p>

                            <p>2007-05 第7届华语电影传媒大奖最佳男配角 疯狂的石头 （获奖）</p>

                            <p>2007-05 第7届电视电影百合奖观众票选“我最喜爱的十佳演员” 一诺千金 （获奖）</p>

                            <h3>公司：</h3>

                            <p>黄渤工作室 H/B STUDIO，成立时间2011.8</p>
                        </div>
                        <div style={{padding:'10 60px'}}>
                            <ProductsList />
                        </div>
                        <div style={{padding:'60 0px'}}>
                            <BoxOfficeIndex/>
                        </div>
                        <div style={{padding:'60 0px'}}>
                            <CommercialEndorsement/>
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

