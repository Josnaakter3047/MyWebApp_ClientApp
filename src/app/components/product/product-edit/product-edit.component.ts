import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Category } from '../../../models/category/category';
import { Product } from '../../../models/product/product';
import { CategoryService } from '../../../services/category/category.service';
import { NotifyService } from '../../../services/notify.service';
import { ProductService } from '../../../services/product/product.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  categories: Category[] = [];
  product: Product = new Product();
  productForm: FormGroup = new FormGroup({
    
    productName: new FormControl('', Validators.required),
    categoryId: new FormControl('', Validators.required),
    quantity: new FormControl('', Validators.required),
    unitPrice: new FormControl('', Validators.required),
    storeDate: new FormControl('', Validators.required),
    isAvailable: new FormControl('', Validators.required)
  })

  constructor(
    private proSvc: ProductService,
    private notifysvc: NotifyService,
    private catSvc: CategoryService,
    private activate:ActivatedRoute
  ) { }


  get f() {
    return this.productForm.controls;
  }

  update() {
    if (this.productForm.invalid) return;
    
    this.product.productName = this.f['productName'].value;
    this.product.categoryId = this.f['categoryId'].value;
    this.product.quantity = this.f['quantity'].value;
    this.product.unitPrice = this.f['unitPrice'].value;
    this.product.storeDate = this.f['storeDate'].value;
    this.product.isAvailable = this.f['isAvailable'].value;

    this.proSvc.updateProduct(this.product)
      .subscribe(r => {
        this.notifysvc.success("Data Update successfully!!", "DISMISS");
        this.productForm.reset({});
      }, err => {
        this.notifysvc.fail("Fail to save data!!", "DISMISS");
      })

  }
  getCategoryName(id: number) {
    let z = this.categories.find(c => c.id == id);
    return z ? z.categoryName : '';
  }
  ngOnInit(): void {
    this.catSvc.getCategories().
      subscribe(x => {
        this.categories = x;
      }, err => {
        this.notifysvc.fail("Failed to load category list", "DISMISS");
      });
    let id: number = this.activate.snapshot.params['id'];
    this.proSvc.getProductById(id)
      .subscribe(x => {
        this.product = x;
        this.productForm.patchValue(this.product);
      }, err => {
        this.notifysvc.fail("Fail to load product data!!", "DISMISS");
      });
  }

}
