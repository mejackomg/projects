
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

                <p style={{marginLeft:30}}>总体来说,由于这是胡歌自大热电视剧之后首次登上大银幕,会获得到各方较高的关注,在宣传上也较 为省力,而粉丝群体会带来粉丝经济,这和鹿晗在《重返 20
                    岁》时的处境相似,对预售有一定帮助。和杨子珊 + 鹿晗的效果相当。</p>

                <div style={{display:'flex'}}>
                    <div style={{width:'45%'}}>
                        <h3>优势</h3>
                        <li>人气热度较高</li>
                        <li>外形突出，较为符合人物</li>
                    </div>
                    <div style={{width:'45%'}}>
                        <h3>劣势</h3>
                        <li>近年来缺乏电影成绩及数据,缺乏电影质感</li>
                    </div>
                </div>
            </div>
        );
    }
}
