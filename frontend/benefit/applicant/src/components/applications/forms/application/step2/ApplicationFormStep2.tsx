import {
  APPLICATION_FIELDS_STEP2,
  BENEFIT_TYPES,
} from 'benefit/applicant/constants';
import { DynamicFormStepComponentProps } from 'benefit/applicant/types/common';
import { Notification, Select, SelectionGroup, TextInput } from 'hds-react';
import camelCase from 'lodash/camelCase';
import * as React from 'react';
import FieldLabel from 'shared/components/forms/fields/fieldLabel/FieldLabel';
import {
  StyledCheckbox,
  StyledRadioButton,
} from 'shared/components/forms/fields/styled';
import { Option } from 'shared/components/forms/fields/types';
import Heading from 'shared/components/forms/heading/Heading';
import FormSection from 'shared/components/forms/section/FormSection';
import { StyledFormGroup } from 'shared/components/forms/section/styled';
import Spacing from 'shared/components/forms/spacing/Spacing';
import { phoneToLocal } from 'shared/utils/string.utils';

import StepperActions from '../stepperActions/StepperActions';
import {
  StyledCommissionContainer,
  StyledEmployerBasicInfoContainer,
  StyledEmploymentMoneyContainer,
  StyledEmploymentRelationshipContainer,
  StyledFieildsWithInfoColumn,
  StyledFieildsWithInfoContainer,
  StyledSubSection,
} from '../styled';
import { useApplicationFormStep2 } from './useApplicationFormStep2';

const ApplicationFormStep2: React.FC<DynamicFormStepComponentProps> = ({
  data,
}) => {
  const {
    t,
    handleSubmitNext,
    handleSubmitBack,
    getErrorMessage,
    erazeCommissionFields,
    getDefaultSelectValue,
    fields,
    translationsBase,
    formik,
    subsidyOptions,
  } = useApplicationFormStep2(data);

  return (
    <form onSubmit={handleSubmitNext} noValidate>
      <FormSection header={t(`${translationsBase}.heading1`)}>
        <StyledEmployerBasicInfoContainer>
          <TextInput
            id={fields.firstName.name}
            name={fields.firstName.name}
            label={fields.firstName.label}
            placeholder={fields.firstName.placeholder}
            onChange={(e) =>
              formik.setFieldValue(
                `employee.${APPLICATION_FIELDS_STEP2.EMPLOYEE_FIRST_NAME}`,
                e.target.value
              )
            }
            value={formik.values.employee?.firstName}
            invalid={
              !!getErrorMessage(APPLICATION_FIELDS_STEP2.EMPLOYEE_FIRST_NAME)
            }
            aria-invalid={
              !!getErrorMessage(APPLICATION_FIELDS_STEP2.EMPLOYEE_FIRST_NAME)
            }
            errorText={getErrorMessage(
              APPLICATION_FIELDS_STEP2.EMPLOYEE_FIRST_NAME
            )}
            required
          />
          <TextInput
            id={fields.lastName.name}
            name={fields.lastName.name}
            label={fields.lastName.label}
            placeholder={fields.lastName.placeholder}
            onChange={(e) =>
              formik.setFieldValue(
                `employee.${APPLICATION_FIELDS_STEP2.EMPLOYEE_LAST_NAME}`,
                e.target.value
              )
            }
            value={formik.values.employee?.lastName}
            invalid={
              !!getErrorMessage(APPLICATION_FIELDS_STEP2.EMPLOYEE_LAST_NAME)
            }
            aria-invalid={
              !!getErrorMessage(APPLICATION_FIELDS_STEP2.EMPLOYEE_LAST_NAME)
            }
            errorText={getErrorMessage(
              APPLICATION_FIELDS_STEP2.EMPLOYEE_LAST_NAME
            )}
            required
          />
          <TextInput
            id={fields.socialSecurityNumber.name}
            name={fields.socialSecurityNumber.name}
            label={fields.socialSecurityNumber.label}
            placeholder={fields.socialSecurityNumber.placeholder}
            onChange={(e) =>
              formik.setFieldValue(
                `employee.${APPLICATION_FIELDS_STEP2.EMPLOYEE_SOCIAL_SECURITY_NUMBER}`,
                e.target.value
              )
            }
            value={formik.values.employee?.socialSecurityNumber}
            invalid={
              !!getErrorMessage(
                APPLICATION_FIELDS_STEP2.EMPLOYEE_SOCIAL_SECURITY_NUMBER
              )
            }
            aria-invalid={
              !!getErrorMessage(
                APPLICATION_FIELDS_STEP2.EMPLOYEE_SOCIAL_SECURITY_NUMBER
              )
            }
            errorText={getErrorMessage(
              APPLICATION_FIELDS_STEP2.EMPLOYEE_SOCIAL_SECURITY_NUMBER
            )}
            required
          />
          <TextInput
            id={fields.phoneNumber.name}
            name={fields.phoneNumber.name}
            label={fields.phoneNumber.label}
            placeholder={fields.phoneNumber.placeholder}
            onChange={(e) =>
              formik.setFieldValue(
                `employee.${APPLICATION_FIELDS_STEP2.EMPLOYEE_PHONE_NUMBER}`,
                e.target.value
              )
            }
            value={phoneToLocal(formik.values.employee?.phoneNumber)}
            invalid={
              !!getErrorMessage(APPLICATION_FIELDS_STEP2.EMPLOYEE_PHONE_NUMBER)
            }
            aria-invalid={
              !!getErrorMessage(APPLICATION_FIELDS_STEP2.EMPLOYEE_PHONE_NUMBER)
            }
            errorText={getErrorMessage(
              APPLICATION_FIELDS_STEP2.EMPLOYEE_PHONE_NUMBER
            )}
            required
          />
        </StyledEmployerBasicInfoContainer>
        <Spacing size="m" />
        <FieldLabel value={fields.isLivingInHelsinki.label} required />
        <StyledFormGroup>
          <StyledCheckbox
            id={fields.isLivingInHelsinki.name}
            name={fields.isLivingInHelsinki.name}
            label={fields.isLivingInHelsinki.placeholder}
            onChange={() => {
              formik.setFieldValue(
                `employee.${APPLICATION_FIELDS_STEP2.EMPLOYEE_IS_LIVING_IN_HELSINKI}`,
                !formik.values.employee?.isLivingInHelsinki
              );
            }}
            aria-invalid={
              !!getErrorMessage(
                APPLICATION_FIELDS_STEP2.EMPLOYEE_IS_LIVING_IN_HELSINKI
              )
            }
            errorText={getErrorMessage(
              APPLICATION_FIELDS_STEP2.EMPLOYEE_IS_LIVING_IN_HELSINKI
            )}
            required
            checked={formik.values.employee?.isLivingInHelsinki === true}
          />
        </StyledFormGroup>
      </FormSection>
      <FormSection header={t(`${translationsBase}.heading2`)}>
        <StyledFormGroup>
          <SelectionGroup
            label={fields.paySubsidyGranted.label}
            direction="vertical"
            required
            errorText={getErrorMessage(
              APPLICATION_FIELDS_STEP2.PAY_SUBSIDY_GRANTED
            )}
          >
            <StyledRadioButton
              id={`${fields.paySubsidyGranted.name}False`}
              name={fields.paySubsidyGranted.name}
              value="false"
              label={t(
                `${translationsBase}.fields.${APPLICATION_FIELDS_STEP2.PAY_SUBSIDY_GRANTED}.no`
              )}
              onChange={() => {
                formik.setFieldValue(
                  APPLICATION_FIELDS_STEP2.PAY_SUBSIDY_GRANTED,
                  false
                );
                formik.setFieldValue(
                  APPLICATION_FIELDS_STEP2.APPRENTICESHIP_PROGRAM,
                  null
                );
              }}
              onBlur={formik.handleBlur}
              checked={formik.values.paySubsidyGranted === false}
            />
            <StyledRadioButton
              id={`${fields.paySubsidyGranted.name}True`}
              name={fields.paySubsidyGranted.name}
              value="true"
              label={t(
                `${translationsBase}.fields.${APPLICATION_FIELDS_STEP2.PAY_SUBSIDY_GRANTED}.yes`
              )}
              onChange={() => {
                formik.setFieldValue(
                  APPLICATION_FIELDS_STEP2.PAY_SUBSIDY_GRANTED,
                  true
                );
              }}
              onBlur={formik.handleBlur}
              checked={formik.values.paySubsidyGranted === true}
            />
          </SelectionGroup>
        </StyledFormGroup>
        {formik.values.paySubsidyGranted && (
          <StyledSubSection>
            <StyledFormGroup>
              <Select
                defaultValue={getDefaultSelectValue(
                  APPLICATION_FIELDS_STEP2.PAY_SUBSIDY_PERCENT
                )}
                style={{ width: 350 }}
                helper={getErrorMessage(
                  APPLICATION_FIELDS_STEP2.PAY_SUBSIDY_PERCENT
                )}
                optionLabelField="label"
                label={fields.paySubsidyPercent.label}
                onChange={(paySubsidyPercent: Option) =>
                  formik.setFieldValue(
                    APPLICATION_FIELDS_STEP2.PAY_SUBSIDY_PERCENT,
                    paySubsidyPercent.value
                  )
                }
                options={subsidyOptions}
                id={fields.paySubsidyPercent.name}
                placeholder={t('common:select')}
                invalid={
                  !!getErrorMessage(
                    APPLICATION_FIELDS_STEP2.PAY_SUBSIDY_PERCENT
                  )
                }
                aria-invalid={
                  !!getErrorMessage(
                    APPLICATION_FIELDS_STEP2.PAY_SUBSIDY_PERCENT
                  )
                }
                required
              />
            </StyledFormGroup>
            <Spacing size="m" />
            <StyledFormGroup>
              <Select
                defaultValue={getDefaultSelectValue(
                  APPLICATION_FIELDS_STEP2.ADDITIONAL_PAY_SUBSIDY_PERCENT
                )}
                style={{ width: 350 }}
                helper={getErrorMessage(
                  APPLICATION_FIELDS_STEP2.ADDITIONAL_PAY_SUBSIDY_PERCENT
                )}
                optionLabelField="label"
                label={fields.additionalPaySubsidyPercent.label}
                onChange={(additionalPaySubsidyPercent: Option) =>
                  formik.setFieldValue(
                    APPLICATION_FIELDS_STEP2.ADDITIONAL_PAY_SUBSIDY_PERCENT,
                    additionalPaySubsidyPercent.value
                  )
                }
                options={subsidyOptions}
                id={fields.additionalPaySubsidyPercent.name}
                placeholder={t('common:select')}
                invalid={
                  !!getErrorMessage(
                    APPLICATION_FIELDS_STEP2.ADDITIONAL_PAY_SUBSIDY_PERCENT
                  )
                }
                aria-invalid={
                  !!getErrorMessage(
                    APPLICATION_FIELDS_STEP2.ADDITIONAL_PAY_SUBSIDY_PERCENT
                  )
                }
              />
            </StyledFormGroup>
            <Spacing size="m" />
            <StyledFormGroup>
              <SelectionGroup
                label={fields.apprenticeshipProgram.label}
                direction="vertical"
                required
                errorText={getErrorMessage(
                  APPLICATION_FIELDS_STEP2.APPRENTICESHIP_PROGRAM
                )}
              >
                <StyledRadioButton
                  id={`${fields.apprenticeshipProgram.name}False`}
                  name={fields.apprenticeshipProgram.name}
                  value="false"
                  label={t(
                    `${translationsBase}.fields.${APPLICATION_FIELDS_STEP2.APPRENTICESHIP_PROGRAM}.no`
                  )}
                  onChange={() => {
                    formik.setFieldValue(
                      APPLICATION_FIELDS_STEP2.APPRENTICESHIP_PROGRAM,
                      false
                    );
                  }}
                  onBlur={formik.handleBlur}
                  checked={formik.values.apprenticeshipProgram === false}
                />
                <StyledRadioButton
                  id={`${fields.apprenticeshipProgram.name}True`}
                  name={fields.apprenticeshipProgram.name}
                  value="true"
                  label={t(
                    `${translationsBase}.fields.${APPLICATION_FIELDS_STEP2.APPRENTICESHIP_PROGRAM}.yes`
                  )}
                  onChange={() => {
                    formik.setFieldValue(
                      APPLICATION_FIELDS_STEP2.APPRENTICESHIP_PROGRAM,
                      true
                    );
                  }}
                  onBlur={formik.handleBlur}
                  checked={formik.values.apprenticeshipProgram === true}
                />
              </SelectionGroup>
            </StyledFormGroup>
          </StyledSubSection>
        )}
      </FormSection>
      <FormSection header={t(`${translationsBase}.heading3`)}>
        <StyledFieildsWithInfoContainer>
          <StyledFieildsWithInfoColumn>
            <StyledFormGroup>
              <SelectionGroup
                label={fields.benefitType.label}
                direction="vertical"
                required
                errorText={getErrorMessage(
                  APPLICATION_FIELDS_STEP2.BENEFIT_TYPE
                )}
              >
                <StyledRadioButton
                  id={`${fields.benefitType.name}Employment`}
                  name={fields.benefitType.name}
                  value={BENEFIT_TYPES.EMPLOYMENT}
                  label={t(
                    `${translationsBase}.fields.${APPLICATION_FIELDS_STEP2.BENEFIT_TYPE}.employment`
                  )}
                  onChange={(val) => erazeCommissionFields(val)}
                  onBlur={formik.handleBlur}
                  checked={
                    formik.values.benefitType === BENEFIT_TYPES.EMPLOYMENT
                  }
                />
                <StyledRadioButton
                  id={`${fields.benefitType.name}Salary`}
                  name={fields.benefitType.name}
                  value={BENEFIT_TYPES.SALARY}
                  label={t(
                    `${translationsBase}.fields.${APPLICATION_FIELDS_STEP2.BENEFIT_TYPE}.salary`
                  )}
                  onChange={(val) => erazeCommissionFields(val)}
                  onBlur={formik.handleBlur}
                  checked={formik.values.benefitType === BENEFIT_TYPES.SALARY}
                />
                <StyledRadioButton
                  id={`${fields.benefitType.name}Commission`}
                  name={fields.benefitType.name}
                  value={BENEFIT_TYPES.COMMISSION}
                  label={t(
                    `${translationsBase}.fields.${APPLICATION_FIELDS_STEP2.BENEFIT_TYPE}.commission`
                  )}
                  onChange={(e) => {
                    formik.handleChange(e);
                    formik.setFieldValue(
                      `employee.${APPLICATION_FIELDS_STEP2.EMPLOYEE_JOB_TITLE}`,
                      ''
                    );
                    formik.setFieldValue(
                      `employee.${APPLICATION_FIELDS_STEP2.EMPLOYEE_WORKING_HOURS}`,
                      ''
                    );
                    formik.setFieldValue(
                      `employee.${APPLICATION_FIELDS_STEP2.EMPLOYEE_COLLECTIVE_BARGAINING_AGREEMENT}`,
                      ''
                    );
                    formik.setFieldValue(
                      `employee.${APPLICATION_FIELDS_STEP2.EMPLOYEE_MONTHLY_PAY}`,
                      ''
                    );
                    formik.setFieldValue(
                      `employee.${APPLICATION_FIELDS_STEP2.EMPLOYEE_OTHER_EXPENSES}`,
                      ''
                    );
                    formik.setFieldValue(
                      `employee.${APPLICATION_FIELDS_STEP2.EMPLOYEE_VACATION_MONEY}`,
                      ''
                    );
                  }}
                  checked={
                    formik.values.benefitType === BENEFIT_TYPES.COMMISSION
                  }
                />
              </SelectionGroup>
            </StyledFormGroup>
          </StyledFieildsWithInfoColumn>
          <StyledFieildsWithInfoColumn>
            {formik.values.benefitType === BENEFIT_TYPES.SALARY && (
              <Notification
                label={t(
                  `${translationsBase}.notifications.salaryBenefit.label`
                )}
              >
                {t(`${translationsBase}.notifications.salaryBenefit.content`)}
              </Notification>
            )}
          </StyledFieildsWithInfoColumn>
        </StyledFieildsWithInfoContainer>
      </FormSection>
      <FormSection header={t(`${translationsBase}.heading4`)}>
        {!formik.values.benefitType && (
          <>{t(`${translationsBase}.messages.selectBenefitType`)}</>
        )}
        <StyledFieildsWithInfoContainer>
          <StyledFieildsWithInfoColumn>
            <StyledFormGroup>
              {formik.values.benefitType && (
                <>
                  {t(
                    `${translationsBase}.messages.${camelCase(
                      formik.values.benefitType
                    )}Selected`
                  )}
                </>
              )}
            </StyledFormGroup>
            <StyledFormGroup>
              todo: datepicker range to implement
            </StyledFormGroup>
          </StyledFieildsWithInfoColumn>
          <StyledFieildsWithInfoColumn>
            {formik.values.benefitType && (
              <Notification
                label={t(
                  `${translationsBase}.notifications.${camelCase(
                    formik.values.benefitType
                  )}Selected.label`
                )}
              >
                {t(
                  `${translationsBase}.notifications.${camelCase(
                    formik.values.benefitType
                  )}Selected.content`
                )}
              </Notification>
            )}
          </StyledFieildsWithInfoColumn>
        </StyledFieildsWithInfoContainer>
      </FormSection>
      <FormSection
        header={t(
          `${translationsBase}.heading5${
            formik.values.benefitType === BENEFIT_TYPES.COMMISSION
              ? 'Assignment'
              : 'Employment'
          }`
        )}
        tooltip={t(
          `${translationsBase}.tooltips.heading5${
            formik.values.benefitType === BENEFIT_TYPES.COMMISSION
              ? 'Assignment'
              : 'Employment'
          }`
        )}
      >
        {!formik.values.benefitType && (
          <>{t(`${translationsBase}.messages.selectBenefitType`)}</>
        )}
        {(formik.values.benefitType === BENEFIT_TYPES.EMPLOYMENT ||
          formik.values.benefitType === BENEFIT_TYPES.SALARY) && (
          <>
            <StyledEmploymentRelationshipContainer>
              <TextInput
                id={fields.jobTitle.name}
                name={fields.jobTitle.name}
                label={fields.jobTitle.label}
                placeholder={fields.jobTitle.placeholder}
                onChange={(e) =>
                  formik.setFieldValue(
                    `employee.${APPLICATION_FIELDS_STEP2.EMPLOYEE_JOB_TITLE}`,
                    e.target.value
                  )
                }
                value={formik.values.employee?.jobTitle}
                invalid={
                  !!getErrorMessage(APPLICATION_FIELDS_STEP2.EMPLOYEE_JOB_TITLE)
                }
                aria-invalid={
                  !!getErrorMessage(APPLICATION_FIELDS_STEP2.EMPLOYEE_JOB_TITLE)
                }
                errorText={getErrorMessage(
                  APPLICATION_FIELDS_STEP2.EMPLOYEE_JOB_TITLE
                )}
                required
              />
              <TextInput
                id={fields.workingHours.name}
                name={fields.workingHours.name}
                label={fields.workingHours.label}
                placeholder={fields.workingHours.placeholder}
                onChange={(e) =>
                  formik.setFieldValue(
                    `employee.${APPLICATION_FIELDS_STEP2.EMPLOYEE_WORKING_HOURS}`,
                    e.target.value
                  )
                }
                value={formik.values.employee?.workingHours || ''}
                invalid={
                  !!getErrorMessage(
                    APPLICATION_FIELDS_STEP2.EMPLOYEE_WORKING_HOURS
                  )
                }
                aria-invalid={
                  !!getErrorMessage(
                    APPLICATION_FIELDS_STEP2.EMPLOYEE_WORKING_HOURS
                  )
                }
                errorText={getErrorMessage(
                  APPLICATION_FIELDS_STEP2.EMPLOYEE_WORKING_HOURS
                )}
                required
              />
              <TextInput
                id={fields.collectiveBargainingAgreement.name}
                name={fields.collectiveBargainingAgreement.name}
                label={fields.collectiveBargainingAgreement.label}
                placeholder={fields.collectiveBargainingAgreement.placeholder}
                onChange={(e) =>
                  formik.setFieldValue(
                    `employee.${APPLICATION_FIELDS_STEP2.EMPLOYEE_COLLECTIVE_BARGAINING_AGREEMENT}`,
                    e.target.value
                  )
                }
                value={formik.values.employee?.collectiveBargainingAgreement}
                invalid={
                  !!getErrorMessage(
                    APPLICATION_FIELDS_STEP2.EMPLOYEE_COLLECTIVE_BARGAINING_AGREEMENT
                  )
                }
                aria-invalid={
                  !!getErrorMessage(
                    APPLICATION_FIELDS_STEP2.EMPLOYEE_COLLECTIVE_BARGAINING_AGREEMENT
                  )
                }
                errorText={getErrorMessage(
                  APPLICATION_FIELDS_STEP2.EMPLOYEE_COLLECTIVE_BARGAINING_AGREEMENT
                )}
                required
              />
            </StyledEmploymentRelationshipContainer>
            <Spacing size="s" />
            <Heading
              size="xs"
              header={t(`${translationsBase}.heading5EmploymentSub1`)}
              tooltip={t(`${translationsBase}.tooltips.heading5EmploymentSub1`)}
            />
            <StyledEmploymentMoneyContainer>
              <TextInput
                id={fields.monthlyPay.name}
                name={fields.monthlyPay.name}
                label={fields.monthlyPay.label}
                placeholder={fields.monthlyPay.placeholder}
                onChange={(e) =>
                  formik.setFieldValue(
                    `employee.${APPLICATION_FIELDS_STEP2.EMPLOYEE_MONTHLY_PAY}`,
                    e.target.value
                  )
                }
                value={formik.values.employee?.monthlyPay || ''}
                invalid={
                  !!getErrorMessage(
                    APPLICATION_FIELDS_STEP2.EMPLOYEE_MONTHLY_PAY
                  )
                }
                aria-invalid={
                  !!getErrorMessage(
                    APPLICATION_FIELDS_STEP2.EMPLOYEE_MONTHLY_PAY
                  )
                }
                errorText={getErrorMessage(
                  APPLICATION_FIELDS_STEP2.EMPLOYEE_MONTHLY_PAY
                )}
                required
              />
              <TextInput
                id={fields.otherExpenses.name}
                name={fields.otherExpenses.name}
                label={fields.otherExpenses.label}
                placeholder={fields.otherExpenses.placeholder}
                onChange={(e) =>
                  formik.setFieldValue(
                    `employee.${APPLICATION_FIELDS_STEP2.EMPLOYEE_OTHER_EXPENSES}`,
                    e.target.value
                  )
                }
                value={formik.values.employee?.otherExpenses || ''}
                invalid={
                  !!getErrorMessage(
                    APPLICATION_FIELDS_STEP2.EMPLOYEE_OTHER_EXPENSES
                  )
                }
                aria-invalid={
                  !!getErrorMessage(
                    APPLICATION_FIELDS_STEP2.EMPLOYEE_OTHER_EXPENSES
                  )
                }
                errorText={getErrorMessage(
                  APPLICATION_FIELDS_STEP2.EMPLOYEE_OTHER_EXPENSES
                )}
                required
              />
              <TextInput
                id={fields.vacationMoney.name}
                name={fields.vacationMoney.name}
                label={fields.vacationMoney.label}
                placeholder={fields.vacationMoney.placeholder}
                onChange={(e) =>
                  formik.setFieldValue(
                    `employee.${APPLICATION_FIELDS_STEP2.EMPLOYEE_VACATION_MONEY}`,
                    e.target.value
                  )
                }
                value={formik.values.employee?.vacationMoney || ''}
                invalid={
                  !!getErrorMessage(
                    APPLICATION_FIELDS_STEP2.EMPLOYEE_VACATION_MONEY
                  )
                }
                aria-invalid={
                  !!getErrorMessage(
                    APPLICATION_FIELDS_STEP2.EMPLOYEE_VACATION_MONEY
                  )
                }
                errorText={getErrorMessage(
                  APPLICATION_FIELDS_STEP2.EMPLOYEE_VACATION_MONEY
                )}
                required
              />
            </StyledEmploymentMoneyContainer>
          </>
        )}
        {formik.values.benefitType === BENEFIT_TYPES.COMMISSION && (
          <StyledCommissionContainer>
            <TextInput
              id={fields.commissionDescription.name}
              name={fields.commissionDescription.name}
              label={fields.commissionDescription.label}
              placeholder={fields.commissionDescription.placeholder}
              onChange={(e) =>
                formik.setFieldValue(
                  `employee.${APPLICATION_FIELDS_STEP2.EMPLOYEE_COMMISSION_DESCRIPTION}`,
                  e.target.value
                )
              }
              value={formik.values.employee?.commissionDescription}
              invalid={
                !!getErrorMessage(
                  APPLICATION_FIELDS_STEP2.EMPLOYEE_COMMISSION_DESCRIPTION
                )
              }
              aria-invalid={
                !!getErrorMessage(
                  APPLICATION_FIELDS_STEP2.EMPLOYEE_COMMISSION_DESCRIPTION
                )
              }
              errorText={getErrorMessage(
                APPLICATION_FIELDS_STEP2.EMPLOYEE_COMMISSION_DESCRIPTION
              )}
              required
            />
            <TextInput
              id={fields.commissionAmount.name}
              name={fields.commissionAmount.name}
              label={fields.commissionAmount.label}
              placeholder={fields.commissionAmount.placeholder}
              onChange={(e) =>
                formik.setFieldValue(
                  `employee.${APPLICATION_FIELDS_STEP2.EMPLOYEE_COMMISSION_AMOUNT}`,
                  e.target.value
                )
              }
              value={formik.values.employee?.commissionAmount}
              invalid={
                !!getErrorMessage(
                  APPLICATION_FIELDS_STEP2.EMPLOYEE_COMMISSION_AMOUNT
                )
              }
              aria-invalid={
                !!getErrorMessage(
                  APPLICATION_FIELDS_STEP2.EMPLOYEE_COMMISSION_AMOUNT
                )
              }
              errorText={getErrorMessage(
                APPLICATION_FIELDS_STEP2.EMPLOYEE_COMMISSION_AMOUNT
              )}
              required
            />
          </StyledCommissionContainer>
        )}
      </FormSection>
      <StepperActions
        hasBack
        hasNext
        handleSubmit={handleSubmitNext}
        handleBack={handleSubmitBack}
      />
    </form>
  );
};

export default ApplicationFormStep2;
