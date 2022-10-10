import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'datafilter'
})
export class DatafilterPipe implements PipeTransform {

  // transform(value: unknown, ...args: unknown[]): unknown {
  //   return null;
  // }


  transform(items: any[], value: string): any[] {
    if (!items) return [];
    if (!value) return items;

    return items.filter(singleItem =>
        singleItem['name'].toLowerCase().includes(value.toLowerCase())
    );

}

}
