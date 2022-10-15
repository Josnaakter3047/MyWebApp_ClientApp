import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Product } from '../../../models/product/product';
import { Image } from '../../../models/productimage/image';
import { NotifyService } from '../../../services/notify.service';
import { ProductService } from '../../../services/product/product.service';
import { ImageService } from '../../../services/productimage/image.service';

@Component({
  selector: 'app-image-create',
  templateUrl: './image-create.component.html',
  styleUrls: ['./image-create.component.css']
})
export class ImageCreateComponent implements OnInit {

  products: Product[] = [];
  productImage: Image = new Image();
  picFile!: File;


  productImageForm: FormGroup = new FormGroup({
    productId: new FormControl('', Validators.required),
    imagePath: new FormControl('', Validators.required)
  });

  constructor(
    private imgSvc: ImageService,
    private productSvc: ProductService,
    private notifySvc: NotifyService
  ) { }

  get productImageControl() {
    return this.productImageForm.controls;
  }
  insert() {
    if (this.productImageForm.invalid) return;
    Object.assign(this.productImage, this.productImageForm.value);
    this.productImage.imagePath = "no-picture.png";

    this.imgSvc.insertProductImage(this.productImage).
      subscribe(r => {
        console.log(r)
        this.upload(Number(r.id))
      }, err => {
        this.notifySvc.fail("Fail to Save Product Image", "Dismiss");
      });
  }
  upload(id: number) {
    let reader = new FileReader();
    reader.addEventListener("load", (event: any) => {
      this.imgSvc.uploadImage(id, this.picFile)
        .subscribe(r => {
          this.productImage.imagePath = r.picturePath;
          this.notifySvc.success("Product Image Created Successfully", "Dismiss");
          this.productImageForm.reset({});
        }, err => {
          this.notifySvc.fail("Failed to upload image", "Dismiss");
        });
    });
    reader.readAsDataURL(this.picFile);
  }
  onChange(event: any) {
    this.picFile = event.target.files[0];
  }
  ngOnInit(): void {
    this.productSvc.getProducts()
      .subscribe(r => {
        this.products = r;
      }, err => {
        this.notifySvc.fail("Failed to load product data!!", "DISMISS");
      })
  }

}
