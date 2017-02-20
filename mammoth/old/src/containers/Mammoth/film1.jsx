import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import ActiveTheme from '../../mui-themes/active-theme.js';
import getMuiTheme from '../../../node_modules/material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationClose from '../../../node_modules/material-ui/svg-icons/navigation/close';
import FlatButton from 'material-ui/FlatButton';
import LeftNav from 'material-ui/Drawer';
import Paper from 'material-ui/Paper';
//import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import RemoveRedEye from '../../../node_modules/material-ui/svg-icons/image/remove-red-eye';
import PersonAdd from '../../../node_modules/material-ui/svg-icons/social/person-add';
import ContentLink from '../../../node_modules/material-ui/svg-icons/content/link';
import Divider from 'material-ui/Divider';
import ContentCopy from '../../../node_modules/material-ui/svg-icons/content/content-copy';
import Download from '../../../node_modules/material-ui/svg-icons/file/file-download';
import Delete from '../../../node_modules/material-ui/svg-icons/action/delete';

import {Tabs, Tab} from 'material-ui/Tabs';

import {Card,CardHeader,CardText} from 'material-ui/Card';

import Chart_Pie from './../Charts/NVD3/Chart_Pie_Temp.jsx'
import Chart_Line from './../Charts/NVD3/Chart_Line_Temp.jsx'
import Chart_Radar from './../Charts/Chart_Radar_Temp.jsx'
import Chart_DiscreteBar from './../Charts/NVD3/Chart_DiscreteBar_Temp.jsx'


class UserInterface extends Component {
    constructor(props) {
        super(props);
        this.state = {
            leftNavOpen: true,
            muiTheme: getMuiTheme(
                ActiveTheme,
                { userAgent: navigator.userAgent }
            ),
        };
    }

    getChildContext( )
    {
        return ( {
            muiTheme: this.state.muiTheme,
        } );
    }

    handle_onRequestChange = ( open ) =>
    {
        this.setState( {
            leftNavOpen: open,
        } );

    };
    handle_onTouchTap_NavigationToggle = ( ) =>
    {
        this.handle_onRequestChange( ! this.state.leftNavOpen );
    };

    render() {

        return (
           <div>
               <LeftNav
                   docked={true}
                   open={ this.state.leftNavOpen }
                   //style={ { marginTop:60} }
                   width={220}
                   zDepth={1}
                   >
                   <AppBar title=""
                        iconElementLeft={
                          <div style={{marginTop:2,marginLeft:10,cursor: 'pointer'}} >
                            <img style={{ height:40, marginLeft:5}} src='logo.png' />
                          </div>}
                       zDepth={0}
                   />
                   <MenuItem primaryText="市场热点" leftIcon={<RemoveRedEye />} />
                   <MenuItem primaryText="票房预测" leftIcon={<RemoveRedEye />} />
                   <MenuItem primaryText="明星热度" leftIcon={<PersonAdd />} />
                   <MenuItem primaryText="观影舆情" leftIcon={<ContentLink />} />
                   <Divider />
                   <MenuItem primaryText="我的关注" leftIcon={<ContentCopy />} />
                   <MenuItem primaryText="个性化设置" leftIcon={<Download />} />
                   <Divider />
                   <MenuItem primaryText="关于产品" leftIcon={<Delete />} />
               </LeftNav>
               <Paper zDepth={2} style={{position:'absolute',left:220,width:window.innerWidth-220}}>
                   <AppBar
                       zDepth={0}
                       title={<span>真智库</span>}
                       iconElementRight={

                            <FlatButton label="Sign in" />

                       }
                       onLeftIconButtonTouchTap={this.handle_onTouchTap_NavigationToggle}
                       >

                   </AppBar>

                       <Tabs >
                           <Tab label="电影" />
                           <Tab label="导演" />
                           <Tab label="演员"/>
                           <Tab label="剧本"/>
                           <Tab label="舆情"/>
                       </Tabs>
               </Paper>
               <Paper style={{position:'absolute',left:230,top:120,width:1030,height:200}}>
                   <div style={{marginLeft: 20 }}>
                       <img style={{width:'auto',height:160,display: 'inline-block',marginBottom:135}} src='/profile_photos/wemon.png' />
                       <Card
                           style={{marginLeft:0,textAlign:'left',width:350, backgroundColor:'transparent',display: 'inline-block'}}
                           zDepth={0}
                           >
                           <CardHeader
                               title="查尔斯夫人"
                               subtitle="导演：大卫.保罗     主演：爱丽丝.简"
                               subtitleStyle={{fontSize:12,fontWeight:300}}
                               //titleStyle={{fontSize:22,fontWeight:700}}
                               titleColor='rgba(0, 80, 200, .6)'
                               subtitleColor='rgba(211, 168, 9, .9)'
                               />
                           <CardText style={{color:'#6C7279',fontSize:12,fontWeight:300}}
                               >
                               <span>上映时间：1992</span>
                               <br/>
                               <span>票房：3000万美元</span>
                               <br/>
                               <span>IMDB：6.2</span>
                               <br/>
                               <br/> <br/>
                               <br/>
                               <br/>
                               <br/>
                               <br/>

                           </CardText>
                       </Card>

                   </div>
                   <Chart_Pie/>
                   <Chart_Radar />
                   <Chart_Line />
                    <Chart_DiscreteBar />
               </Paper>
           </div>
        );
    }
}

const styles = {
    paper: {
        display: 'inline-block',
        float: 'left',
        margin: '16px 32px 16px 0',
    },
    rightIcon: {
        textAlign: 'center',
        lineHeight: '24px',
    },
};

UserInterface.contextTypes = {
    muiTheme: React.PropTypes.object,
}

UserInterface.childContextTypes = {
    muiTheme: React.PropTypes.object,
};

UserInterface.propTypes = {
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
)(UserInterface);

