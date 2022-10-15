import { Component, OnInit } from '@angular/core';
import { Alldata } from '../../../models/alldata/alldata';
import { ShowdataService } from '../../../services/home/showdata.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  productsData: Alldata[] = [];
  constructor(
    private homSvc: ShowdataService
    
  ) { }
  ngOnInit(): void {
    this.homSvc.getAllData()
      .subscribe(x =>
      {
        this.productsData = x;
        console.log(x);
      })
  }
  get isUserlogin() {
    const user = localStorage.getItem("userInfo");
    return user && user.length > 0;
  }
 
}
  


