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
import {white,grey200, darkWhite} from 'material-ui/styles/colors';
import { connect } from 'react-redux';
import {
    typography,
    spacing
} from 'material-ui/styles';

import scorePassword from './scorePassword';
import {signup} from '../../reducers/auth.js';
import {login} from '../../reducers/auth.js';

const styles = {
  popover: {
    padding: 10,
  },
};

class LoginButton extends Component {
    constructor(props) {
        super(props);

        this.state = {
            User_AccountName: '',
            User_AccountPassword: '',
            Account_information_Supplied: false,
            Dialog_AuthenticationChallenge_IsOpen: false,
            Dialog_AuthenticationInProgress_IsOpen: false,
            Dialog_AuthenticationFailed_IsOpen: false,
            Dialog_CreateUser_IsOpen: false,
            Dialog_CreateUserInProgress_IsOpen: false,
            Dialog_CreateUserFailed_IsOpen: false,
            Dialog_LogOutConfirmation_IsOpen: false,
            Dialog_LogOutInProgress_IsOpen: false,
            Dialog_LogOutFailed_IsOpen: false,
            Popover_AuthorizedUser_IsOpen: false,
        };

    }

    componentWillReceiveProps(nextProps) {
        // login
        if (nextProps.user) {
            const {success,userName,error} = nextProps.user;
            const user=nextProps.user;
            if (success) {
                this.setState({
                    Dialog_CreateUserInProgress_IsOpen: false,
                });
                this.context.router.push('/mammoth/reports/经营报告/总览');

                // global.mixpanel.people.set(user.userId, {
                //     userName: user.userName,
                //     userId: user.userId,
                //     userPhone: user.userPhone,
                //     userRealName: user.userRealName,
                //     userType:user.userType,
                //     userActived:user.userActived,
                //     created: new Date().getTime()
                // });
                // global.mixpanel.track("login", {
                //     distinct_id: user.userId,
                //     time: new Date().toString()
                // });
            }
            else {
                if (this.state.Dialog_CreateUserInProgress_IsOpen)
                    this.setState({
                        Dialog_CreateUserInProgress_IsOpen: false,
                        Dialog_CreateUserFailed_IsOpen: true,
                        Dialog_CreateUserFailed_Message: error,
                    });
                else if (this.state.Dialog_AuthenticationInProgress_IsOpen)
                    this.setState({
                        Dialog_AuthenticationInProgress_IsOpen: false,
                        Dialog_AuthenticationFailed_IsOpen: true,
                        Dialog_AuthenticationFailed_Message: error,
                    });
            }
        }
    }

    Dialog_AuthenticationChallenge() {
        return (
            <Dialog
                open={ this.state.Dialog_AuthenticationChallenge_IsOpen }
                title="登录"
                actions={ [
          //<FlatButton key="CreateUser" label="注册用户" secondary={true} onTouchTap={ this._handle_onTouchTap_AuthenticationChallenge_CreateUser } />,
          <FlatButton key="Cancel" label="取消" onTouchTap={ this._handle_onTouchTap_AuthenticationChallenge_Cancel } />,
          <FlatButton key="LogIn" label="登录" primary={true} onTouchTap={ this._handle_onTouchTap_AuthenticationChallenge_LogIn } disabled={ ! this.state.Account_information_Supplied } />,
        ] }
                >
                <TextField
                    floatingLabelText="用户名"
                    fullWidth={ true }
                    value={ this.state.User_AccountName }
                    onKeyDown={ this._handle_onKeyDown_AuthenticationChallenge_User_AccountName }
                    onChange={ this._handle_onChange_AuthenticationChallenge_User_AccountName }
                    />
                <TextField
                    type="password"
                    floatingLabelText="密码"
                    fullWidth={ true }
                    value={ this.state.User_AccountPassword }
                    onKeyDown={ this._handle_onKeyDown_AuthenticationChallenge_User_AccountPassword }
                    onChange={ this._handle_onChange_AuthenticationChallenge_User_AccountPassword }
                    ref="User_AccountPassword"
                    />
            </Dialog>
        );
    }

    Dialog_AuthenticationChallenge_Open = () => {
        this.setState({
            Dialog_AuthenticationChallenge_IsOpen: true
        });
    };

    _handle_onChange_AuthenticationChallenge_User_AccountName = (event) => {
        this.setState({User_AccountName: event.target.value});
        this._handle_onChange_AuthenticationChallenge_User_AccountName_or_Password(event.target.value, this.state.User_AccountPassword);
    };

    _handle_onKeyDown_AuthenticationChallenge_User_AccountName = (e) => {
        if (e.keyCode === 13)
            this.refs.User_AccountPassword.focus();
    };

    _handle_onChange_AuthenticationChallenge_User_AccountPassword = (event) => {
        this.setState({User_AccountPassword: event.target.value});
        this._handle_onChange_AuthenticationChallenge_User_AccountName_or_Password(this.state.User_AccountName, event.target.value);
    };

    _handle_onKeyDown_AuthenticationChallenge_User_AccountPassword = (e) => {
        if (e.keyCode === 13)
            this._handle_onTouchTap_AuthenticationChallenge_LogIn();
    };

    _handle_onChange_AuthenticationChallenge_User_AccountName_or_Password = (AccountName, AccountPassword) => {
        this.setState({Account_information_Supplied: AccountName.length > 3 && AccountPassword.length > 3});
    };

    _handle_onTouchTap_AuthenticationChallenge_LogIn = () => {
        this.setState({
            Dialog_AuthenticationChallenge_IsOpen: false,
            Dialog_AuthenticationInProgress_IsOpen: true,
            User_AccountPassword: ''
        });

        this.props.dispatch(login(this.state.User_AccountName, this.state.User_AccountPassword));
    };

    _handle_onTouchTap_AuthenticationChallenge_CreateUser = () => {
        this.setState({
            Dialog_AuthenticationChallenge_IsOpen: false,
            Dialog_CreateUser_IsOpen: true,
            Dialog_CreateUser_AccountPasswordStrength: 0,
            User_AccountPassword: '',
        });
    };

    _handle_onTouchTap_AuthenticationChallenge_Cancel = () => {
        this.setState({
            Dialog_AuthenticationChallenge_IsOpen: false
        });
    };

    Dialog_AuthenticationInProgress() {
        return (
            <Dialog
                open={ this.state.Dialog_AuthenticationInProgress_IsOpen }
                title="正在登录 ..."
                actions={ [
          <FlatButton key="Cancel" label="取消" onTouchTap={ this._handle_onTouchTap_AuthenticationInProgress_Cancel } />,
        ] }
                >
                <LinearProgress mode="indeterminate"/>
            </Dialog>
        );
    }

    _handle_onTouchTap_AuthenticationInProgress_Cancel = () => {
        this.setState({
            Dialog_AuthenticationInProgress_IsOpen: false
        });
    };

    Dialog_AuthenticationFailed() {
        return (
            <Dialog
                open={ this.state.Dialog_AuthenticationFailed_IsOpen }
                title="登录失败"
                actions={ [
          <FlatButton key="OK" label="确定" primary={true} onTouchTap={ this._handle_onTouchTap_LogInFailure_OK } />,
        ] }
                >
                { this.state.Dialog_AuthenticationFailed_Message }
            </Dialog>
        );
    }

    _handle_onTouchTap_LogInFailure_OK = () => {
        this.setState({
            Dialog_AuthenticationFailed_IsOpen: false
        });
    };


    //

    Dialog_CreateUser() {
        return (
            <Dialog
                open={ this.state.Dialog_CreateUser_IsOpen }
                title="Sign Up"
                actions={ [
          <FlatButton key="Cancel" label="取消" onTouchTap={ this._handle_onTouchTap_CreateUser_Cancel } />,
          <FlatButton key="Create" label="创建" primary={true}
            onTouchTap={ this._handle_onTouchTap_CreateUser_Create }
            disabled={ this.state.Dialog_CreateUser_AccountPasswordStrength < 60 || this.state.User_AccountName.length < 4 }
          />,
        ] }
                >
                <TextField
                    floatingLabelText="用户名"
                    fullWidth={ true }
                    value={ this.state.User_AccountName }
                    onKeyDown={ this._handle_onKeyDown_CreateUser_User_AccountName }
                    onChange={ this._handle_onChange_CreateUser_User_AccountName }
                    />
                <TextField
                    type="password"
                    floatingLabelText="密码"
                    fullWidth={ true }
                    value={ this.state.User_AccountPassword }
                    onKeyDown={ this._handle_onKeyDown_CreateUser_User_AccountPassword }
                    onChange={ this._handle_onChange_CreateUser_User_AccountPassword }
                    ref="User_AccountPassword"
                    />
                <br/><br/>密码强度
                <LinearProgress
                    mode="determinate"
                    value={ this.state.Dialog_CreateUser_AccountPasswordStrength }
                    color={ this.state.Dialog_CreateUser_AccountPasswordStrength < 60 ? "#ff0000" : ( this.state.Dialog_CreateUser_AccountPasswordStrength < 80 ? "#c0c000" : "#00d000" ) }
                    />
            </Dialog>
        );
    }

    _handle_onChange_CreateUser_User_AccountName = (event) => {
        this.setState({User_AccountName: event.target.value});
        this._handle_onChange_CreateUser_User_AccountName_or_Password(event.target.value, this.state.User_AccountPassword);
    };

    _handle_onKeyDown_CreateUser_User_AccountName = (e) => {
        if (e.keyCode === 13)
            this.refs.User_AccountPassword.focus();
    };

    _handle_onChange_CreateUser_User_AccountPassword = (event) => {
        this.setState({User_AccountPassword: event.target.value});
        this._handle_onChange_CreateUser_User_AccountName_or_Password(this.state.User_AccountName, event.target.value);
    };

    _handle_onKeyDown_CreateUser_User_AccountPassword = (e) => {
        if (e.keyCode === 13)
            this._handle_onTouchTap_CreateUser_Create();
    };

    _handle_onChange_CreateUser_User_AccountName_or_Password = (AccountName, AccountPassword) => {
        const passwordScore = scorePassword(AccountPassword);
        this.setState({
            Account_information_Supplied: AccountName.length > 3 && AccountPassword.length > 3,
            Dialog_CreateUser_AccountPasswordStrength: passwordScore,
        });
    };

    _handle_onTouchTap_CreateUser_Create = () => {
        this.setState({
            Dialog_CreateUser_IsOpen: false,
            Dialog_CreateUserInProgress_IsOpen: true,
        });

        this.props.dispatch(signup(this.state.User_AccountName, this.state.User_AccountPassword));

    };

    _handle_onTouchTap_CreateUser_Cancel = () => {
        this.setState({
            Dialog_CreateUser_IsOpen: false
        });
    };

    Dialog_CreateUserInProgress() {
        return (
            <Dialog
                open={ this.state.Dialog_CreateUserInProgress_IsOpen }
                title="正在创建用户 ..."
                actions={ [
          <FlatButton key="Cancel" label="Cancel" onTouchTap={ this._handle_onTouchTap_CreateUserInProgress_Cancel } />,
        ] }
                >
                <LinearProgress mode="indeterminate"/>
            </Dialog>
        );
    }

    _handle_onTouchTap_CreateUserInProgress_Cancel = () => {
        this.setState({
            Dialog_CreateUserInProgress_IsOpen: false
        });
    };

    Dialog_CreateUserFailed() {
        return (
            <Dialog
                open={ this.state.Dialog_CreateUserFailed_IsOpen }
                title="用户创建失败"
                actions={ [
          <FlatButton key="OK" label="OK" primary={true} onTouchTap={ this._handle_onTouchTap_CreateUserFailed_OK } />,
        ] }
                >
                { this.state.Dialog_CreateUserFailed_Message }
            </Dialog>
        );
    }

    _handle_onTouchTap_CreateUserFailed_OK = () => {
        this.setState({
            Dialog_CreateUserFailed_IsOpen: false
        });
    };

    render() {
        const styles = {
            buttonLabel: {
                fontWeight: typography.fontWeightNormal,
                fontSize: 18,
                lineHeight: '38px',
                whiteSpace: 'pre',
                color:this.context.muiTheme.palette.accent1Color//darkWhite
            },
            buttonStyle: {
                margin: '16px 32px 0px 32px',
                width: 100,
                height: 40,
                border: '1px solid #fff',
                borderRadius: 4,
                //borderColor:this.context.muiTheme.palette.accent1Color
            }
        }

        return (
            <FlatButton key='login' onTouchTap={ this.Dialog_AuthenticationChallenge_Open } label="登   录"
                        style={styles.buttonStyle} labelStyle={styles.buttonLabel}>
                { this.Dialog_AuthenticationChallenge() }
                { this.Dialog_AuthenticationInProgress() }
                { this.Dialog_AuthenticationFailed() }
                { this.Dialog_CreateUser() }
                { this.Dialog_CreateUserInProgress() }
                { this.Dialog_CreateUserFailed() }
            </FlatButton>
        );
    }
}

LoginButton.contextTypes = {
    router: React.PropTypes.object.isRequired,
    muiTheme: React.PropTypes.object,
};


LoginButton.propTypes = {
  //data: PropTypes.array.isRequired,
  dispatch:PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
    const { authReducer } = state;
    return {
        user: authReducer.user,
    };
};

export default connect(
    mapStateToProps
)(LoginButton);

