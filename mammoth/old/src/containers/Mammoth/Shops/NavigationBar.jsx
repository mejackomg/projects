/**
 * Created by apple on 2016/12/4.
 */

import React, { Component, PropTypes } from 'react';

import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import AutoComplete from 'material-ui/AutoComplete';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import {Tabs, Tab} from 'material-ui/Tabs';
import SearchIcon from 'material-ui/svg-icons/action/search';
import CloseIcon from 'material-ui/svg-icons/navigation/close';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import ChevronLeft from 'material-ui/svg-icons/av/fast-rewind.js'
import ChevronRight from 'material-ui/svg-icons/av/fast-forward.js'
import Subheader from 'material-ui/Subheader';


import {
    colors,
    spacing,
    typography
} from 'material-ui/styles';


class NavigationBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value:1,
            value1:1,
        };
    }

    handleChange = (event, index, value) => {
        this.props.setPage(value);
        this.setState({value})
    };
    handleChange1 = (event, index, value) => {
        this.props.setPageLineCount(value*10);
        this.setState({value1:value})
    };

    handleMouseDown_GoBack=()=> {
        const {pageCount} = this.props;
        const {value} = this.state;
        if (value > 1) {
            this.setState({value: value - 1});
            this.props.setPage(value -1);
        }
    }

    handleMouseDown_GoForward=()=> {
        const {pageCount} = this.props;
        const {value} = this.state;
        if (value < pageCount) {
            this.setState({value: value + 1});
            this.props.setPage(value+1);
        }
    }

    render() {
        const {pageCount,goBack,goForward} = this.props;
        let items = [];
        for (let i = 1; i < pageCount+1; i++) {
            //items.push(<MenuItem value={i} key={i} primaryText={`第${i}页`}/>);
            items.push(<MenuItem value={i} key={i} primaryText={i}/>);
        }

        return (
            <ToolbarGroup lastChild={true}>
                <ToolbarTitle text='每页' style={{fontSize:16,marginTop:-4}}/>
                {/*<SelectField style={{width:45}} underlineStyle={{borderColor:'transparent'}} labelStyle={{color:this.context.muiTheme.palette.accent1Color}} value={this.state.value1} onChange={this.handleChange1}>
                    <MenuItem value={1} primaryText="5" />
                     <MenuItem value={2} primaryText="20" />
                     <MenuItem value={3} primaryText="30" />
                     <MenuItem value={4} primaryText="40" />
                     <MenuItem value={5} primaryText="50" />
                </SelectField>*/}
                <ToolbarTitle text='5' style={{ color:this.context.muiTheme.palette.accent1Color,fontSize:'16px',marginTop:-4,marginLeft:''}} />
                <ToolbarTitle text='条' style={{fontSize:16, marginTop:-4}}/>

                <IconButton tooltip="上一页" onTouchTap={this.handleMouseDown_GoBack}  style={{marginLeft:0}}>
                    <ChevronLeft color={this.context.muiTheme.palette.accent1Color}/>
                </IconButton>
                <ToolbarTitle text='第' style={{fontSize:16,marginTop:-4 }}/>
                <SelectField style={{width:45}} underlineStyle={{borderColor:'transparent'}} labelStyle={{textAlign:'center',color:this.context.muiTheme.palette.accent1Color}} value={this.state.value} onChange={this.handleChange}>
                    {items}
                </ SelectField>
                <ToolbarTitle text='页' style={{fontSize:16,marginTop:-4}}/>
                <IconButton tooltip="下一页" onTouchTap={this.handleMouseDown_GoForward} style={{marginLeft:-15}}>
                    <ChevronRight color={this.context.muiTheme.palette.accent1Color}/>
                </IconButton>
            </ToolbarGroup>
        );
    }
}


NavigationBar.contextTypes = {
    muiTheme: React.PropTypes.object,
}

NavigationBar.propTypes = {
    pageCount:PropTypes.number.isRequired,
    setPage:PropTypes.func.isRequired,
    setPageLineCount:PropTypes.func.isRequired,
};

export default NavigationBar;


