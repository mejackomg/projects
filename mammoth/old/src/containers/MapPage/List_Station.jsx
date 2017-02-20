import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import {List,ListItem} from 'material-ui/List';
//import Divider from 'material-ui/divider';
import ActionGrade from '../../../node_modules/material-ui/svg-icons/action/grade';
import ContentInbox from '../../../node_modules/material-ui/svg-icons/content/inbox';
import Subheader from 'material-ui/Subheader';

class StationList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isVisible: true,
        };
    }

    getChildContext( )
    {
        return ( {
            muiTheme: this.context.muiTheme,
        } );
    }

    render() {
        const styles = {
            list:{
                overflowY: 'auto',
                height:'calc(100% - 80px)',
    },
            listItem: {
                fontSize: 14,
                lineHeight: '4px',
                color:'rgba(125,125,120,8)',
                height:34,
            },
            icons: {
                height: 18,
                width: 18,
                display: 'block',
                //position: 'relative',//'absolute',
                //top: twoLine ? 12 : singleAvatar ? 4 : 0,
                marginTop: 9,
                marginLeft:25
            },
        }

        return (
            <div>
                <List style={styles.list}>
                    {/*<Subheader style={{
                        textAlign:'center',
                        background:'linear-gradient(to bottom, rgba(100,100,100,0.4) 0%,rgba(100,100,100,0.2) 70%,rgba(100,100,100,0) 100%)'
                    }}>
                        网络节点
                    </Subheader>*/}
                    <ListItem style={styles.listItem} primaryText="总部" leftIcon={<ActionGrade style={styles.icons}/>} />
                    <ListItem
                        style={styles.listItem}
                        primaryText="华北中心"
                        leftIcon={<ActionGrade style={styles.icons}/>}
                        initiallyOpen={true}
                        primaryTogglesNestedList={true}
                        nestedItems={[
                          <ListItem
                            key={1}
                            style={styles.listItem}
                            primaryText="天津分部"
                            leftIcon={<ContentInbox style={styles.icons}/>}
                          />,
                          <ListItem
                            key={2}
                            style={styles.listItem}
                            primaryText="石家庄分部"
                            leftIcon={<ContentInbox style={styles.icons}/>}
                            //disabled={true}
                          />,
                        ]}
                    />
                    <ListItem
                        style={styles.listItem}
                        primaryText="东北中心"
                        leftIcon={<ActionGrade style={styles.icons}/>}
                        initiallyOpen={true}
                        primaryTogglesNestedList={true}
                        nestedItems={[
                          <ListItem
                            key={1}
                            style={styles.listItem}
                            primaryText="长春分部"
                            leftIcon={<ContentInbox style={styles.icons}/>}
                          />,
                          <ListItem
                            key={2}
                            style={styles.listItem}
                            primaryText="大连分部"
                            leftIcon={<ContentInbox style={styles.icons}/>}
                            //disabled={true}
                          />,
                           <ListItem
                            key={3}
                            style={styles.listItem}
                            primaryText="哈尔滨分部"
                            leftIcon={<ContentInbox style={styles.icons}/>}
                            //disabled={true}
                          />,
                        ]}
                        />
                    <ListItem style={styles.listItem} primaryText="华中中心" leftIcon={<ActionGrade style={styles.icons}/>} />
                    <ListItem style={styles.listItem} primaryText="华东中心" leftIcon={<ActionGrade style={styles.icons}/>} />
                    <ListItem
                        style={styles.listItem}
                        primaryText="华南中心"
                        leftIcon={<ActionGrade style={styles.icons}/>}
                        initiallyOpen={true}
                        primaryTogglesNestedList={true}
                        nestedItems={[
                          <ListItem
                            key={1}
                            style={styles.listItem}
                            primaryText="长沙分部"
                            leftIcon={<ContentInbox style={styles.icons}/>}
                          />,
                          <ListItem
                            key={2}
                            style={styles.listItem}
                            primaryText="南宁分部"
                            leftIcon={<ContentInbox style={styles.icons}/>}
                            //disabled={true}
                          />,
                           <ListItem
                            key={3}
                            style={styles.listItem}
                            primaryText="昆明分部"
                            leftIcon={<ContentInbox style={styles.icons}/>}
                            //disabled={true}
                          />,
                        ]}
                        />
                </List>
            </div>
        );
    }
}

StationList.contextTypes = {
    muiTheme: React.PropTypes.object,
}

StationList.childContextTypes = {
    muiTheme: React.PropTypes.object,
};

StationList.propTypes = {
    panelVisible: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
    const { layoutReducer } = state;
    return {
        panelVisible:layoutReducer.panelVisible,
    };
};

export default connect(
    mapStateToProps
)(StationList);