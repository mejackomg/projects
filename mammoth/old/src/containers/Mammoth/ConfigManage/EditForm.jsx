import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
import RaisedButton from 'material-ui/RaisedButton';
import AutoComplete from 'material-ui/AutoComplete';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import ContentLink from 'material-ui/svg-icons/content/link';
import keys from 'object-keys';

import { updateMappingData} from '../../../reducers/database.js';


class EditForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText_Platform: '',
            searchText_SrcTable: '',
            searchText_DstTable: '',
            searchText_SrcColumn: '',
            searchText_DstColumn: '',
            searchText_UpdateRule: '',
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.selectedRow && this.props.selectedRow != nextProps.selectedRow) {
            let row = nextProps.selectedRow;
            if (row.源平台名 && row.源表名 && row.目的表名 && row.源列名 && row.目的列名 && row.更新策略) {
                this.setState({
                    searchText_Platform: row.源平台名,
                    searchText_SrcTable: row.源表名,
                    searchText_DstTable: row.目的表名,
                    searchText_SrcColumn: row.源列名,
                    searchText_DstColumn: row.目的列名,
                    searchText_UpdateRule: row.更新策略
                });
            }
        }
        else if(nextProps.deleteResult && this.props.deleteResult != nextProps.deleteResult){
            const {success,error} = nextProps.deleteResult;
            this._handleUpdate_Clear();
        }
    }

    _handleUpdate_Clear = ()=> {
        this.setState({
            searchText_Platform: '',
            searchText_SrcTable: '',
            searchText_DstTable: '',
            searchText_SrcColumn: '',
            searchText_DstColumn: '',
            searchText_UpdateRule: ''
        });
    }

    _handleUpdate_Update = ()=> {
        const {srcPlatforms,dstTables,updateRules} = this.props;
        const {searchText_Platform,searchText_SrcTable,searchText_DstTable,
            searchText_SrcColumn,searchText_DstColumn,searchText_UpdateRule} = this.state;
        const updateData = Object.assign({}, this.state, {
            platformId: srcPlatforms[searchText_Platform].platformId,
            updateRuleId: updateRules[searchText_UpdateRule].ruleId,
            srcTableId: srcPlatforms[searchText_Platform].tables[searchText_SrcTable].tableId,
            srcColumnId: srcPlatforms[searchText_Platform].tables[searchText_SrcTable].columns[searchText_SrcColumn].columnId,
            dstTableId: dstTables[searchText_DstTable].tableId,
            dstColumnId: dstTables[searchText_DstTable].columns[searchText_DstColumn].columnId,
            srcColumnTypeId: srcPlatforms[searchText_Platform].tables[searchText_SrcTable].columns[searchText_SrcColumn].columnTypeId,
            dstColumnTypeId: dstTables[searchText_DstTable].columns[searchText_DstColumn].columnTypeId,
            //configTableId: uuid.v4(),
            //configId: uuid.v4(),
        });

        this.props.dispatch(updateMappingData(updateData));
    }

    onChange_AutoComplete_Platform = (object, index, value)=> {
        this.setState({searchText_Platform: value});
    }
    onChange_AutoComplete_SrcTable = (object, index, value)=> {
        this.setState({searchText_SrcTable: value});
    }
    onChange_SelectField_SrcColumn = (object, index, value)=> {
        this.setState({searchText_SrcColumn: value});
    }

    onChange_AutoComplete_DstTable = (object, index, value)=> {
        this.setState({searchText_DstTable: value});
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
                //margin: '0 30px',//this.context.muiTheme.spacing.desktopGutter,
                display: 'flex',
                justifyContent: 'center'
            },
            card: {
                width: '45%',
                margin: '10 20px'
            },
            buttons: {
                margin: '-10 0 30 0',
                display: 'flex',
                justifyContent: 'center'
            },
            button: {
                margin: '0 20 0 20',
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
        let srcTableList = searchText_Platform != '' ? keys(srcPlatforms[searchText_Platform].tables) : [];
        let dstTableList = keys(dstTables);

        let srcColumnList = (searchText_Platform == '' || searchText_SrcTable == '') ? [] : keys(srcPlatforms[searchText_Platform].tables[searchText_SrcTable].columns);
        let dstColumnList = (searchText_DstTable == '') ? [] : keys(dstTables[searchText_DstTable].columns);


        return (
            <div>
                <div style={styles.content}>
                    <Card style={styles.card} zDepth={0}>
                        <CardHeader
                            titleStyle={{color:this.context.muiTheme.palette.primary1Color}}
                            title="源表信息"
                        />
                        <CardText>
                            <SelectField
                                style={{marginTop:-40}}
                                fullWidth={true}
                                hintText='平台名称'
                                floatingLabelText='平台名称'
                                hintStyle={styles.hintStyle}
                                underlineStyle={styles.underlineStyle}
                                underlineFocusStyle={styles.underlineFocusStyle}
                                onChange={this.onChange_AutoComplete_Platform}
                                value={searchText_Platform}
                            >
                                {
                                    platformList.map((item, key)=>
                                        <MenuItem key={key} value={item} primaryText={item}/>
                                    )
                                }
                            </SelectField>
                            <SelectField
                                fullWidth={true}
                                hintText='表名称'
                                floatingLabelText='表名称'
                                hintStyle={styles.hintStyle}
                                underlineStyle={styles.underlineStyle}
                                underlineFocusStyle={styles.underlineFocusStyle}
                                onChange={this.onChange_AutoComplete_SrcTable}
                                value={searchText_SrcTable}
                            >
                                {
                                    srcTableList.map((item, key)=>
                                        <MenuItem key={key} value={item} primaryText={item}
                                                  secondaryText={srcPlatforms[searchText_Platform].tables[item].comment}/>
                                    )
                                }
                            </SelectField>
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
                                        srcPlatforms[searchText_Platform].tables[searchText_SrcTable].columns[item].configId == '' ?
                                            <MenuItem key={key} value={item} primaryText={item}
                                                      secondaryText={srcPlatforms[searchText_Platform].tables[searchText_SrcTable].columns[item].columnTypeName}/>
                                            :
                                            <MenuItem key={key} value={item} primaryText={item}
                                                      leftIcon={<ContentLink />}
                                                      secondaryText={srcPlatforms[searchText_Platform].tables[searchText_SrcTable].columns[item].columnTypeName}/>
                                    )
                                }
                            </SelectField>
                        </CardText>
                    </Card>

                    <Card style={styles.card} zDepth={0}>
                        <CardHeader
                            titleStyle={{color:this.context.muiTheme.palette.primary1Color}}
                            title="源表信息"
                        />
                        <CardText>
                            <SelectField
                                style={{marginTop:-40}}
                                //listStyle={{maxHeight:385,width:300}}
                                fullWidth={true}
                                hintText='表名称'
                                floatingLabelText='表名称'
                                hintStyle={styles.hintStyle}
                                underlineStyle={styles.underlineStyle}
                                underlineFocusStyle={styles.underlineFocusStyle}
                                onChange={this.onChange_AutoComplete_DstTable}
                                value={searchText_DstTable}
                            >
                                {
                                    dstTableList.map((item, key)=>
                                        <MenuItem key={key} value={item} primaryText={item}
                                                  secondaryText={dstTables[item].comment}/>
                                    )
                                }
                            </SelectField>
                            <SelectField
                                value={ searchText_DstColumn }
                                floatingLabelText="列名称"
                                hintText='列名称'
                                onChange={ this.onChange_SelectField_DstColumn }
                                hintStyle={styles.hintStyle}
                                underlineStyle={styles.underlineStyle}
                                underlineFocusStyle={styles.underlineFocusStyle}
                                fullWidth={ true }
                            >
                                {
                                    dstColumnList.map((item, key)=>
                                        dstTables[searchText_DstTable].columns[item].configId == '' ?
                                            <MenuItem key={key} value={item} primaryText={item}
                                                      secondaryText={dstTables[searchText_DstTable].columns[item].columnTypeName}/>
                                            :
                                            <MenuItem key={key} value={item} primaryText={item}
                                                      leftIcon={<ContentLink />}
                                                      secondaryText={dstTables[searchText_DstTable].columns[item].columnTypeName}/>
                                    )
                                }
                            </SelectField>
                            <SelectField
                                value={ searchText_UpdateRule }
                                floatingLabelText="更新策略"
                                hintText="更新策略"
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
                        onTouchTap={this._handleUpdate_Update}
                        disabled={
                                searchText_Platform== ""
                              ||searchText_SrcTable== ""
                              ||searchText_DstTable== ""
                              ||searchText_SrcColumn== ""
                              ||searchText_DstColumn== ""
                              ||searchText_UpdateRule== ""
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
                    <RaisedButton
                        style={styles.button}
                        label="Refresh"
                        secondary={false}
                        onTouchTap={this.props.handleRefresh}
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
    dispatch:PropTypes.func.isRequired,
};

EditForm.propTypes = {
    srcPlatforms: React.PropTypes.object,
    dstTables:React.PropTypes.object,
    updateRules:React.PropTypes.object,
};

const mapStateToProps = (state) => {
    const { databaseReducer } = state;
    return {
        deleteResult:databaseReducer.deleteResult,
    };
};

export default connect(
    mapStateToProps
)(EditForm)


