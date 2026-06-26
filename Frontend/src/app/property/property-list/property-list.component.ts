import { Housing } from './../../services/housing';
import { CommonModule } from '@angular/common';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core'; // ✅ Import
import { PropertyCardComponent } from "../property-card/property-card.component";
import { iProperty } from '../iProperty.interface';
import { ActivatedRoute } from '@angular/router';
import { iPropertyBase } from '../../model/Ipropertybase';
import { FilterPipe } from '../../pipes/filter.pipe';
import { SortPipe } from '../../pipes/sort.pipe';
import { TooltipDirective } from "ngx-bootstrap/tooltip";
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css'],
  standalone: true,
  imports: [CommonModule, PropertyCardComponent, FilterPipe, SortPipe, TooltipDirective, FormsModule]
})
export class PropertyListComponent implements OnInit {
  properties: iPropertyBase[] = [];
  SellRent=1;
  City='';
  searchCity='';
  SortbyParam='';
  SortDirection='asc';
  isLoading: boolean = true;
  hasError: boolean = false;
  Today =new Date();
  constructor(private route:ActivatedRoute,
    private housing: Housing,
    private cdr: ChangeDetectorRef  // ✅ Inject
  ) {}

  ngOnInit(): void {
    if(this.route.snapshot.url.toString()){
        this.SellRent=2;
    }
    this.isLoading = true;
    this.housing.getAllProperties(this.SellRent).subscribe({
      next: (data) => {
        this.properties = data;
        this.isLoading = false;
        this.cdr.detectChanges();  // ✅ Force Angular to update the view
      },
      error: (err) => {
        console.error('Failed:', err);
        this.isLoading = false;
        this.hasError = true;
        this.cdr.detectChanges();  // ✅ Force update on error too
      }
    });
  }

  onCityFilter(){
    this.searchCity=this.City;
  }
  onCityFilterClear(){
    this.searchCity='';
    this.City='';
  }
  onSortDirection(){
    if(this.SortDirection==='desc'){
      this.SortDirection='asc';
    }
    else{
      this.SortDirection='desc';
    }
  }
}
