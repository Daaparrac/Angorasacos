import { Component, OnInit } from '@angular/core';
import { ServiceNameService } from '../../services/data.service';
import { ProductosModel } from '../../models/producto';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
})
export class ProductsListComponent implements OnInit {
  constructor(private datap: ServiceNameService) {}

  productos: ProductosModel[] = [];
  ngOnInit(): void {
    this.datap.getProductos().subscribe((data) => {
      this.productos = data;
    });
  }
}
