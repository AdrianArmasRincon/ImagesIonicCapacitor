import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'updateBicycle'
})
export class UpdateBicyclePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
