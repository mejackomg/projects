import React from 'react';
import Paper from 'material-ui/Paper';
import {Link} from 'react-router';
import {GridList, GridTile} from 'material-ui/GridList';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import Checkbox from 'material-ui/Checkbox';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';

import Dialog_Type from '../Dialog_Type.jsx'
import Dialog_Schedule from '../Dialog_Schedule.jsx'
import Dialog_Actor from '../Dialog_Actor.jsx'

const items = [
    <MenuItem key={1} value={1} primaryText="2016" />,
    <MenuItem key={2} value={2} primaryText="2017" />,
    <MenuItem key={3} value={3} primaryText="2018" />,
    <MenuItem key={4} value={4} primaryText="2019" />,
    <MenuItem key={5} value={5} primaryText="2020" />,
];
const items1 = [
    <MenuItem key={1} value={1} primaryText="★★★★★" />,
    <MenuItem key={2} value={2} primaryText="★★★★☆" />,
    <MenuItem key={3} value={3} primaryText="★★★☆☆" />,
    <MenuItem key={4} value={4} primaryText="★★☆☆☆" />,
    <MenuItem key={5} value={5} primaryText="★☆☆☆☆" />,
];

const styles = {
    root: {
        height: 300,
        padding:'0px 30px 30px 45px'
    },
    input: {
        float:'left',
        width:'30%'
    },
    input1: {
        paddingLeft:30,
        float:'left',
        width:'30%'
    },
    checkbox: {
        marginTop: 13,
        width:120,
        float:'left'
    },
    labelStyle:{
        fontSize:14
    }
};

var castType='actor';

class UpcomingFilm extends React.Component
{
    constructor( props )
    {
        super( props );

        this.state = {
            value1:null,
            value2:null,
            value3:null,
            value4:null,
            value5:null,
            dialogOpen: false,
            typeValue:'',
            dialogOpen1: false,
            scheduleValue:'',
            dialogOpen2: false,
            actorValue:'',
            directorValue:'',
            screenwriterValue:'',
            producerValue:'',
            timeValue:null,
            imageSrc:'',
            castType:'actor'
        };
    }

    handleChange1 = (event, index, value) => this.setState({value1:value});
    handleChange2 = (event, index, value) => this.setState({value2:value});
    handleChange3 = (event, index, value) => this.setState({value3:value});
    handleChange4 = (event, index, value) => this.setState({value4:value});
    handleChange5 = (event, index, value) => this.setState({value5:value});


    setCastsValue = (value) => {
        switch (castType)
        {
            case 'actor':
                this.setState({actorValue:value})
                break;
            case 'director':
                this.setState({directorValue:value})
                break;
            case 'screenwriter':
                this.setState({screenwriterValue:value})
                break;
            case 'producer':
                this.setState({producerValue:value})
                break;
        }
    }

    render( ) {
        return (
            <Paper>
                <Toolbar>
                    <ToolbarGroup>
                        <ToolbarTitle text="剧本信息"/>
                    </ToolbarGroup>
                </Toolbar>

                <div style={styles.root}>

                    <div style={styles.input}>
                        <SelectField
                            value={this.state.value1}
                            onChange={this.handleChange1}
                            floatingLabelText="故事情节"
                            fullWidth={true}
                            >
                            {items1}
                        </SelectField>
                        <SelectField
                            value={this.state.value2}
                            onChange={this.handleChange2}
                            floatingLabelText="题材创意"
                            fullWidth={true}
                            >
                            {items1}
                        </SelectField>
                        <SelectField
                            value={this.state.value3}
                            onChange={this.handleChange3}
                            floatingLabelText="人物设计"
                            fullWidth={true}
                            >
                            {items1}
                        </SelectField>
                        <SelectField
                            value={this.state.value4}
                            onChange={this.handleChange4}
                            floatingLabelText="受众体量"
                            fullWidth={true}
                            >
                            {items1}
                        </SelectField>
                    </div>

                    <div style={styles.input1}>
                        <TextField
                            floatingLabelText="影片名称"
                            fullWidth={true}
                        />
                        <br/>
                        <TextField
                            floatingLabelText="影片类型"
                            //type="password"
                            onFocus={(event) => {this.setState({dialogOpen: true})}}
                            value={this.state.typeValue}
                            fullWidth={true}
                        />
                        <SelectField
                            value={this.state.value5}
                            onChange={this.handleChange5}
                            floatingLabelText="上映时间（预期）"
                            fullWidth={true}
                            >
                            {items}
                        </SelectField>
                        <br/>
                        <TextField
                            floatingLabelText="影片档期（预期）"
                            onFocus={(event) => {this.setState({dialogOpen1: true})}}
                            value={this.state.scheduleValue}
                            fullWidth={true}
                            />
                    </div>

                    <div style={styles.input1}>
                        <TextField
                            floatingLabelText="演员（拟用）"
                            //type="password"
                            onFocus={(event) => {castType='actor';this.setState({dialogOpen2: true})}}
                            value={this.state.actorValue}
                            fullWidth={true}
                            />
                        <br/>
                        <TextField
                            floatingLabelText="导演（拟用）"
                            //type="password"
                            onFocus={(event) => {castType='director';this.setState({dialogOpen2: true})}}
                            value={this.state.directorValue}
                            fullWidth={true}
                            />
                        <br/>
                        <TextField
                            floatingLabelText="编剧（拟用）"
                            //type="password"
                            onFocus={(event) => {castType='screenwriter';this.setState({dialogOpen2: true})}}
                            value={this.state.screenwriterValue}
                            fullWidth={true}
                            />
                        <TextField
                            floatingLabelText="摄影（拟用）"
                            //type="password"
                            onFocus={(event) => {castType='producer';this.setState({dialogOpen2: true})}}
                            value={this.state.producerValue}
                            fullWidth={true}
                            />
                    </div>
                </div>

                <Dialog_Type
                    dialogOpen={this.state.dialogOpen}
                    onClosed={() => {this.setState({dialogOpen: false})}}
                    getValue={(label) => {this.setState({typeValue: label})}}
                    />

                <Dialog_Schedule
                    dialogOpen={this.state.dialogOpen1}
                    onClosed={() => {this.setState({dialogOpen1: false})}}
                    getValue={(label) => {this.setState({scheduleValue: label})}}
                    />

                <Dialog_Actor
                    dialogOpen={this.state.dialogOpen2}
                    onClosed={() => {this.setState({dialogOpen2: false})}}
                    getValue={this.setCastsValue}
                    castType = {castType}
                    />
            </Paper>
        )
    }
};

export default UpcomingFilm;