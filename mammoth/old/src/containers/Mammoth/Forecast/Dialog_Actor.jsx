import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Checkbox from 'material-ui/Checkbox';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import Avatar from 'material-ui/Avatar';
import SvgIconFace from '../../../../node_modules/material-ui/svg-icons/action/face';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
import Chip from 'material-ui/Chip';
import keys from 'object-keys';

var castsData = require('../../../../Data/cast.json');
var casts;

const styles = {
    chip: {
        margin: 10,
    },
    wrapper: {
        display: 'flex',
        flexWrap: 'wrap',
    },
};

class Dialog_Actor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chipData: [],
            value: null,
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
        this.GetActorValue();
        this.setState({chipData:[]});
        this.handleClose();
    };

    handleChange = (event, index, value) => {
        this.setState({value});
        this.state.chipData.push(value);
    }

    handleRequestDelete = (key) => {
        //if (key === 3) {
        //    alert('Why would you want to delete React?! :)');
        //    return;
        //}

        var {chipData} = this.state;
        const chipToDelete = chipData.map((chip) => chip.key).indexOf(key);
        chipData.splice(chipToDelete, 1);
        this.setState({chipData: chipData});
    }

    GetActorValue = () => {
        let label = '';
        let index = 0;
        var {chipData} = this.state;
        chipData.map(function (item) {
            index++;
            label += item;
            if (index != chipData.length)
                label += '/';
            return label;
        })

        this.props.getValue(label);
    }


    renderChip(name, key) {
        const cast = casts[name];

        return (
            <Chip
                key={key}
                onRequestDelete={() => this.handleRequestDelete(key)}
                //onTouchTap={handleTouchTap}
                style={styles.chip}
                open={true}
                >
                <Avatar src={cast.img} />
                {/*<Avatar color="#444" icon={<SvgIconFace />} />
                 <Avatar size={32}>A</Avatar>*/}
                {name}
            </Chip>
        );
    }

    render() {
        casts = castsData[this.props.castType];

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

                <SelectField
                    floatingLabelText="选择 . . ."
                    maxHeight={300}
                    //value={this.state.value}
                    onChange={this.handleChange}>
                    {keys(casts).map((name, key) => (
                        <MenuItem value={name} key={key} primaryText={name}/>
                    ))}
                </SelectField>

                <div style={styles.wrapper}>
                    {this.state.chipData.map(this.renderChip, this)}
                </div>

            </Dialog>
        );
    }
}


Dialog_Actor.contextTypes = {
    muiTheme: React.PropTypes.object,
}

Dialog_Actor.childContextTypes = {
    muiTheme: React.PropTypes.object,
};

Dialog_Actor.propTypes = {
    dialogOpen:PropTypes.bool.isRequired,
    onClosed:PropTypes.func.isRequired,
    getValue:PropTypes.func.isRequired,
    castType:PropTypes.string.isRequired,
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
)(Dialog_Actor);

