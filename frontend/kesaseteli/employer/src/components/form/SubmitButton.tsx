import { Button, IconArrowRight } from 'hds-react';
import { getApplicationFormContext } from 'kesaseteli/employer/components/form/ApplicationForm';
import Application from 'kesaseteli/employer/types/application';
import React from 'react';

type Props = {
  id: string;
  onSubmit: (application: Application) => void;
  loadingText: string;
  children: React.ReactNode;
};

const SubmitButton = ({
  id,
  loadingText,
  onSubmit,
  children,
}: Props): ReturnType<typeof Button> => {
  const { handleSubmit, isLoading } = React.useContext(
    getApplicationFormContext()
  );

  return (
    <Button
      data-testid={id}
      iconRight={<IconArrowRight />}
      onClick={handleSubmit(onSubmit)}
      loadingText={loadingText}
      isLoading={isLoading}
    >
      {children}
    </Button>
  );
};

export default SubmitButton;
