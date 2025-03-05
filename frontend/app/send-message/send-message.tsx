'use client';
import type { FetchMessagesResult } from '@/models/messages';
import type { FC, FormEvent } from 'react';

import { sendMessage, useFetchMessages } from '@/library/message-api';

const MessageForm: FC = () => {
  const { fetchData }: FetchMessagesResult = useFetchMessages();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    await sendMessage(formData);
    await fetchData();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="message" type="text" required />
      <button type="submit">Send</button>
    </form>
  );
};

export default MessageForm;
