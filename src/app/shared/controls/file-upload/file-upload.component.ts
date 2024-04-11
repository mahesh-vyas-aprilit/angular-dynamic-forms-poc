import { Component, ElementRef, HostListener, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: FileUploadComponent,
      multi: true,
    },
  ],
})
export class FileUploadComponent implements ControlValueAccessor {
  onChange!: Function;
  protected file: File | null = null;
  imageUrl: string | null = null;
  @Input() className!: string;

  // @HostListener('change', ['$event.target.files']) emitFiles(event: FileList) {
  //   const file = event && event.item(0);
  //   this.onChange(file);
  //   this.file = file;

  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       this.imageUrl = reader.result as string;
  //     };
  //     reader.readAsDataURL(file);
  //   } else {
  //     this.imageUrl = null;
  //   }
  // }
  @HostListener('change', ['$event'])
  emitFiles(event: Event) {
    const target = event.target as HTMLInputElement;
    const files = target.files;
    if (files && files.length > 0) {
      const file = files[0];
      this.onChange(file);
      this.file = file;

      const reader = new FileReader();
      reader.onloadend = () => {
        this.imageUrl = reader.result as string;
      };
      reader.readAsDataURL(file);
    } else {
      this.onChange(null);
      this.file = null;
      this.imageUrl = null;
    }
  }

  constructor(private host: ElementRef<HTMLInputElement>) {}

  writeValue(value: any) {
    // clear file input
    // this.host.nativeElement.value = '';
    // this.file = null;
    if (value instanceof File) {
      this.file = value;
      this.displaySelectedFile();
    }
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {}
  setDisabledState?(isDisabled: boolean): void {}

  displaySelectedFile() {
    if (this.file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        this.imageUrl = reader.result as string;
      };
      reader.readAsDataURL(this.file);
    } else {
      this.imageUrl = null;
    }
  }
}
