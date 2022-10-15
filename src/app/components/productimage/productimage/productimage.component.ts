import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from '../../../models/product/product';
import { Image } from '../../../models/productimage/image';
import { NotifyService } from '../../../services/notify.service';
import { ProductService } from '../../../services/product/product.service';
import { ImageService } from '../../../services/productimage/image.service';
import { ConfirmationComponent } from '../../dialog/confirmation/confirmation.component';

@Component({
  selector: 'app-productimage',
  templateUrl: './productimage.component.html',
  styleUrls: ['./productimage.component.css']
})
export class ProductimageComponent implements OnInit {

  productImages: Image[] = [];
  products: Product[] = [];

  dataSource: MatTableDataSource<Image> = new MatTableDataSource(this.productImages);
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  columnList: string[] = ["id","product", "image", "actions"];

  constructor(
    private imgSvc: ImageService,
    private proSvc: ProductService,
    private notifySvc: NotifyService,
    private dialog: MatDialog
    
  ) {  }

  confirmDelete(item: Image) {
    this.dialog.open(ConfirmationComponent, {
      width: '500px',
    }).afterClosed().subscribe(r => {
      if (r) this.imgSvc.deleteProductImage(Number(item.id))
        .subscribe(x => {
          this.notifySvc.success("Data deleted Successfully", "DISMISS");
          this.ngOnInit();
        }, err => {
          this.notifySvc.fail("Data delete failed", "DISMISS");
        })
    });
  }

  getProductName(id: number) {
    let pro = this.products.find(p => p.id == id);
    return pro ? pro.productName : '';
  }


  
  ngOnInit(): void {
    this.imgSvc.getProductImages().
      subscribe(x => {
        this.productImages = x;
        this.dataSource.data = this.productImages;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }, err => {
        this.notifySvc.fail("Failed to load product image data", "DISMISS");
      });
    this.proSvc.getProducts().
      subscribe(x => {
        this.products = x;
      }, err => {
        this.notifySvc.fail("Failed to load product data", "DISMISS");
      });
  }
  

}
