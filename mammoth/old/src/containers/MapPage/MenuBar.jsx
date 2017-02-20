/**
 * Created by apple-pc on 16/4/1.
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import screenfull from 'screenfull';

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconFullScreen from '../../../node_modules/material-ui/svg-icons/navigation/fullscreen';
import IconFullScreenExit from '../../../node_modules/material-ui/svg-icons/navigation/fullscreen-exit';
import IconPanelIn from '../../../node_modules/material-ui/svg-icons/editor/format-indent-increase';
import IconPanelOut from '../../../node_modules/material-ui/svg-icons/editor/format-indent-decrease';
import IconSettings from '../../../node_modules/material-ui/svg-icons/action/settings';
import IconMapShift from '../../../node_modules/material-ui/svg-icons/maps/map';
import Badge from 'material-ui/Badge';
import NotificationsIcon from '../../../node_modules/material-ui/svg-icons/social/notifications';

import { setPanelVisible} from '../../actions/layout';

import {
  Colors,
  Spacing,
  Typography,
} from 'material-ui/styles';

class MenuBar extends Component {
  constructor(props) {
      super(props);
      this.state={
          fullScreen:false
      }
      this.onTouchTap_PanelVisible = this.onTouchTap_PanelVisible.bind(this);
      this.onTouchTap_FullScreen = this.onTouchTap_FullScreen.bind(this);
      this.onChangeFullscreen = this.onChangeFullscreen.bind(this);

  }

  componentDidMount(){
    var enabled = screenfull.enabled;

    if (enabled) {
        document.addEventListener(screenfull.raw.fullscreenchange, this.onChangeFullscreen);

        this.setState({
            fullScreen: screenfull.isFullscreen,
        });
    }
  }

  onChangeFullscreen(){
    this.setState({
        fullScreen: screenfull.isFullscreen,
    });
  }

  onTouchTap_PanelVisible(){
      const { panelVisible,dispatch } = this.props;
      dispatch(setPanelVisible(!panelVisible));

      localStorage.setItem('panelVisible', !panelVisible);
  }

  onTouchTap_FullScreen(){
      const { fullScreen } = this.state;
      //this.setState({fullScreen:!fullScreen});

      fullScreen ? this.exitFullscreen() : this.requestFullscreen();

  }

  requestFullscreen(ref) {
    if (ref && ref.getDOMNode) {
        var elem = ref.getDOMNode();
        screenfull.request(elem);
    } else {
        screenfull.request();
    }
  }

  exitFullscreen() {
    screenfull.exit();
  }

  getStyles() {
    //const {
    //  panelHeight,
    //  } = this.props;

    const styles = {
      //root: {
      //  position: 'fixed',
      //  left: 0,
      //  display: 'flex',
      //  right: 0,
      //  bottom: 0,
      //  //zIndex: this.state.muiTheme.zIndex.snackbar,
      //  visibility: 'hidden',
      //  transform: 'translate3d(0, ' + panelHeight + 'px, 0)',
      //  transition:
      //  Transitions.easeOut('400ms', 'transform') + ',' +
      //  Transitions.easeOut('400ms', 'visibility'),
      //},
    };

    return styles;
  }

  render() {
    const {panelVisible} = this.props;
    const {fullScreen} = this.state;

    return (
      <AppBar
        title="智能云安全"
        titleStyle={{color:'#18FFFF',fontSize:18}}
        style={{
            zIndex:2,
            backgroundColor:'transparent',
            position:'absolute',top:0,left:0,
            color:'rgba(255, 255, 225, 0.870588)',
            width:'calc(100% - 4px)'//window.innerWidth-10
            //background: this.state.isFixedToTop?'':`url(${pictureURL1}) center / cover`,
            //background:"linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)",
            //boxShadow:this.state.isFixedToTop?null:'0 1px 6px rgba(0,0,0,0.12), 0 1px 4px rgba(0,0,0,0.12)'
          }}
        //title={<span style={styles.title}>Title</span>}
        iconElementLeft={
              /*<div style={{marginTop:6}}>
              <div>
                <IconButton onTouchTap={ this._handle_onTouchTap_NavigationToggle }><ActionList color={Colors.white}/></IconButton>
              </div>*/
              <div style={{marginTop:2,marginLeft:10,cursor: 'pointer'}} >
                <img style={{ height:40, marginLeft:5}} src='logo.png' />
              </div>
            }
        //onLeftIconButtonTouchTap={this._handle_onTouchTap_NavigationToggle}
        iconElementRight={
             <div>
                <Badge
                  badgeContent={4}
                  primary={true}
                  badgeStyle={{top: 20, right: 50,height:16,width:16,fontSize:8}}
                  style={{marginTop:-26,marginRight:-38}}
                >
                  <IconButton tooltip="Notifications">
                    <NotificationsIcon color='rgba(255, 255, 225, 1)' viewBox="-3 -2 30 30"/>
                  </IconButton>
                </Badge>
                <IconButton tooltip="Map Shift"  style={{marginRight:-13}}>
                  <IconMapShift color='rgba(255, 255, 225,1)' viewBox="-3 -2 30 30" />
                </IconButton>
                <IconButton onTouchTap={ this.onTouchTap_PanelVisible} tooltip="Panel Docking"  style={{marginRight:-14}}>
                  {panelVisible?<IconPanelOut color='rgba(255, 255, 225, 1)' viewBox="-3 -2 30 30"/>:<IconPanelIn color='rgba(255, 255, 225, 1)' viewBox="-3 -2 30 30"/>}
                </IconButton>
                <IconButton onTouchTap={ this.onTouchTap_FullScreen} tooltip="Full Screen"  style={{marginRight:-15}}>
                  {fullScreen? <IconFullScreenExit color='rgba(255, 255, 225,1)' viewBox="-1 0 25 25"/>:<IconFullScreen color='rgba(255, 255, 225, 1)' viewBox="-1 0 25 25"/>}
                </IconButton>
                <IconButton tooltip="Settings"  style={{marginRight:-6}}>
                  <IconSettings color='rgba(255, 255, 225,1)' viewBox="-3 -2 30 30" />
                </IconButton>
             </div>
            }
        zDepth={0}
      />
    )
  }
}

MenuBar.propTypes = {
    panelVisible: PropTypes.bool.isRequired,
    dispatch:PropTypes.func.isRequired,
};

//MenuBar.contextTypes = {
//  router: PropTypes.object.isRequired,
//  store: PropTypes.object.isRequired,
//};

const mapStateToProps = (state) => {
    const { layoutReducer } = state;

    return {
        panelVisible:layoutReducer.panelVisible,
    };
};
export default connect(
    mapStateToProps
)(MenuBar);

