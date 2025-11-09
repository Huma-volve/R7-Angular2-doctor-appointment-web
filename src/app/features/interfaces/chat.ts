export interface ChatSummary {
  id: string;
  title: string;      // doctor/patient name
  lastMessage?: string;
  unreadCount?: number;
  avatarUrl?: string;
  updatedAt?: string;
}
