import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'trucate',
  standalone: true,
})
export class TrucatePipe implements PipeTransform {
  transform(value: string): string {
    if (!value) {
      return '';
    }

    if (value.length > 30) {
      value = `${value.slice(0, 27)}...`;
    }

    return value;
  }
}
