
import React from 'react';

import {Link} from 'react-router';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
// import ECharts from './ECharts/ECharts.js'//'react-echarts';
import ECharts from './../../../components/ECharts.js'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import {Tabs, Tab} from 'material-ui/Tabs';
import IconButton from 'material-ui/IconButton';
import ChevronRight from 'material-ui/svg-icons/navigation/chevron-right'
import Toggle from 'material-ui/Toggle';
import Paper from 'material-ui/Paper'
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

import {
    colors,
    spacing,
    typography
} from 'material-ui/styles';
import {fade} from 'material-ui/utils/colorManipulator';


class BoxOfficeMarket extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            isChart:true,
            tabIndex:0
        };
    }

    handleChange = (event, index, value) => this.setState({value});

    getData=(row, index)=>{
        const {data} = this.props;
        let temp=data.map(()=>'0');
        temp.splice(index, 1, parseInt(row['实时票房']) / 10000)

        return temp;
    };
    getOption() {
        const {data} = this.props;

        let option = null;
        if (data.length>0) {
            option = {
                // title: {
                //     text: '今日大盘',
                //     left: 'center',
                //     top:35
                // },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    },
                    formatter: function (params) {
                        // let temp='';
                        // params.forEach(param=>{
                        //     if(param.seriesName==param.name)
                        //         temp= param.name +  '<br/>' + param.value+ '万';
                        // })
                        // return temp;

                        if(params.seriesType=='radar'){

                        }
                    }
                },
                grid: {
                    left: '5%',
                    right: '15%',
                    top: 0,
                    bottom: '2%',
                    containLabel: true
                },
                xAxis: {
                    type: 'value',
                    //boundaryGap: [0, 0.01],
                    // min: 0,
                    // max: 3000,
                    position: 'top',
                    name: '万',
                    axisTick:{show:false},
                    //interval: 20000,
                },
                yAxis: {
                    type: 'category',
                    inverse: true,
                    axisTick:{show:false},
                    data: data.map(row=>row['中文名'].split('：')[0])
                },
                series: data.map((row, index)=> {
                    return {
                        name: row['中文名'],
                        type: 'bar',
                        stack: '1',
                        // itemStyle: {
                        //     normal: {
                        //         color: '#4FC3F7'
                        //     }
                        // },
                        label: {
                            normal: {
                                show: true,
                                position: 'right',
                                textStyle: {
                                    color: colors.grey500
                                },
                                formatter: function (params) {
                                    let temp='';
                                    if(params.value!=0)
                                        temp=params.value;
                                    return temp;
                                }
                            }
                        } ,
                        // barWidth: 10,
                        data: this.getData(row, index)
                    }
                })
            };
            option.series.push({
                name:'占比',
                type:'pie',
                radius: ['22%', '35%'],
                center: ['78.7%', '78%'],
                label: {
                    normal: {
                        show: false,
                        position: 'center'
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                tooltip : {
                    trigger: 'item',
                    formatter: "{b} <br/> {c}万 ({d}%)"
                },
                data:data.map(row=>{
                    return {value:parseInt(row['实时票房']), name:row['中文名']};
                })
            });
        }

        return option;
    }

    getStyle=()=>{
        const styles={
            thumbOff: {
                backgroundColor:  this.context.muiTheme.palette.accent1Color,
            },
            trackOff: {
                backgroundColor: 'gray',
            },
            thumbSwitched: {
                backgroundColor:  this.context.muiTheme.palette.accent1Color,
            },
            trackSwitched: {
                backgroundColor: 'gray',
            },
            labelStyle: {
                color: 'red',
            }
        }
       return styles;
    };

    onToggle=(event,value)=>{
        this.setState({isChart:!value})
    }

    handleChange_Tab=(value)=>{
        this.setState({tabIndex:value})
    }

    getWeekNum(dateStr) {
        var date1 = new Date(dateStr);//"2008/03/01")
        var date2 = new Date(date1.getFullYear(), 0, 1);
        var day1 = date1.getDay();
        if (day1 == 0) day1 = 7;
        var day2 = date2.getDay();
        if (day2 == 0) day2 = 7;
        var weekNum = Math.floor(((date1.getTime() - date2.getTime()) / (24 * 60 * 60 * 1000) + day2 - day1) / 7);
        var startDay = this.addDate(dateStr, 1 - day1);
        var endDay = this.addDate(dateStr, 7 - day1);
        return {
            weekNum: weekNum,
            startDay: startDay.getFullYear()+"-"+(startDay.getMonth()+1)+"-"+startDay.getDate(),
            endDay: endDay.getFullYear()+"-"+(endDay.getMonth()+1)+"-"+endDay.getDate()
        };
    }

    // getDateByWeekNum(year,weekNum) {
    //     var date2 = new Date(year, 0, 1);
    //     var day2 = date2.getDay();
    //     if (day2 == 0) day2 = 7;
    //     const startDay = new Date(date2.getTime() + (weekNum * 7 - day2 + 1) * 24 * 60 * 60 * 1000);
    //     const startDayStr = startDay.getFullYear() + "-" + (startDay.getMonth() + 1) + "-" + startDay.getDate();
    //     const endDay = this.addDate(startDayStr, 6);
    //     return {
    //         weekNum: weekNum,
    //         startDay: startDayStr,
    //         endDay: endDay.getFullYear() + "-" + (endDay.getMonth() + 1) + "-" + endDay.getDate()
    //     };
    // }

    addDate(dateStr,dadd){
        var a = new Date(dateStr);
        a = a.valueOf();
        a = a + dadd * 24 * 60 * 60 * 1000;
        a = new Date(a)
        return a;
    }

    getWeekList=()=>{
        let weekList=[];
        let currentWeekInfo=this.getWeekNum(new Date());
        let startDay=currentWeekInfo.startDay;
        for(let i=0;i<10;i++){
            startDay = this.addDate(startDay, -7);
            let weekInfo=this.getWeekNum(startDay);
            weekList.push(weekInfo.startDay+ '至'+weekInfo.endDay+' 第'+weekInfo.weekNum+'周');
        }

        return weekList;
    }
    render() {
        const option = this.getOption();
        const styles = this.getStyle();
        const {data, drawerVisible,ticketTotal}=this.props;
        return (
            <div>
                <div style={{position:'fixed',top:130,left:30,display:'flex',flexWrap:'wrap',zIndex:1}}>
                    <Paper style={{display:'flex',borderRadius:15,
                        padding:'6px 15px 3px',backgroundColor:fade(colors.blueGrey50,0.7)}}
                    >
                        <div style={{marginRight:10,fontSize:14}}>CHART</div>
                        <Toggle
                            //label="Styling"
                            labelPosition="right"
                            thumbStyle={styles.thumbOff}
                            trackStyle={styles.trackOff}
                            thumbSwitchedStyle={styles.thumbSwitched}
                            trackSwitchedStyle={styles.trackSwitched}
                            labelStyle={styles.labelStyle}
                            style={{width:43}}
                            onToggle={this.onToggle}
                        />
                        <div style={{fontSize:14}}>TABLE</div>
                    </Paper>

                    <Paper style={{display:'flex',borderRadius:15,marginLeft:20,
                        backgroundColor:fade(colors.blueGrey50,0.7)}}
                    >
                        {
                            this.state.tabIndex!=0 &&
                            <DropDownMenu style={{height:30,marginTop:-12}}
                                          underlineStyle={{
                                              borderColor: 'transparent'
                                          }}
                                          value={this.state.value} onChange={this.handleChange}>
                                {
                                    this.state.tabIndex==1 &&
                                    this.getWeekList().map((item,key)=> <MenuItem key={key} value={key} primaryText={item} />)
                                }
                            </DropDownMenu>
                        }

                    </Paper>
                </div>

                <Tabs
                    //tabItemContainerStyle={{}}
                    //contentContainerStyle={{}}
                    onChange={this.handleChange_Tab}
                    value={this.state.tabIndex}
                >
                    <Tab label="实时票房" value={0}>
                        <h4 style={{textAlign:'center',lineHeight:'15px',marginTop:40}}>今日大盘：{ticketTotal}万</h4>
                        {
                            this.state.isChart?
                                <div style={{width: '100%', height: 350, display: 'flex', justifyContent: 'center',margin:20}}>
                                    {
                                        option &&
                                        <ECharts option={option} style={{maxWidth: 1000}} refresh={drawerVisible}/>
                                    }
                                </div> :
                                <div style={{padding:'0px 30px 10px'}}>
                                    <Table
                                        fixedHeader={true}
                                        height='300px'
                                        selectable={false}
                                    >
                                        <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
                                            <TableRow>
                                                <TableHeaderColumn style={{width: 20}}>序号</TableHeaderColumn>
                                                <TableHeaderColumn style={{width: 180}}>影片名</TableHeaderColumn>
                                                <TableHeaderColumn>实时票房（万）</TableHeaderColumn>
                                                <TableHeaderColumn>票房占比</TableHeaderColumn>
                                                <TableHeaderColumn>排片占比</TableHeaderColumn>
                                                <TableHeaderColumn>上座率</TableHeaderColumn>
                                                <TableHeaderColumn>上映天数</TableHeaderColumn>
                                                <TableHeaderColumn>累计票房（万）</TableHeaderColumn>
                                                <TableHeaderColumn style={{width: 40}}></TableHeaderColumn>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody
                                            displayRowCheckbox={false}
                                            showRowHover={true}
                                            //stripedRows={true}
                                        >
                                            {data.map((row, index) => (
                                                <TableRow key={index}>
                                                    <TableRowColumn style={{width: 20}}>{index + 1}</TableRowColumn>
                                                    <TableRowColumn style={{width: 180}}>{row['中文名']}</TableRowColumn>
                                                    <TableRowColumn>{parseInt(row['实时票房']) / 10000}</TableRowColumn>
                                                    <TableRowColumn> {row['票房占比']}</TableRowColumn>
                                                    <TableRowColumn> {row['排片占比']}</TableRowColumn>
                                                    <TableRowColumn> {row['上座率']}</TableRowColumn>
                                                    <TableRowColumn> {row['上映天数']}</TableRowColumn>
                                                    <TableRowColumn>{parseInt(row['累计票房']) / 10000}</TableRowColumn>
                                                    <TableRowColumn style={{width: 40}}>
                                                        <IconButton containerElement={ <Link to={{
                                                            pathname: '/moviego/films/film/' + row['id'],
                                                            query: {filmType: 'history'}
                                                        }}/>}>
                                                            <ChevronRight/>
                                                        </IconButton>
                                                    </TableRowColumn>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>
                        }

                    </Tab>
                    <Tab label="单周票房" value={1}>
                        <div style={{width: '100%', height: 400, display: 'flex', justifyContent: 'center',margin:20}}>
                            {
                                option &&
                                <ECharts option={option} style={{maxWidth: 1000}} refresh={drawerVisible}/>
                            }
                        </div>
                    </Tab>
                    <Tab label="周末票房" value={2}>
                        <div style={{width: '100%', height: 400, display: 'flex', justifyContent: 'center',margin:20}}>
                            {
                                option &&
                                <ECharts option={option} style={{maxWidth: 1000}} refresh={drawerVisible}/>
                            }
                        </div>
                    </Tab>
                    <Tab label="单月票房" value={3}>
                        <div style={{width: '100%', height: 400, display: 'flex', justifyContent: 'center',margin:20}}>
                            {
                                option &&
                                <ECharts option={option} style={{maxWidth: 1000}} refresh={drawerVisible}/>
                            }
                        </div>
                    </Tab>
                </Tabs>

            </div>
        );
    }
}

BoxOfficeMarket.contextTypes = {
    muiTheme: React.PropTypes.object,
}


export default BoxOfficeMarket;