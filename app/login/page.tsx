import Link from 'next/link';
import {LoginForm} from './form';
import {generateChallenge} from '#/lib/auth';

export default function Login() {
  const challenge = generateChallenge();
  return (
    <div className="flex w-full flex-1 flex-col justify-center gap-2 bg-gray-50 px-8 sm:max-w-md">
      <Link
        href="/"
        className="text-foreground bg-btn-background hover:bg-btn-background-hover group absolute left-8 top-8 flex items-center rounded-md px-4 py-2 text-sm no-underline"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>{' '}
        Back
      </Link>
      <LoginForm challenge={challenge} />
    </div>
  );
}
