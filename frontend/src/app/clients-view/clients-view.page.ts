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

  constructor(private clientService: ClientServices, private router: Router) {}

  ngOnInit() {
    this.loadClients();
  }

  ionViewWillEnter() {
    this.loadClients();
  }

  loadClients() {
    this.clientService.getClients().subscribe((data: any[]) => {
      this.clients = data;
    });
  }

  goToClientForm(client: any) {
    this.router.navigate(['/clients-form', client.id]);
  }
}


