import React, {Component} from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

/**
 * `SelectField` can also be nullable. In this case, just specify a `MenuItem`
 * with no text and with a `null` value. For instance, for a boolean:
 */

export default class SelectButton extends Component {
    state = {
        value: null,
        value1:null,
        value2:null
    };

    handleChange = (event, index, value) => this.setState({value});
    handleChange2 = (event, index, value1) => this.setState({value1});
    handleChange3 = (event, index, value2) => this.setState({value2});
    getStyle(){
        const styles = {
            customWidth :{
                width:'80%'
            }
        };
        return styles;
    }
    render() {
        const styles = this.getStyle();
        return (
            <div style={{display:"flex",justifyContent:'space-between',padding:'0 20px'}}>
                <div style={{width:"33%"}}>
                    <SelectField
                        floatingLabelText="性别"
                        value={this.state.value}
                        onChange={this.handleChange}
                        style={styles.customWidth}
                    >
                        <MenuItem value={19} primaryText=""/>
                        <MenuItem value={20} primaryText="男"/>
                        <MenuItem value={21} primaryText="女"/>
                    </SelectField>
                </div>

                <div style={{width:'33%'}}>
                    <SelectField
                        floatingLabelText="年龄"
                        value={this.state.value1}
                        onChange={this.handleChange2}
                        style={styles.customWidth}
                    >
                        <MenuItem value={12} primaryText=""/>
                        <MenuItem value={13} primaryText="10岁以下"/>
                        <MenuItem value={14} primaryText="10~20岁"/>
                        <MenuItem value={15} primaryText="20~30岁"/>
                        <MenuItem value={16} primaryText="30~40岁"/>
                        <MenuItem value={17} primaryText="40~50岁"/>
                        <MenuItem value={18} primaryText="50岁以上"/>
                    </SelectField>
                </div>
                <div style={{width:'30%'}}>
                    <SelectField floatingLabelText="电影类型" value={this.state.value2} onChange={this.handleChange3}
                                 style={styles.customWidth}
                    >
                        <MenuItem value={1} primaryText=""/>
                        <MenuItem value={2} primaryText="动作"/>
                        <MenuItem value={3} primaryText="悬疑"/>
                        <MenuItem value={4} primaryText="奇幻"/>
                        <MenuItem value={5} primaryText="惊悚"/>
                        <MenuItem value={6} primaryText="剧情"/>
                        <MenuItem value={7} primaryText="爱情"/>
                        <MenuItem value={8} primaryText="战争"/>
                        <MenuItem value={9} primaryText="喜剧"/>
                        <MenuItem value={10} primaryText="武侠"/>
                        <MenuItem value={11} primaryText="战争"/>


                    </SelectField>
                </div>
            </div>
        );
    }
}