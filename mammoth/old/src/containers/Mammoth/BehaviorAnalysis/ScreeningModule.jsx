/* @flow weak */
/* eslint react/prop-types: 0 */

import React from 'react'

//import Relay from 'react-relay'
import { connect } from 'react-redux';
import {List, ListItem, MakeSelectable} from 'material-ui/List';


import ActionRecordVoice from 'material-ui/svg-icons/action/record-voice-over.js';
import ActionReceipt from 'material-ui/svg-icons/action/receipt';
import RemoveRedEye from 'material-ui/svg-icons/image/remove-red-eye';
import ContentCopy from 'material-ui/svg-icons/content/content-copy';
import DataMng from 'material-ui/svg-icons/av/featured-play-list.js';
//import adminManagement from '../../../Data/AdminManagement.json';

import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import ContentAdd from 'material-ui/svg-icons/content/add';
import FlatButton from 'material-ui/FlatButton';

import Dialog_Type from './Dialog_Type.jsx'
import DialogItems from './DialogItems.jsx'
import {
    colors,
    spacing,
    typography
} from 'material-ui/styles';
import {fade} from 'material-ui/utils/colorManipulator';

// import { setChromeTitle} from '../../actions/layout';




class ScreeningModule extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dialogOpen: false,
            // open: false
            value: 3,
        };
    }
    componentDidMount () {

    }
    handleOpen = () => {
        this.setState({dialogOpen: true});
    };
    onClosed = () => {
        this.setState({dialogOpen: true});
    };
    handleChange = (event, index, value) => this.setState({value});
    render() {
        return (
            <div>
                <Toolbar>
                    <ToolbarGroup firstChild={true}>
                        <ToolbarTitle text="显示漏斗" />
                        <DropDownMenu value={this.state.value} onChange={this.handleChange}>
                            <MenuItem value={1} primaryText="All Broadcasts" />
                            <MenuItem value={2} primaryText="All Voice" />
                            <MenuItem value={3} primaryText="All Text" />
                            <MenuItem value={4} primaryText="Complete Voice" />
                            <MenuItem value={5} primaryText="Complete Text" />
                            <MenuItem value={6} primaryText="Active Voice" />
                            <MenuItem value={7} primaryText="Active Text" />
                        </DropDownMenu>
                        <ToolbarTitle text="按" />
                        <DropDownMenu value={this.state.value} onChange={this.handleChange}>
                            <MenuItem value={1} primaryText="All Broadcasts" />
                            <MenuItem value={2} primaryText="All Voice" />
                            <MenuItem value={3} primaryText="All Text" />
                            <MenuItem value={4} primaryText="Complete Voice" />
                            <MenuItem value={5} primaryText="Complete Text" />
                            <MenuItem value={6} primaryText="Active Voice" />
                            <MenuItem value={7} primaryText="Active Text" />
                        </DropDownMenu>
                        <ToolbarTitle text="查看" />
                    </ToolbarGroup>
                    <ToolbarGroup>

                        <FontIcon className="muidocs-icon-custom-sort" />
                        <ToolbarSeparator />
                        <RaisedButton label="创建漏斗" onTouchTap={this.handleOpen} primary={true} />
                        {/*<IconMenu*/}
                        {/*iconButtonElement={*/}
                        {/*<IconButton touch={true}>*/}
                        {/*<NavigationExpandMoreIcon />*/}
                        {/*</IconButton>*/}
                        {/*}*/}
                        {/*>*/}
                        {/*/!*<MenuItem primaryText="Download" />*!/*/}
                        {/*/!*<MenuItem primaryText="More Info" />*!/*/}
                        {/*</IconMenu>*/}
                    </ToolbarGroup>

                </Toolbar>
                <div style={{backgroundColor:this.context.muiTheme.palette.accent2Color}}>
                    <FlatButton label="筛选条件"
                                labelPosition="after"
                                primary={true}
                                icon={<ContentAdd />}
                        //onTouchTap={isexpanded?this.handleReduce:this.handleExpand}
                        //onTouchTap={this.handleAdd}
                                style={{width:'144px'}} />
                </div>
                <RaisedButton
                    label="创建漏斗"
                    onTouchTap={this.handleOpen}
                />
                <Dialog_Type
                    dialogOpen={this.state.dialogOpen}
                    onClosed={() => {this.setState({dialogOpen: false})}}
                />
            </div>
        )
    }
}

ScreeningModule.contextTypes = {
    muiTheme: React.PropTypes.object.isRequired
};



