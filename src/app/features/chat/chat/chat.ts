import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Message } from '../../interfaces/message';
import { ChatService } from '../../Services/chat';
import { MessageBubble } from '../message-bubble/message-bubble';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule, MessageBubble],
  templateUrl: './chat.html',
  styleUrls: ['./chat.scss'],
})
export class Chat implements OnInit, OnDestroy {
  chatId!: string;
  text = '';
  private meId = 'current-user-id';

  // Signals state
  messages = signal<Message[]>([]);
  title = signal<string>('Chat');
  isTyping = signal<boolean>(false);
  private typingTimer?: any;

  constructor(private route: ActivatedRoute, private chat: ChatService) {}

  async ngOnInit() {
    this.chatId = this.route.snapshot.paramMap.get('id')!;
    this.chat.joinChat(this.chatId);

    // History (mock/real)
    const history = await this.chat.fetchHistory(this.chatId);
    const decorated = history.map((m) => ({ ...m, isMine: m.senderId === this.meId }));
    this.messages.set(decorated);

    // Live messages
    this.chat.onMessage().subscribe((m) => {
      if (m.chatId !== this.chatId) return;
      m.isMine = m.senderId === this.meId;
      this.messages.update((list) => [...list, m]);
      queueMicrotask(() => this.scrollToBottom());
    });

    // Typing
    this.chat.onTyping().subscribe((e) => {
      if (e.chatId !== this.chatId) return;
      this.isTyping.set(true);
      clearTimeout(this.typingTimer);
      this.typingTimer = setTimeout(() => this.isTyping.set(false), 1200);
    });

    queueMicrotask(() => this.scrollToBottom());
  }

  ngOnDestroy() {
    if (this.chatId) this.chat.leaveChat(this.chatId);
  }

  send() {
    const content = this.text.trim();
    if (!content) return;
    this.chat.sendMessage(this.chatId, content);

    // Optimistic UI
    const optimistic: Message = {
      id: crypto.randomUUID(),
      chatId: this.chatId,
      senderId: this.meId,
      text: content,
      createdAt: new Date().toISOString(),
      isMine: true,
    };
    this.messages.update((list) => [...list, optimistic]);
    this.text = '';
    this.scrollToBottom();
  }

  onTyping() {
    this.chat.typing(this.chatId);
  }

  onScroll() {}

  private scrollToBottom() {
    const el = document.getElementById('scrollMe');
    if (el) el.scrollTop = el.scrollHeight;
  }
}
