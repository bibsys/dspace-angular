export const SECTION_UPLOAD_FORM_LAYOUT = {
  acknowledgement: {
    element: {
      container: 'custom-control custom-checkbox pl-1',
      control: 'custom-control-input',
      label: 'custom-control-label pt-1',
    },
  },
};

export const SECTION_UPLOAD_FORM_MODEL = [
  {
    id: 'acknowledgement',
    label: 'submission.sections.upload.acknowledgement',
    required: true,
    value: false,
    validators: {
      required: null,
    },
    errorMessages: {
      required: 'submission.sections.upload.notacknowledge',
    },
    type: 'CHECKBOX',
  },
];
