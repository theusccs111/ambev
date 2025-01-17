import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalizeWords',
  standalone: true
})

export class CapitalizeWordsPipe implements PipeTransform {

  transform(value: string): string {
    if (!value) return '';

    // Lista de palavras que devem permanecer em minúsculas
    const exceptions = ["de", "da", "do", "e", "a", "o", "dos", "das", "em", "por", "com"];

    // Divide as palavras, transforma e junta novamente
    return value
      .toLowerCase()
      .split(' ')
      .map((word, index) => {
        // Verifica se a palavra está na lista de exceções e não é a primeira palavra
        if (exceptions.includes(word) && index !== 0) {
          return word;
        }
        // Caso contrário, capitaliza a primeira letra
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(' ');
  }

}
