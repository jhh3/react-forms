import React, { useState } from 'react';
import WizardStep from './wizard/wizard-step';
import PropTypes from 'prop-types';
import { Wizard as PfWizard, Modal, Icon } from 'patternfly-react';
import handleEnter from '@data-driven-forms/common/src/wizard/enter-handler';
import { useFormApi } from '@data-driven-forms/react-form-renderer';

const defaultButtonLabels = {
  cancel: 'Cancel',
  back: 'Back',
  next: 'Next',
  submit: 'Submit'
};

const Wizard = ({ title, buttonLabels, stepsInfo, fields, inModal }) => {
  const formOptions = useFormApi();

  const [activeStep, setActiveStep] = useState(fields[0].name);
  const [prevSteps, setPrevSteps] = useState([]);

  const handleNext = (nextStep) => {
    setPrevSteps([...prevSteps, activeStep]);
    setActiveStep(nextStep);
  };

  const handlePrev = () => {
    setActiveStep(prevSteps[prevSteps.length - 1]);

    const newSteps = prevSteps;
    newSteps.pop();
    setPrevSteps(newSteps);
  };

  const findCurrentStep = (activeStep) => fields.find(({ name }) => name === activeStep);

  const findActiveFields = (visitedSteps) =>
    visitedSteps.map((key) => findCurrentStep(key).fields.map(({ name }) => name)).reduce((acc, curr) => curr.concat(acc.map((item) => item)), []);

  const getValues = (values, visitedSteps) =>
    Object.keys(values)
      .filter((key) => findActiveFields(visitedSteps).includes(key))
      .reduce((acc, curr) => ({ ...acc, [curr]: values[curr] }), {});

  const handleSubmit = () => formOptions.onSubmit(getValues(formOptions.getState().values, [...prevSteps, activeStep]));

  const renderSteps = () =>
    stepsInfo.map((step, stepIndex) => (
      <PfWizard.Step
        activeStep={prevSteps.length + 1}
        title={step.title}
        label={`${stepIndex + 1}`}
        step={stepIndex + 1}
        key={stepIndex + 1}
        stepIndex={stepIndex + 1}
      />
    ));

  const fullButtonLabels = {
    ...defaultButtonLabels,
    ...buttonLabels
  };

  return (
    <div onKeyDown={(e) => handleEnter(e, formOptions, activeStep, findCurrentStep, handleNext, handleSubmit)}>
      {title && (
        <Modal.Header>
          {inModal && (
            <button className="close" onClick={formOptions.onCancel} aria-hidden="true" aria-label="Close">
              <Icon type="pf" name="close" />
            </button>
          )}
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
      )}
      {stepsInfo && <PfWizard.Steps steps={renderSteps()} />}
      <WizardStep
        handleNext={handleNext}
        handlePrev={handlePrev}
        disableBack={prevSteps.length === 0}
        buttonLabels={fullButtonLabels}
        {...findCurrentStep(activeStep)}
        formOptions={{
          ...formOptions,
          handleSubmit
        }}
      />
    </div>
  );
};

Wizard.propTypes = {
  title: PropTypes.string,
  buttonLabels: PropTypes.object,
  stepsInfo: PropTypes.array,
  inModal: PropTypes.bool,
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string
    })
  ).isRequired
};

Wizard.defaultProps = {
  title: undefined,
  stepsInfo: undefined,
  inModal: false
};

export default Wizard;