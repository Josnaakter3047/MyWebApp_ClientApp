import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../../models/product/product';
import { Image } from '../../../models/productimage/image';
import { NotifyService } from '../../../services/notify.service';
import { ProductService } from '../../../services/product/product.service';
import { ImageService } from '../../../services/productimage/image.service';

@Component({
  selector: 'app-image-edit',
  templateUrl: './image-edit.component.html',
  styleUrls: ['./image-edit.component.css']
})
export class ImageEditComponent implements OnInit {

  products: Product[] = [];
  productImage: Image = new Image();
  picFile!: File;


  productImageForm: FormGroup = new FormGroup({
    productId: new FormControl('', Validators.required),
    imagePath: new FormControl('', Validators.required)
    
  });
  constructor(
    private productImageService: ImageService,
    private productSvc: ProductService,
    private notifySvc: NotifyService,
    private activatedRoute: ActivatedRoute
  ) { }
  get productImageControl() {
    return this.productImageForm.controls;
  }
  update(): void {
    if (this.productImageForm.invalid) return;
    this.productImage.productId = this.productImageControl['productId'].value;
    this.productImage.imagePath = this.productImageControl['imagePath'].value;
    

    this.productImageService.updateProductImage(this.productImage)
      .subscribe(r => {
        if (this.picFile != null && this.productImage.id) {
          this.upload(Number(this.productImage.id));
        }
        else {
          this.notifySvc.success("Succeeded to update product image data", "DISMISS");
        }
      }, err => {
        this.notifySvc.fail("Fail to Save Product Image!!", "DISMISS");
      })

  }
  upload(id: number) {
    let reader = new FileReader();
    reader.addEventListener("load", (event: any) => {
      this.productImageService.uploadImage(id, this.picFile)
        .subscribe(r => {
          this.productImage.imagePath = r.picturePath;
          this.notifySvc.success("Product Image update Successfully", "Dismiss");
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
    let id = this.activatedRoute.snapshot.params["id"];
    this.productImageService.getProductImageById(id)
      .subscribe(r => {
        this.productImage = r;
        this.productImageForm.patchValue(this.productImage);

      });
    this.productSvc.getProducts()
      .subscribe(r => {
        this.products = r;
      }, err => {
        this.notifySvc.fail("Failed to load product data!!", "DISMISS");
      })
  }

}
