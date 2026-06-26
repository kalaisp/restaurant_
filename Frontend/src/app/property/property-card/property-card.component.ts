import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { iProperty } from '../iProperty.interface';
import { RouterLink } from "@angular/router";
import { iPropertyBase } from '../../model/Ipropertybase';

@Component({
  selector: 'app-property-card',
    standalone: true,
    imports: [CommonModule, RouterLink],
  templateUrl: './property-card.component.html',
  styleUrls: ['./property-card.component.css']
})
export class PropertyCardComponent {
  @Input() property!: iPropertyBase;
  @Input() hideIcones:boolean=false;
}
