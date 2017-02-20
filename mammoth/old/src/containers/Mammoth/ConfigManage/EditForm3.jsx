import React, { Component, PropTypes } from 'react';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
import RaisedButton from 'material-ui/RaisedButton';
import AutoComplete from 'material-ui/AutoComplete';
import {Card, CardHeader, CardText} from 'material-ui/Card';


import keys from 'object-keys';

class EditForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchText_Platform: '',
            searchText_SrcTable: '',
            searchText_DstTable: '',
            searchText_SrcColumn: '',
            searchText_DstColumn: '',
            searchText_UpdateRule: ''
        };
    }

    _handleUpdate = () => {
        //this.context.relay.commitUpdate(
        //  new Viewer_updateMutation( {
        //    Viewer:             this.props.Viewer,
        //    User_DisplayName:   this.refs.User_DisplayName.getValue( ),
        //    User_ProfilePhoto:  this.state.User_ProfilePhoto,
        //    User_Email:         this.refs.User_Email.getValue( ),
        //    User_Locale:        this.refs.User_Locale.getValue( ),
        //  } )
        //);
    };

    _handleUpdate_Clear=()=>{
        this.setState({
            searchText_Platform: '',
            searchText_SrcTable: '',
            searchText_DstTable: '',
            searchText_SrcColumn: '',
            searchText_DstColumn: '',
            searchText_UpdateRule: ''
        });
    }

    onNewRequest_AutoComplete_Platform = (chosenRequest, index)=> {
        this.setState({searchText_Platform: chosenRequest});
    }
    onNewRequest_AutoComplete_SrcTable = (chosenRequest, index)=> {
        let tableName = chosenRequest.split('/')[0];
        this.setState({searchText_SrcTable: tableName});
    }
    onChange_SelectField_SrcColumn = (object, index, value)=> {
        this.setState({searchText_SrcColumn: value});
    }

    onNewRequest_AutoComplete_DstTable = (chosenRequest, index)=> {
        let tableName = chosenRequest.split('/')[0];
        this.setState({searchText_DstTable: tableName});
    }
    onChange_SelectField_DstColumn = (object, index, value)=> {
        this.setState({searchText_DstColumn: value});
    }
    onChange_SelectField_UpdateRule = (object, index, value)=> {
        this.setState({searchText_UpdateRule: value});
    }

    getStyles() {
        const styles = {
            root: {},
            content: {
                margin: '0 30px',//this.context.muiTheme.spacing.desktopGutter,
                display: 'flex',
                justifyContent: 'center'
            },
            card: {
                width: '45%',
                margin: '50 30px'
            },
            buttons: {
                margin: '-20 0 40 0',
                display: 'flex',
                justifyContent: 'center'
            },
            button: {
                margin: '0 30 0 30',
            },
            underlineStyle: {
                borderColor: this.context.muiTheme.palette.accent1Color,
            },
            hintStyle: {
                color: this.context.muiTheme.palette.accent3Color,
            },
            underlineFocusStyle: {
                borderColor: this.context.muiTheme.palette.primary1Color
            },
        }
        return styles;
    }

    render() {
        const styles = this.getStyles();
        const {searchText_Platform,searchText_SrcTable,searchText_DstTable,
            searchText_SrcColumn,searchText_DstColumn,searchText_UpdateRule} = this.state
        const {srcPlatforms,dstTables,updateRules} = this.props

        let platformList = keys(srcPlatforms);
        let srcTableList = [];
        if (searchText_Platform != '') {
            let tableNameList = keys(srcPlatforms[searchText_Platform].tables);
            tableNameList.forEach((tableName, key)=> {
                srcTableList.push(tableName + '/' + srcPlatforms[searchText_Platform].tables[tableName].comment)
            })
        }
        let dstTableList = [];
        let tableNameList = keys(dstTables);
        tableNameList.forEach((tableName, key)=> {
            dstTableList.push(tableName + '/' + dstTables[tableName].comment)
        })

        let srcColumnList = (searchText_Platform == '' || searchText_SrcTable == '') ? [] : keys(srcPlatforms[searchText_Platform].tables[searchText_SrcTable].columns);
        let dstColumnList = (searchText_DstTable == '') ? [] : keys(dstTables[searchText_DstTable].columns);

        return (
            <div>
                <div style={styles.content}>
                    <Card style={styles.card}>
                        <CardHeader
                            titleStyle={{color:this.context.muiTheme.palette.primary1Color}}
                            title="源表信息"
                            />
                        <CardText>
                            <AutoComplete
                                style={{marginTop:-30}}
                                //listStyle={{maxHeight:385,width:300}}
                                fullWidth={true}
                                openOnFocus={true}
                                hintText='平台名称'
                                floatingLabelText='平台名称'
                                filter={AutoComplete.fuzzyFilter}
                                dataSource={platformList}
                                //maxSearchResults={5}
                                hintStyle={styles.hintStyle}
                                underlineStyle={styles.underlineStyle}
                                underlineFocusStyle={styles.underlineFocusStyle}
                                onNewRequest={this.onNewRequest_AutoComplete_Platform}
                                //onUpdateInput={this.props.onUpdateInput}
                                searchText={searchText_Platform}
                                />
                            <AutoComplete
                                //style={styles.content}
                                //listStyle={{maxHeight:385,width:300}}
                                fullWidth={true}
                                openOnFocus={true}
                                hintText='表名称'
                                floatingLabelText='表名称'
                                filter={AutoComplete.fuzzyFilter}
                                dataSource={srcTableList}
                                //maxSearchResults={5}
                                hintStyle={styles.hintStyle}
                                underlineStyle={styles.underlineStyle}
                                underlineFocusStyle={styles.underlineFocusStyle}
                                onNewRequest={this.onNewRequest_AutoComplete_SrcTable}
                                //onUpdateInput={this.props.onUpdateInput}
                                searchText={searchText_SrcTable}
                                />
                            <SelectField
                                value={ searchText_SrcColumn }
                                floatingLabelText="列名称"
                                onChange={ this.onChange_SelectField_SrcColumn }
                                hintStyle={styles.hintStyle}
                                underlineStyle={styles.underlineStyle}
                                underlineFocusStyle={styles.underlineFocusStyle}
                                fullWidth={ true }
                                >
                                {
                                    srcColumnList.map((item, key)=>
                                            <MenuItem key={key} value={item} primaryText={item}
                                                      secondaryText={srcPlatforms[searchText_Platform].tables[searchText_SrcTable].columns[item].type}/>
                                    )
                                }
                            </SelectField>
                        </CardText>
                    </Card>

                    <Card style={styles.card}>
                        <CardHeader
                            titleStyle={{color:this.context.muiTheme.palette.primary1Color}}
                            title="源表信息"
                            />
                        <CardText>
                            <AutoComplete
                                style={{marginTop:-30}}
                                //listStyle={{maxHeight:385,width:300}}
                                fullWidth={true}
                                openOnFocus={true}
                                hintText='表名称'
                                floatingLabelText='表名称'
                                filter={AutoComplete.fuzzyFilter}
                                dataSource={dstTableList}
                                //maxSearchResults={5}
                                hintStyle={styles.hintStyle}
                                underlineStyle={styles.underlineStyle}
                                underlineFocusStyle={styles.underlineFocusStyle}
                                onNewRequest={this.onNewRequest_AutoComplete_DstTable}
                                //onUpdateInput={this.props.onUpdateInput}
                                searchText={searchText_DstTable}
                                />
                            <SelectField
                                value={ searchText_DstColumn }
                                floatingLabelText="列名称"
                                onChange={ this.onChange_SelectField_DstColumn }
                                hintStyle={styles.hintStyle}
                                underlineStyle={styles.underlineStyle}
                                underlineFocusStyle={styles.underlineFocusStyle}
                                fullWidth={ true }
                                >
                                {
                                    dstColumnList.map((item, key)=>
                                            <MenuItem key={key} value={item} primaryText={item}
                                                      secondaryText={dstTables[searchText_DstTable].columns[item].type}/>
                                    )
                                }
                            </SelectField>
                            <SelectField
                                value={ searchText_UpdateRule }
                                floatingLabelText="更新策略"
                                onChange={ this.onChange_SelectField_UpdateRule }
                                hintStyle={styles.hintStyle}
                                underlineStyle={styles.underlineStyle}
                                underlineFocusStyle={styles.underlineFocusStyle}
                                fullWidth={ true }
                                >
                                {
                                    (keys(updateRules)).map((item, key)=>
                                            <MenuItem key={key} value={item} primaryText={item}/>
                                    )
                                }
                            </SelectField>
                        </CardText>
                    </Card>
                </div>

                <div style={styles.buttons}>
                    <RaisedButton
                        style={styles.button}
                        label="Submit"
                        secondary={true}
                        onTouchTap={this._handleUpdate}
                        disabled={
                                searchText_Platform== ""
                              ||searchText_SrcTable== ""
                              ||searchText_DstTable== ""
                              ||searchText_SrcColumn== ""
                              ||searchText_DstColumn== ""
                              //||searchText_UpdateRule== ""
                          }
                        />
                    <RaisedButton
                        style={styles.button}
                        label="Clear"
                        secondary={true}
                        onTouchTap={this._handleUpdate_Clear}
                        disabled={
                                searchText_Platform== ""
                              &&searchText_SrcTable== ""
                              &&searchText_DstTable== ""
                              &&searchText_SrcColumn== ""
                              &&searchText_DstColumn== ""
                              &&searchText_UpdateRule== ""
                          }
                        />
                </div>
            </div>
        );
    }
}


EditForm.contextTypes = {
    muiTheme: React.PropTypes.object,
}

EditForm.propTypes = {
    srcPlatforms: React.PropTypes.object,
    dstTables:React.PropTypes.object,
    updateRules:React.PropTypes.object
    //searchText_Platform:React.PropTypes.string,
    //searchText_Src:React.PropTypes.string,
    //searchText_Dst:React.PropTypes.string,
};

export default EditForm


