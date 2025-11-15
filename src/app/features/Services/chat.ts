import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Message } from '../interfaces/message';

@Injectable({ providedIn: 'root' })
export class ChatService {
  private message$ = new Subject<Message>();
  private typing$ = new Subject<{ chatId: string; userId: string }>();

  // 🔹 بيانات المحادثات التجريبية
  private chats = [
    {
      id: '1',
      title: 'Dr. Ahmed Nasser',
      lastMessage: 'See you at 6 PM.',
      unreadCount: 2,
      updatedAt: new Date().toISOString(),
      avatarUrl: 'https://i.pravatar.cc/100?img=12',
    },
    {
      id: '2',
      title: 'Dr. Mariam Youssef',
      lastMessage: 'Please send your report.',
      unreadCount: 0,
      updatedAt: new Date().toISOString(),
      avatarUrl: 'https://i.pravatar.cc/100?img=20',
    },
  ];

  // 🔹 بيانات الرسائل التجريبية
  private messages: Record<string, Message[]> = {
    '1': [
      {
        id: 'a1',
        chatId: '1',
        senderId: 'me',
        text: 'Hello Doctor!',
        createdAt: new Date().toISOString(),
        isMine: true,
      },
      {
        id: 'a2',
        chatId: '1',
        senderId: 'doc',
        text: 'Hello, how are you feeling today?',
        createdAt: new Date().toISOString(),
      },
    ],
    '2': [
      {
        id: 'b1',
        chatId: '2',
        senderId: 'doc',
        text: 'Good morning! Did you take your medicine?',
        createdAt: new Date().toISOString(),
      },
    ],
  };

  constructor() {}

  async fetchChats(): Promise<any[]> {
    await new Promise((r) => setTimeout(r, 400)); // محاكاة تأخير
    return [...this.chats];
  }

  // ✅ جلب الرسائل القديمة
  async fetchHistory(chatId: string): Promise<Message[]> {
    await new Promise((r) => setTimeout(r, 300)); // محاكاة تأخير
    return [...(this.messages[chatId] || [])];
  }

  // ✅ إرسال رسالة (محاكاة)
  sendMessage(chatId: string, text: string) {
    const newMsg: Message = {
      id: crypto.randomUUID(),
      chatId,
      senderId: 'me',
      text,
      createdAt: new Date().toISOString(),
      isMine: true,
    };
    this.messages[chatId] = [...(this.messages[chatId] || []), newMsg];

    // بثّها كأنها وصلت من السيرفر
    setTimeout(() => this.message$.next(newMsg), 200);

    // تحديث آخر رسالة في قائمة المحادثات
    const idx = this.chats.findIndex((c) => c.id === chatId);
    if (idx >= 0) {
      this.chats[idx] = {
        ...this.chats[idx],
        lastMessage: text,
        updatedAt: new Date().toISOString(),
      };
    }
  }

  // ✅ Observable للرسائل الجديدة
  onMessage(): Observable<Message> {
    return this.message$.asObservable();
  }

  // ✅ Typing (محاكاة)
  typing(chatId: string) {
    setTimeout(() => this.typing$.next({ chatId, userId: 'doc' }), 300);
  }

  onTyping(): Observable<{ chatId: string; userId: string }> {
    return this.typing$.asObservable();
  }

  joinChat(_chatId: string) {}
  leaveChat(_chatId: string) {}
}
