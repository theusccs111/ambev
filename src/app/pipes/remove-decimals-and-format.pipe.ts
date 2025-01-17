import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removeDecimalsAndFormat',
  standalone: true
})
export class RemoveDecimalsAndFormatPipe implements PipeTransform {

  transform(value: number | string): string {
    if (value == null || value === '') return '';

    // Convert the input to a number
    const numberValue = Number(value);

    if (isNaN(numberValue)) return value.toString();

    // Remove decimals and format with thousands separator
    return numberValue.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }

}
