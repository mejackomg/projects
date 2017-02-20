import React, { Component, PropTypes } from 'react';

import Paper from 'material-ui/Paper';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import {Tabs, Tab} from 'material-ui/Tabs';
import withWidth, {LARGE, MEDIUM,SMALL}  from '../../../utils/withWidth';

class TabsControl extends Component {
    constructor(props) {
        super(props);
    }

    getStyles()
    {
        const styles = {
            paper: {
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
            }
        };

        return styles;
    }

    render() {
        const styles = this.getStyles( )

        if (this.props.width == LARGE) {
            styles.paper.left = 240;
            styles.paper.width = 'calc(100% - 240px)'
        }
        else{
            styles.paper.left = 0
            styles.paper.width = '100%'
        }

        return (
           <Paper style={styles.paper} zDepth={1}>
               <Toolbar
                    style={{
                    backgroundColor:this.context.muiTheme.palette.alternateTextColor,
                    height:this.context.muiTheme.palette.desktopSubheaderHeight}}
                   >
                   <ToolbarGroup firstChild={true} style={{width:210}}/>
                   <ToolbarGroup>
                       <Tabs  tabItemContainerStyle={styles.tabs}>
                           <Tab label="正在热映" />
                           <Tab label="即将上映"/>
                           <Tab label="影片库" />
                       </Tabs>
                   </ToolbarGroup>
                   <ToolbarGroup lastChild={false} >
                       {this.props.children}
                   </ToolbarGroup>
               </Toolbar>
           </Paper>
        );
    }
}


TabsControl.contextTypes = {
    muiTheme: React.PropTypes.object,
}


TabsControl.propTypes = {
    //width:PropTypes.number.isRequired,
    //height:PropTypes.number.isRequired,
};

export default withWidth( )(TabsControl);

