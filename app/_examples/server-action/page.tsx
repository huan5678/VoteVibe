import {createServerActionClient} from '@supabase/auth-helpers-nextjs';
import {revalidatePath} from 'next/cache';
import {cookies} from 'next/headers';

export default function ServerAction() {
  const addTodo = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const title = formData.get('title');

    if (title) {
      // Create a Supabase client configured to use cookies
      const supabase = createServerActionClient({cookies});

      // This assumes you have a `todos` table in Supabase. Check out
      // the `Create Table and seed with data` section of the README 👇
      // https://github.com/vercel/next.js/blob/canary/examples/with-supabase/README.md
      await supabase.from('todos').insert({title: title.toString()});
      revalidatePath('/server-action-example');
    }
  };

  return (
    <form onSubmit={addTodo}>
      <label htmlFor="addTodo">Add a todo</label>
      <input id="addTodo" name="title" />
      <button type="submit">Submit</button>
    </form>
  );
}
