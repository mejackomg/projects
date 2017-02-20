import React, { Component, PropTypes } from 'react';

import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import AutoComplete from 'material-ui/AutoComplete';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import {Tabs, Tab} from 'material-ui/Tabs';
import SearchIcon from 'material-ui/svg-icons/action/search';
import CloseIcon from 'material-ui/svg-icons/navigation/close';
import keys from 'object-keys';

import withWidth, {LARGE, MEDIUM,SMALL}  from 'material-ui/utils/withWidth';
import {
    colors,
    spacing,
    typography
} from 'material-ui/styles';

var castsData = require('../../../../../Data/cast.json');
var casts;

class SearchBar extends Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    }

    getContent()
    {
        return keys(casts);
    }


    render() {
        casts = castsData[this.props.catalogue];

        return (
            <div>
                <AutoComplete
                    //style={styles.content}
                    //fullWidth={true}
                    floatingLabelText="演员"
                    hintText="Search"
                    filter={AutoComplete.noFilter}//.fuzzyFilter}
                    dataSource={this.getContent()}
                    //maxSearchResults={5}
                    openOnFocus={true}
                    //hintStyle={styles.hintStyle}
                    //underlineStyle={styles.underlineStyle}
                    //underlineFocusStyle={styles.underlineFocusStyle}
                    />
            </div>
        );
    }
}


SearchBar.contextTypes = {
    muiTheme: React.PropTypes.object,
}


SearchBar.propTypes = {
    //width:PropTypes.number.isRequired,
    //height:PropTypes.number.isRequired,
    advancedSearch:PropTypes.func
};

export default withWidth( )(SearchBar);

