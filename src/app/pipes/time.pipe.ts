import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'time',
  standalone: true,
})
export class TimePipe implements PipeTransform {
  transform(time: string): string {
    if (!time) {
      return '';
    }

    time = time.replace(/\D/g, '');

    const firstNumber = Number(time[0]);

    if (firstNumber > 2) {
      time = `0${time[0]}`;
    }

    const thirdNumber = Number(time[2]);

    if (thirdNumber > 5) {
      console.log(time);
      time = `${time.slice(0, 2)}0${time[2]}`;
    }

    return `${time.slice(0, 2)}:${time.slice(2, 4)}`;
  }
}
