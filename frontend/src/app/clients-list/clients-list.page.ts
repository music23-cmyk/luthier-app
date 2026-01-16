import { Component, OnInit } from '@angular/core';
import { ClientServices } from '../services/client-services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clients-list',
  templateUrl: './clients-list.page.html',
  styleUrls: ['./clients-list.page.scss'],
  standalone: false,
})
export class ClientsListPage implements OnInit {
  clients: any[] = [];
  page = 1;
  limit = 10;
  hasMore = true;

  constructor(private clientService: ClientServices, private router: Router) { }

  ngOnInit() {
    this.getAllClients();
  }

  getAllClients() {
    this.clientService.getClients().subscribe((response: any[]) => {
      this.clients = response.map(client => ({
        ...client,
        _selectedId: client.id
      }));
    });
  }

  // Abrir el formulario para editar el cliente
  goToClientForm(client: any) {
    this.router.navigate(['/clients-form', client._selectedId]);
  }

  // Refrescar lista
  doRefresh(event: any) {
    this.getAllClients();
    setTimeout(() => event.target.complete(), 500);
  }
}


