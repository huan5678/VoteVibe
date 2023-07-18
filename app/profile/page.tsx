import {authOptions} from '#/lib/auth';
import {getServerSession} from 'next-auth';
import Image from 'next/image';

export default async function Profile() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  return (
    <>
      <section className="min-h-screen pt-20 bg-ct-blue-600">
        <div className="bg-ct-dark-100 mx-auto flex h-[20rem] max-w-4xl items-center justify-center rounded-md">
          <div>
            <p className="mb-3 text-5xl font-semibold text-center">Profile Page</p>
            {!user ? (
              <p>Loading...</p>
            ) : (
              <div className="flex items-center gap-8">
                <div>
                  <Image
                    src={user.image ? user.image : '/images/default.png'}
                    className="max-h-36"
                    alt={`profile photo of ${user.name}`}
                  />
                </div>
                <div className="mt-8">
                  <p className="mb-3">Name: {user.name}</p>
                  <p className="mb-3">Email: {user.email}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
