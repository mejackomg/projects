import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Checkbox from 'material-ui/Checkbox';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

const schedule=[
    {classify:'小长假',content:['清明档','元旦档','五一档','端午档','中秋档']},
    {classify:'长假',content:['贺岁档','国庆档','暑假档','春节档']},
    {classify:'单日假',content:['妇女节','情人节','元宵节','七夕','520','光棍节','儿童节']},
    {classify:'冷档',content:['开学季','三月','九月','十一月']}
]

const styles = {
    checkbox: {
        marginTop: 18,
        width:120,
        float:'left'
    },
    labelStyle:{
        fontSize:14
    }
};

var filmSchedule="";

class Dialog_Schedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    getChildContext() {
        return ( {
            muiTheme: this.context.muiTheme,
        } );
    }

    handleClose = () => {
        this.props.onClosed();
    };

    handleCancel = () => {
        this.handleClose();
    };

    handleAccept = () => {
        this.props.getValue(filmSchedule);
        this.handleClose();
    };

    handleOnChange = (event, value)=> {
        filmSchedule=value;
    }

    createCheckbox = () => {
        return (
            <RadioButtonGroup name="1"
                              onChange={this.handleOnChange}
                >
                {schedule.map((row) => (
                    row.content.map((item, key)=>(
                        <RadioButton
                            value={item}
                            key={key}
                            label={item}
                            style={styles.checkbox}
                            labelStyle={styles.labelStyle}
                            />
                    ))
                ))}
            </RadioButtonGroup>
        )
    }

    render() {
        const actions = [
            <FlatButton
                label="取消"
                primary={true}
                onTouchTap={this.handleCancel}
                />,
            <FlatButton
                label="确定"
                primary={true}
                keyboardFocused={true}
                onTouchTap={this.handleAccept}
                />,
        ];

        return (
            <Dialog
                title="影片档期"
                titleStyle={{backgroundColor:this.context.muiTheme.palette.primary2Color,
                                color:this.context.muiTheme.palette.alternateTextColor}}
                actions={actions}
                modal={true}
                open={this.props.dialogOpen}
                onRequestClose={this.handleClose}
                //autoScrollBodyContent={true}
                >
                {this.createCheckbox()}
            </Dialog>
        );
    }


}


Dialog_Schedule.contextTypes = {
    muiTheme: React.PropTypes.object,
}

Dialog_Schedule.childContextTypes = {
    muiTheme: React.PropTypes.object,
};

Dialog_Schedule.propTypes = {
    dialogOpen:PropTypes.bool.isRequired,
    onClosed:PropTypes.func.isRequired,
    getValue:PropTypes.func.isRequired,
    //width:PropTypes.number.isRequired,
    //height:PropTypes.number.isRequired,
};

const mapStateToProps = (state) => {
    //const { layoutReducer } = state;
    return {
        //panelVisible:layoutReducer.panelVisible,
    };
};

export default connect(
    mapStateToProps
)(Dialog_Schedule);

