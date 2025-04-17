
import React from 'react';
import { cn } from '@/lib/utils';
import { Message } from '@/types/message';

interface MessageItemProps {
  message: Message;
  isOwnMessage: boolean;
}

export const MessageItem: React.FC<MessageItemProps> = ({ message, isOwnMessage }) => {
  return (
    <div
      className={cn(
        "flex flex-col max-w-[80%] mb-3",
        isOwnMessage ? "ml-auto items-end" : "items-start"
      )}
    >
      <div
        className={cn(
          "rounded-lg px-4 py-2 text-sm",
          isOwnMessage
            ? "bg-primary text-primary-foreground"
            : "bg-muted"
        )}
      >
        {message.text}
      </div>
      <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
        <span>{message.time}</span>
        {isOwnMessage && (
          <span>
            {message.status === 'read' && '✓✓'}
            {message.status === 'delivered' && '✓✓'}
            {message.status === 'sent' && '✓'}
          </span>
        )}
      </div>
    </div>
  );
};
