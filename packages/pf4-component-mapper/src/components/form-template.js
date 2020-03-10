import React from 'react';
import PropTypes from 'prop-types';

import FormTemplate from '@data-driven-forms/common/src/form-template';

import { Text, TextVariants } from '@patternfly/react-core/dist/js/components/Text/Text';
import { TextContent } from '@patternfly/react-core/dist/js/components/Text/TextContent';
import { Form } from '@patternfly/react-core/dist/js/components/Form/Form';
import { ActionGroup } from '@patternfly/react-core/dist/js/components/Form/ActionGroup';
import { Button as PF4Button } from '@patternfly/react-core/dist/js/components/Button/Button';

import './form-template.scss';

export const Button = ({ label, bsStyle, children, disabled, ...props }) => (
  <PF4Button variant={bsStyle || 'secondary'} isDisabled={disabled} {...props}>
    {label}
    {children}
  </PF4Button>
);

Button.propTypes = {
  label: PropTypes.string.isRequired,
  bsStyle: PropTypes.string,
  disabled: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};

export const ButtonGroup = ({ children, ...props }) => <ActionGroup {...props}>{children}</ActionGroup>;

ButtonGroup.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};

export const Title = ({ children }) => (
  <TextContent>
    <Text component={TextVariants.h1}>{children}</Text>
  </TextContent>
);

Title.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};

export const Description = ({ children }) => (
  <TextContent>
    <Text component={TextVariants.p}>{children}</Text>
  </TextContent>
);

Description.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};

const PF4FormTemplate = (props) => (
  <FormTemplate FormWrapper={Form} Button={Button} ButtonGroup={ButtonGroup} Title={Title} Description={Description} {...props} />
);

export default PF4FormTemplate;