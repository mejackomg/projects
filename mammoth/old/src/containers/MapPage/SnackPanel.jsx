/**
 * Created by apple-pc on 16/4/1.
 */

import React, {Component, PropTypes} from 'react';
import Transitions from '../../../node_modules/material-ui/styles/transitions';
import {List,ListItem} from 'material-ui/List';
import ActionInfo from '../../../node_modules/material-ui/svg-icons/action/info';
import ActionAssignment from '../../../node_modules/material-ui/svg-icons/action/assignment';
import EditorInsertChart from '../../../node_modules/material-ui/svg-icons/editor/insert-chart';
import Avatar from 'material-ui/Avatar';
import {blue500, yellow600} from '../../../node_modules/material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton';

import IconButtom from '../../../node_modules/material-ui/svg-icons/navigation/more-horiz';


class SnackPanel extends Component{
  constructor(props) {
    super(props);
    this.state={
      height:160,
      open: true,
    }
  }

  onActionTouchTap=()=>{
    const {open}=this.state;
    this.setState({open:!open});
  }

  render() {
    const {
      open,
      } = this.state;

    const styles = {
      root: {
        zIndex:3,
        position: 'fixed',
        left: 300,
        display: 'flex',
        right: 300,
        top: 0,
        //zIndex: this.state.muiTheme.zIndex.snackbar,
        visibility: 'visible',
        transform: open ?'translate3d(0, 0, 0)':'translate3d(0, -'+(this.state.height)+'px, 0)',
        transition:
        Transitions.easeOut('400ms', 'transform')
        //+ ',' + Transitions.easeOut('400ms', 'visibility'),
      },
      body: {
        backgroundColor: 'rgba(50,50,50,0.5)',//'transparent',
        padding: '0px',
        height: this.state.height,
        //width:'40%',
        //lineHeight: desktopSubheaderHeight + 'px',
        borderRadius: 2,
        flexGrow: 0,
        margin: 'auto',
      },
      content: {
        //opacity: open?1:0,
        //transition: open?Transitions.easeOut('500ms', 'opacity', '100ms'):Transitions.easeOut('400ms', 'opacity'),
      },

      listItem: {
        //fontSize: 16,
        //lineHeight: '8px',
        color:'rgba(120,120,120,1)',
        height:72,
      },
      icons: {
      //    height: 18,
      //    width: 18,
      //    display: 'block',
      //    //position: 'relative',//'absolute',
      //    //top: twoLine ? 12 : singleAvatar ? 4 : 0,
      //    marginTop: -12,
      //    marginLeft:25
      },
      button: {
        //marginLeft:'calc(50% - 40px)',
        //marginTop:-10,
        marginBottom:-10,
        height:14,
        //lineHeight:1,
        fontSize:4,
        width:'100%'
        //fontWeight:500
      }
    }

    return (
      <div style={styles.root}>
        <div style={styles.body}>
          <div style={styles.content}>
            {this.props.children}
            <List style={{height:this.props.height,overflowY: 'auto'}}>
              <ListItem
                  style={styles.listItem}
                  leftAvatar={<Avatar icon={<ActionAssignment />} backgroundColor={blue500} />}
                  rightIcon={<ActionInfo />}
                  primaryText="Trojan-Downloader.Win32.Ani"
                  secondaryText="2016-4-13"
                  />
              <ListItem
                  style={styles.listItem}
                  leftAvatar={<Avatar icon={<EditorInsertChart />} backgroundColor={yellow600} />}
                  rightIcon={<ActionInfo />}
                  primaryText="Worm.Lovgate"
                  secondaryText="2016-4-14"
                  />
            </List>

            <FlatButton  primary={true} style={styles.button}
                         onTouchTap={this.onActionTouchTap}
                         icon={<IconButtom viewBox="0 6 20 20" />}
            />
          </div>
        </div>
      </div>
    );
  }
}

SnackPanel.propTypes = {
  bodyStyle: React.PropTypes.object,
};

export default SnackPanel;
