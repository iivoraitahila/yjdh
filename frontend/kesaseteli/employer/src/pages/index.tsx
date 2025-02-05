import withAuth from 'kesaseteli/employer/hocs/withAuth';
import useApplicationsQuery from 'kesaseteli/employer/hooks/useApplicationsQuery';
import useCreateApplicationQuery from 'kesaseteli/employer/hooks/useCreateApplicationQuery';
import { GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import getServerSideTranslations from 'shared/i18n/get-server-side-translations';
import { DEFAULT_LANGUAGE } from 'shared/i18n/i18n';

const EmployerIndex: NextPage = () => {
  const {
    data: applications,
    isLoading,
    error: loadApplicationsError,
  } = useApplicationsQuery();
  const {
    mutate: createApplication,
    error: createApplicationError,
  } = useCreateApplicationQuery();

  const errorMessage = (loadApplicationsError ?? createApplicationError)
    ?.message;
  const isError = !!errorMessage;
  const router = useRouter();
  const locale = router.locale ?? DEFAULT_LANGUAGE;

  React.useEffect(() => {
    if (!isLoading && !isError) {
      if (applications && applications.length > 0) {
        const draftApplication = applications[0];
        void router.push(`${locale}/application?id=${draftApplication.id}`);
      } else {
        createApplication();
      }
    }
  }, [isLoading, applications, createApplication, router, locale, isError]);

  return <></>;
};

export const getStaticProps: GetStaticProps = getServerSideTranslations(
  'common'
);

export default withAuth(EmployerIndex);
