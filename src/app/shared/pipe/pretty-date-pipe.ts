import { Pipe, PipeTransform } from '@angular/core';

export interface PrettyDateOptions {
  locale?: string;
  showSpaceAfterComma?: boolean;
}

@Pipe({ name: 'prettyDate', standalone: true, pure: true })
export class PrettyDatePipe implements PipeTransform {
  transform(value: Date | string | number | null | undefined, opts?: PrettyDateOptions): string {
    if (value === null || value === undefined || value === '') return '';

    const options: PrettyDateOptions = {
      locale: 'en-US',
      showSpaceAfterComma: true,
      ...(opts || {}),
    };

    const date = value instanceof Date ? value : new Date(value);
    if (isNaN(date.getTime())) return '';

    const weekday = new Intl.DateTimeFormat(options.locale!, { weekday: 'long' }).format(date);
    const month = new Intl.DateTimeFormat(options.locale!, { month: 'long' }).format(date);
    const day = date.getDate(); // 17

    let hour = date.getHours();
    const minute = String(date.getMinutes()).padStart(2, '0');
    const ampm = hour >= 12 ? 'pm' : 'am';
    hour = hour % 12;
    if (hour === 0) hour = 12;

    const spaceAfterComma = options.showSpaceAfterComma ? ', ' : ',';
    // default build: "Friday, July 17 - 4:00pm"
    // if you want "Friday,July17 -4:00pm" call with showSpaceAfterComma:false
    return `${weekday}${spaceAfterComma}${month}${day} -${hour}:${minute}${ampm}`;
  }
}
