import { useTranslation } from 'benefit/applicant/i18n';
import { FormikProps, useFormik } from 'formik';
import { TFunction } from 'next-i18next';
import React, { FormEvent, useState } from 'react';
import { Field } from 'shared/components/forms/fields/types';

import { DE_MINIMIS_AID_FIELDS } from '../../../constants';
// import * as Yup from 'yup';

export type DeMinimisAidProps = {
  onSubmit: () => void;
};

type ExtendedComponentProps = {
  t: TFunction;
  fieldNames: string[];
  fields: FieldsDef;
  translationsBase: string;
  getErrorMessage: (fieldName: string) => string | undefined;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  formik: FormikProps<FormFields>;
};

type FieldsDef = {
  [key: string]: Field;
};

type FormFields = {
  [DE_MINIMIS_AID_FIELDS.GRANTER]: string;
  [DE_MINIMIS_AID_FIELDS.AMOUNT]: number;
  [DE_MINIMIS_AID_FIELDS.ISSUE_DATE]: string;
};

const useComponent = (submitForm: () => void): ExtendedComponentProps => {
  const { t } = useTranslation();
  const translationsBase = 'common:applications.sections.company';
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const formik = useFormik({
    initialValues: {
      [DE_MINIMIS_AID_FIELDS.GRANTER]: '',
      [DE_MINIMIS_AID_FIELDS.AMOUNT]: 0,
      [DE_MINIMIS_AID_FIELDS.ISSUE_DATE]: '',
    },
    // Define Yup validation schema
    // validationSchema: Yup.object().shape({
    //  companyOtherAddressStreet: Yup.boolean().required('Please enter..'),
    // }),
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: () => {
      // console.log('Form submitted:', values);
      submitForm();
    },
  });

  const fieldNames = React.useMemo(
    (): string[] => [
      DE_MINIMIS_AID_FIELDS.GRANTER,
      DE_MINIMIS_AID_FIELDS.AMOUNT,
      DE_MINIMIS_AID_FIELDS.ISSUE_DATE,
    ],
    []
  );

  const fields = React.useMemo((): FieldsDef => {
    const fieldsdef: FieldsDef = {};
    fieldNames.forEach((name) => {
      fieldsdef[name] = {
        name,
        label: t(`${translationsBase}.fields.${name}.label`),
        placeholder: t(`${translationsBase}.fields.${name}.placeholder`),
      };
    });
    return fieldsdef;
  }, [t, fieldNames]);

  const getErrorMessage = (fieldName: string): string | undefined =>
    // todo: implement error messages
    // (getIn(formik.touched, fieldName) || isSubmitted) &&
    // getIn(formik.errors, fieldName)
    isSubmitted ? fieldName : '';

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setIsSubmitted(true);
    void formik.validateForm().then((errors) => {
      // todo: Focus the first invalid field
      const invalidFields = Object.keys(errors);
      if (invalidFields.length === 0) {
        void formik.submitForm();
      }
      return null;
    });
  };

  return {
    t,
    fieldNames,
    fields,
    translationsBase,
    formik,
    getErrorMessage,
    handleSubmit,
  };
};

export { useComponent };