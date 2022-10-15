import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Category } from '../../../models/category/category';
import { CategoryService } from '../../../services/category/category.service';
import { NotifyService } from '../../../services/notify.service';
import { ConfirmationComponent } from '../../dialog/confirmation/confirmation.component';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  categories: Category[] = [];
  dataSource: MatTableDataSource<Category> = new MatTableDataSource(this.categories);
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  columnList: string[] = ["id", "categoryName", "actions"];
  constructor(
    private notifySvc: NotifyService,
    private catSvc: CategoryService,
    private dialog: MatDialog
  ) { }
  confirmDelete(item: Category) {
    this.dialog.open(ConfirmationComponent, {
      width: '500px',
    }).afterClosed().subscribe(r => {
      if (r) this.catSvc.deleteCategory(Number(item.id))
        .subscribe(x => {
          this.notifySvc.success("Data deleted Successfully", "DISMISS");
          this.ngOnInit();
        }, err => {
          this.notifySvc.fail("Data delete failed", "DISMISS");
        })
    });
  }
  ngOnInit(): void {
    this.catSvc.getCategories().
      subscribe(x => {
        this.categories = x;
        this.dataSource.data = this.categories;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }, err => {
        this.notifySvc.fail("Failed to load category", "DISMISS");
      });
  }

}
