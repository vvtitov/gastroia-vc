
export type MessageStatus = 'read' | 'delivered' | 'sent';

export interface Message {
  id: number;
  text: string;
  time: string;
  status: MessageStatus;
  sender: string | number;
  receiver: string | number;
}
