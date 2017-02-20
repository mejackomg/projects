
import React, { Component, PropTypes } from 'react';
//import {Link}  from 'react-router';
import getMuiTheme from '../../../node_modules/material-ui/styles/getMuiTheme';
import ActiveTheme from '../../mui-themes/active-theme.js';
import { connect } from 'react-redux';

import MapPage from './../Map/Map.js'
import SnackPanel from './SnackPanel.jsx'
import MenuBar from './MenuBar.jsx'
import DockBar from './DockBar.jsx'

import {List, ListItem} from 'material-ui/List';;
import ActionGrade from '../../../node_modules/material-ui/svg-icons/action/grade';
import ContentInbox from '../../../node_modules/material-ui/svg-icons/content/inbox';
import ContentDrafts from '../../../node_modules/material-ui/svg-icons/content/drafts';
import ContentSend from '../../../node_modules/material-ui/svg-icons/content/send';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin( );

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      muiTheme: getMuiTheme(
          ActiveTheme,
          {
            userAgent: navigator.userAgent,
            listItem: {
              //fontSize: 4,
              secondaryTextColor:'rgba(250,250,250,.9)',
              //leftIconColor:'rgba(250,250,250,.9)',
            },
            subheader: {
              color: 'rgba(250,250,250,.8)',
              fontWeight: 500
            },
            tableRow: {
              selectedColor:'rgba(0,0,0,.4)',
              textColor:'rgba(250,80,80,1)',
              borderColor: 'rgba(105,105,105,.2)',
              height: 30
            },
            tableHeaderColumn: {
              //textColor: palette.accent3Color,
              height: 38,
              //spacing: 24
            },
            tableRowColumn: {
              height: 32,
              spacing: 4
            },
          }
      ),
    };
  }

  getChildContext( )
  {
    return ( {
      muiTheme: this.state.muiTheme,
    } );
  }

  render() {
    //const { user } = this.props;

    return (
      <div ref='container'>
        {/*<header>
          <h1>React Starterify {version}</h1>
          <Link to="/about">About</Link>
          <Link to="/poweredby">Powered by</Link>
        </header>*/}

        <MenuBar />

        <MapPage style={{position:'absolute',top:0,left:0}}/>

        <SnackPanel open={this.props.panelVisible} />

        <DockBar />
      </div>
    )
  }
}

App.childContextTypes = {
  muiTheme: React.PropTypes.object,
};

App.propTypes = {
  panelVisible: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
  const { layoutReducer } = state;

  return {
    panelVisible:layoutReducer.panelVisible,
  };
};

export default connect(
    mapStateToProps
)(App);