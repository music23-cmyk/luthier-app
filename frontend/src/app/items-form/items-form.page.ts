import { Component, OnInit } from '@angular/core';
import { ItemServices } from '../services/item-services';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-items-form',
  templateUrl: './items-form.page.html',
  styleUrls: ['./items-form.page.scss'],
  standalone: false,
})
export class ItemsFormPage implements OnInit {
  itemId: string | null = null;
  item: any = {};

  constructor(
    private route: ActivatedRoute,
    private itemService: ItemServices,
    private alertController: AlertController,
    private router: Router
  ) {}

  ngOnInit() {
    this.itemId = this.route.snapshot.paramMap.get('id');

    if (this.itemId) {
      this.itemService.getItemById(this.itemId).subscribe((data: any) => {
        this.item = data;
      });
    }
  }

  async saveItem() {
    // Validación mínima
    if (!this.item.name || !this.item.description || this.item.quantity == null) {
      console.log('Name, description, and quantity are required');
      return;
    }

    if (this.itemId) {
      // Actualizar item
      this.itemService.updateItem(this.itemId, this.item).subscribe(() => {
        this.router.navigate(['/items-list']);
      });
    } else {
      // Crear nuevo item
      this.itemService.createItem(this.item).subscribe(() => {
        this.router.navigate(['/items-list']);
      });
    }
  }

  async deleteItem() {
    if (!this.itemId) return;

    const alert = await this.alertController.create({
      header: 'Confirm Delete',
      message: 'Are you sure you want to delete this item?',
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Delete',
          handler: () => {
            this.itemService.deleteItem(this.itemId!).subscribe(() => {
              this.router.navigate(['/items-list']);
            });
          }
        }
      ]
    });
    await alert.present();
  }
}

