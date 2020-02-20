import React from 'react';
import PropTypes from 'prop-types';

import FormGroup from '../common/form-wrapper';
import { DateTimePicker } from '../form-fields/date-time-picker/date-time-picker';

const DatePicker = ({ meta, validateOnMount, label, hideLabel, isRequired, helperText, description, input, ...props }) => (
  <FormGroup
    meta={meta}
    validateOnMount={validateOnMount}
    label={label}
    hideLabel={hideLabel}
    isRequired={isRequired}
    helperText={helperText}
    description={description}
  >
    <DateTimePicker pristine={meta.pristine} onChange={input.onChange} value={input.value} {...props} />
  </FormGroup>
);

DatePicker.propTypes = {
  meta: PropTypes.object,
  validateOnMount: PropTypes.bool,
  label: PropTypes.string,
  hideLabel: PropTypes.bool,
  isReadOnly: PropTypes.bool,
  isRequired: PropTypes.bool,
  helperText: PropTypes.string,
  description: PropTypes.string,
  input: PropTypes.object,
  placeholder: PropTypes.string,
  isDisabled: PropTypes.bool
};

export default DatePicker;