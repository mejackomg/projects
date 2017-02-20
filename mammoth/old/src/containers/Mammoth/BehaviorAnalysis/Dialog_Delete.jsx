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
import {Step, Stepper, StepLabel} from 'material-ui/Stepper';

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
import {loadFunnelStepDe,loadFunnelDelete} from '../../../reducers/database.js';

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


class Dialog_Delete extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openSanckbar:false,
            alertMsg:'',
            chooseFunnel:0,
            expended:false,
            flag:'0'
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
        console.log(nextProps.dialogOpen);
        if(nextProps.DeleteFunnelFlag == 'success'){
            this.setState({
                openSanckbar:true,
                alertMsg:'漏斗删除成功！'
            });
        }
        if(nextProps.Funnel_name.length>0 && this.state.flag === '0' && nextProps.dialogOpen !== this.props.dialogOpen && nextProps.dialogOpen) {
            this.setState({chooseFunnel:0, flag:'1'});
            const {dispatch,Funnel_name} = this.props;
            dispatch(loadFunnelStepDe(Funnel_name[0]));
        }
    }
    handleClose = () => {
        this.props.onClosed();
    };
    handleCancel = () => {
        this.setState({flag:'0'});
        this.handleClose();
    };
    handleAccept = () => {
        const {dispatch,Funnel_name} = this.props;
        const {chooseFunnel} = this.state;
        dispatch(loadFunnelDelete(Funnel_name[chooseFunnel], this.props.user.userId));
        this.setState({flag:'0'});
        this.handleClose();
    };

    handleChange = (event, index, value) => {
        this.setState({chooseFunnel:value});
        const {dispatch,Funnel_name} = this.props;
        dispatch(loadFunnelStepDe(Funnel_name[value]));
    };

    handleRequestClose = () =>{
        this.setState({
            openSanckbar: false,
        });
    }
    haddleDetails =()=>{
        const {expended} = this.state;
        this.setState({
            expended:expended?false:true
        })
    }
    render() {
        const {Funnel_name,PathFunnelDataDe,PathFunnelData} = this.props;
        const styles = this.getStyle();
        const actions = [
            <FlatButton
                label="取消"
                primary={true}
                onTouchTap={this.handleCancel}
            />,
            <FlatButton
                label="删除漏斗"
                primary={true}
                keyboardFocused={true}
                onTouchTap={this.handleAccept}
            />
        ];
        return (
            <Dialog title="删除漏斗" actions={actions} modal={true}
                    open={this.props.dialogOpen}
                    autoScrollBodyContent={true}
                    onRequestClose={this.handleClose}
                    titleStyle={{ backgroundColor: this.context.muiTheme.palette.primary1Color,
                        color: typography.textFullWhite}}
            >
                <div>
                    <div>
                        <div style={{display:'flex',height:"64px"}}>
                            <header style={{fontSize:'20px',height:"64px", lineHeight:"64px",
                                backgroundColor: typography.textFullWhite,
                                //color:this.context.muiTheme.palette.primary1Color ,
                                padding:'15px 20px'}}>
                                漏斗名称</header>
                            <div style={{marginTop:'19px'}}>
                                <SelectField
                                    value={this.state.chooseFunnel}
                                    onChange={this.handleChange}
                                    underlineStyle={{borderColor: this.context.muiTheme.palette.accent1Color}}
                                    maxHeight={200}
                                >
                                    {
                                        Funnel_name.map((item,key)=>(
                                            <MenuItem value={key} key={key} primaryText={item} style={{mixWidth:'200px',width:'200px'}}
                                            />
                                        ))
                                    }
                                </SelectField>
                            </div>

                        </div>
                        <div>
                            <FlatButton label="查看当前漏斗详情" labelPosition="after" primary={true}
                                        //{/*icon={<ContentAdd />}*/}
                                        onTouchTap={this.haddleDetails}
                            />
                        </div>
                        <Card expanded={this.state.expended}>
                            <CardText expandable={true}>
                                <div>
                                    <div>漏斗步骤</div>
                                    <Stepper
                                        orientation="vertical">
                                        {
                                            PathFunnelDataDe && PathFunnelDataDe.length>0?
                                            PathFunnelDataDe.map((item,key)=>(
                                                <Step key={key}>
                                                    <StepLabel>{item.page_name}</StepLabel>
                                                </Step>
                                            )):
                                                PathFunnelData.map((item,key)=>(
                                                    <Step key={key}>
                                                        <StepLabel>{item.page_name}</StepLabel>
                                                    </Step>
                                                ))
                                        }
                                    </Stepper>

                                </div>
                            </CardText>
                        </Card>


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
Dialog_Delete.contextTypes = {
    muiTheme: React.PropTypes.object,
}
Dialog_Delete.propTypes = {
    dialogOpen:PropTypes.bool.isRequired,
    onClosed:PropTypes.func.isRequired,

};
const mapStateToProps = (state) => {
    const { authReducer , databaseReducer } = state;
    return {
        user:authReducer.user,
        PathFunnelDataDe:databaseReducer.PathFunnelDataDe,
        DeleteFunnelFlag:databaseReducer.DeleteFunnelFlag
    };
};

export default connect(
    mapStateToProps
)(Dialog_Delete);



