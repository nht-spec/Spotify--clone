import { TextField } from '@material-ui/core';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';

InputField.propTypes = {
    form: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    disabled: PropTypes.bool,
};

function InputField(props) {
    const {form, name, label, disabled}= props;
    return (
      <Controller
         name={name}
         fullWidth
         control={form.control}
         label={label}
         as={TextField}
         disabled={disabled}
        />
    );
}

export default InputField;