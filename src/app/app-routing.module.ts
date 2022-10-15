import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryCreateComponent } from './components/category/category-create/category-create.component';
import { CategoryEditComponent } from './components/category/category-edit/category-edit.component';
import { CategoryComponent } from './components/category/category/category.component';
import { HomeComponent } from './components/home/home/home.component';
import { LoginComponent } from './components/login/login/login.component';
import { ProductCreateComponent } from './components/product/product-create/product-create.component';
import { ProductEditComponent } from './components/product/product-edit/product-edit.component';
import { ProductComponent } from './components/product/product/product.component';
import { ImageCreateComponent } from './components/productimage/image-create/image-create.component';
import { ImageEditComponent } from './components/productimage/image-edit/image-edit.component';
import { ProductimageComponent } from './components/productimage/productimage/productimage.component';
import { RegisteruserComponent } from './components/register/registeruser/registeruser.component';


const routes: Routes = [
  { path: "", component: HomeComponent ,pathMatch:"full"},
  { path: "home", component: HomeComponent },
  { path: "product", component: ProductComponent },
  { path: "product-create", component: ProductCreateComponent },
  { path: "products-edit/:id", component: ProductEditComponent },

  { path: "category", component: CategoryComponent },
  { path: "category-create", component: CategoryCreateComponent },
  { path: "category-edit/:id", component: CategoryEditComponent },

  { path: "image", component: ProductimageComponent },
  { path: "image-create", component: ImageCreateComponent },
  { path: "image-edit/:id", component: ImageEditComponent },

  { path: "register", component: RegisteruserComponent },
  { path: "login", component: LoginComponent },
  { path: "*", component: HomeComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
