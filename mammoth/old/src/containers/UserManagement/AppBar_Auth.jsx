/* @flow weak */
/* eslint react/prop-types: 0 */

import React, { Component, PropTypes } from 'react';

//import Relay from 'react-relay';

import Avatar from 'material-ui/Avatar';
import Dialog from 'material-ui/Dialog';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import IconSocialPerson from 'material-ui/svg-icons/social/person';
import IconSocialPersonOutline from 'material-ui/svg-icons/social/person-outline';
import LinearProgress from 'material-ui/LinearProgress';
import {List, ListItem} from 'material-ui/List';
import Popover from 'material-ui/Popover';
import Subheader from 'material-ui/Subheader';
import TextField from 'material-ui/TextField';
import {white} from 'material-ui/styles/colors';
import { connect } from 'react-redux';

import { registerAuthenticationRequiredCallback } from './RequiresAuthentication.js';

//import {ExtensionsForLogIn, ExtensionsForCreateUser} from '../../../../configuration/webapp/components/AccountManagementExtensions.jsx'
import { postXHR } from '../../utils/XHR';
import scorePassword from './scorePassword';
import {logout} from '../../reducers/auth.js';

const styles = {
  popover: {
    padding: 10,
  },
};


class AppBar_Auth extends Component
{
  constructor( props )
  {
    super( props );

    this.state = {
      User_AccountName: '',
      User_AccountPassword: '',
      Account_information_Supplied: false,
      Dialog_AuthenticationChallenge_IsOpen: false,
      Dialog_AuthenticationInProgress_IsOpen: false,
      Dialog_AuthenticationFailed_IsOpen: false,
      Dialog_CreateUser_IsOpen : false,
      Dialog_CreateUserInProgress_IsOpen: false,
      Dialog_CreateUserFailed_IsOpen: false,
      Dialog_LogOutConfirmation_IsOpen : false,
      Dialog_LogOutInProgress_IsOpen: false,
      Dialog_LogOutFailed_IsOpen: false,
      Popover_AuthorizedUser_IsOpen : false,
    };
  }

  // Handle popping open the login dialog if authentication is required
  componentWillMount( )
  {
    registerAuthenticationRequiredCallback( this._callback_OpenAuthenticationChallenge );
  }

  componentWillUnmount( )
  {
    registerAuthenticationRequiredCallback( null );
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.user && !nextProps.user) {
      //const {success,userName,error} = nextProps.user;
      //
      //if (success) {
      this.setState({
        Dialog_LogOutInProgress_IsOpen: false,
      });
      this.context.router.push('/');
    }
    // if(this.props.user !== nextProps.user){
    //     this.setState({
    //         Dialog_LogOutInProgress_IsOpen: false,
    //     });
    //     // this.context.router.push('/mammoth/reports/经营报告/总览');
    // }
    //else {
    //  this.setState({
    //    Dialog_LogOutInProgress_IsOpen: false,
    //    Dialog_LogOutFailed_IsOpen: true,
    //    Dialog_LogOutFailed_Message: error,
    //  });
    //}
  }

  _callback_OpenAuthenticationChallenge = ( ) =>
  {
    this.setState( {
      User_AccountName: '',
      User_AccountPassword: '',
      Account_information_Supplied: false,
      Dialog_AuthenticationChallenge_IsOpen: true,
      Dialog_AuthenticationInProgress_IsOpen: false,
      Dialog_AuthenticationFailed_IsOpen: false,
      Dialog_CreateUser_IsOpen : false,
      Dialog_CreateUserInProgress_IsOpen: false,
      Dialog_CreateUserFailed_IsOpen: false,
      Dialog_LogOutConfirmation_IsOpen : false,
      Dialog_LogOutInProgress_IsOpen: false,
      Dialog_LogOutFailed_IsOpen: false,
      Popover_AuthorizedUser_IsOpen : false,
    } );
  };

  Dialog_LogOutConfirmation( )
  {
    return(
      <Dialog
        open={ this.state.Dialog_LogOutConfirmation_IsOpen }
        title="Log Out"
        actions={ [
          <FlatButton  label="取消" onTouchTap={ this._handle_onTouchTap_LogOutConfirmation_Cancel } />,
          <FlatButton  label="退出登录" primary={true} onTouchTap={ this._handle_onTouchTap_LogOutConfirmation_LogOut } />,
        ] }
      >
      <List>
        <Subheader>您当前的登录账户为</Subheader>
        <ListItem
          primaryText={ this.props.user.userName }
          leftAvatar={<Avatar src='' />}
        />
      </List>
      <List>
        <Subheader>确定要退出登录?</Subheader>
      </List>
      </Dialog>
    );
  }

  _handle_onTouchTap_LogOutConfirmation_LogOut = ( ) =>
  {
    this.setState( {
      Dialog_LogOutConfirmation_IsOpen: false,
      Dialog_LogOutInProgress_IsOpen: true,
    } );

    this.props.dispatch(logout());
  };

  _handle_onTouchTap_LogOutConfirmation_Cancel = ( ) =>
  {
    this.setState( {
      Dialog_LogOutConfirmation_IsOpen: false
    } );
  };

  Dialog_LogOutInProgress( )
  {
    return(
      <Dialog
        open={ this.state.Dialog_LogOutInProgress_IsOpen }
        title="正在退出登录 ..."
        actions={ [
          <FlatButton label="取消" onTouchTap={ this._handle_onTouchTap_LogOutInProgress_Cancel } />,
        ] }
      >
        <LinearProgress mode="indeterminate" />
      </Dialog>
    );
  }

  _handle_onTouchTap_LogOutInProgress_Cancel = ( ) =>
  {
    this.setState( {
      Dialog_LogOutInProgress_IsOpen: false
    } );
  };
  //

  Dialog_LogOutFailed( )
  {
    return(
      <Dialog
        open={ this.state.Dialog_LogOutFailed_IsOpen }
        title="退出登录失败"
        actions={ [
          <FlatButton  label="OK" primary={true} onTouchTap={ this._handle_onTouchTap_LogOutFailed_OK } />,
        ] }
      >
        <List>
          <Subheader>You are still logged in as</Subheader>
          <ListItem
            primaryText={ this.props.user.userName }
            leftAvatar={<Avatar src='' />}
          />
        </List>
        <List>
          <Subheader>{ this.state.Dialog_LogOutFailed_Message }</Subheader>
        </List>
      </Dialog>
    );
  }

  _handle_onTouchTap_LogOutFailed_OK = ( ) =>
  {
    this.setState( {
      Dialog_LogOutFailed_IsOpen: false
    } );
  };


  Popover_AuthorizedUser( )
  {
    return (
      <Popover
        open={this.state.Popover_AuthorizedUser_IsOpen}
        anchorEl={this.state.anchorEl}
        anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
        targetOrigin={{horizontal: 'left', vertical: 'top'}}
        onRequestClose={this._handle_Popover_AuthorizedUser_Close}
      >
        <div style={styles.popover}>
          <List>
            <Subheader>当前登录用户</Subheader>
            <ListItem
              primaryText={ this.props.user.userName }
              leftAvatar={<Avatar src='' />}
            />
          </List>
          <Divider />
          <List>
            <ListItem primaryText="用户信息" onTouchTap={ this._handle_Popover_AuthorizedUser_Profile } />
            <ListItem primaryText="修改密码" onTouchTap={ this._handle_Popover_AuthorizedUser_ChangePassword } />
          </List>
          <Divider />
          <List>
            <ListItem primaryText="退出登录" onTouchTap={ this._handle_Popover_AuthorizedUser_LogOut } />
          </List>
        </div>
      </Popover>
    );
  }

  _handle_Popover_AuthorizedUser_Profile = ( ) =>
  {
    this.setState( {
      Popover_AuthorizedUser_IsOpen: false,
    } );
    this.context.router.push( '/mammoth/user' );
  };

  _handle_Popover_AuthorizedUser_ChangePassword = ( ) =>
  {
    this.setState( {
      Popover_AuthorizedUser_IsOpen: false,
    } );
    this.context.router.push( '/mammoth/user/updatePassword' );
  };

  _handle_Popover_AuthorizedUser_LogOut = ( ) =>
  {
    this.setState( {
      Popover_AuthorizedUser_IsOpen: false,
      Dialog_LogOutConfirmation_IsOpen: true
    } );
  };

  _handle_Popover_AuthorizedUser_Close = ( ) =>
  {
    this.setState( {
      Popover_AuthorizedUser_IsOpen: false,
    } );
  };


  render( ) {
    return (
        this.props.user?
        <IconButton  tooltip="用户目录" onTouchTap={ this._handle_AuthorizedUserIcon_TouchTap }>
          <IconSocialPerson color={ white }/>
          { this.Popover_AuthorizedUser( ) }
          { this.Dialog_LogOutConfirmation() }
          { this.Dialog_LogOutInProgress() }
          { this.Dialog_LogOutFailed() }
        </IconButton>
            :null
    );
  }

  _handle_AuthorizedUserIcon_TouchTap = ( event ) =>
  {
    this.setState( {
      Popover_AuthorizedUser_IsOpen: true,
      anchorEl: event.currentTarget,
    } );
  };
}

AppBar_Auth.contextTypes = {
  router: React.PropTypes.object.isRequired,
  muiTheme: React.PropTypes.object,
};


AppBar_Auth.propTypes = {
  dispatch:PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const { authReducer } = state;
  return {
    user: authReducer.user
  };
};

export default connect(
    mapStateToProps
)(AppBar_Auth);
