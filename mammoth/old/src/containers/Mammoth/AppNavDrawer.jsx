/* @flow weak */
/* eslint react/prop-types: 0 */

import React from 'react';
//import Relay from 'react-relay';

import Drawer from 'material-ui/Drawer';
import {spacing, typography, zIndex} from 'material-ui/styles';

import NavMenu from './NavMenu.jsx';

const NavMenuTitle = "Home1"

export default class AppNavDrawer extends React.Component
{
    getChildContext( )
    {
        return ( {
            muiTheme: this.context.muiTheme
        } );
    }

    _handle_onTouchTap_Drawer = ( ) =>
    {
        this.context.router.push('/');
        //this.props.onRequestChangeNavDrawer(false);
    }

    render( )
    {
        const {
            location,
            docked,
            onRequestChangeNavDrawer,
            onChangeList,
            open,
            style,
        } = this.props;

        return (
            <Drawer
                width={240}
                style={style}
                docked={docked}
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
                    onTouchTap={ this._handle_onTouchTap_Drawer }
                >
                    <img style={{ height:100, marginTop:-20}} src='/profile_photos/logo3.png' />
                </div>
                <NavMenu
                    value={ location.pathname }
                    onChange={ onChangeList }
                />
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
