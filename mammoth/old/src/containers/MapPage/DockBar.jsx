import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Dock from 'react-dock';

import StationList from './List_Station.jsx'
import BottomChartPanel from './BottomChartPanel.jsx'
import Chart_Pie from './../Charts/NVD3/Chart_Pie.jsx'
import Chart_HorizontalBar from './../Charts/NVD3/Chart_HorizontalBar.jsx'
import Chart_Radar from './../Charts/Chart_Radar.jsx'

const styles = {
    dockContent: {
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    },
}

const positions = ['left', 'top', 'right', 'bottom'];
const dimModes = ['transparent', 'none', 'opaque'];

class DockBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fluid: false,
            sizeLeft: localStorage.getItem('sizeLeft')?parseInt(localStorage.getItem('sizeLeft')):296,
            sizeRight: localStorage.getItem('sizeRight')?parseInt(localStorage.getItem('sizeRight')):200,
            sizeBottom: localStorage.getItem('sizeBottom')?parseInt(localStorage.getItem('sizeBottom')):200,
            bottomHeight:localStorage.getItem('bottomHeight')?parseInt(localStorage.getItem('bottomHeight')):200,
        };
    }

    getChildContext( )
    {
        return ( {
            muiTheme: this.context.muiTheme,
        } );
    }


    render() {
        const duration = 300;
        const bottomDockWidth = window.innerWidth-this.state.sizeLeft-1;
        const rightDockHeight='calc(100% - '+(this.state.bottomHeight+1)+'px)';

        return (
            <div>
                {/*         <Dock position='left'
                      size={this.state.sizeLeft}
                      dimMode='none'
                      zIndex={999}
                      isVisible={this.props.panelVisible}
                    //onVisibleChange={this.handleVisibleChange}
                      onSizeChange={this.handleSizeLeftChange}
                      fluid={this.state.fluid}
                    //dimStyle={{ background: 'rgba(0, 0, 100, 0.2)' }}
                      dockStyle={{background: 'rgba(220,30,30,0.4)',
                                  marginTop:1,marginBottom:2,
                                  height: 57}}
                      duration={duration}>
                </Dock>*/}

                <Dock position='left'
                      size={296}//{this.state.sizeLeft}
                      dimMode='none'
                      zIndex={1}
                      isVisible={true}//{this.props.panelVisible}
                      //onVisibleChange={this.handleVisibleChange}
                      //onSizeChange={this.handleSizeLeftChange}
                      fluid={this.state.fluid}
                      //dimStyle={{ background: 'rgba(0, 0, 100, 0.2)' }}
                      dockStyle={{background: 'rgba(20,30,50,0.5)'
                                  }}//height: window.innerHeight-this.state.bottomHeight}}
                      duration={duration}>
                    {({ position, isResizing, size, isVisible }) =>
                        <div>
                            <div style={{
                                height:60,
                                background: 'rgba(0,250,0,0.3)',
                            }} />
                            <Chart_Pie/>
                            <Chart_Radar />
                            <Chart_HorizontalBar height={window.innerHeight-580}/>
                        </div>
                    }
                </Dock>

                <Dock position='right'
                      size={this.state.sizeRight}
                      dimMode='none'
                      zIndex={1}
                      isVisible={this.props.panelVisible}
                    //onVisibleChange={this.handleVisibleChange}
                      onSizeChange={this.handleSizeRightChange}
                      fluid={this.state.fluid}
                    //dimStyle={{ background: 'rgba(0, 0, 100, 0.2)' }}
                      dockStyle={{background: 'rgba(20,30,50,0.5)',
                                  height:rightDockHeight}}
                      duration={duration}>
                    {({ position, isResizing, size, isVisible }) =>
                        <div>
                            <div style={{
                                height:60,
                                background: 'rgba(0,250,0,0.3)',
                            }} />
                            <StationList />
                        </div>
                    }
                </Dock>

                <Dock position='bottom'
                      size={this.state.sizeBottom}
                      dimMode='none'
                      isVisible={this.props.panelVisible}
                    //onVisibleChange={this.handleVisibleChange}
                      onSizeChange={this.handleSizeBottomChange}
                      fluid={this.state.fluid}
                    //dimStyle={{ background: 'rgba(0, 0, 100, 0.2)' }}
                      dockStyle={{background: 'rgba(20,30,50,0.5)',marginLeft:this.state.sizeLeft + 1,width:bottomDockWidth}}
                      duration={duration}>
                    {({ position, isResizing, size, isVisible }) =>
                        <BottomChartPanel panelHeight={size} width={bottomDockWidth} height={this.state.sizeBottom}/>
                    }
                </Dock>
            </div>
        );
    }
    /*                        <div style={[styles.dockContent]}>
     <div>Position: {position}</div>
     <div>Resizing: {isResizing ? 'true' : 'false'}</div>
     </div>*/

    handleSizeLeftChange = size => {
        this.setState({ sizeLeft:size});
        localStorage.setItem('sizeLeft', size);
    }

    handleSizeRightChange = size => {
        this.setState({ sizeRight:size});
        localStorage.setItem('sizeRight', size);
    }

    handleSizeBottomChange = size => {
        this.setState({ sizeBottom:size ,bottomHeight:size});
        localStorage.setItem('sizeBottom', size);
        localStorage.setItem('bottomHeight', size);
    }
}

DockBar.contextTypes = {
    muiTheme: React.PropTypes.object,
}

DockBar.childContextTypes = {
    muiTheme: React.PropTypes.object,
};

DockBar.propTypes = {
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
)(DockBar);