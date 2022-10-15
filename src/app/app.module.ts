import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { MatModule } from './module/mat/mat.module';
import { HomeComponent } from './components/home/home/home.component';
import { ProductComponent } from './components/product/product/product.component';
import { ProductCreateComponent } from './components/product/product-create/product-create.component';
import { ProductEditComponent } from './components/product/product-edit/product-edit.component';
import { UserService } from './services/user.service';
import { NotifyService } from './services/notify.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisteruserComponent } from './components/register/registeruser/registeruser.component';
import { UserComponent } from './components/user/user/user.component';
import { CategoryComponent } from './components/category/category/category.component';
import { CategoryCreateComponent } from './components/category/category-create/category-create.component';
import { CategoryEditComponent } from './components/category/category-edit/category-edit.component';
import { StockComponent } from './components/stock/stock/stock.component';
import { ConfirmationComponent } from './components/dialog/confirmation/confirmation.component';
import { ProductimageComponent } from './components/productimage/productimage/productimage.component';
import { ImageCreateComponent } from './components/productimage/image-create/image-create.component';
import { ImageEditComponent } from './components/productimage/image-edit/image-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ProductComponent,
    ProductCreateComponent,
    ProductEditComponent,
    RegisteruserComponent,
    UserComponent,
    CategoryComponent,
    CategoryCreateComponent,
    CategoryEditComponent,
    StockComponent,
    ConfirmationComponent,
    ProductimageComponent,
    ImageCreateComponent,
    ImageEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatModule,
    BrowserAnimationsModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
