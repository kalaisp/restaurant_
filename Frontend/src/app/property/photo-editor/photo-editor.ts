import { photo } from './../../model/photo';
import { CommonModule } from '@angular/common';
import { property } from './../../model/property';
import { Component, OnInit, Input } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { Housing } from '../../services/housing';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-photo-editor',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './photo-editor.html',
  styleUrl: './photo-editor.css',
})
export class PhotoEditor implements OnInit {
  @Input() property!: property;
  photos: photo[] = [];
  baseUrl = environment.baseUrl;
  maxAllowedFileSize = 10 * 1024 * 1024;
  isDragOver = false;
  isUploading = false;
  uploadProgress = 0;

  constructor(private housingService: Housing, private http: HttpClient) {}

  ngOnInit(): void {}

  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.isDragOver = true;
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.isDragOver = false;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.isDragOver = false;
    const files = event.dataTransfer?.files;
    if (files && files.length) {
      this.uploadFiles(files);
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      this.uploadFiles(input.files);
    }
    input.value = '';
  }

  private uploadFiles(files: FileList) {
    Array.from(files).forEach(file => {
      if (file.size > this.maxAllowedFileSize) {
        alert(`${file.name} is too large.`);
        return;
      }
      if (!file.type.startsWith('image/')) {
        alert(`${file.name} is not an image.`);
        return;
      }
      this.uploadFile(file);
    });
  }

  private uploadFile(file: File) {
    const formData = new FormData();
    formData.append('file', file);

    this.isUploading = true;
    this.uploadProgress = 0;

    this.http.post<photo>(
      `${this.baseUrl}/property/add/photo/${this.property.id}`,
      formData,
      {
        reportProgress: true,
        observe: 'events',
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
      }
    ).subscribe({
      next: (event: any) => {
        if (event.type === HttpEventType.UploadProgress && event.total) {
          this.uploadProgress = Math.round((100 * event.loaded) / event.total);
        } else if (event.type === HttpEventType.Response && event.body) {
          this.isUploading = false;
          this.uploadProgress = 0;
          this.photos.push(event.body);
          if (this.property.photos) {
            this.property.photos.push(event.body);
          }
        }
      },
      error: (err: any) => {
        this.isUploading = false;
        this.uploadProgress = 0;
        console.error('Upload failed', err);
      }
    });
  }

  setPrimaryPhoto(propertyId: number, photo: photo) {
    this.housingService.setPrimaryPhoto(propertyId, photo.publicId).subscribe(() => {});
  }

  deletePhoto(propertyId: number, photo: photo) {
    this.housingService.deletePhoto(propertyId, photo.publicId).subscribe(() => {
      this.property.photos = this.property.photos?.filter(p => p.publicId !== photo.publicId);
    });
  }
}
