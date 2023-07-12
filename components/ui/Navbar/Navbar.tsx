import Link from 'next/link';
import {createServerSupabaseClient} from '#/utils/supabase-server';
import SignOutButton from './SignOutButton';

import s from './Navbar.module.css';

export default async function Navbar() {
  const supabase = createServerSupabaseClient();
  const {
    data: {user},
  } = await supabase.auth.getUser();

  return (
    <nav>
      <div className="flex flex-1 justify-end space-x-8">
        {user ? (
          <SignOutButton />
        ) : (
          <Link href="/signin" className={`${s.link} bg-gray-900 p-4`}>
            Sign in
          </Link>
        )}
      </div>
    </nav>
  );
}
