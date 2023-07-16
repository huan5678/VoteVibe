import {authOptions} from '#/lib/auth';
import {getServerSession} from 'next-auth';
import {NextResponse} from 'next/server';
import {generateChallenge, isLoggedIn} from '#/lib/auth';
import {withIronSessionSsr} from 'iron-session/next';
import {sessionOptions} from '#/lib/session';

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new NextResponse(JSON.stringify({status: 'fail', message: 'You are not logged in'}), {
      status: 401,
    });
  }

  const getServerSideProps = withIronSessionSsr(async function ({req, res}) {
    if (isLoggedIn(req)) {
      return {
        redirect: {
          destination: '/dashboard',
          permanent: false,
        },
      };
    }
    const challenge = generateChallenge();
    req.session.challenge = challenge;
    await req.session.save();
    return {props: {challenge}};
  }, sessionOptions);

  return NextResponse.json({
    authenticated: !!session,
    session,
    getServerSideProps,
  });
}
