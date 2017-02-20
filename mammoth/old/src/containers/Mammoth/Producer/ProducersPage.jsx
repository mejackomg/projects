import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import SwipeableViews from 'react-swipeable-views';

import ActiveTheme from '../../../mui-themes/active-theme.js';
import getMuiTheme from '../../../../node_modules/material-ui/styles/getMuiTheme';
import withWidth, {LARGE, MEDIUM,SMALL}  from 'material-ui/utils/withWidth';

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
import {Link} from 'react-router';

import SearchBar from '../Cast/SearchBar.jsx'
import FilmsList from '../Cast/CastsList.jsx'

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

    if ( this.props.width === MEDIUM || this.props.width === LARGE )
      styles.content = Object.assign(styles.content, styles.contentWhenMedium);

    return styles;
    }

    handleMouseDown_AdvancedSearch=()=>{
        this.setState({advancedSearch:!this.state.advancedSearch});
    }


    render() {
        const styles = this.getStyles( )

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
                               <Tab label="宣传" value={0}/>
                               <Tab label="发行" value={1}/>
                               <Tab label="出品" value={2} />
                           </Tabs>
                       </ToolbarGroup>
                       <ToolbarGroup lastChild={false} >
                           <SearchBar advancedSearch={this.handleMouseDown_AdvancedSearch}/>
                       </ToolbarGroup>
                   </Toolbar>
               </Paper>

               <div style={styles.content}>
                   {
                       this.state.advancedSearch?
                       <Paper  style={{marginBottom:20}}>
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
                                       backgroundColor={this.context.muiTheme.palette.primary1Color} />
                           {
                               filterInfo.类型.map((item,key)=>(
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
                                       backgroundColor={this.context.muiTheme.palette.primary1Color} />
                           {
                               filterInfo.年代.map((item,key)=>(
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
                                       backgroundColor={this.context.muiTheme.palette.primary1Color} />
                           {
                               filterInfo.国家.map((item,key)=>(
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
                                       backgroundColor={this.context.muiTheme.palette.primary1Color} />
                           {
                               filterInfo.字母.map((item,key)=>(
                                   <FlatButton key={key} label={item} primary={this.state.char == item}
                                               labelStyle={{fontSize:this.state.char == item?15:12}}
                                               onMouseDown={(event)=>(this.setState({char:item}))}
                                   />
                               ))
                           }
                       </Paper>
                       : null
                   }

                   <SwipeableViews
                       index={this.state.slideIndex}
                       onChangeIndex={this.handleChange}
                       >
                       <div>
                           <GridTile
                               actionPosition='left'
                               titlePosition='top'
                               titleBackground="linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
                               style={{margin:10,width:260,height:180,display: 'inline-block',textAlign:'left'}}
                               //key={cast.name}
                               title='万达影视传媒有限公司'
                               //containerElement={<Link to="/mammoth/producer" />}
                               //subtitle='Wuzhou Film Distribution'
                               actionIcon={<IconButton  containerElement={<Link to="/mammoth/producers/producer" />} linkButton={true} ><StarBorder color="white" /></IconButton>}
                               >
                               <img src='http://pic.entgroup.cn/company/logo/20151216155642724.jpg' />
                           </GridTile>
                       </div>
                       <div>
                           <GridTile
                               actionPosition='left'
                               titlePosition='top'
                               titleBackground="linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
                               style={{margin:10,width:260,height:180,display: 'inline-block',textAlign:'left'}}
                               //key={cast.name}
                               title='五洲电影发行有限公司'
                               //containerElement={<Link to="/mammoth/producer1" />}
                               //subtitle='Wuzhou Film Distribution'
                               actionIcon={<IconButton  containerElement={<Link to="/mammoth/producer/producer1" />} linkButton={true} ><StarBorder color="white" /></IconButton>}
                               >
                               <img src='http://pic.entgroup.cn/company/logo/2015121617419809.jpg' />
                           </GridTile>
                       </div>
                       <div>
                           <GridTile
                               actionPosition='left'
                               titlePosition='top'
                               titleBackground="linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
                               style={{margin:10,width:260,height:180,display: 'inline-block',textAlign:'left'}}
                               //key={cast.name}
                               title='万达影视传媒有限公司'
                               //containerElement={<Link to="/mammoth/producer" />}
                               //subtitle='Wuzhou Film Distribution'
                               actionIcon={<IconButton  containerElement={<Link to="/mammoth/casts/producer" />} linkButton={true} ><StarBorder color="white" /></IconButton>}
                               >
                               <img src='http://pic.entgroup.cn/company/logo/20151216155642724.jpg' />
                           </GridTile>
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

