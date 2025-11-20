import {
  Component,
  OnInit,
  signal,
  ChangeDetectorRef,
  AfterViewChecked,
  ViewChild,
  ElementRef,
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../../Services/chat';
import { ChatSummary } from '../../interfaces/chat';
import { Message } from '../../interfaces/message';
import { MessageBubble } from '../message-bubble/message-bubble';
import { environment } from '../../../core/environment/environment';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-chat-page',
  standalone: true,
  imports: [CommonModule, FormsModule, MessageBubble],
  templateUrl: './chat-list.html',
  styleUrls: ['./chat-list.scss'],
})
export class ChatPage implements OnInit, AfterViewChecked {
  chats = signal<ChatSummary[]>([]);
  filtered = signal<any>([]);
  messages = signal<Message[]>([]);
  baseUrl = environment.apiBaseUrl;
  q = '';
  text = '';

  selectedChatId: number = 0;
  selectedReceiverId: string | null = null;

  title = signal('Chat');
  ProfileImg = signal<string | any>('');
  isMobile = false;

  @ViewChild('scrollMe') scrollContainer?: ElementRef<HTMLDivElement>;
  private shouldScroll = false;
  private meId = 'current-user-id';

  constructor(
    private chat: ChatService,
    private cdr: ChangeDetectorRef,
    private readonly _tostar: ToastrService
  ) {}

  ngOnInit() {
    this.isMobile = window.innerWidth < 768;
    this.getChat();
  }
  getChat(): void {
    this.chat.getChats().subscribe((res: any) => {
      const list = (res.data?.chatListDTOs || []).map((c: any) => ({
        id: c.doctorId,
        chatId: c.id,
        name: c.doctorName,
        img: c.img,
        lastMessage: c.lastMessageContent,
        unReadMessages: c.unReadMessages,
        isSuggestion: false,
      }));

      this.chats.set(list);
      this.filtered.set([...list]);
      console.log('filtered', this.filtered());
    });
  }
  ngAfterViewChecked() {
    if (this.shouldScroll) {
      this.scrollToBottom();
      this.shouldScroll = false;
    }
  }
  filter() {
    const term = this.q.trim().toLowerCase();

    if (!term) {
      this.filtered.set([...this.chats()]);
      this.closeChat();
      this.getChat();

      return;
    }

    this.chat.searchDoctors(term).subscribe({
      next: (res: any) => {
        this.filtered.set(res.data.doctorsListDTO);
      },
    });
  }

  selectChat(item: any) {
    this.selectedChatId = item.id;

    if (!item.isSuggestion) {
      this.openChat(item.id, item.title);
      return;
    }

    this.chat.startChat(item.id).subscribe({
      next: (res) => {
        this.selectedReceiverId = item.id;
        this.openChat(res.chatId, item.title);
      },
    });
  }

  openChat(chatId: string, name: string) {
    this.chat.startChat(chatId).subscribe({
      next: (res: any) => {
        console.log('startchat', res);
        this.messages.set(res.data.messageListDTO);
        this.selectedChatId = res.data.id;
        this.selectedReceiverId = res.data.receiverId;
        this.title.set(res.data.name);
        this.ProfileImg.set(res.data.image);
      },
    });
    if (this.isMobile) window.scrollTo(0, 0);
  }

  send() {
    if (!this.selectedChatId || !this.selectedReceiverId) return;
    const content = this.text.trim();
    if (!content) return;

    const optimistic: Message = {
      id: Date.now(),
      isPatient: true,
      content: content,
      senderUserId: this.meId,
      mediaUrl: null,
      fileType: '',
      sentAt: new Date().toISOString(),
      isRead: false,
    };

    this.messages.update((list) => [...list, optimistic]);
    this.shouldScroll = true;

    this.chat.sendMessage(this.selectedChatId, content, this.selectedReceiverId).subscribe();
    this.text = '';
  }

  scrollToBottom() {
    if (!this.scrollContainer) return;
    const el = this.scrollContainer.nativeElement;
    el.scrollTop = el.scrollHeight;
  }

  closeChat() {
    this.selectedChatId = 0;
    this.selectedReceiverId = null;
    this.messages.set([]);
  }
  toggleFavourite(doctor: any) {
    const oldValue = doctor.isFavouriteDoctor;
    doctor.isFavouriteDoctor = !doctor.isFavouriteDoctor;

    const request = {
      chatId: doctor.chatId,
      receiverId: doctor.id,
    };
    console.log(request);
    this.chat.toggleFavouriteDoctor(request).subscribe({
      next: (res) => {
        if (res.data.isMarkedFavourite == true) {
          this._tostar.success('chat is marked favourite success');
        } else {
          this._tostar.success('chat is marked Un favourite success');
        }
      },
    });
  }
}
