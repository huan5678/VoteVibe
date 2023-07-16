'use client';

import {create, supported} from '@github/webauthn-json';
import {signIn} from 'next-auth/react';
import {ChangeEvent, useEffect, useState} from 'react';

export const RegisterForm = ({challenge}: {challenge: string}) => {
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState('');

  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAvailability = async () => {
      const available = await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
      setIsAvailable(available && supported());
    };
    checkAvailability();
  }, []);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const credential = await create({
      publicKey: {
        challenge: challenge,
        rp: {
          // Change these later
          name: 'next-webauthn',
          id: 'localhost',
        },
        user: {
          // Maybe change these later
          id: window.crypto.randomUUID(),
          name: formValues.email,
          displayName: formValues.name,
        },
        // Don't change these later
        pubKeyCredParams: [{alg: -7, type: 'public-key'}],
        timeout: 60000,
        attestation: 'direct',
        authenticatorSelection: {
          residentKey: 'required',
          userVerification: 'required',
        },
      },
    });

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        body: JSON.stringify({email: formValues.email, name: formValues.name, credential}),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      setLoading(false);
      setFormValues({name: '', email: '', password: ''});
      if (!res.ok) {
        setError((await res.json()).message);
        return;
      }

      signIn(undefined, {callbackUrl: '/'});
    } catch (error: any) {
      setLoading(false);
      setError(error);
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
              type="name"
              name="name"
              value={formValues.name}
              onChange={handleChange}
              placeholder="Name"
              className={`${input_style}`}
            />
          </div>
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
          <div className="mb-6">
            <input
              required
              type="password"
              name="password"
              value={formValues.password}
              onChange={handleChange}
              placeholder="Password"
              className={`${input_style}`}
            />
          </div>
          <button
            type="submit"
            style={{backgroundColor: `${loading ? '#ccc' : '#3446eb'}`}}
            className="inline-block w-full rounded bg-blue-600 px-7 py-4 text-sm font-medium uppercase leading-snug text-white shadow-md transition duration-150 ease-in-out hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg"
            disabled={loading}
          >
            {loading ? 'loading...' : 'Sign Up'}
          </button>
        </form>
      ) : (
        <p>Sorry, WebAuthn is not available.</p>
      )}
    </>
  );
};
