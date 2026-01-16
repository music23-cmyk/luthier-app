import { Component, OnInit } from '@angular/core';
import { ItemServices } from '../services/item-services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.page.html',
  styleUrls: ['./items-list.page.scss'],
  standalone: false,
})
export class ItemsListPage implements OnInit {
  items: any[] = [];
  page = 1;
  limit = 10;
  hasMore = true;

  constructor(private itemService: ItemServices, private router: Router) { }

  ngOnInit() {
    this.getAllItems();
  }

  getAllItems() {
    this.itemService.getItems().subscribe((response: any[]) => {
      this.items = response.map(item => ({
        ...item,
        _selectedId: item.id
      }));
    });
  }

  // Navegar al formulario (editar si existe id)
  goToItemForm(item: any) {
    this.router.navigate(['/items-form', item.id]);
  }

  doRefresh(event: any) {
    this.getAllItems();
    setTimeout(() => event.target.complete(), 500);
  }
}


