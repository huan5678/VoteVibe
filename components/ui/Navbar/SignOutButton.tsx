'use client';

import {useRouter} from 'next/navigation';
import s from './Navbar.module.css';
import {useSupabase} from '#/components/providers/supabase-provider';

export default function SignOutButton() {
  const router = useRouter();
  const {supabase} = useSupabase();
  return (
    <button
      className={s.link}
      onClick={async () => {
        await supabase.auth.signOut();
        router.push('/signin');
      }}
    >
      Sign out
    </button>
  );
}
