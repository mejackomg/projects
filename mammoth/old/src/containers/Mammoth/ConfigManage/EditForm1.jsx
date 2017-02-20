import React, { Component, PropTypes } from 'react';
import {TableRow, TableRowColumn} from 'material-ui/Table';
import { Field, reduxForm } from 'redux-form'
import MenuItem from 'material-ui/MenuItem'
import { AutoComplete as MUIAutoComplete } from 'material-ui'
import keys from 'object-keys';
import {
    AutoComplete,
    Checkbox,
    DatePicker,
    RadioButtonGroup,
    SelectField,
    Slider,
    TextField,
    Toggle
} from 'redux-form-material-ui'
export const fields = [ 'firstName', 'lastName', 'email', 'sex', 'favoriteColor', 'employed', 'notes' ]

const validate = values => {
    const errors = {}
    const requiredFields = ['源平台名', '源表名', '源列名', '目的表名','目的列名','更新策略' ]
    requiredFields.forEach(field => {
        if (!values[ field ]) {
            errors[ field ] = 'Required'
        }
    })
    //if (values.pizzas > 15) {
    //    errors.pizzas = 'Are you mad?'
    //}
    //if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    //    errors.email = 'Invalid email address'
    //}
    return errors
}

class EditForm extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    componentDidMount() {
        this.refs.platform          // the Field
            .getRenderedComponent() // on Field, returns ReduxFormMaterialUITextField
            .getRenderedComponent() // on ReduxFormMaterialUITextField, returns TextField
            .focus()                // on TextField
    }

    getStyles() {
        const styles = {
            root:{
                this.context.muiTheme.spacing.desktopGutter,
            }
        }
        return styles;
    }

    render() {
        const styles = this.getStyles();

        const { handleSubmit, pristine, reset, submitting,
            srcPlatforms,dstTables,searchText_Platform,searchText_Src,searchText_Dst} = this.props

        let platformList = keys(srcPlatforms);
        let srcTableList = searchText_Platform == '' ? [] : keys(srcPlatforms[searchText_Platform].tables);
        let dstTableList = keys(dstTables);

        return (
            <form onSubmit={handleSubmit}>
                <div style={styles.root}>
                    <Field
                        name='源平台名'
                        component={AutoComplete}
                        floatingLabelText='源平台名'
                        openOnFocus={true}
                        filter={MUIAutoComplete.fuzzyFilter}
                        dataSource={platformList}
                        //ref="platform" withRef
                        />
                </div>
            </form>
        );
    }
}


EditForm.contextTypes = {
    muiTheme: React.PropTypes.object,
}

EditForm.propTypes = {
    srcPlatforms: React.PropTypes.object,
    dstTables:React.PropTypes.object,
    searchText_Platform:React.PropTypes.string,
    searchText_Src:React.PropTypes.string,
    searchText_Dst:React.PropTypes.string,
};

export default reduxForm({
    form: 'editForm',
    validate
})(EditForm)


