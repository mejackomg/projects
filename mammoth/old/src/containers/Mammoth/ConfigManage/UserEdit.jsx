/**
 * Created by Administrator on 2016-11-23.
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import AutoComplete from 'material-ui/AutoComplete';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import ContentLink from 'material-ui/svg-icons/content/link';
import keys from 'object-keys';
import bcrypt from 'bcryptjs'

import {updateUser, addNewUser,QueryUserManageTable,loadColumnList} from '../../../reducers/database.js';


class UserEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userPlatFormName: '',
            userType: '',
            platformName: '',
            userRealName: '',
            userPhone: '',
            userActivated: '',
            userId:'',
        };
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(loadColumnList());
        //dispatch(loadMappingTable());
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.selectedRow && this.props.selectedRow != nextProps.selectedRow) {
            let row = nextProps.selectedRow;

            if (row.用户名 && row.用户类型 && row.平台类型 && row.真实姓名 && row.电话 && row.状态) {
                this.setState({
                    userId:row.user_id,
                    userPlatFormName: row.用户名,
                    userType: row.用户类型,
                    platformName: row.平台类型,
                    userRealName: row.真实姓名,
                    userPhone: row.电话,
                    userActivated: row.状态
                });
            }
        }
        else if (nextProps.deleteResult && this.props.deleteResult != nextProps.deleteResult) {
            const {success,error} = nextProps.deleteResult;
            this._handleUpdate_Clear();
        }
    }

    _handleUpdate_Clear = ()=> {
        this.setState({
            userPlatFormName: '',
            userType: '',
            platformName: '',
            userRealName: '',
            userPhone: '',
            userActivated:''
        });
    }

    refresh = ()=> {
        const {userPlatFormName,searchText_Src,searchText_Dst} = this.state;
        const { dispatch } = this.props;
        dispatch(QueryUserManageTable('', '', ''));
    }

    _handleAdd_Add = ()=> {
        const {userPlatFormName,userType,platformName,
            userRealName,userPhone,userActivated} = this.state;
        //console.log(userPlatFormName, userType, platformName,
        //    userRealName, userPhone, userActivated);
        const { dispatch } = this.props;

        bcrypt.hash('123456', 8, (err, userPassword) => {
            dispatch(addNewUser(userPlatFormName, userType, platformName,
                userRealName, userPhone, userActivated,userPassword));
        });
    }

    _handleUpdateUser = ()=> {
        const {userId,userPlatFormName,userType,platformName,
            userRealName,userPhone,userActivated} = this.state;

        const { dispatch } = this.props;
            dispatch(updateUser(userId,userPlatFormName, userType, platformName,
                userRealName, userPhone, userActivated));



    }


    //onChange_AutoComplete_Platform = (object, index, value)=> {
    onChange_AutoComplete_Platform = (event)=> {
        var value = event.target.value;
        const {userPlatFormName} = this.state;
        this.setState({userPlatFormName: value});


    }
    /*onChange_AutoComplete_SrcTable = (event)=> {
     var value=event.target.value;
     const {userType} = this.state;
     this.setState({userType: value});
     }*/
    onChange_AutoComplete_SrcTable = (event, index, value)=> {
        const {userType} = this.state;
        this.setState({userType: value});
        //console.log(userType);
    }

    onChange_SelectField_SrcColumn = (event, index, value)=> {
        const {platformName} = this.state;
        this.setState({platformName: value});
    }

    onChange_AutoComplete_DstTable = (event)=> {
        var value = event.target.value;
        const {userRealName} = this.state;
        this.setState({userRealName: value});
    }
    onChange_SelectField_DstColumn = (event)=> {
        var value = event.target.value;
        const {userPhone} = this.state;
        this.setState({userPhone: value});
    }
    onChange_SelectField_UpdateRule = (event, index, value)=> {
        const {userActivated} = this.state;

        this.setState({userActivated: value});

    }

    getStyles() {
        const styles = {
            root: {},
            content: {
                //margin: '0 30px',//this.context.muiTheme.spacing.desktopGutter,
                display: 'flex',
                justifyContent: 'center'
            },
            card: {
                width: '45%',
                margin: '0px 20px 15px'
            },
            buttons: {
                margin: '-10 0 30 0',
                display: 'flex',
                justifyContent: 'center'
            },
            button: {
                margin: '0 20 0 20',
            },
            underlineStyle: {
                borderColor: this.context.muiTheme.palette.accent1Color,
            },
            hintStyle: {
                color: this.context.muiTheme.palette.accent3Color,
            },
            underlineFocusStyle: {
                borderColor: this.context.muiTheme.palette.primary1Color
            },
        }
        return styles;
    }

    render() {
        const styles = this.getStyles();
        const {userId,userPlatFormName,userType,platformName,
            userRealName,userPhone,userActivated} = this.state;
        const {platformTypeData,userTypeData} = this.props;
        // let platformTypeList = keys(platformTypeData);
        // let userTypeList = keys(userTypeData);


        //let platformList = keys(srcPlatforms);
        //let srcTableList = userPlatFormName != '' ? keys(srcPlatforms[userPlatFormName].tables) : [];
        //let dstTableList = keys(dstTables);

        // let srcColumnList = (userPlatFormName == '' || userType == '') ? [] : keys(srcPlatforms[userPlatFormName].tables[userType].columns);
        // let dstColumnList = (platformName == '') ? [] : keys(dstTables[platformName].columns);


        return (
            <div>
                <div style={styles.content}>
                    <Card style={styles.card} zDepth={0}>
                        <CardHeader
                            titleStyle={{color:this.context.muiTheme.palette.primary1Color}}
                            title=""
                        />
                        <CardText>

                            <TextField
                                //id="userPlatFormName"
                                style={{marginTop:-40}}
                                fullWidth={true}
                                hintText='用戶名'
                                floatingLabelText='用戶名'
                                hintStyle={styles.hintStyle}
                                underlineStyle={styles.underlineStyle}
                                underlineFocusStyle={styles.underlineFocusStyle}
                                onChange={this.onChange_AutoComplete_Platform}
                                value={userPlatFormName}
                            >
                            </TextField>
                            <SelectField
                                fullWidth={true}
                                hintText='用户类型'
                                floatingLabelText='用户类型'
                                hintStyle={styles.hintStyle}
                                underlineStyle={styles.underlineStyle}
                                underlineFocusStyle={styles.underlineFocusStyle}
                                onChange={this.onChange_AutoComplete_SrcTable}
                                value={userType}
                            >
                                {
                                    userTypeData.map((item, key)=>
                                        <MenuItem key={key} value={item.user_type_name} primaryText={item.user_type_name}/>
                                    )
                                }

                            </SelectField>
                            <SelectField
                                value={ platformName }
                                hintText='平台类型'
                                floatingLabelText="平台类型"
                                onChange={ this.onChange_SelectField_SrcColumn }
                                hintStyle={styles.hintStyle}
                                underlineStyle={styles.underlineStyle}
                                underlineFocusStyle={styles.underlineFocusStyle}
                                fullWidth={ true }
                            >
                                {
                                    platformTypeData.map((item, key)=>
                                        <MenuItem key={key} value={item.platform_name} primaryText={item.platform_name}/>
                                    )
                                }

                            </SelectField>
                        </CardText>
                    </Card>

                    <Card style={styles.card} zDepth={0}>
                        <CardHeader
                            titleStyle={{color:this.context.muiTheme.palette.primary1Color}}
                            title=""
                        />
                        <CardText>
                            <TextField
                                style={{marginTop:-40}}
                                // listStyle={{maxHeight:385,width:300}}
                                fullWidth={true}
                                hintText='真实姓名'
                                floatingLabelText='真实姓名'
                                hintStyle={styles.hintStyle}
                                underlineStyle={styles.underlineStyle}
                                underlineFocusStyle={styles.underlineFocusStyle}
                                onChange={this.onChange_AutoComplete_DstTable}
                                value={userRealName}
                            >

                            </TextField>
                            <TextField
                                value={ userPhone }
                                floatingLabelText="电话"
                                hintText='电话'
                                onChange={ this.onChange_SelectField_DstColumn }
                                hintStyle={styles.hintStyle}
                                underlineStyle={styles.underlineStyle}
                                underlineFocusStyle={styles.underlineFocusStyle}
                                fullWidth={ true }
                            >

                            </TextField>
                            <SelectField
                                value={userActivated }
                                floatingLabelText="状态"
                                hintText="状态"
                                onChange={ this.onChange_SelectField_UpdateRule }
                                hintStyle={styles.hintStyle}
                                underlineStyle={styles.underlineStyle}
                                underlineFocusStyle={styles.underlineFocusStyle}
                                fullWidth={ true }
                            >
                                <MenuItem value={"激活"} primaryText="激活"/>
                                <MenuItem value={"未激活"} primaryText="未激活"/>
                            </SelectField>

                        </CardText>
                    </Card>
                </div>

                <div style={styles.buttons}>
                    <RaisedButton
                        style={styles.button}
                        label="新增"
                        secondary={true}
                        onTouchTap={this._handleAdd_Add}
                        disabled={
                                userPlatFormName== ""
                              ||userType== ""
                              ||platformName== ""
                              ||userRealName== ""
                              ||userPhone== ""
                              ||userActivated== ""
                          }

                    />

                    <RaisedButton
                        style={styles.button}
                        label="更新"
                        secondary={true}
                        onTouchTap={this._handleUpdateUser}
                        disabled={
                                userPlatFormName== ""
                              ||userType== ""
                              ||platformName== ""
                              ||userRealName== ""
                              ||userPhone== ""
                              ||userActivated== ""
                          }

                    />


                    <RaisedButton
                        style={styles.button}
                        label="清空"
                        secondary={true}
                        onTouchTap={this._handleUpdate_Clear}
                        disabled={
                                userPlatFormName== ""
                              &&userType== ""
                              &&platformName== ""
                              &&userRealName== ""
                              &&userPhone== ""
                              &&userActivated== ""
                          }
                    />
                    <RaisedButton
                        style={styles.button}
                        label="刷新"
                        secondary={false}
                        //onTouchTap={this.props.handleRefresh}
                        onTouchTap={this.refresh}
                    />
                </div>
            </div>
        );
    }
}

UserEdit.contextTypes = {
    muiTheme: React.PropTypes.object,
}

UserEdit.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

UserEdit.propTypes = {
    // srcPlatforms: React.PropTypes.object,
    // dstTables: React.PropTypes.object,
    // updateRules: React.PropTypes.object,
};

const mapStateToProps = (state) => {
    const { databaseReducer } = state;
    return {
        // platformTypeData: databaseReducer.ColumnListData.platformTypeData,
        // userTypeData: databaseReducer.ColumnListData.userTypeData,
        // deleteResult: databaseReducer.deleteResult,
    };
};

export default connect(
    mapStateToProps
)(UserEdit)



