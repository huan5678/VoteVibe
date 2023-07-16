import {NextApiRequest, NextApiResponse} from 'next';
import {withIronSessionApiRoute} from 'iron-session/next';
import {login} from '#/lib/auth';
import {sessionOptions} from '#/lib/session';

export async function POST(request: NextApiRequest, response: NextApiResponse) {
  try {
    const userId = await login(request);
    request.session.userId = userId;
    await request.session.save();

    response.json(userId);
  } catch (error) {
    response.status(500).json({message: (error as Error).message});
  }
}

export default withIronSessionApiRoute(POST, sessionOptions);
