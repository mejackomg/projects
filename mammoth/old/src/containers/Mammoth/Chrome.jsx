
import React from 'react';
//import Relay from 'react-relay';
import { connect } from 'react-redux';

import AppBar from 'material-ui/AppBar';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import withWidth, {LARGE, MEDIUM}  from '../../utils/withWidth';

import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import AppNavDrawer from './AppNavDrawer.jsx';
import ChromeHelmet from '../../components/ChromeHelmet.jsx';
import ChromeRightIcon from '../UserManagement/AppBar_Auth.jsx';
import Footer from '../../components/Footer.jsx';
import muiTheme from '../../mui-themes/active-theme.js';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import Title from 'react-title-component';

import ActionList from 'material-ui/svg-icons/navigation/menu';

import SearchBox from './SearchBox.jsx'
import {
    colors,
    spacing,
    typography
} from 'material-ui/styles';
import {setPanelVisible} from '../../actions/layout'

export const MainScreenTitle = "Mammoth";// — Smart Analytics System"

class Chrome extends React.Component
{
    constructor( props )
    {
        super( props );

        this.state = {
            navDrawerOpen: localStorage.getItem('navDrawerOpen')?(localStorage.getItem('navDrawerOpen')==='true'):true,
        };

        this.muiTheme = getMuiTheme(
            muiTheme,
            { userAgent: navigator.userAgent }
        )
    }

    getChildContext( )
    {
        return ( {
            muiTheme: this.muiTheme
        } );
    }

    _handle_onTouchTap_NavigationToggle = ( ) =>
    {
        this._handle_RequestChangeNavDrawer( ! this.state.navDrawerOpen );
    };

    _handle_RequestChangeNavDrawer = (open) => {
        this.setState({
            navDrawerOpen: open,
        });
        localStorage.setItem('navDrawerOpen', open);

        this.props.dispatch(setPanelVisible(open));

    };

    _handle_onChangeList_AppNavDrawer = (event, value) => {
        // console.log(value)
        this.context.router.push(value);
        if (this.props.width != LARGE) {
            this.setState({
                navDrawerOpen: false,
            });
            localStorage.setItem('navDrawerOpen', false);
        }
    }

    getStyles()
    {
        const styles = {
            paper:{
                position: 'fixed',
                width:'100%',
                zIndex: this.muiTheme.zIndex.appBar,
                height:this.muiTheme.spacing.desktopKeylineIncrement
            },
            appBar: {
                //position: 'fixed',
                width:'100%',
                //zIndex: this.muiTheme.zIndex.appBar,
                //top: 0,
                backgroundColor:this.muiTheme.palette.primary1Color,
                lineHeight: this.muiTheme.spacing.desktopKeylineIncrement,
                fontWeight: typography.fontWeightLight,
                height:'100%',//this.muiTheme.spacing.desktopKeylineIncrement,//64,
                fontSize: 24,
                paddingLeft : 10,
                paddingTop:8
            },
            content: {
                //margin: spacing.desktopGutter,
                paddingTop: this.muiTheme.spacing.desktopKeylineIncrement,//+this.muiTheme.spacing.desktopSubheaderHeight,
                minHeight: 400,
                //backgroundColor:'#f4f4f4'
            },
            //contentWhenMedium: {
            //margin: `${spacing.desktopGutter * 2}px ${spacing.desktopGutter * 3}px`,
            //},
        };

        //if ( this.props.width === MEDIUM || this.props.width === LARGE )
        //  styles.content = Object.assign(styles.content, styles.contentWhenMedium);

        return styles;
    }

    render( )
    {
        const styles = this.getStyles( )

        let {
            navDrawerOpen,
        } = this.state

        const {
            prepareStyles,
        } = this.muiTheme

        let docked = false
        let showMenuIconButton = true

        if( this.props.width === LARGE )
        {
            docked = true
            //navDrawerOpen = true
            showMenuIconButton = false

            //styles.navDrawer = {
            //  zIndex: styles.appBar.zIndex - 1,
            //}
            if(navDrawerOpen){
                styles.appBar.paddingLeft = 250
                styles.content.paddingLeft = 240
            }
        }

        return (
            <div>
                <Title render="MammothGo" />
                <ChromeHelmet />

                <Paper style={styles.paper} zDepth={0}>
                    <Toolbar
                        style={styles.appBar}
                    >
                        <ToolbarGroup firstChild={false}>
                            {
                                //showMenuIconButton &&
                                <IconButton onTouchTap={ this._handle_onTouchTap_NavigationToggle }><ActionList color={colors.white}/></IconButton>
                            }
                            <ToolbarTitle text={MainScreenTitle}
                                          style={{
                                              color:colors.white,
                                              fontSize:24,
                                              fontWeight:400,
                                              marginTop:-4,
                                              marginLeft:5
                                          }}/>
                        </ToolbarGroup>
                        {/*<ToolbarGroup>
                         <IconButton tooltip="高级搜索">
                         <FontIcon className="material-icons" color={colors.white}>search</FontIcon>
                         </ IconButton>
                         <SearchBox />
                         </ToolbarGroup>*/}
                        <ToolbarGroup lastChild={false}>
                            <ChromeRightIcon User_IsAnonymous={true} />
                        </ToolbarGroup>
                    </Toolbar>
                </Paper>

                <div style={prepareStyles(styles.content)}>
                    { this.props.children }
                </div>
                <AppNavDrawer
                    //style={styles.navDrawer}
                    location={location}
                    docked={docked}
                    onRequestChangeNavDrawer={this._handle_RequestChangeNavDrawer}
                    onChangeList={ this._handle_onChangeList_AppNavDrawer }
                    open={navDrawerOpen}
                />
                <Footer
                    fullWidth={!navDrawerOpen||!docked}
                    width={ this.props.width }
                />
            </div>
        )
    }
}

Chrome.propTypes = {
    dispatch:React.PropTypes.func.isRequired,

};

Chrome.contextTypes = {
    router: React.PropTypes.object.isRequired,
};

Chrome.childContextTypes = {
    muiTheme: React.PropTypes.object,
};
const mapStateToProps = (state) => {
    //const { layoutReducer } = state;

    return {
        //panelVisible:layoutReducer.panelVisible,
    };
};
export default connect(
    mapStateToProps
)( withWidth( )(Chrome));
//

// It is important to retrieve User_Token2, since it is used in client.js
//export default Relay.createContainer( withWidth( )( Chrome ), {
////export default Relay.createContainer( Chrome, {
//  fragments: {
//    Viewer: () => Relay.QL`
//      fragment on Viewer {
//        User_IsAnonymous,
//        User_Token2,
//        ${ ChromeRightIcon.getFragment( 'Viewer' ) },
//        ${ AppNavDrawer.getFragment( 'Viewer' ) },
//        ${ Footer.getFragment( 'Viewer' ) },
//      }
//    `,
//  },
//});
