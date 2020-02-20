import React from 'react';
import PropTypes from 'prop-types';
import MUIRadio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import { wrapperProps } from '@data-driven-forms/common/src/multiple-choice-list';

import FormFieldGrid from '../common/form-field-grid';
import { validationError } from '../common/helpers';
import './radio.scss';

const Radio = ({ FieldProvider, options, isDisabled, input, label, isRequired, helperText, description, isReadOnly, meta, validateOnMount }) => {
  const invalid = validationError(meta, validateOnMount);
  const text = invalid || helperText || description;
  return (
    <FormFieldGrid className="mui-ddform-radio-group">
      <FormControl required={isRequired} error={!!invalid} component="fieldset">
        <FormLabel component="legend">{label}</FormLabel>
        {options.map((option) => (
          <FieldProvider
            key={`${input.name}-${option.value}`}
            name={input.name}
            value={option.value}
            type="radio"
            render={({ input }) => (
              <FormControlLabel
                control={
                  <MUIRadio
                    {...input}
                    disabled={isDisabled || isReadOnly}
                    onChange={() => input.onChange(option.value)}
                    inputProps={{
                      readOnly: isReadOnly
                    }}
                  />
                }
                label={option.label}
              />
            )}
          />
        ))}
        {(invalid || text) && <FormHelperText>{invalid || text}</FormHelperText>}
      </FormControl>
    </FormFieldGrid>
  );
};

Radio.propTypes = {
  ...wrapperProps,
  FieldProvider: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.any,
      label: PropTypes.node
    })
  ),
  label: PropTypes.node.isRequired,
  isDisabled: PropTypes.bool,
  input: PropTypes.shape({
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
  }),
  children: PropTypes.any,
  description: PropTypes.node
};

Radio.defaultProps = {
  options: []
};

export default Radio;