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
import {
    colors,
    spacing,
    typography
} from 'material-ui/styles';
//暂不用的控件

export default class DialogChoose extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value1:'0checkItems1',
            value2:'0checkItems2'
        };
    }

    handleChange1 = (event, index, value) => {
        this.setState({value1:value});
    };
    handleChange2 = (event, index, value) => {
        this.setState({value2:value});
    };
    render() {
        const {checkItems1,checkItems2} = this.props;
        return (
            <div>
                <CardText expandable={false}>
                    <SelectField
                        key={1}
                        value={this.state.value1}
                        onChange={this.handleChange1}
                        maxHeight={200}
                        style={{width:'200px',marginRight:'60px'}}
                    >
                        {
                            checkItems1.map((item,key)=>(
                                <MenuItem value={key+'checkItems1'} key={key+'checkItems1'} primaryText={item} style={{mixWidth:'200px',width:'200px'}}
                                />
                            ))
                        }
                    </SelectField>

                    <SelectField
                        key={2}
                        value={this.state.value2}
                        onChange={this.handleChange2}
                        maxHeight={200}
                        style={{width:'130px',marginRight:'60px'}}>
                        {
                            checkItems2.map((item,key)=>(
                                <MenuItem value={key+'checkItems2'} key={key+'checkItems2'} primaryText={item}/>
                            ))
                        }
                    </SelectField>
                    {/*<div style={{border:'1px solid #333',borderRadius:'3px'}}>*/}
                    {/*<div style={{display: 'flex', flexWrap: 'wrap'}}>*/}
                    {/*{this.state.chipData.map(this.renderChip, this)}*/}
                    {/*</div>*/}
                    {/*<RaisedButton*/}
                    {/*onTouchTap={this.handleTouchTap}*/}
                    {/*label=""*/}
                    {/*/>*/}
                    {/*<Menu>*/}
                    {/*{*/}
                    {/*checkItems3.map((item,key)=>(*/}
                    {/*<MenuItem value={key+'checkItems3'} key={key+'checkItems3'} primaryText={item}/>*/}
                    {/*))*/}
                    {/*}*/}
                    {/*</Menu>*/}
                    {/*</div>*/}
                    {/*<PopoverExampleSimple />*/}

                </CardText>
            </div>
        );
    }
}