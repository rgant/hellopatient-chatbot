export interface FetchMessagesResult {
  error: Error | undefined;
  loading: boolean;
  messages: Message[] | undefined;
}

export interface Message {
  id: string;
  message: string;
  response: Response;
  sent_at: string;
}

interface Response {
  id: string;
  response: string;
  sent_at: string;
}
