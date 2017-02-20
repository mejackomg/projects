import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import SwipeableViews from 'react-swipeable-views';

import ActiveTheme from '../../../mui-themes/active-theme.js';
import getMuiTheme from '../../../../node_modules/material-ui/styles/getMuiTheme';
import withWidth, {LARGE, MEDIUM,SMALL}  from '../../../utils/withWidth';

import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import {Tabs, Tab} from 'material-ui/Tabs';
import Title from 'react-title-component';
import {
    colors,
    spacing,
    typography
} from 'material-ui/styles';

import BoxOfficeMarket from './BoxOfficeMarket.jsx'
import ActorCard from '../Cast/Actor/ActorCard.jsx'
import Preference from './Preference.jsx'
import FilmsList from './FilmsList.jsx'
import ActorsRank from './ActorsRank.jsx'

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            slideIndex: 0,
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

        if (this.props.width === MEDIUM || this.props.width === LARGE)
            styles.content = Object.assign(styles.content, styles.contentWhenMedium);

        return styles;
    }

    render() {
        const styles = this.getStyles()

        return (
            <div style={styles.content}>
                <Title render={(previousTitle) => `Home - ${previousTitle}`}/>
                {/*<Subheader style={{fontSize:20,color:colors.darkBlack}}>票房评估</Subheader>
                <Divider/>*/}
                <Toolbar>
                    <ToolbarGroup>
                        <ToolbarTitle text="票房评估"/>
                    </ToolbarGroup>
                </Toolbar>
                <FilmsList width={this.props.width}/>

                <Toolbar style={{marginTop:50}}>
                    <ToolbarGroup>
                        <ToolbarTitle text="票房大盘"/>
                    </ToolbarGroup>
                </Toolbar>
                <BoxOfficeMarket />

                <Toolbar style={{marginTop:50}}>
                    <ToolbarGroup>
                        <ToolbarTitle text="明星热力榜"/>
                    </ToolbarGroup>
                </Toolbar>
                <ActorsRank catalogue='actor'/>
            </div>
        );
    }
}


HomePage.contextTypes = {
    muiTheme: React.PropTypes.object,
}

HomePage.childContextTypes = {
    muiTheme: React.PropTypes.object,
};

HomePage.propTypes = {
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
)(withWidth( )(HomePage));

