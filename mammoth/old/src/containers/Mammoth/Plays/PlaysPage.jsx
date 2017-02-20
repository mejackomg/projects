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

import SearchBar from './SearchBar.jsx'

import {
    colors,
    spacing,
    typography
} from 'material-ui/styles';


class PlaysPage extends Component {
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
                               <Tab label="潜在剧本" value={0}/>
                               <Tab label="剧本评估" value={1}/>
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
                       <div>

                       </div>
                       <div>

                       </div>
                   </SwipeableViews>
               </div>
           </div>
        );
    }
}


PlaysPage.contextTypes = {
    muiTheme: React.PropTypes.object,
}

PlaysPage.childContextTypes = {
    muiTheme: React.PropTypes.object,
};

PlaysPage.propTypes = {
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
)(withWidth( )(PlaysPage));

