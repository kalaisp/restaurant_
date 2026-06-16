import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { iProperty } from '../property/iProperty.interface';
import { property } from '../model/property';
import { iproperty } from '../model/iproperty';
import { iPropertyBase } from '../model/Ipropertybase';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class Housing {
  baseUrl=environment.baseUrl;
  constructor(private http: HttpClient) {}

  getProperty(id:number){
     return this.http.get<property>(this.baseUrl+'/property/detail/'+id?.toString());
  }
  getAllProperties(SellRent?: number): Observable<property[]> {
    return this.http.get<property[]>(this.baseUrl+'/property/list/'+SellRent?.toString());
    // return this.http.get<any>('assets/data/properties.json').pipe(
  //   map(data => {
  //     const propertiesArray: Array<property> = [];
  //     const localProperties = JSON.parse(localStorage.getItem('newProp')!);
  //     if (localProperties) {
  //       for (const id in localProperties) {
  //         if(SellRent)
  //         {
  //           if (localProperties.hasOwnProperty(id) &&Number(localProperties[id]['SellRent']) === SellRent)
  //           {
  //             propertiesArray.push(localProperties[id]);
  //           }
  //         }
  //         else{
  //           propertiesArray.push(localProperties[id]);
  //         }
  //       }
  //     }

  //     for (const id in data) {
  //       if(SellRent){
  //         if (data.hasOwnProperty(id) && Number(data[id]['SellRent']) === SellRent)
  //         {
  //           propertiesArray.push(data[id]);
  //         }
  //       }
  //       else{
  //         propertiesArray.push(data[id]);
  //       }
  //     }
  //     return propertiesArray;
  //   })
  // );
  // return this.http.get<property[]>('data/properties.json');
}
  addProperty(property:property){
    const httpOptions={
      headers:new HttpHeaders({

        Authorization: 'Bearer ' + localStorage.getItem('token')
      })
    };
    return this.http.post(this.baseUrl+'/property/add',property,httpOptions);
  }
  newPropId(): number {
    if (localStorage.getItem('PID')) {
      const newId = +localStorage.getItem('PID')! + 1;
      localStorage.setItem('PID', String(newId));
      return newId;
    } else {
      localStorage.setItem('PID', '101');
      return 101;
    }
  }
 getPropertAge(dateofEstablishment: string | Date | null | undefined): string {
  if (!dateofEstablishment) return 'N/A';

  const today = new Date();
  const estDate = new Date(dateofEstablishment);
  let age = today.getFullYear() - estDate.getFullYear();
  const m = today.getMonth() - estDate.getMonth();

  if (m < 0 || (m === 0 && today.getDate() < estDate.getDate())) {
    age--;
  }
  if (today < estDate) {
    return '0';
  }
  if (age === 0) {
    return 'Less than a year';
  }
  return age.toString();
}
setPrimaryPhoto(propertyId:number,propertyPhotoId:string){
  const httpOptions={
      headers:new HttpHeaders({

        Authorization: 'Bearer ' + localStorage.getItem('token')
      })
    };
  return this.http.post(this.baseUrl+'/property/set-primary-photo/'+String(propertyId)+'/'+propertyPhotoId,{},httpOptions);
}
deletePhoto(propertyId:number,propertyPhotoId:string){
  const httpOptions={
      headers:new HttpHeaders({

        Authorization: 'Bearer ' + localStorage.getItem('token')
      })
    };
  return this.http.delete(this.baseUrl+'/property/delete-photo/'
    +String(propertyId)+'/'+propertyPhotoId,httpOptions);
}
}


