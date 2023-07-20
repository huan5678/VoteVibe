'use client';

import {Auth} from '@supabase/auth-ui-react';
import {ThemeSupa} from '@supabase/auth-ui-shared';
import {Provider} from '@supabase/supabase-js';
import {useSupabase} from '../../components/providers/supabase-provider';
import {getURL} from '#/lib/utils/helper';
import {useMemo} from 'react';

export default function AuthUI() {
  const {supabase} = useSupabase();
  const provider = useMemo(() => ['google', 'discord', 'facebook', 'github'], []);

  return (
    <div className="flex flex-col space-y-4">
      <Auth
        supabaseClient={supabase}
        providers={provider as Provider[]}
        redirectTo={getURL()}
        magicLink={true}
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: '#404040',
                brandAccent: '#52525b',
              },
            },
          },
        }}
        theme="default"
      />
    </div>
  );
}
