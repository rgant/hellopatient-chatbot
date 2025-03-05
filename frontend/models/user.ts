export interface FetchUserResult {
  error?: Error;
  user?: User;
}

export interface User {
  id: string;
  name: string;
}
