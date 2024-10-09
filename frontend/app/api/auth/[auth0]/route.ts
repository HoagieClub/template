import { handleAuth, handleLogin } from '@auth0/nextjs-auth0';
import { NextApiRequest, NextApiResponse } from 'next';

export const GET = handleAuth({
  async login(request: NextApiRequest, response: NextApiResponse) {
    try {
      // Pass custom parameters to login
      await handleLogin(request, response, {
        authorizationParams: {
          audience: 'https://hoagieauth', // or AUTH0_AUDIENCE
          // Add the `offline_access` scope to also get a Refresh Token
          connection: 'Princeton-CAS',
        },
        returnTo: '/',
      });
    } catch (error: any) {
      response.status(error.status || 400).end(error.message);
    }
  },
});
