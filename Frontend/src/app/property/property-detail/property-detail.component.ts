import { property } from './../../model/property';
import { Component, OnInit,Input } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TabsetComponent } from "ngx-bootstrap/tabs";
import { TabsModule } from 'ngx-bootstrap/tabs';
import { Housing } from '../../services/housing';
import { NgxGalleryImage, NgxGalleryModule } from '@kolkov/ngx-gallery';
import { ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { PhotoEditor } from "../photo-editor/photo-editor";

@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.css'],
  imports: [TabsetComponent, TabsModule,PhotoEditor, CommonModule, NgxGalleryModule, SlickCarouselModule, PhotoEditor]
})
export class PropertyDetailComponent implements OnInit {

  public propertyId:number=0;
  property: property = new property();
  images: string[] = [];
  public mainPhotoUrl:string='';
  galleryImages: NgxGalleryImage[] = [];
  selectedIndex: number = 0;
  constructor(private route:ActivatedRoute,private router:Router,
              private housingService:Housing, private cdr: ChangeDetectorRef
  ) { }
  get selectedImage(): string {
    return this.images[this.selectedIndex];
  }

  changeSlide(dir: number) {
    this.selectedIndex = (this.selectedIndex + dir + this.images.length) % this.images.length;
  }

  goTo(index: number) {
    this.selectedIndex = index;
  }

  getPropertyPhots(): NgxGalleryImage[] {
  const photoUrls: NgxGalleryImage[] = [];
  for (const photo of this.property.photos ?? []) {
    if(photo.isPrimary === true )
      {
        this.mainPhotoUrl=photo.imageUrl;
      }
      else{
      photoUrls.push({
        small: photo.imageUrl,
        medium: photo.imageUrl,
        big: photo.imageUrl,
    });
      }
console.log('Primary photo:', this.property.photos?.find(p => p.isPrimary));
  }
  return photoUrls;
}
  ngOnInit() {
    this.propertyId = +this.route.snapshot.params['id'];
    this.route.data.subscribe((data) => {
      this.property = data['prp'] as property;
      this.images = this.property.photos?.length? this.property.photos.filter(photo => !photo.isPrimary).map(photo => photo.imageUrl) : ['assets/images/internal.png'];
      this.galleryImages = this.getPropertyPhots();
      console.log(this.mainPhotoUrl);
    });
    this.property.age=this.housingService.getPropertAge(this.property.estPossessionOn);
  }
}
