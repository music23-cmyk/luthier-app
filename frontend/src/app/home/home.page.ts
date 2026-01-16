import { Component , OnInit} from '@angular/core';
import {Router} from '@angular/router';
import { OrderServices } from '../services/order-services';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {

  pendingCount = 0;


  constructor(private orderService: OrderServices, private router: Router) {}

  gotoMyOrders(){
    this.router.navigateByUrl("/my-orders");
  }

  ngOnInit() {
    this.loadPendingOrders();
  }

  loadPendingOrders() {
    this.orderService.getOrders().subscribe((orders: any[]) => {
      this.pendingCount = orders.filter(o => o.status === 'Pending').length;
    });
  }
}
