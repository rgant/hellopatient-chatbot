import type { FetchMessagesResult, Message } from '@/models/messages';

import { useEffect, useState } from 'react';

import { apiUrl } from './constants';

export const useFetchMessages = (): FetchMessagesResult => {
  const [messages, setData] = useState<Message[] | undefined>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | undefined>();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`${apiUrl}/messages/me`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData: Message[] = await response.json();
        setData(jsonData);
      } catch (error_) {
        if (error_ instanceof Error) {
          setError(error_);
        } else {
          setError(new Error('An unknown error occurred'));
        }
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return { error, loading, messages };
};
