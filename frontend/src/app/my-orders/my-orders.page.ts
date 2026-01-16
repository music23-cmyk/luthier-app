import { Component, OnInit } from '@angular/core';
import { OrderServices } from '../services/order-services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.page.html',
  styleUrls: ['./my-orders.page.scss'],
  standalone: false,
  
})
export class MyOrdersPage implements OnInit {
  orders: any[] = [];
  page = 1;
  limit = 10;                  // cuántas órdenes por página
  hasMore = true;              // si hay más páginas por cargar

  constructor(private orderService:OrderServices, private router: Router) { }

  ngOnInit() {
    this.getAllOrders();   // ← aquí se cargan las primeras órdenes
  }

  getAllOrders() {
  this.orderService.getOrders().subscribe((response: any[]) => {
    this.orders = response.map(order => ({
      ...order,
      _selectedId: order.id,
      clientName: order.client ? `${order.client.name} ${order.client.surname}` : 'Cliente desconocido'
    }));
  });
}

  // Para el color del estado
  getStatusColor(status?: string): string {
    const s = status?.toLowerCase() || '';
    if (s.includes('completado')) return 'success';
    if (s.includes('reparación') || s.includes('progreso')) return 'warning';
    if (s.includes('cancelado')) return 'danger';
    return 'medium';
  }

  // Para cuando falla la carga de imagen
  onImageError(event: Event) {
    (event.target as HTMLImageElement).src = 'assets/img/default.png';
  }

  goToOrderView(order: any) {
    const orderId = order._selectedId; // usamos el id interno
    this.router.navigate(['/order-view', orderId]);
  }

  doRefresh(event: any) {
  console.log('Refreshing list...');
  this.getAllOrders(); // recarga las órdenes desde el backend
  setTimeout(() => {
    event.target.complete(); // indica que terminó el refresco
  }, 500); // un pequeño delay para animación
}

}
