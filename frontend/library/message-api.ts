import type { FetchMessagesResult, Message } from '@/models/messages';

import { MessagesContext, type MessagesContextProperties } from '@/app/chat/chat';
import { useContext, useState } from 'react';

import { apiUrl } from './constants';

export const sendMessage = async (formData: FormData): Promise<void> => {
  const payload = JSON.stringify(Object.fromEntries(formData));
  await fetch(`${apiUrl}/messages/me`, {
    body: payload,
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
  });
};

export const useFetchMessages = (): FetchMessagesResult => {
  const { messages, setMessages } = useContext<MessagesContextProperties>(MessagesContext);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | undefined>();

  const fetchData = async () => {
    try {
      const response = await fetch(`${apiUrl}/messages/me`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const jsonData: Message[] = await response.json();
      setMessages(jsonData);
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

  return { error, fetchData, loading, messages };
};
