import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from './services/product/product.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ClientApp';
  ProductList: any;

  constructor(private router: Router) {
   
  }
  onLogOut() {
    localStorage.removeItem("userInfo");
    this.router.navigate(['/login']);
  }
  get isUserlogin()
  {
    const user = localStorage.getItem("userInfo");
    return user && user.length > 0;
  }
  
}


