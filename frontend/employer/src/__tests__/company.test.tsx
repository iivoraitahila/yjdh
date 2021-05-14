import { screen } from '@testing-library/react';
import endpoint from 'employer/backend-api/backend-endpoints';
import getBackendUrl from 'employer/backend-api/backend-url';
import CompanyPage from 'employer/pages/company';
import Company from 'employer/types/company';
import { axe } from 'jest-axe';
import nock from 'nock';
import React from 'react';
import { QueryClient } from 'react-query';

import { createQueryClient, renderComponent } from './utils/react-query-utils';

const expectedCompany: Company = {
  id: 'id',
  name: 'Acme Oy',
  business_id: '0877830-0',
  industry: 'Taloustavaroiden vähittäiskauppa',
  street_address: 'Vasaratie 4 A 3',
  postcode: '65350',
  city: 'Vaasa',
};

const expectToReplyOk = (): nock.Scope =>
  nock(getBackendUrl())
    .get(endpoint.COMPANY)
    .reply(200, expectedCompany, { 'Access-Control-Allow-Origin': '*' });

const expectToReplyError = (times = 1): nock.Scope =>
  nock(getBackendUrl())
    .get(endpoint.COMPANY)
    .times(times)
    .replyWithError('Expected error');

const waitForPageIsLoaded = (): Promise<HTMLElement> =>
  screen.findByRole('heading', { name: /hakemus/i });

const waitForShowingCompanyData = async (
  company: Company = expectedCompany
): Promise<void> => {
  await waitForPageIsLoaded();
  expect(screen.queryByText(company.name)).toBeInTheDocument();
  expect(screen.queryByText(company.business_id)).toBeInTheDocument();
  expect(screen.queryByText(company.industry)).toBeInTheDocument();
  expect(screen.queryByText(company.street_address)).toBeInTheDocument();
  expect(screen.queryByText(company.postcode)).toBeInTheDocument();
  expect(screen.queryByText(company.city)).toBeInTheDocument();
};

describe('frontend/employer/src/pages/companyPage.tsx', () => {
  let queryClient: QueryClient;

  it('should not violate accessibility', async () => {
    const { container } = renderComponent(<CompanyPage />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  describe('loading data', () => {
    queryClient = createQueryClient();
    beforeEach(() => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      queryClient.clear();
    });

    it('Should show company data', async () => {
      expectToReplyOk();
      renderComponent(<CompanyPage />, queryClient);
      await waitForShowingCompanyData();
    });

    it('Should show error', async () => {
      expectToReplyError();
      renderComponent(<CompanyPage />, queryClient);
      await screen.findByText(/virhe/i);
    });

    it('Should retry when error', async () => {
      queryClient = createQueryClient({
        queries: {
          retry: 2,
          retryDelay: 1,
        },
      });
      expectToReplyError(2);
      expectToReplyOk();
      renderComponent(<CompanyPage />, queryClient);
      await waitForShowingCompanyData();
    });
  });
});