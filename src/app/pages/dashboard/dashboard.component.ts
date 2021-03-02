import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  email: string;
  center = [
    {
      imagen: 'assets/img/inventory.png',
      texto: 'Inventario',
      url: 'inventario',
    },
    {
      imagen: 'assets/img/sweater.png',
      texto: 'Productos',
      url: 'productos',
    },
    {
      imagen: 'assets/img/bill.png',
      texto: 'Facturar',
      url: `factura_nueva`,
    },
    {
      imagen: 'assets/img/folder.png',
      texto: 'Historial Facturas',
      url: 'histo_factura',
    },
  ];

  constructor() { }

  ngOnInit(): void {
    this.email = localStorage.getItem('email');
  }


}
