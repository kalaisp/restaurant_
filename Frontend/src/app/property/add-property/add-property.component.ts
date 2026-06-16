// import { environment } from './../../../environments/environment.development';
import { App } from './../../app';
import { Component, Input, OnInit,ViewChild,viewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { NgForm } from '@angular/forms';
import { TabsetComponent, TabsModule } from 'ngx-bootstrap/tabs';
import { ButtonRadioGroupDirective, ButtonRadioDirective } from "ngx-bootstrap/buttons";
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { PropertyCardComponent } from "../property-card/property-card.component";
import { iPropertyBase } from '../../model/Ipropertybase';
import { ReactiveFormsModule } from '@angular/forms';
import { property } from '../../model/property';
import { Housing } from '../../services/housing';
import { AlertifyService } from '../../services/alertify.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { IKeyValuePair } from '../../model/IKeyValuePair';
import { ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-add-property',
  standalone:true,
  templateUrl: './add-property.component.html',
   providers: [DatePipe],
  imports: [CommonModule, FormsModule, TabsModule,FormsModule,ReactiveFormsModule, ButtonRadioGroupDirective, ButtonRadioDirective, BsDatepickerModule, PropertyCardComponent],
  styleUrls: ['./add-property.component.css']
})
export class AddPropertyComponent implements OnInit {

  @ViewChild('formsTab',{static:false})formsTab!:TabsetComponent;
  addPropertyForm!:FormGroup;
  nextClicked:boolean=false;
  baseUrl=environment.baseUrl;
  constructor(private fb:FormBuilder,
    private hosusingService:Housing,
    private alertfy:AlertifyService, private cdr: ChangeDetectorRef,
     private http: HttpClient,
    private datePipe: DatePipe,private route: Router) { }
    selectedBhk: number = 1;
    property= new property();

    propertyView:iPropertyBase = {
      id: null,
      name: '',
      price: null,
      sellRent: null,
      type:null,
      propertyType: null,
      furnishingType:null,
      bhk:null,
      builtArea:null,
      city:'',
      readyToMove:null,
      propertyTypeId:null,
      furnishingTypeId:null,
      carpetArea:null,
      address: null,
      address2:null,
      CityId: null,
      floorNo: null,
      totalFloors: null,
      age: null,
      mainEntrance: null,
      security: null,
      gated: null,
      maintenance: null,
      PossessionOn: null,
      photo: null,
      description: null,

    };
  readytoTypes:Array<string>=['East','West','South','North'];
  cityList: Array<any> = [];
  propertyTypes:Array<any>=[];
  furnishTypes:Array<any>=[];
  ngOnInit() {
    this.loadCities();
    this.getPropertyTypes();
    this.getFurnishingTypes();
    this.createAddPropertyForm();
    if(!localStorage.getItem('userName')){
      this.alertfy.error('You must be logged in to add property');
      this.route.navigate(['/user/login'])
    }
    this.addPropertyForm.valueChanges.subscribe(data => {
      this.propertyView.bhk = data.BasicInfo.BHK;
      this.propertyView.name = data.BasicInfo.Name;
      // this.propertyView.city = data.BasicInfo.City;
      this.propertyView.price = data.PriceInfo.Price;
      this.propertyView.sellRent = data.BasicInfo.SellRent;
      this.propertyView.security = data.PriceInfo.Security;
this.propertyView.maintenance = data.PriceInfo.Maintenance;
      // this.propertyView.propertyType = data.BasicInfo.PType;
      // this.propertyView.furnishingType = data.BasicInfo.FType;
      this.propertyView.builtArea = data.PriceInfo.BuildArea;
      this.propertyView.maintenance = this.Maintenance.value;
      this.propertyView.builtArea = this.BuildArea.value;
      this.propertyView.carpetArea = this.CarpetArea.value;
      this.propertyView.floorNo = this.FloorNo.value;
      this.propertyView.totalFloors = this.TotalFloor.value;
      this.propertyView.address = this.Address.value;
      this.propertyView.address2 = this.LandMark.value;
      this.propertyView.readyToMove = this.RTM.value;
      this.propertyView.gated = this.Gated.value;
      this.propertyView.mainEntrance = this.MainEntrance.value;
      this.propertyView.description = this.Description.value;
    });
  }
  onPossessionDateChange(date: Date): void {
  if (date) {
    this.propertyView.estPossessionOn =
      date.toLocaleDateString('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric'
      });

    console.log(this.propertyView.estPossessionOn);
  }
}
   getPropertyTypes() {
    return this.http.get<IKeyValuePair[]>(this.baseUrl+'/propertytype/list')
    .subscribe({
      next: (data) => {
        this.propertyTypes = data;
        this.cdr.detectChanges();

      },
      error: (err) => {
        console.error('City API error:', err); // ✅ see error
      }
    });
  }
  getFurnishingTypes() {
    return this.http.get<IKeyValuePair[]>(this.baseUrl+'/furnishingtype/list')
    .subscribe({
      next: (data) => {
        this.furnishTypes = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('City API error:', err);
      }
    });
  }
 loadCities() {
  console.log('Loading cities...');
    return this.http.get<string[]>(this.baseUrl+'/city/cities')
    .subscribe({
      next: (data) => {
        this.cityList = data;
        this.cdr.detectChanges();

      },
      error: (err) => {
        console.error('City API error:', err);
      }
    });

}

  ngAfterViewInit(): void {
    setTimeout(() => {
    },1000);
  }
  createAddPropertyForm(){
    this.addPropertyForm=this.fb.group({
      BasicInfo:this.fb.group({
        SellRent:['1',Validators.required],
        City:[null,Validators.required],
        PType:[null,Validators.required],
        Name:[null,Validators.required],
        FType:[null,Validators.required],
        BHK:[null,Validators.required],
      }),
      PriceInfo:this.fb.group({
        Price:[null,Validators.required],
        BuildArea:[null,Validators.required],
        CarpetArea: [null],
        Security: [0],
        Maintenance: [0],
      }),
      AddressInfo: this.fb.group({
        FloorNo: [null],
        TotalFloor: [null],
        Address: [null, Validators.required],
        LandMark: [null],
      }),
      OtherInfo: this.fb.group({
        RTM: [null, Validators.required],
        PossessionOn: [null, Validators.required],
        AOP: [null],
        Gated: [null],
        MainEntrance: [null],
        Description: [null]
      })
   })
  }
  get AddressInfo() {
    return this.addPropertyForm.controls['AddressInfo'] as FormGroup;
  }

  get OtherInfo() {
    return this.addPropertyForm.controls['OtherInfo'] as FormGroup;
  }
  get CarpetArea() {
    return this.PriceInfo.controls['CarpetArea'] as FormControl;
  }

  get Security() {
    return this.PriceInfo.controls['Security'] as FormControl;
  }
  get FloorNo() {
    return this.AddressInfo.controls['FloorNo'] as FormControl;
  }

  get TotalFloor() {
    return this.AddressInfo.controls['TotalFloor'] as FormControl;
  }

  get Address() {
    return this.AddressInfo.controls['Address'] as FormControl;
  }

  get LandMark() {
    return this.AddressInfo.controls['LandMark'] as FormControl;
  }

  get RTM() {
    return this.OtherInfo.controls['RTM'] as FormControl;
  }

  get PossessionOn() {
    return this.OtherInfo.controls['PossessionOn'] as FormControl;
  }

  get AOP() {
    return this.OtherInfo.controls['AOP'] as FormControl;
  }

  get Gated() {
    return this.OtherInfo.controls['Gated'] as FormControl;
  }

  get MainEntrance() {
    return this.OtherInfo.controls['MainEntrance'] as FormControl;
  }

  get Description() {
    return this.OtherInfo.controls['Description'] as FormControl;
  }
  get BasicInfo(){
    return this.addPropertyForm.get('BasicInfo') as FormGroup;
  }
  get PriceInfo() {
    return this.addPropertyForm.controls['PriceInfo'] as FormGroup;
  }

  get SellRent(){
    return this.BasicInfo.controls['SellRent'] as FormControl;
  }
  get BHK() {
    return this.addPropertyForm.get('BasicInfo.BHK') as FormControl;
  }

  get Maintenance() {
    return this.PriceInfo.controls['Maintenance'] as FormControl;
  }
  get PType() {
    return this.BasicInfo.controls['PType'] as FormControl;
  }

  get FType() {
    return this.BasicInfo.controls['FType'] as FormControl;
  }

  get Name() {
    return this.BasicInfo.controls['Name'] as FormControl;
  }

  get City() {
    return this.BasicInfo.controls['City'] as FormControl;
  }

  get Price() {
    return this.PriceInfo.controls['Price'] as FormControl;
  }

  get BuildArea() {
    return this.PriceInfo.controls['BuildArea'] as FormControl;
  }
  onback(){
    this.route.navigate(['/'])
  }

  mapProperty():void{

    this.property.id=this.hosusingService.newPropId();
    this.property.sellRent=+this.SellRent.value;
    this.property.bhk=this.BHK.value;
    this.property.propertyTypeId = this.PType.value;
    // this.property.propertyType = this.PType.value;
    this.property.name = this.Name.value;
    this.property.CityId = this.City.value;
    this.property.furnishingTypeId = this.FType.value;
    this.property.propertyType = this.propertyTypes.find(x => x.id === this.PType.value)?.name ?? '';

    this.property.furnishingType = this.furnishTypes.find(x => x.id === this.FType.value)?.name ?? '';
    // this.property.furnishingType = this.FType.value;
    this.property.price = this.Price.value;
    this.property.sellRent = this.SellRent.value;
    this.property.security = this.Security.value;
    this.property.maintenance = this.Maintenance.value;
    this.property.builtArea = this.BuildArea.value;
    this.property.carpetArea = this.CarpetArea.value;
    this.property.floorNo = this.FloorNo.value;
    this.property.totalFloors = this.TotalFloor.value;
    this.property.address = this.Address.value;
    this.property.address2 = this.LandMark.value;
    this.property.readyToMove = this.RTM.value;
    this.property.AOP = this.AOP.value;
    this.property.gated = this.Gated.value;
    this.property.mainEntrance = this.MainEntrance.value;
    this.property.estPossessionOn  = this.PossessionOn.value;
    this.property.description = this.Description.value;
    this.property.postedon = new Date().toString();

  }

  alltabsValid():boolean{
    if(this.BasicInfo.invalid){
       this.formsTab.tabs[0].active=true;
       return false;
    }
    if(this.PriceInfo.invalid){
       this.formsTab.tabs[1].active=true;
        return false;
    }
    if(this.AddressInfo.invalid){
       this.formsTab.tabs[2].active=true;
       return false;
    }
    if(this.OtherInfo.invalid){
       this.formsTab.tabs[3].active=true;
        return false;
    }
    return true;
  }

  onSubmit() {
    this.nextClicked=true;
    console.log(this.property);
console.log("City Form Value:", this.City.value);
    if(this.alltabsValid())
    {
      this.mapProperty();
      this.hosusingService.addProperty(this.property).subscribe(
        ()=>{
          this.alertfy.success('congrats,your property listed successfully on our website');
          console.log(this.addPropertyForm);

           if(this.SellRent.value == '2'){
        this.route.navigate(['/rent-property']);
      }
      else{
        this.route.navigate(['/sell-property']);
      }
        }
      );



    }
    else{
      this.alertfy.error('Please review the form and provide all vlaid');
    }
  }

  selectTab(tabId:number,iscurrentTabValid:boolean){
    if(iscurrentTabValid){
      this.nextClicked = false;
      this.formsTab.tabs[tabId].active=true;
    }
    else{
      this.nextClicked=true;
    }
  }
}
