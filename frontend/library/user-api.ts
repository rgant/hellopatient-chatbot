import type { FetchUserResult, User } from '@/models/User';

import { apiUrl } from './constants';

export const getUser = async (): Promise<FetchUserResult> => {
  try {
    const response = await fetch(`${apiUrl}/users/me`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const user: User = await response.json();
    return { user };
  } catch (error_) {
    return { error: error_ instanceof Error ? error_ : new Error('An unknown error occurred') };
  }
};
