import React, { Component, PropTypes } from 'react';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import AutoComplete from 'material-ui/AutoComplete';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import {Tabs, Tab} from 'material-ui/Tabs';
import SearchIcon from 'material-ui/svg-icons/action/search';
import CloseIcon from 'material-ui/svg-icons/navigation/close';

import {
    colors,
    spacing,
    typography
} from 'material-ui/styles';

class ShopsSearchBar extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    getStyles() {
        const styles = {
            content: {
                textColor: this.context.muiTheme.palette.accent3Color,
            },
            underlineStyle: {
                borderColor: this.context.muiTheme.palette.accent1Color,//alternateTextColor,
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
            <ToolbarGroup firstChild={true} style={{width:250,zIndex: this.context.muiTheme.zIndex.appBar-1
                }}>
                <IconButton  onTouchTap={this.props.advancedSearch}>
                    <SearchIcon color={this.context.muiTheme.palette.accent1Color}/>
                </IconButton>

                <AutoComplete
                    style={styles.content}
                    fullWidth={true}
                    //openOnFocus={true}
                    hintText="Search"
                    filter={AutoComplete.fuzzyFilter}
                    dataSource={this.props.data}
                    listStyle={{maxHeight:385,width:300}}
                    maxSearchResults={100}
                    hintStyle={styles.hintStyle}
                    underlineStyle={styles.underlineStyle}
                    underlineFocusStyle={styles.underlineFocusStyle}
                    onNewRequest={this.props.onNewRequest}
                    onUpdateInput={this.props.onUpdateInput}
                    searchText={this.props.searchText}
                    />
                {
                    this.props.showCloseButton &&
                    <IconButton tooltip="清除结果" onTouchTap={this.props.clearSearch}>
                        <CloseIcon color={this.context.muiTheme.palette.accent1Color}/>
                    </IconButton>
                }
            </ToolbarGroup>

        );
    }
}

ShopsSearchBar.contextTypes = {
    muiTheme: React.PropTypes.object,
}

//
ShopsSearchBar.propTypes = {
    data: PropTypes.array.isRequired,
//     showCloseButton:PropTypes.bool.isRequired,
    searchText:PropTypes.string.isRequired,
//     advancedSearch:PropTypes.func,
//     clearSearch:PropTypes.func,
//     onNewRequest:PropTypes.func,
//     //onUpdateInput:PropTypes.func
};


export default ShopsSearchBar;
