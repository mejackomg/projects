/* @flow weak */
/* eslint react/prop-types: 0 */

import React from 'react';
//import Relay from 'react-relay';

import {Card, CardHeader, CardText} from 'material-ui/Card';
import LinearProgress from 'material-ui/LinearProgress';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import TextField from 'material-ui/TextField';
import { connect } from 'react-redux';

import withWidth, {LARGE, MEDIUM,SMALL}  from '../../utils/withWidth';
import { RequiresAuthenticationNotice } from './RequiresAuthentication.js';
import scorePassword from './scorePassword';
import {updatePwd} from '../../reducers/auth.js';

//import Viewer_updatePasswordMutation from '../../relay/Viewer_updatePasswordMutation';


class User_Properties extends React.Component {
  //static contextTypes = {
  //  relay: Relay.PropTypes.Environment,
  //};

  constructor(props) {
    super(props);

    this.state = {
      User_AccountPassword_Current: "",
      User_AccountPassword_CurrentError: "",
      User_AccountPassword: "",
      User_AccountPasswordError: "",//请输入密码
      User_AccountPasswordConfirmation: "",
      User_AccountPasswordConfirmationError: "",//确认密码
      User_AccountPasswordStrength: 0,
      SnackbarOpen: false,
      SnackbarMessage: "",
      //isUpdate:true
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user) {
      const {success,userName,error} = nextProps.user;

      this.setState({
        SnackbarOpen: true,
        SnackbarMessage: success ? "密码修改成功" : "密码修改失败: " + error,
        // User_AccountPassword_Current: "",
        // User_AccountPassword_CurrentError: "请输入密码",
        // User_AccountPassword: "",
        // User_AccountPasswordError: "Enter password",
        // User_AccountPasswordConfirmation: "",
        // User_AccountPasswordConfirmationError: "Confirm password",
        // User_AccountPasswordStrength: 0,
        // isUpdate:false
      });
      // if(success){
      //   this.context.router.push('/mammoth/reports/经营报告/总览');
      // }
    }
    // if(this.props.user !== nextProps.user){
    //   this.setState({
    //     SnackbarOpen: true,
    //     SnackbarMessage: nextProps.user.success ? "密码修改成功" : "密码修改失败: " + error,
    //   });
    // }
  }

  _handle_Close_Snackbar = () => {
    this.setState({SnackbarOpen: false});
  };

  _handle_onChange_User_AccountPassword_Current = (event) => {
    const {User_AccountPassword } = this.state;
    this.setState({User_AccountPassword_Current: event.target.value});
    if(event.target.value == "")
      this.setState({
        User_AccountPassword_CurrentError: "输入当前密码"
      });
    this.validateInputs(event.target.value, this.state.User_AccountPassword, this.state.User_AccountPasswordConfirmation);
  };

  _handle_onChange_User_AccountPassword = (event) => {
    const passwordScore = scorePassword(event.target.value);
    const {User_AccountPassword_Current } = this.state;
    this.setState({
      User_AccountPassword: event.target.value,
      User_AccountPasswordStrength: passwordScore,
    });
    this.validateInputs(this.state.User_AccountPassword_Current, event.target.value, this.state.User_AccountPasswordConfirmation);
    if(event.target.value == "")
      this.setState({
        User_AccountPasswordError:"密码不能为空"
        //event.target.value == "" ? "密码不能为空" :(event.target.value !== User_AccountPassword_Current ? "重置密码不相同":"")
      });


  };

  _handle_onChange_User_AccountPasswordConfirmation = (event) => {
    const { User_AccountPassword } = this.state;
    this.setState({User_AccountPasswordConfirmation: event.target.value});

    this.validateInputs(this.state.User_AccountPassword_Current, this.state.User_AccountPassword, event.target.value);
  };

  validateInputs(currentPassword, password, passwordConfirmation) {
    this.setState({
      //User_AccountPassword_CurrentError: currentPassword == password ? "新密码与原密码相同":"",
      User_AccountPasswordError: currentPassword==''?'':currentPassword == password ? "新密码与原密码相同":(password !== passwordConfirmation ? "两次输入的新密码不一致" : ""),
      User_AccountPasswordConfirmationError: password !== passwordConfirmation ? "两次输入的新密码不一致" : ""
    });
  }

  _handleUpdate = () => {
    const {User_AccountPassword_Current,User_AccountPassword,User_AccountPasswordConfirmation} = this.state;
    if(User_AccountPassword !== User_AccountPasswordConfirmation ){
      this.setState({
        SnackbarOpen: true,
        SnackbarMessage: "提示：新密码两次输入不一致"
      })
      return;
    }
    if(User_AccountPassword_Current == User_AccountPassword){
      this.setState({
        SnackbarOpen: true,
        SnackbarMessage: "提示：新密码与原密码相同"
      })
      return
    }
    if( !User_AccountPassword_Current=='' && !User_AccountPassword =='' && !User_AccountPasswordConfirmation == ''){

      this.props.dispatch(updatePwd({
            userName: this.props.user.userName,
            currentPassword: this.state.User_AccountPassword_Current,
            newPassword: this.state.User_AccountPassword
          })
      );
    }
    // if(this.props.user.success ){
    //   this.setState({
    //     SnackbarOpen: true,
    //     SnackbarMessage: "提示：修改成功"
    //   })
    // }

  }

  getStyles() {
    const styles = {
      button: {
        marginTop: 20
      },
      progress:{
        marginTop: 5
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

    if (this.props.width === MEDIUM || this.props.width === LARGE)
      styles.content = Object.assign(styles.content, styles.contentWhenMedium);

    return styles;
  }

  render() {
    const styles = this.getStyles()
    // console.log('user',this.props.user)

    //if( !this.props.user )
    //  return <RequiresAuthenticationNotice />; // Anonymous users do not get to have a profile
    //else
    return (
        <div style={styles.content}>
          <Card>
            <CardHeader
                title="用户密码"
                />
            <CardText>
              <TextField
                  ref="User_AccountPassword_Current"
                  type="password"
                  floatingLabelText="原密码"
                  value={ this.state.User_AccountPassword_Current }
                  errorText={ this.state.User_AccountPassword_CurrentError }
                  onChange={ this._handle_onChange_User_AccountPassword_Current }
                  fullWidth={ true }
                  />
              <TextField
                  ref="User_AccountPassword"
                  type="password"
                  floatingLabelText="新密码"
                  value={ this.state.User_AccountPassword }
                  errorText={ this.state.User_AccountPasswordError }
                  onChange={ this._handle_onChange_User_AccountPassword }
                  fullWidth={ true }
                  />
              <TextField
                  ref="User_AccountPasswordConfirmation"
                  type="password"
                  floatingLabelText="再次出入新密码"
                  value={ this.state.User_AccountPasswordConfirmation }
                  errorText={ this.state.User_AccountPasswordConfirmationError }
                  onChange={ this._handle_onChange_User_AccountPasswordConfirmation }
                  fullWidth={ true }
                  />
              <br/>
              <br/><br/>密码强度
              <LinearProgress
                  style={styles.progress}
                  mode="determinate"
                  value={ this.state.User_AccountPasswordStrength }
                  color={ this.state.User_AccountPasswordStrength < 60 ? "#ff0000" : ( this.state.User_AccountPasswordStrength < 80 ? "#c0c000" : "#00d000" ) }
                  />
              <br/>

              <div style={styles.button}>
                <RaisedButton
                    label="更新"
                    secondary={true}
                    disabled={(this.state.User_AccountPassword_Current !== '' &&
                    this.state.User_AccountPasswordConfirmation !=='' &&
                    this.state.User_AccountPasswordConfirmation !=='')?false:true}
                    onTouchTap={ ( ) => this._handleUpdate( ) }
                    />
              </div>
            </CardText>
            <Snackbar
                open={ this.state.SnackbarOpen }
                message={ this.state.SnackbarMessage }
                autoHideDuration={ 15000 }
                onRequestClose={ this._handle_Close_Snackbar }
                />
          </Card>
        </div>
    );
  }
}

User_Properties.contextTypes = {
  muiTheme: React.PropTypes.object,
}

const mapStateToProps = (state) => {
  const { authReducer } = state;
  return {
    user: authReducer.user
  };
};

export default connect(
    mapStateToProps
)(withWidth( )(User_Properties));

