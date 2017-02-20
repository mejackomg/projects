
import React from 'react';

import {Link} from 'react-router';
import Paper from 'material-ui/Paper'
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import ECharts from 'react-echarts';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import {Tabs, Tab} from 'material-ui/Tabs';

import {
    colors,
    spacing,
    typography
} from 'material-ui/styles';

import Statistics_Part from './Statistics_Part.jsx'

const styles = {

};

export default class CompositeValue extends React.Component {

    render() {
        return (
            <div style={{marginTop:0}}>
                <Toolbar>
                    <ToolbarGroup>
                        <ToolbarTitle text="今日大盘：4091.5万"/>
                    </ToolbarGroup>
                </Toolbar>
                <Tabs tabItemContainerStyle={{backgroundColor: 'transparent'}}
                      contentContainerStyle={{height:880}}>
                    <Tab label="实时票房">
                        <Statistics_Part/>
                    </Tab>
                    <Tab label="单周票房">
                        <div>
                            <Statistics_Part/>
                        </div>
                    </Tab>
                    <Tab label="周末票房">
                        <div>
                            <Statistics_Part/>
                        </div>
                    </Tab>
                    <Tab label="单月票房">
                        <div>
                            <Statistics_Part/>
                        </div>
                    </Tab>
                    <Tab label="年度票房">
                        <div>
                            <Statistics_Part/>
                        </div>
                    </Tab>
                    <Tab label="全球票房">
                        <div>
                            <Statistics_Part/>
                        </div>
                    </Tab>
                </Tabs>


                <div style={{width:'100%',height:500,marginTop:50}}>
                    <Toolbar>
                        <ToolbarGroup>
                            <ToolbarTitle text="票房榜单"/>
                        </ToolbarGroup>
                    </Toolbar>
                    <Tabs tabItemContainerStyle={{backgroundColor: 'transparent'}}
                          contentContainerStyle={{height:350}}>
                        <Tab label="影片榜单">
                            <div>

                            </div>
                        </Tab>
                        <Tab label="大盘榜单">
                            <div>

                            </div>
                        </Tab>
                    </Tabs>
                </div>
            </div>
        );
    }
}
