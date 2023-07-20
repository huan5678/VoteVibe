import {getSession} from '../../lib/utils/supabase-server';
import AuthUI from './AuthUI';

import {redirect} from 'next/navigation';

export default async function SignIn() {
  const session = await getSession();

  if (session) {
    return redirect('/account');
  }

  return (
    <div className="height-screen-helper flex justify-center">
      <div className="m-auto flex w-80 max-w-lg flex-col justify-between p-3 ">
        <div className="flex justify-center pb-12 ">
          <h2>LOGO</h2>
        </div>
        <AuthUI />
      </div>
    </div>
  );
}
