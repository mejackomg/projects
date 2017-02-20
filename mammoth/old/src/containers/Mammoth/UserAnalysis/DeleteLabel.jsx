/**
 * Created by Administrator on 2016-11-02.
 */
import React from 'react';
import Chip from 'material-ui/Chip';

/**
 * An example of rendering multiple Chips from an array of values. Deleting a chip removes it from the array.
 * Note that since no `onTouchTap` property is defined, the Chip can be focused, but does not gain depth
 * while clicked or touched.
 */
export default class DeleteLabel extends React.Component {

    constructor(props) {
        super(props);
        this.state = {chipData: [
            {key: 0, label: '疯狂型'},
            {key: 1, label: '冲动型'},
            {key: 2, label: '理智型'},
            {key: 3, label: '淡定型'},
            {key: 4, label: '冷漠型'},

        ]};
        this.styles = {
            chip: {
                margin: 4,
            },
            wrapper: {
                display: 'flex',
                flexWrap: 'wrap',
            },
        };
    }

    handleRequestDelete = (key) => {


        this.chipData = this.state.chipData;
        const chipToDelete = this.chipData.map((chip) => chip.key).indexOf(key);
        this.chipData.splice(chipToDelete, 1);
        this.setState({chipData: this.chipData});
    };

    renderChip(data) {
        return (
            <Chip
                key={data.key}
                onRequestDelete={() => this.handleRequestDelete(data.key)}
                style={this.styles.chip}
            >
                {data.label}
            </Chip>
        );
    }

    render() {
        return (
            <div style={this.styles.wrapper}>
               <span style={{marginTop:'12px'}}>
                   筛选条件：
               </span>
                {this.state.chipData.map(this.renderChip, this)}
            </div>
        );
    }
}