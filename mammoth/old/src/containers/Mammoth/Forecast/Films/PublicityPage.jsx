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
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import {Tabs, Tab} from 'material-ui/Tabs';
import {
    colors,
    spacing,
    typography
} from 'material-ui/styles';

import UpcomingFilm from './FilmInfoSet.jsx'
import Marketing from './Marketing.jsx'

class XuanfaPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            slideIndex: 0,
        };
    }

    getChildContext( )
    {
        return ( {
            muiTheme: this.context.muiTheme,
        } );
    }

    handleChange = (value) => {
        this.setState({
            slideIndex: value,
        });
    };

    getStyles()
    {
        const styles = {
            paper:{
                position: 'fixed',
                top:0,
                width:'100%',
                zIndex: this.context.muiTheme.zIndex.appBar-1,
                height:this.context.muiTheme.spacing.desktopKeylineIncrement
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

    if ( this.props.width === MEDIUM || this.props.width === LARGE )
      styles.content = Object.assign(styles.content, styles.contentWhenMedium);

    return styles;
    }

    render() {
        const styles = this.getStyles()

    return (
            <div style={styles.content}>
                <div style={{padding:'10 30px'}}>
                    <UpcomingFilm  catalogue='history'/>
                </div>
                <div style={{paddingBottom:60}}>
                    <Marketing />
                </div>
            </div>
        );
    }
}


XuanfaPage.contextTypes = {
    muiTheme: React.PropTypes.object,
}

XuanfaPage.childContextTypes = {
    muiTheme: React.PropTypes.object,
};

XuanfaPage.propTypes = {
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
)(withWidth( )(XuanfaPage));

