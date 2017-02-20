import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import SwipeableViews from 'react-swipeable-views';

import ActiveTheme from '../../../mui-themes/active-theme.js';
import getMuiTheme from '../../../../node_modules/material-ui/styles/getMuiTheme';
import withWidth, {LARGE, MEDIUM,SMALL}  from '../../../utils/withWidth';
import Divider from 'material-ui/Divider';

import ECharts from '../../../components/ECharts';
import Chart from '../../../components/Chart';
import ReactEcharts from 'echarts-for-react';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import {Tabs, Tab} from 'material-ui/Tabs';
import {Card,CardHeader,CardText} from 'material-ui/Card';
import Paper from 'material-ui/Paper';

import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import DatePicker from 'material-ui/DatePicker';
import layoutConfig from '../../../../Data/layoutConfig.json'

import {
    colors,
    spacing,
    typography
} from 'material-ui/styles';
import { loadSaleAnalysis} from '../../../reducers/database.js';

class ReportSalesOverview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            name1:'16,247',
            name2:'16,287',
            Takeout:'15,852',
            arrival:'15,222',
            averagePrice:'123,234',
            user:'12,333',
            shop:'23,445'
        };
    }
    componentDidMount() {
        // const { dispatch , shopsId } = this.props;
        // // const {radioIndex} = this.state;
        // dispatch(loadSaleAnalysis(shopsId));
    }

    getStyles() {
        const styles = {
            content: {
                margin: this.context.muiTheme.spacing.desktopGutter,
                //marginBottom:0
            },

            contentWhenMedium: {
                margin: `${this.context.muiTheme.spacing.desktopGutter * 2}px  ${this.context.muiTheme.spacing.desktopGutter * 3}px`,
                //marginTop:this.context.muiTheme.spacing.desktopGutter
            },
        };

        // if (this.props.width === MEDIUM || this.props.width === LARGE)
        //     styles.content = Object.assign(styles.content, styles.contentWhenMedium);

        return styles;
    }

    handleChangeTotal=(value)=>{
        this.setState({value})
    }

    handleChange = (title,value) => {
        switch (title) {
            case '':

                break;
            case '':

                break;
        }
    }

    render() {
        const {value}=this.state;
        const styles = this.getStyles( );
        let data=[];
        if(layoutConfig['经营报告'] && layoutConfig['经营报告']['销售数据概况'])
            data=layoutConfig['经营报告']['销售数据概况'];

        return (
            <div style={styles.content}>
                <Toolbar style={{backgroundColor:'transparent'}}>
                    <ToolbarGroup>
                        <ToolbarTitle text="销售数据概况"/>
                    </ToolbarGroup>
                    <ToolbarGroup>
                        <DropDownMenu value={value} onChange={this.handleChangeTotal}
                                      underlineStyle={{borderColor:'transparent'}}
                                      labelStyle={{color:this.context.muiTheme.palette.accent1Color}}>
                            <MenuItem value={0} primaryText="按天"/>
                            <MenuItem value={1} primaryText="按周"/>
                            <MenuItem value={2} primaryText="按月"/>
                        </DropDownMenu>
                    </ToolbarGroup>
                </Toolbar>
                <div style={{padding:'0 20px 20px'}}>
                    <Divider />
                </div>
                <section style={{display:'flex',flexWrap:'wrap',justifyContent:'center'}}>
                    {data.map((value,index)=>
                        <Chart key={index} onChange={this.handleChange} data={value}/>
                    )}
                </section>

            </div>



        );


    }
}

ReportSalesOverview.propTypes = {
    dispatch:PropTypes.func.isRequired,
};

ReportSalesOverview.contextTypes = {
    muiTheme: React.PropTypes.object,
}

const mapStateToProps = (state) => {
    const { databaseReducer } = state;

    return {
        // SaleAnalysisDate: databaseReducer.SaleAnalysisDate
    };
};

export default connect(
    mapStateToProps
)(withWidth( )(ReportSalesOverview));

