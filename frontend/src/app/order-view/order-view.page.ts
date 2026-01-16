import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderServices } from '../services/order-services';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-order-view',
  templateUrl: './order-view.page.html',
  styleUrls: ['./order-view.page.scss'],
  standalone: false,
})
export class OrderViewPage implements OnInit {
  orderId: string | null = null;
  order: any = {};
  formattedDateReceived: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private orderService: OrderServices,
    private alertController: AlertController
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.loadOrder();
  }

  private loadOrder() {
    this.orderId = this.route.snapshot.paramMap.get('id');

    if (!this.orderId) {
      console.warn('No se encontró ID en la URL');
      this.formattedDateReceived = 'ID inválido';
      return;
    }

    this.orderService.getOrderById(this.orderId).subscribe({
      next: (data: any) => {
        // Parsear fecha
        let parsedDate: Date | null = null;
        if (data.receivedDate) {
          parsedDate = new Date(data.receivedDate);
          if (isNaN(parsedDate.getTime())) parsedDate = null;
        }

        // Crear campo clientName dinámico
        const clientName = data.client
          ? `${data.client.name} ${data.client.surname}`
          : 'Cliente desconocido';

        this.order = {
          ...data,
          clientName,
          receivedDate: parsedDate
        };

        this.formattedDateReceived = parsedDate
          ? parsedDate.toLocaleDateString('es-ES', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric'
            })
          : 'No especificada';
      },
      error: (err) => {
        console.error('Error al cargar la orden:', err);
        this.formattedDateReceived = 'Error al cargar';
      }
    });
  }

  goBack() {
    this.router.navigate(['/my-orders']);
  }

  onImageError(event: Event) {
    (event.target as HTMLImageElement).src = 'assets/img/default.png';
  }

  async deleteOrder() {
    if (!this.orderId) return;

    const alert = await this.alertController.create({
      header: 'Confirm Delete',
      message: 'Are you sure you want to delete this order?',
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Delete',
          handler: () => {
            this.orderService.deleteOrder(this.orderId!).subscribe(() => {
              this.router.navigate(['/my-orders']);
            });
          }
        }
      ]
    });
    await alert.present();
  }

  editOrder() {
    this.router.navigate(['/orders-form', this.order.id]);
  }
}

