import {prisma} from '#/lib/prisma';
import crypto from 'crypto';
import {compare} from 'bcryptjs';
import {GetServerSidePropsContext, NextApiRequest} from 'next';
import type {NextAuthOptions} from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';
import LineProvider from 'next-auth/providers/line';
import DiscordProvider from 'next-auth/providers/discord';
import type {
  VerifiedAuthenticationResponse,
  VerifiedRegistrationResponse,
} from '@simplewebauthn/server';
import {verifyAuthenticationResponse, verifyRegistrationResponse} from '@simplewebauthn/server';
import type {
  PublicKeyCredentialWithAssertionJSON,
  PublicKeyCredentialWithAttestationJSON,
} from '@github/webauthn-json';

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GCP_OAUTH_CLIENT_ID as string,
      clientSecret: process.env.GCP_OAUTH_KEY as string,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID as string,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
    }),
    LineProvider({
      clientId: process.env.LINE_CLIENT_ID as string,
      clientSecret: process.env.LINE_CLIENT_SECRET as string,
    }),
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID as string,
      clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: 'Sign in',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'example@example.com',
        },
        password: {label: 'Password', type: 'password'},
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user || !(await compare(credentials.password, user.password as string))) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          randomKey: 'Hey cool',
        };
      },
    }),
  ],
  callbacks: {
    session: ({session, token}) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          randomKey: token.randomKey,
        },
      };
    },
    jwt: ({token, user}) => {
      if (user) {
        const u = user as unknown as any;
        return {
          ...token,
          id: u.id,
          randomKey: u.randomKey,
        };
      }
      return token;
    },
  },
};

type SessionRequest = NextApiRequest | GetServerSidePropsContext['req'];

const HOST_SETTINGS = {
  expectedOrigin: process.env.VERCEL_URL ?? 'http://localhost:3000',
  expectedRPID: process.env.RPID ?? 'localhost',
};

function clean(str: string) {
  return str.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}

function binaryToBase64url(bytes: Uint8Array) {
  let str = '';

  bytes.forEach((charCode) => {
    str += String.fromCharCode(charCode);
  });

  return btoa(str);
}

export function generateChallenge() {
  return clean(crypto.randomBytes(32).toString('base64'));
}

export function isLoggedIn(request: SessionRequest) {
  return request.session.userId != null;
}

export async function register(request: NextApiRequest) {
  const challenge = request.session.challenge ?? '';
  const credential = request.body.credential as PublicKeyCredentialWithAttestationJSON;
  const {email, username} = request.body;

  let verification: VerifiedRegistrationResponse;

  if (credential == null) {
    throw new Error('Invalid Credentials');
  }

  try {
    verification = await verifyRegistrationResponse({
      response: credential,
      expectedChallenge: challenge,
      requireUserVerification: true,
      ...HOST_SETTINGS,
    });
  } catch (error) {
    console.error(error);
    throw error;
  }

  if (!verification.verified) {
    throw new Error('Registration verification failed');
  }

  const {credentialID, credentialPublicKey} = verification.registrationInfo ?? {};

  if (credentialID == null || credentialPublicKey == null) {
    throw new Error('Registration failed');
  }

  const user = await prisma.user.create({
    data: {
      email,
      username,
      credentials: {
        create: {
          externalId: clean(binaryToBase64url(credentialID)),
          publicKey: Buffer.from(credentialPublicKey),
        },
      },
    },
  });

  console.log(`Registered new user ${user.id}`);
  return user;
}

export async function login(request: NextApiRequest) {
  const challenge = request.session.challenge ?? '';
  const credential = request.body.credential as PublicKeyCredentialWithAssertionJSON;
  const email = request.body.email;

  if (credential?.id == null) {
    throw new Error('Invalid Credentials');
  }

  const userCredential = await prisma.credential.findUnique({
    select: {
      id: true,
      userId: true,
      externalId: true,
      publicKey: true,
      signCount: true,
      user: {
        select: {
          email: true,
        },
      },
    },
    where: {
      externalId: credential.id,
    },
  });

  if (userCredential == null) {
    throw new Error('Unknown User');
  }

  let verification: VerifiedAuthenticationResponse;
  try {
    verification = await verifyAuthenticationResponse({
      response: credential,
      expectedChallenge: challenge,
      authenticator: {
        credentialID: userCredential.externalId,
        credentialPublicKey: userCredential.publicKey,
        counter: userCredential.signCount,
      },
      ...HOST_SETTINGS,
    });

    await prisma.credential.update({
      data: {
        signCount: verification.authenticationInfo.newCounter,
      },
      where: {
        id: userCredential.id,
      },
    });
  } catch (error) {
    console.error(error);
    throw error;
  }

  if (!verification.verified || email !== userCredential.user.email) {
    throw new Error('Login verification failed');
  }

  console.log(`Logged in as user ${userCredential.userId}`);
  return userCredential.userId;
}
