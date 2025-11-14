export interface Message {
  id: number;
  isPatient: boolean;
  content: string;
  senderUserId: string;
  mediaUrl: null;
  fileType: string;
  sentAt: string;
  isRead: boolean;
}
