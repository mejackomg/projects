import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Checkbox from 'material-ui/Checkbox';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';

const checkItems=['动作','悬疑','奇幻','传记','犯罪','惊悚','冒险','剧情','爱情','战争','喜剧','武侠','动画','科幻',
    '恐怖','西部','歌舞','纪录片']

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

var filmType=[];

class Dialog_Type extends Component {
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
        this.GetTypeValue();

        this.handleClose();
    };

    handleCheck =(event, isInputChecked,label) =>{
        if(isInputChecked)
            filmType.push(label);
        else
            this.removeArrayItem(filmType,label);
    }

    indexOfArray = (val,item)=> {
        for (var i = 0; i < val.length; i++) {
            if (val[i] == item)
                return i;
        }
        return -1;
    }

    removeArrayItem = (val, item) => {
        var index = this.indexOfArray(val, item);
        if (index > -1) {
            val.splice(index, 1);
        }
    }

    setDefaultCheck = (label) => {
        var index = this.indexOfArray(filmType,label);
        return (index > -1)
    }

    GetTypeValue = () => {
        let label='';
        let index=0;
        filmType.map(function(item) {
            index++;
            label += item;
            if(index!=filmType.length)
                label += '/';
            return label;
        })

        this.props.getValue(label);
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
                title="影片类型"
                titleStyle={{backgroundColor:this.context.muiTheme.palette.primary2Color,
                                color:this.context.muiTheme.palette.alternateTextColor}}
                actions={actions}
                modal={true}
                open={this.props.dialogOpen}
                onRequestClose={this.handleClose}
                //autoScrollBodyContent={true}
                >
                {checkItems.map((item,key)=>(
                    <Checkbox
                        key={key}
                        label={item}
                        defaultChecked={this.setDefaultCheck(item)}
                        style={styles.checkbox}
                        labelStyle={styles.labelStyle}
                        onCheck={this.handleCheck}
                        />
                ))}
            </Dialog>
        );
    }
}


Dialog_Type.contextTypes = {
    muiTheme: React.PropTypes.object,
}

Dialog_Type.childContextTypes = {
    muiTheme: React.PropTypes.object,
};

Dialog_Type.propTypes = {
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
)(Dialog_Type);

