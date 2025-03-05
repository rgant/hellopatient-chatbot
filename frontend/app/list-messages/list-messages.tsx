'use client';

import type { FetchMessagesResult } from '@/models/messages';

import { useFetchMessages } from '@/library/message-api';
import { type FC, useEffect } from 'react';

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleString();
};

const ListMessages: FC = () => {
  const { error, fetchData, loading, messages }: FetchMessagesResult = useFetchMessages();

  useEffect(
    () => { fetchData(); },
    [],
  );

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return (
      <p>
        Error:
        {error.message}
      </p>
    );
  }

  if (!messages || messages.length === 0) {
    return <p>Send your first message!</p>;
  }

  const listItems = messages.map(message =>
    [
      <li key={message.id} className="my-8">
        <div className="text-end">
          <span className="font-bold">Alice</span>
          {' '}
          <time className="text-sm " dateTime={message.sent_at}>{formatDate(message.sent_at)}</time>
        </div>
        <p className="message-content">{message.message}</p>
      </li>,
      <li key={message.response.id} className="my-8">
        <div className="text-end">
          <span className="font-bold">Chatbot</span>
          {' '}
          <time className="text-sm " dateTime={message.response.sent_at}>{formatDate(message.response.sent_at)}</time>
        </div>
        <p className="message-content">{message.response.response}</p>

      </li>,
    ],
  );

  return (
    <section aria-label="Chat Log">
      <ol>
        {listItems}
      </ol>
    </section>
  );
};

export default ListMessages;
