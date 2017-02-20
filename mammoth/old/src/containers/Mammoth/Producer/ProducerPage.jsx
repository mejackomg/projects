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

import SearchBar from '../Cast/SearchBar.jsx'
import ProductsList from '../Cast/ProductsList.jsx'

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

class ProducerPage extends Component {
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
                               <Tab label="基本资料" value={0}/>
                               <Tab label="影视作品" value={1}/>
                               <Tab label="票房号召力" value={3} />
                           </Tabs>
                       </ToolbarGroup>
                       <ToolbarGroup lastChild={false} >
                           <SearchBar advancedSearch={this.handleMouseDown_AdvancedSearch}/>
                       </ToolbarGroup>
                   </Toolbar>
               </Paper>

               <div style={styles.content}>
                   <SwipeableViews
                       index={this.state.slideIndex}
                       onChangeIndex={this.handleChange}
                       >
                       <div style={{padding:'10 60px'}}>
                           <h3>简介：</h3>
                           <p>万达影视传媒有限公司成立于2011年，是隶属于大连万达集团北京文化产业集团有限公司的全资子公司。
                               万达影视集电影、电视剧的开发、投资、制作、宣传、营销、发行等多方位影视功能为一体，并致力于
                               海外影视业务的发展。 万达影视自成立以来，就秉承打造精品项目的理念，为观众呈上了众多优质的
                               影视作品。同时，万达影视也与业内众多知名导演、编剧、监制、演员及多个影视工作室建立了良好的
                               合作关系。随着中国影视行业的高速发展，万达影视力求取得票房、口碑、品牌积累、人才储备的多赢
                               局面。 万达影视传媒有限公司将致力于影视作品的开发、制作、宣传与发行,并将建立具有发行与营销
                               全方位功能的推广渠道网络，同时以全新的市场理念和品牌理念，打造优质的电影、电视剧项目，力争
                               发展成为最具影响力的中国影视公司。</p>
                           <h3>联系方式：</h3>
                           <p>地址：北京市朝阳区建国路93号万达广场12号楼20层</p>
                           <p>电话：</p>
                           <p>邮箱：</p>
                       </div>
                       <div>
                           <ProductsList />
                       </div>
                   </SwipeableViews>
               </div>
           </div>
        );
    }
}


ProducerPage.contextTypes = {
    muiTheme: React.PropTypes.object,
}

ProducerPage.childContextTypes = {
    muiTheme: React.PropTypes.object,
};

ProducerPage.propTypes = {
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
)(withWidth( )(ProducerPage));

