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

    const firstNumber = Number(date[0]);
    const secondNumber = Number(date[1]);
    const thirdNumber = Number(date[2]);
    const fourthNumber = Number(date[3]);

    if (firstNumber > 3) {
      date = `0${date[0]}`;
    }

    if (firstNumber === 3 && secondNumber > 1) {
      date = `${date[0]}0`;
    }

    if (thirdNumber > 1) {
      date = `${date.slice(0, 2)}0${date[2]}`;
    }

    if (thirdNumber === 1 && fourthNumber > 2) {
      date = `${date.slice(0, 2)}${date[2]}0`;
    }

    if (date.length > 2) {
      date = `${date.slice(0, 2)}/${date.slice(2)}`;
    }
    if (date.length > 5) {
      date = `${date.slice(0, 5)}/${date.slice(5)}`;
    }

    return date;
  }
}
