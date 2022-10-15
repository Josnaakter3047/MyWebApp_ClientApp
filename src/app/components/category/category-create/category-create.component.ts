import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Category } from '../../../models/category/category';
import { CategoryService } from '../../../services/category/category.service';
import { NotifyService } from '../../../services/notify.service';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.css']
})
export class CategoryCreateComponent implements OnInit {

  category: Category = new Category();
  categoryForm: FormGroup = new FormGroup({
    categoryName: new FormControl('', Validators.required),
    
  })
  constructor(
    private notifysvc: NotifyService,
    private catSvc: CategoryService
  ) { }
  get f() {
    return this.categoryForm.controls;
  }

  insert() {
    if (this.categoryForm.invalid) return;
    this.category.categoryName = this.f['categoryName'].value;
   

    this.catSvc.insertCategory(this.category)
      .subscribe(r => {
        this.notifysvc.success("Data Inserted successfully!!", "DISMISS");
        this.categoryForm.reset({});
      }, err => {
        this.notifysvc.fail("Fail to save data!!", "DISMISS");
      })
  }
  ngOnInit(): void {
  }

}
