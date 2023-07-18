import {createServerSupabaseClient} from '#/utils/supabase-server';
import SignNavigation from './SignNavigation';
import SignOutButton from './SignOutButton';

export default async function Navbar() {
  const supabase = createServerSupabaseClient();
  const {
    data: {user},
  } = await supabase.auth.getUser();

  return (
    <nav>
      <div className="flex justify-end flex-1 space-x-8">
        {user ? <SignOutButton /> : <SignNavigation />}
      </div>
    </nav>
  );
}
