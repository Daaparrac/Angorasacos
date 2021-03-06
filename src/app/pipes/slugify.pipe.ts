import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'slugify',
})
export class SlugifyPipe implements PipeTransform {
  transform(input: string): string {
    return input
      .concat(' ')
      .replace(/([a-zA-Z]{0,} )/g, (match: string) => {
        return match.trim()[0];
      })
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '');
  }

  transform1(input: string): string {
    return input
      .concat(' ')
      .replace(/([a-zA-Z]{0,} )/g, (match: string) => {
        return match.trim()[0];
      })
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '');
  }

  transform2(input: string): string {
    return input
      .replace(/([0-9]+)/g, (match: string) => {
        return match.substr(0,3);
      })
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '');
  }

  preciop(subtotal: string): string {
    return subtotal;
  }
}
