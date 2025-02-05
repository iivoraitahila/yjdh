import { FormikErrors, FormikTouched, FormikValues, getIn } from 'formik';
import { TFunction } from 'next-i18next';

/** Get error text
 * @param {Object} errors
 * @param {Object} touched
 * @param {string} name
 * @param {Function} t
 * @param {boolean} isSubmitted
 * @return {string}
 */
export const getErrorText = (
  errors: FormikErrors<FormikValues>,
  touched: FormikTouched<FormikValues>,
  name: string,
  t: TFunction,
  isSubmitted: boolean
): string => {
  const error: FormikValues = getIn(errors, name) as FormikValues;
  return !!error && (getIn(touched, name) || isSubmitted)
    ? typeof error === 'string'
      ? t(error)
      : t(error.key || '', error)
    : '';
};

export interface IndexType {
  [key: string]: string;
}
