
import React from 'react';

import {Link} from 'react-router';
import Paper from 'material-ui/Paper'
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import ECharts from 'react-echarts';
import {Tabs, Tab} from 'material-ui/Tabs';
import Divider from 'material-ui/Divider';
import ReactList from 'react-list';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import StarBorder from '../../../../../node_modules/material-ui/svg-icons/toggle/star-border';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Avatar from 'material-ui/Avatar';
import RaisedButton from 'material-ui/RaisedButton';
import keys from 'object-keys';


import CompositeValue from './CompositeValue.jsx'
import Chip from 'material-ui/Chip';

import {
    colors,
    spacing,
    typography
} from 'material-ui/styles';

var castsData = require('../../../../../Data/cast.json');
var casts=castsData['actor'];
var actorList=['杨子珊','郭采洁','胡歌','赵又廷','郑恺']
const styles = {
    chip: {
        margin: 10,
    },
    wrapper: {
        display: 'flex',
        flexWrap: 'wrap',
    },
};
var cast= null;

export default class CastPlan extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chipData: this.props.actors,
            value: null,
        };
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
    handleChange = (event, index, value) => {
        this.setState({value});
        this.state.chipData.push(value);
    }
    render() {
        return (
            <div style={{paddingLeft:30,paddingTop:20}}>
                <div style={styles.wrapper}>
                    {this.state.chipData.map(this.renderChip, this)}
                    <SelectField
                        style={{width:150,paddingLeft:20}}
                        hintText="选择"
                        maxHeight={300}
                        //value={this.state.value}
                        onChange={this.handleChange}>
                        {actorList.map((item, key) => (
                            <MenuItem value={item} key={key} primaryText={item}/>
                        ))}
                    </SelectField>
                </div>

                <br/>
                <RaisedButton label="方案分析" primary={true}/>
                <p style={{marginLeft:30}}>从整体上看,郑恺有其优势项目,但问题也较多,需要对剧本进行全面的考量,对电影的品质要求也更为苛刻。</p>

                <div style={{display:'flex'}}>
                    <div style={{width:'45%'}}>
                        <h3>优势</h3>
                        <li>爱情喜剧为其优势项目</li>
                        <li>综艺加持</li>
                    </div>
                    <div style={{width:'45%'}}>
                        <h3>劣势</h3>
                        <li>男本位为辅女本位为主带来的未知影响 </li>
                        <li>接片品味</li>
                    </div>
                </div>
            </div>
        );
    }
}
