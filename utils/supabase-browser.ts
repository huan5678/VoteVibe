import {Database} from '#/types/db';
import {createPagesBrowserClient} from '@supabase/auth-helpers-nextjs';

export const createClient = () => createPagesBrowserClient<Database>();
