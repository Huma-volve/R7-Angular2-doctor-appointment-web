export interface Message {
  id: string;
  chatId: string;
  senderId: string;
  text: string;
  createdAt: string;
  isMine?: boolean;
  senderName?: string;
}
