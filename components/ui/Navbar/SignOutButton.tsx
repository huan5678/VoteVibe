import {useRouter} from 'next/navigation';
import {useSupabase} from '#/components/providers/supabase-provider';
import {Button} from '../button';

export default function SignOutButton() {
  const router = useRouter();
  const {supabase} = useSupabase();
  return (
    <Button
      onClick={async () => {
        await supabase.auth.signOut();
        router.push('/signin');
      }}
    >
      Sign out
    </Button>
  );
}
