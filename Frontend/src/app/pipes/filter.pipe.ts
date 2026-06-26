import { Pipe, PipeTransform } from '@angular/core';
import { property } from '../model/property';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(value: any[],Filterstring:string, propName:string): any  {
    const resultArray=[];
    if(value.length===0||Filterstring===''||propName===''){
      return value;
    }
    for(const item of value){
      if(item[propName]===Filterstring){
        resultArray.push(item);
      }
    }
    return resultArray;
  }
}
