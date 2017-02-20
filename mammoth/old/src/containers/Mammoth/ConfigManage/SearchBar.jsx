import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import AutoComplete from 'material-ui/AutoComplete';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import {Tabs, Tab} from 'material-ui/Tabs';
import FilterIcon from 'material-ui/svg-icons/content/filter-list.js';
import CloseIcon from 'material-ui/svg-icons/navigation/close';

import {
    colors,
    spacing,
    typography
} from 'material-ui/styles';

class SearchBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
        };
    }

    //getContent() {
    //    let list = [];
    //    this.props.mappingData.forEach((row, index) => {
    //        if(row.源表名) {
    //            if (list.indexOf(row.源表名) == -1)
    //                list.push(row.源表名)
    //        }
    //    });
    //    return list;
    //}

    getStyles() {
        const styles = {
            content: {
                textColor: this.context.muiTheme.palette.accent3Color,
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
        };

        return styles;
    }

    render() {
        const styles = this.getStyles()

        return (
            <ToolbarGroup firstChild={true} style={{width:200}}>
                <IconButton>
                    <FilterIcon color={this.context.muiTheme.palette.accent1Color}/>
                </IconButton>
                <AutoComplete
                    style={styles.content}
                    listStyle={{maxHeight:385,width:300}}
                    fullWidth={true}
                    openOnFocus={true}
                    hintText={this.props.hintText}
                    filter={AutoComplete.fuzzyFilter}
                    dataSource={this.props.data}
                    //maxSearchResults={5}
                    hintStyle={styles.hintStyle}
                    underlineStyle={styles.underlineStyle}
                    underlineFocusStyle={styles.underlineFocusStyle}
                    onNewRequest={this.props.onNewRequest}
                    //onUpdateInput={this.props.onUpdateInput}
                    searchText={this.props.searchText}
                    />
                {
                    this.props.showCloseButton &&
                    <IconButton tooltip="清除" onTouchTap={this.props.clearSearch}>
                        <CloseIcon color={this.context.muiTheme.palette.accent1Color}/>
                    </IconButton>
                }
            </ToolbarGroup>

        );
    }
}

SearchBar.contextTypes = {
    muiTheme: React.PropTypes.object,
}


SearchBar.propTypes = {
    data: PropTypes.array.isRequired,
    showCloseButton:PropTypes.bool.isRequired,
    searchText:PropTypes.string.isRequired,
    clearSearch:PropTypes.func,
    onNewRequest:PropTypes.func,
    //onUpdateInput:PropTypes.func
};

export default SearchBar;
