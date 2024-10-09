import { getAccessToken } from '@auth0/nextjs-auth0';
import { RequestInit } from 'next/dist/server/web/spec-extension/request';
import { withMockableApiAuthRequired } from '@/mock/User';
import { NextApiRequest, NextApiResponse } from 'next';
import { toErrorWithMessage, getErrorMessage, handleError } from '@/components/Error';
import type { ErrorWithMessage } from '@/components/Error';

export default withMockableApiAuthRequired(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // Extract and format the path from the query parameters
    const path = Array.isArray(req.query.path) ? req.query.path.join('/') : req.query.path || '';
    delete req.query.path;

    // Construct the query string
    const queryString = new URLSearchParams(req.query as Record<string, string>).toString();
    const url = `${process.env.HOAGIE_API_URL}/${path}${queryString ? `?${queryString}` : ''}`;

    // Create the initial fetch request options
    const fetchOptions: RequestInit = {
      method: req.method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    // Add request body for non-GET requests
    if (req.method !== 'GET') {
      fetchOptions.body = JSON.stringify(req.body);
    }

    // Handle the development environment without authentication
    if (process.env.NODE_ENV === 'development') {
      const [data, fetchError] = await handleError(fetch(url, fetchOptions));
      return handleFetchResponse(res, data, fetchError);
    }

    // Get access token for authenticated requests
    const { accessToken } = await getAccessToken(req, res);
    fetchOptions.headers = {
      ...fetchOptions.headers,
      Authorization: `Bearer ${accessToken}`,
    };

    // Fetch data from the API with authentication
    const [data, fetchError] = await handleError(fetch(url, fetchOptions));
    return handleFetchResponse(res, data, fetchError);
  } catch (error) {
    const errorWithMessage = toErrorWithMessage(error);
    console.error('Error in API handler:', errorWithMessage.message);
    res
      .status(500)
      .send({ error: 'Internal Server Error', details: getErrorMessage(errorWithMessage) });
  }
});

// Helper function to handle API fetch response and send appropriate output
function handleFetchResponse(
  res: NextApiResponse,
  data: Response | null,
  error: ErrorWithMessage | null
) {
  if (error) {
    console.error('Fetch Error:', error.message);
    return res.status(404).send({ error: 'Resource not found', details: error.message });
  }

  if (!data) {
    return res.status(500).send({ error: 'Unexpected error occurred' });
  }

  if (data.status === 204) {
    return res.status(204).send({});
  }

  return data.json().then(
    (jsonData) => res.status(data.status).send(jsonData),
    (parseError) => {
      console.error('JSON Parse Error:', parseError);
      res.status(data.status).send({ error: 'Invalid JSON response', details: parseError.message });
    }
  );
}
