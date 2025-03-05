'use client';

import type { FC, FormEvent } from 'react';

import { sendMessage } from '@/library/message-api';

const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  await sendMessage(formData);
};

const MessageForm: FC = () => {
  return (
    <form onSubmit={handleSubmit}>
      <input name="message" type="text" required />
      <button type="submit">Send</button>
    </form>
  );
};

export default MessageForm;
