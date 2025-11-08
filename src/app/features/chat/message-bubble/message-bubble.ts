import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Message } from '../../interfaces/message';

@Component({
  selector: 'app-message-bubble',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './message-bubble.html',
  styleUrls: ['./message-bubble.scss'],
})
export class MessageBubble {
  @Input() msg!: Message;
}
