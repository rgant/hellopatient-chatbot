import type { FetchUserResult } from '@/models/User';

import { getUser } from '@/library/user-api';

import ListMessages from './list-messages/list-messages';

export default async function Home() {
  const { error, user }: FetchUserResult = await getUser();

  if (error) {
    return (
      <p>
        Error:
        {error.message}
      </p>
    );
  }

  if (!user) {
    return <p>User not found.</p>;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <p>
        Hello,
        {user.name}
        !
      </p>

      <ListMessages />
    </main>
  );
}
