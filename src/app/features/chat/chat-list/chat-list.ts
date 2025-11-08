import { CommonModule } from '@angular/common';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ChatSummary } from '../../interfaces/chat';
import { ChatService } from '../../Services/chat';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './chat-list.html',
  styleUrls: ['./chat-list.scss'],
})
export class ChatList implements OnInit {
  chats: ChatSummary[] = [];
  filtered: ChatSummary[] = [];
  q = '';

  constructor(private chat: ChatService, private router: Router, private cdr: ChangeDetectorRef) {}

  async ngOnInit() {
    this.chats = await this.chat.fetchChats();
    this.filter();
    this.cdr.detectChanges();
  }

  filter() {
    const qq = (this.q || '').toLowerCase().trim();

    if (!qq) {
      this.filtered = [...this.chats];
      return;
    }

    this.filtered = this.chats.filter((c) => c.title.toLowerCase().includes(qq));
  }

  open(id: string) {
    this.router.navigate(['/layout/chats', id]);
  }
}
