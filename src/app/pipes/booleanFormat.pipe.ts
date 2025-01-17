import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'booleanFormat',
    standalone: true
})
export class BooleanFormatPipe implements PipeTransform {

    transform(value: boolean): string {
        return value ? 'Sim' : 'Não';
    }

}
