import { Component, OnInit } from '@angular/core';
import { OrderServices } from '../services/order-services';
import { ClientServices } from '../services/client-services';
import { ActivatedRoute, Router } from '@angular/router';  
import { Camera, CameraResultType } from '@capacitor/camera';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-orders-form',
  templateUrl: './orders-form.page.html',
  styleUrls: ['./orders-form.page.scss'],
  standalone: false,
})
export class OrdersFormPage implements OnInit {
  orderId: string | null = null;
  order: any = {};
  clients: any[] = []; // lista de clientes
  photo: string | undefined;

  constructor(
    private route: ActivatedRoute, 
    private orderService: OrderServices,
    private clientService: ClientServices,
    private alertController: AlertController,
    private router: Router
  ) { }

  ngOnInit() {
    this.orderId = this.route.snapshot.paramMap.get('id');

    // Cargar todos los clientes para el select
    this.clientService.getClients().subscribe((data: any[]) => {
      this.clients = data;
    });

    if (this.orderId) {
      this.orderService.getOrderById(this.orderId).subscribe((data: any) => {
        this.order = data;
        this.photo = data.photo || '';
      });
    }
  }

  async takePhoto() {
    const image = await Camera.getPhoto({
      quality: 90,
      resultType: CameraResultType.DataUrl
    });
    this.photo = image.dataUrl;
    this.order.photo = this.photo;
  }

  async saveOrder() {
    // Validación mínima: instrument y receivedDate
    if (!this.order.instrument || !this.order.receivedDate) {
      console.log('Instrument and date are required');
      return;
    }

    if (this.orderId) {
      // Actualizar
      this.orderService.updateOrder(this.orderId, this.order).subscribe(() => {
        this.router.navigate(['/order-view', this.orderId]);
      });
    } else {
      // Crear
      this.orderService.createOrder(this.order).subscribe((newOrder: any) => {
        if (newOrder && newOrder.id) {
          this.router.navigate(['/order-view', newOrder.id]);
        } else {
          this.router.navigate(['/my-orders']);
        }
      });
    }
  }
}

