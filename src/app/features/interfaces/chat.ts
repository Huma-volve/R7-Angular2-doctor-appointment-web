export interface ChatSummary {
  id: string;
  title: string;
  avatarUrl: string;
  lastMessage: string;
  unreadCount: number;
  updatedAt: string;
  isSuggestion?: boolean;
}
