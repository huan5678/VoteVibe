'use client';

import {ChangeEvent, FormEvent, useState} from 'react';
import {signIn} from 'next-auth/react';
import {useSearchParams, useRouter} from 'next/navigation';
import {Button} from '#/components/ui/button';
import Input from '#/components/ui/input';
import {Label} from '#/components/ui/label';

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

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const result = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({email: formValues.email}),
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

  return (
    <>
      <form onSubmit={onSubmit}>
        {error && <p className="mb-6 rounded bg-red-300 py-4 text-center">{error}</p>}
        <div className="mb-6 flex flex-col gap-4">
          <Label htmlFor="email">使用者帳號</Label>
          <Input
            required
            id="email"
            type="email"
            name="email"
            value={formValues.email}
            onChange={handleChange}
            placeholder="Email address"
          />
        </div>
        <Button className="block" type="submit" variant="primary" disabled={loading}>
          {loading ? 'loading...' : 'Sign In'}
        </Button>

        <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-gray-300 after:mt-0.5 after:flex-1 after:border-t after:border-gray-300">
          <p className="mx-4 mb-0 text-center font-semibold">OR</p>
        </div>
        <div className="space-y-4">
          <Button
            variant="outline"
            className="block w-full"
            onClick={() => signIn('google', {callbackUrl})}
            role="button"
          >
            Continue with Google
          </Button>
          <Button
            variant="outline"
            className="block w-full"
            onClick={() => signIn('github', {callbackUrl})}
            role="button"
          >
            Continue with GitHub
          </Button>
        </div>
      </form>
    </>
  );
};
