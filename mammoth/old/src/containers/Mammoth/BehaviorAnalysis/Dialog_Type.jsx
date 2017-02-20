import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Checkbox from 'material-ui/Checkbox';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import SelectField from 'material-ui/SelectField';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import BorderColor from 'material-ui/svg-icons/editor/border-color';
import Create from 'material-ui/svg-icons/content/create';
import Toggle from 'material-ui/Toggle';
import IconButton from 'material-ui/IconButton';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Chip from 'material-ui/Chip';
import RaisedButton from 'material-ui/RaisedButton';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Clear from 'material-ui/svg-icons/content/clear';
import ContentDown from 'material-ui/svg-icons/hardware/keyboard-arrow-down';
import ContentUp from 'material-ui/svg-icons/hardware/keyboard-arrow-up';
import Popover from 'material-ui/Popover';
import FilterButton from './exp.jsx'
import Snackbar from 'material-ui/Snackbar';
import {
    colors,
    spacing,
    typography
} from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import DialogItems from './DialogItems'
import {loadCreateFunnel} from '../../../reducers/database.js';
const styles = {
    checkbox: {
        marginTop: 18,
        width:120,
        float:'left'
    },
    labelStyle:{
        fontSize:14
    },
    radioButton: {
        marginTop: 16,
    }
};
const TimeItems = ['5分钟','1小时','1天','7天','14天','30天','60','90','180'];
class Dialog_Type extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            openSanckbar:false,
            alertMsg:'',
            value1:1,
            stepItems:[],
            FunnelName:'',
            FunnelTime:0,
        };
    }
    getStyle(){
        const styles = {
            underlineStyle: {
                borderColor: this.context.muiTheme.palette.accent1Color,
            }
        }
        return styles;
    }
    componentWillReceiveProps (nextProps) {
        if(nextProps.DictTitle != this.props.DictTitle || nextProps.dialogOpen == true) {
            let stepDefault = [nextProps.DictTitle[0].id,nextProps.DictTitle[1].id];
            this.setState({
                stepItems : stepDefault
            });
        }
    }
    handleClose = () => {
        this.props.onClosed();
    };

    handleCancel = () => {
        this.handleClose();
    };
    handleAccept = () => {
        const {FunnelName,FunnelTime,stepItems} = this.state;
        const {dispatch,user,Funnel_name} = this.props;
        if( FunnelName == ''){
            this.setState({
                openSanckbar:true,
                alertMsg:'漏斗名不能为空'
            })
        }
        else if(Array.indexOf(Funnel_name, FunnelName) !== -1){
            this.setState({
                openSanckbar:true,
                alertMsg:'请求失败：漏斗名已存在！'
            })
        }
        else{
            if(this.judge(FunnelName)>20){
                this.setState({
                    alertMsg:'中文名长度不能大于10,英文名长度不能大于20',
                    openSanckbar: true
                })

                // dispatch(loadGetFunnel(this.props.user.userId));
            }else{
                this.handleClose();
                dispatch(loadCreateFunnel(FunnelName, user.userId, stepItems));
            }
            // this.handleClose();
            // dispatch(loadCreateFunnel(FunnelName, FunnelTime, user.userId, stepItems));
            // dispatch(loadGetFunnel(this.props.user.userId));
        }
    };
    handleChange = (event, index, value) => {
        // console.log(value);
        this.setState({FunnelTime:value});
    };
    handleOpen = () => {
        this.setState({open: true});
    };
    InputChange =(event)=>{
        console.log(event.target.value);
        let len = this.judge(event.target.value);
        if(len>20){
            this.setState({
                alertMsg:'中文名长度不能大于10,英文名长度不能大于20',
                openSanckbar: true
            })
        }else{
            this.setState({
                FunnelName:event.target.value
            });
        }
    }
    judge =(str)=>{
        let len = 0;
        for(let i=0;i<str.length;i++){
            if(str.charCodeAt(i)>127 || str.charCodeAt(i) == 94)
                len += 2;
            else
                len ++;
        }
        return len;
    }
    handleRequestClose = () =>{
        this.setState({
            openSanckbar: false,
        });
    }
    haddleAddSteps =()=>{
        const {stepItems,} = this.state
        const {DictTitle} = this.props;
        for(var i=0; i<DictTitle.length; i++) {
            if(Array.indexOf(stepItems, DictTitle[i].id) === -1) {
                stepItems.push(DictTitle[i].id);
                break;
            }
        }
        this.setState({
            stepItems:stepItems
        })
    }
    haddleRemoveSteps =(index)=>{
        const {stepItems} = this.state
        stepItems.splice(index, 1);
        // console.log(stepItems);
        this.setState({
            stepItems:stepItems
        });
    }
    haddleChangeSteps = (index, id) => {
        const {stepItems} = this.state
        stepItems[index] = id;
        // console.log(stepItems);
        this.setState({
            stepItems:stepItems
        });
    }

    render() {
        const {DictTitle} = this.props;
        const styles = this.getStyle();
        const actions = [
            <FlatButton
                label="取消"
                primary={true}
                 onTouchTap={this.handleCancel}
             />,
             <FlatButton
                 label="保存漏斗"
                 primary={true}
                 keyboardFocused={true}
                 onTouchTap={this.handleAccept}
            />,
        ];
        return (
        <Dialog title="创建漏斗" actions={actions} modal={true}
                open={this.props.dialogOpen}
                autoScrollBodyContent={true}
                onRequestClose={this.handleClose}
                titleStyle={{ backgroundColor: this.context.muiTheme.palette.primary1Color,
                    color: typography.textFullWhite}}
        >
            <div style={{}}>
                <div style={{backgroundColor:this.context.muiTheme.palette.accent2Color}}>
                    <div style={{display:'flex',height:'76px',fontSize:'13px',padding:'20px'}}>
                        <label style={{width:'15%',lineHeight:'36px'}}>漏斗名称</label>
                        <input type="text" style={{width:'50%',border:'1px solid #a8b7c8',padding:'6px 10px 6px 10px',
                            fontSize:'14px',color:'#212121',borderRadius:'3px',backgroundColor:'#fff'}}
                               value={this.state.FunnelName}
                        onChange={this.InputChange} />
                        {/*<TextField*/}
                            {/*ref="User_DisplayName"*/}
                            {/*//defaultValue={ this.props.user.userName }*/}
                            {/*// value={ this.state.User_DisplayName }*/}
                            {/*floatingLabelText="用户名"*/}
                            {/*//errorText={ this.state.User_DisplayNameError }*/}
                            {/*onChange={this.InputChange}*/}
                            {/*fullWidth={ true }*/}
                        {/*/>*/}
                    </div>
                    {/*<div style={{display:'flex',height:'76px',fontSize:'13px',padding:'20px'}}>*/}
                        {/*<label style={{width:'15%',lineHeight:'36px'}}>漏斗窗口期</label>*/}
                        {/*<SelectField*/}
                            {/*value={this.state.FunnelTime}*/}
                            {/*onChange={this.handleChange}*/}
                            {/*underlineStyle={styles.underlineStyle}*/}
                            {/*maxHeight={200}*/}
                            {/*//hintStyle={{color: this.context.muiTheme.palette.accent3Color}}*/}
                        {/*>*/}
                            {/*{TimeItems.map((item,key)=>(*/}
                                {/*<MenuItem value={key} key={key} primaryText={item} />*/}
                            {/*))}*/}


                        {/*</SelectField>*/}
                    {/*</div>*/}
                </div>
                <div>
                    <header style={{fontSize:'20px',height:"64px", lineHeight:"64px",
                    backgroundColor: typography.textFullWhite,
                    //color:this.context.muiTheme.palette.primary1Color ,
                    padding:'15px 20px'}}>
                    漏斗步骤</header>
                    <div>
                        {
                            this.state.stepItems.map((item,index)=>(
                                 <DialogItems key={index} checkItems={DictTitle} indexKey={index}
                                              stepItems={this.state.stepItems}
                                              haddleRemoveSteps = {this.haddleRemoveSteps}
                                              haddleChangeSteps = {this.haddleChangeSteps}
                                              nowItem={item}/>
                            ))
                        }
                    </div>
                    <div>
                        <FlatButton label="增加步骤" labelPosition="after" primary={true} icon={<ContentAdd />}
                                   onTouchTap={this.haddleAddSteps}
                        />
                    </div>
                </div>
            </div>
            <Snackbar
                open={this.state.openSanckbar}
                message={this.state.alertMsg}
                autoHideDuration={4000}
                onRequestClose={this.handleRequestClose}
            />

        </Dialog>

        );
    }
}




Dialog_Type.contextTypes = {
    muiTheme: React.PropTypes.object,
}
Dialog_Type.propTypes = {
    dialogOpen:PropTypes.bool.isRequired,
    onClosed:PropTypes.func.isRequired,

};
const mapStateToProps = (state) => {
    const { authReducer , databaseReducer } = state;

    return {
        user:authReducer.user,
        createFunnelFlag:databaseReducer.createFunnelFlag
    };
};

export default connect(
    mapStateToProps
)(Dialog_Type);



