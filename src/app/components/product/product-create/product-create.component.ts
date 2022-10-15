import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Category } from '../../../models/category/category';
import { Product } from '../../../models/product/product';
import { CategoryService } from '../../../services/category/category.service';
import { NotifyService } from '../../../services/notify.service';
import { ProductService } from '../../../services/product/product.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {

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
    private catSvc:CategoryService
  ) { }


  get f() {
    return this.productForm.controls;
  }

  insert() {
    if (this.productForm.invalid) return;
    this.product.productName = this.f['productName'].value;
    this.product.categoryId = this.f['categoryId'].value;
    this.product.quantity = this.f['quantity'].value;
    this.product.unitPrice = this.f['unitPrice'].value;
    this.product.storeDate = this.f['storeDate'].value;
    this.product.isAvailable = this.f['isAvailable'].value;

    this.proSvc.insertProduct(this.product)
      .subscribe(r => {
        this.notifysvc.success("Data Inserted successfully!!", "DISMISS");
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
      })
  }

}
