
import Helmet from "react-helmet";
import React from 'react';

import AppCanvas from 'material-ui/internal/AppCanvas';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import IconButton from 'material-ui/IconButton';
import LeftNav from 'material-ui/Drawer';
import {List,ListItem,MakeSelectable} from 'material-ui/List';
//import MenuItem from 'material-ui/menus/menu-item';
import FlatButton from 'material-ui/FlatButton';
import AppBar from 'material-ui/AppBar';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';

import ActionList from 'material-ui/svg-icons/navigation/menu';

import ChromeHelmet from '../../components/ChromeHelmet.jsx';

import withWidth, {LARGE, MEDIUM,SMALL}  from 'material-ui/utils/withWidth';

//import AppBar_Auth from '../../units/user-management/webapp/components/AppBar_Auth.jsx';
//import AppBar_Language from './AppBar_Language.jsx';
import ActiveTheme from '../../mui-themes/active-theme.js';
import Footer from '../../components/Footer.jsx'
import NavDrawer from './NavDrawer.jsx'

import {
  colors,
  spacing,
    typography
} from 'material-ui/styles';

let pictureHeight = 580;

let pictureURL1="/profile_photos/appbar_background_bottom.png";

class Chrome extends React.Component
{
  constructor( props )
  {
    super( props );

    this.state = {
      isFixedToTop: true,
      navDrawerOpen: false,
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

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }
  componentWillUnmount() {
    this.setState({
      muiTheme: this.state.muiTheme,
    });

    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    const scrollTop = (window.pageYOffset !== undefined)
      ? window.pageYOffset
      : (document.documentElement || document.body.parentNode || document.body).scrollTop;

    const isFixedToTop = scrollTop < (window.innerHeight>pictureHeight?window.innerHeight:pictureHeight) - 66;

    if (isFixedToTop !== this.state.isFixedToTop) {
      this.setState({ isFixedToTop:isFixedToTop });
    }
  };

  _handle_RequestChangeNavDrawer = (open) => {
    this.setState( {
      navDrawerOpen: open,
    } );
  };

  _handle_onTouchTap_NavigationToggle = ( ) =>
  {
    //this._handle_RequestChangeNavDrawer( ! this.state.navDrawerOpen );
  };


  render( ) {

    // TODO Temporary example how to modify the menu depending on whether the user has logged in or not.
    // Later integrate with example of requesting login and
    // https://github.com/codefoundries/isomorphic-material-relay-starter-kit/issues/36
    let systemMenuContents = [
      <ListItem primaryText="Home" value="/"/>,
    ];

    //if( ! this.props.Viewer.User_IsAnonymous )
    //  systemMenuContents.push( <ListItem primaryText="User Profile" value="/User" /> );

    //var backgroundURL = "http://app.itsquiz.com/be/static/images/backgrounds/55e4628dfee9bf6e141320c41456953497073.png";
    //const appBarStyle = {
    //  background: `url(${backgroundURL}) center / cover`,
    //  height: 300,
    //  width: 100,
    //  //background-color: @primary-1-color;
    //  position: "absolute",
    //  top: 0,
    //};

    let isShown_MenuButton = false;
    switch (this.props.width) {
      case SMALL:
        isShown_MenuButton = true;
        break;
      default :
        break;
    }

    return (
        <AppCanvas>
          <ChromeHelmet />

          <AppBar
              //title={<span style={styles.title}>Title</span>}
              iconElementLeft={
                <div>
                </div>
              }
              iconElementRight={
                !isShown_MenuButton?
                  <div style={{marginTop:5}}>
                    {/*<FlatButton label="解决方案" labelStyle={{color:colors.white}}/>*/}
                    {/*<FlatButton label="联系我们" labelStyle={{color:colors.white}}/>*/}
                    {/*<FlatButton label="关于" labelStyle={{color:colors.white}}/>*/}
                  </div>
                  :
                  <IconMenu
                    iconButtonElement={
                      <IconButton onTouchTap={ this._handle_onTouchTap_NavigationToggle }><ActionList color={colors.white}/></IconButton>
                    }
                    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                    targetOrigin={{horizontal: 'right', vertical: 'top'}}
                  >
                    {/*<MenuItem primaryText="首页" />*/}
                    {/*<MenuItem primaryText="解决方案" />*/}
                    {/*<MenuItem primaryText="联系我们" />*/}
                    {/*<MenuItem primaryText="关于" />*/}
                  </IconMenu>
              }
              zDepth={this.state.isFixedToTop?0:2}
              style={{
                display:'none',
                //backgroundColor:'transparent',
                //background: this.state.isFixedToTop?'':`url(${pictureURL1}) center / cover`,
                //boxShadow:this.state.isFixedToTop?null:'0 1px 6px rgba(0,0,0,0.12), 0 1px 4px rgba(0,0,0,0.12)'
                backgroundColor:this.state.isFixedToTop?'transparent':this.state.muiTheme.palette.primary1Color,
              }}
          />

          <NavDrawer
              onRequestChangeNavDrawer={this._handle_RequestChangeNavDrawer}
              open={this.state.navDrawerOpen}
              />

          <div style={{ paddingTop: window.innerHeight}}>
            {this.props.children}
          </div>

          <Footer
              isHomePage={true}
              width={ this.props.width }
              fullWidth={true}
              />

        </AppCanvas>
    )
  }
}

//

Chrome.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

Chrome.childContextTypes = {
  muiTheme: React.PropTypes.object,
};

const styles = {
  title: {
    cursor: 'pointer',
    fontSize: 20,
    textAlign:'center',
    color: typography.fullWhite,
    lineHeight: `${spacing.desktopKeylineIncrement}px`,
    fontWeight: typography.fontWeightLight,
    //backgroundColor: colors.cyan500,
    background: `url(${pictureURL1}) bottom / cover`,
    //paddingLeft: Spacing.desktopGutter,
    marginBottom: 8,
  }
};
export default withWidth( )(Chrome)
