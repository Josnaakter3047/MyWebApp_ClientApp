import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Category } from '../../../models/category/category';
import { Product } from '../../../models/product/product';
import { CategoryService } from '../../../services/category/category.service';
import { NotifyService } from '../../../services/notify.service';
import { ProductService } from '../../../services/product/product.service';
import { ConfirmationComponent } from '../../dialog/confirmation/confirmation.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  categories: Category[] = [];
  products: Product[] = [];
  dataSource: MatTableDataSource<Product> = new MatTableDataSource(this.products);
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  columnList: string[] = ["id","productName", "categoryId", "quantity", "unitPrice", "storeDate","isAvailable", "actions"];
  constructor(
    private proSvc: ProductService,
    private notifySvc: NotifyService,
    private dialog: MatDialog,
    private catSvc: CategoryService
  ) { }

  confirmDelete(item: Product) {
    this.dialog.open(ConfirmationComponent, {
      width: '500px',
    }).afterClosed().subscribe(r => {
      if (r) this.proSvc.deleteProduct(Number(item.id))
        .subscribe(x => {
          this.notifySvc.success("Data deleted Successfully", "DISMISS");
          this.ngOnInit();
        }, err => {
          this.notifySvc.fail("Data delete failed", "DISMISS");
        })
    });
  }
  getCategoryName(id: number) {
    let cat = this.categories.find(c => c.id == id);
    return cat ? cat.categoryName : '';
  }
  
  ngOnInit(): void {
    this.GetAllProducts();
    this.catSvc.getCategories().
      subscribe(x => {
        this.categories = x;
      }, err => {
        this.notifySvc.fail("Failed to load category list", "DISMISS");
      })
  }
  GetAllProducts() {
    this.proSvc.getProducts().
      subscribe(x => {
        this.products = x;
        this.dataSource.data = this.products;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }, err => {
        this.notifySvc.fail("Failed to load product data", "DISMISS");
      });
  }

}
