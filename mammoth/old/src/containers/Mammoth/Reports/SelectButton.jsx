import React, {Component} from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

/**
 * `SelectField` can also be nullable. In this case, just specify a `MenuItem`
 * with no text and with a `null` value. For instance, for a boolean:
 */

const styles = {
    customWidth: {
        width: 90,
    },
};
export default class SelectButton extends Component {
    state = {
        value: null,

    };

    handleChange = (event, index, value) => this.setState({value});

    render() {
        return (
            <div>
                <div style={{float:'left'}}>
                    <SelectField
                        floatingLabelText="共9组"
                        value={this.state.value}
                        onChange={this.handleChange}
                        style={styles.customWidth}
                    >
                        <MenuItem value={1} primaryText=""/>
                        <MenuItem value={2} primaryText="第1组"/>
                        <MenuItem value={3} primaryText="第2组"/>
                        <MenuItem value={4} primaryText="第3组"/>
                        <MenuItem value={5} primaryText="第4组"/>
                        <MenuItem value={6} primaryText="第5组"/>
                        <MenuItem value={7} primaryText="第6组"/>
                        <MenuItem value={8} primaryText="第7组"/>
                        <MenuItem value={9} primaryText="第8组"/>
                        <MenuItem value={10} primaryText="第9组"/>
                    </SelectField>
                </div>


            </div>

        );
    }
}