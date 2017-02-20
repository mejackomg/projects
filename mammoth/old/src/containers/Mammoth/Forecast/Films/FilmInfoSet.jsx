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

import SearchField from './SearchField.jsx'
import Dialog_Type from '../Dialog_Type.jsx'
import Dialog_Schedule from '../Dialog_Schedule.jsx'
import Dialog_Actor from '../Dialog_Actor.jsx'

var filmsData = require('../../../../../Data/films.json');


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
var films=[];
class UpcomingFilm extends React.Component
{
    constructor( props )
    {
        super( props );

        this.state = {
            selectedFilm:null,
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

    handleDataChange = (event,date) => {
        this.setState({timeValue: date})
    }

    handleChange = (event, index, value) => {

        this.updateFilm(value);

        var film = films[value-1];
        this.setState({
            selectedFilm: value,
            typeValue:film.type?film.type:'',
            timeValue:film.上映日期?this.parseDate(film.上映日期):null,
            scheduleValue: film.档期?film.档期:'',
            actorValue: film.演员名单?film.演员名单.split('/').slice(0,4).toString().replace(/,/g,'/'):'',
            directorValue: film.导演?film.导演:'',
            screenwriterValue: film.编剧?film.编剧.split('/').slice(0,2).toString().replace(/,/g,'/'):'',
            producerValue: film.摄影?film.摄影:''
        })
    }

    parseDate = (str) => {
        if (typeof str == 'string') {
            var results = str.match(/^ *(\d{4})-(\d{1,2})-(\d{1,2}) *$/);
            if (results && results.length > 3) {
                return new Date(parseInt(results[1], 10), (parseInt(results[2], 10) - 1), parseInt(results[3], 10));
            }
            results = str.match(/^ *(\d{4})-(\d{1,2})-(\d{1,2}) +(\d{1,2}):(\d{1,2}):(\d{1,2}) *$/);
            if (results && results.length > 6)
                return new Date(parseInt(results[1], 10), parseInt(results[2], 10) - 1, parseInt(results[3], 10), parseInt(results[4], 10), parseInt(results[5], 10), parseInt(results[6], 10));
            results = str.match(/^ *(\d{4})-(\d{1,2})-(\d{1,2}) +(\d{1,2}):(\d{1,2}):(\d{1,2})\.(\d{1,9}) *$/);
            if (results && results.length > 7)
                return new Date(parseInt(results[1], 10), parseInt(results[2], 10) - 1, parseInt(results[3], 10), parseInt(results[4], 10), parseInt(results[5], 10), parseInt(results[6], 10), parseInt(results[7], 10));
        }
        return null;
    }

    updateFilm = (index) => {
        this.setState({imageSrc: films[index-1].img});
    }

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
        films = filmsData[this.props.catalogue];

        return (
            <Paper>
                <Toolbar>
                    <ToolbarGroup>
                        <ToolbarTitle text="影片信息"/>
                    </ToolbarGroup>
                </Toolbar>

                <div style={styles.root}>
                    <div style={styles.input}>
                        {/*<SearchField />*/}
                        <SelectField
                            value={this.state.selectedFilm}
                            onChange={this.handleChange}
                            floatingLabelText="影片名称"
                            fullWidth={true}
                            >
                            {
                                films.map((row, index) => (
                                    <MenuItem key={index} value={index + 1} primaryText={row.name}/>
                                ))}
                        </SelectField>
                        <TextField
                            floatingLabelText="影片类型"
                            //type="password"
                            onFocus={(event) => {this.setState({dialogOpen: true})}}
                            value={this.state.typeValue}
                            fullWidth={true}
                            />
                        <DatePicker mode="landscape"
                                    floatingLabelText="上映时间"
                                    okLabel="确定"
                                    cancelLabel="取消"
                                    fullWidth={true}
                                    onChange={this.handleDataChange}
                                    value={this.state.timeValue}
                            />
                        <TextField
                            floatingLabelText="影片档期"
                            onFocus={(event) => {this.setState({dialogOpen1: true})}}
                            value={this.state.scheduleValue}
                            fullWidth={true}
                            />
                    </div>

                    <div style={styles.input1}>
                        <TextField
                            floatingLabelText="导演"
                            //type="password"
                            onFocus={(event) => {castType='director';this.setState({dialogOpen2: true})}}
                            value={this.state.directorValue}
                            fullWidth={true}
                            />
                        <br/>
                        <TextField
                            floatingLabelText="演员"
                            //type="password"
                            onFocus={(event) => {castType='actor';this.setState({dialogOpen2: true})}}
                            value={this.state.actorValue}
                            fullWidth={true}
                            />
                        <br/>
                        <TextField
                            floatingLabelText="编剧"
                            //type="password"
                            onFocus={(event) => {castType='screenwriter';this.setState({dialogOpen2: true})}}
                            value={this.state.screenwriterValue}
                            fullWidth={true}
                            />
                        <TextField
                            floatingLabelText="摄影"
                            //type="password"
                            onFocus={(event) => {castType='producer';this.setState({dialogOpen2: true})}}
                            value={this.state.producerValue}
                            fullWidth={true}
                            />
                    </div>
                    {
                        this.state.imageSrc?
                            <img style={{float:'right',height:270,marginTop:30,marginRight:25}} src={this.state.imageSrc} />:null
                    }
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