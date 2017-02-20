import React, { Component, PropTypes } from 'react';

import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import AutoComplete from 'material-ui/AutoComplete';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import {Tabs, Tab} from 'material-ui/Tabs';
import SearchIcon from 'material-ui/svg-icons/action/search';
import CloseIcon from 'material-ui/svg-icons/navigation/close';
import withWidth, {LARGE, MEDIUM,SMALL}  from 'material-ui/utils/withWidth';
import {
    colors,
    spacing,
    typography
} from 'material-ui/styles';

class SearchBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dataSource:[]
        };
    }

    getContent()
    {
        return [
            '寻龙诀','心花路放','分手大师','后会无期','痞子英雄之全面开战','杀生','追爱大布局','推拿','等一个人咖啡',
            '男人不可以穷','青蛙王国','不再说分手'
        ];
    }


    getStyles()
    {
        const styles = {
            paper: {
                zIndex: this.context.muiTheme.zIndex.appBar-1,
                position:'fixed',
                left:0,
                top:this.context.muiTheme.spacing.desktopKeylineIncrement+this.context.muiTheme.palette.desktopSubheaderHeight,
                width:'100%'
                //display: 'inline-block',
                //float: 'left',
                //margin: '16px 32px 16px 0',
            },
            content: {
                textColor: this.context.muiTheme.palette.accent3Color,
            },
            underlineStyle: {
                borderColor: this.context.muiTheme.palette.alternateTextColor,
            },
            hintStyle: {
                color: this.context.muiTheme.palette.accent3Color,
            },
            underlineFocusStyle:{
                borderColor: this.context.muiTheme.palette.alternateTextColor//primary1Color
            },
        };

        return styles;
    }

    render() {
        const styles = this.getStyles( )
        this.state.dataSource=this.getContent();
        let {
            dataSource,
            } = this.state

        if (this.props.width == LARGE) {
            styles.paper.left = 240;
            styles.paper.width = 'calc(100% - 240px)'
        }
        else{
            styles.paper.left = 0
            styles.paper.width = '100%'
        }

        return (
           <div>
                <div style={{ float:'left'}}>
                    <IconButton  onTouchTap={this.props.advancedSearch}>
                        <SearchIcon color={colors.grey500} />
                    </IconButton>
                </div>
               <div style={{ float:'left',marginLeft:10,width:140}}>
                   <AutoComplete
                       style={styles.content}
                       fullWidth={true}
                       hintText="Search"
                       filter={AutoComplete.fuzzyFilter}
                       dataSource={dataSource}
                       maxSearchResults={5}
                       hintStyle={styles.hintStyle}
                       underlineStyle={styles.underlineStyle}
                       underlineFocusStyle={styles.underlineFocusStyle}
                       />
               </div>
               {/* <div style={{ float:'right',marginRight:50}}>
                   <IconButton>
                       <CloseIcon color={colors.grey500}/>
                   </IconButton>
               </div>*/}
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

