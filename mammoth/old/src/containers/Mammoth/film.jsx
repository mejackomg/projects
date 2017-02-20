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

import Chart1 from '../Charts/Highcharts/Chart1.js';
import Chart2 from '../Charts/Highcharts/Chart2.js';

class UserInterface extends Component {
    constructor(props) {
        super(props);
        this.state = {
            leftNavOpen: true,

        };
    }

    getChildContext( )
    {
        return ( {
            muiTheme: this.context.muiTheme,
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
               <Paper style={{marginTop:60,height:240,marginBottom:20}}>
                   <div style={{marginLeft: 20 }}>
                       <img style={{width:'auto',height:180,display: 'inline-block',marginBottom:125}} src='/profile_photos/wemon.png' />
                       <Card
                           style={{paddingTop:20,marginLeft:0,textAlign:'left',width:350, backgroundColor:'transparent',display: 'inline-block'}}
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
               </Paper>
                   <Chart_Pie/>

               <Chart1 />
               <Chart2 />

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

