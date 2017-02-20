import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import SplitPane from 'react-split-pane'
import Chart_Line from './../Charts/NVD3/Chart_Line.jsx'
import Chart_DiscreteBar from './../Charts/NVD3/Chart_DiscreteBar.jsx'
import Table_Bottom from './Table_Bottom.jsx'

var temp=0;

class BottomChartPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chartWidth_1: 250,
            chartWidth_2: localStorage.getItem('splitPos2')?parseInt(localStorage.getItem('splitPos2')):300,
            dragStarted_2:false
        };
        this.onChangeSplitPane_1 = this.onChangeSplitPane_1.bind(this);
        this.onChangeSplitPane_2 = this.onChangeSplitPane_2.bind(this);

    }

    getChildContext( )
    {
        return ( {
            muiTheme: this.context.muiTheme,
        } );
    }

    onChangeSplitPane_1=(size)=>{}

    onChangeSplitPane_2=(size)=>{
        temp=size;
    }

    onUpdateSplitPane_1=()=>{}

    onDragStartedSplitPane_2=()=>{
        this.setState({
            dragStarted_2:true
        });
    }
    onDragFinishedSplitPane_2=()=>{
        this.setState({
            chartWidth_2: temp,
            dragStarted_2:false
        });
        localStorage.setItem('splitPos2', temp);
    }

    //render() {
    //    return (
    //        <SplitPane
    //            split="vertical"
    //            minSize={250}
    //            defaultSize={ localStorage.getItem('splitPos1')?parseInt(localStorage.getItem('splitPos1')): this.state.chartWidth_1}
    //            onChange={this.onChangeSplitPane_1}
    //            onDragFinished={this.onUpdateSplitPane_1}>
    //            <Chart_DiscreteBar width={this.state.chartWidth_1} height={this.props.panelHeight}/>
    //
    //            <SplitPane
    //                split="vertical"
    //                minSize={300}
    //                defaultSize={ localStorage.getItem('splitPos2')?parseInt(localStorage.getItem('splitPos2')): this.state.chartWidth_2}
    //                onChange={this.onChangeSplitPane_2}
    //                onDragFinished={this.onUpdateSplitPane_2}
    //            >
    //                <Chart_Line width={this.state.chartWidth_2} height={this.props.panelHeight}/>
    //                <Table_Bottom />
    //            </SplitPane>
    //        </SplitPane>
    //    );
    //}
    render() {
        const {chartWidth_2,dragStarted_2}=this.state;//parseInt(localStorage.getItem('splitPos2'));


        return (
            <SplitPane
                split="vertical"
                minSize={300}
                defaultSize={chartWidth_2}
                onChange={this.onChangeSplitPane_2}
                onDragStarted={this.onDragStartedSplitPane_2}
                onDragFinished={this.onDragFinishedSplitPane_2}
                >
                <Chart_Line width={chartWidth_2} height={this.props.height} dragStarted={dragStarted_2}/>
                <Table_Bottom width={this.props.width-chartWidth_2} height={this.props.height} />
            </SplitPane>
        );
    }
}

BottomChartPanel.contextTypes = {
    muiTheme: React.PropTypes.object,
}

BottomChartPanel.childContextTypes = {
    muiTheme: React.PropTypes.object,
};

BottomChartPanel.propTypes = {
    panelHeight: PropTypes.number.isRequired,
    width:PropTypes.number.isRequired,
    height:PropTypes.number.isRequired,
};

const mapStateToProps = (state) => {
    //const { layoutReducer } = state;
    return {
        //panelVisible:layoutReducer.panelVisible,
    };
};

export default connect(
    mapStateToProps
)(BottomChartPanel);