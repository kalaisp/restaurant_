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
  constructor(private fb:FormBuilder,
    private hosusingService:Housing,
    private alertfy:AlertifyService,
     private http: HttpClient,
    private datePipe: DatePipe,private route: Router) { }
    selectedBhk: number = 1;
    property= new property();

    propertyView:iPropertyBase = {
      Id: null,
      Name: '',
      Price: null,
      SellRent: null,
      Type:null,
      PType: null,
      FType:null,
      BHK:null,
      BuildArea:null,
      City:'',
      RTM:null,
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
      AOP:null,
    };
  //will come from masters
  propertyTypes:Array<string>=['House','Appartment','Duplex'];
  furnishTypes:Array<string>=['Fully','Semi','Unfurnished'];
  readytoTypes:Array<string>=['East','West','South','North'];
  cityList: Array<any> = [];
  ngOnInit() {
    this.loadCities();
    this.createAddPropertyForm();
    this.addPropertyForm.valueChanges.subscribe(data => {
      this.propertyView.BHK = data.BasicInfo.BHK;
      this.propertyView.Name = data.BasicInfo.Name;
      this.propertyView.City = data.BasicInfo.City;
      this.propertyView.Price = data.PriceInfo.Price;
      this.propertyView.SellRent = data.BasicInfo.SellRent;
      this.propertyView.PType = data.BasicInfo.PType;
      this.propertyView.FType = data.BasicInfo.FType;
      this.propertyView.BuildArea = data.PriceInfo.BuildArea;
      this.propertyView.maintenance = this.Maintenance.value;
      this.propertyView.BuildArea = this.BuildArea.value;
      this.propertyView.carpetArea = this.CarpetArea.value;
      this.propertyView.floorNo = this.FloorNo.value;
      this.propertyView.totalFloors = this.TotalFloor.value;
      this.propertyView.address = this.Address.value;
      this.propertyView.address2 = this.LandMark.value;
      this.propertyView.RTM = this.RTM.value;
      this.propertyView.gated = this.Gated.value;
      this.propertyView.mainEntrance = this.MainEntrance.value;
      this.propertyView.description = this.Description.value;
    });
  }
 loadCities() {
  console.log('Loading cities...'); // ✅ add this
  this.http.get<any[]>('http://localhost:5245/api/city')
    .subscribe({
      next: (data) => {
        this.cityList = data;
        console.log('cityList:', this.cityList); // ✅ add this
      },
      error: (err) => {
        console.error('City API error:', err); // ✅ see error
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
        PossessionOn: [null],
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
    this.property.Id=this.hosusingService.newPropId();
    this.property.SellRent=+this.SellRent.value;
    this.property.BHK=this.BHK.value;
    this.property.PType = this.PType.value;
    this.property.Name = this.Name.value;
    this.property.City = this.City.value;
    this.property.FType = this.FType.value;
    this.property.Price = this.Price.value;
    this.property.SellRent = this.SellRent.value;
    this.property.security = this.Security.value;
    this.property.maintenance = this.Maintenance.value;
    this.property.BuildArea = this.BuildArea.value;
    this.property.carpetArea = this.CarpetArea.value;
    this.property.floorNo = this.FloorNo.value;
    this.property.totalFloors = this.TotalFloor.value;
    this.property.address = this.Address.value;
    this.property.address2 = this.LandMark.value;
    this.property.RTM = this.RTM.value;
    this.property.AOP = this.RTM.value;
    this.property.gated = this.Gated.value;
    this.property.mainEntrance = this.MainEntrance.value;
    this.property.PossessionOn = this.PossessionOn.value;
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
    if(this.alltabsValid())
    {
      this.mapProperty();
      this.hosusingService.addProperty(this.property);
      this.alertfy.success('congrats,your property listed successfully on our website');
      console.log(this.addPropertyForm);
      if(this.SellRent.value == '2'){
        this.route.navigate(['/rent-property']);
      }
      else{
        this.route.navigate(['/sell-property']);
      }
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
