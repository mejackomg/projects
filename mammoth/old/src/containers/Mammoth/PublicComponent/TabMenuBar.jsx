import React, { Component, PropTypes } from 'react';
import withWidth, {LARGE, MEDIUM,SMALL}  from 'material-ui/utils/withWidth';

import Paper from 'material-ui/Paper';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import {Tabs, Tab} from 'material-ui/Tabs';
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import IconButton from 'material-ui/IconButton';
import {Link} from 'react-router';
import Subheader from  'material-ui/Subheader'
import {
    colors,
    spacing,
    typography
} from 'material-ui/styles';

class TabMenuBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    getStyles() {
        const styles = {
            toolbar: {
                zIndex: this.context.muiTheme.zIndex.appBar,//-1,
                position: 'fixed',
                right: 0,
                top: this.context.muiTheme.spacing.desktopKeylineIncrement,
                width: '100%'
                //display: 'inline-block',
                //float: 'left',
                //margin: '16px 32px 16px 0',
            },
            tabs: {
                width: this.props.tabsWidth,
                backgroundColor: 'transparent',
            }
        };
// console.log(this.props.panelVisible);
        if (this.props.width >= LARGE && this.props.panelVisible) {
            styles.toolbar.width = 'calc(100% - 240px)'
        }
        return styles;
    }

    render() {
        const styles = this.getStyles();
        const {title,tabs,handleChange,isArrowBackShown,location: { pathname }} = this.props;
        let temp=pathname.split('/');
        let goBackPath=temp.slice(0,temp.length-1).join('/');

        return (
            <Paper style={styles.toolbar}>
                <Toolbar
                    style={{
                    backgroundColor:this.context.muiTheme.palette.alternateTextColor,
                    height:this.context.muiTheme.palette.desktopSubheaderHeight}}
                    >
                    <ToolbarGroup firstChild={false}>
                        {
                            isArrowBackShown &&
                            <IconButton style={{marginLeft:-14}}
                                        containerElement={<Link to={goBackPath} />}>
                                <ArrowBack color={this.context.muiTheme.palette.accent1Color} />
                            </IconButton>
                        }
                        <Subheader>{title}</Subheader>
                    </ToolbarGroup>
                    <ToolbarGroup>
                        {
                            tabs &&
                            <Tabs
                                tabItemContainerStyle={styles.tabs}
                                onChange={handleChange}
                                value={this.state.slideIndex}
                            >
                                {
                                    tabs.map((tab,key)=> <Tab key={key} label={tab} value={key}/>)
                                }
                            </Tabs>
                        }

                    </ToolbarGroup>
                    <ToolbarGroup />
                </Toolbar>
            </Paper>
        );
    }
}
TabMenuBar.propTypes = {
    isArrowBackShown:React.PropTypes.bool.isRequired
};
TabMenuBar.contextTypes = {
    muiTheme: React.PropTypes.object,
}

export default TabMenuBar;

