import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Checkbox from 'material-ui/Checkbox';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import SelectField from 'material-ui/SelectField';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import BorderColor from 'material-ui/svg-icons/editor/border-color';
import Create from 'material-ui/svg-icons/content/create';
import Toggle from 'material-ui/Toggle';
import IconButton from 'material-ui/IconButton';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Chip from 'material-ui/Chip';
import RaisedButton from 'material-ui/RaisedButton';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Clear from 'material-ui/svg-icons/content/clear';
import ContentDown from 'material-ui/svg-icons/hardware/keyboard-arrow-down';
import ContentUp from 'material-ui/svg-icons/hardware/keyboard-arrow-up';
import Popover from 'material-ui/Popover';
import FilterButton from './exp.jsx'
import {
    colors,
    spacing,
    typography
} from 'material-ui/styles';
import DialogChoose from './DialogChoose'
export default class DialogItems extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value:0,
            isToggled:false,
            expanded:0,
            clickProps:{
                display:'none',
                display1:'inline-block'
            },
            sum:0
        };
    }
    componentWillReceiveProps (nextProps) {
        console.log(nextProps);
        if(nextProps.nowItem) {
            this.setState({
                value : nextProps.nowItem
            });
        }
    }
    handleEventChange = (event, index, value) => {
        const { indexKey, haddleChangeSteps, stepItems} = this.props;
        if(Array.indexOf(stepItems, value) > -1) {
            return;
        }
        this.setState({value});
        haddleChangeSteps(indexKey, value);
    };

    handleToggle = (event, toggle) => {
        this.setState({isToggled: toggle});
    };
    deleteItem = () => {
        const { indexKey, haddleRemoveSteps} = this.props;
        haddleRemoveSteps(indexKey);
    };

    onchange = ()=>{
        'inline-block' == this.state.clickProps.display ? this.setState({clickProps:{display:'none'}})
            :this.setState({clickProps:{display:'inline-block'}});
        'inline-block' == this.state.clickProps.display1 ? this.setState({clickProps:{display1:'none'}})
            :this.setState({clickProps:{display1:'inline-block'}});
        // console.log(this.refs.input_custom,this.refs.Create.target)
    };
    render( ) {
        const {checkItems,indexKey,stepItems,nowItem} = this.props;
        const istrew = true;
        // const checkItems1=['国家','取消订单的商品详情','售后服务','手机类支付','提交订单','提交订单的商品细节','搜索商品','支付订单',
        //     '支付订单的商品细节','收到商品','注册','浏览商品','浏览平板电脑','浏览相关'];
        // const checkItems2=['等于','大于','小于','不等于','包含','不包含','有值','没值',
        //     '为空','不为空','正则匹配','正则不匹配'];
        // const checkItems3=['等于','大于','小于','不等于','包含','不包含','有值','没值',
        //     '为空','不为空','正则匹配','正则不匹配'];
        // console.log('this.refs.input_custom',this.refs.input_custom)
        return (
            <div>
                {/*<FilterButton></FilterButton>*/}
                <div style={{display:'flex',height:'46px',padding:'5px',marginBottom:'10px',
                    backgroundColor:this.context.muiTheme.palette.accent2Color}}>
                    <div style={{height:'36px',width:"54px",
                        background: this.context.muiTheme.palette.primary1Color,
                        lineHeight:'36px',textAlign:'center',marginRight:'10px'}}>
                        {indexKey}
                    </div>
                    <SelectField
                        key={1}
                        value={nowItem}
                        onChange={this.handleEventChange}
                        underlineStyle={{borderColor: this.context.muiTheme.palette.accent1Color}}
                        maxHeight={200}
                    >
                        {
                            checkItems.map((item,key)=>(
                                Array.indexOf(stepItems, item.id) > -1 ?
                                <MenuItem value={item.id} key={key} primaryText={item.name} style={{mixWidth:'200px',width:'200px',background:'#eee',color:'#ccc'}}
                                />:
                                <MenuItem value={item.id} key={key} primaryText={item.name} style={{mixWidth:'200px',width:'200px'}}
                                />
                            ))
                        }
                    </SelectField>
                    {/*<IconButton onTouchTap={this.onchange} ref="Create" style={{display:this.state.clickProps.display1}}>*/}
                        {/*/!*<BorderColor />*!/*/}
                        {/*<Create />*/}
                    {/*</IconButton>*/}
                    {/*<input ref="input_custom" placeholder="自定义步骤名"*/}
                           {/*style={{width:'30%',border:'1px solid #a8b7c8',padding:'6px 10px 6px 10px',*/}
                               {/*fontSize:'14px',color:'#212121',borderRadius:'3px',*/}
                               {/*backgroundColor:'#fff',display:this.state.clickProps.display}}*/}
                    {/*>*/}

                    {/*</input>*/}
                    {/*<Toggle*/}
                    {/*label="自定义属性"*/}
                    {/*toggled={this.state.isToggled}*/}
                    {/*onToggle={this.handleToggle}*/}
                    {/*labelPosition="right"*/}
                    {/*style={{width:'130px',marginTop:"6px"}}*/}
                    {/*/>*/}
                    {/*<FlatButton label="触发限制条件"*/}
                                {/*labelPosition="after"*/}
                                {/*primary={true}*/}
                                {/*icon={<ContentAdd />}*/}
                        {/*//onTouchTap={isexpanded?this.handleReduce:this.handleExpand}*/}
                        {/*//onTouchTap={this.handleAdd}*/}
                                {/*style={{width:'144px'}} />*/}
                    {
                        indexKey>1?
                        <FlatButton label="删除"
                                labelPosition="after"
                                primary={true}
                                icon={<Clear />}
                                onTouchTap={this.deleteItem}
                        //onTouchTap={this.handleAdd}
                                style={{width:'36px'}} />
                                :null}
                </div>
                {/*<DialogChoose checkItems1={checkItems1} checkItems2={checkItems2}></DialogChoose>*/}
            </div>
        )
    }
}
DialogItems.contextTypes = {
    muiTheme: React.PropTypes.object,
}



