'use client';

import type { Message } from '@/models/messages';
import type { FC } from 'react';

import { createContext, useState } from 'react';

import ListMessages from '../list-messages/list-messages';
import MessageForm from '../send-message/send-message';

export interface MessagesContextProperties {
  messages: Message[];
  setMessages: (messages: Message[]) => void;
}

export const MessagesContext = createContext<MessagesContextProperties>({
  messages: [],
  setMessages: (): void => { console.error('Error'); },
});

const MessagesProvider: FC = () => {
  const [messages, setValue] = useState<Message[]>([]);

  const setMessages = (messages: Message[]) => {
    setValue(messages);
  };

  const contextValue: MessagesContextProperties = {
    messages,
    setMessages,
  };

  return (
    <MessagesContext.Provider value={contextValue}>
      <ListMessages />
      <MessageForm />
    </MessagesContext.Provider>
  );
};

export default MessagesProvider;
