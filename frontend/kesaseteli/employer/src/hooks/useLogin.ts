import {
  BackendEndpoint,
  getBackendUrl,
} from 'kesaseteli/employer/backend-api/backend-api';
import { useRouter } from 'next/router';
import React from 'react';

const useLogin = (): (() => Promise<boolean>) => {
  const router = useRouter();
  return React.useCallback(
    () => router.push(getBackendUrl(BackendEndpoint.LOGIN)),
    [router]
  );
};

export default useLogin;
