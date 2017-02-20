
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
import CastPlan from './CastPlan.jsx'
import CastPlan1 from './CastPlan1.jsx'
import CastPlan2 from './CastPlan2.jsx'
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

export default class CastAnalyse extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chipData: [],
            value: null,
        };
    }

    renderQuizItem = (index, key) => {
        const name=actorList[index];
        const cast = casts[name];
        return (
            <Paper key={key} style={{margin:'0 6 20 6px',height:150,width:280,display: 'inline-block'}}>
                <div style={{float:'left'}}>
                    <GridTile
                        style={{width:100,height:150,textAlign:'left'}}
                        title={name}
                        //subtitle={<span><b>人气</b>：{cast.renqi}</span>}
                        containerElement={<Link to="/mammoth/casts/actor" />}
                        >
                        <img src={cast.img}/>
                    </GridTile>
                </div>
                <div style={{float:'left'}}>
                    <CompositeValue />
                </div>
            </Paper>
        );
    };

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

    renderChip(data, key) {
        casts.forEach((item)=> {
            if (item.name == data) {
                cast = item;
            }
        });
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
                {data}
            </Chip>
        );
    }
    handleChange = (event, index, value) => {
        this.setState({value});
        this.state.chipData.push(value);
    }
    render() {
        return (
            <div style={{marginTop:30,height:900}}>
                <Toolbar>
                    <ToolbarGroup>
                        <ToolbarTitle text="卡司分析"/>
                        <ToolbarTitle text="推荐方案：杨子珊/郑恺" style={{color:'F9A825'}}/>
                    </ToolbarGroup>
                </Toolbar>
                <div style={{padding:'0 10px'}}>
                    <p style={{color:'lightGrey'}}>
                        <span style={{fontSize:18,color:'grey',marginLeft:10}}>演员推荐：</span>（综合考虑演员票房号召力、荧屏热度和影片类型偏好等因素，建立演员和剧本的匹配度模型）
                    </p>
                    <ReactList
                        itemRenderer={this.renderQuizItem}
                        //itemsRenderer={this.renderQuizItemsGrid}
                        length={actorList.length}//activations.length}
                        //pageSize={24}
                        type='simple'
                        />
                    <Divider style={{marginBottom:10,marginTop:20}}/>

                    <p style={{color:'lightGrey'}}>
                        <span style={{fontSize:18,color:'grey',marginLeft:10}}>组合方案：</span>（综合考虑演员之间的关联影响、荧屏配合度和人物特质等因素，建立演员组合的发酵指数模型）
                    </p>
                    <Tabs tabItemContainerStyle={{backgroundColor: colors.grey100}}
                          contentContainerStyle={{height:150}}
                        >
                        <Tab label="方案A">
                            <CastPlan actors={['杨子珊','郑恺']}/>
                        </Tab>
                        <Tab label="方案B">
                            <CastPlan1 actors={['杨子珊','胡歌']}/>
                        </Tab>
                        <Tab label="方案C">
                            <CastPlan2 actors={['郭采洁','赵又廷']}/>
                        </Tab>
                    </Tabs>
                </div>
            </div>
        );
    }
}
