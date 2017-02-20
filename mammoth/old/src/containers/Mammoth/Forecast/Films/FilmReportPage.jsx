import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import SwipeableViews from 'react-swipeable-views';
import IconButton from 'material-ui/IconButton';
import ActiveTheme from '../../../../mui-themes/active-theme.js';
import getMuiTheme from '../../../../../node_modules/material-ui/styles/getMuiTheme';
import withWidth, {LARGE, MEDIUM,SMALL}  from '../../../../utils/withWidth';
import ArrowBack from '../../../../../node_modules/material-ui/svg-icons/navigation/arrow-back';
import Paper from 'material-ui/Paper';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import {Link} from 'react-router';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Description from '../../../../../node_modules/material-ui/svg-icons/action/description';

import FilmCard from './FilmCard.jsx'
import Marketing from './Marketing.jsx'
import HeatIndex from './HeatIndex.jsx'
import Forecast from './Forecast.jsx'

import {
    colors,
    spacing,
    typography
} from 'material-ui/styles';


class XuanfaPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            slideIndex: 0,
            loading:'loading'
        };
    }

    getChildContext() {
        return ( {
            muiTheme: this.context.muiTheme,
        } );
    }

    handleChange = (value) => {
        this.setState({
            slideIndex: value,
        });
    };

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
            floatingButton: {
                position: 'absolute',
                right: 45,
                top: 20
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
        const styles = this.getStyles();

        if (this.props.width == LARGE) {
            styles.toolbar.left = 240;
            styles.toolbar.width = 'calc(100% - 240px)'
        }
        else {
            styles.toolbar.left = 0
            styles.toolbar.width = '100%'
        }

        var {loading} = this.state;

        return (
            <div>
                <Paper style={styles.toolbar} zDepth={1}>
                    <Toolbar
                        style={{
                            backgroundColor:this.context.muiTheme.palette.alternateTextColor,
                            height:this.context.muiTheme.palette.desktopSubheaderHeight}}
                        >
                        <ToolbarGroup firstChild={true}>
                            <IconButton containerElement={<Link to="/mammoth/forecast" />}><ArrowBack
                                color="gray"/></IconButton>
                            <FlatButton label="影片评估报告" disabled={true} style={{marginLeft:-10,height:28,lineHeight:1}}
                                        labelStyle={{fontSize:17}}/>
                        </ToolbarGroup>
                    </Toolbar>
                    <FloatingActionButton secondary={true} style={styles.floatingButton}>
                        <Description />
                    </FloatingActionButton>
                </Paper>

                <div style={styles.content}>
                    <FilmCard />
                    <Forecast />
                    <Marketing />
                    <HeatIndex/>
                    <div style={{marginTop:60,height:200}}>
                        <Toolbar>
                            <ToolbarGroup>
                                <ToolbarTitle text="排片分析"/>
                            </ToolbarGroup>
                        </Toolbar>
                    </div>
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

