import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeAgo',
  standalone: true,
})
export class TimeAgoPipe implements PipeTransform {
  transform(value: any): string {
    if (!value) return '';
    let date: Date;
    if (typeof value === 'string') {
      let s = value.trim();

      // Normalize ISO-like strings:
      // - Match YYYY-MM-DDTHH:MM:SS[.fractional][Z|±HH[:MM]]
      s = s.replace(/^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3})\d+/, '$1');
      // If it's an ISO-like string without timezone info, treat it as UTC by appending 'Z'
      if (/^\d{4}-\d{2}-\d{2}T/.test(s) && !/(?:Z|[+-]\d{2}(?::?\d{2})?)$/.test(s)) {
        s = s + 'Z';
      }
      date = new Date(s);
    } else {
      date = new Date(value);
    }

    const now = new Date();
    let seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    // If date is in the future (due to timezone parsing), treat as "just now"
    if (seconds < 0) seconds = 0;

    if (seconds < 60) return 'just now';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(seconds / 3600);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(seconds / 86400);
    if (days < 7) return `${days}d ago`;
    const weeks = Math.floor(days / 7);
    if (weeks < 4) return `${weeks}w ago`;
    const months = Math.floor(days / 30);
    if (months < 12) return `${months}mo ago`;
    const years = Math.floor(days / 365);
    if (years >= 1) return `${years}y ago`;
    return `A while ago`;
  }
}
