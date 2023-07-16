'use client';

import {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import {signIn} from 'next-auth/react';
import {useSearchParams, useRouter} from 'next/navigation';
import {supported, get} from '@github/webauthn-json';

export const LoginForm = ({challenge}: {challenge: string}) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    email: '',
  });
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
  const [error, setError] = useState('');

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/profile';

  useEffect(() => {
    const checkAvailability = async () => {
      const available = await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
      setIsAvailable(available && supported());
    };

    checkAvailability();
  }, []);

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const credential = await get({
      publicKey: {
        challenge,
        timeout: 60000,
        userVerification: 'required',
        rpId: 'localhost',
      },
    });

    const result = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({email: formValues.email, credential}),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (result.ok) {
      router.push('/dashboard');
    } else {
      const {message} = await result.json();
      setError(message);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setFormValues({...formValues, [name]: value});
  };

  const input_style =
    'form-control block w-full px-4 py-5 text-sm font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none';

  return (
    <>
      {isAvailable ? (
        <form onSubmit={onSubmit}>
          {error && <p className="mb-6 rounded bg-red-300 py-4 text-center">{error}</p>}
          <div className="mb-6">
            <input
              required
              type="email"
              name="email"
              value={formValues.email}
              onChange={handleChange}
              placeholder="Email address"
              className={`${input_style}`}
            />
          </div>
          <button
            type="submit"
            style={{backgroundColor: `${loading ? '#ccc' : '#3446eb'}`}}
            className="inline-block w-full rounded bg-blue-600 px-7 py-4 text-sm font-medium uppercase leading-snug text-white shadow-md transition duration-150 ease-in-out hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg"
            disabled={loading}
          >
            {loading ? 'loading...' : 'Sign In'}
          </button>

          <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-gray-300 after:mt-0.5 after:flex-1 after:border-t after:border-gray-300">
            <p className="mx-4 mb-0 text-center font-semibold">OR</p>
          </div>

          <a
            className="mb-3 flex w-full items-center justify-center rounded px-7 py-2 text-sm font-medium uppercase leading-snug text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg"
            style={{backgroundColor: '#3b5998'}}
            onClick={() => signIn('google', {callbackUrl})}
            role="button"
          >
            <img className="pr-2" src="/images/google.svg" alt="" style={{height: '2rem'}} />
            Continue with Google
          </a>
          <a
            className="flex w-full items-center justify-center rounded px-7 py-2 text-sm font-medium uppercase leading-snug text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg"
            style={{backgroundColor: '#55acee'}}
            onClick={() => signIn('github', {callbackUrl})}
            role="button"
          >
            <img className="pr-2" src="/images/github.svg" alt="" style={{height: '2.2rem'}} />
            Continue with GitHub
          </a>
        </form>
      ) : (
        <p>Sorry, webauthn is not available.</p>
      )}
    </>
  );
};
