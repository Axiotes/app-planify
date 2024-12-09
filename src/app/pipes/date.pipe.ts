import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'date',
  standalone: true,
})
export class DatePipe implements PipeTransform {
  transform(date: string): string {
    if (!date) {
      return '';
    }

    date = date.replace(/\D/g, '');

    if (date.length > 2) {
      date = `${date.slice(0, 2)}/${date.slice(2)}`;
    }
    if (date.length > 5) {
      date = `${date.slice(0, 5)}/${date.slice(5)}`;
    }

    return date;
  }
}
