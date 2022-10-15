import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Category } from '../../../models/category/category';
import { CategoryService } from '../../../services/category/category.service';
import { NotifyService } from '../../../services/notify.service';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css']
})
export class CategoryEditComponent implements OnInit {

  category: Category = new Category();
  categoryForm: FormGroup = new FormGroup({
    categoryName: new FormControl('', Validators.required),

  })
  constructor(
    private notifysvc: NotifyService,
    private catSvc: CategoryService,
    private activateRoute:ActivatedRoute
  ) { }
  get f() {
    return this.categoryForm.controls;
  }

  update() {
    if (this.categoryForm.invalid) return;
    this.category.categoryName = this.f['categoryName'].value;


    this.catSvc.updateCategory(this.category)
      .subscribe(r => {
        this.notifysvc.success("Data Update Successfully!!", "DISMISS");
        this.categoryForm.reset({});
      }, err => {
        this.notifysvc.fail("Fail to Update Data!!", "DISMISS");
      })
  }
  ngOnInit(): void {
    let id: number = this.activateRoute.snapshot.params['id'];
    this.catSvc.getCategoryById(id)
      .subscribe(x => {
        this.category = x;
        this.categoryForm.patchValue(this.category);
      }, err => {
        this.notifysvc.fail("Fail to load category data!!", "DISMISS");
      });
  }

}
