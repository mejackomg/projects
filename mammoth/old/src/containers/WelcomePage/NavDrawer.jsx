/* @flow weak */
/* eslint react/prop-types: 0 */

import React from 'react';
//import Relay from 'react-relay';

import Drawer from 'material-ui/Drawer';
import {spacing, typography, zIndex} from 'material-ui/styles';
import {List, ListItem, MakeSelectable} from 'material-ui/List';


export default class AppNavDrawer extends React.Component
{
  constructor( props )
  {
    super( props );

    this.state = {
    };
  }

  getChildContext( )
  {
    return ( {
      muiTheme: this.context.muiTheme
    } );
  }

  _handle_onTouchTap_Drawer = ( ) =>
  {
    this.context.router.push('/');
    this._handle_RequestChangeNavDrawer(false);
  }

  render( )
  {
    const {
        onRequestChangeNavDrawer,
        open,
        } = this.props;

    return (
      <Drawer
          width={240}
        docked={false}
        open={open}
        onRequestChange={onRequestChangeNavDrawer}
        //containerStyle={{zIndex: zIndex.navDrawer - 100}}
      >
        <div
          style={ {
            cursor: 'pointer',
            fontSize: 24,
            color: typography.textFullWhite,
            lineHeight: spacing.desktopKeylineIncrement,
            fontWeight: typography.fontWeightLight,
            backgroundColor: this.context.muiTheme.palette.primary1Color,
            paddingLeft: spacing.desktopGutter,
            marginBottom: 8,
            height:spacing.desktopKeylineIncrement//64
          } }
           //onTouchTap={ this._handle_onTouchTap_Drawer }
        >
            <img style={{height:18, marginTop:23}} src='/profile_photos/logo1.png' />
        </div>

        <List>
          <ListItem style={{paddingLeft:20}} primaryText="票房评估" value="/mammoth/forecast"/>
          <ListItem style={{paddingLeft:20}} primaryText="宣发" value="/mammoth/forecast/publicity"/>
          <ListItem style={{paddingLeft:20}} primaryText="口碑" value="/mammoth/forecast/reputation"/>
          <ListItem style={{paddingLeft:20}} primaryText="排片" value="/mammoth/forecast/rowPiece"/>
        </List>
      </Drawer>
    );
  }
}

AppNavDrawer.contextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
  router: React.PropTypes.object.isRequired
};

AppNavDrawer.childContextTypes = {
  muiTheme: React.PropTypes.object,
};

//export default Relay.createContainer( AppNavDrawer, {
//  fragments: {
//    Viewer: () => Relay.QL`
//      fragment on Viewer {
//        ${ NavMenu.getFragment( 'Viewer' ) },
//      }
//    `,
//  },
//} )
