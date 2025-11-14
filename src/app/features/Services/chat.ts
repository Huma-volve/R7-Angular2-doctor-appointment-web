import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map, of } from 'rxjs';
import { ChatSummary } from '../interfaces/chat';
import { Message } from '../interfaces/message';

@Injectable({ providedIn: 'root' })
export class ChatService {
  private base = 'api/chat/chat';

  constructor(private http: HttpClient) {}

  getChats(): Observable<ChatSummary[]> {
    return this.http.get<any>(`api/chat/chat/chats`);
  }
  searchDoctors(text: string): Observable<ChatSummary[]> {
    return this.http.get<ChatSummary[]>(`api/chat/chat/chats?search=${text}`);
  }

  startChat(receiverId: string): Observable<any> {
    return this.http.post(`api/chat/chat/startChat?receiverId=${receiverId}`, { receiverId });
  }
  sendMessage(chatId: number, content: string, receiverId: string | any) {
    const formData = new FormData();
    formData.append('chatId', chatId.toString());
    formData.append('ReceiverId', receiverId);
    formData.append('Content', content);
    return this.http.post(`api/chat/chat/send`, formData);
  }
}
