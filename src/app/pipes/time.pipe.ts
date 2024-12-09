import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'time',
  standalone: true,
})
export class TimePipe implements PipeTransform {
  transform(time: string): unknown {
    if (!time) {
      return '';
    }

    time = time.replace(/\D/g, '');

    return `${time.slice(0, 2)}:${time.slice(2, 4)}`;
  }
}
