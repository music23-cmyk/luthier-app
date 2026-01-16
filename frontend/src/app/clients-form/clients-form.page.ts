import { Component, OnInit } from '@angular/core';
import { ClientServices } from '../services/client-services';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-clients-form',
  templateUrl: './clients-form.page.html',
  styleUrls: ['./clients-form.page.scss'],
  standalone: false,
})
export class ClientsFormPage implements OnInit {
  clientId: string | null = null;
  client: any = {};

  constructor(
    private route: ActivatedRoute,
    private clientService: ClientServices,
    private alertController: AlertController,
    private router: Router
  ) {}

  ngOnInit() {
    this.clientId = this.route.snapshot.paramMap.get('id');

    if (this.clientId) {
      this.clientService.getClientById(this.clientId).subscribe((data: any) => {
        this.client = data;
      });
    }
  }

  async saveClient() {
    // Validación mínima
    if (!this.client.name || !this.client.surname || !this.client.email) {
      console.log('Name, surname and email are required');
      return;
    }

    if (this.clientId) {
      // Actualizar cliente
      this.clientService.updateClient(this.clientId, this.client).subscribe(() => {
        this.router.navigate(['/clients-list']);
      });
    } else {
      // Crear nuevo cliente
      this.clientService.createClient(this.client).subscribe(() => {
        this.router.navigate(['/clients-list']);
      });
    }
  }

  async deleteClient() {
    if (!this.clientId) return;

    const alert = await this.alertController.create({
      header: 'Confirm Delete',
      message: 'Are you sure you want to delete this client?',
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Delete',
          handler: () => {
            this.clientService.deleteClient(this.clientId!).subscribe(() => {
              this.router.navigate(['/clients-list']);
            });
          }
        }
      ]
    });
    await alert.present();
  }
}


