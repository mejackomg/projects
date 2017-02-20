import React, { Component, PropTypes } from 'react';

import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import AutoComplete from 'material-ui/AutoComplete';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import {Tabs, Tab} from 'material-ui/Tabs';
import SearchIcon from 'material-ui/svg-icons/action/search';
import CloseIcon from 'material-ui/svg-icons/navigation/close';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';

import withWidth, {LARGE, MEDIUM,SMALL}  from 'material-ui/utils/withWidth';
import {
    colors,
    spacing,
    typography
} from 'material-ui/styles';

const filterInfo={
    '年代':['全部','2016','2015','2014','2013','2012','2011','2010','2009','2008','2007','2006','2005','2004','2003','2002','2001'],
    '类型':['全部','动作','悬疑','奇幻','传记','犯罪','惊悚','冒险','剧情','爱情','战争','喜剧','武侠','动画','科幻',
        '恐怖','西部','歌舞','纪录片'],
    '国家':['全部','中国','丹麦','俄罗斯','保加利亚','冰岛','加拿大','印度','台湾','墨西哥','巴西','德国','意大利','新加坡','新西兰',
        '日本','比利时','法国','泰国','澳大利亚','爱尔兰','瑞典','美国','芬兰','英国','荷兰','西班牙','韩国','马来西亚'],
    '字母':['全部','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
}

class AdvancedSearchPanel extends Component {
    constructor(props) {
        super(props);

        this.state = {
            nation:'全部',
            year:'全部',
            type:'全部',
        };
    }


    render() {

        return (
            <Paper  style={{marginBottom:20}}>
                {/*    <Subheader style={{
                 textAlign:'center',
                 background:'linear-gradient(to bottom, rgba(100,100,100,0.4) 0%,rgba(100,100,100,0.2) 70%,rgba(100,100,100,0) 100%)'
                 }}>
                 类型
                 </Subheader>*/}
                <FlatButton label="类 型"
                            disabled={true}
                            style={{borderRadius:0}}
                            labelStyle={{color:colors.white}}
                            backgroundColor={this.context.muiTheme.palette.primary1Color} />
                {
                    filterInfo.类型.map((item,key)=>(
                        <FlatButton key={key} label={item} primary={this.state.type == item}
                                    labelStyle={{fontSize:this.state.type == item?15:12}}
                                    onMouseDown={(event)=>(this.setState({type:item}))}
                            />
                    ))
                }
                <Divider />
                <FlatButton label="年 代"
                            disabled={true}
                            style={{borderRadius:0}}
                            labelStyle={{color:colors.white}}
                            backgroundColor={this.context.muiTheme.palette.primary1Color} />
                {
                    filterInfo.年代.map((item,key)=>(
                        <FlatButton key={key} label={item} primary={this.state.year == item}
                                    labelStyle={{fontSize:this.state.year == item?15:12}}
                                    onMouseDown={(event)=>(this.setState({year:item}))}
                            />
                    ))
                }
                <Divider />
                <FlatButton label="国 家"
                            disabled={true}
                            style={{borderRadius:0}}
                            labelStyle={{color:colors.white}}
                            backgroundColor={this.context.muiTheme.palette.primary1Color} />
                {
                    filterInfo.国家.map((item,key)=>(
                        <FlatButton key={key} label={item} primary={this.state.nation == item}
                                    labelStyle={{fontSize:this.state.nation == item?15:12}}
                                    onMouseDown={(event)=>(this.setState({nation:item}))}
                            />
                    ))
                }
                <Divider />
                <FlatButton label="字 母"
                            disabled={true}
                            style={{borderRadius:0}}
                            labelStyle={{color:colors.white}}
                            backgroundColor={this.context.muiTheme.palette.primary1Color} />
                {
                    filterInfo.字母.map((item,key)=>(
                        <FlatButton key={key} label={item} primary={this.state.char == item}
                                    labelStyle={{fontSize:this.state.char == item?15:12}}
                                    onMouseDown={(event)=>(this.setState({char:item}))}
                            />
                    ))
                }
            </Paper>
        );
    }
}


AdvancedSearchPanel.contextTypes = {
    muiTheme: React.PropTypes.object,
}


AdvancedSearchPanel.propTypes = {
    //width:PropTypes.number.isRequired,
    //height:PropTypes.number.isRequired,
    getFilter:PropTypes.func
};

export default AdvancedSearchPanel;

