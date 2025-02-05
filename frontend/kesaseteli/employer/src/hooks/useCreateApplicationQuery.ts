import { BackendEndpoint } from 'kesaseteli/employer/backend-api/backend-api';
import useBackendAPI from 'kesaseteli/employer/hooks/useBackendAPI';
import Application from 'kesaseteli/employer/types/application';
import { useMutation, UseMutationResult, useQueryClient } from 'react-query';

const useCreateApplicationQuery = (): UseMutationResult<
  unknown,
  Error,
  void
> => {
  const { axios, handleResponse } = useBackendAPI();
  const queryClient = useQueryClient();
  return useMutation<Application, Error, void>(
    'createApplication',
    () =>
      handleResponse<Application>(axios.post(BackendEndpoint.APPLICATIONS, {})),
    {
      onSuccess: () => {
        queryClient.removeQueries('applications', { exact: true });
      },
    }
  );
};

export default useCreateApplicationQuery;
