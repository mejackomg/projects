/* @flow weak */
/* eslint react/prop-types: 0 */

// import React from 'react';
//import Relay from 'react-relay';
import React, {  PropTypes } from 'react';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';
import Snackbar from 'material-ui/Snackbar';
import { connect } from 'react-redux';

import withWidth, {LARGE, MEDIUM,SMALL}  from '../../utils/withWidth';

import { RequiresAuthenticationNotice } from './RequiresAuthentication.js';
import {updateUser} from '../../reducers/database.js';
import {Update_User} from '../../reducers/auth.js';

class User_Properties extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      open: false,
      alertMsg: '',
      isClick: false,
      User_ProfilePhoto: '',
      User_DisplayName:'',
      User_DisplayNameError:'',
      User_RealName:'',
      User_RealNameError:'',
      User_Telephone:'',
      User_TelephoneError:''
    };
  }

  handleTouchTap = () => {
    this.setState({
      open: true,
    });
  };

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };
  _handle_onChange_User_ProfilePhoto = (event, index, value) => {
    this.setState({
      User_ProfilePhoto: value
    });
  };
  _handle_onChange_User_DisplayName = (event)=>{
    event.target.value==''?
        this.setState({User_DisplayName:event.target.value,User_DisplayNameError: "用户名不能为空"}):
        this.setState({User_DisplayName:event.target.value,User_DisplayNameError:""});
  }
  _handle_onChange_User_RealName = (event)=>{
    event.target.value==''?
        this.setState({User_RealName :event.target.value,User_RealNameError: "真实姓名不能为空"}):
        this.setState({User_RealName :event.target.value,User_RealNameError:""});
  }
  _handle_onChange_User_Telephone = (event)=>{
    event.target.value==''?
        this.setState({User_Telephone :event.target.value,User_TelephoneError: "电话不能为空"}):
        this.setState({User_Telephone :event.target.value,User_TelephoneError:""});
  }
  _handleUpdate = () => {
    // this.context.relay.commitUpdate(
    //  new Viewer_updateMutation( {
       // Viewer:             this.props.Viewer,
       // User_DisplayName:   this.refs.User_DisplayName.getValue( ),
       // User_RealName:      this.refs.User_RealName.getValue( ),
       // User_Telephone:     this.User_Telephone.getValues(),
       // User_ProfilePhoto:  this.state.User_ProfilePhoto,
       // User_Email:         this.refs.User_Email.getValue( ),
       // User_Locale:        this.refs.User_Locale.getValue( ),
     // } )
      const {user ,  dispatch} = this.props;

      if(this.refs.User_DisplayName.getValue() && this.refs.User_RealName.getValue() && this.refs.User_Telephone.getValue()) {
        this.setState({
          isClick: true
        });

        dispatch(updateUser(user.userId,
            this.refs.User_DisplayName.getValue(),
            user.userType,
            this.refs.User_RealName.getValue(),
            this.refs.User_Telephone.getValue(),
            user.userActived,
            user.userName));
      }
      // if(!this.refs.User_RealName.getValue() ) {
      //   this.setState({
      //     open: true,
      //     User_RealNameError: "真实姓名不能为空"
      //   });
      //   // return;
      // }
      // if(!this.refs.User_Telephone.getValue() ) {
      //   this.setState({
      //     open: true,
      //     User_TelephoneError: "电话不能为空"
      //   });
      //   // return;
      // }


  };
  componentDidUpdate() {
      console.log('updateResult',this.props.updateResult);
      const {dispatch} = this.props;
      if(this.props.updateResult === 'success' && this.state.isClick) {

        this.setState({
          open:true,
          alertMsg:'修改成功',
          isClick:false
        })
        dispatch(Update_User(this.refs.User_DisplayName.getValue()));
        // this.context.router.push('/mammoth/reports/经营报告/总览');
      } else if (this.props.updateResult === 'fail' && this.state.isClick) {
        this.setState({
          open:true,
          alertMsg:'修改失败',
          isClick:false
        })
      }
  }

  getStyles() {
    const styles = {
      button:{
        marginTop:30
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
    console.log(this.props.user)
    console.log('state',this.state);

    //if( !this.props.user )
    //  return <RequiresAuthenticationNotice />; // Anonymous users do not get to have a profile
    //else
    return (
        <div style={styles.content}>
          <Card>
            <CardHeader
                title="用户信息"
                />
            <CardText>
              <TextField
                  ref="User_DisplayName"
                  defaultValue={ this.props.user.userName }
                 // value={ this.state.User_DisplayName }
                  floatingLabelText="用户名"
                  errorText={ this.state.User_DisplayNameError }
                  onChange={this._handle_onChange_User_DisplayName}
                  fullWidth={ true }
                  />
              <TextField
                  ref="User_RealName"
                  defaultValue={ this.props.user.userRealName }
                  floatingLabelText="真实姓名"
                  errorText={ this.state.User_RealNameError }
                  onChange={this._handle_onChange_User_RealName}
                  fullWidth={ true }

              />
              <TextField
                  ref="User_Telephone"
                  defaultValue={ this.props.user.userPhone }
                  floatingLabelText="电话"
                  errorText={ this.state.User_TelephoneError }
                  onChange={this._handle_onChange_User_Telephone}
                  fullWidth={ true }
              />
              {/*<TextField*/}
                  {/*ref="User_Email"*/}
                  {/*defaultValue=''*/}
                  {/*floatingLabelText="Email"*/}
                  {/*fullWidth={ true }*/}
                  {/*/>*/}
              {/*<TextField*/}
                  {/*ref="User_Locale"*/}
                  {/*defaultValue=''*/}
                  {/*floatingLabelText="Locale"*/}
                  {/*fullWidth={ true }*/}
                  {/*/>*/}
              <img src={ this.state.User_ProfilePhoto }/>
              {/*<SelectField*/}
                  {/*value={ this.state.User_ProfilePhoto }*/}
                  {/*floatingLabelText="选择照片"*/}
                  {/*onChange={ this._handle_onChange_User_ProfilePhoto }*/}
                  {/*fullWidth={ true }*/}
              {/*>*/}
                {/*<MenuItem value={ "/profile_photos/griz.jpg" } primaryText="Griz"/>*/}
                {/*<MenuItem value={ "/profile_photos/grumpy.jpg" } primaryText="Grumpy"/>*/}
                {/*<MenuItem value={ "/profile_photos/ice.jpg" } primaryText="Ice"/>*/}
                {/*<MenuItem value={ "/profile_photos/jack.jpg" } primaryText="Jack"/>*/}
                {/*<MenuItem value={ "/profile_photos/jill.jpg" } primaryText="Jill"/>*/}
                {/*<MenuItem value={ "/profile_photos/panda.jpg" } primaryText="Panda"/>*/}
              {/*</SelectField>*/}
              <div style={styles.button}>
                <RaisedButton
                    label="提交"
                    secondary={true}
                    onTouchTap={ ( ) => this._handleUpdate( ) }
                    />
              </div>
            </CardText>
          </Card>
          <Snackbar
            open={this.state.open}
            message={this.state.alertMsg}
            autoHideDuration={4000}
            onRequestClose={this.handleRequestClose}
          />
        </div>
    );
    //}
  }
}

User_Properties.contextTypes = {
  muiTheme: React.PropTypes.object,
}
User_Properties.propTypes = {
  dispatch:PropTypes.func.isRequired,
};
const mapStateToProps = (state) => {
  const { authReducer , databaseReducer } = state;
  return {
    user: authReducer.user,
    updateResult: databaseReducer.updateUserResult
  };
};

export default connect(
    mapStateToProps
)(withWidth( )(User_Properties));

//export default Relay.createContainer( User_Properties, {
//  fragments: {
//    Viewer: ( ) => Relay.QL`
//      fragment on Viewer{
//        User_IsAnonymous,
//        User_DisplayName,
//        User_ProfilePhoto,
//        User_Email,
//        User_Locale,
//        ${Viewer_updateMutation.getFragment('Viewer')},
//      }
//    `,
//  }
//} );
